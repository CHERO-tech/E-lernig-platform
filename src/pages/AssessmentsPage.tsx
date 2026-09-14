import { useState, type FormEvent } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select, Textarea, EmptyState } from "../components/ui";
import { navItems } from "./TrainerDashboard";
import { modules } from "./CourseDetailPage";
import { questions as comprehensiveQuestions } from "./AssessmentPage";

interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

interface Assessment {
  title: string;
  scope: string;
  attempts: number;
  avgScore: number;
  questionList: QuizQuestion[];
}

type AssessmentForm = {
  title: string;
  scope: string;
};

const emptyAssessmentForm = (): AssessmentForm => ({ title: "", scope: "" });

type QuestionForm = {
  text: string;
  options: string[];
  correct: number;
};

const emptyQuestionForm = (): QuestionForm => ({
  text: "",
  options: ["", "", "", ""],
  correct: 0,
});

const module01Questions: QuizQuestion[] = [
  { id: 1, text: "What does HTML stand for?", options: ["HyperText Markup Language", "Home Tool Markup Language", "HyperText Markdown Language", "HighText Machine Language"], correct: 0 },
  { id: 2, text: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<nav>"], correct: 1 },
  { id: 3, text: "What is the correct file extension for HTML files?", options: [".html", ".css", ".js", ".txt"], correct: 0 },
  { id: 4, text: "Which element defines the largest heading in HTML?", options: ["<h6>", "<heading>", "<h1>", "<head>"], correct: 2 },
  { id: 5, text: "What is the purpose of the <head> element in an HTML document?", options: ["Contains visible page content", "Contains metadata about the document", "Defines the page footer", "Creates a navigation bar"], correct: 1 },
];

const module02Questions: QuizQuestion[] = [
  { id: 1, text: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style System", "Coded Style Syntax"], correct: 0 },
  { id: 2, text: "Which CSS property controls text size?", options: ["text-style", "font-size", "text-size", "font-style"], correct: 1 },
  { id: 3, text: 'How do you select an element with id "header" in CSS?', options: [".header", "#header", "*header", "header#"], correct: 1 },
  { id: 4, text: "Which property is used to change the background color?", options: ["color", "background-color", "bgcolor", "background-tint"], correct: 1 },
  { id: 5, text: "Which of the following is NOT part of the CSS Box Model?", options: ["Margin", "Border", "Padding", "Font-family"], correct: 3 },
  { id: 6, text: "Which display value removes an element from the page layout entirely?", options: ["hidden", "invisible", "none", "collapse"], correct: 2 },
];

const module03Questions: QuizQuestion[] = [
  { id: 1, text: "Which operator performs strict equality comparison in JavaScript?", options: ["==", "===", "=", "!="], correct: 1 },
  { id: 2, text: "What does Array.prototype.map() return?", options: ["The original array", "A new array with transformed elements", "Undefined", "The array length"], correct: 1 },
  { id: 3, text: "Which method converts a JSON string into a JavaScript object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "Object.parse()"], correct: 1 },
  { id: 4, text: "What is the result of typeof null in JavaScript?", options: ['"null"', '"undefined"', '"object"', '"number"'], correct: 2 },
  { id: 5, text: "Which method adds an element to the end of an array?", options: ["shift()", "unshift()", "push()", "pop()"], correct: 2 },
  { id: 6, text: "What does NaN stand for?", options: ["Not a Node", "Not a Number", "Null and None", "New Array Node"], correct: 1 },
];

const module04Questions: QuizQuestion[] = [
  { id: 1, text: "What is used to pass data from a parent to a child component in React?", options: ["state", "props", "context", "refs"], correct: 1 },
  { id: 2, text: "Which hook is used to manage state in a functional component?", options: ["useEffect", "useState", "useContext", "useRef"], correct: 1 },
  { id: 3, text: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"], correct: 0 },
  { id: 4, text: "Which hook runs side effects after render?", options: ["useState", "useEffect", "useMemo", "useCallback"], correct: 1 },
  { id: 5, text: "How do you conditionally render a component in React?", options: ["Using a for loop", "Using an if/ternary inside JSX", "Using CSS", "Using useEffect"], correct: 1 },
  { id: 6, text: "What is the virtual DOM?", options: ["The browser's real DOM", "A lightweight copy of the DOM used for efficient updates", "A server-side database", "A CSS framework"], correct: 1 },
  { id: 7, text: "Which pattern safely updates state based on its previous value?", options: ["setState(prev => ...)", "Direct mutation", "Object.assign() only", "delete operator"], correct: 0 },
];

const assessments: Assessment[] = [
  { title: "Module 01 Quiz", scope: "Introduction to Web Development", attempts: 42, avgScore: 88, questionList: module01Questions },
  { title: "Module 02 Quiz", scope: "CSS & Styling", attempts: 35, avgScore: 76, questionList: module02Questions },
  { title: "Module 03 Quiz", scope: "JavaScript Essentials", attempts: 28, avgScore: 81, questionList: module03Questions },
  { title: "Module 04 Quiz", scope: "React Fundamentals", attempts: 15, avgScore: 72, questionList: module04Questions },
  { title: "Web Development Comprehensive Assessment", scope: "All modules", attempts: 19, avgScore: 84, questionList: comprehensiveQuestions.map((q) => ({ ...q })) },
];

export default function AssessmentsPage() {
  const [activeKey, setActiveKey] = useState("assessments");
  const [search, setSearch] = useState("");

  const [assessmentsList, setAssessmentsList] = useState<Assessment[]>(assessments);

  const [formOpen, setFormOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [form, setForm] = useState<AssessmentForm>(emptyAssessmentForm());
  const [deleteTitle, setDeleteTitle] = useState<string | null>(null);

  const [managingTitle, setManagingTitle] = useState<string | null>(null);
  const [qFormOpen, setQFormOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [qForm, setQForm] = useState<QuestionForm>(emptyQuestionForm());
  const [deleteQuestionId, setDeleteQuestionId] = useState<number | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/trainer";
  };

  const openAddForm = () => {
    setEditingTitle(null);
    setForm(emptyAssessmentForm());
    setFormOpen(true);
  };

  const openEditForm = (a: Assessment) => {
    setEditingTitle(a.title);
    setForm({ title: a.title, scope: a.scope });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingTitle(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.scope.trim()) return;

    if (editingTitle) {
      setAssessmentsList((prev) =>
        prev.map((a) => (a.title === editingTitle ? { ...a, title: form.title, scope: form.scope } : a))
      );
      if (managingTitle === editingTitle) setManagingTitle(form.title);
    } else {
      setAssessmentsList((prev) => [
        { title: form.title, scope: form.scope, attempts: 0, avgScore: 0, questionList: [] },
        ...prev,
      ]);
    }
    closeForm();
  };

  const handleDelete = (title: string) => {
    setAssessmentsList((prev) => prev.filter((a) => a.title !== title));
    setDeleteTitle(null);
    if (managingTitle === title) setManagingTitle(null);
  };

  const managingAssessment = assessmentsList.find((a) => a.title === managingTitle) ?? null;

  const openAddQuestion = () => {
    setEditingQuestionId(null);
    setQForm(emptyQuestionForm());
    setQFormOpen(true);
  };

  const openEditQuestion = (q: QuizQuestion) => {
    setEditingQuestionId(q.id);
    setQForm({ text: q.text, options: [...q.options], correct: q.correct });
    setQFormOpen(true);
  };

  const closeQForm = () => {
    setQFormOpen(false);
    setEditingQuestionId(null);
  };

  const handleQuestionSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!managingTitle) return;
    if (!qForm.text.trim() || qForm.options.some((o) => !o.trim())) return;

    setAssessmentsList((prev) =>
      prev.map((a) => {
        if (a.title !== managingTitle) return a;
        if (editingQuestionId !== null) {
          return {
            ...a,
            questionList: a.questionList.map((q) =>
              q.id === editingQuestionId
                ? { ...q, text: qForm.text, options: [...qForm.options], correct: qForm.correct }
                : q
            ),
          };
        }
        const nextId = a.questionList.length ? Math.max(...a.questionList.map((q) => q.id)) + 1 : 1;
        const newQuestion: QuizQuestion = { id: nextId, text: qForm.text, options: [...qForm.options], correct: qForm.correct };
        return { ...a, questionList: [...a.questionList, newQuestion] };
      })
    );
    closeQForm();
  };

  const handleDeleteQuestion = (id: number) => {
    if (!managingTitle) return;
    setAssessmentsList((prev) =>
      prev.map((a) => (a.title === managingTitle ? { ...a, questionList: a.questionList.filter((q) => q.id !== id) } : a))
    );
    setDeleteQuestionId(null);
  };

  const filtered = assessmentsList.filter(
    (a) => a.title.toLowerCase().includes(search.toLowerCase()) || a.scope.toLowerCase().includes(search.toLowerCase())
  );

  const totalAttempts = assessmentsList.reduce((sum, a) => sum + a.attempts, 0);
  const avgScore = assessmentsList.length
    ? Math.round(assessmentsList.reduce((sum, a) => sum + a.avgScore, 0) / assessmentsList.length)
    : 0;
  const totalQuestions = assessmentsList.reduce((sum, a) => sum + a.questionList.length, 0);

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
        {managingAssessment ? (
          <>
            <div className="mb-8">
              <button
                onClick={() => setManagingTitle(null)}
                className="font-mono text-xs mb-3 inline-block"
                style={{ color: "#1F7A4B" }}
              >
                ← Back to Assessments
              </button>
              <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>
                $ ls ./assessments/questions --title="{managingAssessment.title}"
              </p>
              <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>{managingAssessment.title}</h1>
              <p style={{ color: "#606C66" }}>{managingAssessment.scope} · {managingAssessment.questionList.length} question{managingAssessment.questionList.length === 1 ? "" : "s"}</p>
            </div>

            <div className="mb-6">
              <Button variant="primary" onClick={openAddQuestion}>+ Add Question</Button>
            </div>

            {qFormOpen && (
              <Card variant="terminal" padding="lg" title={editingQuestionId !== null ? "Edit Question" : "Add Question"} className="mb-6">
                <form onSubmit={handleQuestionSubmit}>
                  <Textarea
                    label="Question"
                    value={qForm.text}
                    onChange={(e) => setQForm({ ...qForm, text: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    {qForm.options.map((opt, i) => (
                      <Input
                        key={i}
                        label={`Option ${String.fromCharCode(65 + i)}`}
                        value={opt}
                        onChange={(e) => {
                          const next = [...qForm.options];
                          next[i] = e.target.value;
                          setQForm({ ...qForm, options: next });
                        }}
                        required
                      />
                    ))}
                  </div>
                  <Select
                    label="Correct Answer"
                    options={qForm.options.map((_, i) => ({ value: String(i), label: `Option ${String.fromCharCode(65 + i)}` }))}
                    value={String(qForm.correct)}
                    onChange={(e) => setQForm({ ...qForm, correct: Number(e.target.value) })}
                  />
                  <div className="flex gap-3 mt-2">
                    <Button type="submit" variant="primary">{editingQuestionId !== null ? "Save Changes" : "Add Question"}</Button>
                    <Button type="button" variant="outline" onClick={closeQForm}>Cancel</Button>
                  </div>
                </form>
              </Card>
            )}

            {managingAssessment.questionList.length === 0 ? (
              <EmptyState title="No questions yet" description="Add the first question for this assessment." />
            ) : (
              <div className="space-y-4">
                {managingAssessment.questionList.map((q, idx) => (
                  <Card key={q.id} variant="terminal" padding="lg">
                    <div className="flex items-start justify-between mb-4">
                      <p className="text-sm font-semibold" style={{ color: "#102019" }}>
                        <span className="font-mono text-xs mr-2" style={{ color: "#606C66" }}>Q{idx + 1}</span>
                        {q.text}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      {q.options.map((opt, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs"
                          style={{
                            background: i === q.correct ? "rgba(53,196,122,0.08)" : "#F5F7F5",
                            border: `1px solid ${i === q.correct ? "rgba(53,196,122,0.3)" : "#E2E8E4"}`,
                            color: i === q.correct ? "#1F7A4B" : "#606C66",
                          }}
                        >
                          <span className="font-bold">{String.fromCharCode(65 + i)}</span>
                          <span>{opt}</span>
                          {i === q.correct && <span className="ml-auto">✓</span>}
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-border">
                      {deleteQuestionId === q.id ? (
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete this question?</span>
                          <button onClick={() => handleDeleteQuestion(q.id)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                          <button onClick={() => setDeleteQuestionId(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <button onClick={() => openEditQuestion(q)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                          <button onClick={() => setDeleteQuestionId(q.id)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-8">
              <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./assessments --quizzes</p>
              <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Assessments</h1>
              <p style={{ color: "#606C66" }}>Quizzes for Web Development, {modules.length} module quizzes plus the comprehensive assessment</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="Assessments" value={assessmentsList.length} />
              <StatCard label="Total Questions" value={totalQuestions} />
              <StatCard label="Total Attempts" value={totalAttempts} />
              <StatCard label="Avg Score" value={`${avgScore}%`} />
            </div>

            <div className="flex flex-wrap gap-3 mb-6 items-start">
              <div className="flex-1 min-w-[220px] max-w-sm">
                <Input placeholder="Search by title or module..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Button variant="primary" onClick={openAddForm}>+ Add Assessment</Button>
            </div>

            {formOpen && (
              <Card variant="terminal" padding="lg" title={editingTitle ? "Edit Assessment" : "Add Assessment"} className="mb-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                    <Input label="Scope" placeholder="e.g. Module 05" value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} required />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Button type="submit" variant="primary">{editingTitle ? "Save Changes" : "Add Assessment"}</Button>
                    <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
                  </div>
                </form>
              </Card>
            )}

            {filtered.length === 0 ? (
              <EmptyState title="No assessments found" description="Try a different search term." />
            ) : (
              <Card variant="terminal" padding="none" title="Quizzes & Assessments">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                      {["Title", "Scope", "Questions", "Attempts", "Avg Score", "Actions"].map((h) => (
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
                        <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{a.questionList.length}</td>
                        <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{a.attempts}</td>
                        <td className="px-6 py-3.5 font-mono text-xs font-semibold" style={{ color: a.attempts === 0 ? "#606C66" : a.avgScore >= 80 ? "#1F7A4B" : a.avgScore >= 70 ? "#915F27" : "#C92C2C" }}>
                          {a.attempts === 0 ? "—" : `${a.avgScore}%`}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap">
                          {deleteTitle === a.title ? (
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete?</span>
                              <button onClick={() => handleDelete(a.title)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                              <button onClick={() => setDeleteTitle(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-4">
                              <button onClick={() => setManagingTitle(a.title)} className="font-mono text-xs font-semibold" style={{ color: "#1F7A4B" }}>Questions</button>
                              <button onClick={() => openEditForm(a)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                              <button onClick={() => setDeleteTitle(a.title)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
