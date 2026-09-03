"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { LogOut, BookOpen, BarChart3, FileText, Settings, Plus, ChevronLeft, ChevronRight, Play, MoreHorizontal } from "lucide-react";
import { useState } from "react";

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

        {/* General Section */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">General</p>
          <nav className="space-y-2">
            <Link href="/student/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-50 text-green-600 font-medium">
              <BookOpen size={18} />
              <span>Dashboard</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <BarChart3 size={18} />
              <span>My Progress</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <FileText size={18} />
              <span>Assessment</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Learning Assets */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Learning Assets</p>
          <nav className="space-y-1 text-sm">
            <Link href="#" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Module</Link>
            <Link href="#" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Community</Link>
          </nav>
        </div>

        {/* Active Courses */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Active Courses</p>
          <nav className="space-y-1 text-sm">
            <div className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <p className="font-medium">UI/UX Design</p>
              <p className="text-xs text-gray-600 mt-1">Advanced Design</p>
            </div>
          </nav>
        </div>

        {/* Add New */}
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors">
          <Plus size={18} />
          <span className="text-sm font-medium">Add New</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0]}.</h1>
              <p className="text-gray-600">You have 2 assignments due this week. Keep up the good work!</p>
            </div>
            <button onClick={handleLogout} className="p-3 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600">
              <LogOut size={24} />
            </button>
          </div>

          {/* Active Courses */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Active Course</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🎨", title: "UI Design", desc: "Advanced Design Principles", progress: 75 },
                { icon: "⚛️", title: "React is for Beginners", desc: "Learn the basics of React", progress: 75 },
                { icon: "📱", title: "Digital Marketing", desc: "Understand SEO and Analytics", progress: 0 },
              ].map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{course.icon}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.desc}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Schedule */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Schedule</h2>
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-xs font-semibold text-purple-700 uppercase">UI DESIGN</p>
                  <p className="font-medium text-gray-900 mt-1">3D Animation Spline Workshop</p>
                  <p className="text-xs text-gray-600 mt-1">Today, 02:00 PM - 04:00 PM</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-xs font-semibold text-green-700 uppercase">DEVELOPMENT</p>
                  <p className="font-medium text-gray-900 mt-1">Accessibility with Tools Framer</p>
                  <p className="text-xs text-gray-600 mt-1">Tomorrow, 01:00 PM - 03:00 PM</p>
                </div>
              </div>
            </div>

            {/* Recently Accessed */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recently Accessed</h2>
              <div className="space-y-1">
                {[
                  { icon: "📄", title: "Typography Cheatsheet.pdf", desc: "Advanced Design Principles" },
                  { icon: "▶️", title: "Introduction to Hooks", desc: "React is for Beginners" },
                  { icon: "📋", title: "SEO Fundamentals Quiz", desc: "Digital Marketing 101" },
                  { icon: "📝", title: "Project Guidelines", desc: "Advanced Design Principles" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <ProtectedRoute requiredRole="student">
      <DashboardContent />
    </ProtectedRoute>
  );
}
