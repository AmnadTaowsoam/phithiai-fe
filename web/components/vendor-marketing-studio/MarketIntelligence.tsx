'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconChartBar,
  IconCalendar,
  IconAlertTriangle,
  IconArrowUp,
  IconArrowDown,
  IconUsers,
  IconStar,
  IconInfoCircle,
  IconCircleCheck,
  IconMinus
} from '@tabler/icons-react';
import {
  MarketIntelligenceData,
  MarketingInsight
} from './types';

interface MarketIntelligenceProps {
  data: MarketIntelligenceData;
  insights: MarketingInsight[];
}

export default function MarketIntelligence({ data, insights }: MarketIntelligenceProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  const getPricePositionColor = (position: string) => {
    switch (position) {
      case 'below':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'above':
        return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      case 'average':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <IconTrendingUp className="w-5 h-5" />;
      case 'declining':
        return <IconTrendingDown className="w-5 h-5" />;
      case 'stable':
        return <IconMinus className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'rising':
        return 'text-green-600 dark:text-green-400';
      case 'declining':
        return 'text-red-600 dark:text-red-400';
      case 'stable':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'price':
        return <IconChartBar className="w-5 h-5" />;
      case 'content':
        return <IconStar className="w-5 h-5" />;
      case 'timing':
        return <IconCalendar className="w-5 h-5" />;
      case 'feature':
        return <IconInfoCircle className="w-5 h-5" />;
      default:
        return <IconInfoCircle className="w-5 h-5" />;
    }
  };

  const getInsightSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'border-amber-500 bg-amber-50 dark:bg-amber-900/20';
      case 'info':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-700/50';
    }
  };

  const priceDifference = data.vendorPrice - data.averageRegionalPrice;
  const priceDifferencePercent = ((priceDifference / data.averageRegionalPrice) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Price Position Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <IconChartBar className="w-5 h-5 text-purple-600" />
          Price Position Analysis
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Your Price */}
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your Price</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {data.vendorPrice.toLocaleString()} {data.currency}
            </p>
          </div>

          {/* Regional Average */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Regional Average</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.averageRegionalPrice.toLocaleString()} {data.currency}
            </p>
          </div>

          {/* Difference */}
          <div className={`p-4 rounded-xl ${priceDifference > 0 ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Difference</p>
            <div className="flex items-center gap-1">
              {priceDifference > 0 ? (
                <IconArrowUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              ) : (
                <IconArrowDown className="w-5 h-5 text-green-600 dark:text-green-400" />
              )}
              <p className={`text-2xl font-bold ${priceDifference > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                {Math.abs(priceDifference).toLocaleString()} {data.currency}
              </p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {priceDifference > 0 ? '+' : ''}{priceDifferencePercent}% vs average
            </p>
          </div>
        </div>

        {/* Price Position Badge */}
        <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getPricePositionColor(data.pricePosition)}`}>
            {data.pricePosition === 'above' && <IconArrowUp className="w-4 h-4" />}
            {data.pricePosition === 'below' && <IconArrowDown className="w-4 h-4" />}
            {data.pricePosition === 'average' && <IconMinus className="w-4 h-4" />}
            <span>Your pricing is {data.pricePosition} regional average</span>
          </span>
        </div>
      </motion.div>

      {/* Market Share & Demand Trend */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <IconUsers className="w-5 h-5 text-purple-600" />
            Market Position
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Market Share</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {data.marketShare}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${data.marketShare}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Competitors</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {data.competitorCount}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {data.category}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <IconTrendingUp className="w-5 h-5 text-purple-600" />
            Demand Trend
          </h3>

          <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getTrendColor(data.demandTrend).replace('text', 'bg').replace('-600', '-100').replace('-400', '-900/30')}`}>
                {getTrendIcon(data.demandTrend)}
              </div>
              <p className={`text-xl font-bold mt-3 ${getTrendColor(data.demandTrend)}`}>
                {data.demandTrend.charAt(0).toUpperCase() + data.demandTrend.slice(1)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current demand trend
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.demandTrend === 'rising' && 'High demand period - consider premium pricing'}
              {data.demandTrend === 'stable' && 'Stable market - competitive pricing recommended'}
              {data.demandTrend === 'declining' && 'Lower demand - consider promotional offers'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Top Performing Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <IconStar className="w-5 h-5 text-purple-600" />
          Top Performing Features
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.topPerformingFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl"
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Price History Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <IconChartBar className="w-5 h-5 text-purple-600" />
            Price History
          </h3>
          <div className="flex gap-2">
            {(['month', 'quarter', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 flex items-end gap-2">
          {data.priceHistory.slice(-12).map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end justify-center h-48">
                {/* Vendor Price Bar */}
                <div
                  className="w-3 bg-purple-500 rounded-t transition-all duration-300 hover:bg-purple-600"
                  style={{
                    height: `${(point.price / Math.max(...data.priceHistory.map(p => p.price))) * 100}%`
                  }}
                  title={`Your Price: ${point.price.toLocaleString()}`}
                />
                {/* Average Price Bar */}
                <div
                  className="w-3 bg-gray-400 dark:bg-gray-600 rounded-t transition-all duration-300 hover:bg-gray-500"
                  style={{
                    height: `${(point.averagePrice / Math.max(...data.priceHistory.map(p => p.averagePrice))) * 100}%`
                  }}
                  title={`Average: ${point.averagePrice.toLocaleString()}`}
                />
              </div>
              <div className="flex gap-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="w-3 h-3 bg-purple-500 rounded-sm" />
                <div className="w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-sm" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {point.date.toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-sm" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Your Price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-sm" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Regional Average</span>
          </div>
        </div>
      </motion.div>

      {/* Seasonality */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <IconCalendar className="w-5 h-5 text-purple-600" />
          Seasonal Demand
        </h3>

        <div className="grid grid-cols-12 gap-1">
          {data.seasonality.map((month, index) => {
            const demandLevel = month.demandLevel;
            const colorClass = demandLevel > 75
              ? 'bg-green-500'
              : demandLevel > 50
              ? 'bg-blue-500'
              : demandLevel > 25
              ? 'bg-yellow-500'
              : 'bg-red-500';

            return (
              <div
                key={index}
                className="group relative"
              >
                <div
                  className={`w-full rounded-t transition-all duration-300 hover:opacity-80 ${colorClass}`}
                  style={{ height: `${demandLevel}%` }}
                  title={`${month.month}: ${demandLevel}% demand`}
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div>{month.month}</div>
                  <div>Demand: {demandLevel}%</div>
                  <div>Avg Price: {month.averagePrice.toLocaleString()}</div>
                </div>
                <span className="block text-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {month.month.slice(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Marketing Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <IconInfoCircle className="w-5 h-5 text-purple-600" />
          AI-Powered Insights
        </h3>

        <div className="space-y-3">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 border-l-4 rounded-r-xl ${getInsightSeverityColor(insight.severity)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  insight.severity === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  insight.severity === 'warning' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                  'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                }`}>
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {insight.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      insight.impact === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                      insight.impact === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {insight.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {insight.description}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    💡 {insight.actionable}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
