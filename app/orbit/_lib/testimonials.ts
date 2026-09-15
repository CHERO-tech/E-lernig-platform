export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "The project-based approach transformed how I think about learning. I built real things from day one, not toy exercises.",
    author: "Jordan Lee",
    role: "Junior Developer",
    initials: "JL",
    company: "Tech Startup",
  },
  {
    id: "2",
    quote:
      "Within 6 weeks, I went from zero design experience to shipping a product with 10k users. The mentorship was invaluable.",
    author: "Priya Gupta",
    role: "Product Designer",
    initials: "PG",
    company: "Design Agency",
  },
  {
    id: "3",
    quote:
      "I've taken dozens of courses. This one actually prepared me for a job interview. Hired within a month.",
    author: "Marcus Thompson",
    role: "Data Analyst",
    initials: "MT",
    company: "Fortune 500",
  },
  {
    id: "4",
    quote:
      "The instructors are working professionals, not just talking heads. They know what hiring managers actually want.",
    author: "Elena Rodriguez",
    role: "Operations Manager",
    initials: "ER",
    company: "B2B SaaS",
  },
];
