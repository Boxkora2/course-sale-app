import type { Metadata } from "next";
import { HeroSection }           from "@/components/home/HeroSection";
import { CategoriesSection }     from "@/components/home/CategoriesSection";
import { FeaturedCoursesSection} from "@/components/home/FeaturedCoursesSection";
import { HowItWorksSection }     from "@/components/home/HowItWorksSection";
import { TestimonialsSection }   from "@/components/home/TestimonialsSection";
import { InstructorsSection }    from "@/components/home/InstructorsSection";
import { CTABannerSection }      from "@/components/home/CTABannerSection";

export const metadata: Metadata = {
  title: "NexLearn — The Future of Learning",
  description:
    "Expand your skills with 200+ cutting-edge courses taught by world-class instructors. Web Development, Data Science, Machine Learning, UI/UX Design and more. Start learning today.",
  keywords: [
    "NexLearn",
    "online learning platform",
    "best online courses",
    "web development courses",
    "data science courses",
    "machine learning courses",
    "e-learning 2026",
    "learn to code",
  ],
  alternates: { canonical: "https://nexlearn.dev" },
  openGraph: {
    type: "website",
    url: "https://nexlearn.dev",
    title: "NexLearn — The Future of Learning",
    description:
      "200+ cutting-edge courses taught by world-class instructors. Learn at your own pace, on your own terms.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NexLearn — The Future of Learning" }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <InstructorsSection />
      <CTABannerSection />
    </>
  );
}
