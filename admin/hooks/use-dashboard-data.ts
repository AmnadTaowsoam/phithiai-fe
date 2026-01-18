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

        // Fetch metrics
        const metricsResponse = await apiClient.get<DashboardMetrics>('/admin/analytics/metrics');
        if (metricsResponse.success && metricsResponse.data) {
          setMetrics(metricsResponse.data);
        }

        // Fetch revenue data
        const revenueResponse = await apiClient.get<Array<{ date: string; revenue: number; gmv: number }>>('/admin/analytics/revenue');
        if (revenueResponse.success && revenueResponse.data) {
          setRevenueData(revenueResponse.data);
        }

        // Fetch booking status distribution
        const bookingStatusResponse = await apiClient.get<Array<{ name: string; value: number; color: string }>>('/admin/analytics/booking-status');
        if (bookingStatusResponse.success && bookingStatusResponse.data) {
          setBookingStatus(bookingStatusResponse.data);
        }

        // Fetch recent bookings
        const bookingsResponse = await apiClient.get<Booking[]>('/admin/bookings?limit=5');
        if (bookingsResponse.success && bookingsResponse.data) {
          setRecentBookings(bookingsResponse.data);
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
