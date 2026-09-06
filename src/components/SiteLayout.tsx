import { Link } from "react-router-dom";
import Footer from "./Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const navItems = [
    { label: "Courses", href: "/courses" },
    { label: "Learning Paths", href: "/learning-paths" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Forum", href: "/forum" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Help", href: "/help" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F5F7F5" }}
    >
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(7,28,18,0.98)",
          borderBottom: "1px solid rgba(53,196,122,0.1)",
        }}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{
              background: "transparent",
              border: "2px solid #35C47A",
              color: "#35C47A",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            T
          </div>
          <p className="text-white font-bold text-sm tracking-wide">
            TVET ACADEMY
          </p>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm transition-colors"
              style={{ color: "#718078" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#718078";
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded text-sm font-medium transition-all"
            style={{ color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            Log In
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded text-sm font-semibold transition-all hover:shadow-lg hover:brightness-110 active:scale-95"
            style={{ background: "#35C47A", color: "#071C12" }}
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 flex flex-col">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
