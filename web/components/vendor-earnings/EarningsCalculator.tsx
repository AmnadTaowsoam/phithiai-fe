'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconCalculator,
  IconTrendingUp,
  IconInfoCircle,
  IconCheck,
  IconArrowRight,
  IconRefresh,
  IconDownload,
  IconChartPie,
  IconCurrencyBaht
} from '@tabler/icons-react';
import type {
  CommissionTier,
  CommissionStructure,
  EarningsCalculation,
  RevenueStream,
  CommissionTooltip
} from './types';

// Mock commission structures
const COMMISSION_TIERS: CommissionStructure[] = [
  {
    tier: 'standard',
    rate: 15,
    monthlyVolumeThreshold: 0,
    benefits: ['Basic platform access', 'Standard support', 'Payment processing'],
    icon: '📊'
  },
  {
    tier: 'silver',
    rate: 12,
    monthlyVolumeThreshold: 50000,
    benefits: ['Reduced commission', 'Priority support', 'Featured listing (limited)', 'Analytics dashboard'],
    icon: '🥈'
  },
  {
    tier: 'gold',
    rate: 10,
    monthlyVolumeThreshold: 150000,
    benefits: ['Lower commission', '24/7 support', 'Featured listing (extended)', 'Advanced analytics', 'Marketing tools'],
    icon: '🥇'
  },
  {
    tier: 'platinum',
    rate: 8,
    monthlyVolumeThreshold: 500000,
    benefits: ['Best commission rate', 'Dedicated account manager', 'Premium placement', 'Full marketing suite', 'API access'],
    icon: '💎'
  },
  {
    tier: 'pro',
    rate: 5,
    monthlyVolumeThreshold: 1000000,
    benefits: ['Exclusive rates', 'White-label options', 'Custom integrations', 'Revenue sharing', 'Exclusive events'],
    icon: '👑'
  }
];

const REVENUE_STREAMS: RevenueStream[] = [
  { id: '1', name: 'Wedding Ceremonies', icon: '💒', amount: 150000, percentage: 45, color: '#9333ea' },
  { id: '2', name: 'Ordination Ceremonies', icon: '🙏', amount: 85000, percentage: 25, color: '#ec4899' },
  { id: '3', name: 'Funeral Services', icon: '🕊️', amount: 50000, percentage: 15, color: '#3b82f6' },
  { id: '4', name: 'Merit Making', icon: '🪔', amount: 35000, percentage: 10, color: '#10b981' },
  { id: '5', name: 'Other Services', icon: '📋', amount: 15000, percentage: 5, color: '#f59e0b' },
];

export function EarningsCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(150000);
  const [selectedTier, setSelectedTier] = useState<CommissionTier>('gold');
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipTier, setTooltipTier] = useState<CommissionTier | null>(null);

  const calculateEarnings = (revenue: number, tier: CommissionTier): EarningsCalculation => {
    const structure = COMMISSION_TIERS.find(t => t.tier === tier)!;
    const commissionRate = structure.rate / 100;
    const commissionAmount = revenue * commissionRate;
    const platformFee = revenue * 0.02; // 2% platform fee
    const processingFee = revenue * 0.015; // 1.5% payment processing
    const netEarnings = revenue - commissionAmount - platformFee - processingFee;
    
    return {
      grossRevenue: revenue,
      commissionRate: structure.rate,
      commissionAmount,
      netEarnings,
      platformFee,
      paymentProcessingFee: processingFee,
      finalPayout: netEarnings
    };
  };

  const currentCalculation = calculateEarnings(monthlyRevenue, selectedTier);
  const currentTier = COMMISSION_TIERS.find(t => t.tier === selectedTier)!;
  const nextTier = COMMISSION_TIERS.find(t => t.monthlyVolumeThreshold > monthlyRevenue && t.monthlyVolumeThreshold > currentTier.monthlyVolumeThreshold);

  const getCommissionTooltip = (tier: CommissionTier): CommissionTooltip => {
    const structure = COMMISSION_TIERS.find(t => t.tier === tier)!;
    const nextTierStructure = COMMISSION_TIERS.find(t => t.monthlyVolumeThreshold > structure.monthlyVolumeThreshold);
    
    return {
      tier: structure.tier,
      rate: structure.rate,
      description: `${structure.tier.charAt(0).toUpperCase() + structure.tier.slice(1)} tier with ${structure.rate}% commission rate`,
      requirements: [
        `Monthly volume: ${structure.monthlyVolumeThreshold.toLocaleString()} THB+`,
        ...structure.benefits.slice(0, 2)
      ],
      nextTier: nextTierStructure ? {
        tier: nextTierStructure.tier,
        threshold: nextTierStructure.monthlyVolumeThreshold,
        additionalSavings: ((structure.rate - nextTierStructure.rate) / 100) * monthlyRevenue
      } : undefined
    };
  };

  const handleTooltip = (tier: CommissionTier) => {
    setTooltipTier(tier);
    setShowTooltip(true);
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('th-TH')} THB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <IconCalculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Earnings Calculator</h2>
            <p className="text-sm text-gray-500">Estimate your monthly earnings</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <IconRefresh className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Revenue Input */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Monthly Revenue (THB)
        </label>
        <div className="relative">
          <IconCurrencyBaht className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
            className="w-full pl-12 pr-4 py-3 text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your monthly revenue"
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setMonthlyRevenue(50000)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            50K
          </button>
          <button
            onClick={() => setMonthlyRevenue(150000)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            150K
          </button>
          <button
            onClick={() => setMonthlyRevenue(500000)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            500K
          </button>
          <button
            onClick={() => setMonthlyRevenue(1000000)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            1M
          </button>
        </div>
      </div>

      {/* Commission Tier Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Select Commission Tier</h3>
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
          >
            <IconInfoCircle className="w-4 h-4" />
            View Details
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {COMMISSION_TIERS.map((tier) => (
            <motion.button
              key={tier.tier}
              onClick={() => setSelectedTier(tier.tier)}
              onMouseEnter={() => handleTooltip(tier.tier)}
              onMouseLeave={() => setShowTooltip(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                selectedTier === tier.tier
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{tier.icon}</div>
              <div className="font-semibold text-gray-900 capitalize">{tier.tier}</div>
              <div className="text-2xl font-bold text-purple-600">{tier.rate}%</div>
              <div className="text-xs text-gray-500 mt-1">
                {tier.monthlyVolumeThreshold.toLocaleString()}+ THB
              </div>
              {selectedTier === tier.tier && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                  <IconCheck className="w-3 h-3 text-white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && tooltipTier && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              {(() => {
                const tooltip = getCommissionTooltip(tooltipTier);
                return (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 capitalize">
                        {tooltip.tier} Tier Details
                      </h4>
                      <span className="text-lg font-bold text-purple-600">{tooltip.rate}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{tooltip.description}</p>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Requirements:</div>
                      <ul className="space-y-1">
                        {tooltip.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <IconCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {tooltip.nextTier && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                          <IconArrowRight className="w-4 h-4 text-purple-600" />
                          Next: {tooltip.nextTier.tier} Tier
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Reach {tooltip.nextTier.threshold.toLocaleString()} THB/month to save{' '}
                          <span className="font-semibold text-green-600">
                            {tooltip.nextTier.additionalSavings.toLocaleString()} THB
                          </span>
                        </p>
                      </div>
                    )}
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Earnings Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Earnings Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Gross Revenue</span>
            <span className="font-semibold text-gray-900">{formatCurrency(currentCalculation.grossRevenue)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Platform Commission</span>
              <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                {currentCalculation.commissionRate}%
              </span>
            </div>
            <span className="font-semibold text-red-600">-{formatCurrency(currentCalculation.commissionAmount)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Platform Fee (2%)</span>
            <span className="font-semibold text-red-600">-{formatCurrency(currentCalculation.platformFee)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Payment Processing (1.5%)</span>
            <span className="font-semibold text-red-600">-{formatCurrency(currentCalculation.paymentProcessingFee)}</span>
          </div>
          <div className="flex items-center justify-between py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg px-4">
            <span className="font-semibold text-gray-900">Net Earnings</span>
            <span className="text-xl font-bold text-purple-600">{formatCurrency(currentCalculation.netEarnings)}</span>
          </div>
        </div>
      </div>

      {/* Revenue Streams */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <IconChartPie className="w-4 h-4 text-purple-600" />
            Revenue by Service Type
          </h3>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <IconDownload className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="space-y-3">
          {REVENUE_STREAMS.map((stream) => (
            <div key={stream.id} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                {stream.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{stream.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(stream.amount)}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stream.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: stream.color }}
                  />
                </div>
              </div>
              <div className="w-12 text-right">
                <span className="text-sm font-medium text-gray-600">{stream.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <IconTrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-purple-100 text-sm">Estimated Monthly Payout</p>
            <p className="text-3xl font-bold">{formatCurrency(currentCalculation.finalPayout)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-purple-100">
            {currentTier.tier.charAt(0).toUpperCase() + currentTier.tier.slice(1)} Tier ({currentTier.rate}% commission)
          </span>
          {nextTier && (
            <span className="text-white/80">
              Upgrade to {nextTier.tier} tier to save{' '}
              <span className="font-semibold">
                {((currentTier.rate - nextTier.rate) / 100 * monthlyRevenue).toLocaleString()} THB
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
