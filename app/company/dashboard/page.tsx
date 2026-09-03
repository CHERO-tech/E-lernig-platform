"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { LogOut, Briefcase, Users, Star, Settings, Plus, MoreHorizontal, TrendingUp, Target } from "lucide-react";

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
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Recruitment</p>
          <nav className="space-y-2">
            <Link href="/company/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-50 text-green-600 font-medium">
              <Briefcase size={18} />
              <span>Dashboard</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Users size={18} />
              <span>Candidates</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Target size={18} />
              <span>Opportunities</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <TrendingUp size={18} />
              <span>Analytics</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} />
          <span className="text-sm">Post Opportunity</span>
        </button>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0]}.</h1>
              <p className="text-gray-600">Find and hire top talent from our community.</p>
            </div>
            <button onClick={handleLogout} className="p-3 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600">
              <LogOut size={24} />
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Active Opportunities", value: "12", icon: Briefcase, color: "bg-blue-100 text-blue-600" },
              { label: "Total Applications", value: "342", icon: Users, color: "bg-green-100 text-green-600" },
              { label: "Avg Rating", value: "4.7★", icon: Star, color: "bg-yellow-100 text-yellow-600" },
              { label: "Hired Candidates", value: "28", icon: TrendingUp, color: "bg-purple-100 text-purple-600" },
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
            <h2 className="text-xl font-bold text-gray-900 mb-6">Open Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Senior React Developer", applicants: "45", views: "890", status: "Active", level: "Senior", daysPosted: "5d", bgGradient: "from-blue-400 via-purple-400 to-indigo-500" },
                { title: "Product Designer", applicants: "32", views: "650", status: "Active", level: "Mid-level", daysPosted: "3d", bgGradient: "from-orange-400 via-red-400 to-pink-500" },
                { title: "Data Scientist", applicants: "28", views: "520", status: "Active", level: "Senior", daysPosted: "7d", bgGradient: "from-emerald-400 via-teal-400 to-cyan-500" },
              ].map((opp, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-32 bg-gradient-to-br ${opp.bgGradient}`}></div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">{opp.title}</h3>
                    <div className="flex gap-2 mb-4">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{opp.level}</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{opp.daysPosted}</span>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Applicants</span>
                        <span className="font-semibold text-gray-900">{opp.applicants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Views</span>
                        <span className="font-semibold text-gray-900">{opp.views}</span>
                      </div>
                    </div>
                    <button className="w-full px-3 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm">
                      Review Candidates
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Application Pipeline</h2>
              <div className="space-y-4">
                {[
                  { candidate: "Alex Johnson", role: "Senior React Developer", status: "Interview Scheduled", skills: "React, Node.js, TypeScript", rating: 4.9, time: "2 hours ago" },
                  { candidate: "Sarah Chen", role: "Product Designer", status: "Under Review", skills: "Figma, UX Research", rating: 4.7, time: "5 hours ago" },
                  { candidate: "Mike Davis", role: "Data Scientist", status: "Phone Screen", skills: "Python, ML, SQL", rating: 4.8, time: "1 day ago" },
                  { candidate: "Emma Wilson", role: "Senior React Developer", status: "New", skills: "React, JavaScript", rating: 4.6, time: "2 days ago" },
                ].map((app, i) => (
                  <div key={i} className="pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{app.candidate}</p>
                        <p className="text-sm text-gray-600 mt-1">{app.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold">{app.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 text-xs">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">{app.status}</span>
                        <span className="text-gray-500">{app.skills}</span>
                      </div>
                      <p className="text-xs text-gray-500">{app.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Hiring Summary</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">To Interview</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Under Review</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">28</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Offers Made</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">4</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-left flex items-center gap-2 text-sm">
                    <Plus size={18} />
                    Post Job
                  </button>
                  <button className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors text-left flex items-center gap-2 text-sm">
                    <Users size={18} />
                    Browse Profiles
                  </button>
                  <button onClick={handleLogout} className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors text-center text-sm">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function CompanyDashboard() {
  return (
    <ProtectedRoute requiredRole="company">
      <DashboardContent />
    </ProtectedRoute>
  );
}
