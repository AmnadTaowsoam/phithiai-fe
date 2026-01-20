'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { PriceDataPoint } from '../memory-book/types';

interface PriceStabilityChartProps {
  priceHistory: PriceDataPoint[];
  selectedTimeRange: string;
}

export function PriceStabilityChart({ priceHistory, selectedTimeRange }: PriceStabilityChartProps) {
  const getFilteredData = () => {
    const now = new Date();
    const days = parseInt(selectedTimeRange);
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    return priceHistory.filter(point => point.date <= cutoffDate);
  };

  const data = getFilteredData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const point = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-600">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {point.date.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {point.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Actual Price</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {point.predictedPrice.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">AI Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Confidence:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {(point.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' });
            }}
            stroke="#9333ea"
            strokeWidth={2}
            tick={{ fill: '#9333ea', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
          />
          <YAxis 
            stroke="#9333ea" 
            strokeWidth={2}
            tick={{ fill: '#9333ea', fontSize: 12 }}
            tickFormatter={(value) => value.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
            tickLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
          />
          <Line 
            type="monotone"
            dataKey="price"
            stroke="#9333ea"
            strokeWidth={3}
            dot={{ fill: '#9333ea', strokeWidth: 2, r: 4 }}
            activeDot={{ fill: '#ec4899', strokeWidth: 2, r: 6 }}
            name="Actual Price"
          />
          <Line 
            type="monotone"
            dataKey="predictedPrice"
            stroke="#10b981"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            name="AI Predicted"
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
