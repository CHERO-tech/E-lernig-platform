"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { BookOpen, Play, Download, Share2, Star } from "lucide-react";
import { useState } from "react";

function MyEnrollmentsContent() {
  const router = useRouter();
  const [filterTab, setFilterTab] = useState<"all" | "in-progress" | "completed">("all");

  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Chen",
      progress: 65,
      status: "in-progress",
      image: "bg-gradient-to-br from-blue-400 to-purple-500",
      lessons: 42,
      completed: 27,
      enrolled: "Jan 15, 2025",
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Alex Kumar",
      progress: 100,
      status: "completed",
      image: "bg-gradient-to-br from-orange-400 to-red-500",
      lessons: 38,
      completed: 38,
      enrolled: "Nov 20, 2024",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Mike Johnson",
      progress: 40,
      status: "in-progress",
      image: "bg-gradient-to-br from-pink-400 to-rose-500",
      lessons: 35,
      completed: 14,
      enrolled: "Feb 1, 2025",
    },
    {
      id: 4,
      title: "Web Development Fundamentals",
      instructor: "John Smith",
      progress: 0,
      status: "in-progress",
      image: "bg-gradient-to-br from-green-400 to-teal-500",
      lessons: 50,
      completed: 0,
      enrolled: "Mar 1, 2025",
    },
  ];

  const filtered = enrolledCourses.filter(course => {
    if (filterTab === "all") return true;
    return course.status === filterTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={36} />
            <h1 className="text-4xl font-bold">My Courses</h1>
          </div>
          <p className="text-green-100">{enrolledCourses.length} courses enrolled</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-8 border-b border-gray-200"
        >
          {["all", "in-progress", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab as "all" | "in-progress" | "completed")}
              className={`px-6 py-4 font-medium transition-colors capitalize ${
                filterTab === tab
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "in-progress" ? "In Progress" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 text-sm">
                ({enrolledCourses.filter(c => tab === "all" ? true : c.status === tab).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Course Image */}
              <div className={`h-40 ${course.image} relative`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity">
                  <button className="p-3 bg-white rounded-full hover:bg-green-100">
                    <Play size={24} className="text-green-600" />
                  </button>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">
                      {course.completed}/{course.lessons} lessons completed
                    </p>
                    <p className="text-sm font-semibold text-green-600">{course.progress}%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
                  <span>Enrolled: {course.enrolled}</span>
                  {course.status === "completed" && <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-medium">Completed</span>}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => router.push(`/courses/${course.id}/learn`)}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium text-sm hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Play size={16} /> {course.progress === 0 ? "Start" : "Continue"}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 flex items-center justify-center gap-1">
                    <Download size={16} />
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 flex items-center justify-center gap-1">
                    <Share2 size={16} />
                  </button>
                </div>

                {/* Rating for completed courses */}
                {course.status === "completed" && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Leave a review</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} className="p-1 hover:scale-110 transition-transform">
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-12 text-center"
          >
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No courses yet</h2>
            <p className="text-gray-600 mb-6">Start learning by enrolling in a course today!</p>
            <button
              onClick={() => router.push("/courses")}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Browse Courses
            </button>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <p className="text-blue-900 mb-2 font-semibold">💡 Tips for Success</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Set a consistent learning schedule to stay on track</li>
            <li>• Download course materials for offline access</li>
            <li>• Share your progress with friends to stay motivated</li>
            <li>• Complete all lessons to earn your certificate</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function MyEnrollments() {
  return (
    <ProtectedRoute>
      <MyEnrollmentsContent />
    </ProtectedRoute>
  );
}
