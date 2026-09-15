"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { listEnrolledUserIds, readEnrollmentsForUser, getKnownUsers, writeEnrollmentsForUser } from "@/lib/shared/crossAccountStore";
import { useNotifications } from "@/lib/notifications/useNotifications";

function GradingDashboardContent() {
  const { courses } = useCourses();
  const { addNotification } = useNotifications();
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [gradingState, setGradingState] = useState<{ [key: string]: { score: number; feedback: string } }>({});

  const enrolledUserIds = listEnrolledUserIds();
  const knownUsers = getKnownUsers();

  const submissions = enrolledUserIds.flatMap(userId => {
    const enrollments = readEnrollmentsForUser(userId);
    const user = knownUsers.find(u => u.id === userId);
    if (!user) return [];

    return enrollments.enrollments.flatMap(enrollment => {
      const course = courses.find(c => c.id === enrollment.courseId);
      if (!course) return [];

      return enrollment.submissions
        .filter(sub => sub.status === 'submitted')
        .map(sub => {
          const assignment = course.assignments.find(a => a.id === sub.assignmentId);
          if (!assignment) return null;
          return {
            id: `${userId}-${sub.assignmentId}`,
            userId,
            studentName: user.name,
            avatar: user.name.split(' ').map(n => n[0]).join(''),
            course: course.title,
            assignment: assignment.title,
            submitted: new Date(sub.submittedAt).toLocaleDateString(),
            status: sub.status,
            score: sub.score || null,
            rubric: assignment.rubric,
            submissionDetails: sub,
          };
        })
        .filter((x): x is Exclude<typeof x, null> => x !== null);
    });
  });

  const stats = {
    pending: submissions.filter(s => s.status === "submitted").length,
    graded: submissions.filter(s => s.status === "graded").length,
    avgScore: submissions.filter(s => s.status === "graded" && s.score).length > 0
      ? Math.round(
          submissions
            .filter(s => s.status === "graded" && s.score)
            .reduce((sum, s) => sum + (s.score || 0), 0) / submissions.filter(s => s.status === "graded" && s.score).length
        )
      : 0,
  };

  const selected = selectedSubmission ? submissions.find(s => s.id === selectedSubmission) : null;

  const handleGradeSubmit = (submissionId: string) => {
    const state = gradingState[submissionId];
    if (!state || state.score === undefined) {
      addNotification({
        type: 'system',
        icon: '⚠️',
        title: 'Error',
        message: 'Please enter a score',
      });
      return;
    }

    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return;

    const enrollments = readEnrollmentsForUser(sub.userId);
    const updated = {
      ...enrollments,
      enrollments: enrollments.enrollments.map(e => {
        if (e.courseId !== sub.submissionDetails.assignmentId) {
          return e.courseId === courses.find(c => c.assignments.some(a => a.id === sub.submissionDetails.assignmentId))?.id
            ? {
                ...e,
                submissions: e.submissions.map(subm =>
                  subm.assignmentId === sub.submissionDetails.assignmentId
                    ? {
                        ...subm,
                        status: 'graded' as const,
                        score: state.score,
                        feedback: state.feedback,
                      }
                    : subm
                ),
              }
            : e;
        }
        return e;
      }),
    };

    writeEnrollmentsForUser(sub.userId, updated);
    setGradingState(prev => ({ ...prev, [submissionId]: { score: 0, feedback: '' } }));
    addNotification({
      type: 'system',
      icon: '✅',
      title: 'Grade Submitted',
      message: `Grade recorded for ${sub.studentName}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel */}
      <div className="flex-1 max-h-screen overflow-y-auto">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Grading Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Pending", value: stats.pending, icon: Clock, color: "blue" },
                { label: "Graded", value: stats.graded, icon: CheckCircle, color: "green" },
                { label: "Average Score", value: stats.avgScore + "%", icon: AlertCircle, color: "purple" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <Icon size={24} className={`text-${stat.color}-600 opacity-50`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          {submissions.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No submissions to grade</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub, i) => (
                <motion.button
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedSubmission(sub.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedSubmission === sub.id
                      ? "border-ember-strong bg-forge-soft"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{sub.studentName}</h3>
                      <p className="text-sm text-gray-600">{sub.assignment}</p>
                      <p className="text-xs text-gray-500 mt-1">Submitted: {sub.submitted}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        sub.status === 'graded'
                          ? 'bg-forge-soft text-ember2'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {sub.status === 'graded' ? `${sub.score}%` : 'Pending'}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Grading Form */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto max-h-screen"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">{selected.studentName}</h2>
          <p className="text-sm text-gray-600 mb-6">{selected.assignment}</p>

          {/* Rubric */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Rubric</h3>
            <div className="space-y-2">
              {selected.rubric.map(criterion => (
                <div key={criterion.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{criterion.criterion}</span>
                  <span className="font-semibold text-gray-900">{criterion.points}pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grading Form */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
              <input
                type="number"
                min="0"
                max="100"
                value={gradingState[selected.id]?.score ?? ''}
                onChange={(e) =>
                  setGradingState(prev => ({
                    ...prev,
                    [selected.id]: { ...prev[selected.id], score: parseInt(e.target.value) || 0 },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                placeholder="0-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
              <textarea
                rows={4}
                value={gradingState[selected.id]?.feedback ?? ''}
                onChange={(e) =>
                  setGradingState(prev => ({
                    ...prev,
                    [selected.id]: { ...prev[selected.id], feedback: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
                placeholder="Provide feedback..."
              />
            </div>

            <button
              onClick={() => handleGradeSubmit(selected.id)}
              className="w-full px-4 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
            >
              Submit Grade
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function GradingPage() {
  return (
    <ProtectedRoute>
      <GradingDashboardContent />
    </ProtectedRoute>
  );
}
