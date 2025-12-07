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
              goal={currentLevel.description ?? ""}
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
