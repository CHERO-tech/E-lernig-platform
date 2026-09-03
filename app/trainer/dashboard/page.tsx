"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { LogOut, BookOpen, Users, BarChart3, Settings, Plus, MoreHorizontal, File, Video, MessageSquare, TrendingUp } from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto fixed h-screen">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Forge</span>
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </Link>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Trainer Section */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Trainer</p>
          <nav className="space-y-2">
            <Link href="/trainer/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-50 text-green-600 font-medium">
              <BookOpen size={18} />
              <span>My Dashboard</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Users size={18} />
              <span>My Students</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <BarChart3 size={18} />
              <span>Analytics</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <MessageSquare size={18} />
              <span>Messages</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">My Courses</p>
          <nav className="space-y-1 text-sm">
            <div className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <p className="font-medium">Web Development</p>
              <p className="text-xs text-gray-600 mt-1">Active • 45 students</p>
            </div>
          </nav>
        </div>

        {/* Create Course */}
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} />
          <span className="text-sm">Create Course</span>
        </button>
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
              { label: "Total Students", value: "245", icon: Users, color: "bg-blue-100 text-blue-600" },
              { label: "Active Courses", value: "3", icon: BookOpen, color: "bg-green-100 text-green-600" },
              { label: "Avg. Rating", value: "4.8", icon: TrendingUp, color: "bg-yellow-100 text-yellow-600" },
              { label: "Course Revenue", value: "$2.4k", icon: BarChart3, color: "bg-purple-100 text-purple-600" },
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
              {[
                { 
                  title: "Web Development", 
                  students: "45",
                  rating: "4.8",
                  bgGradient: "from-orange-400 via-yellow-400 to-amber-500"
                },
                { 
                  title: "UI/UX Design", 
                  students: "32",
                  rating: "4.9",
                  bgGradient: "from-blue-400 via-purple-400 to-indigo-500"
                },
                { 
                  title: "Mobile Development", 
                  students: "28",
                  rating: "4.7",
                  bgGradient: "from-emerald-400 via-teal-400 to-cyan-500"
                },
              ].map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Photo Background */}
                  <div className={`h-40 bg-gradient-to-br ${course.bgGradient} relative overflow-hidden`}>
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
                      <span className="font-semibold text-yellow-500">⭐ {course.rating}</span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-green-50 text-green-600 font-medium rounded-lg hover:bg-green-100 transition-colors text-sm">
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Course Performance */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Performance</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { title: "Web Development", students: "45", completion: "76%", trend: "↑ 8%", bgGradient: "from-orange-400 via-yellow-400 to-amber-500" },
                { title: "UI/UX Design", students: "32", completion: "88%", trend: "↑ 12%", bgGradient: "from-blue-400 via-purple-400 to-indigo-500" },
                { title: "Mobile Development", students: "28", completion: "65%", trend: "↑ 5%", bgGradient: "from-emerald-400 via-teal-400 to-cyan-500" },
              ].map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className={`h-24 bg-gradient-to-br ${course.bgGradient} rounded-lg mb-4`}></div>
                  <h3 className="font-bold text-gray-900 mb-3">{course.title}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Enrolled Students</span>
                      <span className="font-semibold text-gray-900">{course.students}</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Avg. Completion</span>
                        <span className="font-semibold text-green-600">{course.completion}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: course.completion }}></div>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 font-medium">{course.trend}</p>
                  </div>
                </motion.div>
              ))}
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
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
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
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-left flex items-center gap-2">
                  <Plus size={18} />
                  Create Course
                </button>
                <button className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors text-left flex items-center gap-2">
                  <MessageSquare size={18} />
                  View Messages
                </button>
                <button className="w-full px-4 py-3 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors text-left flex items-center gap-2">
                  <BarChart3 size={18} />
                  View Analytics
                </button>
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
