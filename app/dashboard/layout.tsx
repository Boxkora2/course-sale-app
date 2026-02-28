import type { Metadata } from "next";

// Dashboard is authenticated/personal — prevent indexing
export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Track your enrolled courses, learning progress, and achievements.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
