export const runtime = "edge";

export function GET() {
  const body = `# NexLearn — Full Context

> NexLearn is a futuristic course-sale platform. Brand domain: https://nexlearn.dev

## Tech Stack

- Framework: Next.js 16 (App Router, RSC by default)
- Language: TypeScript (strict)
- Styling: Tailwind CSS v4 + custom CSS variables + glass utilities
- UI Components: shadcn/ui (Radix UI primitives)
- Animations: Framer Motion
- Icons: lucide-react
- Theming: next-themes (default: dark)
- State: Zustand 5 + persist middleware (cart)
- Package Manager: pnpm
- Toasts: sonner

## Course Catalogue (8 courses)

1. Advanced React & Next.js 15 (slug: advanced-react-nextjs) — Web Dev — Advanced — $89.99 — 42h 30m
2. Machine Learning A–Z (slug: machine-learning-a-z) — ML — Intermediate — $94.99 — 58h 10m
3. UI/UX Design Mastery with Figma (slug: ui-ux-design-mastery) — Design — Beginner — $74.99 — 36h
4. Data Science Bootcamp 2026 (slug: data-science-bootcamp) — Data Science — Beginner — $84.99 — 52h 20m
5. Cloud Architecture Mastery: AWS & Kubernetes (slug: cloud-architecture-mastery) — Cloud/DevOps — Intermediate — $94.99 — 48h 15m
6. Ethical Hacking & Penetration Testing (slug: ethical-hacking-pentesting) — Cybersecurity — Intermediate — $89.99 — 44h
7. React Native: Build iOS & Android Apps (slug: react-native-mobile-development) — Mobile — Intermediate — $79.99 — 38h 45m
8. Python for Absolute Beginners (slug: python-for-beginners-free) — Data Science — Beginner — FREE — 12h

## Categories (8)

web-development, machine-learning, ui-ux-design, data-science, cloud-devops, cybersecurity, mobile-development, blockchain

## Key Features

- Cart persisted to localStorage via Zustand
- Coupon codes: NEXLEARN20 (20% off), NEXLEARN10 (10% off)
- Dark/light theme toggle via next-themes
- Course catalogue with filter by category, level, price
- Full-text search
- Responsive Framer Motion animations

## Theme Colors

- Primary: #7c3aed (violet)
- Secondary/Accent: #06b6d4 (cyan)
- Background (dark): #0f0a1e
- Background (light): #f8f9fa
- Custom utilities: .glass, .glass-card, .mesh-bg, .gradient-text

## Data Notes

All data is mocked in /data/. Backend/API integration is a future concern.
Zustand cart store persisted under key "nexlearn-cart".
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
