"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { Mail, MapPin, Award, BookOpen, Star, Edit, Share2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function ProfileContent() {
  const router = useRouter();
  const { user } = useAuth();

  const stats = [
    { label: "Courses Completed", value: "12", icon: BookOpen },
    { label: "Certifications", value: "8", icon: Award },
    { label: "Skills Learned", value: "24", icon: Star },
  ];

  const completedCourses = [
    { title: "Web Development Fundamentals", instructor: "John Smith", rating: 4.8, date: "Dec 2024" },
    { title: "Advanced React Patterns", instructor: "Sarah Chen", rating: 4.9, date: "Nov 2024" },
    { title: "UI/UX Design Masterclass", instructor: "Mike Johnson", rating: 4.7, date: "Oct 2024" },
  ];

  const skills = ["React", "TypeScript", "Node.js", "UI Design", "Problem Solving", "Communication", "Leadership", "Project Management"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">Profile</h1>
          <Link href="/settings" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Edit size={18} /> Edit
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-white text-5xl font-bold flex-shrink-0">
              {user?.avatar}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h2>
              <p className="text-gray-600 mb-4 capitalize">{user?.role} • Joined 8 months ago</p>
              <p className="text-gray-700 mb-6">Passionate learner and tech enthusiast focused on full-stack development and design. Always eager to learn new skills and help others grow.</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} /> {user?.email}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> San Francisco, CA
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Share2 size={16} /> Share Profile
                </button>
                <Link href="/settings" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Edit size={16} /> Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-lg border border-gray-200 p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <div key={i} className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200 hover:border-green-400 transition-colors cursor-pointer">
                {skill}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Completed Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Completed Courses</h3>
            <Link href="/student/dashboard" className="text-green-600 hover:text-green-700 font-medium">View all</Link>
          </div>

          <div className="space-y-4">
            {completedCourses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{course.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{course.date}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Award size={16} className="text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Certificate earned</span>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-6 px-4 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors">
            View All Certificates
          </button>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-lg border border-gray-200 p-8 mt-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: "🎓", title: "First Certificate", desc: "Completed first course" },
              { emoji: "🔥", title: "7 Day Streak", desc: "Learned 7 days in a row" },
              { emoji: "⭐", title: "Quick Learner", desc: "Completed course in 1 week" },
              { emoji: "🏆", title: "Top Performer", desc: "Scored 95% or higher" },
            ].map((achievement, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors cursor-pointer">
                <div className="text-4xl mb-2">{achievement.emoji}</div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{achievement.title}</p>
                <p className="text-xs text-gray-600">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
