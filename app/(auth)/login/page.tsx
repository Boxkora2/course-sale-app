"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, BookOpen, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "At least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Replace with actual auth call
      alert("Login successful (mock) — connect auth provider here.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 mesh-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 rounded-2xl w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center mb-3 shadow-[0_0_20px_var(--glow-primary)]">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-black gradient-text">{siteConfig.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back</p>
        </div>

        {/* Google OAuth (placeholder) */}
        <Button
          variant="outline"
          className="w-full h-11 border-border/50 hover:border-primary/50 hover:bg-primary/5 mb-4"
          type="button"
        >
          <Chrome className="h-4 w-4 mr-2" />
          Continue with Google
        </Button>

        <div className="relative flex items-center gap-3 mb-4">
          <Separator className="flex-1 bg-border/30" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1 bg-border/30" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-9 h-11 bg-secondary/50 border-border/50 focus:border-primary/60 focus:shadow-[0_0_10px_var(--glow-primary)] transition-all ${errors.email ? "border-destructive" : ""}`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-9 pr-10 h-11 bg-secondary/50 border-border/50 focus:border-primary/60 focus:shadow-[0_0_10px_var(--glow-primary)] transition-all ${errors.password ? "border-destructive" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0 shadow-[0_0_20px_var(--glow-primary)] hover:shadow-[0_0_40px_var(--glow-primary)] transition-all font-semibold"
          >
            Log In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Sign up free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
