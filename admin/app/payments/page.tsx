'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Search, RefreshCw, DollarSign, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { usePayments, usePaymentStats } from '@/hooks/use-payments';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  SUCCEEDED: 'bg-green-100 text-green-800',
  FAILED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-purple-100 text-purple-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
};

const statusLabels: Record<string, string> = {
  PENDING: 'รอชำระเงิน',
  SUCCEEDED: 'ชำระเงินแล้ว',
  FAILED: 'ชำระเงินไม่สำเร็จ',
  REFUNDED: 'คืนเงินแล้ว',
  CANCELLED: 'ยกเลิก',
};

export default function AdminPaymentsPage() {
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [refundReason, setRefundReason] = useState('');
  const [cancelReason, setCancelReason] = useState('');

  const { payments, loading, error, refundPayment, cancelPayment } = usePayments(query, filterStatus === 'ALL' ? undefined : filterStatus);
  const { stats, loading: statsLoading } = usePaymentStats();

  const handleRefund = async () => {
    if (selectedPayment && refundReason.trim()) {
      try {
        await refundPayment(selectedPayment.id, refundReason);
        setShowRefundDialog(false);
        setRefundReason('');
        setSelectedPayment(null);
      } catch (err) {
        alert('Failed to refund payment');
      }
    }
  };

  const handleCancel = async () => {
    if (selectedPayment && cancelReason.trim()) {
      try {
        await cancelPayment(selectedPayment.id, cancelReason);
        setShowCancelDialog(false);
        setCancelReason('');
        setSelectedPayment(null);
      } catch (err) {
        alert('Failed to cancel payment');
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Track payments and escrow milestones" />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-2xl font-bold">฿{stats.today.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">฿{stats.thisMonth.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">฿{stats.total.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingCount}</p>
            </div>
            <RefreshCw className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search payments..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="ALL">All Statuses</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>
            {payments.length} payment(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading || statsLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No payments found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                    <TableCell className="font-mono text-xs">{payment.bookingId}</TableCell>
                    <TableCell className="font-medium">
                      ฿{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[payment.status]}>
                        {statusLabels[payment.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{formatDate(payment.createdAt, 'short')}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(payment.createdAt)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(payment.updatedAt, 'short')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {payment.status === 'SUCCEEDED' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedPayment(payment);
                              setShowRefundDialog(true);
                            }}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Refund
                          </Button>
                        )}
                        {payment.status === 'PENDING' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedPayment(payment);
                              setShowCancelDialog(true);
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Refund Dialog */}
      {showRefundDialog && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Refund Payment</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You are refunding payment: <strong>฿{selectedPayment.amount.toLocaleString()}</strong>
            </p>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Reason for refund</label>
              <Textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="Provide a reason for this refund..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRefundDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleRefund}
                disabled={!refundReason.trim()}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Process Refund
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Cancel Dialog */}
      {showCancelDialog && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Cancel Payment</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You are cancelling payment: <strong>฿{selectedPayment.amount.toLocaleString()}</strong>
            </p>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Reason for cancellation</label>
              <Textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Provide a reason for this cancellation..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={!cancelReason.trim()}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Confirm Cancellation
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
