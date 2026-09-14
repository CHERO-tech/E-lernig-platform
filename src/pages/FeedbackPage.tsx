import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input, EmptyState } from "../components/ui";
import { navItems } from "./CompanyPortal";

interface Feedback {
  student: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

const feedback: Feedback[] = [
  { student: "Kagabo Eric", role: "Frontend Developer Intern", rating: 5, comment: "Eric picked up our codebase incredibly fast and shipped three features in his first month. Would hire full-time without hesitation.", date: "2026-09-01" },
  { student: "Uwimana Diane", role: "Backend Engineer", rating: 5, comment: "Diane's Django work was production-ready from day one. Excellent communicator too.", date: "2026-08-20" },
  { student: "Nzeyimana Patrick", role: "Network Administrator", rating: 4, comment: "Solid technical skills, still building confidence presenting to stakeholders.", date: "2026-08-10" },
  { student: "Ineza Grace Marie", role: "UI/UX Designer (Contract)", rating: 5, comment: "Grace redesigned our onboarding flow and our activation rate went up 22%.", date: "2026-07-15" },
  { student: "Munyakazi Lisa", role: "Graphic Design Intern", rating: 3, comment: "Good eye for visuals, needs more experience with brand consistency across projects.", date: "2026-06-28" },
  { student: "Amahoro Jean de Dieu", role: "QA Engineer", rating: 4, comment: "Thorough tester, caught issues our internal team missed.", date: "2026-06-05" },
];

export default function FeedbackPage() {
  const [activeKey, setActiveKey] = useState("feedback");
  const [search, setSearch] = useState("");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/company";
  };

  const filtered = feedback.filter(
    (f) => f.student.toLowerCase().includes(search.toLowerCase()) || f.role.toLowerCase().includes(search.toLowerCase())
  );

  const avgRating = (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1);
  const fiveStarCount = feedback.filter((f) => f.rating === 5).length;
  const uniqueStudents = new Set(feedback.map((f) => f.student)).size;

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
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./feedback --given</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Feedback</h1>
          <p style={{ color: "#606C66" }}>Performance feedback you've given on hired students</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Avg Rating" value={`${avgRating} ⭐`} />
          <StatCard label="Reviews" value={feedback.length} />
          <StatCard label="5-Star Reviews" value={fiveStarCount} />
          <StatCard label="Students Reviewed" value={uniqueStudents} />
        </div>

        <div className="mb-6 max-w-sm">
          <Input placeholder="Search by student or role..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No feedback found" description="Try a different student name or role." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((f) => (
              <Card key={`${f.student}-${f.date}`} variant="terminal" padding="lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0"
                      style={{ background: "rgba(53,196,122,0.12)", color: "#1F7A4B" }}
                    >
                      {f.student[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#102019" }}>{f.student}</p>
                      <p className="font-mono text-xs" style={{ color: "#606C66" }}>{f.role}</p>
                    </div>
                  </div>
                  <Badge tone={f.rating >= 4 ? "success" : "neutral"} mono>
                    {f.rating}.0 ⭐
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#606C66" }}>"{f.comment}"</p>
                <p className="font-mono text-xs mt-3" style={{ color: "#606C66" }}>{f.date}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
