import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input, Select, EmptyState } from "../components/ui";
import { navItems } from "./TrainerDashboard";

interface Submission {
  student: string;
  assignment: string;
  date: string | null;
  status: "Graded" | "Late" | "Submitted" | "Missing";
  score: number | null;
}

const submissions: Submission[] = [
  { student: "Kagabo Eric", assignment: "Building Your First Webpage", date: "2026-06-10", status: "Graded", score: 95 },
  { student: "Ineza Grace Marie", assignment: "Building Your First Webpage", date: "2026-06-11", status: "Graded", score: 88 },
  { student: "Amahoro Jean de Dieu", assignment: "Building Your First Webpage", date: "2026-06-12", status: "Graded", score: 82 },
  { student: "Nzeyimana Patrick", assignment: "Building Your First Webpage", date: "2026-06-14", status: "Graded", score: 79 },
  { student: "Munyakazi Lisa", assignment: "Building Your First Webpage", date: "2026-06-15", status: "Late", score: 70 },
  { student: "Kagabo Eric", assignment: "Styling a Dashboard", date: "2026-07-05", status: "Graded", score: 91 },
  { student: "Ineza Grace Marie", assignment: "Styling a Dashboard", date: "2026-07-08", status: "Graded", score: 85 },
  { student: "Uwimana Diane", assignment: "Styling a Dashboard", date: "2026-07-06", status: "Graded", score: 97 },
  { student: "Kagabo Eric", assignment: "DOM Manipulation", date: "2026-08-02", status: "Submitted", score: null },
  { student: "Ineza Grace Marie", assignment: "DOM Manipulation", date: null, status: "Missing", score: null },
];

const statusTone: Record<Submission["status"], "success" | "warning" | "info" | "danger"> = {
  Graded: "success",
  Late: "warning",
  Submitted: "info",
  Missing: "danger",
};

const assignmentOptions = ["All Assignments", ...Array.from(new Set(submissions.map((s) => s.assignment)))];

export default function AssignmentsPage() {
  const [activeKey, setActiveKey] = useState("assignments");
  const [search, setSearch] = useState("");
  const [assignmentFilter, setAssignmentFilter] = useState("All Assignments");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/trainer";
  };

  const filtered = submissions.filter((s) => {
    if (search && !s.student.toLowerCase().includes(search.toLowerCase())) return false;
    if (assignmentFilter !== "All Assignments" && s.assignment !== assignmentFilter) return false;
    return true;
  });

  const graded = submissions.filter((s) => s.score !== null);
  const avgScore = Math.round(graded.reduce((sum, s) => sum + (s.score ?? 0), 0) / graded.length);
  const pendingCount = submissions.filter((s) => s.status === "Submitted").length;
  const missingCount = submissions.filter((s) => s.status === "Missing").length;

  return (
    <DashboardLayout
      role="trainer"
      roleLabel="Trainer"
      navItems={navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName="Emmanuel Nkurunziza"
      userInitials="EN"
    >
      <div className="p-8">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./assignments --submissions</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Assignments</h1>
          <p style={{ color: "#606C66" }}>Hands-on assignment submissions for Web Development</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Submissions" value={submissions.length} />
          <StatCard label="Avg Score" value={`${avgScore}%`} />
          <StatCard label="Pending Grading" value={pendingCount} trend={pendingCount > 0 ? "needs review" : undefined} trendTone={pendingCount > 0 ? "down" : "neutral"} />
          <StatCard label="Missing" value={missingCount} trend={missingCount > 0 ? "overdue" : undefined} trendTone={missingCount > 0 ? "down" : "neutral"} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[220px]">
            <Input placeholder="Search by student..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-64">
            <Select
              options={assignmentOptions.map((a) => ({ value: a, label: a }))}
              value={assignmentFilter}
              onChange={(e) => setAssignmentFilter(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No submissions found" description="Try a different student name or assignment." />
        ) : (
          <Card variant="terminal" padding="none" title="Submissions">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Student", "Assignment", "Submitted", "Score", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={`${s.student}-${s.assignment}`} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}
                        >
                          {s.student[0]}
                        </div>
                        <p className="text-sm font-medium" style={{ color: "#102019" }}>{s.student}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{s.assignment}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{s.date ?? "—"}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{s.score !== null ? `${s.score}%` : "—"}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={statusTone[s.status]} mono>
                        {s.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
