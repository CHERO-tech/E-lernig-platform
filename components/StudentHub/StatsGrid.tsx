"use client";

import React from "react";
import { motion } from "framer-motion";
import { StudentStats } from "@/lib/studentHubData";

interface StatsGridProps {
  stats: StudentStats;
}

const statItems = [
  { label: "Skills Gained", key: "skillsGained", icon: "⭐" },
  { label: "Hours Learned", key: "hoursLearned", icon: "⏱️" },
  { label: "Labs Completed", key: "labsCompleted", icon: "🔬" },
  { label: "Day Streak", key: "streakDays", icon: "🔥" },
];

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.key}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <p className="text-3xl mb-2">{item.icon}</p>
          <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            {stats[item.key as keyof StudentStats]}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
