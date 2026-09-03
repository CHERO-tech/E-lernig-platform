"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { LogOut, Users, TrendingUp, Settings, Plus, MoreHorizontal, BarChart3, Shield, AlertTriangle } from "lucide-react";

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
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Administration</p>
          <nav className="space-y-2">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-50 text-green-600 font-medium">
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Users size={18} />
              <span>Users</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Shield size={18} />
              <span>Security</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <AlertTriangle size={18} />
              <span>Reports</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        <div className="p-3 bg-red-50 rounded-lg">
          <p className="text-xs font-semibold text-red-700 uppercase">Admin Only</p>
          <p className="text-sm text-red-600 mt-2">Full platform control</p>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Manage the entire Forge platform.</p>
            </div>
            <button onClick={handleLogout} className="p-3 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600">
              <LogOut size={24} />
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Users", value: "12,450", icon: Users, color: "bg-blue-100 text-blue-600" },
              { label: "Active Sessions", value: "3,240", icon: TrendingUp, color: "bg-green-100 text-green-600" },
              { label: "Revenue", value: "$85.2k", icon: BarChart3, color: "bg-yellow-100 text-yellow-600" },
              { label: "System Health", value: "99.8%", icon: Shield, color: "bg-purple-100 text-purple-600" },
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Statistics</h2>
              <div className="space-y-4">
                {[
                  { metric: "New User Registrations", value: "245 today", trend: "↑ 12%" },
                  { metric: "Course Enrollments", value: "1,240 this week", trend: "↑ 8%" },
                  { metric: "Certifications Issued", value: "456 this month", trend: "↑ 15%" },
                ].map((stat, i) => (
                  <div key={i} className="pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{stat.metric}</p>
                        <p className="text-sm text-gray-600 mt-1">{stat.value}</p>
                      </div>
                      <p className="text-green-600 font-semibold">{stat.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Actions</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-left flex items-center gap-2">
                  <Users size={18} />
                  Manage Users
                </button>
                <button className="w-full px-4 py-3 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors text-left flex items-center gap-2">
                  <Plus size={18} />
                  Add Content
                </button>
                <button className="w-full px-4 py-3 bg-yellow-50 text-yellow-600 rounded-lg font-medium hover:bg-yellow-100 transition-colors text-left flex items-center gap-2">
                  <AlertTriangle size={18} />
                  View Reports
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

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardContent />
    </ProtectedRoute>
  );
}
