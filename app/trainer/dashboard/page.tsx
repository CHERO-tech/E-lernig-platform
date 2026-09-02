"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { LogOut } from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            Forge
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                {user?.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">👨‍🏫</div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Trainer Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            Welcome to your trainer portal! This is your personal workspace. More features coming soon.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <p className="text-3xl font-bold text-emerald-600 mb-2">0</p>
              <p className="text-slate-600 dark:text-slate-400">Active Items</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <p className="text-3xl font-bold text-emerald-600 mb-2">0</p>
              <p className="text-slate-600 dark:text-slate-400">Completed</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <p className="text-3xl font-bold text-emerald-600 mb-2">0%</p>
              <p className="text-slate-600 dark:text-slate-400">Progress</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
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
