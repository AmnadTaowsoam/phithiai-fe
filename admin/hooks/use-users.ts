import { useState, useEffect } from 'react';
import { User } from '@/types';
import apiClient from '@/lib/api-client';

const defaultUsers: User[] = [];

export function useUsers(searchQuery = '') {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<{ data: User[] }>('/admin/users', {
          params: { search: searchQuery }
        });

        if (response.success && response.data) {
          setUsers(response.data.data || []);
        }

      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
        setUsers(defaultUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  return {
    users,
    loading,
    error,
  };
}
