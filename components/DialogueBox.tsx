"use client";

import { useState, useEffect, useRef } from "react";

interface DialogueBoxProps {
    speaker?: string;
    text: string;
    mood?: string;
    image?: string;
    typingSpeed?: number;
    onComplete?: () => void;
}

export default function DialogueBox({
    speaker,
    text,
    mood = "neutral",
    image,
    typingSpeed = 50,
    onComplete
}: DialogueBoxProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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
        // Clear potentially stale text
        setDisplayedText("");

        // Clear any existing timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            currentIndex++;
            if (currentIndex <= textToDisplay.length) {
                setDisplayedText(textToDisplay.slice(0, currentIndex));
            } else {
                setIsTyping(false);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
                onComplete?.();
            }
        }, typingSpeed);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [text, typingSpeed, onComplete]);

    const handleFastForward = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        const textToDisplay = (text ?? "").trim();
        setDisplayedText(textToDisplay);
        setIsTyping(false);
        onComplete?.();
    };

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
                <div className="flex-shrink-0 w-32 h-32 bg-[var(--retro-bg-dark)] border-2 border-[var(--retro-border)] flex items-center justify-center text-4xl overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={speaker || "Character"}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        getMoodEmoji(mood)
                    )}
                </div>

                {/* Dialogue content */}
                <div className="flex-1 flex flex-col">
                    {speaker && (
                        <div className={`font-pixel text-xs mb-2 ${getMoodColor(mood)}`}>
                            {speaker.toUpperCase()}
                        </div>
                    )}
                    <div className="flex items-start gap-2">
                        <div className="font-mono text-white text-sm leading-relaxed flex-1">
                            {displayedText || (text ?? "")}
                            {isTyping && (
                                <span className="blink-cursor text-white">_</span>
                            )}
                        </div>
                        {isTyping && (
                            <button
                                onClick={handleFastForward}
                                className="flex-shrink-0 px-2 py-1 bg-[var(--retro-bg-dark)] border-2 border-[var(--retro-border)] text-white font-pixel text-xs hover:bg-[var(--retro-border)] transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shadow-[2px_2px_0_0_var(--retro-border)]"
                                aria-label="Text überspringen"
                            >
                                ⏩
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
