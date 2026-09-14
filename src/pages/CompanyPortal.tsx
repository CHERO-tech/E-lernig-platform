import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { key: "find", label: "Find Students", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg> },
  { key: "portfolios", label: "Student Portfolios", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg> },
  { key: "internships", label: "Internships", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg> },
  { key: "opportunities", label: "Opportunities", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
  { key: "feedback", label: "Feedback", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
  { key: "profile", label: "Company Profile", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /></svg> },
];

const tracks = ["All Tracks", "Software Dev", "Networking", "Multimedia"];
const levelOptions = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const students = [
  {
    name: "Kagabo Eric",
    program: "Software Development",
    institution: "UR-CST",
    level: "Advanced",
    skills: ["React", "Node.js", "PostgreSQL", "Python"],
    projects: 4,
    certs: 3,
    score: 94,
    available: true,
  },
  {
    name: "Ineza Grace Marie",
    program: "Multimedia & Design",
    institution: "IPRC Kigali",
    level: "Intermediate",
    skills: ["Figma", "UI/UX", "Illustrator", "After Effects"],
    projects: 3,
    certs: 2,
    score: 91,
    available: true,
  },
  {
    name: "Nzeyimana Patrick",
    program: "Networking",
    institution: "INES-Ruhengeri",
    level: "Advanced",
    skills: ["Cisco", "Network Security", "Linux", "Firewalls"],
    projects: 3,
    certs: 2,
    score: 88,
    available: false,
  },
  {
    name: "Amahoro Jean de Dieu",
    program: "Software Development",
    institution: "INES-Ruhengeri",
    level: "Intermediate",
    skills: ["JavaScript", "React", "MongoDB", "REST API"],
    projects: 2,
    certs: 2,
    score: 85,
    available: true,
  },
  {
    name: "Uwimana Diane",
    program: "Software Development",
    institution: "UR-CST",
    level: "Advanced",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    projects: 5,
    certs: 3,
    score: 96,
    available: true,
  },
  {
    name: "Munyakazi Lisa",
    program: "Multimedia & Design",
    institution: "IPRC Huye",
    level: "Beginner",
    skills: ["Graphic Design", "Illustrator", "Video Editing"],
    projects: 2,
    certs: 1,
    score: 82,
    available: true,
  },
];

export default function CompanyPortal() {
  const [activeKey, setActiveKey] = useState("find");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "profile") window.location.href = "/settings?role=company&roleLabel=Company&userName=TechRwanda+Ltd&userInitials=TR";
  };
  const [trackFilter, setTrackFilter] = useState("All Tracks");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.skills.some((sk) => sk.toLowerCase().includes(search.toLowerCase()))) return false;
    if (trackFilter !== "All Tracks" && !s.program.toLowerCase().includes(trackFilter.toLowerCase().replace("software dev", "software"))) return false;
    if (levelFilter !== "All Levels" && s.level !== levelFilter) return false;
    return true;
  });

  return (
    <DashboardLayout
      role="company"
      roleLabel="Company"
      navItems={navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName="TechRwanda Ltd"
      userInitials="TR"
    >
      <div className="p-8">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ whoami — company-portal</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Find Skilled Students</h1>
          <p style={{ color: "#606C66" }}>Browse verified TVET graduates and offer internship opportunities.</p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-64 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#606C66" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by skill, name or technology..."
              className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none"
              style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", color: "#102019" }}
              onFocus={(e) => (e.target.style.borderColor = "#35C47A")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8E4")}
            />
          </div>
          {[
            { value: trackFilter, set: setTrackFilter, options: tracks },
            { value: levelFilter, set: setLevelFilter, options: levelOptions },
          ].map((sel, i) => (
            <select
              key={i}
              value={sel.value}
              onChange={(e) => sel.set(e.target.value)}
              className="px-4 py-3 rounded-lg text-sm outline-none"
              style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", color: "#102019" }}
            >
              {sel.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ))}
        </div>

        <p className="font-mono text-sm mb-5" style={{ color: "#606C66" }}>
          Found <span style={{ color: "#1F7A4B" }}>{filtered.length}</span> students
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((student) => (
            <div
              key={student.name}
              className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
                    style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}
                  >
                    {student.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm" style={{ color: "#102019" }}>{student.name}</h3>
                      {student.available && (
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#35C47A" }} title="Available for internship" />
                      )}
                    </div>
                    <p className="font-mono text-xs mb-0.5" style={{ color: "#606C66" }}>{student.program}</p>
                    <p className="font-mono text-xs" style={{ color: "#606C66" }}>{student.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xl font-bold" style={{ color: "#1F7A4B" }}>{student.score}%</p>
                    <p className="font-mono text-xs" style={{ color: "#606C66" }}>Score</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {student.skills.map((s) => (
                    <span key={s} className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "#F5F7F5", color: "#606C66", border: "1px solid #E2E8E4" }}>{s}</span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-4 py-3" style={{ borderTop: "1px solid #E2E8E4", borderBottom: "1px solid #E2E8E4" }}>
                  <div className="text-center">
                    <p className="font-mono text-lg font-bold" style={{ color: "#102019" }}>{student.projects}</p>
                    <p className="font-mono text-xs" style={{ color: "#606C66" }}>Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-lg font-bold" style={{ color: "#102019" }}>{student.certs}</p>
                    <p className="font-mono text-xs" style={{ color: "#606C66" }}>Certificates</p>
                  </div>
                  <div className="text-center">
                    <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: student.available ? "rgba(53,196,122,0.1)" : "rgba(113,128,120,0.1)", color: student.available ? "#1F7A4B" : "#606C66" }}>
                      {student.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to="/portfolio/1"
                    className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: "#35C47A", color: "#071C12" }}
                  >
                    View Portfolio
                  </Link>
                  {student.available && (
                    <button
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-surface"
                      style={{ color: "#102019", border: "1px solid #E2E8E4" }}
                    >
                      Offer Internship
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
