"use client";

import { useState, useEffect, useRef } from "react";
import GameLayout from "@/components/GameLayout";
import GameContainer from "@/components/GameContainer";
import MainMenu from "@/components/MainMenu";
import LevelIntro from "@/components/LevelIntro";
import PlayerStats from "@/components/PlayerStats";
import ProgressBar from "@/components/ProgressBar";
import MissionTracker from "@/components/MissionTracker";
import DialogueBox from "@/components/DialogueBox";
import Terminal from "@/components/Terminal";
import CommandInput from "@/components/CommandInput";
import { INITIAL_GAME_STATE, MOCK_GAME_STATE } from "@/lib/mock-data";
import LEVEL_1_DATA from "@/lib/mock-data";
import { GameView, GameNode, LevelData } from "@/types/game";
import { GameEngine } from "@/lib/game-engine/game-engine";
import VictoryScreen from "@/components/VictoryScreen";

export default function Home() {
    const [currentView, setCurrentView] = useState<GameView>("menu");
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const [currentLevel, setCurrentLevel] = useState<LevelData>(LEVEL_1_DATA);
    const [currentNode, setCurrentNode] = useState<GameNode>(currentLevel.nodes.start);
    const [isProcessing, setIsProcessing] = useState(false);

    // Create engine instance
    const engineRef = useRef<GameEngine | null>(null);

    // Update current node when state changes
    useEffect(() => {
        if (currentView === "gameplay" && engineRef.current) {
            const updatedState = engineRef.current.getState();
            const node = currentLevel.nodes[updatedState.activeNodeId] || currentLevel.nodes.start;
            setCurrentNode(node);

            // Check if we've reached the completion node
            if (node.type === "levelComplete") {
                setCurrentView("victory");
            }
        }
    }, [gameState.activeNodeId, currentLevel, currentView]);

    // Command handler using Game Engine
    const handleCommand = async (command: string) => {
        // Ensure engine is initialized
        if (!engineRef.current) {
            console.error("Engine not initialized, initializing now...");
            const initialState = { ...INITIAL_GAME_STATE, activeNodeId: "start" };
            engineRef.current = new GameEngine(initialState, LEVEL_1_DATA);
            setGameState(initialState);
        }

        setIsProcessing(true);

        try {
            // Process command through engine
            const response = engineRef.current.processCommand(command);

            // Get updated state from engine (includes updated history)
            const updatedState = engineRef.current.getState();
            const updatedLevelData = engineRef.current.getLevelData();

            // Update current node based on active node ID
            const activeNodeId = response.nextNodeId || updatedState.activeNodeId;
            const nextNode = updatedLevelData.nodes[activeNodeId];
            if (nextNode) {
                setCurrentNode(nextNode);
            }

            // Apply task updates from effects
            if (response.effects) {
                for (const effect of response.effects) {
                    if (effect.type === "updateTask") {
                        engineRef.current.updateTaskStatus(effect.taskId, effect.status);
                        // Update level data
                        const refreshedLevelData = engineRef.current.getLevelData();
                        setCurrentLevel(refreshedLevelData);
                    }
                    // Check for level completion
                    if (effect.type === "completeLevel") {
                        // Level completed! Switch to victory screen
                        setCurrentView("victory");
                    }
                }
            }

            // Check if level is complete by node type
            if (nextNode && nextNode.type === "levelComplete") {
                setCurrentView("victory");
            } else {
                // Also check if all tasks are completed and all completion flags are set
                const allTasksCompleted = updatedLevelData.tasks.every(
                    (task) => task.status === "completed"
                );
                const allFlagsSet =
                    updatedState.flags.swords_complete === true &&
                    updatedState.flags.armor_complete === true &&
                    updatedState.flags.flags_complete === true;

                if (allTasksCompleted && allFlagsSet && updatedLevelData.tasks.length > 0) {
                    // All tasks completed, check if we're at a node that should lead to completion
                    const completionNode = Object.values(updatedLevelData.nodes).find(
                        (node) => node.type === "levelComplete"
                    );

                    // If we're already at completion node, show victory
                    if (completionNode && nextNode.id === completionNode.id) {
                        setCurrentView("victory");
                    }
                    // If we're at L1_ALL_TASKS_DONE or L1_REFLECTION, try to navigate to completion
                    else if (nextNode.id === "L1_ALL_TASKS_DONE" || nextNode.id === "L1_REFLECTION") {
                        // Check if there's a transition to completion node
                        const hasTransitionToComplete = nextNode.transitions?.some(
                            (t) => updatedLevelData.nodes[t.nextNodeId]?.type === "levelComplete"
                        );
                        if (hasTransitionToComplete) {
                            // Let the player continue naturally through the story
                            // The victory screen will be shown when they reach L1_COMPLETE
                        } else {
                            // No transition found, try to go to completion node directly
                            if (completionNode) {
                                // Update to completion node
                                const updatedStateWithComplete = {
                                    ...updatedState,
                                    activeNodeId: completionNode.id
                                };
                                engineRef.current = new GameEngine(updatedStateWithComplete, updatedLevelData);
                                setCurrentNode(completionNode);
                                setCurrentView("victory");
                            }
                        }
                    }
                }
            }

            // Update game state (this includes the updated history from engine)
            setGameState(updatedState);
            setCurrentLevel(updatedLevelData);

            // If error, show suggestions
            if (!response.success && response.suggestions) {
                console.log("Command suggestions:", response.suggestions);
            }
        } catch (error) {
            console.error("Error processing command:", error);
            // Update history in both engine and state
            if (engineRef.current) {
                const currentState = engineRef.current.getState();
                setGameState({
                    ...currentState,
                    history: [...currentState.history, `> ${command}`, "Fehler beim Verarbeiten des Befehls."]
                });
            } else {
                setGameState(prev => ({
                    ...prev,
                    history: [...prev.history, `> ${command}`, "Fehler beim Verarbeiten des Befehls."]
                }));
            }
        } finally {
            // Simulate processing delay for better UX
            setTimeout(() => {
                setIsProcessing(false);
            }, 300);
        }
    };

    const handleStartGame = () => {
        setCurrentView("intro");
    };

    const handleStartLevel = () => {
        setCurrentView("gameplay");
        // Reset engine for new game
        const initialState = { ...INITIAL_GAME_STATE, activeNodeId: "start" };
        engineRef.current = new GameEngine(initialState, LEVEL_1_DATA);
        setGameState(initialState);
        setCurrentLevel(LEVEL_1_DATA);
        setCurrentNode(LEVEL_1_DATA.nodes.start);
    };

    const handleLoadGame = () => {
        // Initialize engine with mock state
        engineRef.current = new GameEngine(MOCK_GAME_STATE, LEVEL_1_DATA);
        setGameState(MOCK_GAME_STATE);
        setCurrentLevel(LEVEL_1_DATA);
        setCurrentView("gameplay");
        const node = LEVEL_1_DATA.nodes[MOCK_GAME_STATE.activeNodeId] || LEVEL_1_DATA.nodes.start;
        setCurrentNode(node);
    };

    const handleSettings = () => {
        alert("Einstellungen noch nicht implementiert");
    };

    const handleVictoryContinue = () => {
        // For now, just go back to menu (Level 2 not implemented yet)
        setCurrentView("menu");
    };

    const handleVictoryMenu = () => {
        setCurrentView("menu");
    };

    // Render current view
    const renderCurrentView = () => {
        switch (currentView) {
            case "menu":
                return (
                    <GameContainer view="menu">
                        <MainMenu
                            onStart={handleStartGame}
                            onLoad={handleLoadGame}
                            onSettings={handleSettings}
                        />
                    </GameContainer>
                );

            case "intro":
                return (
                    <GameContainer view="intro">
                        <LevelIntro
                            level={currentLevel.id}
                            title={currentLevel.title || ""}
                            description={currentLevel.description ?? ""}
                            backgroundImage={currentLevel.backgroundImage}
                            onStartLevel={handleStartLevel}
                        />
                    </GameContainer>
                );

            case "gameplay":
                return (
                    <GameContainer view="gameplay">
                        <div className="flex flex-col h-full space-y-4">
                            {/* Dialogue Box */}
                            <DialogueBox
                                speaker={currentNode.npc?.name}
                                text={currentNode.text ?? ""}
                                mood={currentNode.npc?.mood}
                                image={currentNode.npc?.image}
                            />

                            {/* Terminal */}
                            <div className="flex-1 min-h-0">
                                <Terminal history={gameState.history} />
                            </div>

                            {/* Command Input */}
                            <CommandInput
                                onCommand={handleCommand}
                                isProcessing={isProcessing}
                            />
                        </div>
                    </GameContainer>
                );

            case "victory":
                return (
                    <GameContainer view="intro">
                        <VictoryScreen
                            level={currentLevel}
                            stats={gameState.player}
                            tasks={currentLevel.tasks}
                            onContinue={handleVictoryContinue}
                            onMenu={handleVictoryMenu}
                        />
                    </GameContainer>
                );

            default:
                return null;
        }
    };

    // Prepare side panels for gameplay view
    const leftPanel = currentView === "gameplay" ? (
        <div className="space-y-4">
            <PlayerStats stats={gameState.player} />
            <ProgressBar
                current={gameState.player.op}
                max={100}
                label="Ordnungs-Punkte"
                color="success"
            />
        </div>
    ) : null;

    const rightPanel = currentView === "gameplay" ? (
        <MissionTracker tasks={currentLevel.tasks} />
    ) : null;

    const header = currentView === "gameplay" ? (
        <PlayerStats stats={gameState.player} compact={true} />
    ) : null;

    return (
        <main className="min-h-screen">
            {currentView === "gameplay" ? (
                <GameLayout
                    leftPanel={leftPanel}
                    rightPanel={rightPanel}
                    header={header}
                >
                    {renderCurrentView()}
                </GameLayout>
            ) : (
                renderCurrentView()
            )}
        </main>
    );
}
