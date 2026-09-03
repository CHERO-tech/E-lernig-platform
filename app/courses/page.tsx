"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Star } from "lucide-react";
import { useState } from "react";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    { id: 1, title: "Web Development Fundamentals", instructor: "John Smith", level: "Beginner", rating: 4.8, students: 1240, price: "$49" },
    { id: 2, title: "Advanced React Patterns", instructor: "Sarah Chen", level: "Advanced", rating: 4.9, students: 890, price: "$79" },
    { id: 3, title: "UI/UX Design Masterclass", instructor: "Mike Johnson", level: "Intermediate", rating: 4.7, students: 650, price: "$59" },
    { id: 4, title: "Python for Data Science", instructor: "Alex Kumar", level: "Intermediate", rating: 4.8, students: 920, price: "$69" },
    { id: 5, title: "Mobile Development with Flutter", instructor: "Emma Davis", level: "Beginner", rating: 4.6, students: 540, price: "$49" },
    { id: 6, title: "Cloud Architecture on AWS", instructor: "Tom Wilson", level: "Advanced", rating: 4.9, students: 780, price: "$99" },
  ];

  const filtered = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80">
            <span className="text-2xl font-bold">Forge</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Explore Courses</h1>
          <p className="text-green-100">Discover thousands of high-quality courses</p>
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <div className="h-40 bg-gradient-to-br from-green-400 to-emerald-500"></div>
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
                  <span className="text-lg font-bold text-green-600">{course.price}</span>
                  <Link
                    href={`/courses/${course.id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
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
