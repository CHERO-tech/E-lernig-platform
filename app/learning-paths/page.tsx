"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Wifi, Palette, ArrowRight } from "lucide-react";

export default function LearningPaths() {
  const paths = [
    {
      icon: Code,
      title: "Software Development",
      desc: "Master web and app development",
      courses: 12,
      students: "5.2k",
      bgGradient: "from-blue-400 via-purple-400 to-indigo-500",
    },
    {
      icon: Wifi,
      title: "Networking",
      desc: "Learn network administration",
      courses: 8,
      students: "2.1k",
      bgGradient: "from-emerald-400 via-teal-400 to-cyan-500",
    },
    {
      icon: Palette,
      title: "Multimedia & Design",
      desc: "Creative design skills",
      courses: 10,
      students: "3.8k",
      bgGradient: "from-orange-400 via-red-400 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80">
            <span className="text-2xl font-bold">Forge</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Learning Paths</h1>
          <p className="text-green-100 text-lg">Choose your learning journey and develop valuable skills</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((path, i) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`h-48 bg-gradient-to-br ${path.bgGradient}`}></div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{path.desc}</p>
                  <div className="flex justify-between text-sm text-gray-600 mb-6">
                    <span>{path.courses} Courses</span>
                    <span>{path.students} Students</span>
                  </div>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
                  >
                    Explore <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-green-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to start learning?</h2>
          <p className="text-gray-600 mb-8">Choose a path and begin your journey today</p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
