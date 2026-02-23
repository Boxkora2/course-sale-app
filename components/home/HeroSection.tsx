"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle, Star, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/SearchBar";
import { siteConfig } from "@/config/site";

const floatingBadges = [
  { icon: Star,     label: "4.9 Avg Rating", color: "#f59e0b", x: "8%",  y: "20%" },
  { icon: Users,    label: "50K+ Students",  color: "#7c3aed", x: "88%", y: "30%" },
  { icon: BookOpen, label: "200+ Courses",   color: "#06b6d4", x: "85%", y: "68%" },
  { icon: Award,    label: "Certified",      color: "#10b981", x: "5%",  y: "72%" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-16">
      {/* Animated background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating badges (desktop only) */}
      {floatingBadges.map((badge) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            className="absolute hidden lg:flex items-center gap-2 glass px-3 py-2 rounded-xl text-xs font-medium"
            style={{ left: badge.x, top: badge.y }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <Icon className="h-3.5 w-3.5" style={{ color: badge.color }} />
            {badge.label}
          </motion.div>
        );
      })}

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm text-primary mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          {siteConfig.tagline}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
        >
          <span className="text-foreground">Unlock Your </span>
          <span className="gradient-text">Potential</span>
          <br />
          <span className="text-foreground">with Expert </span>
          <span className="gradient-text-accent">Courses</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {siteConfig.description}
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-8 max-w-xl mx-auto"
        >
          <SearchBar placeholder="What do you want to learn today?" />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="h-12 px-8 text-base bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0 shadow-[0_0_30px_var(--glow-primary)] hover:shadow-[0_0_50px_var(--glow-primary)] hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link href="/courses">
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            asChild
          >
            <Link href="/courses/advanced-react-nextjs">
              <PlayCircle className="mr-2 h-4 w-4 text-primary" />
              Watch Free Preview
            </Link>
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl font-black gradient-text">{stat.value}</span>
              <span className="text-xs">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
