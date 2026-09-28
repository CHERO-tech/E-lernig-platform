"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Copy } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { QuizQuestionType } from "@/lib/courses/types";

interface DraftQuestion {
  id: number;
  type: QuizQuestionType;
  question: string;
  options: string[];
  correct: number;
  acceptableAnswersRaw: string;
  explanation: string;
}

function makeBlankQuestion(id: number): DraftQuestion {
  return {
    id,
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correct: 0,
    acceptableAnswersRaw: "",
    explanation: "",
  };
}

function CreateQuizContent() {
  const router = useRouter();
  const { courses, addQuizToCourse } = useCourses();
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: courses.length > 0 ? courses[0].id : "course-1",
    timeLimit: 15,
    passingScore: 70,
    dueDate: "",
    questions: [makeBlankQuestion(1)] as DraftQuestion[],
  });

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (id: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    }));
  };

  const handleTypeChange = (id: number, type: QuizQuestionType) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id !== id) return q;
        if (type === "true-false") {
          return { ...q, type, options: ["True", "False"], correct: 0 };
        }
        if (type === "multiple-choice") {
          const options = q.options.length === 2 ? ["", "", "", ""] : q.options;
          return { ...q, type, options, correct: 0 };
        }
        return { ...q, type };
      }),
    }));
  };

  const handleOptionChange = (qId: number, optIdx: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === qId
          ? { ...q, options: q.options.map((opt, i) => (i === optIdx ? value : opt)) }
          : q
      ),
    }));
  };

  const handleAddQuestion = () => {
    const newId = Math.max(...formData.questions.map(q => q.id), 0) + 1;
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, makeBlankQuestion(newId)],
    }));
  };

  const handleDeleteQuestion = (id: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id),
    }));
  };

  const handleDuplicateQuestion = (id: number) => {
    const source = formData.questions.find(q => q.id === id);
    if (source) {
      const newId = Math.max(...formData.questions.map(q => q.id), 0) + 1;
      setFormData(prev => ({
        ...prev,
        questions: [
          ...prev.questions,
          { ...source, id: newId },
        ],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      addNotification({
        type: 'system',
        icon: '⚠️',
        title: 'Error',
        message: 'Quiz title is required',
      });
      return;
    }
    if (formData.questions.some(q => q.type === "short-answer" && !q.acceptableAnswersRaw.trim())) {
      addNotification({
        type: 'system',
        icon: '⚠️',
        title: 'Error',
        message: 'Every short-answer question needs at least one acceptable answer',
      });
      return;
    }
    addQuizToCourse(formData.course, {
      title: formData.title,
      description: formData.description,
      timeLimit: formData.timeLimit,
      passingScore: formData.passingScore,
      dueDate: formData.dueDate || undefined,
      questions: formData.questions.map(q => ({
        id: q.id.toString(),
        type: q.type,
        question: q.question,
        explanation: q.explanation,
        options: q.type === "short-answer" ? [] : q.options,
        correct: q.type === "short-answer" ? 0 : q.correct,
        acceptableAnswers:
          q.type === "short-answer"
            ? q.acceptableAnswersRaw.split(",").map(a => a.trim()).filter(Boolean)
            : undefined,
      })),
    });
    addNotification({
      type: 'system',
      icon: '✅',
      title: 'Quiz Created',
      message: `"${formData.title}" has been added to the course.`,
    });
    router.push("/trainer/dashboard");
  };

  return (
    <div className="min-h-screen bg-ow">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-ow rounded-lg" aria-label="Go back">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <h1 className="text-3xl font-bold text-dt">Create Quiz</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quiz Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-border p-8"
          >
            <h2 className="text-2xl font-bold text-dt mb-6">Quiz Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dt mb-2" htmlFor="title">Quiz Title *</label>
                <input id="title"
                  type="text"
                  name="title"
                  placeholder="e.g., React Hooks Quiz"
                  value={formData.title}
                  onChange={handleBasicChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dt mb-2" htmlFor="description">Description *</label>
                <textarea id="description"
                  name="description"
                  placeholder="What is this quiz about?"
                  rows={3}
                  value={formData.description}
                  onChange={handleBasicChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dt mb-2" htmlFor="course">Course</label>
                  <select id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleBasicChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                  >
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dt mb-2" htmlFor="timeLimit">Time Limit (min)</label>
                  <input id="timeLimit"
                    type="number"
                    name="timeLimit"
                    value={formData.timeLimit}
                    onChange={handleBasicChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dt mb-2" htmlFor="passingScore">Passing Score (%)</label>
                  <input id="passingScore"
                    type="number"
                    name="passingScore"
                    value={formData.passingScore}
                    onChange={handleBasicChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dt mb-2" htmlFor="dueDate">Due Date (optional)</label>
                  <input id="dueDate"
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleBasicChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Questions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dt">Questions ({formData.questions.length})</h2>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="flex items-center gap-2 px-4 py-2 bg-forge-soft text-ember-strong rounded-lg font-medium hover:bg-forge-soft"
              >
                <Plus size={18} /> Add Question
              </button>
            </div>

            <div className="space-y-6">
              {formData.questions.map((q, qIdx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-border p-6"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-dt">Question {qIdx + 1}</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleDuplicateQuestion(q.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Copy size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <input
                    type="text"
                    placeholder="Enter question text"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(q.id, "question", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    required
                   aria-label="Enter question text"/>

                  {/* Question Type */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-mg mb-2" htmlFor={`type-${q.id}`}>Question Type</label>
                    <select
                      id={`type-${q.id}`}
                      value={q.type}
                      onChange={(e) => handleTypeChange(q.id, e.target.value as QuizQuestionType)}
                      className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="true-false">True / False</option>
                      <option value="short-answer">Short Answer</option>
                    </select>
                  </div>

                  {/* Options */}
                  {q.type === "short-answer" ? (
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-mg mb-2" htmlFor={`accepted-${q.id}`}>
                        Acceptable Answers (comma-separated)
                      </label>
                      <input
                        id={`accepted-${q.id}`}
                        type="text"
                        placeholder="e.g. Paris, paris, City of Light"
                        value={q.acceptableAnswersRaw}
                        onChange={(e) => handleQuestionChange(q.id, "acceptableAnswersRaw", e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
                        required
                      />
                      <p className="text-xs text-mg mt-1">Matching ignores capitalization and extra spaces.</p>
                    </div>
                  ) : (
                  <div className="space-y-3 mb-4">
                    {q.options.map((option, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={q.correct === optIdx}
                            onChange={() => handleQuestionChange(q.id, "correct", optIdx)}
                            className="w-4 h-4"
                          />
                          <span className="text-xs text-mg">Correct</span>
                        </label>
                        {q.type === "true-false" ? (
                          <span className="flex-1 px-3 py-2 text-sm text-dt">{option}</span>
                        ) : (
                          <input
                            type="text"
                            placeholder={`Option ${optIdx + 1}`}
                            aria-label={`Option ${optIdx + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(q.id, optIdx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
                            required
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  )}

                  {/* Explanation */}
                  <input
                    type="text"
                    placeholder="Explanation (shown after answer)"
                    value={q.explanation}
                    onChange={(e) => handleQuestionChange(q.id, "explanation", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
                   aria-label="Explanation (shown after answer)"/>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-8 py-3 bg-ember-strong text-white rounded-lg font-bold hover:bg-ember"
            >
              Create Quiz
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 border border-border text-dt rounded-lg font-medium hover:bg-ow"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreateQuiz() {
  return (
    <ProtectedRoute requiredRole="trainer">
      <CreateQuizContent />
    </ProtectedRoute>
  );
}
