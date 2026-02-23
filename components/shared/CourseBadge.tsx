import { Badge as ShadBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeVariant = "Bestseller" | "New" | "Hot" | "Free" | string;

interface CourseBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantStyles: Record<string, string> = {
  Bestseller: "bg-[#f59e0b] text-black hover:bg-[#d97706]",
  New:        "bg-[#10b981] text-white hover:bg-[#059669]",
  Hot:        "bg-[#ef4444] text-white hover:bg-[#dc2626]",
  Free:       "bg-[#7c3aed] text-white hover:bg-[#6d28d9]",
};

export function CourseBadge({ variant, className }: CourseBadgeProps) {
  return (
    <ShadBadge
      className={cn(
        "text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5",
        variantStyles[variant] ?? "bg-secondary text-secondary-foreground",
        className
      )}
    >
      {variant}
    </ShadBadge>
  );
}
