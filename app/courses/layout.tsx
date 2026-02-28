import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore All Courses",
  description:
    "Discover 200+ online courses across Web Development, Data Science, Machine Learning, UI/UX Design, and more. Beginner to advanced levels. Learn at your own pace.",
  keywords: [
    "online courses",
    "learn programming",
    "web development course",
    "data science course",
    "machine learning course",
    "UI UX design course",
    "best online courses 2026",
    "NexLearn courses",
  ],
  alternates: { canonical: "https://nexlearn.dev/courses" },
  openGraph: {
    type: "website",
    url: "https://nexlearn.dev/courses",
    title: "Explore All Courses | NexLearn",
    description:
      "Discover 200+ online courses taught by world-class instructors. Filter by category, level, and price.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NexLearn — Explore Courses" }],
  },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
