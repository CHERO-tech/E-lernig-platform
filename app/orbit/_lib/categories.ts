export interface Category {
  id: string;
  label: string;
  icon: string;
  blurb: string;
  courses: number;
  angle: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "tech",
    label: "Technology",
    icon: "⚙️",
    blurb: "Master modern development, cloud, and systems.",
    courses: 24,
    angle: 0,
  },
  {
    id: "business",
    label: "Business",
    icon: "📊",
    blurb: "Strategy, leadership, and organizational growth.",
    courses: 18,
    angle: 51.4,
  },
  {
    id: "design",
    label: "Design",
    icon: "🎨",
    blurb: "UI/UX, visual design, and creative direction.",
    courses: 16,
    angle: 102.9,
  },
  {
    id: "data",
    label: "Data & Analytics",
    icon: "📈",
    blurb: "Data science, analytics, and machine learning.",
    courses: 20,
    angle: 154.3,
  },
  {
    id: "writing",
    label: "Writing & Content",
    icon: "✍️",
    blurb: "Copywriting, journalism, and storytelling.",
    courses: 12,
    angle: 205.7,
  },
  {
    id: "personal",
    label: "Personal Development",
    icon: "🌟",
    blurb: "Career growth, communication, and mindfulness.",
    courses: 14,
    angle: 257.1,
  },
  {
    id: "creative",
    label: "Creative Media",
    icon: "🎬",
    blurb: "Video, audio, animation, and multimedia.",
    courses: 19,
    angle: 308.6,
  },
];
