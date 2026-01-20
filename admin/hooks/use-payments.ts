import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentStats {
  today: number;
  thisMonth: number;
  total: number;
  pendingCount: number;
  succeededCount: number;
  failedCount: number;
}

const defaultPayments: Payment[] = [];

export function usePayments(searchQuery = '', filterStatus?: string) {
  const [payments, setPayments] = useState<Payment[]>(defaultPayments);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: any = {};
        if (searchQuery) params.search = searchQuery;
        if (filterStatus) params.status = filterStatus;

        const response = await apiClient.get<{ data: Payment[] }>('/admin/payments', {
          params,
        });

        if (response.success && response.data) {
          setPayments(response.data.data || []);
        }

      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load payments');
        setPayments(defaultPayments);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [searchQuery, filterStatus]);

  const refundPayment = async (paymentId: string, reason: string) => {
    try {
      await apiClient.post(`/admin/payments/${paymentId}/refund`, { reason });
      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId ? { ...p, status: 'REFUNDED' } : p
        )
      );
    } catch (err) {
      console.error('Error refunding payment:', err);
      throw err;
    }
  };

  const cancelPayment = async (paymentId: string, reason: string) => {
    try {
      await apiClient.post(`/admin/payments/${paymentId}/cancel`, { reason });
      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId ? { ...p, status: 'CANCELLED' } : p
        )
      );
    } catch (err) {
      console.error('Error cancelling payment:', err);
      throw err;
    }
  };

  return {
    payments,
    loading,
    error,
    refundPayment,
    cancelPayment,
  };
}

export function usePaymentStats() {
  const [stats, setStats] = useState<PaymentStats>({
    today: 0,
    thisMonth: 0,
    total: 0,
    pendingCount: 0,
    succeededCount: 0,
    failedCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<PaymentStats>('/admin/payments/stats');

        if (response.success && response.data) {
          setStats(response.data);
        }

      } catch (err) {
        console.error('Error fetching payment stats:', err);
        setError('Failed to load payment stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
  };
}
