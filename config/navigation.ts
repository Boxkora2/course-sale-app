// config/navigation.ts
// ─────────────────────────────────────────────────────────────
// Edit this file to add/remove/reorder navigation items.
// No component code changes needed.
// ─────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  badge?: string; // e.g. "New", "Hot"
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "Web Development",    href: "/courses?category=web-development" },
      { label: "Data Science",       href: "/courses?category=data-science" },
      { label: "Mobile Development", href: "/courses?category=mobile-development" },
      { label: "UI/UX Design",       href: "/courses?category=ui-ux-design" },
      { label: "Cybersecurity",      href: "/courses?category=cybersecurity" },
      { label: "Cloud & DevOps",     href: "/courses?category=cloud-devops" },
    ],
  },
  { label: "Pricing",      href: "/pricing" },
  { label: "Blog",         href: "/blog",    badge: "New" },
  { label: "Instructors",  href: "/instructors" },
];

export const footerLinks = {
  company: [
    { label: "About Us",    href: "/about" },
    { label: "Careers",     href: "/careers" },
    { label: "Blog",        href: "/blog" },
    { label: "Press",       href: "/press" },
    { label: "Affiliates",  href: "/affiliates" },
  ],
  support: [
    { label: "Help Center",      href: "/help" },
    { label: "Contact Us",       href: "/contact" },
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Settings",  href: "/cookies" },
  ],
  courses: [
    { label: "Web Development",    href: "/courses?category=web-development" },
    { label: "Data Science",       href: "/courses?category=data-science" },
    { label: "Mobile Development", href: "/courses?category=mobile-development" },
    { label: "UI/UX Design",       href: "/courses?category=ui-ux-design" },
    { label: "Cybersecurity",      href: "/courses?category=cybersecurity" },
  ],
  social: [
    { label: "Twitter/X",  href: "https://twitter.com",  icon: "twitter"   },
    { label: "LinkedIn",   href: "https://linkedin.com", icon: "linkedin"  },
    { label: "GitHub",     href: "https://github.com",   icon: "github"    },
    { label: "YouTube",    href: "https://youtube.com",  icon: "youtube"   },
    { label: "Discord",    href: "https://discord.com",  icon: "discord"   },
  ],
};
