"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ChevronDown, CheckCircle, Lock, Play, MessageCircle, Download } from "lucide-react";
import { useState } from "react";

function CourseLearnContent({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState(1);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showQA, setShowQA] = useState(false);
  const [questions, setQuestions] = useState([
    { id: 1, author: "Sarah Chen", question: "How do I use React hooks in class components?", answers: 3, helpful: 12 },
    { id: 2, author: "Mike Johnson", question: "Can you explain the useContext hook?", answers: 5, helpful: 8 },
  ]);

  const sections = [
    {
      id: 1,
      title: "Introduction & Setup",
      lessons: [
        { id: 1, title: "Course Overview", duration: "5 min", completed: true },
        { id: 2, title: "Setting Up Your Environment", duration: "12 min", completed: true },
        { id: 3, title: "Project Structure", duration: "8 min", completed: false },
      ],
    },
    {
      id: 2,
      title: "React Fundamentals",
      lessons: [
        { id: 4, title: "Components & Props", duration: "15 min", completed: false },
        { id: 5, title: "State & Lifecycle", duration: "18 min", completed: false },
        { id: 6, title: "Event Handling", duration: "10 min", completed: false },
      ],
    },
    {
      id: 3,
      title: "Advanced Patterns",
      lessons: [
        { id: 7, title: "Custom Hooks", duration: "20 min", completed: false, locked: true },
        { id: 8, title: "Context API", duration: "15 min", completed: false, locked: true },
        { id: 9, title: "Performance Optimization", duration: "25 min", completed: false, locked: true },
      ],
    },
  ];

  const currentLesson = sections
    .flatMap(s => s.lessons)
    .find(l => l.id === activeLesson);

  const progress = Math.round(
    (sections.flatMap(s => s.lessons).filter(l => l.completed).length /
     sections.flatMap(s => s.lessons).length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 font-medium">
              ← Back to Course
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{progress}% Complete</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black aspect-video flex items-center justify-center m-6 rounded-lg overflow-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <Play size={32} className="text-black ml-1" />
          </div>
        </motion.div>

        {/* Lesson Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 pb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentLesson?.title}</h1>
          <p className="text-gray-600 mb-6">Advanced React Patterns • {currentLesson?.duration}</p>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            <button className="px-4 py-3 font-medium text-green-600 border-b-2 border-green-600">
              About
            </button>
            <button
              onClick={() => setShowQA(!showQA)}
              className={`px-4 py-3 font-medium transition-colors ${
                showQA ? "text-green-600 border-b-2 border-green-600" : "text-gray-600"
              }`}
            >
              Q&A ({questions.length})
            </button>
            <button className="px-4 py-3 font-medium text-gray-600 hover:text-gray-900">
              Resources
            </button>
          </div>

          {/* About Tab */}
          {!showQA && (
            <div className="space-y-6 mb-12">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Lesson Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  In this lesson, we'll dive deep into advanced React patterns that will take your component design to the next level.
                  You'll learn how to structure complex applications, manage state efficiently, and create reusable component patterns.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">What You'll Learn</h2>
                <ul className="space-y-2">
                  {[
                    "Higher-Order Components (HOCs) and their use cases",
                    "Render Props pattern for component composition",
                    "Custom hooks for logic reusability",
                    "Context API for global state management",
                    "Performance optimization techniques",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                  <Download size={18} /> Download Materials
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                  <MessageCircle size={18} /> Ask Question
                </button>
              </div>
            </div>
          )}

          {/* Q&A Tab */}
          {showQA && (
            <div className="space-y-4 mb-12">
              {questions.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{q.question}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      {q.answers} answers
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">by {q.author}</p>
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                    👍 Helpful ({q.helpful}) • View Discussion →
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Sidebar - Lesson Navigation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-80 bg-white border-l border-gray-200 overflow-y-auto max-h-screen"
      >
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="font-bold text-gray-900 mb-4">Course Content</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{progress}% Complete</p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="divide-y divide-gray-200">
          {sections.map((section, i) => (
            <div key={section.id} className="border-b border-gray-100">
              <button
                onClick={() => setExpandedSection(expandedSection === i ? -1 : i)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{section.title}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {section.lessons.filter(l => l.completed).length}/{section.lessons.length} completed
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-gray-600 transition-transform ${expandedSection === i ? "rotate-180" : ""}`}
                />
              </button>

              {expandedSection === i && (
                <div className="bg-gray-50 py-2">
                  {section.lessons.map((lesson) => {
                    const isLocked = "locked" in lesson && lesson.locked;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson.id)}
                        className={`w-full px-6 py-3 text-left text-sm transition-colors ${
                          activeLesson === lesson.id
                            ? "bg-green-50 border-l-4 border-green-600 text-green-600"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isLocked ? (
                            <Lock size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                          ) : lesson.completed ? (
                            <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex-shrink-0 mt-0.5"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{lesson.title}</p>
                            <p className="text-xs text-gray-600">{lesson.duration}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Actions */}
        <div className="p-6 border-t border-gray-200 space-y-3">
          <button className="w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100">
            Mark as Complete
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Leave Review
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function CourseLearn({ params }: { params: { courseId: string } }) {
  return (
    <ProtectedRoute>
      <CourseLearnContent params={params} />
    </ProtectedRoute>
  );
}
