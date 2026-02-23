"use client";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/home/CategoryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CategoriesSection() {
  return (
    <section className="py-20 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-black">
          Explore{" "}
          <span className="gradient-text">Top Categories</span>
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          From web development to AI — find the perfect category to accelerate your career.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <CategoryCard category={category} />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button variant="outline" className="border-border/50 hover:border-primary/50 hover:bg-primary/10" asChild>
          <Link href="/courses">
            Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
