import { useState } from "react";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "Which HTML element is used to define the structure of a webpage?",
    options: ["<style>", "<html>", "<body>", "<head>"],
    correct: 1,
  },
  {
    id: 2,
    text: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style System", "Coded Style Syntax"],
    correct: 1,
  },
  {
    id: 3,
    text: "Which JavaScript method is used to select an HTML element by its ID?",
    options: ["getElementByClass()", "querySelector()", "getElementById()", "selectById()"],
    correct: 2,
  },
  {
    id: 4,
    text: "In React, what is used to pass data from a parent to a child component?",
    options: ["state", "props", "context", "refs"],
    correct: 1,
  },
  {
    id: 5,
    text: "Which HTTP method is typically used to create a new resource in a REST API?",
    options: ["GET", "PUT", "DELETE", "POST"],
    correct: 3,
  },
];

export default function AssessmentPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;
  const answered = Object.keys(answers).length;

  const score = submitted
    ? Math.round(
        (questions.filter((q, i) => answers[i] === q.correct).length / questions.length) * 100
      )
    : 0;

  const passed = score >= 70;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "#F5F7F5" }}>
        <div className="max-w-lg w-full">
          <div className="rounded-2xl overflow-hidden shadow-xl" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            {/* Result header */}
            <div className="p-8 text-center" style={{ background: passed ? "#071C12" : "#0B291A" }}>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl"
                style={{ background: passed ? "rgba(53,196,122,0.15)" : "rgba(239,68,68,0.15)" }}
              >
                {passed ? "🏆" : "📚"}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#35C47A" }}>$ assessment --complete</p>
              <h1 className="text-3xl font-bold mb-2" style={{ color: "#FFFFFF" }}>Assessment Complete</h1>
              <div className="font-mono text-6xl font-bold my-4" style={{ color: "#35C47A" }}>{score}%</div>
              <span
                className="inline-block font-mono text-sm px-4 py-1.5 rounded-full font-bold"
                style={{
                  background: passed ? "rgba(53,196,122,0.2)" : "rgba(239,68,68,0.2)",
                  color: passed ? "#35C47A" : "#ef4444",
                  border: `1px solid ${passed ? "rgba(53,196,122,0.4)" : "rgba(239,68,68,0.4)"}`,
                }}
              >
                {passed ? "PASSED ✓" : "NOT PASSED — Try again"}
              </span>
            </div>

            <div className="p-8">
              <h3 className="font-semibold mb-4" style={{ color: "#102019" }}>Skills Demonstrated</h3>
              <div className="space-y-3 mb-6">
                {[
                  { skill: "HTML Structure", demonstrated: answers[0] === 1 },
                  { skill: "CSS Knowledge", demonstrated: answers[1] === 1 },
                  { skill: "JavaScript DOM", demonstrated: answers[2] === 2 },
                  { skill: "React Fundamentals", demonstrated: answers[3] === 1 },
                  { skill: "REST API Concepts", demonstrated: answers[4] === 3 },
                ].map((s) => (
                  <div key={s.skill} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: "#102019" }}>{s.skill}</span>
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: s.demonstrated ? "rgba(53,196,122,0.1)" : "rgba(239,68,68,0.08)",
                        color: s.demonstrated ? "#35C47A" : "#ef4444",
                      }}
                    >
                      {s.demonstrated ? "Demonstrated ✓" : "Not demonstrated"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {passed ? (
                  <Link
                    to="/certificate"
                    className="flex-1 text-center py-3.5 rounded-lg font-semibold text-sm"
                    style={{ background: "#35C47A", color: "#071C12" }}
                  >
                    View Certificate
                  </Link>
                ) : (
                  <button
                    onClick={() => { setSubmitted(false); setCurrentQ(0); setAnswers({}); }}
                    className="flex-1 py-3.5 rounded-lg font-semibold text-sm"
                    style={{ background: "#35C47A", color: "#071C12" }}
                  >
                    Retake Assessment
                  </button>
                )}
                <Link
                  to="/student"
                  className="flex-1 text-center py-3.5 rounded-lg font-semibold text-sm border"
                  style={{ color: "#102019", border: "1px solid #E2E8E4" }}
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F5F7F5" }}>
      {/* Top bar */}
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-3xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs" style={{ color: "#35C47A" }}>$ assessment --web-development</p>
            <p className="text-white font-semibold">Web Development Assessment</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs" style={{ color: "#718078" }}>
              {answered}/{questions.length} answered
            </span>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <span className="font-mono text-sm" style={{ color: "#35C47A" }}>20:00</span>
            </div>
          </div>
        </div>
        {/* Progress */}
        <div className="h-1" style={{ background: "rgba(53,196,122,0.1)" }}>
          <div
            className="h-full transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, background: "#35C47A" }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-12">
        {/* Question counter */}
        <div className="flex items-center gap-3 mb-8">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className="w-8 h-8 rounded-full text-xs font-mono font-bold transition-all"
              style={{
                background: i === currentQ ? "#35C47A" : answers[i] !== undefined ? "rgba(53,196,122,0.15)" : "#FFFFFF",
                color: i === currentQ ? "#071C12" : answers[i] !== undefined ? "#35C47A" : "#718078",
                border: `1px solid ${i === currentQ ? "#35C47A" : answers[i] !== undefined ? "rgba(53,196,122,0.3)" : "#E2E8E4"}`,
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question card */}
        <div className="rounded-2xl p-8 mb-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: "rgba(53,196,122,0.08)", color: "#35C47A", border: "1px solid rgba(53,196,122,0.15)" }}>
              Question {question.id} / {questions.length}
            </span>
            <span className="font-mono text-xs" style={{ color: "#718078" }}>Web Development</span>
          </div>
          <h2 className="text-xl font-bold mb-8 leading-relaxed" style={{ color: "#102019" }}>{question.text}</h2>

          <div className="space-y-3">
            {question.options.map((opt, i) => {
              const selected = answers[currentQ] === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswers((prev) => ({ ...prev, [currentQ]: i }))}
                  className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all hover:-translate-y-0.5"
                  style={{
                    background: selected ? "rgba(53,196,122,0.06)" : "#F5F7F5",
                    border: `1.5px solid ${selected ? "#35C47A" : "#E2E8E4"}`,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0"
                    style={{
                      background: selected ? "#35C47A" : "#FFFFFF",
                      color: selected ? "#071C12" : "#718078",
                      border: selected ? "none" : "1.5px solid #E2E8E4",
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-sm font-medium" style={{ color: selected ? "#102019" : "#718078" }}>{opt}</span>
                  {selected && (
                    <svg className="ml-auto shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
            disabled={currentQ === 0}
            className="px-6 py-3 rounded-lg font-semibold text-sm disabled:opacity-30 transition-all hover:bg-gray-200"
            style={{ background: "#FFFFFF", color: "#102019", border: "1px solid #E2E8E4" }}
          >
            ← Previous
          </button>

          {currentQ < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQ((q) => Math.min(questions.length - 1, q + 1))}
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "#35C47A", color: "#071C12" }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "#35C47A", color: "#071C12" }}
            >
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
