'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconTrendingUp, IconTrendingDown, IconInfo, IconFilter, IconX } from '@tabler/icons-react';
import { PriceStabilityChart } from '../../components/marketplace-trends/PriceStabilityChart';
import { BudgetGauge } from '../../components/marketplace-trends/BudgetGauge';

type PriceDataPoint = {
  date: Date;
  price: number;
  predictedPrice: number;
  confidence: number;
};

type VendorListing = {
  id: string;
  name: string;
  service: string;
  price: number;
  marketAverage: number;
  priceStability: 'stable' | 'rising' | 'falling';
  rating: number;
};

export default function MarketplaceTrendsPage() {
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('30d');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredVendor, setHoveredVendor] = useState<VendorListing | null>(null);

  // Mock data - replace with API call
  const priceHistory: PriceDataPoint[] = [
    { date: new Date('2024-01-01'), price: 150000, predictedPrice: 155000, confidence: 0.85 },
    { date: new Date('2024-01-05'), price: 152000, predictedPrice: 153000, confidence: 0.88 },
    { date: new Date('2024-01-10'), price: 148000, predictedPrice: 150000, confidence: 0.82 },
    { date: new Date('2024-01-15'), price: 155000, predictedPrice: 157000, confidence: 0.90 },
    { date: new Date('2024-01-20'), price: 160000, predictedPrice: 162000, confidence: 0.87 },
  { date: new Date('2024-01-25'), price: 158000, predictedPrice: 160000, confidence: 0.84 },
    { date: new Date('2024-02-01'), price: 162000, predictedPrice: 165000, confidence: 0.86 },
    { date: new Date('2024-02-05'), price: 165000, predictedPrice: 168000, confidence: 0.89 },
    { date: new Date('2024-02-10'), price: 170000, predictedPrice: 172000, confidence: 0.91 },
    { date: new Date('2024-02-15'), price: 168000, predictedPrice: 170000, confidence: 0.88 },
    { date: new Date('2024-02-20'), price: 172000, predictedPrice: 175000, confidence: 0.92 },
    { date: new Date('2024-02-25'), price: 175000, predictedPrice: 178000, confidence: 0.94 },
    { date: new Date('2024-03-01'), price: 178000, predictedPrice: 180000, confidence: 0.90 },
  ];

  const vendors: VendorListing[] = [
    { id: 'v1', name: 'Siam Wedding Planner', service: 'Full Service Package', price: 150000, marketAverage: 145000, priceStability: 'stable', rating: 4.8 },
    { id: 'v2', name: 'Thai Blessing Ceremonies', service: 'Monk Services', price: 85000, marketAverage: 80000, priceStability: 'stable', rating: 4.5 },
    { id: 'v3', name: 'Royal Thai Cuisine', service: 'Catering', price: 120000, marketAverage: 115000, priceStability: 'rising', rating: 4.9 },
    { id: 'v4', name: 'Grand Ballroom Venue', service: 'Venue Rental', price: 80000, marketAverage: 75000, priceStability: 'stable', rating: 4.7 },
    { id: 'v5', name: 'Traditional Music Ensemble', service: 'Live Music', price: 35000, marketAverage: 32000, priceStability: 'stable', rating: 4.6 },
    { id: 'v6', name: 'Elegant Photography', service: 'Photography Package', price: 45000, marketAverage: 42000, priceStability: 'rising', rating: 4.8 },
    { id: 'v7', name: 'Floral Arrangements', service: 'Flower Decoration', price: 25000, marketAverage: 23000, priceStability: 'stable', rating: 4.4 },
    { id: 'v8', name: 'Bride Makeup & Styling', service: 'Beauty Services', price: 15000, marketAverage: 14000, priceStability: 'stable', rating: 4.3 },
  ];

  const filteredVendors = selectedService === 'all'
    ? vendors
    : vendors.filter(v => v.service.toLowerCase().includes(selectedService.toLowerCase()));

  const currentPrice = priceHistory[priceHistory.length - 1].price;
  const predictedPrice = priceHistory[priceHistory.length - 1].predictedPrice;
  const priceStability = currentPrice > priceHistory[priceHistory.length - 2].price
    ? 'rising'
    : currentPrice < priceHistory[priceHistory.length - 2].price
    ? 'falling'
    : 'stable';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Marketplace Trends & Price Prediction
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered insights for wedding vendors and pricing
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <IconFilter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Price Stability Chart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Price Stability for Your Selected Date
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Based on AI analysis of {priceHistory.length} data points
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTimeRange('7d')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTimeRange === '7d'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setSelectedTimeRange('30d')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTimeRange === '30d'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setSelectedTimeRange('90d')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTimeRange === '90d'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                90 Days
              </button>
            </div>
          </div>

          <PriceStabilityChart
            priceHistory={priceHistory}
            selectedTimeRange={selectedTimeRange}
          />

          {/* AI Prediction Summary */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <IconInfo className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-900 dark:text-purple-300">
                  AI Price Prediction
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {predictedPrice.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    predicted for your selected date
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1">
                    {priceStability === 'rising' ? (
                      <IconTrendingUp className="w-5 h-5 text-red-500" />
                    ) : priceStability === 'falling' ? (
                      <IconTrendingDown className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    )}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {priceStability === 'rising' ? 'prices trending upward' : priceStability === 'falling' ? 'prices trending downward' : 'prices stable'}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Confidence: <span className="font-semibold">{(priceHistory[priceHistory.length - 1].confidence * 100).toFixed(0)}%</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Based on historical data and market conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Realistic Budget Gauge */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Realistic Budget Gauge
            </h2>
            <BudgetGauge
              currentPrice={currentPrice}
              predictedPrice={predictedPrice}
              priceStability={priceStability}
            />
          </motion.div>
        </div>

        {/* Vendor Listings with Market Benchmark */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Vendor Listings
              </h2>
              <div className="flex gap-2">
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Services</option>
                  <option value="full">Full Service Package</option>
                  <option value="monk">Monk Services</option>
                  <option value="catering">Catering</option>
                  <option value="venue">Venue Rental</option>
                  <option value="music">Live Music</option>
                  <option value="photography">Photography</option>
                  <option value="floral">Flower Decoration</option>
                  <option value="beauty">Beauty Services</option>
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <IconFilter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Vendor Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredVendor(vendor)}
                  onHoverEnd={() => setHoveredVendor(null)}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600"
                >
                  {/* Vendor Card */}
                  <div className="relative">
                    {/* Price Stability Indicator */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                      vendor.priceStability === 'rising'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : vendor.priceStability === 'falling'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    }`}>
                      {vendor.priceStability === 'rising' ? (
                        <IconTrendingUp className="w-3 h-3" />
                      ) : vendor.priceStability === 'falling' ? (
                        <IconTrendingDown className="w-3 h-3" />
                      ) : (
                        <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
                      )}
                      <span className="hidden md:inline">Prices {vendor.priceStability}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🎊</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {vendor.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {vendor.service}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {vendor.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your estimated cost
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Market Average
                          </span>
                          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            {vendor.marketAverage.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                          </span>
                        </div>
                        <div className={`text-sm px-2 py-1 rounded-full ${
                          vendor.price > vendor.marketAverage
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : vendor.price < vendor.marketAverage
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                        }`}>
                          {vendor.price > vendor.marketAverage ? '+' : vendor.price < vendor.marketAverage ? '-' : '='}
                          {Math.round(((vendor.price - vendor.marketAverage) / vendor.marketAverage) * 100)}%
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Rating</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`w-4 h-4 ${
                                star <= vendor.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Benchmark Tooltip */}
                    <div className={`mt-4 p-4 rounded-lg border-2 ${
                      hoveredVendor === vendor
                        ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500'
                        : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                    }`}>
                      <div className="flex items-start gap-3">
                        <IconInfo className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white mb-1">
                            Market Benchmark
                          </p>
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>
                              <span className="font-medium">Average Price:</span>{' '}
                              {vendor.marketAverage.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                            </p>
                            <p>
                              <span className="font-medium">Price Stability:</span>{' '}
                              <span className={`capitalize ${
                                vendor.priceStability === 'rising'
                                  ? 'text-red-600 dark:text-red-400'
                                  : vendor.priceStability === 'falling'
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}>
                                {vendor.priceStability}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium">Rating:</span>{' '}
                              <span className="text-yellow-600 dark:text-yellow-400">★ {vendor.rating.toFixed(1)}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
