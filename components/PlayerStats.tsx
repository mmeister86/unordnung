"use client";

import { PlayerStats as PlayerStatsType } from "@/types/game";

interface PlayerStatsProps {
  stats: PlayerStatsType;
  compact?: boolean;
}

export default function PlayerStats({ stats, compact = false }: PlayerStatsProps) {
  const getLevelColor = (level: number) => {
    if (level >= 5) return "text-purple-400";
    if (level >= 3) return "text-cyan-400";
    return "text-green-400";
  };

  const getOPColor = (op: number) => {
    if (op >= 100) return "text-[var(--retro-success)]";
    if (op >= 50) return "text-yellow-400";
    return "text-white";
  };

  if (compact) {
    return (
      <div className="bg-[var(--retro-bg-panel)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-3">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-pixel text-xs text-[var(--retro-text-dim)]">NAME:</span>
            <span className="font-pixel text-xs text-[var(--retro-text-main)]">{stats.name}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-pixel text-xs text-[var(--retro-text-dim)]">OP:</span>
            <span className={`font-pixel text-xs ${getOPColor(stats.op)}`}>{stats.op}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-pixel text-xs text-[var(--retro-text-dim)]">LVL:</span>
            <span className={`font-pixel text-xs ${getLevelColor(stats.level)}`}>{stats.level}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-pixel text-xs text-[var(--retro-text-dim)]">ITEMS:</span>
            <span className="font-pixel text-xs text-[var(--retro-accent)]">{stats.inventory.length}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--retro-bg-panel)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-4 space-y-4">
      {/* Player Name */}
      <div className="text-center">
        <div className="font-pixel text-xs text-[var(--retro-text-dim)] mb-1">HELD</div>
        <div className="font-pixel text-sm text-[var(--retro-text-main)]">{stats.name}</div>
      </div>

      {/* OP (Ordnungs-Punkte) */}
      <div className="flex items-center justify-between">
        <span className="font-pixel text-xs text-[var(--retro-text-dim)]">OP</span>
        <span className={`font-pixel text-lg ${getOPColor(stats.op)}`}>{stats.op}</span>
      </div>

      {/* Level */}
      <div className="flex items-center justify-between">
        <span className="font-pixel text-xs text-[var(--retro-text-dim)]">LEVEL</span>
        <span className={`font-pixel text-lg ${getLevelColor(stats.level)}`}>{stats.level}</span>
      </div>

      {/* Inventory */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-pixel text-xs text-[var(--retro-text-dim)]">INVENTAR</span>
          <span className="font-pixel text-xs text-[var(--retro-accent)]">{stats.inventory.length} Items</span>
        </div>

        {stats.inventory.length > 0 ? (
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {stats.inventory.map((item, index) => (
              <div key={index} className="font-terminal text-xs text-[var(--retro-text-dim)]">
                • {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="font-terminal text-xs text-[var(--retro-text-dim)] italic">
            Keine Items
          </div>
        )}
      </div>

      {/* Level Progress Indicator */}
      <div className="pt-2 border-t border-[var(--retro-border)]">
        <div className="flex items-center justify-between mb-1">
          <span className="font-pixel text-xs text-[var(--retro-text-dim)]">FORTSCHRITT</span>
          <span className="font-pixel text-xs text-[var(--retro-success)]">
            {Math.min(100, stats.op)}%
          </span>
        </div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 ${
                index < Math.ceil(Math.min(100, stats.op) / 20)
                  ? "bg-[var(--retro-success)]"
                  : "bg-[var(--retro-bg-dark)]"
              } border border-[var(--retro-border)]`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
