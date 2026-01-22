'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconX,
  IconRocket,
  IconCrown,
  IconStar,
  IconCheck,
  IconArrowRight,
  IconSparkles,
  IconTrendingUp,
  IconShield,
  IconHeadphones,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSubscription } from '@/contexts/SubscriptionContext';
import type { SubscriptionPlanType } from './types';

export interface UpgradeToProModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerFeature?: string;
  currentPlan?: SubscriptionPlanType;
  recommendedPlan?: SubscriptionPlanType;
}

const PLAN_HIGHLIGHTS: Record<SubscriptionPlanType, {
  icon: React.ReactNode;
  color: string;
  gradient: string;
  benefits: string[];
  cta: string;
}> = {
  starter: {
    icon: <IconRocket className="w-8 h-8" />,
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-600',
    benefits: [
      'Perfect for getting started',
      '10 bookings/month',
      'Basic analytics',
      'Standard support',
    ],
    cta: 'Get Started',
  },
  professional: {
    icon: <IconStar className="w-8 h-8" />,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-600',
    benefits: [
      'Most popular choice',
      '50 bookings/month',
      'AI marketing tools',
      'Priority support',
      'Featured listings',
    ],
    cta: 'Upgrade to Professional',
  },
  business: {
    icon: <IconTrendingUp className="w-8 h-8" />,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-600',
    benefits: [
      'Unlimited bookings',
      'Full AI suite',
      '24/7 support',
      'Custom branding',
      'API access',
    ],
    cta: 'Upgrade to Business',
  },
  enterprise: {
    icon: <IconCrown className="w-8 h-8" />,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-600',
    benefits: [
      'White-label solution',
      'Dedicated account manager',
      'Custom integrations',
      'Full API access',
      'Premium support',
    ],
    cta: 'Contact Sales',
  },
};

const FEATURE_MESSAGES: Record<string, { title: string; description: string; recommendedPlan: SubscriptionPlanType }> = {
  ai_recommendations: {
    title: 'Unlock AI Recommendations',
    description: 'Get personalized vendor recommendations powered by AI. Upgrade to Professional or higher for unlimited access.',
    recommendedPlan: 'professional',
  },
  ai_copywriter: {
    title: 'AI Copywriter Available',
    description: 'Generate compelling marketing copy with AI. This feature is available on Professional and higher plans.',
    recommendedPlan: 'professional',
  },
  viral_share_kit: {
    title: 'Viral Share Kit',
    description: 'Create shareable content that goes viral. Upgrade to Business for unlimited access.',
    recommendedPlan: 'business',
  },
  api_access: {
    title: 'API Access Required',
    description: 'Integrate Phithiai with your own systems. API access is available on Business and Enterprise plans.',
    recommendedPlan: 'business',
  },
  default: {
    title: 'Upgrade Your Plan',
    description: 'Unlock more features and increase your limits to grow your business.',
    recommendedPlan: 'professional',
  },
};

export function UpgradeToProModal({
  isOpen,
  onClose,
  triggerFeature,
  currentPlan,
  recommendedPlan,
}: UpgradeToProModalProps) {
  const { upgradeToPlan, subscription } = useSubscription();

  const featureMessage = triggerFeature
    ? FEATURE_MESSAGES[triggerFeature] || FEATURE_MESSAGES.default
    : FEATURE_MESSAGES.default;

  const effectiveRecommendedPlan = recommendedPlan || featureMessage.recommendedPlan;
  const effectiveCurrentPlan = currentPlan || subscription?.plan || 'starter';

  const handleUpgrade = async (plan: SubscriptionPlanType) => {
    try {
      await upgradeToPlan(plan);
      onClose();
    } catch (error) {
      console.error('Upgrade failed:', error);
    }
  };

  const getPlanOrder = (plan: SubscriptionPlanType): number => {
    const order: SubscriptionPlanType[] = ['starter', 'professional', 'business', 'enterprise'];
    return order.indexOf(plan);
  };

  const isUpgrade = (plan: SubscriptionPlanType): boolean => {
    return getPlanOrder(plan) > getPlanOrder(effectiveCurrentPlan);
  };

  const plans: SubscriptionPlanType[] = ['starter', 'professional', 'business', 'enterprise'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            >
              <Card className="border-ivory/10 bg-background/95 shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                        <IconSparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {featureMessage.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {featureMessage.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <IconX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {/* Current Plan Badge */}
                  {effectiveCurrentPlan !== 'starter' && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2">
                        <IconShield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          You are currently on the <strong>{effectiveCurrentPlan}</strong> plan
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Plans Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {plans.map((plan) => {
                      const highlight = PLAN_HIGHLIGHTS[plan];
                      const isRecommended = plan === effectiveRecommendedPlan;
                      const isCurrent = plan === effectiveCurrentPlan;
                      const shouldUpgrade = isUpgrade(plan);

                      return (
                        <motion.div
                          key={plan}
                          whileHover={{ scale: 1.02 }}
                          className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
                            isRecommended
                              ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                              : isCurrent
                              ? 'border-gray-300 dark:border-gray-600'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {/* Recommended Badge */}
                          {isRecommended && (
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold text-center py-1.5">
                              RECOMMENDED
                            </div>
                          )}

                          {/* Current Badge */}
                          {isCurrent && (
                            <div className="absolute top-0 left-0 right-0 bg-gray-600 text-white text-xs font-semibold text-center py-1.5">
                              CURRENT PLAN
                            </div>
                          )}

                          {/* Plan Header */}
                          <div className={`p-5 bg-gradient-to-br ${highlight.gradient} text-white ${isRecommended || isCurrent ? 'pt-8' : ''}`}>
                            <div className="flex justify-between items-start mb-3">
                              <div className={highlight.color}>
                                {highlight.icon}
                              </div>
                              {isRecommended && !isCurrent && (
                                <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                                  BEST VALUE
                                </div>
                              )}
                            </div>
                            <h3 className="text-xl font-bold capitalize mb-1">{plan}</h3>
                            <div className="text-sm opacity-90">
                              {plan === 'starter' && 'For getting started'}
                              {plan === 'professional' && 'Most popular'}
                              {plan === 'business' && 'For growing businesses'}
                              {plan === 'enterprise' && 'For large organizations'}
                            </div>
                          </div>

                          {/* Features */}
                          <div className="p-4 bg-white dark:bg-gray-800 space-y-2">
                            {highlight.benefits.slice(0, 4).map((benefit, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <IconCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="p-4 bg-gray-50 dark:bg-gray-900/50">
                            {isCurrent ? (
                              <Button
                                variant="outline"
                                disabled
                                className="w-full"
                              >
                                Current Plan
                              </Button>
                            ) : shouldUpgrade ? (
                              <Button
                                onClick={() => handleUpgrade(plan)}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                              >
                                {highlight.cta}
                                <IconArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                disabled
                                className="w-full"
                              >
                                Downgrade
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Feature Comparison */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Feature Comparison
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <IconHeadphones className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Priority Support</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Get faster response times with Professional and above
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <IconSparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">AI-Powered Tools</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Unlock AI recommendations and copywriting
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <IconTrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Unlimited Growth</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Scale without limits with Business and Enterprise
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <IconCrown className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Premium Features</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Custom branding, API access, and more
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={onClose}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Maybe later
                    </button>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Questions?{' '}
                      <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                        Contact support
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
