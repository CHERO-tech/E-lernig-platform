"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Award, TrendingUp, BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";

function MyGradesContent() {
  const [expandedGrade, setExpandedGrade] = useState<number | null>(null);

  const courseGrades = [
    {
      id: 1,
      course: "Advanced React Patterns",
      instructor: "Sarah Chen",
      currentGrade: 92,
      trend: "up",
      assignments: [
        {
          id: 1,
          title: "Build a React Todo App",
          score: 92,
          maxScore: 100,
          dueDate: "2025-03-20",
          submittedDate: "2025-03-19",
          feedback: "Excellent work! Your code is clean, well-documented, and all features work as expected.",
          rubric: [
            { criterion: "Code Quality", earned: 30, max: 30 },
            { criterion: "Functionality", earned: 40, max: 40 },
            { criterion: "Documentation", earned: 22, max: 30 },
          ],
        },
        {
          id: 2,
          title: "Component Composition Challenge",
          score: 85,
          maxScore: 100,
          dueDate: "2025-03-27",
          submittedDate: "2025-03-26",
          feedback: "Good effort! Your component architecture is solid, but consider refactoring for better reusability.",
          rubric: [
            { criterion: "Architecture", earned: 28, max: 35 },
            { criterion: "Reusability", earned: 35, max: 40 },
            { criterion: "Testing", earned: 22, max: 25 },
          ],
        },
      ],
    },
    {
      id: 2,
      course: "Web Development Fundamentals",
      instructor: "John Smith",
      currentGrade: 88,
      trend: "stable",
      assignments: [
        {
          id: 3,
          title: "Responsive Website Design",
          score: 88,
          maxScore: 100,
          dueDate: "2025-03-22",
          submittedDate: "2025-03-21",
          feedback: "Well done! Your responsive design looks great on all devices. Consider adding more interactive elements.",
          rubric: [
            { criterion: "Design", earned: 30, max: 35 },
            { criterion: "Responsiveness", earned: 40, max: 40 },
            { criterion: "Functionality", earned: 18, max: 25 },
          ],
        },
      ],
    },
  ];

  const overallGPA = Math.round(
    courseGrades.reduce((sum, c) => sum + c.currentGrade, 0) / courseGrades.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Award size={36} />
            <h1 className="text-4xl font-bold">My Grades</h1>
          </div>
          <p className="text-green-100">View your assignment scores and feedback</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { label: "Overall GPA", value: overallGPA + "%", icon: TrendingUp, color: "green" },
            { label: "Courses", value: courseGrades.length, icon: BookOpen, color: "blue" },
            { label: "Assignments", value: courseGrades.reduce((sum, c) => sum + c.assignments.length, 0), icon: Award, color: "purple" },
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

        {/* Course Grades */}
        <div className="space-y-6">
          {courseGrades.map((course, courseIdx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: courseIdx * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Course Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => setExpandedGrade(expandedGrade === course.id ? null : course.id)}>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{course.course}</h2>
                  <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{course.currentGrade}%</p>
                    <p className="text-xs text-gray-600">Current Grade</p>
                  </div>

                  <ChevronDown
                    size={24}
                    className={`text-gray-600 transition-transform ${expandedGrade === course.id ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              {/* Assignments List */}
              {expandedGrade === course.id && (
                <div className="divide-y divide-gray-200">
                  {course.assignments.map((assignment, assignIdx) => (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: assignIdx * 0.05 }}
                      className="p-6"
                    >
                      {/* Assignment Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">{assignment.score}</p>
                              <p className="text-xs text-gray-600">/ {assignment.maxScore}</p>
                            </div>
                            <div className="w-16 h-16 rounded-full border-4 border-green-200 flex items-center justify-center bg-green-50">
                              <span className="text-sm font-bold text-green-700">
                                {Math.round((assignment.score / assignment.maxScore) * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Due: {assignment.dueDate}</span>
                          <span>Submitted: {assignment.submittedDate}</span>
                        </div>
                      </div>

                      {/* Rubric Breakdown */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Grade Breakdown</p>
                        <div className="space-y-2">
                          {assignment.rubric.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700">{item.criterion}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-green-600"
                                    style={{ width: `${(item.earned / item.max) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="font-semibold text-gray-900 w-12 text-right">
                                  {item.earned}/{item.max}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Feedback */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-blue-900 mb-2">Instructor Feedback</p>
                        <p className="text-sm text-blue-800">{assignment.feedback}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6"
        >
          <p className="text-green-900 mb-2 font-semibold">📊 Understanding Your Grades</p>
          <p className="text-sm text-green-800">
            Grades are based on detailed rubrics that evaluate different aspects of your work. Review the breakdown and feedback to understand where to improve. If you have questions about your grade, don't hesitate to reach out to your instructor.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function MyGrades() {
  return (
    <ProtectedRoute>
      <MyGradesContent />
    </ProtectedRoute>
  );
}
