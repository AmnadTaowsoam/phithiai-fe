import { useState, useEffect } from 'react';
import { FeatureFlag } from '@/types';
import apiClient from '@/lib/api-client';

const defaultFeatureFlags: FeatureFlag[] = [
  {
    id: 'default-flag',
    key: 'default-feature',
    state: 'OFF',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useFeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlag[]>(defaultFeatureFlags);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatureFlags = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ data: FeatureFlag[] }>('/admin/feature-flags');

        if (response.success && response.data) {
          setFlags(response.data.data || defaultFeatureFlags);
        }

      } catch (err) {
        console.error('Error fetching feature flags:', err);
        setError('Failed to load feature flags');
        setFlags(defaultFeatureFlags);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatureFlags();
  }, []);

  const toggleFlag = async (flagId: string) => {
    try {
      // Optimistically update local state
      setFlags((prev) =>
        prev.map((flag) => {
          if (flag.id === flagId) {
            const states: Array<'OFF' | 'BETA' | 'ON'> = ['OFF', 'BETA', 'ON'];
            const currentIndex = states.indexOf(flag.state);
            const nextState = states[(currentIndex + 1) % states.length];
            return { ...flag, state: nextState };
          }
          return flag;
        })
      );

      // Try to update via API
      await apiClient.patch(`/admin/feature-flags/${flagId}`, {
        // The actual update will be handled by the API
      });
    } catch (err) {
      console.error('Error toggling feature flag:', err);
      setError('Failed to toggle feature flag');
      // Revert on error - refetch
      const response = await apiClient.get<{ data: FeatureFlag[] }>('/admin/feature-flags');
      if (response.success && response.data) {
        setFlags(response.data.data || defaultFeatureFlags);
      }
    }
  };

  return {
    flags,
    loading,
    error,
    toggleFlag,
  };
}
