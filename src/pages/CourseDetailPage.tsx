import { useState } from "react";
import { Link } from "react-router-dom";

const modules = [
  {
    id: 1,
    title: "Module 01 — Introduction to Web Development",
    lessons: [
      { type: "video", title: "What is Web Development?", duration: "12 min", done: true },
      { type: "reading", title: "HTML Fundamentals Guide", duration: "15 min", done: true },
      { type: "pdf", title: "HTML Reference Sheet", duration: "5 min", done: true },
      { type: "demo", title: "Building Your First Webpage", duration: "25 min", done: false },
      { type: "quiz", title: "Module 01 Quiz", duration: "10 min", done: false },
    ],
  },
  {
    id: 2,
    title: "Module 02 — CSS & Styling",
    lessons: [
      { type: "video", title: "CSS Box Model", duration: "18 min", done: false },
      { type: "video", title: "Flexbox & Grid Layout", duration: "22 min", done: false },
      { type: "reading", title: "Responsive Design Principles", duration: "20 min", done: false },
      { type: "demo", title: "Styling a Dashboard", duration: "35 min", done: false },
      { type: "quiz", title: "Module 02 Quiz", duration: "10 min", done: false },
    ],
  },
  {
    id: 3,
    title: "Module 03 — JavaScript Essentials",
    lessons: [
      { type: "video", title: "Variables & Data Types", duration: "14 min", done: false },
      { type: "video", title: "Functions & Scope", duration: "20 min", done: false },
      { type: "pdf", title: "JS Cheatsheet", duration: "5 min", done: false },
      { type: "demo", title: "DOM Manipulation", duration: "30 min", done: false },
      { type: "quiz", title: "Module 03 Quiz", duration: "15 min", done: false },
    ],
  },
  {
    id: 4,
    title: "Module 04 — React Fundamentals",
    lessons: [
      { type: "video", title: "React Components & JSX", duration: "20 min", done: false },
      { type: "video", title: "State & Props", duration: "18 min", done: false },
      { type: "reading", title: "React Hooks Guide", duration: "25 min", done: false },
      { type: "demo", title: "Build a Todo App", duration: "45 min", done: false },
      { type: "quiz", title: "Module 04 Quiz", duration: "15 min", done: false },
    ],
  },
];

const keyConcepts = [
  "How to create and export a React component",
  "Understanding JSX and React syntax basics",
  "Creating a reusable component component in React",
  "Props in React",
];

const typeIcon = (type: string) => {
  switch (type) {
    case "video": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>;
    case "reading": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
    case "pdf": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
    case "demo": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
    case "quiz": return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    default: return null;
  }
};

export default function CourseDetailPage() {
  const [expanded, setExpanded] = useState<number[]>([1]);
  const [currentLesson, setCurrentLesson] = useState(modules[0].lessons[0]);

  const toggle = (id: number) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = modules.reduce((a, m) => a + m.lessons.filter((l) => l.done).length, 0);
  const progressPercent = Math.round((doneLessons / totalLessons) * 100);

  return (
    <div style={{ background: "#F5F7F5", minHeight: "100vh" }}>
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <Link to="/courses" className="text-sm" style={{ color: "#1F7A4B" }}>
          ← Back to Courses
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Video Player + Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="rounded-xl overflow-hidden" style={{ background: "#000" }}>
              <div className="relative w-full h-96 flex items-center justify-center" style={{ background: "#1a1a1a" }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="white" opacity="0.3">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <div className="absolute bottom-4 left-4 right-4 h-1 rounded-full" style={{ background: "#333" }}>
                  <div className="h-full rounded-full" style={{ width: "35%", background: "#35C47A" }} />
                </div>
              </div>
              <div className="p-4" style={{ background: "#0a0a0a" }}>
                <p className="text-white font-semibold text-sm">{currentLesson.title}</p>
                <p className="text-xs mt-1" style={{ color: "#888" }}>{currentLesson.duration}</p>
              </div>
            </div>

            {/* Course Info */}
            <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "20px", border: "1px solid #E2E8E4" }}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold" style={{ color: "#102019" }}>Web Development</h1>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#35C47A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              </div>
              <p style={{ color: "#606C66" }}>Master HTML, CSS, JavaScript and React to build modern web applications.</p>
            </div>

            {/* Key Concepts */}
            <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "20px", border: "1px solid #E2E8E4" }}>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#102019" }}>Key Concepts</h3>
              <ul className="space-y-3">
                {keyConcepts.map((concept, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2" className="mt-0.5 shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ color: "#606C66" }}>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lesson Recap */}
            <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "20px", border: "1px solid #E2E8E4" }}>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#102019" }}>Lesson Recap</h3>
              <div className="space-y-3 text-sm" style={{ color: "#606C66" }}>
                <p>In this lesson, you learned the fundamentals of building blocks of React: Components. You learned:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>How to create and export a React component</li>
                  <li>Understanding JSX and the basic React syntax</li>
                  <li>Creating a reusable component in React</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Study Progress + Course Content */}
          <div className="space-y-6">
            {/* Study Progress Card */}
            <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "20px", border: "1px solid #E2E8E4" }}>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#102019" }}>Study Progress</h3>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full font-bold text-2xl" style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}>
                  {progressPercent}%
                </div>
              </div>
              <p className="text-sm text-center mb-4" style={{ color: "#606C66" }}>Track your learning milestones and where you left off</p>
              <div className="h-2 rounded-full" style={{ background: "#E2E8E4" }}>
                <div className="h-full rounded-full" style={{ width: `${progressPercent}%`, background: "#35C47A" }} />
              </div>
              <p className="text-xs text-center mt-3" style={{ color: "#606C66" }}>{doneLessons} of {totalLessons} lessons completed</p>
            </div>

            {/* Course Content */}
            <div style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden", border: "1px solid #E2E8E4" }}>
              <div style={{ background: "#071C12", padding: "16px" }}>
                <h3 className="font-bold" style={{ color: "#FFFFFF" }}>Course Content</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {modules.map((module) => (
                  <div key={module.id} style={{ borderBottom: "1px solid #E2E8E4" }}>
                    <button
                      onClick={() => toggle(module.id)}
                      className="w-full text-left p-4 hover:bg-surface transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-sm" style={{ color: "#102019" }}>{module.title}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#606C66" strokeWidth="2"
                        style={{ transform: expanded.includes(module.id) ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {expanded.includes(module.id) && (
                      <div style={{ background: "#F9FAFB" }}>
                        {module.lessons.map((lesson, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentLesson(lesson)}
                            className="w-full text-left p-3 pl-8 hover:bg-surface transition-colors flex items-center gap-2 border-l-2 text-sm"
                            style={{
                              borderColor: lesson === currentLesson ? "#35C47A" : "transparent",
                              background: lesson === currentLesson ? "rgba(53,196,122,0.05)" : "transparent",
                            }}
                          >
                            <span style={{ color: lesson.done ? "#1F7A4B" : "#606C66" }}>
                              {typeIcon(lesson.type)}
                            </span>
                            <span className="flex-1" style={{ color: lesson.done ? "#1F7A4B" : "#606C66" }}>
                              {lesson.title}
                            </span>
                            {lesson.done && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="#35C47A">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enroll Button */}
            <Link
              to="/checkout"
              className="block w-full text-center py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "#35C47A", color: "#071C12" }}
            >
              Continue Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
