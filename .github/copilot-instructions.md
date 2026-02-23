# GitHub Copilot Instructions — NexLearn

## Project Overview
**NexLearn** is a futuristic course-sale platform built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui. The app sells online courses across 8 tech categories. All data is currently mocked in `/data` — backend/API integration is a future concern.

---

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, RSC by default) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + custom CSS variables |
| UI Components | shadcn/ui (Radix UI primitives) |
| Animations | Framer Motion |
| Icons | lucide-react |
| Theming | next-themes (`attribute="class"`, default `"dark"`) |
| Package Manager | pnpm |
| Toasts | sonner |

---

## Project Structure
```
app/                    # Next.js App Router pages
  (auth)/login|register # Auth pages
  courses/[slug]/       # Dynamic course detail
  cart/ checkout/       # Purchase flow
  dashboard/            # User dashboard
  search/               # Search results
components/
  course/               # CourseCard and course-specific UI
  home/                 # Landing page sections
  layout/               # Navbar, Footer, MobileMenu
  shared/               # Reusable: SearchBar, RatingStars, CourseBadge, ThemeToggle, ProgressBar
  ui/                   # shadcn/ui primitives (accordion, avatar, badge, button, card, dialog, input, etc.)
config/
  site.ts               # Site name, description, stats — edit here to rebrand
  navigation.ts         # All nav items and footer links
data/
  courses.ts            # Mock course data + types (Course, Section, Lesson)
  instructors.ts        # Mock instructor data
  categories.ts         # Category data
  testimonials.ts       # Testimonial data
lib/
  utils.ts              # cn(), formatPrice(), formatNumber(), truncate(), getInitials()
```

---

## Theming System
- CSS variables are defined in `app/globals.css`
- `:root` = **light** theme (default)
- `.dark` = **dark** theme (applied to `<html>` by next-themes)
- Custom utilities: `.glass`, `.glass-card`, `.mesh-bg`, `.gradient-text`, `.gradient-text-accent`

**Always use semantic tokens, never hardcode dark colors:**
```tsx
// ✅ correct
className="bg-background text-foreground border-border"
className="bg-card text-card-foreground"
className="bg-muted text-muted-foreground"

// ❌ wrong — breaks light mode
className="bg-[#0f0f1a] text-[#e2e8f0]"
style={{ background: "#0a0a0f" }}
```

**Brand colors** (safe to use directly, consistent across themes):
- Primary: `#7c3aed` (violet)
- Secondary/Accent: `#06b6d4` (cyan)
- Green: `#10b981`, Yellow: `#f59e0b`, Pink: `#ec4899`

---

## Component Conventions

### Server vs Client Components
- Pages and layout sections are **Server Components** by default
- Add `"use client"` only when using hooks, event handlers, or framer-motion
- Framer Motion components (`motion.div`, etc.) always require `"use client"`

### New Components
- Place in the most specific folder (`components/home/`, `components/course/`, etc.)
- Use named exports: `export function MyComponent() {}`
- Accept `className?: string` prop and forward it with `cn()`
- Use `cn()` from `@/lib/utils` for conditional class merging

### TypeScript
- Always type component props with an interface
- Import data types from `@/data/courses`, `@/data/instructors`, etc.
- Use `React.ComponentProps<typeof X>` to extend shadcn component props

---

## Images (next/image)
- Always add `sizes` when using `fill` — match the rendered CSS size
- Add `priority` on above-the-fold images (hero, first 4 course cards)
- External hostnames allowed: `images.unsplash.com`, `api.dicebear.com`
- Use PNG format for dicebear avatars: `https://api.dicebear.com/7.x/avataaars/png?seed=Name`

```tsx
// ✅ correct fill usage
<Image src={src} alt={alt} fill sizes="80px" className="object-cover" />

// ✅ correct above-fold usage
<Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, 33vw" priority />
```

---

## Data Layer
All data lives in `/data/*.ts` files with a `// TODO: Replace with API call` comment.

```ts
// Utility helpers already defined in data/courses.ts
getCourseBySlug(slug: string): Course | undefined
getFeaturedCourses(): Course[]
getTrendingCourses(): Course[]
getCoursesByCategory(category: string): Course[]

// data/instructors.ts
getInstructorById(id: string): Instructor | undefined
```

When adding new data-fetching logic, keep it in the data files and mark it with a `// TODO` comment for future API replacement.

---

## Styling Patterns

### Cards
```tsx
// Standard card — theme-aware, no hardcoded colors
<div className="glass-card p-5">...</div>

// With hover lift
<div className="glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--glow-primary)]">
```

### Section layout
```tsx
<section className="py-20 container mx-auto px-4">
  {/* or with a tinted background: */}
<section className="py-20 bg-card/30">
  <div className="container mx-auto px-4">
```

### Buttons
```tsx
// Primary gradient CTA
<Button className="bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0 shadow-[0_0_20px_var(--glow-primary)]">

// Outline secondary
<Button variant="outline" className="border-border/50 hover:border-primary/50 hover:bg-primary/10">
```

### Framer Motion entrance animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.07 }}
>
```

---

## Routing
| Route | Page |
|---|---|
| `/` | Home (all sections) |
| `/courses` | Course catalogue with filters |
| `/courses/[slug]` | Course detail |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/dashboard` | User dashboard |
| `/search?q=` | Search results |
| `/login`, `/register` | Auth pages |

---

## Do / Don't

**Do:**
- Use `cn()` for all class merging
- Use `formatPrice()`, `formatNumber()` from `@/lib/utils`
- Keep config changes in `config/site.ts` and `config/navigation.ts`
- Use `text-muted-foreground` for secondary text
- Use `border-border/50` for subtle borders
- Wrap client-only sections in their own component to keep pages as RSC

**Don't:**
- Hardcode dark-mode colors (`#0a0a0f`, `#0f0f1a`, `rgba(15,15,26,...)`)
- Use `<img>` tags — use `next/image` with proper `sizes`
- Add `"use client"` to page files unless absolutely necessary
- Modify files in `components/ui/` (shadcn managed)
- Install new animation libraries — use Framer Motion
- Use `any` type
