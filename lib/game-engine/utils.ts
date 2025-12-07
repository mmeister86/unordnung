import { GameState, LevelData } from "@/types/game";

/**
 * Create initial game state for a level
 */
export function createInitialState(level: LevelData): GameState {
    return {
        player: {
            name: "Held",
            op: 0,
            level: level.id,
            inventory: [],
        },
        currentLevel: level.id,
        activeNodeId: "start",
        flags: {},
        history: [
            "=== CHAOS QUEST ===",
            `Willkommen zu Level ${level.id}: ${level.title}`,
            level.description ?? "",
            "",
            "Tippe 'hilfe' für verfügbare Befehle.",
            "",
        ],
    };
}

/**
 * Validate game state consistency
 */
export function validateGameState(state: GameState, level: LevelData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check if active node exists
    if (!level.nodes[state.activeNodeId]) {
        errors.push(`Active node "${state.activeNodeId}" does not exist in level ${level.id}`);
    }

    // Check if current level matches
    if (state.currentLevel !== level.id) {
        errors.push(`State level ${state.currentLevel} does not match level data ${level.id}`);
    }

    // Check if player level matches
    if (state.player.level !== level.id) {
        errors.push(`Player level ${state.player.level} does not match level data ${level.id}`);
    }

    // Validate OP is non-negative
    if (state.player.op < 0) {
        errors.push(`Player OP is negative: ${state.player.op}`);
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Safely convert a value to a string, ensuring it never contains "undefined"
 * Uses nullish coalescing to handle null/undefined properly
 */
export function safeString(value: unknown): string {
    if (value === null || value === undefined) {
        return "";
    }
    const str = String(value);

    // Explicitly check for literal "undefined" string which might have been generated
    if (str === "undefined") {
        return "";
    }

    // Remove any "undefined" strings that might have been accidentally concatenated
    return str.replace(/undefined/g, "");
}

/**
 * Format response message for terminal display
 */
export function formatResponse(message: string): string {
    // Ensure message is safe first
    const safeMessage = safeString(message);
    // Split by newlines and format
    return safeMessage
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n");
}
