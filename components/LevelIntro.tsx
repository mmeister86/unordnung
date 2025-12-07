"use client";

import { useState, useEffect } from "react";

interface LevelIntroProps {
    level: number;
    title: string;
    description: string; // Renamed from goal to match props usually passed
    backgroundImage?: string;
    onStartLevel?: () => void;
}

export default function LevelIntro({
    level,
    title,
    description,
    backgroundImage,
    onStartLevel
}: LevelIntroProps) {
    const [isTyping, setIsTyping] = useState(true);
    const [displayedDescription, setDisplayedDescription] = useState("");
    const [canStart, setCanStart] = useState(false);

    useEffect(() => {
        setDisplayedDescription("");
        setIsTyping(true);
        setCanStart(false);

        // Ensure description is a string
        const descText = description ?? "";

        if (!descText) {
            setIsTyping(false);
            setCanStart(true);
            return;
        }

        let currentIndex = 0;
        setDisplayedDescription("");

        const timer = setInterval(() => {
            currentIndex++;
            setDisplayedDescription(descText.slice(0, currentIndex));

            if (currentIndex >= descText.length) {
                setIsTyping(false);
                setCanStart(true);
                clearInterval(timer);
            }
        }, 30);

        return () => clearInterval(timer);
    }, [description]);

    // Handle Enter key to start
    useEffect(() => {
        if (!canStart) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                onStartLevel?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [canStart, onStartLevel]);

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

    const containerStyle = backgroundImage
        ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
        : {};

    // Standard Retro Style (Fallback)
    const StandardLayout = () => (
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
                            className={`w-3 h-3 border-2 ${index < level
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
                        {displayedDescription || (description ?? "")}
                        {isTyping && (
                            <span className="blink-cursor text-[var(--retro-accent)]">_</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
                <button
                    onClick={onStartLevel}
                    disabled={!canStart}
                    className={`bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] px-8 py-4 font-pixel text-sm transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${canStart
                        ? "bg-[var(--retro-success)] text-white hover:bg-[var(--retro-success)]/80 hover:scale-105"
                        : "bg-[var(--retro-bg-dark)] text-[var(--retro-text-dim)] cursor-not-allowed opacity-50"
                        } border-2 ${canStart
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

    // Cinematic Style (With Background)
    const CinematicLayout = () => (
        <div className="relative w-full h-[calc(100vh-2rem)] rounded-xl overflow-hidden border-4 border-[var(--retro-border)] bg-black">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 transition-transform duration-[20s] ease-linear hover:scale-110"
                style={containerStyle}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />

            {/* Content Layer */}
            <div className="relative z-20 h-full flex flex-col justify-end items-center pb-24 px-8 text-center max-w-4xl mx-auto">
                <div className="mb-8 animate-fade-in-up">
                    <span className="inline-block px-4 py-1 mb-6 border-2 border-[var(--retro-primary)] text-[var(--retro-primary)] font-pixel text-sm tracking-widest bg-black/50 backdrop-blur-sm">
                        LEVEL {level}
                    </span>

                    <h1 className="font-pixel text-5xl md:text-7xl text-white mb-6 drop-shadow-[0_4px_0_rgba(0,0,0,1)] tracking-wide">
                        {title.toUpperCase()}
                    </h1>

                    <div className="w-24 h-1 bg-[var(--retro-primary)] mx-auto mb-8"></div>

                    <div className="font-terminal text-xl text-gray-200 bg-black/60 p-6 border border-white/10 rounded-lg max-w-2xl mx-auto backdrop-blur-md">
                        {displayedDescription || (description ?? "")}
                        {isTyping && (
                            <span className="blink-cursor text-[var(--retro-primary)]">_</span>
                        )}
                    </div>
                </div>

                <div className={`transition-all duration-700 ${canStart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <button
                        onClick={onStartLevel}
                        disabled={!canStart}
                        className="group relative px-12 py-5 bg-[var(--retro-primary)] text-white font-pixel text-xl tracking-wider transition-all hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-[var(--retro-primary)]/50 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8)]"
                    >
                        STARTEN

                        {/* Button Decoration */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white -translate-x-1 -translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white translate-x-1 -translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white -translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                    </button>

                    <div className="mt-4 text-gray-500 font-mono text-xs animate-pulse">
                        [ PRESS ENTER TO START ]
                    </div>
                </div>
            </div>

            {/* Top Right Stats / Decorative */}
            <div className="absolute top-8 right-8 z-20 flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className={`w-2 h-8 ${i < 1 ? 'bg-[var(--retro-primary)] animate-pulse' : 'bg-white/20'}`} />
                ))}
            </div>
        </div>
    );

    return backgroundImage ? <CinematicLayout /> : <StandardLayout />;
}
