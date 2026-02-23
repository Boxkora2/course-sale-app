"use client";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function RatingStars({
  rating,
  max = 5,
  size = "md",
  showValue = false,
  className,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <div key={i} className="relative">
            <Star
              className={cn(
                sizeMap[size],
                "text-muted-foreground fill-muted-foreground opacity-20"
              )}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                width: filled ? "100%" : partial ? `${(rating % 1) * 100}%` : "0%",
              }}
            >
              <Star
                className={cn(sizeMap[size], "text-[#f59e0b] fill-[#f59e0b]")}
              />
            </div>
          </div>
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-semibold text-[#f59e0b]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
