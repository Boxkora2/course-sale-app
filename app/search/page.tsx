"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { courses } from "@/data/courses";
import { CourseCard } from "@/components/course/CourseCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!query && !selectedCategory) return courses;
    return courses.filter((c) => {
      const matchesQuery = !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        c.instructorName.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !selectedCategory || c.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  return (
    <div className="container mx-auto px-4 pt-28 pb-16">
      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mb-10"
      >
        <h1 className="text-2xl font-black mb-2">
          {query ? (
            <>Results for <span className="gradient-text">&ldquo;{query}&rdquo;</span></>
          ) : (
            <>Search <span className="gradient-text">Courses</span></>
          )}
        </h1>
        <SearchBar placeholder="Search courses, instructors, topics…" className="w-full" />
      </motion.div>

      {/* Category quick-filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
            !selectedCategory
              ? "bg-primary text-white border-primary"
              : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
              selectedCategory === cat.slug
                ? "bg-primary text-white border-primary"
                : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-sm text-muted-foreground mb-6">
        <span className="font-semibold text-foreground">{results.length}</span>{" "}
        {results.length === 1 ? "result" : "results"} found
      </p>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <Search className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-lg font-semibold">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try different keywords or remove category filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
            >
              <CourseCard course={course} priority={i < 4} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-28 text-center text-muted-foreground">Loading…</div>}>
      <SearchResults />
    </Suspense>
  );
}
