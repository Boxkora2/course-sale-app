import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock, Users, Globe, Calendar, CheckCircle2, Play,
  ShoppingCart, Shield, Star, ChevronDown,
} from "lucide-react";
import { getCourseBySlug, courses } from "@/data/courses";
import { getInstructorById } from "@/data/instructors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RatingStars } from "@/components/shared/RatingStars";
import { CourseBadge } from "@/components/shared/CourseBadge";
import { CourseCard } from "@/components/course/CourseCard";
import { AddToCartButton } from "@/components/course/AddToCartButton";
import { formatPrice, formatNumber } from "@/lib/utils";

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return { title: course.title, description: course.subtitle };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const instructor = getInstructorById(course.instructorId);
  const related = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 4);

  const discount = course.originalPrice > course.price
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="pt-16 min-h-screen">
      {/* ── Hero banner ── */}
      <div className="bg-card/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-10 lg:flex gap-12">
          {/* Left: info */}
          <div className="flex-1 max-w-2xl">
            {course.badge && <CourseBadge variant={course.badge} className="mb-3" />}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-snug">
              {course.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{course.subtitle}</p>

            {/* Rating row */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#f59e0b]">{course.rating}</span>
                <RatingStars rating={course.rating} size="sm" />
                <span className="text-muted-foreground">({formatNumber(course.reviewCount)} reviews)</span>
              </div>
              <span className="text-muted-foreground">·</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                {formatNumber(course.enrollmentCount)} students
              </div>
            </div>

            {/* Meta */}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" /> {course.language}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Updated {course.lastUpdated}
              </span>
            </div>

            {/* Instructor */}
            <div className="mt-4 flex items-center gap-2">
              <Image
                src={course.instructorAvatar}
                alt={course.instructorName}
                width={28}
                height={28}
                className="rounded-full"
                priority
              />
              <span className="text-sm text-muted-foreground">
                by{" "}
                <span className="text-primary font-medium hover:underline cursor-pointer">
                  {course.instructorName}
                </span>
              </span>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="border-border/50 text-xs">{course.level}</Badge>
              {course.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline" className="border-border/50 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right: sticky sidebar (only visible lg+, also shown here for layout) */}
          <div className="hidden lg:block shrink-0 w-80">
            <CourseSidebar
              course={course}
              discount={discount}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container mx-auto px-4 py-10 lg:flex gap-12">
        {/* Left: main content */}
        <div className="flex-1 max-w-2xl space-y-10">
          {/* Thumbnail / preview video */}
          <div className="relative overflow-hidden rounded-2xl aspect-video">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              sizes="(max-width: 1024px) 100vw, 672px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_var(--glow-primary)] hover:scale-110 transition-transform">
                <Play className="h-6 w-6 text-white ml-1" />
              </button>
            </div>
          </div>

          {/* What you'll learn */}
          <section>
            <h2 className="text-xl font-bold mb-4">What you&apos;ll learn</h2>
            <div className="glass-card p-6 grid sm:grid-cols-2 gap-3">
              {course.whatYouLearn.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#10b981] mt-0.5 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="text-xl font-bold mb-4">Requirements</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {course.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span> {r}
                </li>
              ))}
            </ul>
          </section>

          {/* Curriculum */}
          <section>
            <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
            <Accordion type="multiple" className="space-y-2">
              {course.curriculum.map((section) => {
                const totalDuration = section.lessons.reduce((acc, l) => {
                  const [m, s] = l.duration.split(":").map(Number);
                  return acc + m * 60 + s;
                }, 0);
                const hrs = Math.floor(totalDuration / 3600);
                const mins = Math.floor((totalDuration % 3600) / 60);
                return (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    className="glass-card border-0 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-primary/5 text-left">
                      <div className="flex items-center justify-between w-full mr-3">
                        <span className="font-semibold text-sm">{section.title}</span>
                        <span className="text-xs text-muted-foreground shrink-0 ml-4">
                          {section.lessons.length} lessons · {hrs > 0 ? `${hrs}h ` : ""}{mins}m
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4">
                      <div className="space-y-2">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                          >
                            <div className="flex items-center gap-2.5">
                              <Play className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-sm">{lesson.title}</span>
                              {lesson.isPreview && (
                                <Badge className="h-4 text-[10px] bg-primary/20 text-primary border-0 px-1.5">
                                  Preview
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0 ml-4">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>

          {/* Instructor */}
          {instructor && (
            <section>
              <h2 className="text-xl font-bold mb-4">Your Instructor</h2>
              <div className="glass-card p-6 flex gap-5">
                <div className="relative h-20 w-20 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/30">
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{instructor.name}</h3>
                  <p className="text-sm text-muted-foreground">{instructor.specialty}</p>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="flex items-center gap-1 text-[#f59e0b]">
                      <Star className="h-3 w-3 fill-[#f59e0b]" /> {instructor.rating} rating
                    </span>
                    <span className="text-muted-foreground">
                      {formatNumber(instructor.students)} students
                    </span>
                    <span className="text-muted-foreground">
                      {instructor.courses} courses
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right: sticky sidebar (mobile + smaller screens) */}
        <div className="lg:hidden mt-8">
          <CourseSidebar course={course} discount={discount} formatPrice={formatPrice} />
        </div>

        <div className="hidden lg:block shrink-0 w-80">
          <div className="sticky top-24">
            <CourseSidebar course={course} discount={discount} formatPrice={formatPrice} />
          </div>
        </div>
      </div>

      {/* Related courses */}
      {related.length > 0 && (
        <section className="container mx-auto px-4 py-10 border-t border-border/30">
          <h2 className="text-xl font-bold mb-6">Related Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Course Sidebar ──────────────────────────────────────────────
function CourseSidebar({
  course,
  discount,
  formatPrice,
}: {
  course: ReturnType<typeof getCourseBySlug> & {};
  discount: number;
  formatPrice: (n: number) => string;
}) {
  if (!course) return null;
  return (
    <div className="glass-card p-5 space-y-4">
      {/* Price */}
      <div className="flex items-end gap-3">
        <span className={`text-3xl font-black ${course.isFree ? "text-[#10b981]" : ""}`}>
          {formatPrice(course.price)}
        </span>
        {discount > 0 && (
          <>
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(course.originalPrice)}
            </span>
            <span className="text-sm font-bold text-[#ef4444]">{discount}% OFF</span>
          </>
        )}
      </div>

      {/* CTA buttons */}
      <Button
        className="w-full h-11 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0 shadow-[0_0_20px_var(--glow-primary)] hover:shadow-[0_0_40px_var(--glow-primary)] font-semibold"
        asChild
      >
        <Link href="/checkout">Enroll Now</Link>
      </Button>
      <AddToCartButton course={course} />

      {/* Money-back */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-4 w-4 text-[#10b981]" />
        30-day money-back guarantee
      </div>

      {/* Course includes */}
      <div className="border-t border-border/30 pt-4 space-y-2 text-sm">
        <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
          This course includes:
        </p>
        {[
          `${course.duration} of on-demand video`,
          "Lifetime access",
          "Access on mobile and desktop",
          "Certificate of completion",
          "Full-stack project files",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
