import { useState, type FormEvent } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select, Textarea, EmptyState } from "../components/ui";
import { navItems } from "./CompanyPortal";

interface Feedback {
  id: string;
  student: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

const ratingOptions = ["5", "4", "3", "2", "1"];

type FeedbackForm = {
  student: string;
  role: string;
  rating: string;
  comment: string;
};

const emptyFeedbackForm = (): FeedbackForm => ({
  student: "",
  role: "",
  rating: "5",
  comment: "",
});

const feedback: Feedback[] = [
  { id: "fb-1", student: "Kagabo Eric", role: "Frontend Developer Intern", rating: 5, comment: "Eric picked up our codebase incredibly fast and shipped three features in his first month. Would hire full-time without hesitation.", date: "2026-09-01" },
  { id: "fb-2", student: "Uwimana Diane", role: "Backend Engineer", rating: 5, comment: "Diane's Django work was production-ready from day one. Excellent communicator too.", date: "2026-08-20" },
  { id: "fb-3", student: "Nzeyimana Patrick", role: "Network Administrator", rating: 4, comment: "Solid technical skills, still building confidence presenting to stakeholders.", date: "2026-08-10" },
  { id: "fb-4", student: "Ineza Grace Marie", role: "UI/UX Designer (Contract)", rating: 5, comment: "Grace redesigned our onboarding flow and our activation rate went up 22%.", date: "2026-07-15" },
  { id: "fb-5", student: "Munyakazi Lisa", role: "Graphic Design Intern", rating: 3, comment: "Good eye for visuals, needs more experience with brand consistency across projects.", date: "2026-06-28" },
  { id: "fb-6", student: "Amahoro Jean de Dieu", role: "QA Engineer", rating: 4, comment: "Thorough tester, caught issues our internal team missed.", date: "2026-06-05" },
];

function nextFeedbackId(existing: Feedback[]): string {
  const nums = existing.map((f) => Number(f.id.replace("fb-", "")) || 0);
  return `fb-${(nums.length ? Math.max(...nums) : 0) + 1}`;
}

function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function FeedbackPage() {
  const [activeKey, setActiveKey] = useState("feedback");
  const [search, setSearch] = useState("");

  const [feedbackList, setFeedbackList] = useState<Feedback[]>(feedback);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FeedbackForm>(emptyFeedbackForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/company";
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyFeedbackForm());
    setFormOpen(true);
  };

  const openEditForm = (f: Feedback) => {
    setEditingId(f.id);
    setForm({ student: f.student, role: f.role, rating: String(f.rating), comment: f.comment });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.student.trim() || !form.role.trim() || !form.comment.trim()) return;

    if (editingId) {
      setFeedbackList((prev) =>
        prev.map((f) =>
          f.id === editingId
            ? { ...f, student: form.student, role: form.role, rating: Number(form.rating), comment: form.comment }
            : f
        )
      );
    } else {
      const newFeedback: Feedback = {
        id: nextFeedbackId(feedbackList),
        student: form.student,
        role: form.role,
        rating: Number(form.rating),
        comment: form.comment,
        date: todayDate(),
      };
      setFeedbackList((prev) => [newFeedback, ...prev]);
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    setFeedbackList((prev) => prev.filter((f) => f.id !== id));
    setDeleteId(null);
  };

  const filtered = feedbackList.filter(
    (f) => f.student.toLowerCase().includes(search.toLowerCase()) || f.role.toLowerCase().includes(search.toLowerCase())
  );

  const avgRating = feedbackList.length
    ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1)
    : "0.0";
  const fiveStarCount = feedbackList.filter((f) => f.rating === 5).length;
  const uniqueStudents = new Set(feedbackList.map((f) => f.student)).size;

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
          <StatCard label="Reviews" value={feedbackList.length} />
          <StatCard label="5-Star Reviews" value={fiveStarCount} />
          <StatCard label="Students Reviewed" value={uniqueStudents} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-start">
          <div className="flex-1 min-w-[220px] max-w-sm">
            <Input placeholder="Search by student or role..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="primary" onClick={openAddForm}>+ Add Feedback</Button>
        </div>

        {formOpen && (
          <Card variant="terminal" padding="lg" title={editingId ? "Edit Feedback" : "Add Feedback"} className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Student" value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} required />
                <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
                <Select
                  label="Rating"
                  options={ratingOptions.map((r) => ({ value: r, label: `${r} ⭐` }))}
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                />
              </div>
              <Textarea label="Comment" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required />
              <div className="flex gap-3 mt-2">
                <Button type="submit" variant="primary">{editingId ? "Save Changes" : "Add Feedback"}</Button>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {filtered.length === 0 ? (
          <EmptyState title="No feedback found" description="Try a different student name or role." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((f) => (
              <Card key={f.id} variant="terminal" padding="lg">
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
                <div className="flex items-center justify-between mt-3">
                  <p className="font-mono text-xs" style={{ color: "#606C66" }}>{f.date}</p>
                  {deleteId === f.id ? (
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete?</span>
                      <button onClick={() => handleDelete(f.id)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                      <button onClick={() => setDeleteId(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button onClick={() => openEditForm(f)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                      <button onClick={() => setDeleteId(f.id)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
