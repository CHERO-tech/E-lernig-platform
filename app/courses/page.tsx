"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Star } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const { courses } = useCourses();

  const filtered = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80">
            <span className="text-2xl font-bold">Forge</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Explore Courses</h1>
          <p className="text-forge-soft">Discover thousands of high-quality courses</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
            />
          </div>
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Filter size={20} />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-gradient-to-br from-ember-strong to-ember"></div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                <div className="flex items-center justify-between mb-4 text-sm">
                  <span className="text-gray-600">{course.level}</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-4">{course.students.toLocaleString()} students</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-ember-strong">${course.price}</span>
                  <Link
                    href={`/courses/${course.id}`}
                    className="px-4 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
