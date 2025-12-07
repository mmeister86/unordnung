"use client";

import { Task, PlayerStats, LevelData } from "@/types/game";
import ChapterIntro from "@/components/ui/8bit/blocks/chapter-intro";
import { Card, CardContent } from "@/components/ui/8bit/card";

interface VictoryScreenProps {
  level: LevelData;
  stats: PlayerStats;
  tasks: Task[];
  onContinue?: () => void;
  onMenu?: () => void;
}

export default function VictoryScreen({
  level,
  stats,
  tasks,
  onContinue,
  onMenu,
}: VictoryScreenProps) {
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get background image based on level
  const getBackgroundImage = () => {
    if (level.id === 1) {
      return "/images/schloss.jpeg";
    }
    return level.backgroundImage || "/placeholder.svg";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      {/* Victory Header using ChapterIntro */}
      <div className="w-full max-w-4xl">
        <ChapterIntro
          title={`LEVEL ${level.id} ABGESCHLOSSEN!`}
          subtitle={`${level.title} - Erfolgreich gemeistert!`}
          backgroundSrc={getBackgroundImage()}
          height="lg"
          darken={0.6}
        />
      </div>

      {/* Statistics Card */}
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6 space-y-6">
          {/* Completion Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] p-4 text-center">
              <div className="font-pixel text-3xl text-[var(--retro-success)] mb-2">
                {completionPercentage}%
              </div>
              <div className="font-terminal text-xs text-[var(--retro-text-main)]">
                ABGESCHLOSSEN
              </div>
            </div>

            <div className="bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] p-4 text-center">
              <div className="font-pixel text-3xl text-[var(--retro-accent)] mb-2">
                {stats.op}
              </div>
              <div className="font-terminal text-xs text-[var(--retro-text-main)]">
                ORDNUNGS-PUNKTE
              </div>
            </div>

            <div className="bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] p-4 text-center">
              <div className="font-pixel text-3xl text-[var(--retro-primary)] mb-2">
                {completedTasks}/{totalTasks}
              </div>
              <div className="font-terminal text-xs text-[var(--retro-text-main)]">
                MISSIONEN
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="space-y-2">
            <h3 className="font-pixel text-sm text-[var(--retro-text-main)] mb-3">
              ABGESCHLOSSENE MISSIONEN:
            </h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 border-2 ${
                    task.status === "completed"
                      ? "border-[var(--retro-success)] bg-[var(--retro-success)]/10"
                      : "border-[var(--retro-border)] bg-[var(--retro-bg-dark)]/50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {task.status === "completed" ? "✅" : "⏳"}
                    </span>
                    <span
                      className={`font-terminal text-xs ${
                        task.status === "completed"
                          ? "text-[var(--retro-success)] line-through"
                          : "text-[var(--retro-text-dim)]"
                      }`}
                    >
                      {task.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          {stats.inventory.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-pixel text-sm text-[var(--retro-text-main)] mb-3">
                BELOHNUNGEN:
              </h3>
              <div className="flex flex-wrap gap-2">
                {stats.inventory.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[var(--retro-primary)]/20 border-2 border-[var(--retro-primary)] px-3 py-2"
                  >
                    <span className="font-terminal text-xs text-[var(--retro-text-main)]">
                      🎁 {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {onContinue && (
              <button
                onClick={onContinue}
                className="flex-1 bg-[var(--retro-primary)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-4 font-pixel text-sm text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
              >
                WEITER
              </button>
            )}
            {onMenu && (
              <button
                onClick={onMenu}
                className="flex-1 bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-4 font-pixel text-sm text-[var(--retro-text-main)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
              >
                HAUPTMENÜ
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
