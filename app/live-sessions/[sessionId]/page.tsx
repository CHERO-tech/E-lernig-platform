"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Users, MessageCircle, Share2, Download, Play } from "lucide-react";
import { useState } from "react";

function LiveSessionContent({ params }: { params: { sessionId: string } }) {
  const router = useRouter();
  const [chatMessages, setChatMessages] = useState([
    { id: 1, author: "Sarah Chen", message: "Great session so far! Very informative.", time: "10:05" },
    { id: 2, author: "Mike Johnson", message: "Can you explain the useContext again?", time: "10:08" },
    { id: 3, author: "Instructor (Sarah Chen)", message: "Of course! Let me show that example.", time: "10:09", isInstructor: true },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showParticipants, setShowParticipants] = useState(true);

  const session = {
    title: "Live Q&A: React Hooks Deep Dive",
    instructor: "Sarah Chen",
    participants: 145,
    duration: "45 min remaining",
    description: "Interactive session on React hooks",
  };

  const participants = [
    { id: 1, name: "Sarah Chen", avatar: "SC", isInstructor: true, online: true },
    { id: 2, name: "John Smith", avatar: "JS", online: true },
    { id: 3, name: "Emma Davis", avatar: "ED", online: true },
    { id: 4, name: "Alex Kumar", avatar: "AK", online: true },
    { id: 5, name: "Mike Johnson", avatar: "MJ", online: true },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          author: "You",
          message: newMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{session.title}</h1>
              <p className="text-sm text-gray-600">by {session.instructor}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> LIVE
            </span>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3"
        >
          <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <Play size={40} className="text-black ml-2" />
                </div>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-sm font-bold">LIVE</span>
            </div>

            {/* Participant Count */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-2 rounded-lg flex items-center gap-2">
              <Users size={18} />
              <span className="font-semibold">{session.participants} watching</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2">
              <Download size={18} /> Download Slides
            </button>
            <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <Share2 size={18} /> Share Session
            </button>
          </div>
        </motion.div>

        {/* Sidebar - Chat & Participants */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setShowParticipants(false)}
              className={`flex-1 py-3 font-medium flex items-center justify-center gap-2 transition-colors ${
                !showParticipants
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MessageCircle size={18} /> Chat
            </button>
            <button
              onClick={() => setShowParticipants(true)}
              className={`flex-1 py-3 font-medium flex items-center justify-center gap-2 transition-colors ${
                showParticipants
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users size={18} /> People
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {showParticipants ? (
              // Participants List
              <div className="space-y-2">
                {participants.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {p.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {p.name}
                        {p.isInstructor && <span className="text-xs text-blue-600 ml-1">(Instructor)</span>}
                      </p>
                    </div>
                    {p.online && (
                      <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              // Chat Messages
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${msg.isInstructor ? "bg-blue-50 border border-blue-200 p-2 rounded" : ""}`}
                  >
                    <p className="text-xs text-gray-600 mb-1">
                      <span className="font-semibold text-gray-900">{msg.author}</span>{" "}
                      <span className="text-gray-500">{msg.time}</span>
                    </p>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Chat Input */}
          {!showParticipants && (
            <div className="border-t border-gray-200 p-3 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Send a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div>
            <span className="font-semibold">{session.title}</span> • {session.duration}
          </div>
          <button className="text-green-600 hover:text-green-700 font-medium">Leave Session</button>
        </div>
      </div>
    </div>
  );
}

export default function LiveSession({ params }: { params: { sessionId: string } }) {
  return (
    <ProtectedRoute>
      <LiveSessionContent params={params} />
    </ProtectedRoute>
  );
}
