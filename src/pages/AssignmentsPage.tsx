import { useState, type FormEvent } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select, Textarea, EmptyState } from "../components/ui";
import { navItems } from "./TrainerDashboard";

interface Submission {
  student: string;
  assignment: string;
  date: string | null;
  status: "Graded" | "Late" | "Submitted" | "Missing";
  score: number | null;
  comment: string | null;
}

type GradeForm = {
  score: string;
  comment: string;
};

const submissions: Submission[] = [
  { student: "Kagabo Eric", assignment: "Building Your First Webpage", date: "2026-06-10", status: "Graded", score: 95, comment: "Clean, semantic markup." },
  { student: "Ineza Grace Marie", assignment: "Building Your First Webpage", date: "2026-06-11", status: "Graded", score: 88, comment: null },
  { student: "Amahoro Jean de Dieu", assignment: "Building Your First Webpage", date: "2026-06-12", status: "Graded", score: 82, comment: null },
  { student: "Nzeyimana Patrick", assignment: "Building Your First Webpage", date: "2026-06-14", status: "Graded", score: 79, comment: "Missing alt text on images." },
  { student: "Munyakazi Lisa", assignment: "Building Your First Webpage", date: "2026-06-15", status: "Late", score: 70, comment: "Submitted 3 days late." },
  { student: "Kagabo Eric", assignment: "Styling a Dashboard", date: "2026-07-05", status: "Graded", score: 91, comment: null },
  { student: "Ineza Grace Marie", assignment: "Styling a Dashboard", date: "2026-07-08", status: "Graded", score: 85, comment: null },
  { student: "Uwimana Diane", assignment: "Styling a Dashboard", date: "2026-07-06", status: "Graded", score: 97, comment: "Excellent use of Grid." },
  { student: "Kagabo Eric", assignment: "DOM Manipulation", date: "2026-08-02", status: "Submitted", score: null, comment: null },
  { student: "Ineza Grace Marie", assignment: "DOM Manipulation", date: null, status: "Missing", score: null, comment: null },
];

const statusTone: Record<Submission["status"], "success" | "warning" | "info" | "danger"> = {
  Graded: "success",
  Late: "warning",
  Submitted: "info",
  Missing: "danger",
};

const assignmentOptions = ["All Assignments", ...Array.from(new Set(submissions.map((s) => s.assignment)))];

function submissionKey(s: Pick<Submission, "student" | "assignment">): string {
  return `${s.student}-${s.assignment}`;
}

export default function AssignmentsPage() {
  const [activeKey, setActiveKey] = useState("assignments");
  const [search, setSearch] = useState("");
  const [assignmentFilter, setAssignmentFilter] = useState("All Assignments");

  const [submissionsList, setSubmissionsList] = useState<Submission[]>(submissions);
  const [gradingKey, setGradingKey] = useState<string | null>(null);
  const [form, setForm] = useState<GradeForm>({ score: "", comment: "" });

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/trainer";
  };

  const openGradeForm = (s: Submission) => {
    setGradingKey(submissionKey(s));
    setForm({ score: s.score !== null ? String(s.score) : "", comment: s.comment ?? "" });
  };

  const closeForm = () => {
    setGradingKey(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const score = Number(form.score);
    if (!form.score.trim() || Number.isNaN(score) || score < 0 || score > 100) return;

    setSubmissionsList((prev) =>
      prev.map((s) =>
        submissionKey(s) === gradingKey
          ? {
              ...s,
              score,
              comment: form.comment.trim() || null,
              status: s.status === "Late" ? "Late" : "Graded",
            }
          : s
      )
    );
    closeForm();
  };

  const filtered = submissionsList.filter((s) => {
    if (search && !s.student.toLowerCase().includes(search.toLowerCase())) return false;
    if (assignmentFilter !== "All Assignments" && s.assignment !== assignmentFilter) return false;
    return true;
  });

  const graded = submissionsList.filter((s) => s.score !== null);
  const avgScore = graded.length ? Math.round(graded.reduce((sum, s) => sum + (s.score ?? 0), 0) / graded.length) : 0;
  const pendingCount = submissionsList.filter((s) => s.status === "Submitted").length;
  const missingCount = submissionsList.filter((s) => s.status === "Missing").length;
  const gradingSubmission = submissionsList.find((s) => submissionKey(s) === gradingKey) ?? null;

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
          <StatCard label="Submissions" value={submissionsList.length} />
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

        {gradingSubmission && (
          <Card variant="terminal" padding="lg" title={`Grade: ${gradingSubmission.student} — ${gradingSubmission.assignment}`} className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Score (%)" type="number" min="0" max="100" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} required />
              </div>
              <Textarea label="Comment (optional)" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
              <div className="flex gap-3 mt-2">
                <Button type="submit" variant="primary">Save Grade</Button>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {filtered.length === 0 ? (
          <EmptyState title="No submissions found" description="Try a different student name or assignment." />
        ) : (
          <Card variant="terminal" padding="none" title="Submissions">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Student", "Assignment", "Submitted", "Score", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={submissionKey(s)} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F5F7F5" : "none" }}>
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
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>
                      {s.assignment}
                      {s.comment && <p className="mt-0.5" style={{ color: "#8A968F" }}>"{s.comment}"</p>}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{s.date ?? "—"}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{s.score !== null ? `${s.score}%` : "—"}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={statusTone[s.status]} mono>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5">
                      {s.status === "Missing" ? (
                        <span className="font-mono text-xs" style={{ color: "#606C66" }}>—</span>
                      ) : (
                        <button onClick={() => openGradeForm(s)} className="font-mono text-xs font-semibold" style={{ color: "#1F7A4B" }}>
                          {s.score !== null ? "Edit Grade" : "Grade"}
                        </button>
                      )}
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
