import { useState, useEffect } from 'react';
import { Dispute } from '@/types';
import apiClient from '@/lib/api-client';

const defaultDisputes: Dispute[] = [];

export function useDisputes() {
  const [disputes, setDisputes] = useState<Dispute[]>(defaultDisputes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ data: Dispute[] }>('/admin/disputes');

        if (response.success && response.data) {
          setDisputes(response.data.data || []);
        }

      } catch (err) {
        console.error('Error fetching disputes:', err);
        setError('Failed to load disputes');
        setDisputes(defaultDisputes);
      } finally {
        setLoading(false);
      }
    };

    fetchDisputes();
  }, []);

  return {
    disputes,
    loading,
    error,
  };
}
