// data/categories.ts
// TODO: Replace with API call to /api/categories

export interface Category {
  id: string;
  label: string;
  slug: string;
  icon: string;          // Lucide icon name
  color: string;         // Tailwind color class or CSS variable
  courseCount: number;
  description: string;
}

export const categories: Category[] = [
  {
    id: "cat-1",
    label: "Web Development",
    slug: "web-development",
    icon: "Globe",
    color: "#7c3aed",
    courseCount: 48,
    description: "Master HTML, CSS, JavaScript, React, Next.js and more.",
  },
  {
    id: "cat-2",
    label: "Data Science",
    slug: "data-science",
    icon: "BarChart2",
    color: "#06b6d4",
    courseCount: 32,
    description: "Python, Pandas, NumPy, Matplotlib, and ML pipelines.",
  },
  {
    id: "cat-3",
    label: "Machine Learning",
    slug: "machine-learning",
    icon: "Brain",
    color: "#3b82f6",
    courseCount: 27,
    description: "Deep learning, neural networks, PyTorch and TensorFlow.",
  },
  {
    id: "cat-4",
    label: "UI/UX Design",
    slug: "ui-ux-design",
    icon: "Palette",
    color: "#ec4899",
    courseCount: 21,
    description: "Figma, wireframing, design thinking and user research.",
  },
  {
    id: "cat-5",
    label: "Mobile Development",
    slug: "mobile-development",
    icon: "Smartphone",
    color: "#10b981",
    courseCount: 18,
    description: "React Native, Swift, Kotlin — ship iOS and Android apps.",
  },
  {
    id: "cat-6",
    label: "Cybersecurity",
    slug: "cybersecurity",
    icon: "Shield",
    color: "#f59e0b",
    courseCount: 14,
    description: "Ethical hacking, penetration testing, OWASP, and defense.",
  },
  {
    id: "cat-7",
    label: "Cloud & DevOps",
    slug: "cloud-devops",
    icon: "Cloud",
    color: "#8b5cf6",
    courseCount: 22,
    description: "AWS, GCP, Docker, Kubernetes, CI/CD pipelines.",
  },
  {
    id: "cat-8",
    label: "Blockchain",
    slug: "blockchain",
    icon: "Link",
    color: "#06b6d4",
    courseCount: 11,
    description: "Solidity, smart contracts, Web3, and DeFi fundamentals.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
