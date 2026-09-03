"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Shield, Trash2, Lock, Unlock, AlertCircle } from "lucide-react";
import { useState } from "react";

function UserDetailsContent({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const user = {
    id: params.userId,
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    role: "student",
    status: "active",
    joined: "2024-07-15",
    location: "San Francisco, CA",
    avatar: "AJ",
    courses: [
      { id: 1, title: "Web Development Fundamentals", progress: 75 },
      { id: 2, title: "Advanced React Patterns", progress: 50 },
      { id: 3, title: "UI/UX Design Masterclass", progress: 90 },
    ],
    activity: [
      { type: "Course Completed", desc: "Finished Web Development Fundamentals", date: "2 days ago" },
      { type: "Assignment Submitted", desc: "Submitted final project for UI/UX course", date: "5 days ago" },
      { type: "Course Enrolled", desc: "Enrolled in Advanced React Patterns", date: "1 week ago" },
    ],
    signups: 145,
    enrollments: 3,
    certificates: 1,
    lastActive: "Today, 2:30 PM",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">User ID: {user.id}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
                    <div className="flex gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 capitalize">
                        {user.role}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 capitalize">
                        {user.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Last active: {user.lastActive}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail size={20} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Phone size={20} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin size={20} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="font-medium text-gray-900">{user.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar size={20} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Joined</p>
                    <p className="font-medium text-gray-900">{user.joined}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {user.activity.map((act, i) => (
                  <div key={i} className="pb-4 border-b border-gray-200 last:border-0">
                    <p className="font-semibold text-gray-900">{act.type}</p>
                    <p className="text-sm text-gray-600 mt-1">{act.desc}</p>
                    <p className="text-xs text-gray-500 mt-2">{act.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Enrolled Courses</h3>
              <div className="space-y-4">
                {user.courses.map((course) => (
                  <div key={course.id} className="pb-4 border-b border-gray-200 last:border-0">
                    <p className="font-medium text-gray-900 mb-2">{course.title}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{course.progress}% complete</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Statistics</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Signups</p>
                  <p className="text-3xl font-bold text-gray-900">{user.signups}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-1">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{user.enrollments}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-1">Certificates Earned</p>
                  <p className="text-3xl font-bold text-green-600">{user.certificates}</p>
                </div>
              </div>
            </motion.div>

            {/* Admin Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Admin Actions</h3>
              <div className="space-y-3">
                {user.status === "active" ? (
                  <button className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center gap-2">
                    <Lock size={18} /> Suspend User
                  </button>
                ) : (
                  <button className="w-full px-4 py-3 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center gap-2">
                    <Unlock size={18} /> Unsuspend User
                  </button>
                )}
                <button className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center gap-2">
                  <Shield size={18} /> Change Role
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center gap-2">
                  <Trash2 size={18} /> Delete User
                </button>
              </div>
            </motion.div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-yellow-900 mb-1">Admin Note</p>
                  <p className="text-sm text-yellow-800">Be careful with user actions. Suspended users lose access immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-sm mx-4"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete User?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone. All user data will be permanently deleted.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function AdminUserDetails({ params }: { params: { userId: string } }) {
  return (
    <ProtectedRoute requiredRole="admin">
      <UserDetailsContent params={params} />
    </ProtectedRoute>
  );
}
