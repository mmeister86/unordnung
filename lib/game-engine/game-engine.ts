import { GameState, GameNode, LevelData, Command, GameResponse, Transition, Effect, Condition } from "@/types/game";
import { parseCommand, matchCommand } from "./command-parser";
import { safeString } from "./utils";

export class GameEngine {
    private state: GameState;
    private levelData: LevelData;

    constructor(initialState: GameState, levelData: LevelData) {
        this.state = { ...initialState };
        this.levelData = levelData;
    }

    getState(): GameState {
        return { ...this.state };
    }

    getCurrentNode(): GameNode | null {
        return this.levelData.nodes[this.state.activeNodeId] ?? null;
    }

    // Main command processing method
    processCommand(input: string): GameResponse {
        console.log("🎮 [GameEngine] Verarbeite Befehl:", input);

        // Parse command
        const parseResult = parseCommand(input);
        if (!parseResult.success || !parseResult.command) {
            console.log("❌ [GameEngine] Parse fehlgeschlagen:", parseResult.error);
            return {
                success: false,
                message: parseResult.error ?? "Unbekannter Befehl.",
                suggestions: parseResult.suggestions
            };
        }

        const command = parseResult.command;
        const currentNode = this.getCurrentNode();

        if (!currentNode) {
            console.log("❌ [GameEngine] Kein aktueller Node gefunden");
            return {
                success: false,
                message: "Fehler: Aktueller Node nicht gefunden.",
                suggestions: ["hilfe"]
            };
        }

        console.log("📍 [GameEngine] Aktueller Node:", {
            nodeId: currentNode.id,
            transitions: currentNode.transitions?.map(t => t.command),
            transitionsCount: currentNode.transitions?.length || 0
        });

        // Find matching transition
        const transition = this.findTransition(command, currentNode);

        if (!transition) {
            // No matching transition found
            const validCommands = currentNode.validCommands ?? [];
            console.log("❌ [GameEngine] Keine passende Transition gefunden:", {
                command: command.raw,
                commandType: command.type,
                target: command.target,
                availableTransitions: currentNode.transitions?.map(t => t.command) || []
            });
            return {
                success: false,
                message: `Das kannst du hier nicht tun. Verfügbare Befehle: ${validCommands.join(", ")}`,
                suggestions: validCommands.slice(0, 3)
            };
        }

        console.log("✅ [GameEngine] Transition gefunden:", {
            command: command.raw,
            nextNodeId: transition.nextNodeId,
            response: transition.response,
            conditions: transition.conditions,
            effects: transition.effects
        });

        // Check conditions
        if (transition.conditions && !this.checkConditions(transition.conditions)) {
            console.log("❌ [GameEngine] Bedingungen nicht erfüllt:", {
                conditions: transition.conditions,
                currentFlags: this.state.flags,
                playerInventory: this.state.player.inventory
            });
            return {
                success: false,
                message: "Die Bedingungen für diese Aktion sind nicht erfüllt.",
                suggestions: ["schaue", "hilfe"]
            };
        }

        // Update node
        const nextNodeId = transition.nextNodeId;
        const nextNode = this.levelData.nodes[nextNodeId];

        if (!nextNode) {
            return {
                success: false,
                message: `Fehler: Ziel-Node "${nextNodeId}" nicht gefunden.`,
                suggestions: ["hilfe"]
            };
        }

        // Collect effects
        const effects: Effect[] = [];

        // 1. Transition effects
        if (transition.effects) {
            effects.push(...transition.effects);
        }

        // 2. Node entry effects (from new node)
        if (nextNode.effects) {
            effects.push(...nextNode.effects);
        }

        // Apply effects
        const appliedEffects = this.applyEffects(effects);

        // Update state
        this.state = {
            ...this.state,
            activeNodeId: nextNodeId
        };

        // Build response message - ensure it's never undefined and safe
        let message = safeString(transition.response ?? nextNode.text ?? "");

        // Add OP gain message if applicable
        const opGain = appliedEffects.find(e => e.type === "addOP");
        if (opGain && opGain.type === "addOP") {
            message += `\n\n+${opGain.amount} OP!`;
        }

        // Add to history
        this.state.history = [
            ...this.state.history,
            `> ${input}`,
            message
        ];

        console.log("✅ [GameEngine] Befehl erfolgreich verarbeitet:", {
            success: true,
            nextNodeId,
            effectsApplied: appliedEffects.length,
            historyLength: this.state.history.length
        });

        return {
            success: true,
            message,
            effects: appliedEffects,
            nextNodeId
        };
    }

    // Find matching transition for command
    private findTransition(command: Command, node: GameNode): Transition | null {
        if (!node.transitions || node.transitions.length === 0) {
            return null;
        }

        for (const transition of node.transitions) {
            if (matchCommand(command, transition.command)) {
                return transition;
            }
        }

        return null;
    }

    // Check if conditions are met
    private checkConditions(conditions: Condition[]): boolean {
        for (const condition of conditions) {
            if (!this.checkCondition(condition)) {
                return false;
            }
        }
        return true;
    }

    // Check single condition
    private checkCondition(condition: Condition): boolean {
        switch (condition.type) {
            case "hasFlag":
                return this.state.flags[condition.flag] === condition.value;

            case "not":
                return !this.state.flags[condition.flag];

            case "hasItem":
                return this.state.player.inventory.includes(condition.item);

            case "taskStatus": {
                const task = this.levelData.tasks.find(t => t.id === condition.taskId);
                return task?.status === condition.status;
            }

            case "opGreaterThan":
                return this.state.player.op > condition.amount;

            case "opLessThan":
                return this.state.player.op < condition.amount;

            default:
                return false;
        }
    }

    // Apply effects to game state
    private applyEffects(effects: Effect[]): Effect[] {
        const applied: Effect[] = [];

        for (const effect of effects) {
            switch (effect.type) {
                case "addOP":
                    this.state = {
                        ...this.state,
                        player: {
                            ...this.state.player,
                            op: this.state.player.op + effect.amount
                        }
                    };
                    applied.push(effect);
                    break;

                case "addToInventory":
                    if (!this.state.player.inventory.includes(effect.item)) {
                        this.state = {
                            ...this.state,
                            player: {
                                ...this.state.player,
                                inventory: [...this.state.player.inventory, effect.item]
                            }
                        };
                        applied.push(effect);
                    }
                    break;

                case "removeFromInventory":
                    this.state = {
                        ...this.state,
                        player: {
                            ...this.state.player,
                            inventory: this.state.player.inventory.filter(item => item !== effect.item)
                        }
                    };
                    applied.push(effect);
                    break;

                case "setFlag":
                    this.state = {
                        ...this.state,
                        flags: {
                            ...this.state.flags,
                            [effect.flag]: effect.value
                        }
                    };
                    applied.push(effect);
                    break;

                case "updateTask": {
                    const taskIndex = this.levelData.tasks.findIndex(t => t.id === effect.taskId);
                    if (taskIndex >= 0) {
                        const updatedTasks = [...this.levelData.tasks];
                        updatedTasks[taskIndex] = {
                            ...updatedTasks[taskIndex],
                            status: effect.status
                        };
                        // Note: We can't mutate levelData directly, so we'll handle this in the UI layer
                        // For now, we'll just track it in the effect
                        applied.push(effect);
                    }
                    break;
                }

                case "completeLevel":
                case "unlockLevel":
                case "unlockAchievement":
                    // These are tracked but don't modify state directly
                    applied.push(effect);
                    break;

                default:
                    // Unknown effect type, skip
                    break;
            }
        }

        return applied;
    }

    // Update task status (called from outside after effects are applied)
    updateTaskStatus(taskId: string, status: "pending" | "completed" | "failed"): void {
        const taskIndex = this.levelData.tasks.findIndex(t => t.id === taskId);
        if (taskIndex >= 0) {
            this.levelData.tasks[taskIndex] = {
                ...this.levelData.tasks[taskIndex],
                status
            };
        }
    }

    // Get updated level data (with task updates)
    getLevelData(): LevelData {
        return { ...this.levelData };
    }
}
