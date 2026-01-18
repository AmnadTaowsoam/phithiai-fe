import { PageHeader } from '@/components/layout/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { BookingStatusChart } from '@/components/dashboard/booking-status-chart';
import { RecentBookings } from '@/components/dashboard/recent-bookings';
import { Users, Store, Calendar, DollarSign } from 'lucide-react';

const revenueData = [
  { date: 'W1', revenue: 12000, gmv: 50000 },
  { date: 'W2', revenue: 18000, gmv: 62000 },
  { date: 'W3', revenue: 15000, gmv: 59000 },
  { date: 'W4', revenue: 22000, gmv: 71000 },
];

const bookingStatusData = [
  { name: 'Confirmed', value: 12, color: '#8b5cf6' },
  { name: 'Pending', value: 7, color: '#f59e0b' },
  { name: 'Completed', value: 4, color: '#10b981' },
  { name: 'Cancelled', value: 1, color: '#ef4444' },
];

const recentBookings = [
  {
    id: 'bok_001',
    userId: 'usr_001',
    vendorId: 'ven_001',
    eventDate: new Date().toISOString(),
    eventType: 'wedding',
    status: 'confirmed',
    total: 120000,
    depositAmount: 36000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: 'usr_001',
      email: 'somchai@example.com',
      firstName: 'Somchai',
      lastName: 'Jaidee',
      role: 'buyer',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    vendor: {
      id: 'ven_001',
      name: 'Maison Lanna Collective',
      slug: 'maison-lanna',
      description: 'Luxury floral styling',
      category: 'decoration',
      zone: 'north',
      rating: 4.9,
      reviewCount: 87,
      verified: true,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Platform overview and key metrics." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={1280} change={0.06} trend="up" icon={Users} formatType="number" />
        <StatCard title="Active Vendors" value={214} change={0.02} trend="up" icon={Store} formatType="number" />
        <StatCard title="Bookings" value={96} change={-0.01} trend="down" icon={Calendar} formatType="number" />
        <StatCard title="Revenue" value={67000} change={0.04} trend="up" icon={DollarSign} formatType="currency" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={revenueData} />
        <BookingStatusChart data={bookingStatusData} />
      </div>

      <RecentBookings bookings={recentBookings as any} />
    </div>
  );
}
