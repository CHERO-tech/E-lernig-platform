import Link from "next/link";
import BrandMark from "./BrandMark";

const COLUMNS = [
  {
    title: "Platform",
    items: [
      { label: "Learning Paths", href: "/learning-paths" },
      { label: "Courses", href: "/courses" },
      { label: "Certificates", href: "/certificates" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Roles",
    items: [
      { label: "Students", href: "/student/dashboard" },
      { label: "Trainers", href: "/trainer/dashboard" },
      { label: "Schools", href: "/school/dashboard" },
      { label: "Companies", href: "/company/dashboard" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "Leaderboards", href: "/leaderboards" },
      { label: "Messages", href: "/messages" },
      { label: "Search", href: "/search" },
      { label: "Settings", href: "/settings" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-dg2 border-t border-pg/[0.08] py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
        <div className="col-span-2 md:col-span-1">
          <a href="#top" className="flex items-center gap-2 mb-4 text-white font-mono font-semibold">
            <BrandMark />
            FORGE
          </a>
          <p className="text-sm leading-relaxed text-mg">
            Practical, employer-verified skills in Software Development, Networking, and
            Multimedia.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-xs mb-4 text-pg">{col.title}</p>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-mg transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-pg/[0.08]">
        <p className="font-mono text-xs text-mg">© 2026 Forge Learning</p>
        <p className="font-mono text-xs text-mg">Built for practical skills, not paperwork.</p>
      </div>
    </footer>
  );
}
