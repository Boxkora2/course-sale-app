"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen, Award, Clock, TrendingUp, Play, Edit,
  User, Bell, Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { courses } from "@/data/courses";
import { formatNumber } from "@/lib/utils";

// Mock user data — TODO: Replace with auth session
const mockUser = {
  name: "Alex Thompson",
  email: "alex@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Alex",
  joinDate: "March 2025",
};

// Mock enrolled courses with progress — TODO: Replace with API
const enrolledCourses = [
  { ...courses[0], progress: 72 },
  { ...courses[1], progress: 35 },
  { ...courses[2], progress: 100 },
  { ...courses[6], progress: 12 },
];

const certificates = enrolledCourses
  .filter((c) => c.progress === 100)
  .map((c) => ({ id: c.id, title: c.title, date: "Jan 2026", thumbnail: c.thumbnail }));

const stats = [
  { label: "Courses Enrolled", value: enrolledCourses.length, icon: BookOpen, color: "#7c3aed" },
  { label: "Hours Learned",    value: "128",                   icon: Clock,    color: "#06b6d4" },
  { label: "Certificates",     value: certificates.length,     icon: Award,    color: "#10b981" },
  { label: "Day Streak",       value: "14",                    icon: TrendingUp, color: "#f59e0b" },
];

export default function DashboardPage() {
  const recentCourse = [...enrolledCourses]
    .filter((c) => c.progress > 0 && c.progress < 100)
    .sort((a, b) => b.progress - a.progress)[0];

  return (
    <div className="min-h-screen pt-20 pb-16 mesh-bg">
      <div className="container mx-auto px-4 py-10">
        {/* Welcome bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/40">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-black">
                Welcome back, <span className="gradient-text">{mockUser.name.split(" ")[0]}</span>!
              </h1>
              <p className="text-sm text-muted-foreground">
                {mockUser.email} · Member since {mockUser.joinDate}
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </Button>
            <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass-card p-5 flex flex-col gap-3"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}22`, border: `1px solid ${stat.color}44` }}
                >
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-black" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">My Courses</h2>
              <Link href="/courses" className="text-sm text-primary hover:underline">
                + Browse more
              </Link>
            </div>
            <div className="space-y-4">
              {enrolledCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="glass-card p-4 flex gap-4 items-center"
                >
                  <div className="relative h-16 w-24 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                      priority={i === 0}
                    />
                    {course.progress === 100 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Award className="h-6 w-6 text-[#10b981]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1"
                    >
                      {course.title}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.instructorName}</p>
                    <ProgressBar value={course.progress} className="mt-2" />
                  </div>
                  <Button
                    size="sm"
                    variant={course.progress === 100 ? "outline" : "default"}
                    className={
                      course.progress === 100
                        ? "shrink-0 border-[#10b981]/50 text-[#10b981] hover:bg-[#10b981]/10"
                        : "shrink-0 bg-primary text-white hover:bg-primary/90"
                    }
                    asChild
                  >
                    <Link href={`/courses/${course.slug}`}>
                      {course.progress === 100 ? (
                        <Award className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <Play className="h-3.5 w-3.5 mr-1" />
                      )}
                      {course.progress === 100 ? "Complete" : "Continue"}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: recent + certificates + profile */}
          <div className="space-y-6">
            {/* Recently accessed */}
            {recentCourse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-5"
              >
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Continue Learning
                </h3>
                <div className="relative overflow-hidden rounded-xl aspect-video mb-3">
                  <Image
                    src={recentCourse.thumbnail}
                    alt={recentCourse.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-primary/90 text-white hover:bg-primary"
                      asChild
                    >
                      <Link href={`/courses/${recentCourse.slug}`}>
                        <Play className="h-4 w-4 mr-1" /> Resume
                      </Link>
                    </Button>
                  </div>
                </div>
                <p className="text-sm font-medium line-clamp-2">{recentCourse.title}</p>
                <ProgressBar value={recentCourse.progress} className="mt-2" />
              </motion.div>
            )}

            {/* Certificates */}
            {certificates.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-5"
              >
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#10b981]" /> Certificates Earned
                </h3>
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#10b981]/20 border border-[#10b981]/30 flex items-center justify-center shrink-0">
                        <Award className="h-5 w-5 text-[#10b981]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{cert.title}</p>
                        <p className="text-xs text-muted-foreground">{cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Profile quick-edit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5"
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" /> Profile
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{mockUser.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium text-xs">{mockUser.email}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full border-border/50 hover:border-primary/50"
              >
                <Edit className="h-3.5 w-3.5 mr-2" /> Edit Profile
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
