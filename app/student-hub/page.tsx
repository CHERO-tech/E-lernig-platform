"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  mockStudentProfile,
  mockActiveCourses,
  mockUpcomingLabSessions,
  mockAchievements,
  mockCommunityFeed,
  mockStudentStats,
  getQuoteByIndex,
} from "@/lib/studentHubData";
import StudentHubSidebar from "@/components/StudentHub/StudentHubSidebar";
import MotivationalQuoteCard from "@/components/StudentHub/MotivationalQuoteCard";
import StatsGrid from "@/components/StudentHub/StatsGrid";
import CourseCard from "@/components/StudentHub/CourseCard";
import LabCard from "@/components/StudentHub/LabCard";
import AchievementBadge from "@/components/StudentHub/AchievementBadge";
import CommunityFeedItem from "@/components/StudentHub/CommunityFeedItem";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function StudentHubDashboard() {
  const quote = useMemo(() => getQuoteByIndex(0), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
        {/* Sidebar */}
        <StudentHubSidebar studentName={mockStudentProfile.name} />

        {/* Main Content */}
        <main className="p-6 md:p-8 overflow-y-auto">
          <motion.div
            className="max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    Welcome back, {mockStudentProfile.name.split(" ")[0]}! 👋
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Keep pushing—every lesson gets you closer to your goals
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-bold shadow-lg">
                    {mockStudentProfile.avatar}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div variants={itemVariants} className="mb-8">
              <MotivationalQuoteCard quote={quote} />
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="mb-8">
              <StatsGrid stats={mockStudentStats} />
            </motion.div>

            {/* Currently Learning Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">📖</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Currently Learning
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockActiveCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </motion.div>

            {/* Upcoming Lab Sessions */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🔬</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Upcoming Lab Sessions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockUpcomingLabSessions.map((lab) => (
                  <LabCard key={lab.id} lab={lab} />
                ))}
              </div>
            </motion.div>

            {/* Achievements Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🏆</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Achievements
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {mockAchievements.map((achievement) => (
                  <AchievementBadge key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </motion.div>

            {/* Community Feed Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">👥</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Community Highlights
                </h2>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div className="space-y-6">
                  {mockCommunityFeed.map((post) => (
                    <CommunityFeedItem key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
