import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const routes = [
  { path: "/", label: "Landing" },
  { path: "/login", label: "Login" },
  { path: "/courses", label: "Courses" },
  { path: "/courses/web-dev", label: "Course Detail" },
  { path: "/assessment", label: "Assessment" },
  { path: "/certificate", label: "Certificate" },
  { path: "/projects", label: "Projects" },
  { path: "/notifications", label: "Notifications" },
  { path: "/student", label: "Student" },
  { path: "/trainer", label: "Trainer" },
  { path: "/school-admin", label: "School Admin" },
  { path: "/guardian", label: "Guardian" },
  { path: "/company", label: "Company" },
  { path: "/admin", label: "Platform Admin" },
];

export default function DemoNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          className="absolute bottom-14 right-0 w-56 rounded-xl overflow-hidden shadow-2xl"
          style={{ background: "#0B291A", border: "1px solid rgba(53,196,122,0.2)" }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(53,196,122,0.1)" }}>
            <p className="font-mono text-xs" style={{ color: "#35C47A" }}>
              $ demo --switch-view
            </p>
          </div>
          <div className="max-h-80 overflow-y-auto py-1">
            {routes.map((r) => (
              <Link
                key={r.path}
                to={r.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors"
                style={{
                  color: location.pathname === r.path ? "#35C47A" : "#8BE0B0",
                  background: location.pathname === r.path ? "rgba(53,196,122,0.08)" : "transparent",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                }}
              >
                <span style={{ color: "#35C47A", opacity: 0.5 }}>›</span>
                {r.label}
                {location.pathname === r.path && (
                  <span
                    className="ml-auto text-xs"
                    style={{ color: "#35C47A", fontFamily: "monospace" }}
                  >
                    ●
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105"
        style={{ background: "#35C47A" }}
        title="Demo Navigator"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#071C12"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
