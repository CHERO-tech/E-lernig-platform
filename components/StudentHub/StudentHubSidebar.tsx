"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface StudentHubSidebarProps {
  studentName: string;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊", href: "/student-hub" },
  { id: "courses", label: "Courses", icon: "📚", href: "/student-hub/courses" },
  { id: "labs", label: "Lab Sessions", icon: "🔬", href: "/student-hub/labs" },
  { id: "achievements", label: "Achievements", icon: "🏆", href: "/student-hub/achievements" },
  { id: "community", label: "Community", icon: "👥", href: "/student-hub/community" },
  { id: "settings", label: "Settings", icon: "⚙️", href: "/student-hub/settings" },
];

export default function StudentHubSidebar({ studentName }: StudentHubSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed lg:static lg:translate-x-0 top-0 left-0 h-screen
          w-[280px] bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900
          border-r border-slate-700 p-6 z-40
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="mb-8">
          <Link href="/student-hub" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              🚀
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SkillHub</h1>
              <p className="text-xs text-slate-400">Learning Platform</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700 hover:bg-opacity-50 text-slate-300 hover:text-white"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-slate-700 pt-4">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-bold">
              {studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{studentName}</p>
              <p className="text-xs text-slate-400">Active Learner</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
