"use client";
import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export function SearchBar({
  placeholder = "Search for courses, skills, instructors…",
  className,
  compact = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof courses>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const results = courses
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 5);
    setSuggestions(results);
    setOpen(results.length > 0);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 transition-all duration-300 focus-within:border-primary/60 focus-within:bg-card focus-within:shadow-[0_0_15px_var(--glow-primary)]",
            compact ? "h-9" : "h-11"
          )}
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button type="button" onClick={() => { setQuery(""); setOpen(false); }}>
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 glass-card rounded-xl overflow-hidden shadow-xl">
          {suggestions.map((course) => (
            <button
              key={course.id}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-primary/10 transition-colors group"
              onClick={() => {
                router.push(`/courses/${course.slug}`);
                setOpen(false);
                setQuery("");
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-10 w-14 object-cover rounded"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {course.title}
                </p>
                <p className="text-xs text-muted-foreground">{course.instructorName}</p>
              </div>
            </button>
          ))}
          <button
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-primary hover:bg-primary/10 transition-colors border-t border-border/50"
            onClick={() => {
              router.push(`/search?q=${encodeURIComponent(query)}`);
              setOpen(false);
            }}
          >
            <Search className="h-3.5 w-3.5" />
            Search for &quot;{query}&quot;
          </button>
        </div>
      )}
    </div>
  );
}
