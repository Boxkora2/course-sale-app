import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;  // 0-100
  label?: string;
  showPercentage?: boolean;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({
  value,
  label,
  showPercentage = true,
  className,
  barClassName,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span className="text-xs font-semibold text-foreground">{clamped}%</span>
          )}
        </div>
      )}
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]",
            barClassName
          )}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
