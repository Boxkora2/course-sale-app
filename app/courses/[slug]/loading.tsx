// app/courses/[slug]/loading.tsx
export default function CourseDetailLoading() {
  return (
    <div className="pt-16 min-h-screen animate-pulse">
      {/* Hero banner skeleton */}
      <div className="bg-card/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-10 lg:flex gap-12">
          <div className="flex-1 max-w-2xl space-y-4">
            <div className="h-4 w-24 bg-muted/50 rounded" />
            <div className="h-10 bg-muted/50 rounded w-3/4" />
            <div className="h-5 bg-muted/40 rounded w-full" />
            <div className="h-5 bg-muted/40 rounded w-2/3" />
            <div className="flex gap-3 mt-4">
              <div className="h-4 w-32 bg-muted/40 rounded" />
              <div className="h-4 w-24 bg-muted/30 rounded" />
            </div>
          </div>
          <div className="hidden lg:block shrink-0 w-80">
            <div className="glass-card p-5 space-y-4">
              <div className="h-10 bg-muted/50 rounded" />
              <div className="h-11 bg-muted/50 rounded" />
              <div className="h-11 bg-muted/40 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Body skeleton */}
      <div className="container mx-auto px-4 py-10">
        <div className="aspect-video max-w-2xl bg-muted/40 rounded-2xl mb-10" />
        <div className="space-y-3 max-w-2xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-muted/30 rounded" style={{ width: `${80 - i * 8}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
