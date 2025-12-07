"use client";

import { Task } from "@/types/game";

interface MissionTrackerProps {
  tasks: Task[];
  title?: string;
  compact?: boolean;
}

export default function MissionTracker({
  tasks,
  title = "MISSIONEN",
  compact = false
}: MissionTrackerProps) {
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "✅";
      case "failed":
        return "❌";
      case "pending":
      default:
        return "⏳";
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "text-[var(--retro-success)]";
      case "failed":
        return "text-[var(--retro-accent)]";
      case "pending":
      default:
        return "text-[var(--retro-text-dim)]";
    }
  };

  const completedCount = tasks.filter(task => task.status === "completed").length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (compact) {
    return (
      <div className="bg-[var(--retro-bg-panel)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-pixel text-xs text-[var(--retro-text-main)]">{title}</span>
          <span className="font-pixel text-xs text-[var(--retro-success)]">
            {completedCount}/{totalCount}
          </span>
        </div>

        <div className="space-y-1">
          {tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex items-center space-x-2">
              <span className={getStatusColor(task.status)}>
                {getStatusIcon(task.status)}
              </span>
              <span className={`font-terminal text-xs ${getStatusColor(task.status)} ${
                task.status === "completed" ? "line-through" : ""
              }`}>
                {task.description}
              </span>
            </div>
          ))}
          {tasks.length > 3 && (
            <div className="font-terminal text-xs text-[var(--retro-text-dim)] italic">
              ...und {tasks.length - 3} weitere
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--retro-bg-panel)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-pixel text-sm text-[var(--retro-text-main)]">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="font-pixel text-xs text-[var(--retro-success)]">
            {completedCount}/{totalCount}
          </span>
          <div className="w-12 h-2 bg-[var(--retro-bg-dark)] border border-[var(--retro-border)]">
            <div
              className="h-full bg-[var(--retro-success)] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-2 border-2 ${
              task.status === "completed"
                ? "border-[var(--retro-success)] bg-[var(--retro-success)]/10"
                : task.status === "failed"
                ? "border-[var(--retro-accent)] bg-[var(--retro-accent)]/10"
                : "border-[var(--retro-border)] bg-[var(--retro-bg-dark)]/50"
            }`}
          >
            <div className="flex items-start space-x-2">
              <span className={`text-lg ${getStatusColor(task.status)} flex-shrink-0 mt-0.5`}>
                {getStatusIcon(task.status)}
              </span>
              <div className="flex-1">
                <div className={`font-terminal text-xs ${getStatusColor(task.status)} ${
                  task.status === "completed" ? "line-through" : ""
                }`}>
                  {task.description}
                </div>
                {task.isOptional && (
                  <div className="font-pixel text-xs text-[var(--retro-text-dim)] mt-1">
                    OPTIONAL
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-4">
            <div className="font-terminal text-xs text-[var(--retro-text-dim)] italic">
              Keine Missionen verfügbar
            </div>
          </div>
        )}
      </div>

      {/* Progress Summary */}
      {totalCount > 0 && (
        <div className="mt-4 pt-3 border-t border-[var(--retro-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-pixel text-xs text-[var(--retro-text-dim)]">GESAMTFORTSCHRITT</span>
            <span className="font-pixel text-xs text-[var(--retro-success)]">
              {Math.round(progressPercentage)}%
            </span>
          </div>

          {/* 8-bit style progress bar */}
          <div className="flex space-x-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 ${
                  index < Math.floor(progressPercentage / 10)
                    ? "bg-[var(--retro-success)]"
                    : "bg-[var(--retro-bg-dark)]"
                } border border-[var(--retro-border)]`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
