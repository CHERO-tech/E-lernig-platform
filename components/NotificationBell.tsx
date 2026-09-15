"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { formatRelativeTime } from "@/lib/notifications/formatRelativeTime";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const recentNotifications = notifications.slice(0, 4);

  const handleNotificationClick = (id: string, isRead: boolean) => {
    if (!isRead) {
      markAsRead(id);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Notifications
              </p>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {unreadCount} unread
                </p>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {recentNotifications.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentNotifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => {
                        handleNotificationClick(notif.id, notif.read);
                        setOpen(false);
                      }}
                      className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                        !notif.read
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <span className="text-xl flex-shrink-0">{notif.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${
                            notif.read
                              ? "text-gray-900 dark:text-gray-100"
                              : "text-blue-900 dark:text-blue-100"
                          }`}>
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {formatRelativeTime(notif.createdAt)}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-gray-600 dark:text-gray-400">
                  <p className="text-sm">No notifications yet</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <Link
                href="/notifications"
                onClick={() => setOpen(false)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                View all notifications →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
