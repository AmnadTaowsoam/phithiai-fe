'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  IconLock,
  IconSparkles,
  IconTrendingUp,
  IconRocket,
  IconCrown,
  IconChartBar,
  IconBulb,
  IconBrandStripe,
  IconApi,
  IconUsers,
  IconStar,
} from '@tabler/icons-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import type { SubscriptionPlanType } from './types';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path: string;
  requiredPlan?: SubscriptionPlanType;
  badge?: string;
  children?: NavItem[];
}

export interface TierAwareNavigationProps {
  items: NavItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'compact' | 'minimal';
  showBadges?: boolean;
  className?: string;
}

// Features available per plan
const PLAN_FEATURES: Record<SubscriptionPlanType, string[]> = {
  starter: [
    'dashboard',
    'bookings',
    'messages',
    'settings',
    'profile',
  ],
  professional: [
    'dashboard',
    'bookings',
    'messages',
    'settings',
    'profile',
    'analytics',
    'ai-tools',
    'marketing',
  ],
  business: [
    'dashboard',
    'bookings',
    'messages',
    'settings',
    'profile',
    'analytics',
    'ai-tools',
    'marketing',
    'api',
    'custom-branding',
  ],
  enterprise: [
    'dashboard',
    'bookings',
    'messages',
    'settings',
    'profile',
    'analytics',
    'ai-tools',
    'marketing',
    'api',
    'custom-branding',
    'integrations',
    'team-management',
  ],
};

// Default navigation items for vendors
export const DEFAULT_VENDOR_NAV: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <IconChartBar className="w-5 h-5" />,
    path: '/dashboard',
  },
  {
    id: 'bookings',
    label: 'Bookings',
    icon: <IconUsers className="w-5 h-5" />,
    path: '/bookings',
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: <IconBulb className="w-5 h-5" />,
    path: '/messages',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <IconTrendingUp className="w-5 h-5" />,
    path: '/analytics',
    requiredPlan: 'professional',
  },
  {
    id: 'ai-tools',
    label: 'AI Tools',
    icon: <IconSparkles className="w-5 h-5" />,
    path: '/ai-tools',
    requiredPlan: 'professional',
    badge: 'PRO',
  },
  {
    id: 'marketing',
    label: 'Marketing Studio',
    icon: <IconRocket className="w-5 h-5" />,
    path: '/marketing',
    requiredPlan: 'professional',
    badge: 'PRO',
  },
  {
    id: 'api',
    label: 'API Access',
    icon: <IconApi className="w-5 h-5" />,
    path: '/api',
    requiredPlan: 'business',
  },
  {
    id: 'custom-branding',
    label: 'Custom Branding',
    icon: <IconBrandStripe className="w-5 h-5" />,
    path: '/branding',
    requiredPlan: 'business',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: <IconLock className="w-5 h-5" />,
    path: '/integrations',
    requiredPlan: 'enterprise',
  },
  {
    id: 'team-management',
    label: 'Team',
    icon: <IconUsers className="w-5 h-5" />,
    path: '/team',
    requiredPlan: 'enterprise',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <IconLock className="w-5 h-5" />,
    path: '/settings',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <IconStar className="w-5 h-5" />,
    path: '/profile',
  },
];

export function TierAwareNavigation({
  items,
  orientation = 'horizontal',
  variant = 'default',
  showBadges = true,
  className = '',
}: TierAwareNavigationProps) {
  const { currentPlan, isFeatureAvailable, setShowUpgradeModal, checkFeatureLimit } = useSubscription();

  const getPlanOrder = (plan: SubscriptionPlanType): number => {
    const order: SubscriptionPlanType[] = ['starter', 'professional', 'business', 'enterprise'];
    return order.indexOf(plan);
  };

  const isFeatureLocked = (item: NavItem): boolean => {
    if (!item.requiredPlan) return false;
    if (!currentPlan) return true;

    // Check if feature is available in current plan
    if (!isFeatureAvailable(item.id)) {
      return true;
    }

    // Check if user has reached the limit for this feature
    const { allowed } = checkFeatureLimit(item.id);
    return !allowed;
  };

  const getUpgradePlan = (item: NavItem): SubscriptionPlanType | null => {
    if (!item.requiredPlan) return null;
    if (!currentPlan) return item.requiredPlan;

    // Find the minimum plan that has this feature
    const plans: SubscriptionPlanType[] = ['starter', 'professional', 'business', 'enterprise'];
    for (const plan of plans) {
      if (PLAN_FEATURES[plan].includes(item.id)) {
        if (getPlanOrder(plan) > getPlanOrder(currentPlan)) {
          return plan;
        }
      }
    }
    return null;
  };

  const handleLockedClick = (item: NavItem) => {
    const upgradePlan = getUpgradePlan(item);
    if (upgradePlan) {
      setShowUpgradeModal(true);
    }
  };

  const renderHorizontal = () => (
    <nav className={`flex items-center gap-1 overflow-x-auto ${className}`}>
      {items.map((item, index) => {
        const locked = isFeatureLocked(item);
        const upgradePlan = getUpgradePlan(item);

        return (
          <motion.button
            key={item.id}
            onClick={() => locked ? handleLockedClick(item) : null}
            disabled={locked}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${variant === 'compact' ? 'px-3 py-1.5 text-xs' : ''}
              ${variant === 'minimal' ? 'px-2 py-1 text-xs' : ''}
              ${locked
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              }
            `}
          >
            {variant !== 'minimal' && item.icon}
            <span>{item.label}</span>
            {showBadges && item.badge && !locked && (
              <span className="px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded">
                {item.badge}
              </span>
            )}
            {locked && (
              <IconLock className="w-3 h-3 text-gray-400 dark:text-gray-500" />
            )}
            {locked && upgradePlan && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );

  const renderVertical = () => (
    <nav className={`flex flex-col gap-1 ${className}`}>
      {items.map((item, index) => {
        const locked = isFeatureLocked(item);
        const upgradePlan = getUpgradePlan(item);

        return (
          <motion.button
            key={item.id}
            onClick={() => locked ? handleLockedClick(item) : null}
            disabled={locked}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left
              ${variant === 'compact' ? 'px-3 py-2 text-xs' : ''}
              ${variant === 'minimal' ? 'px-2 py-1.5 text-xs' : ''}
              ${locked
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              }
            `}
          >
            {variant !== 'minimal' && item.icon}
            <span className="flex-1">{item.label}</span>
            {showBadges && item.badge && !locked && (
              <span className="px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded">
                {item.badge}
              </span>
            )}
            {locked && (
              <IconLock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            )}
            {locked && upgradePlan && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );

  if (orientation === 'horizontal') return renderHorizontal();
  return renderVertical();
}

// Hook to filter navigation items based on subscription tier
export function useTierAwareNavigation(items: NavItem[]): NavItem[] {
  const { currentPlan, isFeatureAvailable } = useSubscription();

  return items.filter((item) => {
    if (!item.requiredPlan) return true;
    if (!currentPlan) return false;
    return isFeatureAvailable(item.id);
  });
}

// Component for locked feature tooltip
export interface LockedFeatureTooltipProps {
  featureId: string;
  featureName: string;
  requiredPlan: SubscriptionPlanType;
  children: React.ReactNode;
}

export function LockedFeatureTooltip({
  featureId,
  featureName,
  requiredPlan,
  children,
}: LockedFeatureTooltipProps) {
  const { currentPlan, setShowUpgradeModal } = useSubscription();

  const getPlanOrder = (plan: SubscriptionPlanType): number => {
    const order: SubscriptionPlanType[] = ['starter', 'professional', 'business', 'enterprise'];
    return order.indexOf(plan);
  };

  const needsUpgrade = currentPlan && getPlanOrder(requiredPlan) > getPlanOrder(currentPlan);

  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        <div className="font-semibold mb-1">{featureName}</div>
        <div className="text-gray-300 dark:text-gray-600">
          Requires {requiredPlan} plan
        </div>
        {needsUpgrade && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowUpgradeModal(true);
            }}
            className="mt-2 px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-[10px] font-medium"
          >
            Upgrade Now
          </button>
        )}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
      </div>
    </div>
  );
}

// Component for showing plan upgrade badge on locked features
export interface PlanUpgradeBadgeProps {
  requiredPlan: SubscriptionPlanType;
  currentPlan?: SubscriptionPlanType;
  size?: 'sm' | 'md' | 'lg';
}

export function PlanUpgradeBadge({
  requiredPlan,
  currentPlan,
  size = 'md',
}: PlanUpgradeBadgeProps) {
  const getPlanOrder = (plan: SubscriptionPlanType): number => {
    const order: SubscriptionPlanType[] = ['starter', 'professional', 'business', 'enterprise'];
    return order.indexOf(plan);
  };

  const needsUpgrade = currentPlan && getPlanOrder(requiredPlan) > getPlanOrder(currentPlan);

  if (!needsUpgrade) return null;

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span className={`inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded font-medium ${sizeClasses[size]}`}>
      <IconCrown className="w-3 h-3" />
      {requiredPlan}
    </span>
  );
}
