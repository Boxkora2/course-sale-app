export const runtime = "edge";

export function GET() {
  const body = `# NexLearn

> Futuristic e-learning platform that sells online courses across 8 tech categories. Built with Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, and Zustand.

## Pages

- [Home](/): Hero, category grid, featured courses, how-it-works, testimonials, instructors, CTA
- [Courses](/courses): Full course catalogue with category, level, and price filters
- [Course Detail](/courses/[slug]): Full course info — curriculum, instructor, reviews, enroll
- [Search](/search): Full-text search across titles, tags, and instructors
- [Cart](/cart): Shopping cart (Zustand persisted state)
- [Checkout](/checkout): Order completion with coupon support

## Optional

- [Sitemap](/sitemap.xml)
- [Robots](/robots.txt)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
