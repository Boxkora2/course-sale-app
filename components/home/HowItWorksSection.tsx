"use client";
import { motion } from "framer-motion";
import { Search, BookOpen, Award } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Find Your Course",
    description:
      "Browse 200+ expert-led courses across 8 categories. Use smart filters to find exactly what matches your goals and skill level.",
    color: "#7c3aed",
  },
  {
    step: "02",
    icon: BookOpen,
    title: "Learn at Your Pace",
    description:
      "Stream HD video lessons on any device. Pause, rewind, and tackle hands-on projects in our built-in coding environment.",
    color: "#06b6d4",
  },
  {
    step: "03",
    icon: Award,
    title: "Earn Your Certificate",
    description:
      "Complete the course, pass the final assessment, and earn a verified certificate to showcase on LinkedIn and your portfolio.",
    color: "#10b981",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-black">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Getting started is simple. Three steps stand between you and your next breakthrough.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connector line (desktop) */}
        <div
          aria-hidden
          className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px"
          style={{
            background:
              "linear-gradient(90deg, #7c3aed, #06b6d4, #10b981)",
            opacity: 0.3,
          }}
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 flex flex-col items-center text-center relative"
            >
              {/* Step number */}
              <span
                className="text-5xl font-black opacity-10 absolute top-4 right-4"
                style={{ color: step.color }}
              >
                {step.step}
              </span>

              {/* Icon */}
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: `${step.color}22`,
                  border: `1px solid ${step.color}44`,
                }}
              >
                <Icon className="h-8 w-8" style={{ color: step.color }} />
              </div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
