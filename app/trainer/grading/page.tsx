"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { FileText, Clock, CheckCircle, AlertCircle, ArrowLeft, ClipboardList } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { useCourses } from "@/lib/courses/useCourses";
import { listEnrolledUserIds, readEnrollmentsForUser, getKnownUsers, writeEnrollmentsForUser, writeNotificationForUser } from "@/lib/shared/crossAccountStore";
import { useNotifications } from "@/lib/notifications/useNotifications";

function GradingDashboardContent() {
  const { user } = useAuth();
  const { courses } = useCourses();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<"assignments" | "quizzes">("assignments");
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [gradingState, setGradingState] = useState<{ [key: string]: { score: number; feedback: string } }>({});

  const myCourseIds = new Set(courses.filter(c => c.instructorId === user?.id).map(c => c.id));
  const enrolledUserIds = listEnrolledUserIds();
  const knownUsers = getKnownUsers();

  const submissions = enrolledUserIds.flatMap(userId => {
    const enrollments = readEnrollmentsForUser(userId);
    const knownUser = knownUsers.find(u => u.id === userId);
    if (!knownUser) return [];

    return enrollments.enrollments.flatMap(enrollment => {
      if (!myCourseIds.has(enrollment.courseId)) return [];
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
            studentName: knownUser.name,
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

  const quizAttempts = enrolledUserIds
    .flatMap(userId => {
      const enrollments = readEnrollmentsForUser(userId);
      const knownUser = knownUsers.find(u => u.id === userId);
      if (!knownUser) return [];

      return enrollments.enrollments.flatMap(enrollment => {
        if (!myCourseIds.has(enrollment.courseId)) return [];
        const course = courses.find(c => c.id === enrollment.courseId);
        if (!course) return [];

        return enrollment.quizAttempts
          .map(attempt => {
            const quiz = course.quizzes.find(q => q.id === attempt.quizId);
            if (!quiz) return null;
            return {
              id: `${userId}-${attempt.quizId}-${attempt.attemptedAt}`,
              studentName: knownUser.name,
              course: course.title,
              quiz: quiz.title,
              score: attempt.score,
              passingScore: quiz.passingScore,
              passed: attempt.score >= quiz.passingScore,
              attemptedAt: attempt.attemptedAt,
            };
          })
          .filter((x): x is Exclude<typeof x, null> => x !== null);
      });
    })
    .sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime());

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

  const quizStats = {
    totalAttempts: quizAttempts.length,
    passed: quizAttempts.filter(a => a.passed).length,
    avgScore: quizAttempts.length > 0
      ? Math.round(quizAttempts.reduce((sum, a) => sum + a.score, 0) / quizAttempts.length)
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
    writeNotificationForUser(sub.userId, {
      type: 'course',
      icon: '📝',
      title: 'Assignment Graded',
      message: `"${sub.assignment}" was graded: ${state.score}%`,
      link: '/my-grades',
    });
    setGradingState(prev => ({ ...prev, [submissionId]: { score: 0, feedback: '' } }));
    addNotification({
      type: 'system',
      icon: '✅',
      title: 'Grade Submitted',
      message: `Grade recorded for ${sub.studentName}`,
    });
  };

  return (
    <div className="min-h-screen bg-ow flex">
      {/* Left Panel */}
      <div className="flex-1 max-h-screen overflow-y-auto">
        <div className="bg-white border-b border-border">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <Link href="/trainer/dashboard" className="inline-flex items-center gap-1.5 text-sm text-mg hover:text-dt transition-colors mb-3">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-dt mb-6">Grading Dashboard</h1>

            <div className="flex gap-2 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab("assignments")}
                className={`pb-3 px-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "assignments" ? "border-ember-strong text-ember-strong" : "border-transparent text-mg hover:text-dt"
                }`}
              >
                Assignments
              </button>
              <button
                onClick={() => setActiveTab("quizzes")}
                className={`pb-3 px-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "quizzes" ? "border-ember-strong text-ember-strong" : "border-transparent text-mg hover:text-dt"
                }`}
              >
                Quiz Results
              </button>
            </div>

            {/* Stats */}
            {activeTab === "assignments" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Pending", value: stats.pending, icon: Clock, color: "blue" },
                  { label: "Graded", value: stats.graded, icon: CheckCircle, color: "green" },
                  { label: "Average Score", value: stats.avgScore + "%", icon: AlertCircle, color: "purple" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-ow rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-mg text-sm mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-dt">{stat.value}</p>
                        </div>
                        <Icon size={24} className={`text-${stat.color}-600 opacity-50`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Attempts", value: quizStats.totalAttempts, icon: ClipboardList },
                  { label: "Passed", value: quizStats.passed, icon: CheckCircle },
                  { label: "Average Score", value: quizStats.avgScore + "%", icon: AlertCircle },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-ow rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-mg text-sm mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-dt">{stat.value}</p>
                        </div>
                        <Icon size={24} className="text-mg opacity-50" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          {activeTab === "assignments" ? (
            submissions.length === 0 ? (
              <div className="bg-white rounded-lg border border-border p-12 text-center">
                <FileText size={48} className="mx-auto text-border mb-4" />
                <p className="text-mg text-lg">No submissions to grade</p>
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
                        : "border-border bg-white hover:border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-dt">{sub.studentName}</h3>
                        <p className="text-sm text-mg">{sub.assignment}</p>
                        <p className="text-xs text-mg mt-1">Submitted: {sub.submitted}</p>
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
            )
          ) : quizAttempts.length === 0 ? (
            <div className="bg-white rounded-lg border border-border p-12 text-center">
              <ClipboardList size={48} className="mx-auto text-border mb-4" />
              <p className="text-mg text-lg">No quiz attempts yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-border divide-y divide-border">
              {quizAttempts.map((attempt) => (
                <div key={attempt.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-dt">{attempt.studentName}</h3>
                    <p className="text-sm text-mg truncate">{attempt.quiz} · {attempt.course}</p>
                    <p className="text-xs text-mg mt-1">{new Date(attempt.attemptedAt).toLocaleString()}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      attempt.passed ? "bg-forge-soft text-ember2" : "bg-err/10 text-err"
                    }`}
                  >
                    {attempt.score}% {attempt.passed ? "· Passed" : `· Needs ${attempt.passingScore}%`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Grading Form */}
      {activeTab === "assignments" && selected && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-96 bg-white border-l border-border p-6 overflow-y-auto max-h-screen"
        >
          <h2 className="text-xl font-bold text-dt mb-4">{selected.studentName}</h2>
          <p className="text-sm text-mg mb-6">{selected.assignment}</p>

          {/* Submitted file */}
          <div className="mb-6 p-3 bg-ow rounded-lg flex items-center justify-between">
            <span className="text-sm text-dt truncate">{selected.submissionDetails.fileName}</span>
            {selected.submissionDetails.fileDataUrl ? (
              <a
                href={selected.submissionDetails.fileDataUrl}
                download={selected.submissionDetails.fileName}
                className="text-sm font-medium text-ember-strong hover:underline shrink-0 ml-3"
              >
                Download
              </a>
            ) : (
              <span className="text-xs text-mg shrink-0 ml-3">too large to store</span>
            )}
          </div>

          {/* Rubric */}
          <div className="mb-6">
            <h3 className="font-semibold text-dt mb-3">Rubric</h3>
            <div className="space-y-2">
              {selected.rubric.map(criterion => (
                <div key={criterion.id} className="flex items-center justify-between text-sm">
                  <span className="text-dt">{criterion.criterion}</span>
                  <span className="font-semibold text-dt">{criterion.points}pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grading Form */}
          <div className="space-y-4 border-t border-border pt-6">
            <div>
              <label className="block text-sm font-medium text-dt mb-2" htmlFor="grading-score">Score</label>
              <input
                id="grading-score"
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
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                placeholder="0-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dt mb-2" htmlFor="grading-feedback">Feedback</label>
              <textarea
                id="grading-feedback"
                rows={4}
                value={gradingState[selected.id]?.feedback ?? ''}
                onChange={(e) =>
                  setGradingState(prev => ({
                    ...prev,
                    [selected.id]: { ...prev[selected.id], feedback: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
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
    <ProtectedRoute requiredRole="trainer">
      <GradingDashboardContent />
    </ProtectedRoute>
  );
}
