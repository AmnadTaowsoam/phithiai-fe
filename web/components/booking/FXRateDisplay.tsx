'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconRefresh,
  IconTrendingUp,
  IconTrendingDown,
  IconClock,
  IconInfoCircle,
  IconChevronDown,
  IconChevronUp,
  IconCheck,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';

export interface FXRate {
  from: Currency;
  to: Currency;
  rate: number;
  lastUpdated: Date;
  trend?: 'up' | 'down' | 'stable';
  changePercent?: number;
  ttl?: number; // Time to live in minutes
  source?: string;
}

export interface FXRateDisplayProps {
  rates: FXRate[];
  baseCurrency: Currency;
  targetCurrency: Currency;
  showTrend?: boolean;
  showHistory?: boolean;
  variant?: 'compact' | 'detailed' | 'inline';
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
}

export function FXRateDisplay({
  rates,
  baseCurrency,
  targetCurrency,
  showTrend = true,
  showHistory = false,
  variant = 'detailed',
  onRefresh,
  isRefreshing = false,
}: FXRateDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState<string>('');

  const currentRate = rates.find((r) => r.from === baseCurrency && r.to === targetCurrency);
  const { CURRENCIES } = useCurrency();

  useEffect(() => {
    if (currentRate) {
      const updateTime = () => {
        const now = new Date();
        const diff = now.getTime() - currentRate.lastUpdated.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) setTimeSinceUpdate('Just now');
        else if (minutes < 60) setTimeSinceUpdate(`${minutes}m ago`);
        else if (hours < 24) setTimeSinceUpdate(`${hours}h ago`);
        else setTimeSinceUpdate(`${days}d ago`);
      };

      updateTime();
      const interval = setInterval(updateTime, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [currentRate]);

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <IconTrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <IconTrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getRateStatus = (rate?: FXRate) => {
    if (!rate) return { status: 'unknown', color: 'gray', icon: IconAlertTriangle };

    const now = new Date();
    const diff = (now.getTime() - rate.lastUpdated.getTime()) / 60000; // minutes
    const ttl = rate.ttl || 60; // default 1 hour TTL

    if (diff < ttl / 2) {
      return { status: 'fresh', color: 'green', icon: IconCheck };
    } else if (diff < ttl) {
      return { status: 'aging', color: 'yellow', icon: IconClock };
    } else {
      return { status: 'stale', color: 'red', icon: IconAlertTriangle };
    }
  };

  const rateStatus = getRateStatus(currentRate);
  const StatusIcon = rateStatus.icon;

  const renderCompact = () => (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-600 dark:text-gray-400">
        1 {baseCurrency} = {currentRate?.rate.toFixed(4) || '---'} {targetCurrency}
      </span>
      {showTrend && currentRate?.trend && getTrendIcon(currentRate.trend)}
      <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
        <IconClock className="w-3 h-3" />
        {timeSinceUpdate}
      </span>
      {onRefresh && (
        <button
          onClick={() => onRefresh()}
          disabled={isRefreshing}
          className="text-brand-600 hover:text-brand-700 disabled:opacity-50"
        >
          <IconRefresh className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      )}
    </div>
  );

  const renderDetailed = () => (
    <Card className="border-ivory/10 bg-background/70">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl">{CURRENCIES[baseCurrency].flag}</div>
            <IconTrendingUp className="w-5 h-5 text-gray-400" />
            <div className="text-2xl">{CURRENCIES[targetCurrency].flag}</div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                rateStatus.color === 'green'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : rateStatus.color === 'yellow'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              <StatusIcon className="w-3 h-3" />
              {rateStatus.status.toUpperCase()}
            </span>
            {onRefresh && (
              <button
                onClick={() => onRefresh()}
                disabled={isRefreshing}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                title="Refresh rates"
              >
                <IconRefresh className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Current Rate */}
        <div className="text-center mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Exchange Rate
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentRate?.rate.toFixed(4) || '---'}
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            {showTrend && currentRate?.trend && (
              <div className="flex items-center gap-1">
                {getTrendIcon(currentRate.trend)}
                {currentRate.changePercent && (
                  <span
                    className={`text-sm font-medium ${
                      currentRate.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {currentRate.changePercent > 0 ? '+' : ''}
                    {currentRate.changePercent.toFixed(2)}%
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Rate Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Base Currency</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {CURRENCIES[baseCurrency].name} ({baseCurrency})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Target Currency</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {CURRENCIES[targetCurrency].name} ({targetCurrency})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
            <span className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
              <IconClock className="w-3 h-3" />
              {timeSinceUpdate}
            </span>
          </div>
          {currentRate?.source && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Data Source</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {currentRate.source}
              </span>
            </div>
          )}
          {currentRate?.ttl && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Refreshes in</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.max(0, currentRate.ttl - Math.floor((Date.now() - currentRate.lastUpdated.getTime()) / 60000))}m
              </span>
            </div>
          )}
        </div>

        {/* Trust Badge */}
        <div className="mt-4 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-200 dark:border-brand-800">
          <div className="flex items-start gap-2">
            <IconInfoCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-brand-800 dark:text-brand-200">
              Exchange rates are updated hourly from trusted financial data providers. Rates shown are indicative and may vary at time of payment.
            </div>
          </div>
        </div>

        {/* Expandable History */}
        {showHistory && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Rate History
              </span>
              {isExpanded ? (
                <IconChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <IconChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-2"
                >
                  {rates
                    .filter((r) => r.from === baseCurrency && r.to === targetCurrency)
                    .slice(0, 5)
                    .map((rate, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <span className="text-gray-600 dark:text-gray-400">
                          {new Date(rate.lastUpdated).toLocaleDateString()}{' '}
                          {new Date(rate.lastUpdated).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {rate.rate.toFixed(4)}
                        </span>
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderInline = () => (
    <div className="inline-flex items-center gap-3 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-1">
        <span className="text-lg">{CURRENCIES[baseCurrency].flag}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">→</span>
        <span className="text-lg">{CURRENCIES[targetCurrency].flag}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          {currentRate?.rate.toFixed(4) || '---'}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
          <IconClock className="w-3 h-3" />
          {timeSinceUpdate}
        </span>
      </div>
      {showTrend && currentRate?.trend && getTrendIcon(currentRate.trend)}
      {onRefresh && (
        <button
          onClick={() => onRefresh()}
          disabled={isRefreshing}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <IconRefresh className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      )}
    </div>
  );

  if (variant === 'compact') return renderCompact();
  if (variant === 'inline') return renderInline();
  return renderDetailed();
}

// Hook for fetching real-time FX rates
export function useFXRates(baseCurrency: Currency, targetCurrencies: Currency[]) {
  const [rates, setRates] = useState<FXRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In production, this would call your backend API
      // For now, we'll use mock data with realistic timestamps
      const mockRates: FXRate[] = targetCurrencies.map((target) => ({
        from: baseCurrency,
        to: target,
        rate: Math.random() * 0.05 + 0.02, // Mock rate
        lastUpdated: new Date(Date.now() - Math.random() * 3600000), // Random time in last hour
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
        changePercent: (Math.random() - 0.5) * 2, // -1% to +1%
        ttl: 60, // 1 hour TTL
        source: 'Open Exchange Rates',
      }));

      setRates(mockRates);
    } catch (err) {
      setError('Failed to fetch exchange rates');
      console.error('FX Rate fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();

    // Auto-refresh every hour
    const interval = setInterval(fetchRates, 3600000);
    return () => clearInterval(interval);
  }, [baseCurrency, targetCurrencies]);

  const getRate = (target: Currency): FXRate | undefined => {
    return rates.find((r) => r.from === baseCurrency && r.to === target);
  };

  return {
    rates,
    isLoading,
    error,
    fetchRates,
    getRate,
  };
}
