"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { LogOut, Users, BookOpen, TrendingUp, Settings, MoreHorizontal, Award, Clock, AlertCircle } from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto fixed h-screen">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Forge</span>
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </Link>

        <div className="mb-8">
          <input type="text" placeholder="Search" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Guardian</p>
          <nav className="space-y-2">
            <Link href="/guardian/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-50 text-green-600 font-medium">
              <Users size={18} />
              <span>Dashboard</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <BookOpen size={18} />
              <span>My Wards</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <TrendingUp size={18} />
              <span>Progress</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <AlertCircle size={18} />
              <span>Alerts</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xs font-semibold text-blue-700 uppercase">Your Wards</p>
          <p className="text-sm text-blue-600 mt-2">You're monitoring 2 wards</p>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name?.split(" ")[0]}.</h1>
              <p className="text-gray-600">Monitor your wards' learning progress.</p>
            </div>
            <button onClick={handleLogout} className="p-3 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600">
              <LogOut size={24} />
            </button>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Wards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Alex", courses: "3", progress: "75%", status: "On Track", bgGradient: "from-blue-400 via-purple-400 to-indigo-500" },
                { name: "Jordan", courses: "2", progress: "60%", status: "Needs Support", bgGradient: "from-emerald-400 via-teal-400 to-cyan-500" },
              ].map((ward, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-32 bg-gradient-to-br ${ward.bgGradient}`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 text-lg">{ward.name}</h3>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{ward.courses} Active Courses</span>
                        <span className="font-semibold">{ward.progress}</span>
                      </div>
                      <p className={`text-sm font-medium ${ward.status === "On Track" ? "text-green-600" : "text-orange-600"}`}>{ward.status}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { type: "Course Completed", ward: "Alex", desc: "Completed Web Development basics", time: "Today" },
                  { type: "Assignment", ward: "Jordan", desc: "Submitted design project", time: "Yesterday" },
                  { type: "Achievement", ward: "Alex", desc: "Earned 4.8★ rating", time: "2 days ago" },
                ].map((activity, i) => (
                  <div key={i} className="pb-4 border-b border-gray-200 last:border-0">
                    <p className="font-semibold text-gray-900">{activity.type} - {activity.ward}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.desc}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Avg Progress</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">67.5%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Achievements</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
                </div>
                <button onClick={handleLogout} className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors text-center mt-6">
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

export default function GuardianDashboard() {
  return (
    <ProtectedRoute requiredRole="guardian">
      <DashboardContent />
    </ProtectedRoute>
  );
}
