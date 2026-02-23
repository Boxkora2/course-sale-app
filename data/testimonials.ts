// data/testimonials.ts
// TODO: Replace with API call to /api/testimonials

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  courseTitle: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Alex Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Alex",
    role: "Frontend Developer",
    company: "Stripe",
    text: "NexLearn completely transformed my career. The React Advanced course gave me the confidence to land my dream job at Stripe. The curriculum is hands-on, up-to-date, and genuinely enjoyable.",
    rating: 5,
    courseTitle: "Advanced React & Next.js",
  },
  {
    id: "t-2",
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Priya",
    role: "Data Analyst",
    company: "Netflix",
    text: "I went from zero to landing a senior analyst role in 8 months. The Data Science Bootcamp was the most comprehensive course I've ever taken. The instructors are world-class.",
    rating: 5,
    courseTitle: "Data Science Bootcamp",
  },
  {
    id: "t-3",
    name: "Carlos Rivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Carlos",
    role: "Product Designer",
    company: "Figma",
    text: "The UI/UX Design Mastery course is unmatched. Sofia's teaching style makes complex design systems feel approachable. Worth every penny.",
    rating: 5,
    courseTitle: "UI/UX Design Mastery",
  },
  {
    id: "t-4",
    name: "Lin Wei",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=LinWei",
    role: "DevOps Engineer",
    company: "AWS",
    text: "The Cloud & DevOps course is incredibly practical. Real-world projects, real CI/CD pipelines. I got AWS certified after completing it.",
    rating: 5,
    courseTitle: "Cloud Architecture Mastery",
  },
  {
    id: "t-5",
    name: "Emma Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Emma",
    role: "Cybersecurity Analyst",
    company: "CrowdStrike",
    text: "Comprehensive, challenging, and genuinely prepares you for the real threat landscape. Best cybersecurity course available online, period.",
    rating: 5,
    courseTitle: "Ethical Hacking & Pentesting",
  },
  {
    id: "t-6",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=David",
    role: "ML Engineer",
    company: "OpenAI",
    text: "Dr. Patel's Machine Learning course is exceptional. The explanations are crystal-clear and the projects are actually deployable. A masterpiece.",
    rating: 5,
    courseTitle: "Machine Learning A–Z",
  },
];
