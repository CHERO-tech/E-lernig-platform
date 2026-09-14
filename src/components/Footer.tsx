import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="py-12 px-8"
      style={{
        background: "#0B291A",
        borderTop: "1px solid rgba(53,196,122,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs"
              style={{
                background: "#35C47A",
                color: "#071C12",
                fontFamily: "monospace",
              }}
            >
              T
            </div>
            <span className="font-bold text-sm" style={{ color: "#FFFFFF" }}>
              TVET Digital
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#606C66" }}>
            Practical digital skills education for Rwanda's next generation of
            tech professionals.
          </p>
        </div>
        {[
          {
            title: "Platform",
            items: [
              { label: "Learning Paths", href: "/learning-paths" },
              { label: "Courses", href: "/courses" },
              { label: "Projects", href: "/projects" },
              { label: "Certificates", href: "/certificate" },
            ],
          },
          {
            title: "Roles",
            items: [
              { label: "Students", href: "/student" },
              { label: "Trainers", href: "/trainer" },
              { label: "Schools", href: "/school-admin" },
              { label: "Companies", href: "/company" },
            ],
          },
          {
            title: "Support",
            items: [
              { label: "Help Center", href: "/help" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ],
          },
          {
            title: "Community",
            items: [
              { label: "Leaderboard", href: "/leaderboard" },
              { label: "Mentor Matching", href: "/mentor-matching" },
              { label: "Search", href: "/search" },
              { label: "Settings", href: "/settings" },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <p className="font-mono text-xs mb-4" style={{ color: "#35C47A" }}>
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm transition-colors hover:text-pg rounded outline-none focus-visible:ring-2 focus-visible:ring-lg focus-visible:ring-offset-2 focus-visible:ring-offset-dg2"
                    style={{ color: "#606C66" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-between pt-8"
        style={{ borderTop: "1px solid rgba(53,196,122,0.08)" }}
      >
        <p className="font-mono text-xs" style={{ color: "#606C66" }}>
          © 2026 TVET Digital Skills Academy. Rwanda.
        </p>
        <p className="font-mono text-xs" style={{ color: "rgba(53,196,122,0.3)" }}>
          v1.0.0 — production
        </p>
      </div>
    </footer>
  );
}
