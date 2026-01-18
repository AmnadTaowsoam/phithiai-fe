import { useState, useEffect } from 'react';
import { PricingRule } from '@/types';
import apiClient from '@/lib/api-client';

const defaultPricingRules: PricingRule[] = [
  {
    id: 'default',
    ruleType: 'default',
    filters: {},
    takeRateBp: 1000, // 10%
    discountBp: 0,
    activeFrom: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function usePricingRules() {
  const [rules, setRules] = useState<PricingRule[]>(defaultPricingRules);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPricingRules = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ data: PricingRule[] }>('/admin/pricing-rules');

        if (response.success && response.data) {
          setRules(response.data.data || defaultPricingRules);
        }

      } catch (err) {
        console.error('Error fetching pricing rules:', err);
        setError('Failed to load pricing rules');
        setRules(defaultPricingRules);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingRules();
  }, []);

  return {
    rules,
    loading,
    error,
  };
}
