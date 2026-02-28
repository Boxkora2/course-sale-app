import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Courses",
  description:
    "Search NexLearn's library of 200+ courses across Web Development, Data Science, UI/UX Design, Machine Learning, and more.",
  alternates: { canonical: "https://nexlearn.dev/search" },
  openGraph: {
    type: "website",
    url: "https://nexlearn.dev/search",
    title: "Search Courses | NexLearn",
    description: "Find the perfect course from NexLearn's library of 200+ expert-taught programs.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Search NexLearn Courses" }],
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
