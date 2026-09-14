import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, StatCard, Input, EmptyState } from "../components/ui";
import { navItems } from "./TrainerDashboard";
import { modules } from "./CourseDetailPage";
import { questions } from "./AssessmentPage";

interface Assessment {
  title: string;
  scope: string;
  questions: number;
  attempts: number;
  avgScore: number;
}

const moduleQuizzes: Assessment[] = [
  { title: "Module 01 Quiz", scope: "Introduction to Web Development", questions: 5, attempts: 42, avgScore: 88 },
  { title: "Module 02 Quiz", scope: "CSS & Styling", questions: 6, attempts: 35, avgScore: 76 },
  { title: "Module 03 Quiz", scope: "JavaScript Essentials", questions: 6, attempts: 28, avgScore: 81 },
  { title: "Module 04 Quiz", scope: "React Fundamentals", questions: 7, attempts: 15, avgScore: 72 },
];

const assessments: Assessment[] = [
  ...moduleQuizzes,
  { title: "Web Development Comprehensive Assessment", scope: "All modules", questions: questions.length, attempts: 19, avgScore: 84 },
];

export default function AssessmentsPage() {
  const [activeKey, setActiveKey] = useState("assessments");
  const [search, setSearch] = useState("");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/trainer";
  };

  const filtered = assessments.filter(
    (a) => a.title.toLowerCase().includes(search.toLowerCase()) || a.scope.toLowerCase().includes(search.toLowerCase())
  );

  const totalAttempts = assessments.reduce((sum, a) => sum + a.attempts, 0);
  const avgScore = Math.round(assessments.reduce((sum, a) => sum + a.avgScore, 0) / assessments.length);
  const totalQuestions = assessments.reduce((sum, a) => sum + a.questions, 0);

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
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./assessments --quizzes</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Assessments</h1>
          <p style={{ color: "#606C66" }}>Quizzes for Web Development, {modules.length} module quizzes plus the comprehensive assessment</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Assessments" value={assessments.length} />
          <StatCard label="Total Questions" value={totalQuestions} />
          <StatCard label="Total Attempts" value={totalAttempts} />
          <StatCard label="Avg Score" value={`${avgScore}%`} />
        </div>

        <div className="mb-6 max-w-sm">
          <Input placeholder="Search by title or module..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No assessments found" description="Try a different search term." />
        ) : (
          <Card variant="terminal" padding="none" title="Quizzes & Assessments">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Title", "Scope", "Questions", "Attempts", "Avg Score"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={a.title} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                    <td className="px-6 py-3.5 text-sm font-medium" style={{ color: "#102019" }}>{a.title}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{a.scope}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{a.questions}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{a.attempts}</td>
                    <td className="px-6 py-3.5 font-mono text-xs font-semibold" style={{ color: a.avgScore >= 80 ? "#1F7A4B" : a.avgScore >= 70 ? "#915F27" : "#C92C2C" }}>
                      {a.avgScore}%
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
