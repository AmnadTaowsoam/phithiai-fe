'use client';

import { PageHeader } from '@/components/layout/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { BookingStatusChart } from '@/components/dashboard/booking-status-chart';
import { RecentBookings } from '@/components/dashboard/recent-bookings';
import { Users, Store, Calendar, DollarSign } from 'lucide-react';
import { useDashboardData } from '@/hooks/use-dashboard-data';

export default function AdminDashboardPage() {
  const { metrics, revenueData, bookingStatus, recentBookings, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Platform overview and key metrics." />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Platform overview and key metrics." />
        <div className="text-center py-12 text-red-500">
          Failed to load dashboard data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Platform overview and key metrics." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Users" 
          value={metrics.activeUsers} 
          change={0.06} 
          trend="up" 
          icon={Users} 
          formatType="number" 
        />
        <StatCard 
          title="Active Vendors" 
          value={metrics.activeVendors} 
          change={0.02} 
          trend="up" 
          icon={Store} 
          formatType="number" 
        />
        <StatCard 
          title="Bookings" 
          value={metrics.totalBookings} 
          change={-0.01} 
          trend="down" 
          icon={Calendar} 
          formatType="number" 
        />
        <StatCard 
          title="Revenue" 
          value={metrics.revenue} 
          change={0.04} 
          trend="up" 
          icon={DollarSign} 
          formatType="currency" 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={revenueData} />
        <BookingStatusChart data={bookingStatus} />
      </div>

      <RecentBookings bookings={recentBookings as any} />
    </div>
  );
}
