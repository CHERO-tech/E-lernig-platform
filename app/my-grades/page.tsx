"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { Award, TrendingUp } from "lucide-react";
import { useState } from "react";

function MyGradesContent() {
  const { user } = useAuth();
  const { courses } = useCourses();
  const { enrollments } = useEnrollment();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allGrades = enrollments.flatMap(enrollment => {
    const course = courses.find(c => c.id === enrollment.courseId);
    if (!course) return [];

    return [
      ...enrollment.quizAttempts.map(attempt => {
        const quiz = course.quizzes.find(q => q.id === attempt.quizId);
        return {
          id: `quiz-${enrollment.courseId}-${attempt.quizId}`,
          type: 'quiz' as const,
          title: quiz?.title || 'Unknown Quiz',
          course: course.title,
          score: attempt.score,
          maxScore: 100,
          date: new Date(attempt.attemptedAt).toLocaleDateString(),
          passed: attempt.score >= (quiz?.passingScore || 70),
        };
      }),
      ...enrollment.submissions
        .filter(sub => sub.status === 'graded')
        .map(sub => {
          const assignment = course.assignments.find(a => a.id === sub.assignmentId);
          return {
            id: `assignment-${enrollment.courseId}-${sub.assignmentId}`,
            type: 'assignment' as const,
            title: assignment?.title || 'Unknown Assignment',
            course: course.title,
            score: sub.score || 0,
            maxScore: assignment?.maxScore || 100,
            date: new Date(sub.submittedAt).toLocaleDateString(),
            passed: (sub.score || 0) >= (assignment?.maxScore || 100) * 0.7,
            feedback: sub.feedback,
            rubric: assignment?.rubric || [],
          };
        }),
    ];
  });

  const avgGrade = allGrades.length > 0
    ? Math.round(allGrades.reduce((sum, g) => sum + g.score, 0) / allGrades.length)
    : 0;

  const passedCount = allGrades.filter(g => g.passed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Award size={36} />
            <h1 className="text-4xl font-bold">My Grades</h1>
          </div>
          <p className="text-forge-soft">View all your quiz and assignment grades</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { label: 'Average Grade', value: avgGrade + '%', icon: TrendingUp, color: 'blue' },
            { label: 'Graded Items', value: allGrades.length, icon: Award, color: 'green' },
            { label: 'Passed', value: passedCount, icon: Award, color: 'purple' },
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

        {/* Grades List */}
        <div className="space-y-4">
          {allGrades.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Award size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No graded items yet</p>
            </div>
          ) : (
            allGrades.map((grade, i) => (
              <motion.div
                key={grade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setExpandedId(expandedId === grade.id ? null : grade.id)}
                  className="w-full text-left p-6 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        grade.type === 'quiz'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-forge-soft text-ember2'
                      }`}>
                        {grade.type === 'quiz' ? 'Quiz' : 'Assignment'}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{grade.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{grade.course}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${grade.score >= grade.maxScore * 0.7 ? 'text-ember-strong' : 'text-red-600'}`}>
                      {grade.score}/{grade.maxScore}
                    </div>
                    <p className="text-xs text-gray-500">{grade.date}</p>
                  </div>
                </button>

                {expandedId === grade.id && grade.type === 'assignment' && 'feedback' in grade && grade.feedback && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <p className="font-semibold text-gray-900 mb-2">Feedback</p>
                    <p className="text-gray-700">{(grade as any).feedback}</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyGradesPage() {
  return (
    <ProtectedRoute>
      <MyGradesContent />
    </ProtectedRoute>
  );
}
