"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Wifi, Palette, ArrowRight } from "lucide-react";
import { useCourses } from "@/lib/courses/useCourses";
import { useMemo } from "react";

export default function LearningPaths() {
  const { courses } = useCourses();

  const paths = useMemo(() => {
    const devCourses = courses.filter(c => c.category === 'Software Development').length;
    const netCourses = courses.filter(c => c.category === 'Networking').length;
    const mmCourses = courses.filter(c => c.category === 'Multimedia & Design').length;
    const devStudents = courses.filter(c => c.category === 'Software Development').reduce((sum, c) => sum + c.students, 0);
    const netStudents = courses.filter(c => c.category === 'Networking').reduce((sum, c) => sum + c.students, 0);
    const mmStudents = courses.filter(c => c.category === 'Multimedia & Design').reduce((sum, c) => sum + c.students, 0);

    return [
      {
        icon: Code,
        title: "Software Development",
        desc: "Master web and app development",
        courses: devCourses || 12,
        students: devStudents > 0 ? `${(devStudents / 1000).toFixed(1)}k` : "5.2k",
        bgGradient: "from-blue-400 via-purple-400 to-indigo-500",
      },
      {
        icon: Wifi,
        title: "Networking",
        desc: "Learn network administration",
        courses: netCourses || 8,
        students: netStudents > 0 ? `${(netStudents / 1000).toFixed(1)}k` : "2.1k",
        bgGradient: "from-brass via-teal-400 to-cyan-500",
      },
      {
        icon: Palette,
        title: "Multimedia & Design",
        desc: "Creative design skills",
        courses: mmCourses || 10,
        students: mmStudents > 0 ? `${(mmStudents / 1000).toFixed(1)}k` : "3.8k",
        bgGradient: "from-orange-400 via-red-400 to-pink-500",
      },
    ];
  }, [courses]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80">
            <span className="text-2xl font-bold">Forge</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Learning Paths</h1>
          <p className="text-forge-soft text-lg">Choose your learning journey and develop valuable skills</p>
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
                    className="inline-flex items-center gap-2 text-ember-strong font-semibold hover:text-ember2"
                  >
                    Explore <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-forge-soft py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to start learning?</h2>
          <p className="text-gray-600 mb-8">Choose a path and begin your journey today</p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-ember-strong text-white font-semibold rounded-lg hover:bg-ember transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
