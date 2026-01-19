import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export interface SystemSetting {
  id: string;
  key: string;
  value: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  category: string;
  isPublic: boolean;
  isEditable: boolean;
  description?: string;
  validation?: any;
  options?: any;
  updatedAt: string;
}

export interface SettingUpdateInput {
  key: string;
  value: string;
  description?: string;
}

export interface BulkUpdateInput {
  settings: Array<{ key: string; value: string }>;
}

export interface CreateSettingInput {
  key: string;
  value: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  category: string;
  description?: string;
  isPublic?: boolean;
  isEditable?: boolean;
  validation?: any;
  options?: any;
}

const defaultSettings: SystemSetting[] = [];

export function useSettings(category?: string, isPublic?: boolean) {
  const [settings, setSettings] = useState<SystemSetting[]>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: any = {};
        if (category) params.category = category;
        if (isPublic !== undefined) params.isPublic = isPublic;

        const response = await apiClient.get<{ settings: SystemSetting[] }>('/admin/settings', {
          params,
        });

        if (response.success && response.data) {
          setSettings(response.data.settings || []);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('Failed to load settings');
        setSettings(defaultSettings);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [category, isPublic]);

  const updateSetting = async (key: string, input: SettingUpdateInput) => {
    try {
      const response = await apiClient.patch<{ setting: SystemSetting }>(
        `/admin/settings/${key}`,
        input
      );

      if (response.success && response.data) {
        setSettings((prev) =>
          prev.map((s) => (s.key === key ? response.data.setting : s))
        );
        return response.data.setting;
      }
      throw new Error('Failed to update setting');
    } catch (err) {
      console.error('Error updating setting:', err);
      throw err;
    }
  };

  const bulkUpdateSettings = async (input: BulkUpdateInput) => {
    try {
      const response = await apiClient.post<{
        result: { updated: number; failed: number; errors: string[] };
      }>('/admin/settings/bulk', input);

      if (response.success && response.data) {
        // Refresh settings after bulk update
        const params: any = {};
        if (category) params.category = category;
        if (isPublic !== undefined) params.isPublic = isPublic;

        const refreshResponse = await apiClient.get<{ settings: SystemSetting[] }>(
          '/admin/settings',
          { params }
        );

        if (refreshResponse.success && refreshResponse.data) {
          setSettings(refreshResponse.data.settings || []);
        }

        return response.data.result;
      }
      throw new Error('Failed to bulk update settings');
    } catch (err) {
      console.error('Error bulk updating settings:', err);
      throw err;
    }
  };

  const createSetting = async (input: CreateSettingInput) => {
    try {
      const response = await apiClient.post<{ setting: SystemSetting }>(
        '/admin/settings',
        input
      );

      if (response.success && response.data) {
        setSettings((prev) => [...prev, response.data.setting]);
        return response.data.setting;
      }
      throw new Error('Failed to create setting');
    } catch (err) {
      console.error('Error creating setting:', err);
      throw err;
    }
  };

  const deleteSetting = async (key: string) => {
    try {
      await apiClient.delete(`/admin/settings/${key}`);

      setSettings((prev) => prev.filter((s) => s.key !== key));
    } catch (err) {
      console.error('Error deleting setting:', err);
      throw err;
    }
  };

  const resetSetting = async (key: string) => {
    try {
      const response = await apiClient.post<{ setting: SystemSetting }>(
        `/admin/settings/${key}/reset`
      );

      if (response.success && response.data) {
        setSettings((prev) =>
          prev.map((s) => (s.key === key ? response.data.setting : s))
        );
        return response.data.setting;
      }
      throw new Error('Failed to reset setting');
    } catch (err) {
      console.error('Error resetting setting:', err);
      throw err;
    }
  };

  return {
    settings,
    loading,
    error,
    updateSetting,
    bulkUpdateSettings,
    createSetting,
    deleteSetting,
    resetSetting,
  };
}

export function usePublicSettings() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicSettings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ settings: Record<string, any> }>(
          '/admin/settings/public'
        );

        if (response.success && response.data) {
          setSettings(response.data.settings || {});
        }
      } catch (err) {
        console.error('Error fetching public settings:', err);
        setError('Failed to load public settings');
        setSettings({});
      } finally {
        setLoading(false);
      }
    };

    fetchPublicSettings();
  }, []);

  return { settings, loading, error };
}
