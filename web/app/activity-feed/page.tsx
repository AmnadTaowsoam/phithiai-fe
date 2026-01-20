'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  IconUsers,
  IconHeart,
  IconCheck,
  IconClock,
  IconFilter,
  IconRefresh,
  IconTrendingUp,
  IconActivity,
  IconStarFilled
} from '@tabler/icons-react';
import { SocialFeed, CompactFeed, LiveCounter, SocialActivity } from '../../components/activity-feed/SocialFeed';
import { useLiveNotifications } from '../../components/notifications/LiveNotificationToast';
import { AchievementGrid, AchievementStats, AchievementBadge } from '../../components/achievements/AchievementBadge';

export default function ActivityFeedPage() {
  const [filter, setFilter] = useState<'all' | 'bookings' | 'completions' | 'viewing'>('all');
  const [activities, setActivities] = useState<SocialActivity[]>([]);
  const [achievements, setAchievements] = useState<AchievementBadge[]>([]);
  const { showViewingNotification, showBookingNotification, showCompletionNotification } = useLiveNotifications();

  // Mock data initialization
  useEffect(() => {
    // Mock activities
    const mockActivities: SocialActivity[] = [
      {
        id: 'a1',
        type: 'viewing',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        anonymized: true,
        data: {
          itemName: 'Premium Wedding Package',
          category: 'Wedding',
          viewerCount: 5
        }
      },
      {
        id: 'a2',
        type: 'booking',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        anonymized: true,
        data: {
          itemName: 'Royal Thai Cuisine Package',
          location: 'Bangkok',
          price: 85000,
          currency: 'THB'
        }
      },
      {
        id: 'a3',
        type: 'completion',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        anonymized: false,
        data: {
          itemName: 'Elegant Photography Service',
          vendorName: 'Siam Wedding Planner'
        }
      },
      {
        id: 'a4',
        type: 'viewing',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        anonymized: true,
        data: {
          itemName: 'Traditional Ordination Package',
          category: 'Ordination',
          viewerCount: 3
        }
      },
      {
        id: 'a5',
        type: 'booking',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        anonymized: true,
        data: {
          itemName: 'Grand Ballroom Venue',
          location: 'Chiang Mai',
          price: 120000,
          currency: 'THB'
        }
      },
      {
        id: 'a6',
        type: 'completion',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        anonymized: false,
        data: {
          itemName: 'Floral Arrangement Service',
          vendorName: 'Bloom & Blossom'
        }
      },
      {
        id: 'a7',
        type: 'viewing',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        anonymized: true,
        data: {
          itemName: 'Funeral Service Package',
          category: 'Funeral',
          viewerCount: 8
        }
      },
      {
        id: 'a8',
        type: 'booking',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        anonymized: true,
        data: {
          itemName: 'Annual Merit Ceremony',
          location: 'Phuket',
          price: 45000,
          currency: 'THB'
        }
      }
    ];

    setActivities(mockActivities);

    // Mock achievements
    const mockAchievements: AchievementBadge[] = [
      {
        id: 'ach1',
        name: 'First Sale',
        description: 'Complete your first booking',
        tier: 'bronze',
        icon: <IconCheck className="w-6 h-6" />,
        unlocked: true,
        unlockedAt: new Date('2024-01-15'),
        progress: 1,
        target: 1,
        category: 'sales'
      },
      {
        id: 'ach2',
        name: 'Rising Star',
        description: 'Receive 10 positive reviews',
        tier: 'silver',
        icon: <IconStarFilled className="w-6 h-6" />,
        unlocked: true,
        unlockedAt: new Date('2024-02-20'),
        progress: 15,
        target: 10,
        category: 'reviews'
      },
      {
        id: 'ach3',
        name: 'Completion Master',
        description: 'Complete 50 ceremonies',
        tier: 'gold',
        icon: <IconHeart className="w-6 h-6" />,
        unlocked: true,
        unlockedAt: new Date('2024-03-10'),
        progress: 52,
        target: 50,
        category: 'completions'
      },
      {
        id: 'ach4',
        name: 'Top Vendor',
        description: 'Reach top 10% in your category',
        tier: 'platinum',
        icon: <IconTrendingUp className="w-6 h-6" />,
        unlocked: true,
        unlockedAt: new Date('2024-04-05'),
        progress: 1,
        target: 1,
        category: 'sales'
      },
      {
        id: 'ach5',
        name: 'Diamond Elite',
        description: 'Complete 100 ceremonies with 5-star rating',
        tier: 'diamond',
        icon: <IconTrendingUp className="w-6 h-6" />,
        unlocked: false,
        progress: 78,
        target: 100,
        category: 'completions'
      },
      {
        id: 'ach6',
        name: 'Review Champion',
        description: 'Receive 50 positive reviews',
        tier: 'gold',
        icon: <IconStarFilled className="w-6 h-6" />,
        unlocked: false,
        progress: 32,
        target: 50,
        category: 'reviews'
      },
      {
        id: 'ach7',
        name: 'Sales Milestone',
        description: 'Complete 25 bookings',
        tier: 'silver',
        icon: <IconCheck className="w-6 h-6" />,
        unlocked: false,
        progress: 18,
        target: 25,
        category: 'sales'
      },
      {
        id: 'ach8',
        name: 'Community Leader',
        description: 'Help 100 users in forums',
        tier: 'platinum',
        icon: <IconUsers className="w-6 h-6" />,
        unlocked: false,
        progress: 45,
        target: 100,
        category: 'special'
      }
    ];

    setAchievements(mockAchievements);
  }, []);

  // Simulate live notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      if (randomActivity.type === 'viewing' && randomActivity.data.viewerCount) {
        showViewingNotification(randomActivity.data.viewerCount, randomActivity.data.itemName);
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [activities]);

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'bookings') return activity.type === 'booking';
    if (filter === 'completions') return activity.type === 'completion';
    if (filter === 'viewing') return activity.type === 'viewing';
    return true;
  });

  const handleRefresh = () => {
    // Simulate refresh
    showBookingNotification('New bookings available!', 'Bangkok');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <IconActivity className="w-6 h-6 text-white" />
                </div>
                Platform Activity Feed
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time bookings, completions, and live activity
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <IconRefresh className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <IconCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Bookings Today</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activities.filter(a => a.type === 'booking').length}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                    <IconHeart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Completions Today</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activities.filter(a => a.type === 'completion').length}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <IconUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Viewers</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activities.filter(a => a.type === 'viewing').reduce((sum, a) => sum + (a.data.viewerCount || 0), 0)}
                </div>
              </motion.div>
            </div>

            {/* Live Activity Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <IconClock className="w-6 h-6 text-purple-600" />
                  Live Activity
                </h2>
                <div className="flex items-center gap-2">
                  {/* Filter Buttons */}
                  <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    {(['all', 'bookings', 'completions', 'viewing'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          filter === f
                            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleRefresh}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <IconRefresh className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <SocialFeed activities={filteredActivities} maxItems={15} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <IconTrendingUp className="w-5 h-5 text-purple-600" />
                Achievement Stats
              </h3>
              <AchievementStats badges={achievements} />
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <IconStarFilled className="w-5 h-5 text-purple-600" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {achievements.filter(a => a.unlocked).slice(0, 5).map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      achievement.tier === 'bronze' ? 'bg-amber-600' :
                      achievement.tier === 'silver' ? 'bg-gray-500' :
                      achievement.tier === 'gold' ? 'bg-yellow-500' :
                      achievement.tier === 'platinum' ? 'bg-purple-500' :
                      'bg-cyan-500'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {achievement.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {achievement.unlockedAt?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Live Viewers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <IconUsers className="w-5 h-5" />
                Live Now
              </h3>
              <div className="space-y-3">
                {activities.filter(a => a.type === 'viewing').slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {activity.data.itemName}
                      </p>
                      {activity.data.category && (
                        <p className="text-xs opacity-75">
                          {activity.data.category}
                        </p>
                      )}
                    </div>
                    <LiveCounter
                      count={activity.data.viewerCount || 0}
                      size="sm"
                      showPulse={true}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
