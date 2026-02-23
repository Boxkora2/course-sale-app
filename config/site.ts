// config/site.ts
// ─────────────────────────────────────────────────────────────
// Central site configuration — name, description, URLs, SEO defaults.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name:        "NexLearn",
  tagline:     "The Future of Learning",
  description: "Expand your skills with cutting-edge courses taught by world-class instructors. Learn at your own pace, on your own terms.",
  url:         process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexlearn.dev",
  ogImage:     "/og-image.png",

  // Stats displayed in the hero / trust bar
  stats: [
    { label: "Students Enrolled", value: "50K+"   },
    { label: "Expert Courses",    value: "200+"   },
    { label: "Top Instructors",   value: "100+"   },
    { label: "Countries Reached", value: "120+"   },
  ],

  // Social links (also used by Footer)
  social: {
    twitter:  "https://twitter.com",
    linkedin: "https://linkedin.com",
    github:   "https://github.com",
    youtube:  "https://youtube.com",
    discord:  "https://discord.com",
  },

  // Feature flags — toggle features without code changes
  features: {
    darkModeDefault: true,
    googleOAuth:     false,  // set true when OAuth is configured
    stripeCheckout:  false,  // set true when Stripe keys are added
  },
};

export type SiteConfig = typeof siteConfig;
