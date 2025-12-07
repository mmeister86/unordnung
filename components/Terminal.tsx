"use client";

import { useEffect, useRef } from "react";

interface TerminalProps {
  history: string[];
  isTyping?: boolean;
}

export default function Terminal({ history, isTyping = false }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="bg-black border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-4 h-64 overflow-y-auto font-mono text-sm">
      <div ref={terminalRef} className="space-y-1">
        {history.map((line, index) => (
          <div key={index} className="terminal-text">
            {line.startsWith("> ") ? (
              <span className="text-green-300">
                <span className="text-yellow-400">{line.substring(0, 2)}</span>
                {line.substring(2)}
              </span>
            ) : line.startsWith("===") ? (
              <span className="text-cyan-400 font-bold">{line}</span>
            ) : line.includes(":") && line.includes('"') ? (
              <span>
                <span className="text-green-400">{line.split(":")[0]}:</span>
                <span className="text-white"> {line.split(":").slice(1).join(":")}</span>
              </span>
            ) : (
              <span className="text-green-400">{line}</span>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="terminal-text">
            <span className="blink-cursor">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
