import { useContext } from 'react';
import { NotificationContext } from './NotificationProvider';
import { NotificationContextType } from './types';

export function useNotifications(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
