"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

function GradingDashboardContent() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);

  const submissions = [
    {
      id: 1,
      student: "Sarah Chen",
      avatar: "SC",
      course: "Advanced React Patterns",
      assignment: "Build a React Todo App",
      submitted: "2025-03-15",
      status: "pending",
      score: null,
    },
    {
      id: 2,
      student: "Mike Johnson",
      avatar: "MJ",
      course: "Advanced React Patterns",
      assignment: "Build a React Todo App",
      submitted: "2025-03-14",
      status: "graded",
      score: 92,
    },
    {
      id: 3,
      student: "Emma Davis",
      avatar: "ED",
      course: "Web Development",
      assignment: "Responsive Website Design",
      submitted: "2025-03-16",
      status: "pending",
      score: null,
    },
    {
      id: 4,
      student: "Alex Kumar",
      avatar: "AK",
      course: "Advanced React Patterns",
      assignment: "Build a React Todo App",
      submitted: "2025-03-13",
      status: "graded",
      score: 88,
    },
  ];

  const stats = {
    pending: submissions.filter(s => s.status === "pending").length,
    graded: submissions.filter(s => s.status === "graded").length,
    avgScore: Math.round(
      submissions
        .filter(s => s.status === "graded")
        .reduce((sum, s) => sum + (s.score || 0), 0) / submissions.filter(s => s.status === "graded").length
    ),
  };

  const selected = selectedSubmission ? submissions.find(s => s.id === selectedSubmission) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
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
                <div key={i} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Icon size={20} className={`text-${stat.color}-600`} />
                  <div>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submissions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Submissions</h2>
              <div className="space-y-3">
                {submissions.map((submission, i) => (
                  <motion.button
                    key={submission.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedSubmission(submission.id)}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      selectedSubmission === submission.id
                        ? "bg-green-50 border-green-500 shadow-md"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {submission.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{submission.student}</p>
                        <p className="text-xs text-gray-600">{submission.assignment}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{submission.submitted}</span>
                      {submission.status === "graded" ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">
                          {submission.score}%
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded font-semibold">
                          Pending
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Grading Panel */}
          {selected ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Submission Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selected.student}</h2>
                    <p className="text-gray-600">{selected.assignment}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${
                      selected.status === "graded"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selected.status === "graded" ? `Graded: ${selected.score}%` : "Pending"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Course</p>
                    <p className="font-semibold text-gray-900">{selected.course}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Submitted</p>
                    <p className="font-semibold text-gray-900">{selected.submitted}</p>
                  </div>
                </div>
              </div>

              {/* Files */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Submitted Files</h3>
                <div className="space-y-2">
                  {["todo-app.zip", "README.md", "demo-video.mp4"].map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <FileText size={20} className="text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{file}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grading Form */}
              {selected.status === "pending" && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Grade Submission</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Overall Score</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="0"
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          defaultValue="0"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                        />
                        <span className="text-sm text-gray-600">/ 100</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                      <textarea
                        placeholder="Provide constructive feedback for the student..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">
                        Submit Grade
                      </button>
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                        Save Draft
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-12 text-center">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Select a submission to grade</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GradingDashboard() {
  return (
    <ProtectedRoute requiredRole="trainer">
      <GradingDashboardContent />
    </ProtectedRoute>
  );
}
