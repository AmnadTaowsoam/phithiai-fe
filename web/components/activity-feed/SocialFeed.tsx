'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconUsers,
  IconHeart,
  IconCheck,
  IconClock,
  IconMapPin,
  IconCurrency
} from '@tabler/icons-react';

// Types
export type SocialActivityType = 'booking' | 'completion' | 'viewing';

export interface SocialActivity {
  id: string;
  type: SocialActivityType;
  timestamp: Date;
  anonymized: boolean;
  data: {
    itemName: string;
    location?: string;
    price?: number;
    currency?: string;
    vendorName?: string;
    category?: string;
    viewerCount?: number;
  };
}

// SocialFeed Component
interface SocialFeedProps {
  activities: SocialActivity[];
  maxItems?: number;
}

export function SocialFeed({ activities, maxItems = 10 }: SocialFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  const getActivityIcon = (type: SocialActivityType) => {
    switch (type) {
      case 'booking':
        return <IconCheck className="w-5 h-5 text-green-600" />;
      case 'completion':
        return <IconHeart className="w-5 h-5 text-pink-600" />;
      case 'viewing':
        return <IconUsers className="w-5 h-5 text-blue-600" />;
    }
  };

  const getActivityColor = (type: SocialActivityType) => {
    switch (type) {
      case 'booking':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'completion':
        return 'bg-pink-100 dark:bg-pink-900/30';
      case 'viewing':
        return 'bg-blue-100 dark:bg-blue-900/30';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {displayActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.anonymized ? 'Someone' : 'A user'} {activity.type === 'booking' && 'booked'}{' '}
                {activity.type === 'completion' && 'completed'}{' '}
                {activity.type === 'viewing' && 'is viewing'}{' '}
                <span className="font-semibold">{activity.data.itemName}</span>
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-600 dark:text-gray-400">
                <IconClock className="w-3 h-3" />
                {formatTimeAgo(activity.timestamp)}
                {activity.data.location && (
                  <>
                    <span>•</span>
                    <IconMapPin className="w-3 h-3" />
                    {activity.data.location}
                  </>
                )}
                {activity.data.price && (
                  <>
                    <span>•</span>
                    <IconCurrency className="w-3 h-3" />
                    {activity.data.currency} {activity.data.price.toLocaleString()}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {displayActivities.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No recent activity</p>
        </div>
      )}
    </div>
  );
}

// CompactFeed Component
interface CompactFeedProps {
  activities: SocialActivity[];
  maxItems?: number;
}

export function CompactFeed({ activities, maxItems = 5 }: CompactFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <div className="space-y-2">
      {displayActivities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
        >
          {activity.type === 'booking' && <IconCheck className="w-4 h-4 text-green-600" />}
          {activity.type === 'completion' && <IconHeart className="w-4 h-4 text-pink-600" />}
          {activity.type === 'viewing' && <IconUsers className="w-4 h-4 text-blue-600" />}
          <span className="truncate">{activity.data.itemName}</span>
        </div>
      ))}
    </div>
  );
}

// LiveCounter Component
interface LiveCounterProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export function LiveCounter({ count, size = 'md', showPulse = false }: LiveCounterProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full ${sizeClasses[size]} ${showPulse ? 'animate-pulse' : ''}`}>
      <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
      <span className="font-semibold">{count}</span>
    </div>
  );
}
