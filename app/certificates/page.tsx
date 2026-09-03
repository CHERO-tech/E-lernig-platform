"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import { Download, Share2, Award, Calendar } from "lucide-react";
import { useState } from "react";

function CertificatesContent() {
  const { user } = useAuth();
  const [filterCourse, setFilterCourse] = useState("all");

  const certificates = [
    {
      id: 1,
      course: "Advanced React Patterns",
      instructor: "Sarah Chen",
      issued: "2024-08-15",
      score: 92,
      credentialId: "CERT-2024-001",
    },
    {
      id: 2,
      course: "Web Development Fundamentals",
      instructor: "John Smith",
      issued: "2024-07-20",
      score: 88,
      credentialId: "CERT-2024-002",
    },
    {
      id: 3,
      course: "UI/UX Design Masterclass",
      instructor: "Mike Johnson",
      issued: "2024-06-10",
      score: 95,
      credentialId: "CERT-2024-003",
    },
    {
      id: 4,
      course: "Python for Data Science",
      instructor: "Alex Kumar",
      issued: "2024-05-05",
      score: 90,
      credentialId: "CERT-2024-004",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Award size={32} />
            <h1 className="text-4xl font-bold">My Certificates</h1>
          </div>
          <p className="text-green-100">You've earned {certificates.length} certificates</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { label: "Total Certificates", value: certificates.length, icon: Award },
            { label: "Average Score", value: "91%", icon: Award },
            { label: "This Year", value: "4", icon: Calendar },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon size={32} className="text-green-600 opacity-50" />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Certificate Preview */}
              <div className="h-64 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 p-8 flex items-center justify-center border-b-2 border-yellow-200 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 text-6xl opacity-10">🏆</div>
                <div className="text-center z-10">
                  <Award size={48} className="mx-auto text-yellow-600 mb-3" />
                  <p className="text-sm text-yellow-700 font-semibold">CERTIFICATE OF COMPLETION</p>
                  <p className="text-xl font-bold text-yellow-900 mt-2">{cert.course}</p>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Instructor</p>
                    <p className="font-semibold text-gray-900">{cert.instructor}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Issued</p>
                      <p className="font-semibold text-gray-900">{new Date(cert.issued).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Score</p>
                      <p className="font-semibold text-green-600">{cert.score}%</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Credential ID</p>
                    <p className="text-sm font-mono text-gray-600">{cert.credentialId}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                    <Download size={18} /> Download
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={18} /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center"
        >
          <p className="text-blue-900 mb-4">
            Certificates are issued upon course completion with a passing score. They can be verified using the Credential ID.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Learn about certificate verification
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default function Certificates() {
  return (
    <ProtectedRoute>
      <CertificatesContent />
    </ProtectedRoute>
  );
}
