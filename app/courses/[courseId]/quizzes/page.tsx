"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, CheckCircle, Lock, Play } from "lucide-react";

function QuizzesContent({ params }: { params: { courseId: string } }) {
  const router = useRouter();

  const quizzes = [
    {
      id: 1,
      title: "React Hooks Fundamentals Quiz",
      description: "Test your knowledge of React hooks including useState, useEffect, and useContext",
      questions: 5,
      timeLimit: 15,
      passingScore: 70,
      completed: true,
      score: 92,
      attempts: 1,
      status: "passed",
    },
    {
      id: 2,
      title: "Component Composition Quiz",
      description: "Assess your understanding of component patterns and composition techniques",
      questions: 8,
      timeLimit: 20,
      passingScore: 70,
      completed: false,
      score: null,
      attempts: 0,
      status: "not-started",
    },
    {
      id: 3,
      title: "Advanced Patterns Assessment",
      description: "Comprehensive quiz covering HOCs, render props, and custom hooks",
      questions: 10,
      timeLimit: 25,
      passingScore: 75,
      completed: true,
      score: 65,
      attempts: 2,
      status: "failed",
    },
    {
      id: 4,
      title: "Performance Optimization Quiz",
      description: "Test your knowledge on React performance optimization techniques",
      questions: 6,
      timeLimit: 18,
      passingScore: 70,
      completed: false,
      score: null,
      attempts: 0,
      status: "locked",
    },
  ];

  const stats = {
    total: quizzes.length,
    completed: quizzes.filter(q => q.completed).length,
    passed: quizzes.filter(q => q.status === "passed").length,
    avgScore: Math.round(
      quizzes
        .filter(q => q.score)
        .reduce((sum, q) => sum + (q.score || 0), 0) / quizzes.filter(q => q.score).length
    ),
  };

  const getStatusBadge = (quiz: typeof quizzes[0]) => {
    if (quiz.status === "passed")
      return { label: "Passed", color: "bg-green-100 text-green-700" };
    if (quiz.status === "failed")
      return { label: "Failed", color: "bg-red-100 text-red-700" };
    if (quiz.status === "locked")
      return { label: "Locked", color: "bg-gray-100 text-gray-700" };
    return { label: "Not Started", color: "bg-blue-100 text-blue-700" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={36} />
            <h1 className="text-4xl font-bold">Course Quizzes</h1>
          </div>
          <p className="text-green-100">Advanced React Patterns</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Total Quizzes", value: stats.total, icon: BookOpen, color: "blue" },
            { label: "Completed", value: stats.completed, icon: CheckCircle, color: "green" },
            { label: "Passed", value: stats.passed, icon: CheckCircle, color: "purple" },
            { label: "Avg Score", value: stats.avgScore + "%", icon: BookOpen, color: "orange" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon size={32} className={`text-${stat.color}-600 opacity-50`} />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Quizzes List */}
        <div className="space-y-4">
          {quizzes.map((quiz, i) => {
            const badge = getStatusBadge(quiz);
            const isLocked = quiz.status === "locked";

            return (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow ${
                  isLocked ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{quiz.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{quiz.description}</p>

                    {/* Quiz Meta */}
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <BookOpen size={16} /> {quiz.questions} questions
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={16} /> {quiz.timeLimit} minutes
                      </span>
                      <span>Pass: {quiz.passingScore}%</span>
                    </div>
                  </div>

                  {/* Score or CTA */}
                  <div className="text-right">
                    {quiz.completed ? (
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          {quiz.score}%
                        </div>
                        <p className="text-xs text-gray-600">
                          {quiz.attempts} attempt{quiz.attempts > 1 ? "s" : ""}
                        </p>
                      </div>
                    ) : null}

                    {isLocked ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Lock size={20} />
                        <span className="text-sm">Locked</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => router.push(`/courses/${params.courseId}/quizzes/${quiz.id}`)}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                          quiz.completed
                            ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        <Play size={16} />
                        {quiz.completed ? "Retake" : "Start"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {quiz.completed && quiz.score !== null && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          quiz.score >= quiz.passingScore
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                        style={{ width: `${quiz.score}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="font-bold text-blue-900 mb-2">📝 Quiz Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• You can retake quizzes to improve your score</li>
            <li>• Time limit is strictly enforced</li>
            <li>• Your highest score is recorded</li>
            <li>• Review the material if you don't pass on first attempt</li>
            <li>• Some quizzes are locked until prerequisites are completed</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function Quizzes({ params }: { params: { courseId: string } }) {
  return (
    <ProtectedRoute>
      <QuizzesContent params={params} />
    </ProtectedRoute>
  );
}
