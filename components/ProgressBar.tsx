"use client";

interface ProgressBarProps {
  current: number;
  max: number;
  label: string;
  showPercentage?: boolean;
  color?: "success" | "accent" | "primary";
}

export default function ProgressBar({
  current,
  max,
  label,
  showPercentage = true,
  color = "success"
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  const filledBlocks = Math.floor(percentage / 10); // 10 blocks total
  const emptyBlocks = 10 - filledBlocks;

  const getColorClasses = (color: string) => {
    switch (color) {
      case "success":
        return {
          bg: "bg-[var(--retro-success)]",
          text: "text-[var(--retro-success)]",
          border: "border-[var(--retro-success)]"
        };
      case "accent":
        return {
          bg: "bg-[var(--retro-accent)]",
          text: "text-[var(--retro-accent)]",
          border: "border-[var(--retro-accent)]"
        };
      case "primary":
        return {
          bg: "bg-[var(--retro-primary)]",
          text: "text-[var(--retro-primary)]",
          border: "border-[var(--retro-primary)]"
        };
      default:
        return {
          bg: "bg-[var(--retro-success)]",
          text: "text-[var(--retro-success)]",
          border: "border-[var(--retro-success)]"
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-[var(--retro-bg-panel)] border-4 border-[var(--retro-border)] shadow-[4px_4px_0_0_var(--retro-border),8px_8px_0_0_rgba(0,0,0,0.3)] p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="font-pixel text-xs text-[var(--retro-text-main)]">
          {label.toUpperCase()}
        </span>
        {showPercentage && (
          <span className={`font-pixel text-xs ${colorClasses.text}`}>
            {current}/{max}
          </span>
        )}
      </div>

      {/* 8-bit style progress bar */}
      <div className="flex items-center space-x-1">
        {/* Filled blocks */}
        {Array.from({ length: filledBlocks }).map((_, index) => (
          <div
            key={`filled-${index}`}
            className={`w-4 h-4 ${colorClasses.bg} ${colorClasses.border} border-2`}
          />
        ))}

        {/* Empty blocks */}
        {Array.from({ length: emptyBlocks }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-4 h-4 bg-[var(--retro-bg-dark)] border-2 border-[var(--retro-border)]"
          />
        ))}
      </div>

      {/* Percentage display */}
      {showPercentage && (
        <div className="text-center mt-2">
          <span className={`font-terminal text-xs ${colorClasses.text}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}
