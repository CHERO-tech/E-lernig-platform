// Mock data for Student Hub - easily replaceable with real database calls

export type Course = {
  id: string;
  title: string;
  icon: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  instructor: string;
  nextLesson?: string;
  category: string;
};

export type LabSession = {
  id: string;
  company: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "booked";
  capacity: number;
  enrolled: number;
  skills: string[];
};

export type Achievement = {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: Date;
  locked: boolean;
};

export type CommunityPost = {
  id: string;
  userId: string;
  userName: string;
  userInitials: string;
  action: string;
  timeAgo: string;
  likes: number;
};

export type StudentStats = {
  skillsGained: number;
  hoursLearned: number;
  labsCompleted: number;
  streakDays: number;
  totalCourses: number;
  averageProgress: number;
};

export type MotivationalQuote = {
  text: string;
  author: string;
  category: string;
};

// Mock student profile
export const mockStudentProfile = {
  id: "student_001",
  name: "Alex Johnson",
  email: "alex.johnson@skillhub.com",
  avatar: "AJ",
  joinedDate: new Date("2024-07-15"),
};

// Mock motivational quotes
export const motivationalQuotes: MotivationalQuote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "passion",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "perseverance",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "vision",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "resilience",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "action",
  },
];

// Mock active courses
export const mockActiveCourses: Course[] = [
  {
    id: "course_001",
    title: "Web Development Fundamentals",
    icon: "💻",
    duration: "4 weeks",
    level: "Beginner",
    progress: 65,
    instructor: "Alex Chen",
    nextLesson: "CSS Grid & Flexbox",
    category: "Web Development",
  },
  {
    id: "course_002",
    title: "React Advanced Patterns",
    icon: "⚛️",
    duration: "6 weeks",
    level: "Intermediate",
    progress: 40,
    instructor: "Sarah Kim",
    nextLesson: "Custom Hooks Deep Dive",
    category: "Frontend",
  },
  {
    id: "course_003",
    title: "Cloud Computing Essentials",
    icon: "☁️",
    duration: "5 weeks",
    level: "Beginner",
    progress: 25,
    instructor: "Mike Chen",
    nextLesson: "AWS Core Services",
    category: "Cloud",
  },
];

// Mock upcoming lab sessions
export const mockUpcomingLabSessions: LabSession[] = [
  {
    id: "lab_001",
    company: "TechCorp Labs",
    title: "Full-Stack Development Lab",
    date: "Nov 15, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "San Francisco, CA",
    status: "upcoming",
    capacity: 20,
    enrolled: 15,
    skills: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "lab_002",
    company: "CloudNine Systems",
    title: "Cloud Architecture Lab",
    date: "Nov 20, 2024",
    time: "10:00 AM - 1:00 PM",
    location: "Remote",
    status: "upcoming",
    capacity: 30,
    enrolled: 22,
    skills: ["AWS", "Infrastructure", "Deployment"],
  },
];

// Mock achievements & badges
export const mockAchievements: Achievement[] = [
  {
    id: "badge_001",
    name: "First Steps",
    icon: "⭐",
    description: "Complete your first course",
    locked: false,
    unlockedAt: new Date("2024-07-20"),
  },
  {
    id: "badge_002",
    name: "Week Streak",
    icon: "🔥",
    description: "Maintain a 7-day learning streak",
    locked: false,
    unlockedAt: new Date("2024-08-10"),
  },
  {
    id: "badge_003",
    name: "Quick Learner",
    icon: "🎯",
    description: "Reach 50% completion in a course",
    locked: false,
    unlockedAt: new Date("2024-08-25"),
  },
  {
    id: "badge_004",
    name: "Lab Ready",
    icon: "🚀",
    description: "Attend your first lab session",
    locked: false,
    unlockedAt: new Date("2024-09-01"),
  },
  {
    id: "badge_005",
    name: "Problem Solver",
    icon: "💡",
    description: "Complete 10 coding challenges",
    locked: false,
    unlockedAt: new Date("2024-09-15"),
  },
  {
    id: "badge_006",
    name: "Top Performer",
    icon: "👑",
    description: "Achieve 90%+ in 3 courses",
    locked: true,
  },
  {
    id: "badge_007",
    name: "Community Leader",
    icon: "🤝",
    description: "Help 5 students in forums",
    locked: true,
  },
  {
    id: "badge_008",
    name: "Master's Mark",
    icon: "🎓",
    description: "Complete all courses in a category",
    locked: true,
  },
];

// Mock community feed
export const mockCommunityFeed: CommunityPost[] = [
  {
    id: "post_001",
    userId: "user_002",
    userName: "Jane Doe",
    userInitials: "JD",
    action: "Completed React Advanced Patterns course! 🎉",
    timeAgo: "2 hours ago",
    likes: 24,
  },
  {
    id: "post_002",
    userId: "user_003",
    userName: "Mike Kumar",
    userInitials: "MK",
    action: "Booked TechCorp Labs session for next week",
    timeAgo: "4 hours ago",
    likes: 12,
  },
  {
    id: "post_003",
    userId: "user_004",
    userName: "Sarah Lee",
    userInitials: "SL",
    action: "Earned Cloud Computing Essentials badge",
    timeAgo: "1 day ago",
    likes: 18,
  },
  {
    id: "post_004",
    userId: "user_005",
    userName: "Chris Patel",
    userInitials: "CP",
    action: "Reached 30-day learning streak! 🔥",
    timeAgo: "1 day ago",
    likes: 31,
  },
];

// Mock student stats
export const mockStudentStats: StudentStats = {
  skillsGained: 12,
  hoursLearned: 48,
  labsCompleted: 3,
  streakDays: 7,
  totalCourses: 5,
  averageProgress: 54,
};

// Helper functions
export function getRandomQuote(): MotivationalQuote {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

export function getQuoteByIndex(index: number): MotivationalQuote {
  return motivationalQuotes[index % motivationalQuotes.length];
}
