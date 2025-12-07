"use client";

import { useState } from "react";

interface MainMenuProps {
  onStart?: () => void;
  onLoad?: () => void;
  onSettings?: () => void;
}

export default function MainMenu({
  onStart,
  onLoad,
  onSettings,
}: MainMenuProps) {
  const [selectedOption, setSelectedOption] = useState(0);

  const menuOptions = [
    { label: "NEUES SPIEL", action: onStart, id: "new-game" },
    { label: "SPIEL LADEN", action: onLoad, id: "load-game" },
    { label: "EINSTELLUNGEN", action: onSettings, id: "settings" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setSelectedOption(
          (prev) => (prev - 1 + menuOptions.length) % menuOptions.length
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedOption((prev) => (prev + 1) % menuOptions.length);
        break;
      case "Enter":
        e.preventDefault();
        menuOptions[selectedOption]?.action?.();
        break;
    }
  };

  return (
    <div
      className="pixel-panel bg-[var(--retro-bg-panel)] border-[var(--retro-border)] p-8 max-w-2xl mx-auto"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Game Title */}
      <div className="text-center mb-12">
        {/* ASCII Art Title */}
        <div className="font-terminal text-[var(--retro-accent)] text-xs mb-4 leading-tight">
          <pre className="inline-block">
            {`
███╗   ███╗ █████╗ ████████╗████████╗██╗  ██╗██╗ █████╗ ███████╗    ██╗      ██████╗  ██╗
████╗ ████║██╔══██╗╚══██╔══╝╚══██╔══╝██║  ██║██║██╔══██╗██╔════╝    ██║     ██╔═══██╗ ██║
██╔████╔██║███████║   ██║      ██║   ███████║██║███████║███████╗    ██║     ██║   ██║ ██║
██║╚██╔╝██║██╔══██║   ██║      ██║   ██╔══██║██║██╔══██║╚════██║    ██║     ██║   ██║ ██║
██║ ╚═╝ ██║██║  ██║   ██║      ██║   ██║  ██║██║██║  ██║███████║    ███████╗╚██████╔╝ ███████╗
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝ ╚═════╝  ╚══════╝
`}
          </pre>
        </div>

        <div className="font-pixel text-[var(--retro-text-main)] text-lg mb-2">
          CHAOS QUEST
        </div>

        <div className="font-terminal text-[var(--retro-text-dim)] text-sm">
          Eine 8-Bit Abenteuer-Reise
        </div>

        <div className="font-terminal text-[var(--retro-success)] text-xs mt-4">
          Lerne, große Aufgaben zu meistern!
        </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-4">
        {menuOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={option.action || undefined}
            onMouseEnter={() => setSelectedOption(index)}
            className={`w-full bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] text-left p-4 transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
              selectedOption === index
                ? "bg-[var(--retro-primary)] text-white scale-105"
                : "bg-[var(--retro-bg-dark)] text-[var(--retro-text-main)] hover:bg-[var(--retro-primary)]/50"
            } border-2 ${
              selectedOption === index
                ? "border-[var(--retro-accent)]"
                : "border-[var(--retro-border)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-pixel text-sm">{option.label}</span>
              {selectedOption === index && (
                <span className="font-terminal text-[var(--retro-accent)] text-sm blink-cursor">
                  ▶
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center">
        <div className="font-terminal text-[var(--retro-text-dim)] text-xs space-y-1">
          <div>Verwende ↑↓ Pfeiltasten zur Navigation</div>
          <div>Drücke ENTER zum Auswählen</div>
        </div>
      </div>

      {/* Version Info */}
      <div className="mt-6 text-center">
        <div className="font-terminal text-[var(--retro-text-dim)] text-xs">
          Version 1.0.0 | Ein Spiel für Kinder mit ADHS
        </div>
      </div>
    </div>
  );
}
