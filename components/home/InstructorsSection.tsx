"use client";
import { motion } from "framer-motion";
import { instructors } from "@/data/instructors";
import { InstructorCard } from "@/components/home/InstructorCard";

export function InstructorsSection() {
  return (
    <section className="py-20 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-black">
          Meet Our <span className="gradient-text">Expert Instructors</span>
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Learn from industry veterans at Google, Meta, Airbnb and more.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {instructors.map((inst, i) => (
          <motion.div
            key={inst.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <InstructorCard instructor={inst} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
