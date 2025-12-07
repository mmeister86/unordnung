"use client";

import { useState, useEffect } from "react";

interface DialogueBoxProps {
  speaker?: string;
  text: string;
  mood?: string;
  typingSpeed?: number;
  onComplete?: () => void;
}

export default function DialogueBox({
  speaker,
  text,
  mood = "neutral",
  typingSpeed = 50,
  onComplete
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);

    // Ensure text is a string
    const textToDisplay = (text ?? "").trim();

    if (!textToDisplay) {
      setIsTyping(false);
      onComplete?.();
      return;
    }

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < textToDisplay.length) {
        setDisplayedText(prev => prev + textToDisplay[currentIndex]);
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
        onComplete?.();
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [text, typingSpeed, onComplete]);

  const getMoodColor = (mood: string | undefined) => {
    switch (mood) {
      case "concerned":
      case "worried":
        return "text-yellow-400";
      case "helpful":
      case "teaching":
        return "text-green-400";
      case "proud":
        return "text-cyan-400";
      case "stressed":
      case "frustrated":
        return "text-red-400";
      case "overwhelmed":
        return "text-orange-400";
      case "expectant":
        return "text-purple-400";
      default:
        return "text-white";
    }
  };

  const getMoodEmoji = (mood: string | undefined) => {
    switch (mood) {
      case "concerned":
      case "worried":
        return "😟";
      case "helpful":
      case "teaching":
        return "😊";
      case "proud":
        return "🤩";
      case "stressed":
      case "frustrated":
        return "😤";
      case "overwhelmed":
        return "😰";
      case "expectant":
        return "👑";
      default:
        return "😐";
    }
  };

  return (
    <div className="bg-[var(--retro-bg-panel)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-4 mb-4">
      <div className="flex items-start space-x-3">
        {/* Character portrait placeholder */}
        <div className="flex-shrink-0 w-16 h-16 bg-[var(--retro-bg-dark)] border-2 border-[var(--retro-border)] flex items-center justify-center text-2xl">
          {getMoodEmoji(mood)}
        </div>

        {/* Dialogue content */}
        <div className="flex-1">
          {speaker && (
            <div className={`font-pixel text-xs mb-2 ${getMoodColor(mood)}`}>
              {speaker.toUpperCase()}
            </div>
          )}
          <div className="font-mono text-white text-sm leading-relaxed">
            {displayedText || (text ?? "")}
            {isTyping && (
              <span className="blink-cursor text-white">_</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
