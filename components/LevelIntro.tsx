"use client";

import { useState, useEffect } from "react";

interface LevelIntroProps {
  level: number;
  title: string;
  goal: string;
  onStartLevel?: () => void;
}

export default function LevelIntro({
  level,
  title,
  goal,
  onStartLevel
}: LevelIntroProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedGoal, setDisplayedGoal] = useState("");
  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    setDisplayedGoal("");
    setIsTyping(true);
    setCanStart(false);

    // Ensure goal is a string
    const goalText = goal ?? "";

    if (!goalText) {
      setIsTyping(false);
      setCanStart(true);
      return;
    }

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < goalText.length) {
        setDisplayedGoal(prev => prev + goalText[currentIndex]);
        currentIndex++;
      } else {
        setIsTyping(false);
        setCanStart(true);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [goal]);

  const getLevelEmoji = (level: number) => {
    switch (level) {
      case 1: return "🏰";
      case 2: return "📚";
      case 3: return "🍳";
      case 4: return "🌻";
      case 5: return "🔨";
      case 6: return "👑";
      default: return "⭐";
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "text-[var(--retro-primary)]";
      case 2: return "text-green-400";
      case 3: return "text-orange-400";
      case 4: return "text-yellow-400";
      case 5: return "text-purple-400";
      case 6: return "text-[var(--retro-accent)]";
      default: return "text-white";
    }
  };

  return (
    <div className="pixel-panel bg-[var(--retro-bg-panel)] border-[var(--retro-border)] p-8 max-w-2xl mx-auto">
      {/* Level Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">
          {getLevelEmoji(level)}
        </div>

        <div className="font-pixel text-[var(--retro-text-dim)] text-xs mb-2">
          LEVEL {level}
        </div>

        <div className={`font-pixel text-2xl mb-4 ${getLevelColor(level)}`}>
          {title.toUpperCase()}
        </div>

        {/* Level Progress */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 border-2 ${
                index < level
                  ? `bg-current ${getLevelColor(level)} border-current`
                  : "bg-[var(--retro-bg-dark)] border-[var(--retro-border)]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Goal Section */}
      <div className="mb-8">
        <div className="font-pixel text-xs text-[var(--retro-text-dim)] mb-3 text-center">
          MISSIONS-ZIEL
        </div>

        <div className="pixel-panel bg-[var(--retro-bg-dark)] border-[var(--retro-border)] p-6">
          <div className="font-terminal text-[var(--retro-text-main)] text-sm leading-relaxed min-h-[3rem]">
            {displayedGoal || (goal ?? "")}
            {isTyping && (
              <span className="blink-cursor text-[var(--retro-accent)]">_</span>
            )}
          </div>
        </div>
      </div>

      {/* Learning Objective */}
      <div className="mb-8">
        <div className="font-pixel text-xs text-[var(--retro-text-dim)] mb-3 text-center">
          LERNZIEL
        </div>

        <div className="text-center">
          <div className="font-terminal text-[var(--retro-success)] text-sm">
            {level === 1 && "Aufgaben in kleine Schritte zerlegen"}
            {level === 2 && "Informationen ordnen und strukturieren"}
            {level === 3 && "Prozesse planen und ausführen"}
            {level === 4 && "Naturpflege und Geduld"}
            {level === 5 && "Handwerk und Präzision"}
            {level === 6 && "Führung und Verantwortung"}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button
          onClick={onStartLevel}
          disabled={!canStart}
          className={`bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] px-8 py-4 font-pixel text-sm transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
            canStart
              ? "bg-[var(--retro-success)] text-white hover:bg-[var(--retro-success)]/80 hover:scale-105"
              : "bg-[var(--retro-bg-dark)] text-[var(--retro-text-dim)] cursor-not-allowed opacity-50"
          } border-2 ${
            canStart
              ? "border-[var(--retro-success)]"
              : "border-[var(--retro-border)]"
          }`}
        >
          {isTyping ? "..." : "LEVEL STARTEN"}
        </button>
      </div>

      {/* Instructions */}
      {canStart && (
        <div className="mt-6 text-center">
          <div className="font-terminal text-[var(--retro-text-dim)] text-xs">
            Drücke ENTER oder klicke auf den Button zum Starten
          </div>
        </div>
      )}
    </div>
  );
}
