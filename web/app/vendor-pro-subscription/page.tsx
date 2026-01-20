'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconCrown,
  IconSettings,
  IconCreditCard,
  IconFileText,
  IconChartBar,
  IconTrendingUp,
  IconCheck,
  IconArrowRight,
  IconAlertTriangle
} from '@tabler/icons-react';
import { SubscriptionPlans } from '@/components/vendor-pro-subscription/SubscriptionPlans';
import { PremiumBadge, VendorCardWithBadges, BADGE_PRESETS } from '@/components/vendor-pro-subscription/PremiumBadge';
import type { Subscription, SubscriptionUsage, BillingInvoice } from '@/components/vendor-pro-subscription/types';

// Mock subscription data
const CURRENT_SUBSCRIPTION: Subscription = {
  id: 'sub-001',
  vendorId: 'v123',
  plan: 'professional',
  status: 'active',
  startDate: new Date('2025-06-01'),
  nextBillingDate: new Date('2026-02-01'),
  autoRenew: true,
  billingCycle: 'monthly',
  paymentMethod: {
    id: 'pm-001',
    type: 'card',
    last4: '4242',
    brand: 'visa',
    expiryMonth: 12,
    expiryYear: 2026,
    isDefault: true
  }
};

const USAGE_DATA: SubscriptionUsage = {
  plan: 'professional',
  features: [
    {
      featureId: 'bookings',
      featureName: 'Monthly Bookings',
      used: 32,
      limit: 50,
      percentage: 64,
      resetFrequency: 'monthly'
    },
    {
      featureId: 'listings',
      featureName: 'Active Listings',
      used: 8,
      limit: 15,
      percentage: 53,
      resetFrequency: 'monthly'
    },
    {
      featureId: 'ai-marketing',
      featureName: 'AI Marketing Credits',
      used: 75,
      limit: 100,
      percentage: 75,
      resetFrequency: 'monthly'
    },
    {
      featureId: 'api-calls',
      featureName: 'API Calls',
      used: 1240,
      limit: 5000,
      percentage: 25,
      resetFrequency: 'monthly'
    }
  ],
  period: {
    start: new Date('2026-01-01'),
    end: new Date('2026-01-31')
  },
  resetDate: new Date('2026-02-01')
};

const INVOICES: BillingInvoice[] = [
  {
    id: 'INV-2026-001',
    subscriptionId: 'sub-001',
    amount: 2499,
    currency: 'THB',
    status: 'paid',
    date: new Date('2026-01-01'),
    dueDate: new Date('2026-01-15'),
    paidDate: new Date('2026-01-05'),
    downloadUrl: '/invoices/INV-2026-001.pdf'
  },
  {
    id: 'INV-2025-012',
    subscriptionId: 'sub-001',
    amount: 2499,
    currency: 'THB',
    status: 'paid',
    date: new Date('2025-12-01'),
    dueDate: new Date('2025-12-15'),
    paidDate: new Date('2025-12-03'),
    downloadUrl: '/invoices/INV-2025-012.pdf'
  },
  {
    id: 'INV-2025-011',
    subscriptionId: 'sub-001',
    amount: 2499,
    currency: 'THB',
    status: 'paid',
    date: new Date('2025-11-01'),
    dueDate: new Date('2025-11-15'),
    paidDate: new Date('2025-11-02'),
    downloadUrl: '/invoices/INV-2025-011.pdf'
  },
];

export default function VendorProSubscriptionPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'billing' | 'usage'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: IconChartBar },
    { id: 'plans' as const, label: 'Plans & Pricing', icon: IconCrown },
    { id: 'usage' as const, label: 'Usage', icon: IconTrendingUp },
    { id: 'billing' as const, label: 'Billing', icon: IconFileText },
  ];

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <IconCrown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Phithiai Pro</h1>
                <p className="text-sm text-gray-500">Subscription Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PremiumBadge badge={BADGE_PRESETS[0]} size="md" showTooltip={false} />
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <IconSettings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Current Subscription Card */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">⭐</span>
                      <h2 className="text-2xl font-bold">Professional Plan</h2>
                    </div>
                    <p className="text-purple-100 mb-4">
                      Your subscription is active and auto-renews on{' '}
                      {CURRENT_SUBSCRIPTION.nextBillingDate.toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-purple-200 text-sm">Monthly Price</p>
                        <p className="text-3xl font-bold">THB 2,499</p>
                      </div>
                      <div>
                        <p className="text-purple-200 text-sm">Next Billing</p>
                        <p className="text-lg font-semibold">
                          {CURRENT_SUBSCRIPTION.nextBillingDate.toLocaleDateString('th-TH', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      <IconSettings className="w-4 h-4" />
                      Manage Plan
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      <IconCreditCard className="w-4 h-4" />
                      Update Payment
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">32</p>
                  <p className="text-sm text-green-600 mt-1">+8 this month</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Revenue Generated</p>
                  <p className="text-3xl font-bold text-gray-900">THB 185K</p>
                  <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                  <p className="text-sm text-gray-500 mt-1">Based on 156 reviews</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Benefits</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Enhanced listing visibility',
                    'Up to 50 bookings/month',
                    'Priority support',
                    'Advanced analytics',
                    'Featured placement (limited)',
                    'AI marketing tools'
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <IconCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'plans' && <SubscriptionPlans />}

          {activeTab === 'usage' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Usage Overview</h3>
                    <p className="text-sm text-gray-500">
                      Resets on {USAGE_DATA.resetDate.toLocaleDateString('th-TH')}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Professional Plan
                  </span>
                </div>

                <div className="space-y-6">
                  {USAGE_DATA.features.map((feature) => (
                    <div key={feature.featureId}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{feature.featureName}</span>
                        <span className="text-sm text-gray-600">
                          {feature.used.toLocaleString()} / {feature.limit.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${feature.percentage}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full ${getUsageColor(feature.percentage)}`}
                        />
                      </div>
                      {feature.percentage >= 80 && (
                        <p className="text-sm text-orange-600 mt-2 flex items-center gap-1">
                          <IconAlertTriangle className="w-4 h-4" />
                          Approaching limit. Consider upgrading for more capacity.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Upgrade CTA */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Need More Capacity?</h4>
                    <p className="text-purple-100">
                      Upgrade to Business or Enterprise plan for unlimited bookings and advanced features.
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    View Plans
                    <IconArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">••••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/2026</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700">
                    Update
                  </button>
                </div>
              </div>

              {/* Invoices */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <IconFileText className="w-4 h-4" />
                    Download All
                  </button>
                </div>

                <div className="space-y-3">
                  {INVOICES.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <IconFileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{invoice.id}</p>
                          <p className="text-sm text-gray-500">
                            {invoice.date.toLocaleDateString('th-TH', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getInvoiceStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                        <span className="font-semibold text-gray-900">
                          THB {invoice.amount.toLocaleString()}
                        </span>
                        <a
                          href={invoice.downloadUrl}
                          download
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <IconFileText className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
