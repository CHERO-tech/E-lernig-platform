export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
}

export const FEATURED_COURSES: Course[] = [
  {
    id: "web-dev",
    title: "Full-Stack Web Development",
    category: "Technology",
    duration: "12 weeks",
    level: "Intermediate",
    icon: "💻",
  },
  {
    id: "product-strategy",
    title: "Product Strategy & Management",
    category: "Business",
    duration: "8 weeks",
    level: "Intermediate",
    icon: "🎯",
  },
  {
    id: "ux-design",
    title: "User Experience Design",
    category: "Design",
    duration: "10 weeks",
    level: "Beginner",
    icon: "🖼️",
  },
  {
    id: "python-data",
    title: "Python for Data Science",
    category: "Data & Analytics",
    duration: "10 weeks",
    level: "Intermediate",
    icon: "🐍",
  },
  {
    id: "content-strategy",
    title: "Content Strategy for Growth",
    category: "Writing & Content",
    duration: "6 weeks",
    level: "Beginner",
    icon: "📝",
  },
  {
    id: "leadership",
    title: "Effective Leadership",
    category: "Personal Development",
    duration: "8 weeks",
    level: "Intermediate",
    icon: "👥",
  },
];

export const MODULES = [
  { title: "Foundations", lessons: 8 },
  { title: "Core Concepts", lessons: 12 },
  { title: "Projects", lessons: 6 },
  { title: "Capstone", lessons: 4 },
];
