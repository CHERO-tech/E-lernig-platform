"use client";

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { Notification, NotificationContextType } from './types';
import { useAuth } from '../auth/useAuth';

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'forge_notifications_';
const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'course',
    icon: '📚',
    title: 'New Assignment Available',
    message: "Your instructor posted a new assignment in 'Advanced React Patterns'",
    createdAt: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    read: false,
  },
  {
    id: '2',
    type: 'achievement',
    icon: '🏆',
    title: 'Achievement Unlocked',
    message: "Congratulations! You earned the '7 Day Learning Streak' badge",
    createdAt: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
    read: false,
  },
  {
    id: '3',
    type: 'system',
    icon: '⚙️',
    title: 'System Update',
    message: "We've improved the platform with new features and bug fixes",
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    read: true,
  },
  {
    id: '4',
    type: 'course',
    icon: '🎓',
    title: 'Course Recommendation',
    message: "Based on your interests, we recommend 'UI/UX Design Masterclass'",
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    read: true,
  },
  {
    id: '5',
    type: 'social',
    icon: '👥',
    title: 'Someone enrolled in your course',
    message: "John Doe just enrolled in your 'Web Development Fundamentals' course",
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
    read: true,
  },
  {
    id: '6',
    type: 'payment',
    icon: '💳',
    title: 'Payment Successful',
    message: 'Your payment of $79 for Professional plan was processed successfully',
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000, // 2 weeks ago
    read: true,
  },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user, loading: authLoading } = useAuth();

  // Initialize notifications from localStorage
  useEffect(() => {
    if (!authLoading && user?.id) {
      const storageKey = `${STORAGE_KEY_PREFIX}${user.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          setNotifications(JSON.parse(stored));
        } catch {
          localStorage.removeItem(storageKey);
          setNotifications(DEFAULT_NOTIFICATIONS);
        }
      } else {
        setNotifications(DEFAULT_NOTIFICATIONS);
      }
    }
  }, [user?.id, authLoading]);

  // Persist notifications whenever they change
  const persistNotifications = useCallback((notifs: Notification[]) => {
    if (user?.id) {
      const storageKey = `${STORAGE_KEY_PREFIX}${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(notifs));
    }
  }, [user?.id]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => (n.id === id ? { ...n, read: true } : n));
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  const addNotification = useCallback((input: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    setNotifications(prev => {
      const newNotif: Notification = {
        ...input,
        id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
        read: false,
      };
      const updated = [newNotif, ...prev];
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  const clearAll = useCallback(() => {
    setNotifications([]);
    if (user?.id) {
      const storageKey = `${STORAGE_KEY_PREFIX}${user.id}`;
      localStorage.removeItem(storageKey);
    }
  }, [user?.id]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
