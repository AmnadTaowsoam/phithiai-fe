'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconUsers,
  IconHeart,
  IconCheck,
  IconAlertCircle,
  IconX,
  IconEye,
  IconClock
} from '@tabler/icons-react';

export type NotificationType = 'viewing' | 'booking' | 'completion' | 'alert' | 'achievement';

export interface LiveNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  icon?: React.ReactNode;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface LiveNotificationToastProps {
  notifications: LiveNotification[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  maxVisible?: number;
}

const NOTIFICATION_ICONS: Record<NotificationType, React.ReactNode> = {
  viewing: <IconUsers className="w-5 h-5" />,
  booking: <IconCheck className="w-5 h-5" />,
  completion: <IconHeart className="w-5 h-5" />,
  alert: <IconAlertCircle className="w-5 h-5" />,
  achievement: <IconEye className="w-5 h-5" />
};

const NOTIFICATION_COLORS: Record<NotificationType, string> = {
  viewing: 'from-blue-500 to-cyan-500',
  booking: 'from-green-500 to-emerald-500',
  completion: 'from-pink-500 to-rose-500',
  alert: 'from-amber-500 to-orange-500',
  achievement: 'from-purple-500 to-indigo-500'
};

const NOTIFICATION_BACKGROUNDS: Record<NotificationType, string> = {
  viewing: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  booking: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  completion: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
  alert: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
  achievement: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
};

export default function LiveNotificationToast({
  notifications,
  onDismiss,
  position = 'top-right',
  maxVisible = 3
}: LiveNotificationToastProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<LiveNotification[]>([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, maxVisible));
  }, [notifications, maxVisible]);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getIcon = (notification: LiveNotification) => {
    return notification.icon || NOTIFICATION_ICONS[notification.type];
  };

  return (
    <div className={`fixed z-50 ${getPositionClasses()} space-y-2 pointer-events-none`}>
      <AnimatePresence mode="popLayout">
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: position.includes('right') ? 100 : -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: position.includes('right') ? 100 : -100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`pointer-events-auto w-80 ${NOTIFICATION_BACKGROUNDS[notification.type]} rounded-xl shadow-lg border-2 overflow-hidden`}
          >
            {/* Gradient Header */}
            <div className={`bg-gradient-to-r ${NOTIFICATION_COLORS[notification.type]} p-3`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  {getIcon(notification)}
                  <span className="font-semibold text-sm">
                    {notification.title}
                  </span>
                </div>
                <button
                  onClick={() => onDismiss(notification.id)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <IconX className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {notification.message}
              </p>

              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className="mt-2 w-full py-2 px-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  {notification.action.label}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing notifications
export function useLiveNotifications() {
  const [notifications, setNotifications] = useState<LiveNotification[]>([]);

  const addNotification = (notification: Omit<LiveNotification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification: LiveNotification = { ...notification, id };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-dismiss after duration
    if (notification.duration !== undefined) {
      const duration = notification.duration || 5000;
      setTimeout(() => {
        dismissNotification(id);
      }, duration);
    }

    return id;
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const dismissAll = () => {
    setNotifications([]);
  };

  // Preset notification creators
  const showViewingNotification = (count: number, itemName?: string) => {
    return addNotification({
      type: 'viewing',
      title: 'Live Activity',
      message: itemName
        ? `${count} people are viewing ${itemName} right now`
        : `${count} people are browsing this page`,
      icon: <IconUsers className="w-5 h-5" />,
      duration: 4000
    });
  };

  const showBookingNotification = (itemName: string, location?: string) => {
    return addNotification({
      type: 'booking',
      title: 'New Booking',
      message: location
        ? `Someone just booked ${itemName} in ${location}`
        : `Someone just booked ${itemName}`,
      icon: <IconCheck className="w-5 h-5" />,
      duration: 6000
    });
  };

  const showCompletionNotification = (itemName: string, vendorName: string) => {
    return addNotification({
      type: 'completion',
      title: 'Ceremony Completed',
      message: `${vendorName} successfully completed ${itemName}`,
      icon: <IconHeart className="w-5 h-5" />,
      duration: 8000
    });
  };

  const showAchievementNotification = (achievement: string, description: string) => {
    return addNotification({
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: `${achievement}: ${description}`,
      icon: <IconEye className="w-5 h-5" />,
      duration: 10000
    });
  };

  const showAlertNotification = (title: string, message: string, action?: LiveNotification['action']) => {
    return addNotification({
      type: 'alert',
      title,
      message,
      icon: <IconAlertCircle className="w-5 h-5" />,
      duration: 8000,
      action
    });
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    dismissAll,
    showViewingNotification,
    showBookingNotification,
    showCompletionNotification,
    showAchievementNotification,
    showAlertNotification
  };
}
