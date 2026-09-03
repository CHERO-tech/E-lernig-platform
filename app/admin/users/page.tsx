"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { ArrowLeft, Search, MoreHorizontal, Shield, Trash2, Lock, Mail } from "lucide-react";
import { useState } from "react";

function UsersContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const users = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "student", status: "active", joined: "2 months ago", courses: 3 },
    { id: 2, name: "Sarah Chen", email: "sarah@example.com", role: "trainer", status: "active", joined: "3 months ago", courses: 5 },
    { id: 3, name: "Mike Davis", email: "mike@example.com", role: "student", status: "inactive", joined: "1 month ago", courses: 1 },
    { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "company", status: "active", joined: "2 weeks ago", courses: 0 },
    { id: 5, name: "John Brown", email: "john@example.com", role: "guardian", status: "active", joined: "1 month ago", courses: 0 },
    { id: 6, name: "Lisa Garcia", email: "lisa@example.com", role: "student", status: "suspended", joined: "3 weeks ago", courses: 2 },
    { id: 7, name: "Tom Wilson", email: "tom@example.com", role: "trainer", status: "active", joined: "4 months ago", courses: 8 },
    { id: 8, name: "Jessica Lee", email: "jessica@example.com", role: "student", status: "active", joined: "5 days ago", courses: 0 },
  ];

  const filteredUsers = users
    .filter(u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(u => filterRole === "all" || u.role === filterRole);

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      student: "bg-blue-100 text-blue-700",
      trainer: "bg-green-100 text-green-700",
      company: "bg-purple-100 text-purple-700",
      guardian: "bg-orange-100 text-orange-700",
      admin: "bg-red-100 text-red-700",
    };
    return colors[role] || colors.student;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-50 text-green-700 border-green-200",
      inactive: "bg-gray-50 text-gray-700 border-gray-200",
      suspended: "bg-red-50 text-red-700 border-red-200",
    };
    return colors[status] || colors.active;
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
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage platform users and permissions</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            {["all", "student", "trainer", "company", "guardian"].map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  filterRole === role
                    ? "bg-green-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {role === "all" ? "All Users" : role}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Activity</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail size={14} /> {u.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(u.role)} capitalize`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(u.status)} capitalize`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.joined}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.courses} courses</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/users/${u.id}`}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Shield size={18} className="text-gray-600" />
                        </Link>
                        {u.status !== "suspended" && (
                          <button
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                            title="Suspend User"
                          >
                            <Lock size={18} />
                          </button>
                        )}
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No users found</p>
            </div>
          )}
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Users", value: users.length },
            { label: "Active", value: users.filter(u => u.status === "active").length },
            { label: "Inactive", value: users.filter(u => u.status === "inactive").length },
            { label: "Suspended", value: users.filter(u => u.status === "suspended").length },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminUsers() {
  return (
    <ProtectedRoute requiredRole="admin">
      <UsersContent />
    </ProtectedRoute>
  );
}
