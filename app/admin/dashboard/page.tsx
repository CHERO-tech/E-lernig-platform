"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import { usePeople } from "@/lib/people/usePeople";
import { useCourses } from "@/lib/courses/useCourses";
import Link from "next/link";
import { LogOut, Users, TrendingUp, Settings, Plus, MoreHorizontal, BarChart3, Shield, AlertTriangle } from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { people } = usePeople();
  const { courses } = useCourses();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto fixed h-screen">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-ember-strong to-ember bg-clip-text text-transparent">Forge</span>
          <svg className="w-5 h-5 text-ember-strong" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </Link>

        <div className="mb-8">
          <input type="text" placeholder="Search" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ember-strong" />
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Administration</p>
          <nav className="space-y-2">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-forge-soft text-ember-strong font-medium border-l-4 border-ember-strong">
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-ember-strong transition-all">
              <Users size={20} />
              <span>Users</span>
            </Link>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 cursor-not-allowed" title="No matching route">
              <Shield size={18} />
              <span>Security</span>
            </div>
            <Link href="/admin/moderation" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <AlertTriangle size={18} />
              <span>Reports</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
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
              { label: "Total Users", value: people.length.toString(), icon: Users, color: "bg-blue-100 text-blue-600" },
              { label: "Active Users", value: people.filter(p => p.status === 'active').length.toString(), icon: TrendingUp, color: "bg-forge-soft text-ember-strong" },
              { label: "Revenue", value: `$${(courses.reduce((sum, c) => sum + (c.price * c.students), 0) / 1000).toFixed(1)}k`, icon: BarChart3, color: "bg-yellow-100 text-yellow-600" },
              { label: "Courses", value: courses.length.toString(), icon: Shield, color: "bg-purple-100 text-purple-600" },
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
                  { metric: "New User Registrations", value: "245 today", trend: "↑ 12%", color: "green" },
                  { metric: "Course Enrollments", value: "1,240 this week", trend: "↑ 8%", color: "green" },
                  { metric: "Certifications Issued", value: "456 this month", trend: "↑ 15%", color: "green" },
                  { metric: "Support Tickets", value: "24 pending", trend: "↓ 5%", color: "blue" },
                ].map((stat, i) => (
                  <div key={i} className="pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{stat.metric}</p>
                        <p className="text-sm text-gray-600 mt-1">{stat.value}</p>
                      </div>
                      <p className={`font-semibold ${stat.color === "green" ? "text-ember-strong" : "text-blue-600"}`}>{stat.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">System Status</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">API Response Time</span>
                    <span className="text-sm font-semibold text-gray-900">145ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-ember-strong h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Database Load</span>
                    <span className="text-sm font-semibold text-gray-900">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="text-sm font-semibold text-gray-900">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-ember-strong h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Uptime This Month</p>
                  <p className="text-2xl font-bold text-ember-strong">99.98%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent System Events</h2>
              <div className="space-y-3">
                {[
                  { event: "⚙️ System Update", desc: "Security patches applied to server", time: "2 hours ago", severity: "info" },
                  { event: "🔐 Security Alert", desc: "Multiple failed login attempts detected", time: "4 hours ago", severity: "warning" },
                  { event: "📊 Backup Completed", desc: "Daily database backup completed successfully", time: "6 hours ago", severity: "success" },
                  { event: "⚡ Performance Alert", desc: "API response time exceeded threshold", time: "1 day ago", severity: "warning" },
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${
                    item.severity === "success" ? "bg-forge-soft border-brass-soft" :
                    item.severity === "warning" ? "bg-yellow-50 border-yellow-200" :
                    "bg-blue-50 border-blue-200"
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{item.event}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push('/admin/users')}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-left flex items-center gap-2 text-sm">
                    <Users size={18} />
                    Manage Users
                  </button>
                  <button
                    onClick={() => router.push('/admin/moderation')}
                    className="w-full px-4 py-3 bg-forge-soft text-ember-strong rounded-lg font-medium hover:bg-forge-soft transition-colors text-left flex items-center gap-2 text-sm">
                    <Plus size={18} />
                    View Reports
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors text-left flex items-center gap-2 text-sm cursor-not-allowed opacity-50" title="No matching route" disabled>
                    <Shield size={18} />
                    Security Settings
                  </button>
                  <button
                    onClick={() => router.push('/settings')}
                    className="w-full px-4 py-3 bg-yellow-50 text-yellow-600 rounded-lg font-medium hover:bg-yellow-100 transition-colors text-left flex items-center gap-2 text-sm">
                    <AlertTriangle size={18} />
                    System Settings
                  </button>
                  <button onClick={handleLogout} className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors text-center text-sm">
                    Logout
                  </button>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-900 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} /> Critical Alerts
                </p>
                <ul className="space-y-2 text-sm text-red-800">
                  <li>• No active security issues</li>
                  <li>• All systems operational</li>
                  <li>• Backup status: OK</li>
                </ul>
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
