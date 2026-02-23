import Image from "next/image";
import { Quote } from "lucide-react";
import { RatingStars } from "@/components/shared/RatingStars";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_4px_20px_var(--glow-primary)]",
        className
      )}
    >
      <Quote className="h-6 w-6 text-primary/60 shrink-0" />
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="mt-auto">
        <RatingStars rating={testimonial.rating} size="sm" />
        <p className="mt-1 text-xs text-muted-foreground italic">
          Course: {testimonial.courseTitle}
        </p>
      </div>
      <div className="flex items-center gap-3 pt-3 border-t border-border/50">
        <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/30">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
