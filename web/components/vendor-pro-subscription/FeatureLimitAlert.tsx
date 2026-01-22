'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconAlertTriangle,
  IconX,
  IconRocket,
  IconSparkles,
  IconArrowRight,
  IconRefresh,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { UpgradeToProModal } from './UpgradeToProModal';

export interface FeatureLimitAlertProps {
  featureId: string;
  featureName: string;
  used: number;
  limit: number;
  resetDate?: Date;
  variant?: 'inline' | 'banner' | 'modal' | 'compact';
  showUpgradeButton?: boolean;
  onUpgradeClick?: () => void;
  onDismiss?: () => void;
}

export function FeatureLimitAlert({
  featureId,
  featureName,
  used,
  limit,
  resetDate,
  variant = 'banner',
  showUpgradeButton = true,
  onUpgradeClick,
  onDismiss,
}: FeatureLimitAlertProps) {
  const { setShowUpgradeModal, currentPlan } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModalState] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const percentage = limit > 0 ? (used / limit) * 100 : 0;
  const isAtLimit = used >= limit;
  const isNearLimit = percentage >= 80 && !isAtLimit;

  const handleUpgradeClick = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      setShowUpgradeModalState(true);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  const getResetText = () => {
    if (!resetDate) return '';
    const now = new Date();
    const diff = resetDate.getTime() - now.getTime();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return 'soon';
  };

  if (dismissed && variant !== 'modal') {
    return null;
  }

  const renderInline = () => (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
      isAtLimit
        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
    }`}>
      <IconAlertTriangle className="w-4 h-4 flex-shrink-0" />
      <span>
        {isAtLimit
          ? `${featureName} limit reached (${used}/${limit})`
          : `${featureName}: ${used}/${limit} used`
        }
      </span>
      {showUpgradeButton && (
        <button
          onClick={handleUpgradeClick}
          className="ml-2 font-medium underline hover:no-underline"
        >
          Upgrade
        </button>
      )}
    </div>
  );

  const renderBanner = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`border-l-4 ${
        isAtLimit
          ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
          : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
      } rounded-r-lg p-4`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${
            isAtLimit
              ? 'bg-red-100 dark:bg-red-900/30'
              : 'bg-yellow-100 dark:bg-yellow-900/30'
          }`}>
            <IconAlertTriangle className={`w-5 h-5 ${
              isAtLimit
                ? 'text-red-600 dark:text-red-400'
                : 'text-yellow-600 dark:text-yellow-400'
            }`} />
          </div>
          <div className="flex-1">
            <h4 className={`font-semibold ${
              isAtLimit
                ? 'text-red-900 dark:text-red-100'
                : 'text-yellow-900 dark:text-yellow-100'
            }`}>
              {isAtLimit ? 'Limit Reached' : 'Limit Warning'}
            </h4>
            <p className={`text-sm mt-1 ${
              isAtLimit
                ? 'text-red-700 dark:text-red-300'
                : 'text-yellow-700 dark:text-yellow-300'
            }`}>
              {isAtLimit
                ? `You've used all ${limit} ${featureName.toLowerCase()} for this billing period.`
                : `You've used ${used} of ${limit} ${featureName.toLowerCase()}.`
              }
              {resetDate && ` Resets in ${getResetText()}.`}
            </p>
            {showUpgradeButton && (
              <button
                onClick={handleUpgradeClick}
                className={`mt-3 px-4 py-2 rounded-lg font-medium text-white text-sm ${
                  isAtLimit
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                <IconRocket className="w-4 h-4 mr-2" />
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <IconX className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
    </motion.div>
  );

  const renderCompact = () => (
    <div className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium ${
      isAtLimit
        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
    }`}>
      <IconAlertTriangle className="w-3 h-3" />
      <span>{used}/{limit}</span>
    </div>
  );

  const renderModal = () => (
    <AnimatePresence>
      {showUpgradeModal && (
        <UpgradeToProModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModalState(false)}
          triggerFeature={featureId}
          currentPlan={currentPlan || undefined}
        />
      )}
    </AnimatePresence>
  );

  if (variant === 'inline') return renderInline();
  if (variant === 'compact') return renderCompact();
  if (variant === 'modal') return renderModal();
  return renderBanner();
}

// Usage Progress Bar Component
export interface UsageProgressBarProps {
  used: number;
  limit: number;
  featureName: string;
  showLabel?: boolean;
  showReset?: boolean;
  resetDate?: Date;
  color?: 'default' | 'green' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

export function UsageProgressBar({
  used,
  limit,
  featureName,
  showLabel = true,
  showReset = true,
  resetDate,
  color = 'default',
  size = 'md',
}: UsageProgressBarProps) {
  const percentage = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const isAtLimit = used >= limit;
  const isNearLimit = percentage >= 80 && !isAtLimit;

  const getColorClasses = () => {
    if (color !== 'default') {
      switch (color) {
        case 'green':
          return {
            bg: 'bg-green-100 dark:bg-green-900/30',
            fill: 'bg-green-500',
            text: 'text-green-700 dark:text-green-300',
          };
        case 'yellow':
          return {
            bg: 'bg-yellow-100 dark:bg-yellow-900/30',
            fill: 'bg-yellow-500',
            text: 'text-yellow-700 dark:text-yellow-300',
          };
        case 'red':
          return {
            bg: 'bg-red-100 dark:bg-red-900/30',
            fill: 'bg-red-500',
            text: 'text-red-700 dark:text-red-300',
          };
      }
    }

    if (isAtLimit) {
      return {
        bg: 'bg-red-100 dark:bg-red-900/30',
        fill: 'bg-red-500',
        text: 'text-red-700 dark:text-red-300',
      };
    }
    if (isNearLimit) {
      return {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        fill: 'bg-yellow-500',
        text: 'text-yellow-700 dark:text-yellow-300',
      };
    }
    return {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      fill: 'bg-blue-500',
      text: 'text-blue-700 dark:text-blue-300',
    };
  };

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = getColorClasses();

  const getResetText = () => {
    if (!resetDate) return '';
    const now = new Date();
    const diff = resetDate.getTime() - now.getTime();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'soon';
  };

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-900 dark:text-white">{featureName}</span>
          <span className={colorClasses.text}>
            {used}/{limit}
          </span>
        </div>
      )}
      <div className={`relative ${colorClasses.bg} rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 ${colorClasses.fill} rounded-full`}
        />
      </div>
      {showReset && resetDate && (
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <IconRefresh className="w-3 h-3" />
            Resets in {getResetText()}
          </span>
          <span>{Math.round(percentage)}% used</span>
        </div>
      )}
    </div>
  );
}

// Feature Limit Card Component
export interface FeatureLimitCardProps {
  title: string;
  description: string;
  features: Array<{
    id: string;
    name: string;
    used: number;
    limit: number;
    icon?: React.ReactNode;
  }>;
  showUpgradeButton?: boolean;
  onUpgradeClick?: () => void;
}

export function FeatureLimitCard({
  title,
  description,
  features,
  showUpgradeButton = true,
  onUpgradeClick,
}: FeatureLimitCardProps) {
  const { setShowUpgradeModal, currentPlan } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModalState] = useState(false);

  const handleUpgradeClick = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      setShowUpgradeModalState(true);
    }
  };

  return (
    <>
      <Card className="border-ivory/10 bg-background/70">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <IconSparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {feature.name}
                    </span>
                  </div>
                  <span className={`font-medium ${
                    feature.used >= feature.limit
                      ? 'text-red-600 dark:text-red-400'
                      : feature.used / feature.limit >= 0.8
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {feature.used}/{feature.limit}
                  </span>
                </div>
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min((feature.used / feature.limit) * 100, 100)}%`
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      feature.used >= feature.limit
                        ? 'bg-red-500'
                        : feature.used / feature.limit >= 0.8
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {showUpgradeButton && (
            <Button
              onClick={handleUpgradeClick}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <IconRocket className="w-4 h-4 mr-2" />
              Upgrade to Unlock More
              <IconArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {showUpgradeModal && (
          <UpgradeToProModal
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModalState(false)}
            triggerFeature={features[0]?.id}
            currentPlan={currentPlan || undefined}
          />
        )}
      </AnimatePresence>
    </>
  );
}
