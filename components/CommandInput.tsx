"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface CommandInputProps {
  onCommand: (command: string) => void;
  isProcessing?: boolean;
  placeholder?: string;
}

export default function CommandInput({
  onCommand,
  isProcessing = false,
  placeholder = "Befehl eingeben..."
}: CommandInputProps) {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input
  useEffect(() => {
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter key submission
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault();

      if (command.trim() && !isProcessing) {
        const trimmedCommand = command.trim();
        console.log("📥 [CommandInput] Eingabe erhalten:", trimmedCommand);

        // Add to history
        setHistory(prev => [...prev, trimmedCommand]);
        setHistoryIndex(-1);

        // Call the command handler
        onCommand(trimmedCommand);
        setCommand("");
      }
      return;
    }

    // Handle Arrow Up for history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      }
      return;
    }

    // Handle Arrow Down for history navigation
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    }
  };

  return (
    <div className="bg-black border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-3">
      <div className="flex items-center space-x-2">
        <span className="terminal-text text-green-400 font-bold text-lg">$</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isProcessing}
          className="flex-1 bg-transparent terminal-text text-green-400 placeholder-green-700 outline-none text-sm font-mono"
        />
        <div className={`blink-cursor terminal-text text-green-400 text-lg ${isProcessing ? 'hidden' : ''}`}>
          _
        </div>
        {isProcessing && (
          <div className="terminal-text text-yellow-400 text-xs font-mono">
            Verarbeite...
          </div>
        )}
      </div>
    </div>
  );
}
