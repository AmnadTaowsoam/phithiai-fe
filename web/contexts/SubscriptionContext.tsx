'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SubscriptionPlanType, Subscription, SubscriptionUsage, FeatureUsage } from '@/components/vendor-pro-subscription/types';

export interface SubscriptionContextType {
  // Current subscription state
  currentPlan: SubscriptionPlanType | null;
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;

  // Usage tracking
  usage: SubscriptionUsage | null;
  usageLoading: boolean;

  // Feature limits
  checkFeatureLimit: (featureId: string, amount?: number) => { allowed: boolean; limit: number; used: number; remaining: number };
  isFeatureAvailable: (featureId: string) => boolean;
  getFeatureUsage: (featureId: string) => FeatureUsage | undefined;

  // Plan limits
  getPlanLimit: (featureId: string) => number;
  canAccessFeature: (featureId: string) => boolean;

  // Upgrade actions
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
  upgradeToPlan: (plan: SubscriptionPlanType) => Promise<void>;
  downgradeToPlan: (plan: SubscriptionPlanType) => Promise<void>;
  cancelSubscription: () => Promise<void>;

  // Refresh data
  refreshSubscription: () => Promise<void>;
  refreshUsage: () => Promise<void>;
}

// Feature limits per plan
const PLAN_FEATURE_LIMITS: Record<SubscriptionPlanType, Record<string, number>> = {
  starter: {
    // Booking limits
    bookings_per_month: 10,
    // AI features
    ai_recommendations_per_month: 5,
    ai_copywriter_generations: 0,
    ai_market_insights: 0,
    // Marketing tools
    viral_share_kit: 0,
    // Listings
    featured_listings: 0,
    // Support
    support_response_time: 24, // hours
  },
  professional: {
    bookings_per_month: 50,
    ai_recommendations_per_month: 50,
    ai_copywriter_generations: 20,
    ai_market_insights: 10,
    viral_share_kit: 5,
    featured_listings: 3,
    support_response_time: 12,
  },
  business: {
    bookings_per_month: -1, // Unlimited
    ai_recommendations_per_month: -1,
    ai_copywriter_generations: -1,
    ai_market_insights: -1,
    viral_share_kit: -1,
    featured_listings: 10,
    support_response_time: 4,
  },
  enterprise: {
    bookings_per_month: -1,
    ai_recommendations_per_month: -1,
    ai_copywriter_generations: -1,
    ai_market_insights: -1,
    viral_share_kit: -1,
    featured_listings: -1,
    support_response_time: 1,
  },
};

// Features available per plan
const PLAN_FEATURE_AVAILABILITY: Record<SubscriptionPlanType, Set<string>> = {
  starter: new Set([
    'basic_listing',
    'standard_analytics',
    'basic_support',
  ]),
  professional: new Set([
    'basic_listing',
    'enhanced_listing',
    'standard_analytics',
    'advanced_analytics',
    'priority_support',
    'ai_recommendations',
    'ai_copywriter',
    'featured_listings_limited',
  ]),
  business: new Set([
    'basic_listing',
    'enhanced_listing',
    'premium_listing',
    'standard_analytics',
    'advanced_analytics',
    'full_analytics',
    '24_7_support',
    'ai_recommendations',
    'ai_copywriter',
    'ai_market_intelligence',
    'viral_share_kit',
    'featured_listings_extended',
    'custom_branding',
    'api_access',
  ]),
  enterprise: new Set([
    'basic_listing',
    'enhanced_listing',
    'premium_listing',
    'white_label',
    'standard_analytics',
    'advanced_analytics',
    'full_analytics',
    '24_7_support',
    'ai_recommendations',
    'ai_copywriter',
    'ai_market_intelligence',
    'viral_share_kit',
    'featured_listings_premium',
    'custom_branding',
    'full_api_access',
    'dedicated_account_manager',
    'custom_integrations',
  ]),
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlanType | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [usage, setUsage] = useState<SubscriptionUsage | null>(null);
  const [usageLoading, setUsageLoading] = useState(false);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Load subscription data on mount
  useEffect(() => {
    loadSubscriptionData();
    loadUsageData();
  }, []);

  const loadSubscriptionData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In production, this would call your backend API
      // const response = await fetch('/api/subscription');
      // const data = await response.json();

      // For now, use mock data
      const mockSubscription: Subscription = {
        id: 'sub_123',
        vendorId: 'vendor_123',
        plan: 'starter',
        status: 'active',
        startDate: new Date('2024-01-01'),
        nextBillingDate: new Date('2024-02-01'),
        autoRenew: true,
        billingCycle: 'monthly',
        paymentMethod: {
          id: 'pm_123',
          type: 'card',
          last4: '4242',
          brand: 'Visa',
          isDefault: true,
        },
      };

      setSubscription(mockSubscription);
      setCurrentPlan(mockSubscription.plan);
    } catch (err) {
      setError('Failed to load subscription data');
      console.error('Subscription load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsageData = async () => {
    setUsageLoading(true);

    try {
      // In production, this would call your backend API
      // const response = await fetch('/api/subscription/usage');
      // const data = await response.json();

      // For now, use mock data
      const mockUsage: SubscriptionUsage = {
        plan: 'starter',
        features: [
          {
            featureId: 'bookings_per_month',
            featureName: 'Monthly Bookings',
            used: 8,
            limit: 10,
            percentage: 80,
            resetFrequency: 'monthly',
          },
          {
            featureId: 'ai_recommendations_per_month',
            featureName: 'AI Recommendations',
            used: 5,
            limit: 5,
            percentage: 100,
            resetFrequency: 'monthly',
          },
          {
            featureId: 'ai_copywriter_generations',
            featureName: 'AI Copywriter Generations',
            used: 0,
            limit: 0,
            percentage: 0,
            resetFrequency: 'monthly',
          },
        ],
        period: {
          start: new Date('2024-01-01'),
          end: new Date('2024-02-01'),
        },
        resetDate: new Date('2024-02-01'),
      };

      setUsage(mockUsage);
    } catch (err) {
      console.error('Usage load error:', err);
    } finally {
      setUsageLoading(false);
    }
  };

  const checkFeatureLimit = (featureId: string, amount: number = 1) => {
    if (!currentPlan || !usage) {
      return { allowed: false, limit: 0, used: 0, remaining: 0 };
    }

    const planLimit = PLAN_FEATURE_LIMITS[currentPlan][featureId] ?? 0;

    // Unlimited features
    if (planLimit === -1) {
      return { allowed: true, limit: -1, used: 0, remaining: -1 };
    }

    const featureUsage = usage.features.find((f) => f.featureId === featureId);
    const used = featureUsage?.used ?? 0;
    const remaining = Math.max(0, planLimit - used);
    const allowed = remaining >= amount;

    return { allowed, limit: planLimit, used, remaining };
  };

  const isFeatureAvailable = (featureId: string): boolean => {
    if (!currentPlan) return false;
    return PLAN_FEATURE_AVAILABILITY[currentPlan].has(featureId);
  };

  const getFeatureUsage = (featureId: string): FeatureUsage | undefined => {
    return usage?.features.find((f) => f.featureId === featureId);
  };

  const getPlanLimit = (featureId: string): number => {
    if (!currentPlan) return 0;
    return PLAN_FEATURE_LIMITS[currentPlan][featureId] ?? 0;
  };

  const canAccessFeature = (featureId: string): boolean => {
    if (!currentPlan) return false;

    // Check if feature is available in plan
    if (!isFeatureAvailable(featureId)) {
      return false;
    }

    // Check if usage limit allows access
    const { allowed } = checkFeatureLimit(featureId, 1);
    return allowed;
  };

  const upgradeToPlan = async (plan: SubscriptionPlanType) => {
    try {
      // In production, call your backend API
      // await fetch('/api/subscription/upgrade', {
      //   method: 'POST',
      //   body: JSON.stringify({ plan }),
      // });

      // Update local state
      setCurrentPlan(plan);
      setShowUpgradeModal(false);

      // Reload data
      await loadSubscriptionData();
    } catch (err) {
      console.error('Upgrade error:', err);
      throw err;
    }
  };

  const downgradeToPlan = async (plan: SubscriptionPlanType) => {
    try {
      // In production, call your backend API
      // await fetch('/api/subscription/downgrade', {
      //   method: 'POST',
      //   body: JSON.stringify({ plan }),
      // });

      // Update local state
      setCurrentPlan(plan);

      // Reload data
      await loadSubscriptionData();
    } catch (err) {
      console.error('Downgrade error:', err);
      throw err;
    }
  };

  const cancelSubscription = async () => {
    try {
      // In production, call your backend API
      // await fetch('/api/subscription/cancel', {
      //   method: 'POST',
      // });

      // Update local state
      if (subscription) {
        setSubscription({ ...subscription, status: 'canceled' });
      }
    } catch (err) {
      console.error('Cancel error:', err);
      throw err;
    }
  };

  const refreshSubscription = async () => {
    await loadSubscriptionData();
  };

  const refreshUsage = async () => {
    await loadUsageData();
  };

  return (
    <SubscriptionContext.Provider
      value={{
        currentPlan,
        subscription,
        isLoading,
        error,
        usage,
        usageLoading,
        checkFeatureLimit,
        isFeatureAvailable,
        getFeatureUsage,
        getPlanLimit,
        canAccessFeature,
        showUpgradeModal,
        setShowUpgradeModal,
        upgradeToPlan,
        downgradeToPlan,
        cancelSubscription,
        refreshSubscription,
        refreshUsage,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

// Higher-order component for feature gating
export function withFeatureGate<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  featureId: string,
  fallback?: React.ComponentType<{ onUpgrade: () => void }>
) {
  return function FeatureGatedComponent(props: P) {
    const { canAccessFeature, setShowUpgradeModal } = useSubscription();
    const hasAccess = canAccessFeature(featureId);

    if (!hasAccess) {
      if (fallback) {
        const FallbackComponent = fallback;
        return <FallbackComponent onUpgrade={() => setShowUpgradeModal(true)} />;
      }

      return (
        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Upgrade Required
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            This feature is available on higher-tier plans.
          </p>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            View Plans
          </button>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

// Hook for checking feature limits with automatic upgrade prompt
export function useFeatureLimit(featureId: string) {
  const { checkFeatureLimit, setShowUpgradeModal, currentPlan } = useSubscription();
  const { allowed, limit, used, remaining } = checkFeatureLimit(featureId);

  const triggerUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const isAtLimit = remaining === 0;
  const isNearLimit = remaining <= limit * 0.2 && limit > 0; // Within 20% of limit

  return {
    allowed,
    limit,
    used,
    remaining,
    isAtLimit,
    isNearLimit,
    currentPlan,
    triggerUpgrade,
  };
}
