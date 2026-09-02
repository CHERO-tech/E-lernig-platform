export interface Stat {
  id: string;
  value: string;
  label: string;
  description: string;
}

export const PLATFORM_STATS: Stat[] = [
  {
    id: "learners",
    value: "250k+",
    label: "Active Learners",
    description: "Across 150+ countries worldwide",
  },
  {
    id: "completion",
    value: "87%",
    label: "Completion Rate",
    description: "Highest in the industry",
  },
  {
    id: "employed",
    value: "94%",
    label: "Job Placement",
    description: "Within 6 months of graduation",
  },
];

export const FEATURES = [
  {
    icon: "🎯",
    title: "Learn Anywhere",
    desc: "Flexible schedule, no prerequisites, self-paced learning at your rhythm.",
  },
  {
    icon: "👨‍💻",
    title: "Project-Based",
    desc: "Build real projects, not toy exercises. Your portfolio becomes your credential.",
  },
  {
    icon: "📖",
    title: "Expert Mentorship",
    desc: "1:1 feedback from working professionals who know what hiring managers want.",
  },
  {
    icon: "✓",
    title: "Verifiable Certs",
    desc: "Certificates backed by portfolios and mentor endorsements employers trust.",
  },
  {
    icon: "🌍",
    title: "Global Community",
    desc: "Network with learners and professionals building careers like yours.",
  },
  {
    icon: "🚀",
    title: "Career Support",
    desc: "Job board, resume coaching, and interview prep included.",
  },
];
