"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Users, Clock, Award, ArrowLeft } from "lucide-react";

export default function CourseDetail() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/courses" className="inline-flex items-center gap-2 mb-8 hover:opacity-80">
            <ArrowLeft size={20} />
            Back to Courses
          </Link>
          <h1 className="text-4xl font-bold mb-4">Advanced React Patterns</h1>
          <p className="text-green-100 text-lg">Master advanced React techniques and best practices</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="h-96 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl mb-8"></div>

              <div className="prose max-w-none mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this course</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Take your React skills to the next level with this comprehensive course on advanced patterns and techniques. Learn from industry experts and master the concepts used in production applications.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Advanced Component Patterns</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>State Management Best Practices</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Performance Optimization</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Testing Strategies</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((section) => (
                    <div key={section} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-900">Section {section}: Module Topic</p>
                      <p className="text-sm text-gray-600 mt-1">10 lessons • 2.5 hours</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
              <p className="text-4xl font-bold text-green-600 mb-6">$79</p>

              <button className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mb-4">
                Enroll Now
              </button>

              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Students</p>
                    <p className="font-semibold text-gray-900">890 enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">12.5 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Certificate</p>
                    <p className="font-semibold text-gray-900">Included</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-yellow-500 fill-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-semibold text-gray-900">4.9/5.0</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-6 text-center">30-day money-back guarantee</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
