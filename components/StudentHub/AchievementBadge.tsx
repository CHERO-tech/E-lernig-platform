"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "@/lib/studentHubData";

interface AchievementBadgeProps {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`
          w-full aspect-square rounded-xl flex flex-col items-center justify-center p-3
          border-2 transition-all cursor-pointer
          ${
            achievement.locked
              ? "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50"
              : "bg-white dark:bg-gray-800 border-brass dark:border-ember-strong shadow-sm hover:shadow-md"
          }
        `}
        whileHover={!achievement.locked ? { scale: 1.05, y: -4 } : {}}
        transition={{ duration: 0.2 }}
      >
        <span className={`text-3xl mb-1 ${achievement.locked ? "grayscale opacity-50" : ""}`}>
          {achievement.icon}
        </span>
        <p className="text-center text-xs font-bold text-gray-900 dark:text-white line-clamp-2">
          {achievement.name}
        </p>

        {/* Locked Indicator */}
        {achievement.locked && (
          <div className="absolute top-1 right-1 w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
            🔒
          </div>
        )}

        {/* Unlocked Date */}
        {achievement.unlockedAt && (
          <p className="text-xs text-ember-strong dark:text-brass font-medium mt-1">
            ✓ Unlocked
          </p>
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute bottom-full left-1/2 -trangray-x-1/2 mb-2 z-50"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gray-900 dark:bg-gray-950 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg border border-gray-700">
              {achievement.description}
              <div className="absolute top-full left-1/2 -trangray-x-1/2 -mt-1 w-2 h-2 bg-gray-900 dark:bg-gray-950 border-r border-b border-gray-700 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
