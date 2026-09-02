export interface Instructor {
  id: string;
  name: string;
  initials: string;
  title: string;
  expertise: string;
  courses: number;
  rating: number;
  bio: string;
}

export const INSTRUCTORS: Instructor[] = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    initials: "AC",
    title: "Full-Stack Engineer",
    expertise: "Web Development, JavaScript, React",
    courses: 8,
    rating: 4.9,
    bio: "15+ years building production systems at scale.",
  },
  {
    id: "maya-patel",
    name: "Maya Patel",
    initials: "MP",
    title: "Product Strategist",
    expertise: "Product Management, Growth, Analytics",
    courses: 6,
    rating: 4.8,
    bio: "Former PM at leading tech companies, now advising startups.",
  },
  {
    id: "james-kim",
    name: "James Kim",
    initials: "JK",
    title: "Design Lead",
    expertise: "UX/UI Design, Design Systems, Research",
    courses: 7,
    rating: 4.9,
    bio: "Design lead who's shipped products used by millions.",
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    initials: "SJ",
    title: "Data Scientist",
    expertise: "Machine Learning, Python, SQL, Statistics",
    courses: 5,
    rating: 4.7,
    bio: "PhD in ML, now building AI products in production.",
  },
];
