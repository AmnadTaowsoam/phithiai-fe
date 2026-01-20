'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAdminActions, AdminAction } from '@/hooks/use-admin-actions';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/lib/utils';

const actionTypeLabels: Record<string, string> = {
  USER_UPDATE: 'User Update',
  USER_DELETE: 'User Delete',
  USER_BAN: 'User Ban',
  VENDOR_APPROVE: 'Vendor Approve',
  VENDOR_REJECT: 'Vendor Reject',
  VENDOR_SUSPEND: 'Vendor Suspend',
  BOOKING_CANCEL: 'Booking Cancel',
  BOOKING_MODIFY: 'Booking Modify',
  PAYMENT_REFUND: 'Payment Refund',
  CONTENT_DELETE: 'Content Delete',
  SETTINGS_UPDATE: 'Settings Update',
  SYSTEM_ACTION: 'System Action',
};

const actionTypeColors: Record<string, string> = {
  USER_UPDATE: 'bg-blue-100 text-blue-800',
  USER_DELETE: 'bg-red-100 text-red-800',
  USER_BAN: 'bg-red-100 text-red-800',
  VENDOR_APPROVE: 'bg-green-100 text-green-800',
  VENDOR_REJECT: 'bg-orange-100 text-orange-800',
  VENDOR_SUSPEND: 'bg-yellow-100 text-yellow-800',
  BOOKING_CANCEL: 'bg-orange-100 text-orange-800',
  BOOKING_MODIFY: 'bg-blue-100 text-blue-800',
  PAYMENT_REFUND: 'bg-purple-100 text-purple-800',
  CONTENT_DELETE: 'bg-red-100 text-red-800',
  SETTINGS_UPDATE: 'bg-gray-100 text-gray-800',
  SYSTEM_ACTION: 'bg-gray-100 text-gray-800',
};

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
  FAILED: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  FAILED: 'Failed',
};

export default function AdminActionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const { actions, loading, error } = useAdminActions(100);

  const filteredActions = actions.filter((action) => {
    const matchesSearch =
      action.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (action.targetId && action.targetId.includes(searchQuery));
    const matchesType = filterType === 'ALL' || action.type === filterType;
    const matchesStatus = filterStatus === 'ALL' || action.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const actionTypes = ['ALL', ...new Set(actions.map((a) => a.type))];
  const statuses = ['ALL', ...new Set(actions.map((a) => a.status))];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Action History"
        description="Audit log of all admin actions"
      />

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="ALL">All Types</option>
              {actionTypes.map((type) => (
                <option key={type} value={type}>
                  {actionTypeLabels[type] || type}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="ALL">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status] || status}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Actions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
          <CardDescription>
            {filteredActions.length} action(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : filteredActions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No actions found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Target ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Admin ID</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell>
                      <Badge className={actionTypeColors[action.type]}>
                        {actionTypeLabels[action.type] || action.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm truncate">{action.description}</p>
                      {action.reason && (
                        <p className="text-xs text-muted-foreground truncate">
                          Reason: {action.reason}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{action.target}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {action.targetId || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[action.status]}>
                        {statusLabels[action.status] || action.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {action.adminId}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{formatDate(action.createdAt, 'short')}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(action.createdAt)}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
