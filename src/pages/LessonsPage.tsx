import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input, Select, EmptyState } from "../components/ui";
import { navItems } from "./TrainerDashboard";
import { modules } from "./CourseDetailPage";

type LessonType = "video" | "reading" | "pdf" | "demo" | "quiz";

const typeTone: Record<LessonType, "info" | "neutral" | "warning" | "success" | "danger"> = {
  video: "info",
  reading: "neutral",
  pdf: "warning",
  demo: "success",
  quiz: "danger",
};

const moduleOptions = ["All Modules", ...modules.map((m) => m.title)];

export default function LessonsPage() {
  const [activeKey, setActiveKey] = useState("lessons");
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All Modules");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/trainer";
  };

  const lessons = modules.flatMap((m) => m.lessons.map((item) => ({ ...item, module: m.title })));

  const filtered = lessons.filter((l) => {
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (moduleFilter !== "All Modules" && l.module !== moduleFilter) return false;
    return true;
  });

  const totalMinutes = lessons.reduce((sum, l) => sum + parseInt(l.duration), 0);
  const videoCount = lessons.filter((l) => l.type === "video").length;
  const quizCount = lessons.filter((l) => l.type === "quiz").length;

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
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./lessons --course=web-dev</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Lessons</h1>
          <p style={{ color: "#606C66" }}>Course content for Web Development</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Lessons" value={lessons.length} />
          <StatCard label="Modules" value={modules.length} />
          <StatCard label="Videos" value={videoCount} />
          <StatCard label="Quizzes" value={quizCount} trend={`${totalMinutes} min total`} trendTone="neutral" />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[220px]">
            <Input placeholder="Search lessons..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-64">
            <Select
              options={moduleOptions.map((m) => ({ value: m, label: m }))}
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No lessons found" description="Try a different search term or module." />
        ) : (
          <Card variant="terminal" padding="none" title="Course Content">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Lesson", "Module", "Duration", "Type"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={`${l.module}-${l.title}`} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                    <td className="px-6 py-3.5 text-sm font-medium" style={{ color: "#102019" }}>{l.title}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{l.module.replace(/^Module \d+ — /, "")}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{l.duration}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={typeTone[l.type as LessonType]} mono>
                        {l.type}
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
