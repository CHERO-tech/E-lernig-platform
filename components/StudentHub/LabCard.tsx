"use client";

import React from "react";
import { motion } from "framer-motion";
import { LabSession } from "@/lib/studentHubData";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface LabCardProps {
  lab: LabSession;
}

export default function LabCard({ lab }: LabCardProps) {
  const spotsAvailable = lab.capacity - lab.enrolled;
  const capacityPercent = (lab.enrolled / lab.capacity) * 100;

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Company Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full uppercase tracking-wide">
          {lab.company}
        </span>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {lab.status === "upcoming" ? "Upcoming" : "Completed"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        {lab.title}
      </h3>

      {/* Details */}
      <div className="space-y-3 mb-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>{lab.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>{lab.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>{lab.location}</span>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-xs">
            <Users size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-slate-600 dark:text-slate-400">
              {lab.enrolled} of {lab.capacity} enrolled
            </span>
          </div>
          <span className={`text-xs font-medium ${spotsAvailable > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
            {spotsAvailable} spots left
          </span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${capacityPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
          Skills Covered:
        </p>
        <div className="flex flex-wrap gap-2">
          {lab.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        disabled={lab.status === "completed"}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          lab.status === "completed"
            ? "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700 text-white"
        }`}
      >
        {lab.status === "completed" ? "Completed" : "Book Session"}
      </button>
    </motion.div>
  );
}
