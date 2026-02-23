import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import { RatingStars } from "@/components/shared/RatingStars";
import { CourseBadge } from "@/components/shared/CourseBadge";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  className?: string;
  compact?: boolean;
  priority?: boolean;
}

export function CourseCard({ course, className, compact = false, priority = false }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        "group flex flex-col glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--glow-primary)]",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
        {/* Badge */}
        {course.badge && (
          <div className="absolute top-2 left-2">
            <CourseBadge variant={course.badge} />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className={cn("flex flex-col flex-1 p-4", compact && "p-3")}>
        <h3 className={cn(
          "font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors",
          compact ? "text-sm" : "text-base"
        )}>
          {course.title}
        </h3>

        {!compact && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
            {course.instructorName}
          </p>
        )}

        <div className="mt-2 flex items-center gap-1.5">
          <RatingStars rating={course.rating} size="sm" showValue />
          <span className="text-xs text-muted-foreground">
            ({formatNumber(course.reviewCount)})
          </span>
        </div>

        {!compact && (
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{formatNumber(course.enrollmentCount)} students</span>
            <span className="mx-1">·</span>
            <span>{course.level}</span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-bold",
              course.isFree ? "text-[#10b981]" : "text-foreground",
              compact ? "text-sm" : "text-base"
            )}>
              {formatPrice(course.price)}
            </span>
            {!course.isFree && course.originalPrice > course.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(course.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
