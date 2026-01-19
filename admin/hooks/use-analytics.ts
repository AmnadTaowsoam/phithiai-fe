import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export interface GrowthMetrics {
  users: Array<{ date: string; count: number }>;
  vendors: Array<{ date: string; count: number }>;
  bookings: Array<{ date: string; count: number }>;
  revenue: Array<{ date: string; amount: number }>;
}

export interface ConversionFunnel {
  visitors: number;
  registered: number;
  planCreated: number;
  vendorContacted: number;
  quoteReceived: number;
  booked: number;
  completed: number;
}

export interface TopPerformers {
  topVendors: Array<{
    id: string;
    name: string;
    bookings: number;
    revenue: number;
    rating: number;
  }>;
  topPackages: Array<{
    id: string;
    name: string;
    bookings: number;
    revenue: number;
  }>;
  topRegions: Array<{
    name: string;
    bookings: number;
    revenue: number;
  }>;
}

export interface RevenueBreakdown {
  byCategory: Record<string, number>;
  byRegion: Record<string, number>;
  byMonth: Array<{ month: string; amount: number }>;
}

const defaultGrowthMetrics: GrowthMetrics = {
  users: [],
  vendors: [],
  bookings: [],
  revenue: [],
};

const defaultFunnel: ConversionFunnel = {
  visitors: 0,
  registered: 0,
  planCreated: 0,
  vendorContacted: 0,
  quoteReceived: 0,
  booked: 0,
  completed: 0,
};

const defaultTopPerformers: TopPerformers = {
  topVendors: [],
  topPackages: [],
  topRegions: [],
};

const defaultRevenueBreakdown: RevenueBreakdown = {
  byCategory: {},
  byRegion: {},
  byMonth: [],
};

export function useGrowthMetrics(days: number = 30) {
  const [data, setData] = useState<GrowthMetrics>(defaultGrowthMetrics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrowthMetrics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<GrowthMetrics>('/admin/analytics/growth', {
          params: { days },
        });

        if (response.success && response.data) {
          setData(response.data);
        }
      } catch (err) {
        console.error('Error fetching growth metrics:', err);
        setError('Failed to load growth metrics');
        setData(defaultGrowthMetrics);
      } finally {
        setLoading(false);
      }
    };

    fetchGrowthMetrics();
  }, [days]);

  return { data, loading, error };
}

export function useConversionFunnel() {
  const [data, setData] = useState<ConversionFunnel>(defaultFunnel);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFunnel = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ funnel: ConversionFunnel }>(
          '/admin/analytics/funnel'
        );

        if (response.success && response.data) {
          setData(response.data.funnel);
        }
      } catch (err) {
        console.error('Error fetching conversion funnel:', err);
        setError('Failed to load conversion funnel');
        setData(defaultFunnel);
      } finally {
        setLoading(false);
      }
    };

    fetchFunnel();
  }, []);

  return { data, loading, error };
}

export function useTopPerformers() {
  const [data, setData] = useState<TopPerformers>(defaultTopPerformers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPerformers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<TopPerformers>(
          '/admin/analytics/top-performers'
        );

        if (response.success && response.data) {
          setData(response.data);
        }
      } catch (err) {
        console.error('Error fetching top performers:', err);
        setError('Failed to load top performers');
        setData(defaultTopPerformers);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPerformers();
  }, []);

  return { data, loading, error };
}

export function useRevenueBreakdown() {
  const [data, setData] = useState<RevenueBreakdown>(defaultRevenueBreakdown);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenueBreakdown = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<RevenueBreakdown>(
          '/admin/analytics/revenue-breakdown'
        );

        if (response.success && response.data) {
          setData(response.data);
        }
      } catch (err) {
        console.error('Error fetching revenue breakdown:', err);
        setError('Failed to load revenue breakdown');
        setData(defaultRevenueBreakdown);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueBreakdown();
  }, []);

  return { data, loading, error };
}

export function useAnalytics(days: number = 30) {
  const growth = useGrowthMetrics(days);
  const funnel = useConversionFunnel();
  const topPerformers = useTopPerformers();
  const revenue = useRevenueBreakdown();

  return {
    growth,
    funnel,
    topPerformers,
    revenue,
    loading: growth.loading || funnel.loading || topPerformers.loading || revenue.loading,
    error: growth.error || funnel.error || topPerformers.error || revenue.error,
  };
}
