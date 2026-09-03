"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { LogOut, Book, Award, Clock, Settings } from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Forge
            </span>
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </Link>

          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Settings">
              <Settings size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center text-white font-semibold">
                {getInitials(user?.name || "User")}
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600 capitalize">Student</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
          <p className="text-gray-600">Here's what you need to know today</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
                <Book size={20} />
              </div>
              <p className="text-gray-600 text-sm font-medium">Active Courses</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-600 mt-2">Get started with a course</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Award size={20} />
              </div>
              <p className="text-gray-600 text-sm font-medium">Certificates</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-600 mt-2">Certificates earned</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <Clock size={20} />
              </div>
              <p className="text-gray-600 text-sm font-medium">Learning Time</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">0h</p>
            <p className="text-xs text-gray-600 mt-2">Hours this week</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
                <span className="text-lg">⭐</span>
              </div>
              <p className="text-gray-600 text-sm font-medium">Overall Score</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">—</p>
            <p className="text-xs text-gray-600 mt-2">No courses started yet</p>
          </div>
        </motion.div>

        {/* Main Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Recommended Courses */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended for You</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-semibold">
                    {String.fromCharCode(64 + item)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">Course {item}: Coming Soon</p>
                    <p className="text-sm text-gray-600">Enroll to get started</p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm whitespace-nowrap">
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h2>
            <div className="space-y-3">
              <Link
                href="/"
                className="block px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-900 font-medium transition-colors text-center"
              >
                Back to Home
              </Link>
              <Link
                href="/learning-paths"
                className="block px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-600 font-medium transition-colors text-center"
              >
                Explore Paths
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 font-medium transition-colors text-center"
              >
                Logout
              </button>
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
