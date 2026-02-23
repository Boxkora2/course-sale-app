import { HeroSection }           from "@/components/home/HeroSection";
import { CategoriesSection }     from "@/components/home/CategoriesSection";
import { FeaturedCoursesSection} from "@/components/home/FeaturedCoursesSection";
import { HowItWorksSection }     from "@/components/home/HowItWorksSection";
import { TestimonialsSection }   from "@/components/home/TestimonialsSection";
import { InstructorsSection }    from "@/components/home/InstructorsSection";
import { CTABannerSection }      from "@/components/home/CTABannerSection";

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
