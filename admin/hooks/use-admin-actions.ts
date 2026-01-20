import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export interface AdminAction {
  id: string;
  adminId: string;
  type: string;
  target: string;
  targetId?: string;
  description: string;
  reason?: string;
  status: string;
  approvedBy?: string;
  approvedAt?: string;
  result?: string;
  error?: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface SystemAlert {
  id: string;
  alertType: string;
  severity: string;
  title: string;
  message: string;
  source?: string;
  metadata?: any;
  resolved: boolean;
  createdAt: string;
}

export interface PendingApproval {
  id: string;
  vendorId: string;
  status: string;
  submittedAt: string;
  documents?: {
    license?: string;
    insurance?: string;
  };
}

const defaultActions: AdminAction[] = [];
const defaultAlerts: SystemAlert[] = [];
const defaultApprovals: PendingApproval[] = [];

export function useAdminActions(limit: number = 100) {
  const [actions, setActions] = useState<AdminAction[]>(defaultActions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ history: AdminAction[] }>(
          '/admin/actions/history',
          {
            params: { limit },
          }
        );

        if (response.success && response.data) {
          setActions(response.data.history || []);
        }
      } catch (err) {
        console.error('Error fetching admin actions:', err);
        setError('Failed to load admin actions');
        setActions(defaultActions);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, [limit]);

  return { actions, loading, error };
}

export function useSystemAlerts(onlyUnresolved: boolean = true) {
  const [alerts, setAlerts] = useState<SystemAlert[]>(defaultAlerts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ alerts: SystemAlert[] }>(
          '/admin/dashboard/alerts',
          {
            params: { onlyUnresolved: onlyUnresolved.toString() },
          }
        );

        if (response.success && response.data) {
          setAlerts(response.data.alerts || []);
        }
      } catch (err) {
        console.error('Error fetching system alerts:', err);
        setError('Failed to load system alerts');
        setAlerts(defaultAlerts);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [onlyUnresolved]);

  const resolveAlert = async (alertId: string) => {
    try {
      await apiClient.post(`/admin/dashboard/alerts/${alertId}/resolve`);

      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === alertId ? { ...alert, resolved: true } : alert
        )
      );
    } catch (err) {
      console.error('Error resolving alert:', err);
      throw err;
    }
  };

  return { alerts, loading, error, resolveAlert };
}

export function usePendingApprovals() {
  const [approvals, setApprovals] = useState<PendingApproval[]>(defaultApprovals);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ approvals: PendingApproval[] }>(
          '/admin/vendors/pending'
        );

        if (response.success && response.data) {
          setApprovals(response.data.approvals || []);
        }
      } catch (err) {
        console.error('Error fetching pending approvals:', err);
        setError('Failed to load pending approvals');
        setApprovals(defaultApprovals);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovals();
  }, []);

  const approveVendor = async (vendorId: string) => {
    try {
      await apiClient.post(`/admin/vendors/${vendorId}/approve`);

      setApprovals((prev) => prev.filter((a) => a.vendorId !== vendorId));
    } catch (err) {
      console.error('Error approving vendor:', err);
      throw err;
    }
  };

  const rejectVendor = async (vendorId: string, reason: string) => {
    try {
      await apiClient.post(`/admin/vendors/${vendorId}/reject`, { reason });

      setApprovals((prev) => prev.filter((a) => a.vendorId !== vendorId));
    } catch (err) {
      console.error('Error rejecting vendor:', err);
      throw err;
    }
  };

  const banVendor = async (vendorId: string, reason: string, duration?: number) => {
    try {
      await apiClient.post(`/admin/vendors/${vendorId}/ban`, { reason, duration });
    } catch (err) {
      console.error('Error banning vendor:', err);
      throw err;
    }
  };

  const unbanVendor = async (vendorId: string, reason: string) => {
    try {
      await apiClient.post(`/admin/vendors/${vendorId}/unban`, { reason });
    } catch (err) {
      console.error('Error unbanning vendor:', err);
      throw err;
    }
  };

  return {
    approvals,
    loading,
    error,
    approveVendor,
    rejectVendor,
    banVendor,
    unbanVendor,
  };
}

export function useUserActions() {
  const suspendUser = async (userId: string, reason: string) => {
    try {
      await apiClient.post(`/admin/users/${userId}/suspend`, { reason });
    } catch (err) {
      console.error('Error suspending user:', err);
      throw err;
    }
  };

  const unsuspendUser = async (userId: string, reason: string) => {
    try {
      await apiClient.post(`/admin/users/${userId}/unsuspend`, { reason });
    } catch (err) {
      console.error('Error unsuspending user:', err);
      throw err;
    }
  };

  return { suspendUser, unsuspendUser };
}
