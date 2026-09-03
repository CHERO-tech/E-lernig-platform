"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { Video, Calendar, Users, Play, Clock, MapPin } from "lucide-react";
import { useState } from "react";

function LiveSessionsContent() {
  const router = useRouter();
  const [filterTab, setFilterTab] = useState<"upcoming" | "ongoing" | "recorded">("upcoming");

  const sessions = [
    {
      id: 1,
      title: "Live Q&A: React Hooks Deep Dive",
      instructor: "Sarah Chen",
      course: "Advanced React Patterns",
      status: "ongoing",
      startTime: "2025-03-03T10:00:00",
      duration: 60,
      participants: 145,
      thumbnail: "bg-gradient-to-br from-blue-400 to-purple-500",
      description: "Join us for an interactive session where we'll dive deep into React hooks with live coding examples.",
    },
    {
      id: 2,
      title: "Component Architecture Workshop",
      instructor: "John Smith",
      course: "Web Development",
      status: "upcoming",
      startTime: "2025-03-03T14:00:00",
      duration: 90,
      participants: 0,
      thumbnail: "bg-gradient-to-br from-green-400 to-teal-500",
      description: "Learn best practices for structuring scalable React applications.",
    },
    {
      id: 3,
      title: "Performance Optimization Masterclass",
      instructor: "Alex Kumar",
      course: "Advanced React Patterns",
      status: "upcoming",
      startTime: "2025-03-04T16:00:00",
      duration: 120,
      participants: 0,
      thumbnail: "bg-gradient-to-br from-orange-400 to-red-500",
      description: "Advanced techniques for optimizing React application performance.",
    },
    {
      id: 4,
      title: "State Management Patterns",
      instructor: "Emma Davis",
      course: "Advanced React Patterns",
      status: "recorded",
      startTime: "2025-02-28T10:00:00",
      duration: 75,
      participants: 230,
      thumbnail: "bg-gradient-to-br from-pink-400 to-rose-500",
      description: "Comprehensive overview of state management in modern React applications.",
      recordingUrl: "#",
    },
  ];

  const filtered = sessions.filter(s => s.status === filterTab);

  const getStatusColor = (status: string) => {
    if (status === "ongoing") return "bg-red-100 text-red-700";
    if (status === "upcoming") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  const getStatusLabel = (status: string) => {
    if (status === "ongoing") return "🔴 LIVE";
    if (status === "upcoming") return "⏰ Upcoming";
    return "📹 Recorded";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Video size={36} />
            <h1 className="text-4xl font-bold">Live Sessions</h1>
          </div>
          <p className="text-green-100">Join interactive webinars and live classes</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-8 border-b border-gray-200"
        >
          {["upcoming", "ongoing", "recorded"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab as "upcoming" | "ongoing" | "recorded")}
              className={`px-6 py-4 font-medium transition-colors capitalize ${
                filterTab === tab
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab} ({filtered.length})
            </button>
          ))}
        </motion.div>

        {/* Sessions Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filtered.map((session, i) => {
              const startDate = new Date(session.startTime);
              const isLive = session.status === "ongoing";

              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                  onClick={() => {
                    if (isLive || session.status === "recorded") {
                      router.push(`/live-sessions/${session.id}`);
                    }
                  }}
                >
                  {/* Thumbnail */}
                  <div className={`${session.thumbnail} h-40 relative flex items-center justify-center overflow-hidden`}>
                    {isLive && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                          <Video size={32} className="text-white" />
                        </div>
                      </div>
                    )}
                    {!isLive && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 flex items-center justify-center transition-all">
                        <Play size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(session.status)}`}>
                        {getStatusLabel(session.status)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{session.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{session.course}</p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{session.description}</p>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>
                          {session.participants || "0"} {isLive ? "watching" : "attended"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{session.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{startDate.toLocaleDateString()} at {startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Instructor</p>
                      <p className="font-semibold text-gray-900">{session.instructor}</p>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/live-sessions/${session.id}`);
                      }}
                      className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                        isLive
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : session.status === "upcoming"
                            ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {isLive ? "Join Now" : session.status === "upcoming" ? "Register" : "Watch Recording"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-12 text-center"
          >
            <Video size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No sessions found</h2>
            <p className="text-gray-600">Check back soon for new live sessions!</p>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="font-bold text-blue-900 mb-2">🎥 Live Session Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Arrive 5 minutes early to test your setup</li>
            <li>• Use the chat to ask questions and interact</li>
            <li>• All sessions are recorded and available later</li>
            <li>• Mute your microphone if there's background noise</li>
            <li>• Get a certificate if you attend the full session</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function LiveSessions() {
  return (
    <ProtectedRoute>
      <LiveSessionsContent />
    </ProtectedRoute>
  );
}
