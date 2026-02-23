"use client";
import { motion } from "framer-motion";
import { getFeaturedCourses, getTrendingCourses } from "@/data/courses";
import { CourseCard } from "@/components/course/CourseCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "featured", label: "Featured",  icon: Star     },
  { key: "trending", label: "Trending",  icon: TrendingUp },
];

export function FeaturedCoursesSection() {
  const [active, setActive] = useState<"featured" | "trending">("featured");
  const courses = active === "featured" ? getFeaturedCourses() : getTrendingCourses();

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-black">
              <span className="gradient-text">Top Courses</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Hand-picked by our editorial team. Learn from the best.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex glass rounded-lg p-1 gap-1 self-start sm:self-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key as "featured" | "trending")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all duration-200",
                    active === tab.key
                      ? "bg-primary text-white shadow-[0_0_12px_var(--glow-primary)]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courses.slice(0, 8).map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <CourseCard course={course} priority={i < 4} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0"
            asChild
          >
            <Link href="/courses">
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
