export type NotificationType = 'course' | 'achievement' | 'system' | 'social' | 'payment';

export interface Notification {
  id: string;
  type: NotificationType;
  icon: string;
  title: string;
  message: string;
  createdAt: number;
  read: boolean;
  link?: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (input: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  clearAll: () => void;
}
