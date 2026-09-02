"use client";

import React from "react";
import { motion } from "framer-motion";
import { Course } from "@/lib/studentHubData";
import { ChevronRight } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div
      className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Course Header */}
      <div className="h-24 bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
        {course.icon}
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-600 dark:text-slate-400">
          <span>{course.duration}</span>
          <span>•</span>
          <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-emerald-600 dark:text-emerald-400 font-medium">
            {course.level}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Instructor: <span className="font-medium text-slate-900 dark:text-white">{course.instructor}</span>
        </p>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Progress
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {course.progress}%
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Next Lesson */}
        {course.nextLesson && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            Next: <span className="font-medium text-slate-900 dark:text-white">{course.nextLesson}</span>
          </p>
        )}

        {/* CTA Button */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors group/btn">
          Continue Course
          <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
