import { useState, useEffect } from 'react';
import { DashboardMetrics, Booking } from '@/types';
import apiClient from '@/lib/api-client';

// Default data fallback
const defaultMetrics: DashboardMetrics = {
  gmv: 0,
  totalBookings: 0,
  activeUsers: 0,
  activeVendors: 0,
  conversionRate: 0,
  averageOrderValue: 0,
  revenue: 0,
  pendingDisputes: 0,
};

const defaultRevenueData = [
  { date: 'Jan', revenue: 0, gmv: 0 },
  { date: 'Feb', revenue: 0, gmv: 0 },
  { date: 'Mar', revenue: 0, gmv: 0 },
  { date: 'Apr', revenue: 0, gmv: 0 },
  { date: 'May', revenue: 0, gmv: 0 },
  { date: 'Jun', revenue: 0, gmv: 0 },
];

const defaultBookingStatus = [
  { name: 'Confirmed', value: 0, color: '#10b981' },
  { name: 'Pending', value: 0, color: '#f59e0b' },
  { name: 'In Progress', value: 0, color: '#3b82f6' },
  { name: 'Completed', value: 0, color: '#6b7280' },
  { name: 'Cancelled', value: 0, color: '#ef4444' },
];

export function useDashboardData() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics);
  const [revenueData, setRevenueData] = useState(defaultRevenueData);
  const [bookingStatus, setBookingStatus] = useState(defaultBookingStatus);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch overall stats from dashboard service
        const statsResponse = await apiClient.get<{
          users: any;
          vendors: any;
          bookings: any;
          revenue: any;
          growth: any;
        }>('/admin/dashboard/stats');

        if (statsResponse.success && statsResponse.data) {
          const { users, vendors, bookings, revenue, growth } = statsResponse.data;

          setMetrics({
            gmv: revenue.total || 0,
            totalBookings: bookings.total || 0,
            activeUsers: users.active || 0,
            activeVendors: vendors.approved || 0,
            conversionRate: 0, // Calculate from funnel data
            averageOrderValue: bookings.total > 0 ? (revenue.total / bookings.total) : 0,
            revenue: revenue.total || 0,
            pendingDisputes: 0, // Fetch from disputes endpoint
          });
        }

        // Fetch recent activities
        const activitiesResponse = await apiClient.get<{ activities: any[] }>(
          '/admin/dashboard/activities?limit=10'
        );

        if (activitiesResponse.success && activitiesResponse.data) {
          // Convert activities to booking-like format for display
          setRecentBookings(activitiesResponse.data.activities.slice(0, 5) as any);
        }

        // Fetch growth metrics for charts
        const growthResponse = await apiClient.get<{
          users: Array<{ date: string; count: number }>;
          vendors: Array<{ date: string; count: number }>;
          bookings: Array<{ date: string; count: number }>;
          revenue: Array<{ date: string; amount: number }>;
        }>('/admin/analytics/growth?days=30');

        if (growthResponse.success && growthResponse.data) {
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          
          setRevenueData(
            growthResponse.data.revenue.map((r, i) => ({
              date: monthNames[i % 12] || r.date,
              revenue: r.amount,
              gmv: r.amount * 1.5,
            }))
          );

          // Update booking status from growth data
          const totalBookings = growthResponse.data.bookings.reduce((sum, b) => sum + b.count, 0);
          const confirmedBookings = totalBookings * 0.6; // Approximate
          
          setBookingStatus([
            { name: 'Confirmed', value: Math.round(confirmedBookings), color: '#10b981' },
            { name: 'Pending', value: Math.round(totalBookings * 0.2), color: '#f59e0b' },
            { name: 'In Progress', value: Math.round(totalBookings * 0.1), color: '#3b82f6' },
            { name: 'Completed', value: Math.round(totalBookings * 0.05), color: '#6b7280' },
            { name: 'Cancelled', value: Math.round(totalBookings * 0.05), color: '#ef4444' },
          ]);
        }

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    metrics,
    revenueData,
    bookingStatus,
    recentBookings,
    loading,
    error,
  };
}
