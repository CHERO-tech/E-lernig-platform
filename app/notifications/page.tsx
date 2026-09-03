"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import { Bell, Check, CheckCheck, Trash2, Filter } from "lucide-react";
import { useState } from "react";

function NotificationsContent() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "course",
      icon: "📚",
      title: "New Assignment Available",
      message: "Your instructor posted a new assignment in 'Advanced React Patterns'",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "achievement",
      icon: "🏆",
      title: "Achievement Unlocked",
      message: "Congratulations! You earned the '7 Day Learning Streak' badge",
      timestamp: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "system",
      icon: "⚙️",
      title: "System Update",
      message: "We've improved the platform with new features and bug fixes",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: 4,
      type: "course",
      icon: "🎓",
      title: "Course Recommendation",
      message: "Based on your interests, we recommend 'UI/UX Design Masterclass'",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: 5,
      type: "social",
      icon: "👥",
      title: "Someone enrolled in your course",
      message: "John Doe just enrolled in your 'Web Development Fundamentals' course",
      timestamp: "1 week ago",
      read: true,
    },
    {
      id: 6,
      type: "payment",
      icon: "💳",
      title: "Payment Successful",
      message: "Your payment of $79 for Professional plan was processed successfully",
      timestamp: "2 weeks ago",
      read: true,
    },
  ]);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "archived") return false; // In a real app, would filter by archived status
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      course: { bg: "bg-blue-50", text: "text-blue-600" },
      achievement: { bg: "bg-yellow-50", text: "text-yellow-600" },
      system: { bg: "bg-gray-50", text: "text-gray-600" },
      social: { bg: "bg-purple-50", text: "text-purple-600" },
      payment: { bg: "bg-green-50", text: "text-green-600" },
    };
    return colors[type] || colors.system;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={24} className="text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600">{unreadCount} unread messages</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <CheckCheck size={16} /> Mark all as read
              </button>
            )}
            <Link href="/settings" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
              <Filter size={16} /> Settings
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: "all", label: "All", count: notifications.length },
            { id: "unread", label: "Unread", count: unreadCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-1 rounded bg-white/20 text-sm font-semibold">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`p-4 rounded-lg border transition-all ${
                  notif.read
                    ? "bg-white border-gray-200 hover:border-gray-300"
                    : "bg-blue-50 border-blue-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`text-2xl flex-shrink-0`}>{notif.icon}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-semibold ${notif.read ? "text-gray-900" : "text-blue-900"}`}>
                          {notif.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">{notif.timestamp}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-green-600"
                        title="Mark as read"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-lg border border-gray-200"
          >
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 mb-4 text-lg">No notifications yet</p>
            <p className="text-gray-500">When something important happens, you'll see it here</p>
          </motion.div>
        )}

        {/* Empty State Message */}
        {unreadCount === 0 && notifications.length > 0 && filter === "unread" && (
          <div className="text-center py-12">
            <p className="text-gray-600">You're all caught up! 🎉</p>
          </div>
        )}
      </div>

      {/* Notification Settings Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-6 py-8 bg-blue-50 border border-blue-200 rounded-lg mt-8 mb-8"
      >
        <p className="text-blue-900 text-sm">
          💡 <span className="font-medium">Tip:</span> You can manage notification preferences in{" "}
          <Link href="/settings" className="font-semibold hover:underline">
            Settings → Notifications
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function Notifications() {
  return (
    <ProtectedRoute>
      <NotificationsContent />
    </ProtectedRoute>
  );
}
