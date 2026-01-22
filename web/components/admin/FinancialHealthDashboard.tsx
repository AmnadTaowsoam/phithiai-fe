'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconCurrency,
  IconAlertTriangle,
  IconCheck,
  IconRefresh,
  IconChartLine,
  IconWorld,
  IconCoins,
  IconActivity,
  IconArrowUpRight,
  IconArrowDownRight,
  IconFilter
} from '@tabler/icons-react';

export interface RevenueData {
  date: Date;
  revenue: number;
  payouts: number;
  commission: number;
  net: number;
}

export interface Anomaly {
  id: string;
  type: 'high_commission' | 'suspicious_refund' | 'unusual_payout' | 'fx_variance';
  severity: 'low' | 'medium' | 'high';
  description: string;
  detectedAt: Date;
  value: number;
  threshold: number;
}

export interface FXMargin {
  currency: string;
  activeEscrows: number;
  totalExposure: number;
  currentRate: number;
  baseRate: number;
  marginPercent: number;
  marginAmount: number;
  trend: 'up' | 'down' | 'stable';
}

export function FinancialHealthDashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [showAnomalyDetails, setShowAnomalyDetails] = useState(false);

  // Mock revenue data
  const revenueData: RevenueData[] = [
    { date: new Date('2026-01-20'), revenue: 85000, payouts: 68000, commission: 8500, net: 8500 },
    { date: new Date('2026-01-19'), revenue: 62000, payouts: 49600, commission: 6200, net: 6200 },
    { date: new Date('2026-01-18'), revenue: 78000, payouts: 62400, commission: 7800, net: 7800 },
    { date: new Date('2026-01-17'), revenue: 95000, payouts: 76000, commission: 9500, net: 9500 },
    { date: new Date('2026-01-16'), revenue: 45000, payouts: 36000, commission: 4500, net: 4500 },
    { date: new Date('2026-01-15'), revenue: 72000, payouts: 57600, commission: 7200, net: 7200 },
    { date: new Date('2026-01-14'), revenue: 88000, payouts: 70400, commission: 8800, net: 8800 },
  ];

  // Mock anomalies
  const anomalies: Anomaly[] = [
    {
      id: 'ANM-001',
      type: 'high_commission',
      severity: 'medium',
      description: 'Unusually high commission rate detected for vendor VEN-1234',
      detectedAt: new Date('2026-01-20T10:30:00'),
      value: 18.5,
      threshold: 15
    },
    {
      id: 'ANM-002',
      type: 'suspicious_refund',
      severity: 'high',
      description: 'Multiple refunds from same IP address within 1 hour',
      detectedAt: new Date('2026-01-19T15:45:00'),
      value: 3,
      threshold: 1
    },
    {
      id: 'ANM-003',
      type: 'fx_variance',
      severity: 'low',
      description: 'FX rate variance exceeds normal range for USD/THB',
      detectedAt: new Date('2026-01-18T09:15:00'),
      value: 2.5,
      threshold: 2
    },
    {
      id: 'ANM-004',
      type: 'unusual_payout',
      severity: 'medium',
      description: 'Payout amount 3x higher than vendor average',
      detectedAt: new Date('2026-01-17T14:20:00'),
      value: 450000,
      threshold: 150000
    },
  ];

  // Mock FX margins
  const fxMargins: FXMargin[] = [
    {
      currency: 'USD',
      activeEscrows: 156,
      totalExposure: 2450000,
      currentRate: 35.25,
      baseRate: 34.50,
      marginPercent: 2.17,
      marginAmount: 53250,
      trend: 'up'
    },
    {
      currency: 'EUR',
      activeEscrows: 89,
      totalExposure: 1250000,
      currentRate: 38.50,
      baseRate: 37.80,
      marginPercent: 1.85,
      marginAmount: 23125,
      trend: 'stable'
    },
    {
      currency: 'SGD',
      activeEscrows: 67,
      totalExposure: 890000,
      currentRate: 26.15,
      baseRate: 25.80,
      marginPercent: 1.36,
      marginAmount: 12084,
      trend: 'down'
    },
    {
      currency: 'GBP',
      activeEscrows: 45,
      totalExposure: 620000,
      currentRate: 44.75,
      baseRate: 44.20,
      marginPercent: 1.24,
      marginAmount: 7690,
      trend: 'stable'
    },
  ];

  const formatCurrency = (amount: number, currency: string = 'THB') => {
    return `${amount.toLocaleString('th-TH')} ${currency}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <IconArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'down': return <IconArrowDownRight className="w-4 h-4 text-red-600" />;
      default: return <IconActivity className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalPayouts = revenueData.reduce((sum, d) => sum + d.payouts, 0);
  const totalCommission = revenueData.reduce((sum, d) => sum + d.commission, 0);
  const netProfit = totalRevenue - totalPayouts - totalCommission;

  const highSeverityCount = anomalies.filter(a => a.severity === 'high').length;
  const mediumSeverityCount = anomalies.filter(a => a.severity === 'medium').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <IconChartLine className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Financial Health Dashboard</h2>
            <p className="text-sm text-gray-500">Real-time platform financial overview</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <IconRefresh className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <IconTrendingUp className="w-4 h-4" />
                +12.5% vs last period
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <IconCurrency className="w-6 h-6 text-green-600" />
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
              <p className="text-sm text-gray-500 mb-1">Total Payouts</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPayouts)}</p>
              <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                <IconTrendingUp className="w-4 h-4" />
                +8.3% vs last period
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <IconCoins className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-gray-500 mb-1">Platform Commission</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCommission)}</p>
              <p className="text-sm text-purple-600 mt-1 flex items-center gap-1">
                <IconTrendingUp className="w-4 h-4" />
                +15.2% vs last period
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <IconActivity className="w-6 h-6 text-purple-600" />
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
              <p className="text-sm text-gray-500 mb-1">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(netProfit)}</p>
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <IconTrendingUp className="w-4 h-4" />
                +18.7% vs last period
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <IconChartLine className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Revenue vs Payout Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue vs. Payouts</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-600">Payouts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-gray-600">Commission</span>
            </div>
          </div>
        </div>

        {/* Simple bar chart representation */}
        <div className="space-y-4">
          {revenueData.map((data, index) => {
            const maxValue = Math.max(...revenueData.map(d => d.revenue));
            const revenueHeight = (data.revenue / maxValue) * 100;
            const payoutHeight = (data.payouts / maxValue) * 100;
            const commissionHeight = (data.commission / maxValue) * 100;

            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-600 text-right">{formatDate(data.date)}</div>
                <div className="flex-1 flex gap-1 h-24 items-end">
                  <div
                    className="flex-1 bg-green-500 rounded-t transition-all hover:opacity-80"
                    style={{ height: `${revenueHeight}%` }}
                    title={`Revenue: ${formatCurrency(data.revenue)}`}
                  />
                  <div
                    className="flex-1 bg-blue-500 rounded-t transition-all hover:opacity-80"
                    style={{ height: `${payoutHeight}%` }}
                    title={`Payouts: ${formatCurrency(data.payouts)}`}
                  />
                  <div
                    className="flex-1 bg-purple-500 rounded-t transition-all hover:opacity-80"
                    style={{ height: `${commissionHeight}%` }}
                    title={`Commission: ${formatCurrency(data.commission)}`}
                  />
                </div>
                <div className="w-32 text-sm text-gray-600">
                  <div>Rev: {formatCurrency(data.revenue)}</div>
                  <div>Pay: {formatCurrency(data.payouts)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Anomaly Detection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Anomaly Detection</h3>
            {(highSeverityCount > 0 || mediumSeverityCount > 0) && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                <IconAlertTriangle className="w-4 h-4" />
                {highSeverityCount} High, {mediumSeverityCount} Medium
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAnomalyDetails(!showAnomalyDetails)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <IconFilter className="w-4 h-4" />
            {showAnomalyDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        <div className="space-y-3">
          {anomalies.slice(0, showAnomalyDetails ? undefined : 3).map((anomaly, index) => (
            <motion.div
              key={anomaly.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 ${getSeverityColor(anomaly.severity)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <IconAlertTriangle className="w-4 h-4" />
                    <span className="font-semibold capitalize">{anomaly.type.replace(/_/g, ' ')}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      anomaly.severity === 'high' ? 'bg-red-200 text-red-800' :
                      anomaly.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {anomaly.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{anomaly.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span>Detected: {anomaly.detectedAt.toLocaleString('th-TH')}</span>
                    <span>Value: {formatCurrency(anomaly.value)}</span>
                    <span>Threshold: {formatCurrency(anomaly.threshold)}</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <IconCheck className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global FX Margin */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <IconWorld className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Global FX Margin</h3>
              <p className="text-sm text-gray-500">Currency exposure across active escrows</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Currency</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Active Escrows</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Exposure</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Rate</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Base Rate</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Margin %</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Margin Amount</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fxMargins.map((fx, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{fx.currency}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-900">{fx.activeEscrows}</td>
                  <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(fx.totalExposure, fx.currency)}</td>
                  <td className="py-4 px-4 text-right text-gray-900">{fx.currentRate.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{fx.baseRate.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-semibold ${
                      fx.marginPercent > 2 ? 'text-red-600' :
                      fx.marginPercent > 1.5 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {fx.marginPercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900">{formatCurrency(fx.marginAmount, 'THB')}</td>
                  <td className="py-4 px-4 text-right">
                    {getTrendIcon(fx.trend)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FX Summary */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconWorld className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="text-sm font-semibold text-blue-900">Total FX Exposure</h4>
                <p className="text-xs text-blue-700 mt-1">Combined exposure across all currencies</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-900">
                {formatCurrency(fxMargins.reduce((sum, fx) => sum + fx.marginAmount, 0))}
              </p>
              <p className="text-xs text-blue-700 mt-1">Total margin amount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
