'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconCheck,
  IconX,
  IconStar,
  IconCrown,
  IconRocket,
  IconArrowRight,
  IconCreditCard,
  IconRefresh,
  IconInfoCircle,
  IconSparkles,
  IconTrendingUp,
  IconShield,
  IconHeadphones,
  IconBrandStripe,
  IconApi,
  IconUsers,
  IconChartBar,
  IconBulb,
} from '@tabler/icons-react';
import type { SubscriptionPlan as SubscriptionPlanInterface, SubscriptionPlanType } from './types';

// Enhanced subscription plans with more features
const SUBSCRIPTION_PLANS: SubscriptionPlanInterface[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 999,
    currency: 'THB',
    billingCycle: 'monthly',
    yearlyDiscount: 20,
    features: [
      { id: '1', name: 'Basic listing visibility', included: true, description: 'Your listing appears in search results' },
      { id: '2', name: 'Up to 10 bookings/month', included: true, limit: 10 },
      { id: '3', name: 'Standard support', included: true, description: 'Email support within 24 hours' },
      { id: '4', name: 'Basic analytics', included: true, description: 'Views, clicks, and inquiries' },
      { id: '5', name: 'Featured placement', included: false, description: 'Prominent placement in search' },
      { id: '6', name: 'Priority support', included: false },
      { id: '7', name: 'AI marketing tools', included: false },
      { id: '8', name: 'Custom branding', included: false },
      { id: '9', name: 'API access', included: false },
      { id: '10', name: 'Dedicated account manager', included: false },
      { id: '11', name: '24/7 support', included: false },
      { id: '12', name: 'White-label solution', included: false },
    ],
    icon: '🌱',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 2499,
    currency: 'THB',
    billingCycle: 'monthly',
    yearlyDiscount: 25,
    features: [
      { id: '1', name: 'Enhanced listing visibility', included: true, description: 'Priority placement in search results' },
      { id: '2', name: 'Up to 50 bookings/month', included: true, limit: 50 },
      { id: '3', name: 'Priority support', included: true, description: 'Email and chat support within 12 hours' },
      { id: '4', name: 'Advanced analytics', included: true, description: 'Detailed insights and reports' },
      { id: '5', name: 'Featured placement (limited)', included: true, limit: 3, description: '3 featured listings per month' },
      { id: '6', name: 'AI marketing tools', included: true, description: 'AI recommendations and copywriting' },
      { id: '7', name: 'Custom branding', included: false },
      { id: '8', name: 'API access', included: false },
      { id: '9', name: 'Dedicated account manager', included: false },
      { id: '10', name: '24/7 support', included: false },
      { id: '11', name: 'White-label solution', included: false },
      { id: '12', name: 'Viral share kit', included: true, limit: 5, description: '5 viral content kits per month' },
    ],
    popular: true,
    icon: '⭐',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'business',
    name: 'Business',
    price: 4999,
    currency: 'THB',
    billingCycle: 'monthly',
    yearlyDiscount: 30,
    features: [
      { id: '1', name: 'Premium listing visibility', included: true, description: 'Top placement in all searches' },
      { id: '2', name: 'Unlimited bookings', included: true, limit: -1, description: 'No booking limits' },
      { id: '3', name: '24/7 dedicated support', included: true, description: 'Phone, email, and chat support' },
      { id: '4', name: 'Full analytics suite', included: true, description: 'Real-time dashboards and exports' },
      { id: '5', name: 'Featured placement (extended)', included: true, limit: 10, description: '10 featured listings per month' },
      { id: '6', name: 'AI marketing tools', included: true, description: 'Unlimited AI tools' },
      { id: '7', name: 'Custom branding', included: true, description: 'Custom colors and logo' },
      { id: '8', name: 'API access', included: true, description: 'Full API access' },
      { id: '9', name: 'Dedicated account manager', included: false },
      { id: '10', name: '24/7 support', included: true },
      { id: '11', name: 'White-label solution', included: false },
      { id: '12', name: 'Viral share kit', included: true, limit: -1, description: 'Unlimited viral content' },
    ],
    icon: '🚀',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 9999,
    currency: 'THB',
    billingCycle: 'monthly',
    yearlyDiscount: 35,
    features: [
      { id: '1', name: 'White-label solution', included: true, description: 'Fully branded platform' },
      { id: '2', name: 'Unlimited bookings', included: true, limit: -1 },
      { id: '3', name: '24/7 dedicated support', included: true, description: 'Dedicated support team' },
      { id: '4', name: 'Full analytics suite', included: true, description: 'Custom reports and integrations' },
      { id: '5', name: 'Premium placement', included: true, limit: -1, description: 'Unlimited featured listings' },
      { id: '6', name: 'AI marketing tools', included: true, description: 'Custom AI models' },
      { id: '7', name: 'Custom branding', included: true, description: 'Full customization' },
      { id: '8', name: 'Full API access', included: true, description: 'Enterprise API with SLA' },
      { id: '9', name: 'Dedicated account manager', included: true, description: 'Personal account manager' },
      { id: '10', name: '24/7 support', included: true },
      { id: '11', name: 'White-label solution', included: true },
      { id: '12', name: 'Custom integrations', included: true, description: 'Tailored integrations' },
    ],
    icon: '👑',
    color: 'from-orange-500 to-red-600',
  },
];

// Feature categories for comparison table
const FEATURE_CATEGORIES = [
  {
    id: 'bookings',
    name: 'Bookings',
    icon: <IconUsers className="w-5 h-5" />,
    features: ['2'],
  },
  {
    id: 'support',
    name: 'Support',
    icon: <IconHeadphones className="w-5 h-5" />,
    features: ['3', '10'],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: <IconChartBar className="w-5 h-5" />,
    features: ['4'],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: <IconSparkles className="w-5 h-5" />,
    features: ['5', '6', '12'],
  },
  {
    id: 'branding',
    name: 'Branding',
    icon: <IconBrandStripe className="w-5 h-5" />,
    features: ['7', '11'],
  },
  {
    id: 'api',
    name: 'API & Integrations',
    icon: <IconApi className="w-5 h-5" />,
    features: ['8', '12'],
  },
  {
    id: 'account',
    name: 'Account',
    icon: <IconShield className="w-5 h-5" />,
    features: ['9'],
  },
];

export function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const getYearlyPrice = (monthlyPrice: number, discount: number) => {
    const yearlyPrice = monthlyPrice * 12;
    return Math.round(yearlyPrice * (1 - discount / 100));
  };

  const getDisplayPrice = (plan: SubscriptionPlanInterface) => {
    if (billingCycle === 'yearly') {
      return getYearlyPrice(plan.price, plan.yearlyDiscount || 0);
    }
    return plan.price;
  };

  const getBillingText = () => {
    return billingCycle === 'monthly' ? '/month' : '/year';
  };

  const handleSelectPlan = (plan: SubscriptionPlanType) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Plan</h2>
        <p className="text-gray-600 mb-6">Upgrade to Phithiai Pro and unlock powerful features</p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Yearly
          </button>
        </div>
        {billingCycle === 'yearly' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-green-600 mt-3 flex items-center justify-center gap-1"
          >
            <IconCheck className="w-4 h-4" />
            Save up to 35% with yearly billing
          </motion.p>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTION_PLANS.map((plan, index) => {
          const displayPrice = getDisplayPrice(plan);

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                selectedPlan === plan.id
                  ? 'ring-4 ring-purple-500'
                  : plan.popular
                  ? 'ring-2 ring-purple-300'
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold text-center py-1">
                  MOST POPULAR
                </div>
              )}

              {/* Plan Header */}
              <div className={`p-6 bg-gradient-to-br ${plan.color} text-white ${plan.popular ? 'pt-8' : ''}`}>
                <div className="text-4xl mb-3">{plan.icon}</div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{displayPrice.toLocaleString()}</span>
                  <span className="text-sm opacity-90">THB{getBillingText()}</span>
                </div>
                {billingCycle === 'yearly' && plan.yearlyDiscount && (
                  <p className="text-sm opacity-90 mt-1">
                    Save {plan.yearlyDiscount}% (was {(plan.price * 12).toLocaleString()} THB/year)
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="p-6 bg-white dark:bg-gray-800 space-y-3">
                {plan.features.slice(0, 6).map((feature) => (
                  <div key={feature.id} className="flex items-start gap-3">
                    {feature.included ? (
                      <IconCheck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <IconX className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <span className={`text-sm ${feature.included ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                        {feature.name}
                      </span>
                      {feature.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {feature.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : `bg-gradient-to-r ${plan.color} text-white hover:opacity-90`
                  }`}
                >
                  {selectedPlan === plan.id ? (
                    <>
                      <IconCheck className="w-5 h-5" />
                      Selected
                    </>
                  ) : (
                    <>
                      Get Started
                      <IconArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Toggle Comparison View */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
        >
          <IconInfoCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            {showComparison ? 'Hide' : 'Show'} Feature Comparison
          </span>
        </button>
      </div>

      {/* Enhanced Comparison Table */}
      {showComparison && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="overflow-hidden"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <IconTrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Feature Comparison
              </h3>
            </div>

            {FEATURE_CATEGORIES.map((category) => (
              <div key={category.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                    {category.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{category.name}</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Feature
                        </th>
                        {SUBSCRIPTION_PLANS.map((plan) => (
                          <th key={plan.id} className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <span className="text-2xl">{plan.icon}</span>
                            <div className="text-xs mt-1">{plan.name}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {category.features.map((featureId) => {
                        const feature = SUBSCRIPTION_PLANS[0].features.find((f) => f.id === featureId);
                        if (!feature) return null;

                        return (
                          <tr key={featureId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                              {feature.name}
                              {feature.description && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {feature.description}
                                </div>
                              )}
                            </td>
                            {SUBSCRIPTION_PLANS.map((plan) => {
                              const planFeature = plan.features.find((f) => f.id === featureId);
                              return (
                                <td key={plan.id} className="px-6 py-4 text-center">
                                  {planFeature?.included ? (
                                    <div className="flex flex-col items-center">
                                      <IconCheck className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" />
                                      {planFeature.limit && planFeature.limit !== -1 && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                          {planFeature.limit}
                                        </span>
                                      )}
                                      {planFeature.limit === -1 && (
                                        <span className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">
                                          Unlimited
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <IconX className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Quick Comparison Summary */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <IconBulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Quick Summary
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <IconShield className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">All plans include</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Basic listing, email support, and analytics
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconSparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Professional+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      AI tools, featured listings, and priority support
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconRocket className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Business+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Unlimited everything, API access, custom branding
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconCrown className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Enterprise</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      White-label, dedicated manager, custom integrations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* FAQ Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <IconRefresh className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Can I change plans anytime?
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <IconCreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            What payment methods do you accept?
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We accept credit/debit cards, bank transfers, and PromptPay. All payments are processed securely through our payment gateway.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <IconStar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Is there a free trial?
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Yes! All plans come with a 14-day free trial. No credit card required to start. Cancel anytime during the trial period.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <IconCrown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          {/* eslint-disable-next-line react/no-unescaped-entities */}
            What's included in Enterprise?
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enterprise includes everything in Business plus white-label solutions, full API access, dedicated account manager, and custom integrations.
          </p>
        </div>
      </div>
    </div>
  );
}
