"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Zap, Award } from "lucide-react";
import { useState } from "react";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { useCourses } from "@/lib/courses/useCourses";
import { calculateCourseProgress } from "@/lib/enrollment/calculateProgress";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { copyShareLink } from "@/lib/utils/share";

function MyLearningContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { enrollments } = useEnrollment();
  const { getCourseById } = useCourses();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState("in-progress");

  const handleShareAchievements = async () => {
    const copied = await copyShareLink();
    addNotification({
      type: "system",
      icon: "🔗",
      title: copied ? "Link Copied" : "Copy Failed",
      message: copied
        ? "Your achievements link has been copied to the clipboard."
        : "Could not copy the link. Please copy it from your browser's address bar.",
    });
  };

  const inProgressCourses = enrollments
    .map(enrollment => {
      const course = getCourseById(enrollment.courseId);
      if (!course) return null;
      const progress = calculateCourseProgress(enrollment, course);
      if (progress.percentComplete === 100) return null;
      return {
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        progress: progress.percentComplete,
        currentLesson: `${progress.lessonsCompleted}/${progress.lessonsTotal} lessons`,
        daysLeft: 12,
        nextLesson: "Continue learning",
        bgGradient: "from-blue-400 via-purple-400 to-indigo-500",
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  const completedCourses = enrollments
    .map(enrollment => {
      const course = getCourseById(enrollment.courseId);
      if (!course) return null;
      const progress = calculateCourseProgress(enrollment, course);
      if (progress.percentComplete !== 100) return null;
      return {
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        completedDate: new Date(enrollment.enrolledAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        rating: course.rating,
        certificate: true,
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  const achievements = [
    { emoji: "🎓", title: "First Course", desc: "Completed your first course" },
    { emoji: "🔥", title: "7 Day Streak", desc: "Learned for 7 consecutive days" },
    { emoji: "⭐", title: "5 Star Learner", desc: "Rated a course 5 stars" },
    { emoji: "🏆", title: "Certificate Master", desc: "Earned 5 certificates" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Go back">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Learning Journey</h1>
            <p className="text-gray-600">Track your progress and continue learning</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: BookOpen, label: "In Progress", value: inProgressCourses.length.toString(), color: "bg-blue-100 text-blue-600" },
            { icon: CheckCircle2, label: "Completed", value: completedCourses.length.toString(), color: "bg-forge-soft text-ember-strong" },
            { icon: Clock, label: "Learning Hours", value: "48h", color: "bg-purple-100 text-purple-600" },
            { icon: Award, label: "Certificates", value: completedCourses.length.toString(), color: "bg-yellow-100 text-yellow-600" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {[
            { id: "in-progress", label: "In Progress" },
            { id: "completed", label: "Completed" },
            { id: "achievements", label: "Achievements" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-4 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-ember-strong text-ember-strong"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* In Progress Tab */}
        {activeTab === "in-progress" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
            {inProgressCourses.length > 0 ? (
              inProgressCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className={`h-32 bg-gradient-to-br ${course.bgGradient}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-gray-600">by {course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-ember-strong">{course.progress}%</p>
                        <p className="text-xs text-gray-500">{course.daysLeft} days left</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-ember-strong h-2 rounded-full transition-all" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">Current Lesson:</span> {course.currentLesson}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/courses/${course.id}/learn`)}
                        className="flex-1 px-4 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors"
                      >
                        Continue Learning
                      </button>
                      <button
                        onClick={() => router.push(`/courses/${course.id}`)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg mb-4">No courses in progress</p>
                <Link href="/courses" className="text-ember-strong hover:text-ember2 font-medium">
                  Browse Courses
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Completed Tab */}
        {activeTab === "completed" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-4">
            {completedCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Completed: {course.completedDate}</span>
                      <div className="flex items-center gap-1">
                        <span>⭐ {course.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {course.certificate && (
                      <div className="flex items-center gap-2 text-ember-strong font-medium mb-3">
                        <Award size={18} /> Certificate
                      </div>
                    )}
                    <button
                      onClick={() => router.push(`/courses/${course.id}`)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="p-6 bg-white rounded-lg border border-gray-200 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-3">{achievement.emoji}</div>
                  <p className="font-semibold text-gray-900 mb-1">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-12 p-8 bg-gradient-to-r from-forge-soft to-blue-50 rounded-lg border border-brass-soft"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Keep Learning, Earn More!</h3>
              <p className="text-gray-600 mb-6">Complete more courses and unlock new achievements. Share your progress with your network.</p>
              <div className="flex gap-4">
                <Link href="/courses" className="px-6 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors">
                  Browse More Courses
                </Link>
                <button
                  onClick={handleShareAchievements}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-white transition-colors"
                >
                  Share Achievements
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function MyLearning() {
  return (
    <ProtectedRoute>
      <MyLearningContent />
    </ProtectedRoute>
  );
}
