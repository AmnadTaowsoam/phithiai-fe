'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconCalculator,
  IconReceipt,
  IconTrendingUp,
  IconInfoCircle,
  IconCurrencyBaht,
  IconChartBar,
  IconCalendar
} from '@tabler/icons-react';
import { EarningsCalculator } from '@/components/vendor-earnings/EarningsCalculator';
import { PayoutHistory } from '@/components/vendor-earnings/PayoutHistory';
import type { CommissionTier } from '@/components/vendor-earnings/types';

export default function VendorEarningsPage() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'history'>('calculator');

  const tabs = [
    { id: 'calculator' as const, label: 'Earnings Calculator', icon: IconCalculator },
    { id: 'history' as const, label: 'Payout History', icon: IconReceipt },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <IconTrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vendor Earnings</h1>
                <p className="text-sm text-gray-500">Calculate earnings & track payouts</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className="text-lg font-bold text-gray-900">THB 125,000.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">This Month</p>
                <p className="text-2xl font-bold text-gray-900">THB 185,000</p>
                <p className="text-sm text-green-600 mt-1">+12.5% vs last month</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <IconCurrencyBaht className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">THB 1,245,000</p>
                <p className="text-sm text-gray-500 mt-1">Last 12 months</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <IconChartBar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Commission Rate</p>
                <p className="text-2xl font-bold text-gray-900">10%</p>
                <p className="text-sm text-purple-600 mt-1">Gold Tier</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <IconInfoCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Next Payout</p>
                <p className="text-2xl font-bold text-gray-900">Feb 5</p>
                <p className="text-sm text-gray-500 mt-1">In 16 days</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <IconCalendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
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
          {activeTab === 'calculator' && <EarningsCalculator />}
          {activeTab === 'history' && <PayoutHistory />}
        </motion.div>
      </div>
    </div>
  );
}
