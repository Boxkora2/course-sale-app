"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { courses } from "@/data/courses";
import { categories } from "@/data/categories";
import { CourseCard } from "@/components/course/CourseCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { CourseLevel } from "@/data/courses";

const LEVELS: CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = [
  { value: "popular",  label: "Most Popular"   },
  { value: "newest",   label: "Newest"         },
  { value: "rating",   label: "Highest Rated"  },
  { value: "price-lo", label: "Price: Low → High" },
  { value: "price-hi", label: "Price: High → Low" },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevels, setSelectedLevels]     = useState<CourseLevel[]>([]);
  const [freeOnly, setFreeOnly]                 = useState(false);
  const [minRating, setMinRating]               = useState(0);
  const [sort, setSort]                         = useState("popular");
  const [sidebarOpen, setSidebarOpen]           = useState(false);
  const [query, setQuery]                       = useState("");

  const filtered = useMemo(() => {
    let result = [...courses];
    if (query)            result = result.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.instructorName.toLowerCase().includes(query.toLowerCase()));
    if (selectedCategory) result = result.filter(c => c.category === selectedCategory);
    if (selectedLevels.length) result = result.filter(c => selectedLevels.includes(c.level));
    if (freeOnly)         result = result.filter(c => c.isFree);
    if (minRating > 0)    result = result.filter(c => c.rating >= minRating);

    switch (sort) {
      case "popular":  result.sort((a, b) => b.enrollmentCount - a.enrollmentCount); break;
      case "newest":   result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated)); break;
      case "rating":   result.sort((a, b) => b.rating - a.rating); break;
      case "price-lo": result.sort((a, b) => a.price - b.price); break;
      case "price-hi": result.sort((a, b) => b.price - a.price); break;
    }
    return result;
  }, [query, selectedCategory, selectedLevels, freeOnly, minRating, sort]);

  const toggleLevel = (level: CourseLevel) =>
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedLevels([]);
    setFreeOnly(false);
    setMinRating(0);
    setQuery("");
  };

  const hasFilters = selectedCategory || selectedLevels.length > 0 || freeOnly || minRating > 0 || query;

  return (
    <div className="min-h-screen pt-20 pb-16 container mx-auto px-4">
      {/* Header */}
      <div className="py-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black"
        >
          All <span className="gradient-text">Courses</span>
        </motion.h1>
        <p className="mt-2 text-muted-foreground">
          {courses.length} courses across {categories.length} categories
        </p>
        <div className="mt-5 max-w-lg">
          <SearchBar
            placeholder="Search courses…"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside
          className={cn(
            "w-64 shrink-0 hidden lg:block space-y-6",
          )}
        >
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLevels={selectedLevels}
            toggleLevel={toggleLevel}
            freeOnly={freeOnly}
            setFreeOnly={setFreeOnly}
            minRating={minRating}
            setMinRating={setMinRating}
            hasFilters={!!hasFilters}
            clearFilters={clearFilters}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Sort + results bar */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> results found
            </p>
            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none glass rounded-lg px-3 py-1.5 pr-8 text-sm text-foreground border border-border/50 focus:border-primary/50 focus:outline-none cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-card">
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Course grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-semibold">No courses found</p>
              <p className="text-sm mt-2">Try adjusting your filters</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((course, i) => (
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
      </div>
    </div>
  );
}

// ── Filter Sidebar ──────────────────────────────────────────────
interface FilterSidebarProps {
  categories: typeof import("@/data/categories").categories;
  selectedCategory: string | null;
  setSelectedCategory: (c: string | null) => void;
  selectedLevels: CourseLevel[];
  toggleLevel: (l: CourseLevel) => void;
  freeOnly: boolean;
  setFreeOnly: (v: boolean) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  hasFilters: boolean;
  clearFilters: () => void;
}

function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedLevels,
  toggleLevel,
  freeOnly,
  setFreeOnly,
  minRating,
  setMinRating,
  hasFilters,
  clearFilters,
}: FilterSidebarProps) {
  return (
    <div className="glass-card p-5 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Filters
        </h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      <Separator className="bg-border/30" />

      {/* Categories */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Category</h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
              className={cn(
                "flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-sm transition-all",
                selectedCategory === cat.slug
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <span>{cat.label}</span>
              <span className="text-xs opacity-60">{cat.courseCount}</span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="bg-border/30" />

      {/* Level */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Level</h4>
        <div className="space-y-2">
          {LEVELS.map((level) => (
            <label key={level} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={cn(
                  "h-4 w-4 rounded border transition-all",
                  selectedLevels.includes(level)
                    ? "bg-primary border-primary"
                    : "border-border/50 group-hover:border-primary/50"
                )}
                onClick={() => toggleLevel(level)}
              >
                {selectedLevels.includes(level) && (
                  <svg viewBox="0 0 12 12" fill="none" className="text-white w-full h-full p-0.5">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-sm text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer"
                onClick={() => toggleLevel(level)}
              >
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="bg-border/30" />

      {/* Price */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Price</h4>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div
            className={cn(
              "h-4 w-4 rounded border transition-all",
              freeOnly ? "bg-primary border-primary" : "border-border/50 group-hover:border-primary/50"
            )}
            onClick={() => setFreeOnly(!freeOnly)}
          >
            {freeOnly && (
              <svg viewBox="0 0 12 12" fill="none" className="text-white w-full h-full p-0.5">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors" onClick={() => setFreeOnly(!freeOnly)}>
            Free courses only
          </span>
        </label>
      </div>

      <Separator className="bg-border/30" />

      {/* Rating */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Min Rating: {minRating > 0 ? `${minRating}+` : "Any"}
        </h4>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={minRating}
          onChange={(e) => setMinRating(parseFloat(e.target.value))}
          className="w-full accent-[#7c3aed]"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Any</span>
          <span>5★</span>
        </div>
      </div>
    </div>
  );
}
