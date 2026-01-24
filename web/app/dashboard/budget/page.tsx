import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerAccessToken } from '@/lib/auth/server';
import { PlanningAPI } from '@/lib/api/planning-api';
import { BudgetTracker } from '@/components/dashboard/BudgetTracker';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Plus, TrendingUp } from 'lucide-react';

export default async function DashboardBudgetPage() {
  const token = getServerAccessToken();
  if (!token) {
    redirect('/auth/login?next=/dashboard/budget');
  }

  // Fetch budget data from API
  let budgetData = {
    totalBudget: 500000,
    totalSpent: 0,
    remaining: 500000,
    currency: 'THB',
    categories: [] as Array<{
      id: string;
      name: string;
      budgeted: number;
      spent: number;
      color: string;
    }>,
    items: [] as Array<{
      id: string;
      name: string;
      category: string;
      budgeted: number;
      spent: number;
      status: 'under' | 'on_track' | 'over';
    }>,
  };

  try {
    const budgetEstimate = await PlanningAPI.calculateBudget({
      eventType: 'wedding',
      guestCount: 100,
      region: 'central',
      budget: 500000,
    });
    if (budgetEstimate) {
      budgetData.totalBudget = budgetEstimate.total.median;
      budgetData.categories = [
        {
          id: '1',
          name: 'Venue',
          budgeted: budgetEstimate.breakdown.venue.median,
          spent: 0,
          color: '#3b82f6',
        },
        {
          id: '2',
          name: 'Catering',
          budgeted: budgetEstimate.breakdown.catering.median,
          spent: 0,
          color: '#8b5cf6',
        },
        {
          id: '3',
          name: 'Photography',
          budgeted: budgetEstimate.breakdown.photography.median,
          spent: 0,
          color: '#10b981',
        },
        {
          id: '4',
          name: 'Decorations',
          budgeted: budgetEstimate.breakdown.decoration.median,
          spent: 0,
          color: '#f59e0b',
        },
        {
          id: '5',
          name: 'Entertainment',
          budgeted: budgetEstimate.breakdown.entertainment.median,
          spent: 0,
          color: '#ef4444',
        },
        {
          id: '6',
          name: 'Other',
          budgeted: budgetEstimate.breakdown.others.median,
          spent: 0,
          color: '#06b6d4',
        },
      ];
      budgetData.remaining = budgetData.totalBudget;
    }
  } catch (error) {
    console.error('Failed to fetch budget data:', error);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-ivory">Budget Tracker</h1>
          <p className="text-ivory/60">
            Track your wedding expenses and manage your budget efficiently
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Budget Tracker */}
      <BudgetTracker
        data={budgetData}
        onItemEdit={(itemId) => console.log('Edit budget item:', itemId)}
      />

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-500/20 p-3">
                <TrendingUp className="h-6 w-6 text-brand-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Total Budget</p>
                <p className="text-2xl font-semibold text-ivory">
                  {new Intl.NumberFormat('th-TH', {
                    style: 'currency',
                    currency: budgetData.currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(budgetData.totalBudget)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/20 p-3">
                <TrendingUp className="h-6 w-6 text-emerald-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Total Spent</p>
                <p className="text-2xl font-semibold text-emerald-200">
                  {new Intl.NumberFormat('th-TH', {
                    style: 'currency',
                    currency: budgetData.currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(budgetData.totalSpent)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-500/20 p-3">
                <TrendingUp className="h-6 w-6 text-brand-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Remaining</p>
                <p className="text-2xl font-semibold text-brand-200">
                  {new Intl.NumberFormat('th-TH', {
                    style: 'currency',
                    currency: budgetData.currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(budgetData.remaining)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Back Link */}
      <div className="mt-8">
        <Link
          href="/dashboard"
          className="text-sm text-brand-200 hover:text-brand-100"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
