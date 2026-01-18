import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface AnalyticsData {
  conversionRate: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  completionRate: number;
  userGrowthData: Array<{
    month: string;
    buyers: number;
    vendors: number;
  }>;
  revenueByCategory: Array<{
    category: string;
    revenue: number;
  }>;
  conversionFunnelData: Array<{
    stage: string;
    count: number;
  }>;
}

// Default mock data
const defaultAnalytics: AnalyticsData = {
  conversionRate: 12.5,
  averageOrderValue: 45000,
  customerLifetimeValue: 75000,
  completionRate: 85,
  userGrowthData: [
    { month: 'Jul', buyers: 120, vendors: 15 },
    { month: 'Aug', buyers: 180, vendors: 22 },
    { month: 'Sep', buyers: 250, vendors: 28 },
    { month: 'Oct', buyers: 320, vendors: 35 },
    { month: 'Nov', buyers: 420, vendors: 42 },
    { month: 'Dec', buyers: 500, vendors: 50 },
  ],
  revenueByCategory: [
    { category: 'Photography', revenue: 450000 },
    { category: 'Venue', revenue: 800000 },
    { category: 'Catering', revenue: 350000 },
    { category: 'Decoration', revenue: 200000 },
    { category: 'Entertainment', revenue: 150000 },
  ],
  conversionFunnelData: [
    { stage: 'Visitors', count: 10000 },
    { stage: 'Sign Ups', count: 2500 },
    { stage: 'Inquiries', count: 500 },
    { stage: 'Quotes', count: 200 },
    { stage: 'Bookings', count: 150 },
  ],
};

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(defaultAnalytics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API
        const response = await apiClient.get<AnalyticsData>('/admin/analytics');
        
        if (response.success && response.data) {
          setAnalytics(response.data);
        } else {
          // Use default data if API returns no data
          setAnalytics(defaultAnalytics);
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
        // Use default data on error
        setAnalytics(defaultAnalytics);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return {
    analytics,
    loading,
    error,
  };
}

