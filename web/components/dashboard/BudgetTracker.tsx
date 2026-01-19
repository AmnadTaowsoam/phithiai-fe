'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, PieChart, BarChart3 } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';

export type BudgetCategory = {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
};

export type BudgetItem = {
  id: string;
  name: string;
  category: string;
  budgeted: number;
  spent: number;
  status: 'under' | 'on_track' | 'over';
};

export type BudgetData = {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  categories: BudgetCategory[];
  items: BudgetItem[];
  currency: string;
};

type Props = {
  data: BudgetData;
  onItemEdit?: (itemId: string) => void;
};

const categoryColors = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#f97316', // orange
];

export const BudgetTracker = ({ data, onItemEdit }: Props) => {
  const [selectedView, setSelectedView] = useState<'overview' | 'breakdown' | 'items'>('overview');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const budgetUtilization = data.totalBudget > 0 ? (data.totalSpent / data.totalBudget) * 100 : 0;
  const isOverBudget = budgetUtilization > 100;
  const isNearBudget = budgetUtilization > 80 && budgetUtilization <= 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: data.currency || 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderPieChart = () => {
    const total = data.categories.reduce((sum, cat) => sum + cat.spent, 0);
    let currentAngle = 0;

    return (
      <div className="relative h-48 w-48">
        <svg viewBox="0 0 100 100" className="h-full w-full transform -rotate-90">
          {data.categories.map((category, index) => {
            if (total === 0) return null;
            const percentage = (category.spent / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

            const largeArcFlag = angle > 180 ? 1 : 0;

            currentAngle += angle;

            return (
              <path
                key={category.id}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={category.color}
                className="transition-all duration-300 hover:opacity-80"
                style={{ opacity: hoveredCategory === null || hoveredCategory === category.id ? 1 : 0.6 }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              />
            );
          })}
        </svg>

        {/* Center circle for donut effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs text-ivory/60">Spent</div>
            <div className="text-lg font-semibold text-ivory">{formatCurrency(data.totalSpent)}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderBarChart = () => {
    const maxValue = Math.max(...data.categories.map(c => Math.max(c.budgeted, c.spent)));

    return (
      <div className="space-y-4">
        {data.categories.map((category) => {
          const budgetedWidth = maxValue > 0 ? (category.budgeted / maxValue) * 100 : 0;
          const spentWidth = maxValue > 0 ? (category.spent / maxValue) * 100 : 0;
          const isOver = category.spent > category.budgeted;

          return (
            <div key={category.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ivory">{category.name}</span>
                <span className={`text-sm ${isOver ? 'text-red-200' : 'text-ivory/80'}`}>
                  {formatCurrency(category.spent)} / {formatCurrency(category.budgeted)}
                </span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-ivory/10">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-ivory/20"
                  style={{ width: `${budgetedWidth}%` }}
                />
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                    isOver ? 'bg-red-500' : category.color
                  }`}
                  style={{ width: `${spentWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <GlassCard className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ivory">Budget Tracker</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('overview')}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedView === 'overview'
                ? 'border-brand-500/40 bg-brand-500/10 text-brand-200'
                : 'border-ivory/15 bg-background/70 text-ivory hover:border-ivory/25'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedView('breakdown')}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedView === 'breakdown'
                ? 'border-brand-500/40 bg-brand-500/10 text-brand-200'
                : 'border-ivory/15 bg-background/70 text-ivory hover:border-ivory/25'
            }`}
          >
            Breakdown
          </button>
          <button
            onClick={() => setSelectedView('items')}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedView === 'items'
                ? 'border-brand-500/40 bg-brand-500/10 text-brand-200'
                : 'border-ivory/15 bg-background/70 text-ivory hover:border-ivory/25'
            }`}
          >
            Items
          </button>
        </div>
      </div>

      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ivory/60">
                <Wallet className="h-4 w-4" />
                Total Budget
              </div>
              <div className="mt-2 text-2xl font-semibold text-ivory">
                {formatCurrency(data.totalBudget)}
              </div>
            </div>

            <div className="rounded-lg border border-ivory/10 bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ivory/60">
                <PieChart className="h-4 w-4" />
                Total Spent
              </div>
              <div className="mt-2 text-2xl font-semibold text-ivory">
                {formatCurrency(data.totalSpent)}
              </div>
              <div className="mt-1 text-xs text-ivory/60">
                {budgetUtilization.toFixed(1)}% utilized
              </div>
            </div>

            <div className={`rounded-lg border p-4 ${
              isOverBudget
                ? 'border-red-500/30 bg-red-500/10'
                : isNearBudget
                ? 'border-amber-500/30 bg-amber-500/10'
                : 'border-emerald-500/30 bg-emerald-500/10'
            }`}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ivory/80">
                {isOverBudget ? (
                  <>
                    <TrendingDown className="h-4 w-4" />
                    Over Budget
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4" />
                    Remaining
                  </>
                )}
              </div>
              <div className={`mt-2 text-2xl font-semibold ${
                isOverBudget ? 'text-red-200' : 'text-emerald-200'
              }`}>
                {formatCurrency(data.remaining)}
              </div>
              <div className="mt-1 text-xs text-ivory/60">
                {data.remaining > 0 ? 'Available to spend' : 'Exceeded budget'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ivory">Overall Budget Utilization</span>
              <span className={`text-sm font-semibold ${
                isOverBudget ? 'text-red-200' : isNearBudget ? 'text-amber-200' : 'text-emerald-200'
              }`}>
                {budgetUtilization.toFixed(1)}%
              </span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-ivory/10">
              <div
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                  isOverBudget ? 'bg-red-500' : isNearBudget ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {selectedView === 'breakdown' && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pie Chart */}
          <div className="flex flex-col items-center">
            {renderPieChart()}
            <div className="mt-4 grid w-full grid-cols-2 gap-2">
              {data.categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors ${
                    hoveredCategory === category.id
                      ? 'border-ivory/30 bg-background/80'
                      : 'border-ivory/10 bg-background/60'
                  }`}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-ivory">{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-ivory/60" />
              <span className="text-sm font-medium text-ivory">Budget vs. Spent</span>
            </div>
            {renderBarChart()}
          </div>
        </div>
      )}

      {selectedView === 'items' && (
        <div className="space-y-2">
          {data.items.map((item) => {
            const utilization = item.budgeted > 0 ? (item.spent / item.budgeted) * 100 : 0;
            const isOver = item.spent > item.budgeted;

            return (
              <div
                key={item.id}
                onClick={() => onItemEdit?.(item.id)}
                className="flex items-center justify-between rounded-lg border border-ivory/10 bg-background/60 px-4 py-3 hover:border-ivory/20 cursor-pointer transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-ivory">{item.name}</span>
                    <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-xs text-ivory/60">
                    <span>Budgeted: {formatCurrency(item.budgeted)}</span>
                    <span className={isOver ? 'text-red-200' : 'text-emerald-200'}>
                      Spent: {formatCurrency(item.spent)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      isOver ? 'text-red-200' : 'text-ivory'
                    }`}>
                      {isOver ? `+${formatCurrency(item.spent - item.budgeted)}` : formatCurrency(item.budgeted - item.spent)}
                    </div>
                    <div className="text-xs text-ivory/60">{utilization.toFixed(0)}% used</div>
                  </div>
                  <Badge className={`border ${
                    item.status === 'over' ? 'border-red-500/30 bg-red-500/10 text-red-200' :
                    item.status === 'on_track' ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' :
                    'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                  }`}>
                    {item.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
};
