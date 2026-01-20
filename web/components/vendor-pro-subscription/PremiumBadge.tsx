'use client';

import { motion } from 'framer-motion';
import {
  IconStar,
  IconShieldCheck,
  IconTrophy,
  IconSparkles
} from '@tabler/icons-react';
import type { PremiumBadge as PremiumBadgeType } from './types';

interface PremiumBadgeProps {
  badge: PremiumBadgeType;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export function PremiumBadge({ badge, size = 'md', showTooltip = true }: PremiumBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const getIcon = () => {
    switch (badge.type) {
      case 'pro':
        return <IconSparkles className={iconSize[size]} />;
      case 'verified':
        return <IconShieldCheck className={iconSize[size]} />;
      case 'top-rated':
        return <IconTrophy className={iconSize[size]} />;
      case 'featured':
        return <IconStar className={iconSize[size]} />;
      default:
        return <IconStar className={iconSize[size]} />;
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizeClasses[size]}`}
        style={{
          backgroundColor: badge.color,
          color: 'white'
        }}
      >
        {getIcon()}
        <span>{badge.name}</span>
      </motion.div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="font-semibold mb-1">{badge.name}</div>
          <div className="text-gray-300 mb-2">{badge.description}</div>
          {badge.requirements.length > 0 && (
            <div className="border-t border-gray-700 pt-2">
              <div className="text-gray-400 mb-1">Requirements:</div>
              <ul className="space-y-1">
                {badge.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-green-400">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}

// Badge presets
export const BADGE_PRESETS: PremiumBadgeType[] = [
  {
    id: 'pro',
    type: 'pro',
    name: 'Pro',
    description: 'Premium vendor with advanced features',
    icon: '⭐',
    color: '#9333ea',
    requirements: [
      'Active Phithiai Pro subscription',
      'Minimum 50 completed bookings',
      '4.5+ average rating'
    ]
  },
  {
    id: 'verified',
    type: 'verified',
    name: 'Verified',
    description: 'Identity and business verified',
    icon: '✓',
    color: '#10b981',
    requirements: [
      'Business license verified',
      'Identity verification complete',
      'Bank account verified'
    ]
  },
  {
    id: 'top-rated',
    type: 'top-rated',
    name: 'Top Rated',
    description: 'Consistently excellent reviews',
    icon: '🏆',
    color: '#f59e0b',
    requirements: [
      '4.8+ average rating',
      '100+ completed bookings',
      '98%+ positive reviews'
    ]
  },
  {
    id: 'featured',
    type: 'featured',
    name: 'Featured',
    description: 'Highlighted in search results',
    icon: '💎',
    color: '#ec4899',
    requirements: [
      'Business or Enterprise plan',
      'Featured placement enabled',
      'Active subscription'
    ]
  }
];

// Badge grid component for vendor listings
interface BadgeGridProps {
  badges: PremiumBadgeType[];
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeGrid({ badges, size = 'sm' }: BadgeGridProps) {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <PremiumBadge key={badge.id} badge={badge} size={size} />
      ))}
    </div>
  );
}

// Vendor card with premium badges
interface VendorCardWithBadgesProps {
  vendorName: string;
  vendorImage: string;
  rating: number;
  reviewCount: number;
  badges: PremiumBadgeType[];
  category: string;
  location: string;
}

export function VendorCardWithBadges({
  vendorName,
  vendorImage,
  rating,
  reviewCount,
  badges,
  category,
  location
}: VendorCardWithBadgesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative">
        {/* Vendor Image */}
        <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 relative">
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            {vendorImage}
          </div>
          
          {/* Badges overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {badges.slice(0, 3).map((badge) => (
              <PremiumBadge key={badge.id} badge={badge} size="sm" showTooltip={false} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{vendorName}</h3>
              <p className="text-sm text-gray-500">{category} • {location}</p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <IconStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-gray-900">{rating}</span>
              <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>
          </div>

          {/* All badges */}
          <BadgeGrid badges={badges} size="sm" />
        </div>
      </div>
    </motion.div>
  );
}
