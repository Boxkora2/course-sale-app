// data/instructors.ts
// TODO: Replace with API call to /api/instructors

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  social?: { twitter?: string; linkedin?: string; website?: string; github?: string };
}

export const instructors: Instructor[] = [
  {
    id: "inst-1",
    name: "Dr. Aisha Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Aisha",
    specialty: "Machine Learning & AI",
    bio: "Former Google Brain researcher with 10+ years building production ML systems. PhD in Computer Science from Stanford.",
    rating: 4.9,
    students: 18400,
    courses: 8,
    social: { linkedin: "#", website: "#" },
  },
  {
    id: "inst-2",
    name: "Marcus Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Marcus",
    specialty: "Full-Stack Web Development",
    bio: "Senior engineer at Meta. Built systems serving 100M+ users. Passionate about clean code and performant architectures.",
    rating: 4.8,
    students: 24100,
    courses: 12,
    social: { twitter: "#", github: "#" },
  },
  {
    id: "inst-3",
    name: "Sofia Reyes",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Sofia",
    specialty: "UI/UX Design & Figma",
    bio: "Lead designer at Airbnb. Creates world-class design systems and teaches the art of pixel-perfect interfaces.",
    rating: 4.9,
    students: 15200,
    courses: 6,
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "inst-4",
    name: "James Okafor",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=James",
    specialty: "Cloud Architecture & DevOps",
    bio: "AWS Solutions Architect & Kubernetes certified. 15 years deploying cloud-native systems at Fortune 500 companies.",
    rating: 4.7,
    students: 12800,
    courses: 9,
    social: { linkedin: "#", website: "#" },
  },
  {
    id: "inst-5",
    name: "Yuki Tanaka",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Yuki",
    specialty: "Cybersecurity & Ethical Hacking",
    bio: "CEH-certified security expert. Former CISA analyst. Trained hundreds of professionals in offensive and defensive security.",
    rating: 4.8,
    students: 9600,
    courses: 7,
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "inst-6",
    name: "Lena Novak",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Lena",
    specialty: "Data Science & Analytics",
    bio: "Principal Data Scientist at Spotify. Transforms raw data into actionable insights using Python, SQL, and ML.",
    rating: 4.9,
    students: 21000,
    courses: 10,
    social: { linkedin: "#", website: "#" },
  },
];

export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find((i) => i.id === id);
}
