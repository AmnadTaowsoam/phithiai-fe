'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  IconTrophy,
  IconStar,
  IconAward,
  IconMedal,
  IconCrown,
  IconDiamond,
  IconLock,
  IconCheck
} from '@tabler/icons-react';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  tier: AchievementTier;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  target?: number;
  category: 'sales' | 'reviews' | 'completions' | 'special';
}

interface AchievementBadgeProps {
  badge: AchievementBadge;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showProgress?: boolean;
  onClick?: () => void;
}

const TIER_CONFIG: Record<AchievementTier, {
  gradient: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
}> = {
  bronze: {
    gradient: 'from-amber-600 to-amber-800',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-700 dark:text-amber-400',
    icon: <IconMedal className="w-6 h-6" />
  },
  silver: {
    gradient: 'from-gray-400 to-gray-600',
    bgColor: 'bg-gray-50 dark:bg-gray-700/20',
    textColor: 'text-gray-700 dark:text-gray-400',
    icon: <IconAward className="w-6 h-6" />
  },
  gold: {
    gradient: 'from-yellow-500 to-amber-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    textColor: 'text-yellow-700 dark:text-yellow-400',
    icon: <IconTrophy className="w-6 h-6" />
  },
  platinum: {
    gradient: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-700 dark:text-purple-400',
    icon: <IconStar className="w-6 h-6" />
  },
  diamond: {
    gradient: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
    textColor: 'text-cyan-700 dark:text-cyan-400',
    icon: <IconDiamond className="w-6 h-6" />
  }
};

const SIZE_CONFIG = {
  sm: { container: 'w-12 h-12', icon: 'text-xl' },
  md: { container: 'w-16 h-16', icon: 'text-2xl' },
  lg: { container: 'w-20 h-20', icon: 'text-3xl' },
  xl: { container: 'w-24 h-24', icon: 'text-4xl' }
};

export default function AchievementBadge({
  badge,
  size = 'md',
  showProgress = false,
  onClick
}: AchievementBadgeProps) {
  const config = TIER_CONFIG[badge.tier];
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      {/* Badge Container */}
      <div
        className={`${sizeConfig.container} ${config.bgColor} rounded-full flex items-center justify-center shadow-lg transition-all ${
          onClick ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        {badge.unlocked ? (
          <div className={`bg-gradient-to-br ${config.gradient} w-full h-full rounded-full flex items-center justify-center ${config.textColor}`}>
            {badge.icon || config.icon}
          </div>
        ) : (
          <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
            <IconLock className={`${sizeConfig.icon}`} />
          </div>
        )}
      </div>

      {/* Progress Ring */}
      {showProgress && badge.progress !== undefined && badge.target !== undefined && (
        <div className={`absolute inset-0 rounded-full border-4 ${
          badge.unlocked
            ? 'border-green-500'
            : 'border-gray-300 dark:border-gray-600'
        }`}>
          <div
            className={`absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-transparent ${
              badge.unlocked
                ? 'border-green-500'
                : 'border-purple-500'
            }`}
            style={{
              transform: `rotate(${(badge.progress / badge.target) * 360}deg)`,
              transition: 'transform 0.5s ease-out'
            }}
          />
        </div>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className={`px-3 py-2 rounded-lg shadow-xl ${config.bgColor} border border-gray-200 dark:border-gray-700`}>
          <div className="flex items-center gap-2 mb-1">
            {badge.unlocked ? (
              <IconCheck className={`w-4 h-4 ${config.textColor}`} />
            ) : (
              <IconLock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            )}
            <span className={`font-semibold text-sm ${config.textColor}`}>
              {badge.name}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 max-w-[200px]">
            {badge.description}
          </p>
          {badge.unlockedAt && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Unlocked {badge.unlockedAt.toLocaleDateString()}
            </p>
          )}
          {showProgress && !badge.unlocked && badge.progress !== undefined && badge.target !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className={`font-medium ${config.textColor}`}>
                  {badge.progress} / {badge.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className={`bg-gradient-to-r ${config.gradient} h-1.5 rounded-full transition-all`}
                  style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// Achievement Grid Component
interface AchievementGridProps {
  badges: AchievementBadge[];
  onBadgeClick?: (badge: AchievementBadge) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showProgress?: boolean;
  filter?: 'all' | 'unlocked' | 'locked';
}

export function AchievementGrid({
  badges,
  onBadgeClick,
  size = 'md',
  showProgress = true,
  filter = 'all'
}: AchievementGridProps) {
  const filteredBadges = badges.filter(badge => {
    if (filter === 'unlocked') return badge.unlocked;
    if (filter === 'locked') return !badge.unlocked;
    return true;
  });

  const categories = ['sales', 'reviews', 'completions', 'special'] as const;

  return (
    <div className="space-y-8">
      {categories.map(category => {
        const categoryBadges = filteredBadges.filter(b => b.category === category);

        if (categoryBadges.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 capitalize">
              {category} Achievements
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categoryBadges.map(badge => (
                <AchievementBadge
                  key={badge.id}
                  badge={badge}
                  size={size}
                  showProgress={showProgress}
                  onClick={() => onBadgeClick?.(badge)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Achievement Card Component
interface AchievementCardProps {
  badge: AchievementBadge;
  onClick?: () => void;
}

export function AchievementCard({ badge, onClick }: AchievementCardProps) {
  const config = TIER_CONFIG[badge.tier];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full p-6 rounded-2xl border-2 transition-all ${
        badge.unlocked
          ? `border-${badge.tier === 'bronze' ? 'amber' : badge.tier === 'silver' ? 'gray' : badge.tier === 'gold' ? 'yellow' : badge.tier === 'platinum' ? 'purple' : 'cyan'}-500 bg-white dark:bg-gray-800`
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Badge Icon */}
        <div className="flex-shrink-0">
          <AchievementBadge badge={badge} size="lg" showProgress={false} />
        </div>

        {/* Badge Info */}
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`font-bold text-lg ${badge.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              {badge.name}
            </h4>
            {badge.unlocked && (
              <IconCrown className={`w-5 h-5 ${config.textColor}`} />
            )}
          </div>
          <p className={`text-sm ${badge.unlocked ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
            {badge.description}
          </p>

          {/* Progress */}
          {badge.progress !== undefined && badge.target !== undefined && !badge.unlocked && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className={`font-medium ${config.textColor}`}>
                  {badge.progress} / {badge.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${config.gradient} h-2 rounded-full transition-all`}
                  style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Unlocked Date */}
          {badge.unlockedAt && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Unlocked on {badge.unlockedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// Achievement Stats Component
interface AchievementStatsProps {
  badges: AchievementBadge[];
}

export function AchievementStats({ badges }: AchievementStatsProps) {
  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalCount = badges.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  const tierCounts = badges.reduce((acc, badge) => {
    if (badge.unlocked) {
      acc[badge.tier] = (acc[badge.tier] || 0) + 1;
    }
    return acc;
  }, {} as Record<AchievementTier, number>);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Total Progress</span>
          <IconTrophy className="w-5 h-5 text-purple-600" />
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {percentage}%
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {unlockedCount} / {totalCount}
        </div>
      </div>

      {/* Bronze */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 shadow-lg border-2 border-amber-200 dark:border-amber-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-amber-700 dark:text-amber-400">Bronze</span>
          <IconMedal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">
          {tierCounts.bronze || 0}
        </div>
      </div>

      {/* Silver */}
      <div className="bg-gray-50 dark:bg-gray-700/20 rounded-xl p-4 shadow-lg border-2 border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700 dark:text-gray-400">Silver</span>
          <IconAward className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-gray-700 dark:text-gray-400">
          {tierCounts.silver || 0}
        </div>
      </div>

      {/* Gold */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 shadow-lg border-2 border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-yellow-700 dark:text-yellow-400">Gold</span>
          <IconTrophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
          {tierCounts.gold || 0}
        </div>
      </div>
    </div>
  );
}
