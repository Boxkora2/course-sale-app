import Link from "next/link";
import {
  Globe, BarChart2, Brain, Palette, Smartphone, Shield, Cloud, Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Globe, BarChart2, Brain, Palette, Smartphone, Shield, Cloud, Link: LinkIcon,
};

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = iconMap[category.icon] ?? Globe;

  return (
    <Link
      href={`/courses?category=${category.slug}`}
      className={cn(
        "group glass-card p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)] cursor-pointer",
        className
      )}
      style={{ "--cat-color": category.color } as React.CSSProperties}
    >
      <div
        className="h-14 w-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ background: `${category.color}22`, border: `1px solid ${category.color}44` }}
      >
        <Icon
          className="h-7 w-7 transition-colors duration-300"
          style={{ color: category.color }}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.label}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {category.courseCount} courses
        </p>
      </div>
    </Link>
  );
}
