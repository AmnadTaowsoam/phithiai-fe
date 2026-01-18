import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface Settings {
  // Profile
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  
  // Notifications
  notifications: {
    newDisputes: boolean;
    vendorApprovals: boolean;
    systemAlerts: boolean;
  };
  
  // System
  timezone: string;
  language: string;
}

// Default settings
const defaultSettings: Settings = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@malai.app',
  phone: '+66 812345678',
  avatar: '/avatars/admin.png',
  notifications: {
    newDisputes: true,
    vendorApprovals: true,
    systemAlerts: true,
  },
  timezone: 'Asia/Bangkok',
  language: 'th',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API
        const response = await apiClient.get<Settings>('/admin/settings');
        
        if (response.success && response.data) {
          setSettings(response.data);
        } else {
          // Use default settings if API returns no data
          setSettings(defaultSettings);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch settings');
        // Use default settings on error
        setSettings(defaultSettings);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSetting = async (key: string, value: unknown) => {
    try {
      // Update local state immediately
      setSettings((prev) => {
        const keys = key.split('.');
        if (keys.length === 1) {
          return { ...prev, [key]: value };
        } else if (keys.length === 2) {
          return {
            ...prev,
            [keys[0]]: {
              ...(prev[keys[0] as keyof Settings] as Record<string, unknown>),
              [keys[1]]: value,
            },
          };
        }
        return prev;
      });

      // Try to save to API
      await apiClient.patch('/admin/settings', { [key]: value });
    } catch (err) {
      console.error('Error updating setting:', err);
      // Revert on error
      setError(err instanceof Error ? err.message : 'Failed to update setting');
    }
  };

  return {
    settings,
    loading,
    error,
    updateSetting,
  };
}

