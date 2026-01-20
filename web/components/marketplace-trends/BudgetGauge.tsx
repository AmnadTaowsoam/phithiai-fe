'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconTrendingUp, IconTrendingDown, IconAlertTriangle } from '@tabler/icons-react';

interface BudgetGaugeProps {
  currentPrice: number;
  predictedPrice: number;
  priceStability: 'stable' | 'rising' | 'falling';
}

export function BudgetGauge({ currentPrice, predictedPrice, priceStability }: BudgetGaugeProps) {
  const priceDifference = predictedPrice - currentPrice;
  const priceRatio = currentPrice / predictedPrice;
  const percentage = Math.min(Math.max(priceRatio * 100, 0), 100);
  
  const getGaugeColor = () => {
    if (priceStability === 'rising' && priceRatio > 1.1) {
      return 'from-red-500 to-red-600';
    } else if (priceStability === 'falling' && priceRatio < 0.9) {
      return 'from-green-500 to-green-600';
    } else {
      return 'from-yellow-500 to-yellow-600';
    }
  };

  const getStatusText = () => {
    if (priceStability === 'rising' && priceRatio > 1.1) {
      return 'Above Budget';
    } else if (priceStability === 'falling' && priceRatio < 0.9) {
      return 'Under Budget';
    } else {
      return 'Within Budget';
    }
  };

  const getStatusIcon = () => {
    if (priceStability === 'rising' && priceRatio > 1.1) {
      return <IconTrendingUp className="w-5 h-5" />;
    } else if (priceStability === 'falling' && priceRatio < 0.9) {
      return <IconTrendingDown className="w-5 h-5" />;
    } else {
      return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Realistic Budget Gauge
      </h2>

      <div className="relative w-64 h-64 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <path
            d="M 100 200 A 100 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: getGaugeColor().includes('red') ? 314 : getGaugeColor().includes('green') ? 628 : 471 }}
            transition={{ duration: 1 }}
            d="M 100 200 A 100 0"
            fill="none"
            stroke="url(#gauge-gradient)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor={getGaugeColor().includes('red') ? '#ef4444' : getGaugeColor().includes('green') ? '#22c55e' : '#fbbf24'} />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {currentPrice.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
            </div>
            <div className="flex items-center gap-2 mb-4">
              {getStatusIcon()}
              <span className={`text-lg font-semibold ${getGaugeColor().includes('red') ? 'text-red-600 dark:text-red-400' : getGaugeColor().includes('green') ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                {getStatusText()}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              of {predictedPrice.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })} budget
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <div className={`text-6xl font-bold ${getGaugeColor().includes('red') ? 'text-red-600 dark:text-red-400' : getGaugeColor().includes('green') ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
              {percentage.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              of budget
            </div>
          </motion.div>

          <div className="absolute bottom-4 right-4 transform translate-x-1/2">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {getStatusText()}
              </span>
            </div>
            {priceStability !== 'stable' && (
              <IconAlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30"></div>
          <span className="text-gray-600 dark:text-gray-400">Above budget</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30"></div>
          <span className="text-gray-600 dark:text-gray-400">Within budget</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30"></div>
          <span className="text-gray-600 dark:text-gray-400">Stable prices</span>
        </div>
      </div>
    </div>
  );
}
