"use client";
// app/courses/error.tsx
// Caught by Next.js App Router when the /courses route throws an error.

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CoursesError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to an error-reporting service in production
    console.error("[CoursesError]", error);
  }, [error]);

  return (
    <div className="min-h-screen pt-28 pb-16 container mx-auto px-4 flex flex-col items-center justify-center text-center">
      <AlertTriangle className="h-14 w-14 text-[#f59e0b] mb-4 opacity-80" />
      <h1 className="text-2xl font-black mb-2">Something went wrong</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        {error.message || "We couldn't load the courses. Check your connection and try again."}
      </p>
      <Button
        onClick={reset}
        className="bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0"
      >
        <RotateCcw className="h-4 w-4 mr-2" /> Try again
      </Button>
    </div>
  );
}
