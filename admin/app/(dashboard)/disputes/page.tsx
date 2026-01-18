'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { useDisputes } from '@/hooks/use-disputes';

const statusColors: Record<string, 'error' | 'warning' | 'success' | 'default'> = {
  open: 'error',
  investigating: 'warning',
  resolved: 'success',
  closed: 'default',
};

const typeLabels: Record<string, string> = {
  vendor_no_show: 'Vendor No Show',
  quality_issue: 'Quality Issue',
  payment_issue: 'Payment Issue',
  contract_breach: 'Contract Breach',
  other: 'Other',
};

export default function DisputesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { disputes, loading, error } = useDisputes();

  const filteredDisputes = disputes.filter((dispute) =>
    dispute.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Disputes"
        description="Manage and resolve disputes between users and vendors"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open</p>
              <p className="text-2xl font-bold">
                {disputes.filter((d) => d.status === 'open').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Investigating</p>
              <p className="text-2xl font-bold">
                {disputes.filter((d) => d.status === 'investigating').length}
              </p>
            </div>
            <Search className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold">
                {disputes.filter((d) => d.status === 'resolved').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Closed</p>
              <p className="text-2xl font-bold">
                {disputes.filter((d) => d.status === 'closed').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-gray-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search disputes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter by Type</Button>
          <Button variant="outline">Filter by Status</Button>
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="p-6 mb-6">
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Using default data. Please check your API connection.
            </p>
          </div>
        </Card>
      )}

      {/* Disputes Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dispute ID</TableHead>
              <TableHead>Booking ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Opened</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell>
                    <div>
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : filteredDisputes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-muted-foreground">No disputes found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-mono text-sm">
                    {dispute.id}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {dispute.bookingId}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{typeLabels[dispute.type]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[dispute.status]}>
                      {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{formatDate(dispute.openedAt)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(dispute.openedAt)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {dispute.assignedTo ? (
                      <Badge variant="secondary">{dispute.assignedTo}</Badge>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {dispute.status === 'open' && (
                        <Button variant="default" size="sm">
                          Assign to Me
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

