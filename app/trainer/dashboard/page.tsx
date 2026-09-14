"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import { useCourses } from "@/lib/courses/useCourses";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import Link from "next/link";
import { LogOut, BookOpen, Users, BarChart3, Settings, Plus, MoreHorizontal, File, Video, MessageSquare, TrendingUp } from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { courses } = useCourses();
  const { enrollments } = useEnrollment();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const trainerCourses = courses.filter(c => c.instructorId === user?.id);
  const totalStudents = trainerCourses.reduce((sum, c) => sum + c.students, 0);
  const activeCourses = trainerCourses.length;
  const avgRating = trainerCourses.length > 0
    ? (trainerCourses.reduce((sum, c) => sum + c.rating, 0) / trainerCourses.length).toFixed(1)
    : "0";
  const courseRevenue = trainerCourses.reduce((sum, c) => sum + (c.price * c.students), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto fixed h-screen">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-ember-strong to-ember bg-clip-text text-transparent">Forge</span>
          <svg className="w-5 h-5 text-ember-strong" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </Link>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong"
          />
        </div>

        {/* Trainer Section */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Trainer</p>
          <nav className="space-y-2">
            <Link href="/trainer/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-forge-soft text-ember-strong font-medium">
              <BookOpen size={18} />
              <span>My Dashboard</span>
            </Link>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 cursor-not-allowed opacity-60" title="No route available">
              <Users size={18} />
              <span>My Students</span>
            </div>
            <Link href="/trainer/analytics" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <BarChart3 size={18} />
              <span>Analytics</span>
            </Link>
            <Link href="/messages" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <MessageSquare size={18} />
              <span>Messages</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">My Courses</p>
          <nav className="space-y-1 text-sm">
            {courses.filter(c => c.instructorId === user?.id).map(course => (
              <Link key={course.id} href={`/courses/${course.id}`} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <p className="font-medium">{course.title}</p>
                <p className="text-xs text-gray-600 mt-1">Active • {course.students} students</p>
              </Link>
            ))}
          </nav>
        </div>

        {/* Create Course */}
        <Link href="/trainer/create-course" className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-ember-strong hover:bg-ember text-white rounded-lg font-medium transition-colors">
          <Plus size={18} />
          <span className="text-sm">Create Course</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0]}.</h1>
              <p className="text-gray-600">You're doing great! Here's your teaching overview.</p>
            </div>
            <button onClick={handleLogout} className="p-3 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600">
              <LogOut size={24} />
            </button>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            {[
              { label: "Total Students", value: totalStudents.toString(), icon: Users, color: "bg-blue-100 text-blue-600" },
              { label: "Active Courses", value: activeCourses.toString(), icon: BookOpen, color: "bg-forge-soft text-ember-strong" },
              { label: "Avg. Rating", value: avgRating, icon: TrendingUp, color: "bg-yellow-100 text-yellow-600" },
              { label: "Course Revenue", value: `$${(courseRevenue / 1000).toFixed(1)}k`, icon: BarChart3, color: "bg-purple-100 text-purple-600" },
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* My Courses Section */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainerCourses.map((course, i) => {
                const bgGradients = [
                  "from-orange-400 via-yellow-400 to-amber-500",
                  "from-blue-400 via-purple-400 to-indigo-500",
                  "from-brass via-teal-400 to-cyan-500",
                  "from-red-400 via-pink-400 to-rose-500",
                  "from-ember-strong via-lime-400 to-yellow-500",
                ];
                const bgGradient = bgGradients[i % bgGradients.length];
                return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Photo Background */}
                  <div className={`h-40 bg-gradient-to-br ${bgGradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="15" fill="white"/>
                        <circle cx="80" cy="30" r="20" fill="white"/>
                        <rect x="60" y="60" width="30" height="30" fill="white"/>
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1 text-lg">{course.title}</h3>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-600">{course.students} Students</span>
                      <span className="font-semibold text-yellow-500">⭐ {course.rating.toFixed(1)}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/courses/${course.id}`} className="flex-1 px-3 py-2 bg-forge-soft text-ember-strong font-medium rounded-lg hover:bg-forge-soft transition-colors text-sm text-center">
                        View
                      </Link>
                      <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
              })}
            </div>
          </div>

          {/* Course Performance */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Performance</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {trainerCourses.map((course, i) => {
                const bgGradients = [
                  "from-orange-400 via-yellow-400 to-amber-500",
                  "from-blue-400 via-purple-400 to-indigo-500",
                  "from-brass via-teal-400 to-cyan-500",
                  "from-red-400 via-pink-400 to-rose-500",
                  "from-ember-strong via-lime-400 to-yellow-500",
                ];
                const bgGradient = bgGradients[i % bgGradients.length];
                const courseEnrollments = enrollments.filter(e => e.courseId === course.id);
                const completedCount = courseEnrollments.filter(e => {
                  const progress = e.lessonProgress.filter(lp => lp.completed).length;
                  const total = e.lessonProgress.length;
                  return total > 0 && progress === total;
                }).length;
                const completionPercent = courseEnrollments.length > 0 ? Math.round((completedCount / courseEnrollments.length) * 100) : 0;
                return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className={`h-24 bg-gradient-to-br ${bgGradient} rounded-lg mb-4`}></div>
                  <h3 className="font-bold text-gray-900 mb-3">{course.title}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Enrolled Students</span>
                      <span className="font-semibold text-gray-900">{course.students}</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Avg. Completion</span>
                        <span className="font-semibold text-ember-strong">{completionPercent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-ember-strong h-2 rounded-full" style={{ width: `${completionPercent}%` }}></div>
                      </div>
                    </div>
                    <p className="text-xs text-ember-strong font-medium">↑ Trending</p>
                  </div>
                </motion.div>
              );
              })}
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { type: "New Student", desc: "Sarah joined Web Development course", time: "2 hours ago" },
                  { type: "Course Rating", desc: "UI/UX Design received a 5-star review", time: "4 hours ago" },
                  { type: "Assignment Submitted", desc: "15 students submitted the latest assignment", time: "6 hours ago" },
                ].map((activity, i) => (
                  <div key={i} className="pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-forge-soft flex items-center justify-center text-ember-strong flex-shrink-0">
                        <BookOpen size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{activity.type}</p>
                        <p className="text-sm text-gray-600 mt-1">{activity.desc}</p>
                        <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/trainer/create-course" className="flex w-full px-4 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors items-center gap-2">
                  <Plus size={18} />
                  Create Course
                </Link>
                <Link href="/messages" className="flex w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors items-center gap-2">
                  <MessageSquare size={18} />
                  View Messages
                </Link>
                <Link href="/trainer/analytics" className="flex w-full px-4 py-3 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors items-center gap-2">
                  <BarChart3 size={18} />
                  View Analytics
                </Link>
                <button onClick={handleLogout} className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors text-center">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function TrainerDashboard() {
  return (
    <ProtectedRoute requiredRole="trainer">
      <DashboardContent />
    </ProtectedRoute>
  );
}
