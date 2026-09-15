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
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Company Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-ember-strong dark:text-brass bg-forge-soft dark:bg-ember-strong/20 px-3 py-1 rounded-full uppercase tracking-wide">
          {lab.company}
        </span>
        <span className="text-xs font-medium text-ember-strong dark:text-brass">
          {lab.status === "upcoming" ? "Upcoming" : "Completed"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        {lab.title}
      </h3>

      {/* Details */}
      <div className="space-y-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-ember-strong dark:text-brass flex-shrink-0" />
          <span>{lab.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-ember-strong dark:text-brass flex-shrink-0" />
          <span>{lab.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-ember-strong dark:text-brass flex-shrink-0" />
          <span>{lab.location}</span>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-xs">
            <Users size={14} className="text-ember-strong dark:text-brass" />
            <span className="text-gray-600 dark:text-gray-400">
              {lab.enrolled} of {lab.capacity} enrolled
            </span>
          </div>
          <span className={`text-xs font-medium ${spotsAvailable > 0 ? "text-ember-strong dark:text-brass" : "text-red-600 dark:text-red-400"}`}>
            {spotsAvailable} spots left
          </span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-ember to-brass"
            initial={{ width: 0 }}
            animate={{ width: `${capacityPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Skills Covered:
        </p>
        <div className="flex flex-wrap gap-2">
          {lab.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded font-medium"
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
            ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            : "bg-ember-strong hover:bg-ember-strong text-white"
        }`}
      >
        {lab.status === "completed" ? "Completed" : "Book Session"}
      </button>
    </motion.div>
  );
}
