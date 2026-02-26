# GitHub Copilot Instructions — NexLearn

## Project Overview
**NexLearn** is a futuristic course-sale platform built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui. The app sells online courses across 8 tech categories. All data is currently mocked in `/data` — backend/API integration is a future concern.

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
| State Management | Zustand 5 + `persist` middleware |
| Package Manager | pnpm |
| Toasts | sonner |
| Testing | Vitest 4 |

---

## Project Structure
```
app/                      # Next.js App Router pages
  (auth)/login|register   # Auth pages (mock validation, TODO: wire Auth.js)
  courses/
    loading.tsx           # Skeleton grid shown during suspense
    error.tsx             # Error boundary with retry button
    page.tsx              # Course catalogue with filters
    [slug]/
      loading.tsx         # Course detail skeleton
      page.tsx            # Dynamic course detail
  cart/page.tsx           # Cart — reads from useCartStore
  checkout/page.tsx       # Checkout — reads from useCartStore, clears on order
  dashboard/page.tsx
  search/page.tsx
components/
  course/
    CourseCard.tsx        # Server-safe card (no store access)
    AddToCartButton.tsx   # "use client" — reads/writes useCartStore
  home/                   # Landing page sections
  layout/
    Navbar.tsx            # Cart badge count from useCartStore
    Footer.tsx
    MobileMenu.tsx
  shared/                 # SearchBar, RatingStars, CourseBadge, ThemeToggle, ProgressBar
  ui/                     # shadcn/ui primitives — DO NOT EDIT
config/
  site.ts                 # Site name, description, stats — edit here to rebrand
  navigation.ts           # All nav items and footer links
data/
  courses.ts              # Mock course data + types (Course, Section, Lesson)
  instructors.ts          # Mock instructor data
  categories.ts           # Category data
  testimonials.ts         # Testimonial data
lib/
  utils.ts                # cn(), formatPrice(), formatNumber(), truncate(), getInitials()
  utils.test.ts           # Vitest unit tests for utils
store/
  useCartStore.ts         # Zustand cart store (persisted to localStorage)
```

---

## Cart State (Zustand)

The cart is managed by `store/useCartStore.ts` using Zustand with `persist` middleware.

```ts
import { useCartStore } from "@/store/useCartStore";

// Reading state
const { items, discount } = useCartStore();
const count = useCartStore((s) => s.items.length);  // optimized selector

// Actions
addItem(course)     // prevents duplicates automatically
removeItem(id)
clearCart()         // called after successful checkout
applyCoupon(code)   // NEXLEARN20 = 20%, NEXLEARN10 = 10%
removeCoupon()

// Derived helpers (call as functions)
subtotal()          // sum of item prices
total()             // subtotal minus discount
```

**Rules:**
- `useCartStore` can only be called inside `"use client"` components
- Pages/layouts that are RSC must receive cart data via props from a client wrapper
- `persist` key is `"nexlearn-cart"` — stored in `localStorage`
- Never duplicate cart logic in component local state — always use the store

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
- Zustand store hooks always require `"use client"`

### New Components
- Place in the most specific folder (`components/home/`, `components/course/`, etc.)
- Use named exports: `export function MyComponent() {}`
- Accept `className?: string` prop and forward it with `cn()`
- Use `cn()` from `@/lib/utils` for conditional class merging

### TypeScript
- Always type component props with an interface
- Import data types from `@/data/courses`, `@/data/instructors`, etc.
- Use `React.ComponentProps<typeof X>` to extend shadcn component props
- **Never use `any`** — derive types from libraries: `type Opts = NonNullable<Parameters<typeof fn>[1]>`

### Framer Motion — hydration safety
Never use `Math.random()` inside `transition` or `animate` props — values differ between server and client causing hydration errors. Pre-seed all random-looking values in the static data array:
```tsx
// ✅ correct — stable across server and client
const items = [
  { label: "A", animDelay: 0,   animDuration: 3.2 },
  { label: "B", animDelay: 0.6, animDuration: 4.0 },
];
// ❌ wrong — causes hydration mismatch
transition={{ delay: Math.random() * 2 }}
```

---

## Loading & Error Pages

Every route that fetches data **must** have a `loading.tsx` and `error.tsx` sibling:

```tsx
// app/some-route/loading.tsx — skeleton UI
export default function Loading() {
  return <div className="animate-pulse ..." />;
}

// app/some-route/error.tsx — must be "use client"
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <button onClick={reset}>Try again</button>;
}
```

Currently implemented: `app/courses/loading.tsx`, `app/courses/error.tsx`, `app/courses/[slug]/loading.tsx`.

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

## Testing (Vitest)

- Config: `vitest.config.ts` — Node environment, `@` alias resolved
- Tests live alongside source: `lib/utils.test.ts`
- Run: `pnpm test:run` (single pass) or `pnpm test` (watch mode)
- When adding a new utility function to `lib/utils.ts`, add corresponding tests in `lib/utils.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { formatPrice } from "./utils";

describe("formatPrice", () => {
  it("returns Free for 0", () => expect(formatPrice(0)).toBe("Free"));
});
```

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
| `/cart` | Shopping cart (Zustand state) |
| `/checkout` | Checkout — clears cart on success |
| `/dashboard` | User dashboard |
| `/search?q=` | Search results |
| `/login`, `/register` | Auth pages (mock, TODO: Auth.js) |

---

## CI / Quality
- GitHub Actions: `.github/workflows/ci.yml` — runs `pnpm lint` + `tsc --noEmit` on every push and PR
- Always run `pnpm test:run` before committing to ensure utils tests pass
- TypeScript strict mode is on — no `any`, no unchecked indexing

---

## Do / Don't

**Do:**
- Use `cn()` for all class merging
- Use `formatPrice()`, `formatNumber()` from `@/lib/utils`
- Keep config changes in `config/site.ts` and `config/navigation.ts`
- Use `text-muted-foreground` for secondary text
- Use `border-border/50` for subtle borders
- Wrap client-only sections in their own component to keep pages as RSC
- Add `loading.tsx` + `error.tsx` to every new data-fetching route
- Pre-seed animation values — never `Math.random()` inside JSX props

**Don't:**
- Hardcode dark-mode colors (`#0a0a0f`, `#0f0f1a`, `rgba(15,15,26,...)`)
- Use `<img>` tags — use `next/image` with proper `sizes`
- Add `"use client"` to page files unless absolutely necessary
- Modify files in `components/ui/` (shadcn managed)
- Install new animation libraries — use Framer Motion
- Use `any` type — derive types from library signatures instead
- Store cart state in component local state — always use `useCartStore`


---

## Agent Skills
The following skills are installed in `.github/instructions/` and apply automatically:

### `vercel-react-best-practices`
**Apply when:** writing/refactoring any component, page, or data-fetching logic in NexLearn.
Key rules relevant to this project:
- `async-parallel`  when course detail page fetches course + instructor data, use `Promise.all()`
- `async-suspense-boundaries`  wrap course sections in `<Suspense>` with appropriate fallbacks (`loading.tsx` already covers route level)
- `bundle-barrel-imports`  import from `@/lib/utils` directly, avoid re-exporting everything from an index
- `bundle-dynamic-imports`  use `next/dynamic` for heavy Framer Motion sections if bundle grows
- `bundle-defer-third-party`  defer `@vercel/analytics` until after hydration
- `server-cache-react`  use `React.cache()` when adding real API calls to `getCourseBySlug`, `getFeaturedCourses`
- `server-parallel-fetching`  restructure pages to parallel-fetch independent data (courses + instructors)
- `server-serialization`  minimize data passed from RSC to client components (don't pass full Course objects when only id/title needed)
- `rerender-memo`  memoize `CourseCard` in large lists; use `useCartStore((s) => s.items.length)` selector (already correct)
- `rerender-derived-state-no-effect`  derive cart totals during render via `subtotal()` / `total()`, not in effects
- `rerender-functional-setstate`  use functional form in Zustand setters (already applied in `useCartStore.ts`)
- `rendering-conditional-render`  use ternary instead of `&&` for rendering optional cart badge: `{count > 0 ? <Badge> : null}`
- `rendering-hoist-jsx`  hoist static JSX in `HeroSection`, `CTABannerSection` outside the component body
- `rendering-hydration-no-flicker`  pre-seeded animation values in `HeroSection` already correct (no `Math.random()`)

### `vercel-composition-patterns`
**Apply when:** adding new props to existing components or building new reusable UI pieces.
Key rules relevant to this project:
- `architecture-avoid-boolean-props`  instead of `<CourseCard isEnrolled isFeatured />` use composition or explicit variant components
- `architecture-compound-components`  `cart/page.tsx` and `checkout/page.tsx` could be structured as compound components sharing cart context
- `state-decouple-implementation`  `useCartStore` is the only place that knows how cart state is managed; components only call actions (already correct)
- `state-context-interface`  if adding auth or user state, define `{ state, actions, meta }` interface for the store
- `patterns-explicit-variants`  create `<FeaturedCourseCard>` variant instead of `<CourseCard isFeatured />`
- `patterns-children-over-render-props`  prefer `children` prop for layout flexibility over `renderHeader={...}` patterns
- `react19-no-forwardref`  React 19 is in use; skip `forwardRef`, pass `ref` as plain prop

### `web-design-guidelines`
**Apply when:** asked to "review my UI", "check accessibility", "audit design", or "check UX".
Process:
1. Fetch live rules from `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
2. Read the target files
3. Report findings in `file:line` terse format

Key areas to watch in NexLearn:
- **Accessibility**: `AddToCartButton` needs `aria-label` when showing icon-only state; filter buttons need `aria-pressed`
- **Focus states**: all interactive elements need visible `:focus-visible` outlines matching brand colors
- **Forms**: checkout form inputs need `autocomplete` attributes and proper `<label>` associations
- **Animation**: Framer Motion `whileInView` animations should respect `prefers-reduced-motion`
- **Dark Mode**: theming uses `next-themes` with `attribute="class"`  ensure all semantic tokens work in both modes
- **Images**: all `<Image>` components need non-empty `alt` text; course thumbnails should describe course content
