"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, BookOpen, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormData>({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim())       e.name = "Full name is required";
    if (!form.email)             e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password)          e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    if (!form.confirm)           e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Replace with actual registration call
      alert("Registration successful (mock) — connect auth provider here.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 mesh-bg px-4 py-10">
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
          <p className="text-sm text-muted-foreground mt-1">Create your free account</p>
        </div>

        {/* Google OAuth (placeholder) */}
        <Button
          variant="outline"
          className="w-full h-11 border-border/50 hover:border-primary/50 hover:bg-primary/5 mb-4"
          type="button"
        >
          <Chrome className="h-4 w-4 mr-2" />
          Sign up with Google
        </Button>

        <div className="relative flex items-center gap-3 mb-4">
          <Separator className="flex-1 bg-border/30" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1 bg-border/30" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={update("name")}
                className={`pl-9 h-11 bg-secondary/50 border-border/50 focus:border-primary/60 focus:shadow-[0_0_10px_var(--glow-primary)] transition-all ${errors.name ? "border-destructive" : ""}`}
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={update("email")}
                className={`pl-9 h-11 bg-secondary/50 border-border/50 focus:border-primary/60 focus:shadow-[0_0_10px_var(--glow-primary)] transition-all ${errors.email ? "border-destructive" : ""}`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={form.password}
                onChange={update("password")}
                className={`pl-9 pr-10 h-11 bg-secondary/50 border-border/50 focus:border-primary/60 focus:shadow-[0_0_10px_var(--glow-primary)] transition-all ${errors.password ? "border-destructive" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <Label htmlFor="confirm" className="text-sm font-medium">Confirm Password</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirm"
                type="password"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={update("confirm")}
                className={`pl-9 h-11 bg-secondary/50 border-border/50 focus:border-primary/60 focus:shadow-[0_0_10px_var(--glow-primary)] transition-all ${errors.confirm ? "border-destructive" : ""}`}
              />
            </div>
            {errors.confirm && <p className="mt-1 text-xs text-destructive">{errors.confirm}</p>}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0 shadow-[0_0_20px_var(--glow-primary)] hover:shadow-[0_0_40px_var(--glow-primary)] transition-all font-semibold"
          >
            Create Free Account
          </Button>
        </form>

        <p className="mt-4 text-xs text-center text-muted-foreground">
          By signing up you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
