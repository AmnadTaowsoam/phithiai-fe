'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  IconHeart,
  IconCheck,
  IconUsers,
  IconClock,
  IconMapPin,
  IconShieldCheck
} from '@tabler/icons-react';

export type ActivityType = 'booking' | 'completion' | 'viewing';

export interface SocialActivity {
  id: string;
  type: ActivityType;
  timestamp: Date;
  anonymized: boolean;
  data: {
    itemName?: string;
    location?: string;
    vendorName?: string;
    category?: string;
    viewerCount?: number;
    price?: number;
    currency?: string;
  };
}

interface SocialFeedProps {
  activities: SocialActivity[];
  maxItems?: number;
  showLocation?: boolean;
  showPrice?: boolean;
}

export default function SocialFeed({
  activities,
  maxItems = 10,
  showLocation = true,
  showPrice = true
}: SocialFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'booking':
        return <IconCheck className="w-5 h-5" />;
      case 'completion':
        return <IconHeart className="w-5 h-5" />;
      case 'viewing':
        return <IconUsers className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case 'booking':
        return 'from-green-500 to-emerald-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'completion':
        return 'from-pink-500 to-rose-500 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800';
      case 'viewing':
        return 'from-blue-500 to-cyan-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-3">
      {displayActivities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-xl border-2 ${getActivityColor(activity.type)}`}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${getActivityColor(activity.type).split(' ')[0]} flex items-center justify-center text-white`}>
              {getActivityIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {activity.type === 'booking' && 'New Booking'}
                  {activity.type === 'completion' && 'Ceremony Completed'}
                  {activity.type === 'viewing' && 'Live Activity'}
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <IconClock className="w-3 h-3" />
                  <span>{formatTime(activity.timestamp)}</span>
                </div>
              </div>

              {/* Activity Details */}
              <div className="space-y-1">
                {activity.type === 'booking' && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {activity.anonymized ? 'Someone' : 'A customer'} booked{' '}
                    <span className="font-medium">
                      {activity.data.itemName}
                    </span>
                    {showLocation && activity.data.location && (
                      <>
                        {' '}in{' '}
                        <span className="flex items-center gap-1">
                          <IconMapPin className="w-3 h-3" />
                          {activity.data.location}
                        </span>
                      </>
                    )}
                  </p>
                )}

                {activity.type === 'completion' && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">
                      {activity.data.vendorName}
                    </span>
                    {' '}successfully completed{' '}
                    <span className="font-medium">
                      {activity.data.itemName}
                    </span>
                  </p>
                )}

                {activity.type === 'viewing' && activity.data.viewerCount && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">
                      {activity.data.viewerCount}
                    </span>
                    {' '}people are viewing{' '}
                    <span className="font-medium">
                      {activity.data.itemName}
                    </span>
                    {activity.data.category && (
                      <>
                        {' '}in{' '}
                        <span className="text-gray-600 dark:text-gray-400">
                          {activity.data.category}
                        </span>
                      </>
                    )}
                  </p>
                )}

                {showPrice && activity.data.price && activity.data.currency && (
                  <div className="flex items-center gap-2 mt-2">
                    <IconShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {formatPrice(activity.data.price, activity.data.currency)}
                    </span>
                  </div>
                )}
              </div>

              {/* Anonymized Badge */}
              {activity.anonymized && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400">
                  <IconShieldCheck className="w-3 h-3" />
                  <span>Anonymous</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Compact Feed Component
interface CompactFeedProps {
  activities: SocialActivity[];
  maxItems?: number;
}

export function CompactFeed({ activities, maxItems = 5 }: CompactFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    return `${hours}h`;
  };

  return (
    <div className="space-y-2">
      {displayActivities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          {/* Icon */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white ${
            activity.type === 'booking' ? 'bg-green-500' :
            activity.type === 'completion' ? 'bg-pink-500' :
            'bg-blue-500'
          }`}>
            {activity.type === 'booking' && <IconCheck className="w-4 h-4" />}
            {activity.type === 'completion' && <IconHeart className="w-4 h-4" />}
            {activity.type === 'viewing' && <IconUsers className="w-4 h-4" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 dark:text-white">
              {activity.type === 'booking' && 'New booking'}
              {activity.type === 'completion' && 'Ceremony completed'}
              {activity.type === 'viewing' && `${activity.data.viewerCount} viewing`}
            </p>
            {activity.data.itemName && (
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {activity.data.itemName}
              </p>
            )}
          </div>

          {/* Time */}
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 flex-shrink-0">
            <IconClock className="w-3 h-3" />
            <span>{formatTime(activity.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Live Counter Component
interface LiveCounterProps {
  count: number;
  itemName?: string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export function LiveCounter({
  count,
  itemName = 'viewers',
  size = 'md',
  showPulse = true
}: LiveCounterProps) {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2'
  };

  return (
    <div className="inline-flex items-center gap-2">
      {showPulse && (
        <div className="relative">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
        </div>
      )}
      <div className={`inline-flex items-center gap-2 ${sizeClasses[size]} bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full`}>
        <IconUsers className="w-4 h-4 text-green-600 dark:text-green-400" />
        <span className="font-semibold text-green-700 dark:text-green-400">
          {count}
        </span>
      </div>
      {itemName && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {itemName}
        </span>
      )}
    </div>
  );
}
