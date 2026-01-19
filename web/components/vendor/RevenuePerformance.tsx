'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Star, Calendar, BarChart3, PieChart } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type RevenueData = {
  period: string;
  total: number;
  bookings: number;
  averagePerBooking: number;
  growth: number;
};

export type BookingStats = {
  period: string;
  total: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  conversionRate: number;
};

export type PerformanceMetrics = {
  period: string;
  responseTime: number;
  rating: number;
  reviewCount: number;
  repeatBookings: number;
};

type Props = {
  revenueData: RevenueData[];
  bookingStats: BookingStats[];
  performanceMetrics: PerformanceMetrics[];
};

export const RevenuePerformance = ({ revenueData, bookingStats, performanceMetrics }: Props) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('current');
  const [chartType, setChartType] = useState<'revenue' | 'bookings' | 'performance'>('revenue');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderRevenueChart = () => {
    const data = revenueData.find(d => d.period === selectedPeriod);
    if (!data) return null;

    const maxValue = Math.max(...revenueData.map(d => d.total));
    const chartHeight = 200;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-brand-200" />
              <span className="text-sm text-ivory/60">Total Revenue</span>
            </div>
            <div className="mt-1 text-3xl font-semibold text-ivory">
              {formatCurrency(data.total)}
            </div>
          </div>
          <Badge className={`border ${
            data.growth >= 0
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
              : 'border-red-500/30 bg-red-500/10 text-red-200'
          }`}>
            {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}%
          </Badge>
        </div>

        {/* Simple Bar Chart */}
        <div className="relative h-48 w-full">
          <div className="absolute inset-0 flex items-end justify-around gap-2 pb-8">
            {revenueData.map((d, index) => {
              const barHeight = maxValue > 0 ? (d.total / maxValue) * chartHeight : 0;
              const isSelected = d.period === selectedPeriod;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedPeriod(d.period)}
                  className={`flex flex-col items-center gap-2 transition-all cursor-pointer hover:scale-105 ${
                    isSelected ? 'scale-110' : ''
                  }`}
                >
                  <div
                    className="w-12 rounded-t-lg transition-all duration-300"
                    style={{
                      height: `${barHeight}px`,
                      backgroundColor: isSelected ? '#3b82f6' : '#3b82f640',
                    }}
                  />
                  <div className={`text-xs ${isSelected ? 'font-semibold text-brand-200' : 'text-ivory/60'}`}>
                    {d.period}
                  </div>
                  <div className="text-xs text-ivory/60">
                    {formatCurrency(d.total)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderBookingStats = () => {
    const stats = bookingStats.find(s => s.period === selectedPeriod);
    if (!stats) return null;

    const total = stats.confirmed + stats.completed + stats.cancelled;
    const confirmedPercent = total > 0 ? (stats.confirmed / total) * 100 : 0;
    const completedPercent = total > 0 ? (stats.completed / total) * 100 : 0;
    const cancelledPercent = total > 0 ? (stats.cancelled / total) * 100 : 0;

    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Confirmed */}
          <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-ivory/60">Confirmed</div>
                <div className="mt-2 text-2xl font-semibold text-ivory">{stats.confirmed}</div>
              </div>
              <div className="h-12 w-12">
                <svg viewBox="0 0 36 36" className="h-full w-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-ivory/10" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="100"
                    strokeDashoffset={`${100 - confirmedPercent}`}
                    className="text-brand-500"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-ivory/60">Completed</div>
                <div className="mt-2 text-2xl font-semibold text-ivory">{stats.completed}</div>
              </div>
              <div className="h-12 w-12">
                <svg viewBox="0 0 36 36" className="h-full w-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-ivory/10" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="100"
                    strokeDashoffset={`${100 - completedPercent}`}
                    className="text-emerald-500"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Cancelled */}
          <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-ivory/60">Cancelled</div>
                <div className="mt-2 text-2xl font-semibold text-ivory">{stats.cancelled}</div>
              </div>
              <div className="h-12 w-12">
                <svg viewBox="0 0 36 36" className="h-full w-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-ivory/10" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="100"
                    strokeDashoffset={`${100 - cancelledPercent}`}
                    className="text-red-500"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-ivory/60">Conversion Rate</div>
              <div className="mt-2 text-2xl font-semibold text-ivory">{stats.conversionRate.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        {/* Average Value */}
        <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-ivory/60" />
            <div>
              <div className="text-xs uppercase tracking-wider text-ivory/60">Average per Booking</div>
              <div className="mt-2 text-2xl font-semibold text-ivory">
                  {formatCurrency(chartType === 'revenue' ? revenueData.find(d => d.period === selectedPeriod)?.averagePerBooking || 0 : bookingStats.find(s => s.period === selectedPeriod)?.averagePerBooking || 0)}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPerformanceMetrics = () => {
    const metrics = performanceMetrics.find(m => m.period === selectedPeriod);
    if (!metrics) return null;

    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Response Time */}
          <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-ivory/60" />
              <div>
                <div className="text-xs uppercase tracking-wider text-ivory/60">Avg Response Time</div>
                <div className="mt-2 text-2xl font-semibold text-ivory">{metrics.responseTime}h</div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400" />
              <div>
                <div className="text-xs uppercase tracking-wider text-ivory/60">Rating</div>
                <div className="mt-2 text-2xl font-semibold text-ivory">{metrics.rating.toFixed(1)}</div>
              </div>
            </div>
          </div>

          {/* Review Count */}
          <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-ivory/60" />
              <div>
                <div className="text-xs uppercase tracking-wider text-ivory/60">Reviews</div>
                <div className="mt-2 text-2xl font-semibold text-ivory">{metrics.reviewCount}</div>
              </div>
            </div>
          </div>

          {/* Repeat Bookings */}
          <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <div>
                <div className="text-xs uppercase tracking-wider text-ivory/60">Repeat Bookings</div>
                <div className="mt-2 text-2xl font-semibold text-ivory">{metrics.repeatBookings}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-5 w-5 text-ivory/60" />
            <span className="text-sm font-medium text-ivory">Performance Trend</span>
          </div>

          <div className="space-y-2">
            {performanceMetrics.map((m, index) => {
              const isCurrent = m.period === selectedPeriod;
              const ratingChange = index > 0 ? m.rating - performanceMetrics[index - 1].rating : 0;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-lg p-2 transition-all ${
                    isCurrent ? 'bg-brand-500/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${isCurrent ? 'font-semibold text-brand-200' : 'text-ivory/60'}`}>
                      {m.period}
                    </span>
                    <span className="text-ivory/60">Rating: {m.rating.toFixed(1)}</span>
                  </div>
                  {ratingChange !== 0 && (
                    <div className={`flex items-center gap-1 text-sm ${
                      ratingChange > 0 ? 'text-emerald-200' : 'text-red-200'
                    }`}>
                      {ratingChange > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(ratingChange).toFixed(1)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <GlassCard className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-ivory">Revenue & Performance</h2>
          <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">
            {revenueData.length} periods
          </Badge>
        </div>

        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-lg border border-ivory/15 bg-background/70 px-4 py-2 text-sm text-ivory focus:border-brand-500/40 focus:outline-none"
          >
            {revenueData.map(d => (
              <option key={d.period} value={d.period}>
                {d.period}
              </option>
            ))}
          </select>

          <div className="flex rounded-lg border border-ivory/15 bg-background/70">
            <button
              onClick={() => setChartType('revenue')}
              className={`rounded-l-lg px-3 py-2 text-sm font-medium transition-colors ${
                chartType === 'revenue'
                  ? 'bg-brand-500/10 text-brand-200'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              <DollarSign className="mr-1 h-4 w-4" />
              Revenue
            </button>
            <button
              onClick={() => setChartType('bookings')}
              className={`rounded-r-lg px-3 py-2 text-sm font-medium transition-colors ${
                chartType === 'bookings'
                  ? 'bg-brand-500/10 text-brand-200'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              <Calendar className="mr-1 h-4 w-4" />
              Bookings
            </button>
            <button
              onClick={() => setChartType('performance')}
              className={`rounded-r-lg px-3 py-2 text-sm font-medium transition-colors ${
                chartType === 'performance'
                  ? 'bg-brand-500/10 text-brand-200'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              <PieChart className="mr-1 h-4 w-4" />
              Performance
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {chartType === 'revenue' && renderRevenueChart()}
      {chartType === 'bookings' && renderBookingStats()}
      {chartType === 'performance' && renderPerformanceMetrics()}
    </GlassCard>
  );
};
