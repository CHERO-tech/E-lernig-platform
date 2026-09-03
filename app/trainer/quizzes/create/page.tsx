"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Copy } from "lucide-react";
import { useState } from "react";

function CreateQuizContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "advanced-react",
    timeLimit: 15,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "",
        options: ["", "", "", ""],
        correct: 0,
        explanation: "",
      },
    ],
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
      questions: [
        ...prev.questions,
        {
          id: newId,
          question: "",
          options: ["", "", "", ""],
          correct: 0,
          explanation: "",
        },
      ],
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
    router.push("/trainer/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create Quiz</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quiz Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quiz Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., React Hooks Quiz"
                  value={formData.title}
                  onChange={handleBasicChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  placeholder="What is this quiz about?"
                  rows={3}
                  value={formData.description}
                  onChange={handleBasicChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleBasicChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="advanced-react">Advanced React Patterns</option>
                    <option value="web-dev">Web Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (min)</label>
                  <input
                    type="number"
                    name="timeLimit"
                    value={formData.timeLimit}
                    onChange={handleBasicChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
                  <input
                    type="number"
                    name="passingScore"
                    value={formData.passingScore}
                    onChange={handleBasicChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Questions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Questions ({formData.questions.length})</h2>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100"
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
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-gray-700">Question {qIdx + 1}</p>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />

                  {/* Options */}
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
                          <span className="text-xs text-gray-600">Correct</span>
                        </label>
                        <input
                          type="text"
                          placeholder={`Option ${optIdx + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(q.id, optIdx, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          required
                        />
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <input
                    type="text"
                    placeholder="Explanation (shown after answer)"
                    value={q.explanation}
                    onChange={(e) => handleQuestionChange(q.id, "explanation", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
            >
              Create Quiz
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
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
