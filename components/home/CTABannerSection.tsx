"use client";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function CTABannerSection() {
  return (
    <section className="py-20 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden glass-card rounded-3xl p-10 md:p-16 text-center"
      >
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.1), transparent)",
          }}
        />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm text-primary mb-4">
            <Mail className="h-3.5 w-3.5" /> Stay ahead of the curve
          </span>

          <h2 className="text-3xl md:text-5xl font-black mt-2">
            Ready to{" "}
            <span className="gradient-text">Level Up</span>?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-lg">
            Join 50,000+ learners. Get exclusive course discounts, free tutorials, and career tips delivered weekly.
          </p>

          {/* Newsletter input */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 bg-secondary/50 border-border/50 text-sm"
            />
            <Button
              size="lg"
              className="h-12 px-6 shrink-0 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0 shadow-[0_0_20px_var(--glow-primary)]"
            >
              Subscribe Free
            </Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            No spam, ever. Unsubscribe in one click.
          </p>

          {/* Secondary CTA */}
          <div className="mt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 hover:border-primary/50 hover:bg-primary/10"
              asChild
            >
              <Link href="/courses">
                Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
