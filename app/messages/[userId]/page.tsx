"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useMessaging } from "@/lib/messaging/useMessaging";
import { usePeople } from "@/lib/people/usePeople";
import { useEffect } from "react";
import { ArrowLeft, Send, MoreHorizontal } from "lucide-react";
import { useState } from "react";

function ChatContent({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const { sendMessage, markConversationRead, getConversationByParticipant } = useMessaging();
  const { getPersonById } = usePeople();
  const [message, setMessage] = useState("");

  const recipient = getPersonById(params.userId);
  const conversation = getConversationByParticipant(params.userId);

  useEffect(() => {
    if (recipient) {
      markConversationRead(params.userId);
    }
  }, [params.userId, markConversationRead, recipient]);

  if (!recipient) {
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

  const formatTime = (epoch: number) => {
    const date = new Date(epoch);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const messages = conversation?.messages || [];

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(params.userId, message);
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember to-ember-strong flex items-center justify-center text-white font-bold text-sm">
                  {recipient.avatar}
                </div>
                {recipient.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-ember-strong border-2 border-white"></div>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{recipient.name}</p>
                <p className="text-xs text-gray-500">{recipient.online ? 'Active now' : 'Offline'}</p>
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
            className={`flex ${msg.senderId === 'me' ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-2 max-w-xs ${msg.senderId === 'me' ? "flex-row-reverse" : ""}`}>
              {msg.senderId !== 'me' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ember to-ember-strong flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {recipient.avatar}
                </div>
              )}
              <div className={`${msg.senderId === 'me' ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.senderId === 'me'
                      ? "bg-ember-strong text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <p className="text-xs text-gray-500">{formatTime(msg.sentAt)}</p>
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
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
            />
            <button
              onClick={handleSend}
              className="px-4 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors flex items-center gap-2"
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
