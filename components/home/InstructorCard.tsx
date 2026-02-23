import Image from "next/image";
import Link from "next/link";
import { Users, BookOpen, Star } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import type { Instructor } from "@/data/instructors";
import { cn } from "@/lib/utils";

interface InstructorCardProps {
  instructor: Instructor;
  className?: string;
}

export function InstructorCard({ instructor, className }: InstructorCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-5 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-[0_8px_30px_var(--glow-primary)] hover:-translate-y-1",
        className
      )}
    >
      <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-primary/40">
        <Image
          src={instructor.avatar}
          alt={instructor.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="font-semibold text-base">{instructor.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{instructor.specialty}</p>
      </div>

      <div className="flex justify-around w-full pt-3 border-t border-border/50">
        <div className="flex flex-col items-center gap-1">
          <Star className="h-4 w-4 text-[#f59e0b]" />
          <span className="text-xs font-semibold">{instructor.rating}</span>
          <span className="text-[10px] text-muted-foreground">Rating</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold">{formatNumber(instructor.students)}</span>
          <span className="text-[10px] text-muted-foreground">Students</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <BookOpen className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold">{instructor.courses}</span>
          <span className="text-[10px] text-muted-foreground">Courses</span>
        </div>
      </div>

      <Link
        href={`/instructors/${instructor.id}`}
        className="text-xs text-primary hover:underline transition-colors"
      >
        View Profile →
      </Link>
    </div>
  );
}
