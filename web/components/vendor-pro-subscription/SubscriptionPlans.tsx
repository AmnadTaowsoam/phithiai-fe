'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconCheck,
  IconX,
  IconStar,
  IconCrown,
  IconRocket,
  IconBuilding,
  IconArrowRight,
  IconCreditCard,
  IconRefresh,
  IconInfoCircle
} from '@tabler/icons-react';
import type { SubscriptionPlan as SubscriptionPlanInterface, SubscriptionPlanType } from './types';

// Mock subscription plans
const SUBSCRIPTION_PLANS: SubscriptionPlanInterface[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 999,
    currency: 'THB',
    billingCycle: 'monthly',
    yearlyDiscount: 20,
    features: [
      { id: '1', name: 'Basic listing visibility', included: true },
      { id: '2', name: 'Up to 10 bookings/month', included: true },
      { id: '3', name: 'Standard support', included: true },
      { id: '4', name: 'Basic analytics', included: true },
      { id: '5', name: 'Featured placement', included: false },
      { id: '6', name: 'Priority support', included: false },
      { id: '7', name: 'AI marketing tools', included: false },
      { id: '8', name: 'Custom branding', included: false },
      { id: '9', name: 'API access', included: false },
      { id: '10', name: 'Dedicated account manager', included: false },
    ],
    icon: '🌱',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 2499,
    currency: 'THB',
    billingCycle: 'monthly',
    yearlyDiscount: 25,
    features: [
      { id: '1', name: 'Enhanced listing visibility', included: true },
      { id: '2', name: 'Up to 50 bookings/month', included: true },
      { id: '3', name: 'Priority support', included: true },
      { id: '4', name: 'Advanced analytics', included: true },
      { id: '5', name: 'Featured placement (limited)', included: true },
      { id: '6', name: 'AI marketing tools', included: true },
      { id: '7', name: 'Custom branding', included: false },
      { id: '8', name: 'API access', included: false },
      { id: '9', name: 'Dedicated account manager', included: false },
    ],
    popular: true,
    icon: '⭐',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'business',
    name: 'Business',
    price: 4999,
    currency: 'THB',
    billingCycle: 'monthly',
    yearlyDiscount: 30,
    features: [
      { id: '1', name: 'Premium listing visibility', included: true },
      { id: '2', name: 'Unlimited bookings', included: true },
      { id: '3', name: '24/7 dedicated support', included: true },
      { id: '4', name: 'Full analytics suite', included: true },
      { id: '5', name: 'Featured placement (extended)', included: true },
      { id: '6', name: 'AI marketing tools', included: true },
      { id: '7', name: 'Custom branding', included: true },
      { id: '8', name: 'API access', included: true },
      { id: '9', name: 'Dedicated account manager', included: false },
    ],
    icon: '🚀',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 9999,
    currency: 'THB',
    billingCycle: 'monthly',
    yearlyDiscount: 35,
    features: [
      { id: '1', name: 'White-label solution', included: true },
      { id: '2', name: 'Unlimited bookings', included: true },
      { id: '3', name: '24/7 dedicated support', included: true },
      { id: '4', name: 'Full analytics suite', included: true },
      { id: '5', name: 'Premium placement', included: true },
      { id: '6', name: 'AI marketing tools', included: true },
      { id: '7', name: 'Custom branding', included: true },
      { id: '8', name: 'Full API access', included: true },
      { id: '9', name: 'Dedicated account manager', included: true },
    ],
    icon: '👑',
    color: 'from-orange-500 to-red-600'
  },
];

export function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType | null>(null);

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Plan</h2>
        <p className="text-gray-600 mb-6">Upgrade to Phithiai Pro and unlock powerful features</p>
        
        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Yearly
          </button>
        </div>
        {billingCycle === 'yearly' && (
          <p className="text-sm text-green-600 mt-3 flex items-center justify-center gap-1">
            <IconCheck className="w-4 h-4" />
            Save up to 35% with yearly billing
          </p>
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
              className={`relative rounded-2xl overflow-hidden ${
                selectedPlan === plan.id
                  ? 'ring-4 ring-purple-500'
                  : plan.popular
                  ? 'ring-2 ring-purple-300'
                  : 'border border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold text-center py-1">
                  MOST POPULAR
                </div>
              )}

              {/* Plan Header */}
              <div className={`p-6 bg-gradient-to-br ${plan.color} text-white`}>
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
              <div className="p-6 bg-white space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-start gap-3">
                    {feature.included ? (
                      <IconCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <IconX className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 bg-gray-50">
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-gray-900 text-white'
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

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <IconInfoCircle className="w-5 h-5 text-purple-600" />
            Feature Comparison
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Feature</th>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <th key={plan.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    <span className="text-2xl">{plan.icon}</span>
                    <div className="text-xs mt-1">{plan.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">Monthly Price</td>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <td key={plan.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    {plan.price.toLocaleString()} THB
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">Yearly Discount</td>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <td key={plan.id} className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                    {plan.yearlyDiscount}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">Booking Limit</td>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <td key={plan.id} className="px-6 py-4 text-center text-sm text-gray-600">
                    {plan.features.find(f => f.id === '2')?.name}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">Support Level</td>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <td key={plan.id} className="px-6 py-4 text-center text-sm text-gray-600">
                    {plan.features.find(f => f.id === '3')?.name}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">Featured Placement</td>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <td key={plan.id} className="px-6 py-4 text-center">
                    {plan.features.find(f => f.id === '5')?.included ? (
                      <IconCheck className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <IconX className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">AI Marketing Tools</td>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <td key={plan.id} className="px-6 py-4 text-center">
                    {plan.features.find(f => f.id === '6')?.included ? (
                      <IconCheck className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <IconX className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">API Access</td>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <td key={plan.id} className="px-6 py-4 text-center">
                    {plan.features.find(f => f.id === '8')?.included ? (
                      <IconCheck className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <IconX className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <IconRefresh className="w-5 h-5 text-purple-600" />
            Can I change plans anytime?
          </h4>
          <p className="text-sm text-gray-600">
            Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <IconCreditCard className="w-5 h-5 text-purple-600" />
            What payment methods do you accept?
          </h4>
          <p className="text-sm text-gray-600">
            We accept credit/debit cards, bank transfers, and PromptPay. All payments are processed securely through our payment gateway.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <IconStar className="w-5 h-5 text-purple-600" />
            Is there a free trial?
          </h4>
          <p className="text-sm text-gray-600">
            Yes! All plans come with a 14-day free trial. No credit card required to start. Cancel anytime during the trial period.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <IconCrown className="w-5 h-5 text-purple-600" />
            What's included in Enterprise?
          </h4>
          <p className="text-sm text-gray-600">
            Enterprise includes everything in Business plus white-label solutions, full API access, dedicated account manager, and custom integrations.
          </p>
        </div>
      </div>
    </div>
  );
}
