// data/courses.ts
// TODO: Replace with API call to /api/courses

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseBadge  = "Bestseller" | "New" | "Hot" | "Free" | null;

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "12:30"
  isPreview?: boolean;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  previewVideo?: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  category: string;
  tags: string[];
  level: CourseLevel;
  language: string;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  price: number;
  originalPrice: number;
  badge: CourseBadge;
  isFree: boolean;
  duration: string;  // total e.g. "42h 30m"
  lastUpdated: string;
  whatYouLearn: string[];
  requirements: string[];
  curriculum: Section[];
  featured: boolean;
  trending: boolean;
}

// Shared thumbnails (placeholder images via unsplash-style service)
const thumbs: Record<string, string> = {
  web:     "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80",
  ds:      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  ml:      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
  ux:      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  mobile:  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  cyber:   "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80",
  cloud:   "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
  block:   "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
};

export const courses: Course[] = [
  // ── 1. Advanced React & Next.js ─────────────────────────────
  {
    id: "c-1",
    slug: "advanced-react-nextjs",
    title: "Advanced React & Next.js 15",
    subtitle: "Build production-grade apps with the latest React patterns, Server Components, and App Router.",
    description: "Deep-dive into modern React and Next.js 15. Cover Server Components, streaming, advanced caching strategies, and deploy to the edge. Includes 3 full-stack projects.",
    thumbnail: thumbs.web,
    instructorId: "inst-2",
    instructorName: "Marcus Chen",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Marcus",
    category: "web-development",
    tags: ["React", "Next.js", "TypeScript", "Full-Stack"],
    level: "Advanced",
    language: "English",
    rating: 4.9,
    reviewCount: 3241,
    enrollmentCount: 18500,
    price: 89.99,
    originalPrice: 199.99,
    badge: "Bestseller",
    isFree: false,
    duration: "42h 30m",
    lastUpdated: "2026-01-15",
    whatYouLearn: [
      "React 19 concurrent features and Server Components",
      "Next.js 15 App Router architecture",
      "Advanced state management with Zustand & React Query",
      "Authentication with NextAuth.js v5",
      "Edge deployment on Vercel and Cloudflare",
      "Performance optimization and Core Web Vitals",
      "CI/CD pipelines for Next.js projects",
      "Testing with Vitest and Playwright",
    ],
    requirements: [
      "Solid understanding of JavaScript ES6+",
      "Basic experience with React (hooks, components)",
      "Familiarity with TypeScript basics",
    ],
    curriculum: [
      {
        id: "s-1-1",
        title: "React 19 Deep Dive",
        lessons: [
          { id: "l-1", title: "What's new in React 19",          duration: "18:42", isPreview: true },
          { id: "l-2", title: "Server Components explained",      duration: "24:15" },
          { id: "l-3", title: "Streaming and Suspense",           duration: "20:08" },
          { id: "l-4", title: "Actions and useFormStatus",        duration: "16:30" },
        ],
      },
      {
        id: "s-1-2",
        title: "Next.js 15 App Router",
        lessons: [
          { id: "l-5", title: "App Router vs Pages Router",       duration: "22:10", isPreview: true },
          { id: "l-6", title: "Layouts, templates and slots",     duration: "19:44" },
          { id: "l-7", title: "Caching strategies deep-dive",     duration: "28:00" },
          { id: "l-8", title: "Route handlers and middleware",    duration: "21:05" },
        ],
      },
      {
        id: "s-1-3",
        title: "Full-Stack Project: SaaS Dashboard",
        lessons: [
          { id: "l-9",  title: "Project setup and auth",          duration: "32:00" },
          { id: "l-10", title: "Database with Prisma + Neon",     duration: "27:15" },
          { id: "l-11", title: "Realtime features with Pusher",   duration: "24:30" },
          { id: "l-12", title: "Payments with Stripe",            duration: "35:00" },
          { id: "l-13", title: "Deployment and monitoring",       duration: "18:20" },
        ],
      },
    ],
    featured: true,
    trending: true,
  },

  // ── 2. Machine Learning A–Z ──────────────────────────────────
  {
    id: "c-2",
    slug: "machine-learning-a-z",
    title: "Machine Learning A–Z: Build Real Projects",
    subtitle: "From linear regression to neural networks — master ML with Python and deploy models to production.",
    description: "The complete machine learning course. Start from first principles math, build every algorithm from scratch, then use scikit-learn, PyTorch and TensorFlow for real projects.",
    thumbnail: thumbs.ml,
    instructorId: "inst-1",
    instructorName: "Dr. Aisha Patel",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Aisha",
    category: "machine-learning",
    tags: ["Python", "TensorFlow", "PyTorch", "scikit-learn"],
    level: "Intermediate",
    language: "English",
    rating: 4.9,
    reviewCount: 5621,
    enrollmentCount: 31200,
    price: 94.99,
    originalPrice: 219.99,
    badge: "Bestseller",
    isFree: false,
    duration: "58h 10m",
    lastUpdated: "2026-02-01",
    whatYouLearn: [
      "Supervised and unsupervised learning algorithms",
      "Build neural networks with PyTorch from scratch",
      "Computer vision with CNNs",
      "NLP and transformer architectures",
      "MLOps: model versioning, monitoring, deployment",
      "Deploy models as REST APIs with FastAPI",
    ],
    requirements: [
      "Python basics (functions, loops, OOP)",
      "High school mathematics",
    ],
    curriculum: [
      {
        id: "s-2-1",
        title: "Foundations of ML",
        lessons: [
          { id: "l-20", title: "What is Machine Learning?",        duration: "15:00", isPreview: true },
          { id: "l-21", title: "Linear Regression deep-dive",      duration: "35:00" },
          { id: "l-22", title: "Classification algorithms",        duration: "40:00" },
        ],
      },
      {
        id: "s-2-2",
        title: "Deep Learning with PyTorch",
        lessons: [
          { id: "l-23", title: "Neural network architecture",      duration: "28:00", isPreview: true },
          { id: "l-24", title: "Backpropagation from scratch",     duration: "32:00" },
          { id: "l-25", title: "CNN for image classification",     duration: "45:00" },
        ],
      },
    ],
    featured: true,
    trending: true,
  },

  // ── 3. UI/UX Design Mastery ──────────────────────────────────
  {
    id: "c-3",
    slug: "ui-ux-design-mastery",
    title: "UI/UX Design Mastery with Figma",
    subtitle: "Design pixel-perfect, accessible interfaces and build a portfolio that lands jobs.",
    description: "Complete UI/UX design course from wireframing to high-fidelity prototypes. Master Figma, design systems, user research, and accessibility.",
    thumbnail: thumbs.ux,
    instructorId: "inst-3",
    instructorName: "Sofia Reyes",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Sofia",
    category: "ui-ux-design",
    tags: ["Figma", "Design Systems", "Prototyping", "UX Research"],
    level: "Beginner",
    language: "English",
    rating: 4.9,
    reviewCount: 2890,
    enrollmentCount: 15600,
    price: 74.99,
    originalPrice: 179.99,
    badge: "Hot",
    isFree: false,
    duration: "36h 00m",
    lastUpdated: "2026-01-20",
    whatYouLearn: [
      "Figma from beginner to advanced",
      "Design systems and component libraries",
      "User research and usability testing",
      "Accessibility (WCAG 2.1)",
      "Mobile-first and responsive design",
      "Portfolio project: Design a full SaaS app",
    ],
    requirements: ["No design experience needed", "A computer with internet access"],
    curriculum: [
      {
        id: "s-3-1",
        title: "Figma Foundations",
        lessons: [
          { id: "l-30", title: "Figma interface tour",             duration: "12:00", isPreview: true },
          { id: "l-31", title: "Auto-layout and constraints",      duration: "22:00" },
          { id: "l-32", title: "Components and variants",         duration: "28:00" },
        ],
      },
    ],
    featured: true,
    trending: false,
  },

  // ── 4. Data Science Bootcamp ─────────────────────────────────
  {
    id: "c-4",
    slug: "data-science-bootcamp",
    title: "Data Science Bootcamp 2026",
    subtitle: "Python, Pandas, SQL, Tableau and ML — everything you need to become a data scientist.",
    description: "The most comprehensive data science bootcamp. Master Python data stack, statistical analysis, visualization, and machine learning in one course.",
    thumbnail: thumbs.ds,
    instructorId: "inst-6",
    instructorName: "Lena Novak",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Lena",
    category: "data-science",
    tags: ["Python", "Pandas", "SQL", "Tableau", "Statistics"],
    level: "Beginner",
    language: "English",
    rating: 4.8,
    reviewCount: 4120,
    enrollmentCount: 22400,
    price: 84.99,
    originalPrice: 199.99,
    badge: "Bestseller",
    isFree: false,
    duration: "52h 20m",
    lastUpdated: "2026-02-10",
    whatYouLearn: [
      "Python for data analysis (NumPy, Pandas, Matplotlib)",
      "SQL for data wrangling",
      "Statistical analysis and hypothesis testing",
      "Data visualization with Tableau and Seaborn",
      "Machine learning with scikit-learn",
      "End-to-end data science project",
    ],
    requirements: ["Basic math knowledge", "No programming experience required"],
    curriculum: [
      {
        id: "s-4-1",
        title: "Python Data Stack",
        lessons: [
          { id: "l-40", title: "NumPy fundamentals",               duration: "20:00", isPreview: true },
          { id: "l-41", title: "Pandas for data wrangling",        duration: "35:00" },
          { id: "l-42", title: "Matplotlib & Seaborn",             duration: "25:00" },
        ],
      },
    ],
    featured: false,
    trending: true,
  },

  // ── 5. Cloud Architecture Mastery ────────────────────────────
  {
    id: "c-5",
    slug: "cloud-architecture-mastery",
    title: "Cloud Architecture Mastery: AWS & Kubernetes",
    subtitle: "Design, build and deploy scalable cloud-native systems used by millions.",
    description: "Hands-on cloud course covering AWS core services, containers, Kubernetes orchestration, Terraform IaC, and production-grade CI/CD pipelines.",
    thumbnail: thumbs.cloud,
    instructorId: "inst-4",
    instructorName: "James Okafor",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=James",
    category: "cloud-devops",
    tags: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    level: "Intermediate",
    language: "English",
    rating: 4.7,
    reviewCount: 1984,
    enrollmentCount: 12100,
    price: 94.99,
    originalPrice: 229.99,
    badge: "New",
    isFree: false,
    duration: "48h 15m",
    lastUpdated: "2026-02-15",
    whatYouLearn: [
      "AWS core services (EC2, S3, RDS, Lambda, VPC)",
      "Containerization with Docker",
      "Kubernetes: pods, deployments, services, ingress",
      "Infrastructure as Code with Terraform",
      "GitOps and ArgoCD",
      "Monitoring with Prometheus and Grafana",
    ],
    requirements: [
      "Basic Linux command line",
      "Fundamental networking concepts",
    ],
    curriculum: [
      {
        id: "s-5-1",
        title: "AWS Core Services",
        lessons: [
          { id: "l-50", title: "AWS IAM and networking",           duration: "30:00", isPreview: true },
          { id: "l-51", title: "EC2, auto-scaling, load balancing", duration: "40:00" },
        ],
      },
    ],
    featured: false,
    trending: true,
  },

  // ── 6. Ethical Hacking & Penetration Testing ─────────────────
  {
    id: "c-6",
    slug: "ethical-hacking-pentesting",
    title: "Ethical Hacking & Penetration Testing",
    subtitle: "Master offensive security techniques legally and ethically. Prepare for CEH, OSCP and more.",
    description: "Complete practical cybersecurity course. Learn reconnaissance, exploitation, post-exploitation, and defensive countermeasures in isolated lab environments.",
    thumbnail: thumbs.cyber,
    instructorId: "inst-5",
    instructorName: "Yuki Tanaka",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Yuki",
    category: "cybersecurity",
    tags: ["Ethical Hacking", "Kali Linux", "Metasploit", "OWASP"],
    level: "Intermediate",
    language: "English",
    rating: 4.8,
    reviewCount: 1567,
    enrollmentCount: 9200,
    price: 89.99,
    originalPrice: 199.99,
    badge: "Hot",
    isFree: false,
    duration: "44h 00m",
    lastUpdated: "2026-01-28",
    whatYouLearn: [
      "Kali Linux and pentesting toolset",
      "Network scanning and enumeration",
      "Exploitation with Metasploit",
      "Web application security (OWASP Top 10)",
      "Social engineering fundamentals",
      "Defensive strategies and hardening",
    ],
    requirements: [
      "Basic networking knowledge (TCP/IP)",
      "Familiarity with Linux command line",
    ],
    curriculum: [
      {
        id: "s-6-1",
        title: "Getting Started with Security",
        lessons: [
          { id: "l-60", title: "Setting up your lab environment",  duration: "20:00", isPreview: true },
          { id: "l-61", title: "Kali Linux essentials",            duration: "25:00" },
        ],
      },
    ],
    featured: false,
    trending: false,
  },

  // ── 7. React Native Mobile Dev ───────────────────────────────
  {
    id: "c-7",
    slug: "react-native-mobile-development",
    title: "React Native: Build iOS & Android Apps",
    subtitle: "One codebase, two platforms. Ship beautiful native apps with React Native and Expo.",
    description: "Build real-world iOS and Android apps using React Native and Expo. Cover navigation, state, animations, native APIs, and App Store submission.",
    thumbnail: thumbs.mobile,
    instructorId: "inst-2",
    instructorName: "Marcus Chen",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Marcus",
    category: "mobile-development",
    tags: ["React Native", "Expo", "iOS", "Android", "TypeScript"],
    level: "Intermediate",
    language: "English",
    rating: 4.7,
    reviewCount: 1230,
    enrollmentCount: 8900,
    price: 79.99,
    originalPrice: 189.99,
    badge: "New",
    isFree: false,
    duration: "38h 45m",
    lastUpdated: "2026-02-05",
    whatYouLearn: [
      "React Native fundamentals",
      "Expo and EAS Build",
      "React Navigation (Stack, Tab, Drawer)",
      "Zustand for state management",
      "Push notifications with Expo",
      "Publishing to App Store and Google Play",
    ],
    requirements: [
      "Basic React knowledge",
      "JavaScript fundamentals",
    ],
    curriculum: [
      {
        id: "s-7-1",
        title: "React Native Basics",
        lessons: [
          { id: "l-70", title: "Setting up Expo development environment", duration: "18:00", isPreview: true },
          { id: "l-71", title: "Core components and styling",             duration: "24:00" },
        ],
      },
    ],
    featured: true,
    trending: false,
  },

  // ── 8. Python for Beginners (FREE) ───────────────────────────
  {
    id: "c-8",
    slug: "python-for-beginners-free",
    title: "Python for Absolute Beginners",
    subtitle: "Start your programming journey — free, practical, no experience needed.",
    description: "Learn Python from zero. Write your first program, understand variables, loops, functions, and build 5 mini-projects along the way. 100% free.",
    thumbnail: thumbs.ds,
    instructorId: "inst-6",
    instructorName: "Lena Novak",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Lena",
    category: "data-science",
    tags: ["Python", "Beginner", "Programming Basics"],
    level: "Beginner",
    language: "English",
    rating: 4.8,
    reviewCount: 8920,
    enrollmentCount: 54000,
    price: 0,
    originalPrice: 0,
    badge: "Free",
    isFree: true,
    duration: "12h 00m",
    lastUpdated: "2025-12-10",
    whatYouLearn: [
      "Python syntax and data types",
      "Control flow and loops",
      "Functions and modules",
      "File I/O",
      "5 hands-on mini projects",
    ],
    requirements: ["No experience required", "A computer with internet access"],
    curriculum: [
      {
        id: "s-8-1",
        title: "Python Basics",
        lessons: [
          { id: "l-80", title: "Hello, Python!",                   duration: "08:00", isPreview: true },
          { id: "l-81", title: "Variables and data types",         duration: "14:00", isPreview: true },
          { id: "l-82", title: "Conditionals and loops",           duration: "18:00" },
        ],
      },
    ],
    featured: false,
    trending: true,
  },
];

// ── Helpers ────────────────────────────────────────────────────
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((c) => c.featured);
}

export function getTrendingCourses(): Course[] {
  return courses.filter((c) => c.trending);
}

export function getCoursesByCategory(category: string): Course[] {
  return courses.filter((c) => c.category === category);
}

export function searchCourses(query: string): Course[] {
  const q = query.toLowerCase();
  return courses.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q)) ||
      c.instructorName.toLowerCase().includes(q)
  );
}
