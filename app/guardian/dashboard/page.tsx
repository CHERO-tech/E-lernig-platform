"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { LogOut, Users, BookOpen, TrendingUp, Settings, MoreHorizontal, Award, Clock, AlertCircle, CheckCircle2, BarChart3 } from "lucide-react";

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
              <BarChart3 size={18} />
              <span>Analytics</span>
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
          <p className="text-sm text-blue-600 mt-2">Monitoring 2 wards</p>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name?.split(" ")[0]}.</h1>
              <p className="text-gray-600">Monitor your wards' learning progress and performance.</p>
            </div>
            <button onClick={handleLogout} className="p-3 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600">
              <LogOut size={24} />
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Wards", value: "2", icon: Users, color: "bg-blue-100 text-blue-600" },
              { label: "Avg Progress", value: "67.5%", icon: TrendingUp, color: "bg-green-100 text-green-600" },
              { label: "Courses Active", value: "5", icon: BookOpen, color: "bg-purple-100 text-purple-600" },
              { label: "Achievements", value: "12", icon: Award, color: "bg-yellow-100 text-yellow-600" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-white rounded-lg border border-gray-200 p-6">
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

          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Wards</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  name: "Alex Johnson",
                  age: "16",
                  courses: "3",
                  progress: "75",
                  status: "On Track",
                  lastActive: "Today, 2:30 PM",
                  assignments: "2/2",
                  bgGradient: "from-blue-400 via-purple-400 to-indigo-500"
                },
                {
                  name: "Jordan Smith",
                  age: "15",
                  courses: "2",
                  progress: "60",
                  status: "Needs Support",
                  lastActive: "Yesterday",
                  assignments: "1/3",
                  bgGradient: "from-emerald-400 via-teal-400 to-cyan-500"
                },
              ].map((ward, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-32 bg-gradient-to-br ${ward.bgGradient}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{ward.name}</h3>
                        <p className="text-sm text-gray-600">Age {ward.age}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Overall Progress</span>
                          <span className="font-semibold text-gray-900">{ward.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${ward.progress}%` }}></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3">
                        <div>
                          <p className="text-xs text-gray-600">Active Courses</p>
                          <p className="text-lg font-bold text-gray-900">{ward.courses}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Assignments</p>
                          <p className="text-lg font-bold text-gray-900">{ward.assignments}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <p className={`text-sm font-medium flex items-center gap-2 ${ward.status === "On Track" ? "text-green-600" : "text-orange-600"}`}>
                          {ward.status === "On Track" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                          {ward.status}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Last active: {ward.lastActive}</p>
                      </div>
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
                  { type: "✓ Course Completed", ward: "Alex", desc: "Completed Web Development Fundamentals", time: "Today" },
                  { type: "📝 Assignment", ward: "Jordan", desc: "Submitted UI Design Project", time: "Yesterday" },
                  { type: "⭐ Achievement", ward: "Alex", desc: "Earned 7-day Learning Streak badge", time: "2 days ago" },
                  { type: "📊 Assessment", ward: "Jordan", desc: "Scored 88% on JavaScript Quiz", time: "3 days ago" },
                ].map((activity, i) => (
                  <div key={i} className="pb-4 border-b border-gray-200 last:border-0">
                    <p className="font-semibold text-gray-900">{activity.type} - {activity.ward}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.desc}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Overall Progress</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">67.5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Achievements</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Courses Completed</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-900 font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle size={18} /> Action Needed
                </p>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Jordan hasn't logged in for 24 hours</li>
                  <li>• 1 assignment pending from Alex</li>
                </ul>
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
