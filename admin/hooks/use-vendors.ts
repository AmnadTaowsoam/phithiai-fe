import { useState, useEffect } from 'react';
import { Vendor } from '@/types';
import apiClient from '@/lib/api-client';
import { usePendingApprovals } from './use-admin-actions';

const defaultVendors: Vendor[] = [];

export function useVendors(searchQuery = '') {
  const [vendors, setVendors] = useState<Vendor[]>(defaultVendors);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ data: Vendor[] }>('/admin/vendors', {
          params: { search: searchQuery }
        });

        if (response.success && response.data) {
          setVendors(response.data.data || []);
        }

      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError('Failed to load vendors');
        setVendors(defaultVendors);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [searchQuery]);

  return {
    vendors,
    loading,
    error,
  };
}

export function useVendorActions() {
  const { banVendor, unbanVendor } = usePendingApprovals();

  return {
    banVendor,
    unbanVendor,
  };
}
