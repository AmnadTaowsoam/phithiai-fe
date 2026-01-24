'use client';

import { useMemo, useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useUserActions } from '@/hooks/use-admin-actions';
import { Search, UserCheck, UserX, MoreHorizontal } from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { apiClient } from '@/lib/api-client';

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: 'BUYER' | 'VENDOR' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
};

const roleColors: Record<string, string> = {
  BUYER: 'bg-blue-100 text-blue-800',
  VENDOR: 'bg-green-100 text-green-800',
  ADMIN: 'bg-purple-100 text-purple-800',
};

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  SUSPENDED: 'bg-red-100 text-red-800',
};

export default function AdminUsersPage() {
  const [query, setQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showUnsuspendDialog, setShowUnsuspendDialog] = useState(false);

  const { suspendUser, unsuspendUser } = useUserActions();

  // Load users from API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await apiClient.get<{ users: UserRow[] }>('/admin/users');
        setUsers(response.data?.users || []);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = users.filter((u) => {
      const matchesSearch =
        u.email.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q);
      const matchesRole = filterRole === 'ALL' || u.role === filterRole;
      const matchesStatus = filterStatus === 'ALL' || u.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
    return filtered;
  }, [query, users, filterRole, filterStatus]);

  const handleSuspend = async () => {
    if (selectedUser && actionReason.trim()) {
      try {
        await suspendUser(selectedUser.id, actionReason);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id ? { ...u, status: 'SUSPENDED' } : u
          )
        );
        setShowSuspendDialog(false);
        setActionReason('');
        setSelectedUser(null);
      } catch (err) {
        alert('Failed to suspend user');
      }
    }
  };

  const handleUnsuspend = async () => {
    if (selectedUser && actionReason.trim()) {
      try {
        await unsuspendUser(selectedUser.id, actionReason);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id ? { ...u, status: 'ACTIVE' } : u
          )
        );
        setShowUnsuspendDialog(false);
        setActionReason('');
        setSelectedUser(null);
      } catch (err) {
        alert('Failed to unsuspend user');
      }
    }
  };

  const activeCount = users.filter((u) => u.status === 'ACTIVE').length;
  const suspendedCount = users.filter((u) => u.status === 'SUSPENDED').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage user accounts and roles" />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Suspended Users</p>
              <p className="text-2xl font-bold text-red-600">{suspendedCount}</p>
            </div>
            <UserX className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="ALL">All Roles</option>
            <option value="BUYER">Buyer</option>
            <option value="VENDOR">Vendor</option>
            <option value="ADMIN">Admin</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        {loading ? (
          <div className="py-16 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">No users found</p>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-xs">{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Badge className={roleColors[user.role]}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[user.status]}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{formatDate(user.createdAt, 'short')}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(user.createdAt)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {user.status === 'ACTIVE' && (
                          <Button
                            variant="destructive"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowSuspendDialog(true);
                            }}
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Suspend
                          </Button>
                        )}
                        {user.status === 'SUSPENDED' && (
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUnsuspendDialog(true);
                            }}
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Unsuspend
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Suspend Dialog */}
      {showSuspendDialog && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Suspend User</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You are suspending user: <strong>{selectedUser.name}</strong> ({selectedUser.email})
            </p>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Reason for suspension</label>
              <Textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Provide a reason for suspending this user..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleSuspend}
                disabled={!actionReason.trim()}
              >
                <UserX className="h-4 w-4 mr-2" />
                Suspend User
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Unsuspend Dialog */}
      {showUnsuspendDialog && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Unsuspend User</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You are unsuspending user: <strong>{selectedUser.name}</strong> ({selectedUser.email})
            </p>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Reason for unsuspension</label>
              <Textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Provide a reason for unsuspending this user..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUnsuspendDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleUnsuspend}
                disabled={!actionReason.trim()}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Unsuspend User
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
