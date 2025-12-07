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

  // Get background image - always use schloss.jpeg for Level 1
  const getBackgroundImage = () => {
    if (level.id === 1) {
      return "/images/schloss.jpeg";
    }
    return level.backgroundImage || "/images/schloss.jpeg";
  };

  // Determine if Level 2 is available (for now, always false)
  const nextLevelAvailable = false;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 space-y-6 bg-[var(--retro-bg-dark)]">
      {/* Victory Header using ChapterIntro as main container */}
      <div className="w-full max-w-5xl">
        <ChapterIntro
          title={`LEVEL ${level.id} ABGESCHLOSSEN!`}
          subtitle={`${level.title} - Erfolgreich gemeistert!`}
          backgroundSrc={getBackgroundImage()}
          height="lg"
          darken={0.6}
          align="center"
        />
      </div>

      {/* Statistics and Content Card */}
      <Card className="w-full max-w-5xl">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Completion Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] p-4 text-center shadow-[2px_2px_0_0_var(--retro-border)]">
              <div className="font-pixel text-3xl md:text-4xl text-[var(--retro-success)] mb-2 drop-shadow-[0_2px_0_rgba(0,0,0,0.8)]">
                {completionPercentage}%
              </div>
              <div className="font-terminal text-xs text-[var(--retro-text-main)] uppercase">
                Abgeschlossen
              </div>
            </div>

            <div className="bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] p-4 text-center shadow-[2px_2px_0_0_var(--retro-border)]">
              <div className="font-pixel text-3xl md:text-4xl text-[var(--retro-accent)] mb-2 drop-shadow-[0_2px_0_rgba(0,0,0,0.8)]">
                {stats.op}
              </div>
              <div className="font-terminal text-xs text-[var(--retro-text-main)] uppercase">
                Ordnungs-Punkte
              </div>
            </div>

            <div className="bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] p-4 text-center shadow-[2px_2px_0_0_var(--retro-border)]">
              <div className="font-pixel text-3xl md:text-4xl text-[var(--retro-primary)] mb-2 drop-shadow-[0_2px_0_rgba(0,0,0,0.8)]">
                {completedTasks}/{totalTasks}
              </div>
              <div className="font-terminal text-xs text-[var(--retro-text-main)] uppercase">
                Missionen
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          {tasks.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-pixel text-base md:text-lg text-[var(--retro-text-main)] mb-3 uppercase drop-shadow-[0_2px_0_rgba(0,0,0,0.8)]">
                Abgeschlossene Missionen:
              </h3>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 border-2 shadow-[1px_1px_0_0_var(--retro-border)] ${
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
                        className={`font-terminal text-xs md:text-sm ${
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
          )}

          {/* Rewards */}
          {stats.inventory.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-pixel text-base md:text-lg text-[var(--retro-text-main)] mb-3 uppercase drop-shadow-[0_2px_0_rgba(0,0,0,0.8)]">
                Belohnungen:
              </h3>
              <div className="flex flex-wrap gap-2">
                {stats.inventory.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[var(--retro-primary)]/20 border-2 border-[var(--retro-primary)] px-3 py-2 shadow-[1px_1px_0_0_var(--retro-primary)]"
                  >
                    <span className="font-terminal text-xs md:text-sm text-[var(--retro-text-main)]">
                      🎁 {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t-2 border-[var(--retro-border)]">
            {onContinue && (
              <button
                onClick={onContinue}
                className="flex-1 bg-[var(--retro-primary)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-4 font-pixel text-sm md:text-base text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 uppercase"
              >
                {nextLevelAvailable ? `Zu Level ${level.id + 1}` : "Weiter"}
              </button>
            )}
            {onMenu && (
              <button
                onClick={onMenu}
                className="flex-1 bg-[var(--retro-bg-dark)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-4 font-pixel text-sm md:text-base text-[var(--retro-text-main)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 uppercase"
              >
                Hauptmenü
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
