"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, CheckCircle, Lock, Play } from "lucide-react";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";

function QuizzesContent({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const { getCourseById } = useCourses();
  const { enrollments } = useEnrollment();

  const course = getCourseById(params.courseId);
  const enrollment = enrollments.find(e => e.courseId === params.courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-ember-strong text-white rounded-lg">
            Back
          </button>
        </div>
      </div>
    );
  }

  const quizzes = course.quizzes.map(quiz => {
    const attempt = enrollment?.quizAttempts.find(a => a.quizId === quiz.id);
    return {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.length,
      timeLimit: quiz.timeLimit,
      passingScore: quiz.passingScore,
      completed: !!attempt,
      score: attempt?.score || null,
      attempts: enrollment?.quizAttempts.filter(a => a.quizId === quiz.id).length || 0,
      status: !attempt ? 'not-started' : attempt.score >= quiz.passingScore ? 'passed' : 'failed',
    };
  });

  const stats = {
    total: quizzes.length,
    completed: quizzes.filter(q => q.completed).length,
    passed: quizzes.filter(q => q.status === "passed").length,
    avgScore: quizzes.filter(q => q.score).length > 0
      ? Math.round(quizzes.filter(q => q.score).reduce((sum, q) => sum + (q.score || 0), 0) / quizzes.filter(q => q.score).length)
      : 0,
  };

  const getStatusBadge = (quiz: typeof quizzes[0]) => {
    if (quiz.status === "passed")
      return { label: "Passed", color: "bg-forge-soft text-ember" };
    if (quiz.status === "failed")
      return { label: "Failed", color: "bg-red-100 text-red-700" };
    if (quiz.status === "locked")
      return { label: "Locked", color: "bg-gray-100 text-gray-700" };
    return { label: "Not Started", color: "bg-blue-100 text-blue-700" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={36} />
            <h1 className="text-4xl font-bold">Course Quizzes</h1>
          </div>
          <p className="text-forge-soft">{course.title}</p>
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
                        <div className="text-3xl font-bold text-ember-strong mb-1">
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
                            : "bg-ember-strong text-white hover:bg-ember"
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
                            ? "bg-ember-strong"
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
            <li>• Your highest score is recorded and displayed</li>
            <li>• Take your time and review before submitting</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function QuizzesPage({ params }: { params: { courseId: string } }) {
  return (
    <ProtectedRoute>
      <QuizzesContent params={params} />
    </ProtectedRoute>
  );
}
