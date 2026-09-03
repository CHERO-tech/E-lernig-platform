"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ArrowLeft, Send, MoreHorizontal } from "lucide-react";
import { useState } from "react";

function ChatContent({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const recipient = {
    name: "Sarah Chen",
    avatar: "SC",
    online: true,
    status: "Active now",
  };

  const messages = [
    { id: 1, sender: "Sarah", text: "Hey! How are you doing?", time: "10:30 AM", own: false },
    { id: 2, sender: "You", text: "Hi Sarah! Doing great, thanks for asking! How about you?", time: "10:31 AM", own: true },
    { id: 3, sender: "Sarah", text: "I'm good! I wanted to discuss the course materials", time: "10:32 AM", own: false },
    { id: 4, sender: "Sarah", text: "Do you have time this week?", time: "10:33 AM", own: false },
    { id: 5, sender: "You", text: "Of course! I'm free on Wednesday afternoon", time: "10:35 AM", own: true },
    { id: 6, sender: "Sarah", text: "That sounds great! When can we discuss?", time: "10:36 AM", own: false },
  ];

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                  {recipient.avatar}
                </div>
                {recipient.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></div>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{recipient.name}</p>
                <p className="text-xs text-gray-500">{recipient.status}</p>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-6 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex ${msg.own ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-2 max-w-xs ${msg.own ? "flex-row-reverse" : ""}`}>
              {!msg.own && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  SC
                </div>
              )}
              <div className={`${msg.own ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.own
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <p className="text-xs text-gray-500">{msg.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage({ params }: { params: { userId: string } }) {
  return (
    <ProtectedRoute>
      <ChatContent params={params} />
    </ProtectedRoute>
  );
}
