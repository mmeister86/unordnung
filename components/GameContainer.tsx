"use client";

import { ReactNode } from "react";

interface GameContainerProps {
  children: ReactNode;
  view?: "menu" | "intro" | "gameplay";
}

export default function GameContainer({ children, view = "gameplay" }: GameContainerProps) {
  const getContainerClasses = () => {
    switch (view) {
      case "menu":
        return "min-h-screen flex items-center justify-center p-8";
      case "intro":
        return "min-h-screen flex items-center justify-center p-8";
      case "gameplay":
      default:
        return "h-full flex flex-col";
    }
  };

  return (
    <div className={`bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] ${getContainerClasses()}`}>
      {/* CRT Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse" />
      </div>

      {/* Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
