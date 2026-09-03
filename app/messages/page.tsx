"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import Link from "next/link";
import { Search, Send, MoreHorizontal, Pin, Trash2 } from "lucide-react";
import { useState } from "react";

function MessagesContent() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const conversations = [
    { id: 1, name: "Sarah Chen", avatar: "SC", lastMessage: "That sounds great! When can we discuss?", time: "2 min ago", unread: 2, online: true },
    { id: 2, name: "Mike Johnson", avatar: "MJ", lastMessage: "The course materials are ready for review", time: "1 hour ago", unread: 0, online: false },
    { id: 3, name: "Emma Davis", avatar: "ED", lastMessage: "Thanks for the feedback on my project", time: "3 hours ago", unread: 1, online: true },
    { id: 4, name: "Alex Kumar", avatar: "AK", lastMessage: "I have some questions about the assignment", time: "Yesterday", unread: 0, online: false },
    { id: 5, name: "Jessica Lee", avatar: "JL", lastMessage: "Looking forward to the webinar tomorrow", time: "2 days ago", unread: 0, online: false },
  ];

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex-1">
        {filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((conv, i) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/messages/${conv.id}`}>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all cursor-pointer hover:border-green-500 group">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-gray-900">{conv.name}</p>
                          <p className="text-xs text-gray-500">{conv.time}</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      </div>

                      {conv.unread > 0 && (
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex-shrink-0">
                            {conv.unread}
                          </span>
                        </div>
                      )}

                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="Pin">
                          <Pin size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="More">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Messages() {
  return (
    <ProtectedRoute>
      <MessagesContent />
    </ProtectedRoute>
  );
}
