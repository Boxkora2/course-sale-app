// app/courses/loading.tsx
// Shown by Next.js while the courses page suspends / fetches.
export default function CoursesLoading() {
  return (
    <div className="min-h-screen pt-28 pb-16 container mx-auto px-4">
      {/* Page title skeleton */}
      <div className="h-8 w-48 rounded-lg bg-muted/50 animate-pulse mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-60 shrink-0 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 rounded-lg bg-muted/40 animate-pulse" />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="glass-card rounded-xl overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="aspect-video bg-muted/50" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted/50 rounded w-3/4" />
                <div className="h-3 bg-muted/40 rounded w-1/2" />
                <div className="h-3 bg-muted/30 rounded w-full" />
                <div className="h-5 bg-muted/50 rounded w-1/4 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
