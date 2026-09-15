"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { usePeople } from "@/lib/people/usePeople";
import { UserRole } from "@/lib/auth/types";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Shield, Trash2, Lock, Unlock, AlertCircle } from "lucide-react";
import { useState } from "react";

function UserDetailsContent({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const { getPersonById, updatePersonStatus, updatePersonRole, deletePerson } = usePeople();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const user = getPersonById(params.userId);

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-ember-strong text-white rounded-lg">
            Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (epoch: number) => new Date(epoch).toLocaleDateString();

  const handleRoleSave = () => {
    if (selectedRole) {
      updatePersonRole(user.id, selectedRole);
      setShowRoleModal(false);
      setSelectedRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Go back">
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
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ember to-ember-strong flex items-center justify-center text-white text-2xl font-bold">
                    {user.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
                    <div className="flex gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 capitalize">
                        {user.role}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-forge-soft text-ember2 capitalize">
                        {user.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Last active: {formatDate(user.lastActiveAt)}</p>
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
                    <p className="font-medium text-gray-900">{formatDate(user.joinedAt)}</p>
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
                    <p className="text-xs text-gray-500 mt-2">{formatDate(act.date)}</p>
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
                      <div className="bg-ember-strong h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
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
                  <p className="text-sm text-gray-600 mb-1">Enrollments</p>
                  <p className="text-3xl font-bold text-gray-900">{user.enrollments}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-1">Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{user.courseCount}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-1">Certificates Earned</p>
                  <p className="text-3xl font-bold text-ember-strong">{user.certificates}</p>
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
                  <button
                    onClick={() => updatePersonStatus(user.id, 'suspended')}
                    className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
                  >
                    <Lock size={18} /> Suspend User
                  </button>
                ) : (
                  <button
                    onClick={() => updatePersonStatus(user.id, 'active')}
                    className="w-full px-4 py-3 bg-forge-soft text-ember-strong rounded-lg font-medium hover:bg-forge-soft transition-colors flex items-center gap-2"
                  >
                    <Unlock size={18} /> Unsuspend User
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedRole(user.role);
                    setShowRoleModal(true);
                  }}
                  className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  <Shield size={18} /> Change Role
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
                >
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

      {/* Role Change Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-sm mx-4"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Change User Role</h3>
            <select
              value={selectedRole || ''}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              aria-label="Select a role"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-ember-strong"
            >
              <option value="">Select a role</option>
              <option value="student">Student</option>
              <option value="trainer">Trainer</option>
              <option value="company">Company</option>
              <option value="guardian">Guardian</option>
              <option value="school">School</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex gap-4">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleSave}
                className="flex-1 px-4 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}

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
              <button
                onClick={() => {
                  deletePerson(user.id);
                  router.push('/admin/users');
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
              >
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
