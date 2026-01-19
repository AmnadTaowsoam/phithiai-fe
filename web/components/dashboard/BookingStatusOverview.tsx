'use client';

import { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, XCircle, MoreHorizontal, Filter, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';

export type Booking = {
  id: string;
  vendorName: string;
  vendorLogo?: string;
  eventType: string;
  eventDate: string;
  eventTime?: string;
  venue?: string;
  guestCount?: number;
  status: BookingStatus;
  totalAmount: number;
  depositAmount?: number;
  depositPaid?: boolean;
  balanceDue?: number;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  bookings: Booking[];
  onBookingClick?: (booking: Booking) => void;
  onStatusChange?: (bookingId: string, status: BookingStatus) => void;
};

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
    icon: Clock,
    description: 'Awaiting vendor confirmation',
  },
  confirmed: {
    label: 'Confirmed',
    color: 'border-brand-500/30 bg-brand-500/10 text-brand-200',
    icon: CheckCircle2,
    description: 'Booking confirmed by vendor',
  },
  in_progress: {
    label: 'In Progress',
    color: 'border-blue-500/30 bg-blue-500/10 text-blue-200',
    icon: Calendar,
    description: 'Event preparation in progress',
  },
  completed: {
    label: 'Completed',
    color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
    icon: CheckCircle2,
    description: 'Event completed successfully',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'border-red-500/30 bg-red-500/10 text-red-200',
    icon: XCircle,
    description: 'Booking was cancelled',
  },
  disputed: {
    label: 'Disputed',
    color: 'border-orange-500/30 bg-orange-500/10 text-orange-200',
    icon: AlertCircle,
    description: 'Dispute in progress',
  },
};

export const BookingStatusOverview = ({ bookings, onBookingClick, onStatusChange }: Props) => {
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'date_asc' | 'date_desc' | 'status'>('date_desc');

  const filteredBookings = bookings
    .filter(b => filterStatus === 'all' || b.status === filterStatus)
    .sort((a, b) => {
      if (sortOrder === 'date_asc') {
        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      }
      if (sortOrder === 'date_desc') {
        return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
      }
      // Sort by status priority
      const statusPriority = ['completed', 'in_progress', 'confirmed', 'pending', 'disputed', 'cancelled'];
      return statusPriority.indexOf(a.status) - statusPriority.indexOf(b.status);
    });

  const statusCounts = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {} as Record<BookingStatus, number>);

  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(b => {
    const eventDate = new Date(b.eventDate);
    const now = new Date();
    return eventDate > now && b.status !== 'cancelled';
  }).length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (daysUntil === 0) return 'Today';
    if (daysUntil === 1) return 'Tomorrow';
    if (daysUntil < 7) return `${daysUntil} days`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const StatusIcon = statusConfig[filterStatus === 'all' ? 'pending' as BookingStatus : filterStatus].icon;

  return (
    <GlassCard className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-ivory">Booking Status</h2>
          <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">
            {totalBookings} total
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as BookingStatus | 'all')}
            className="rounded-lg border border-ivory/15 bg-background/70 px-4 py-2 text-sm text-ivory focus:border-brand-500/40 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="disputed">Disputed</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'date_asc' | 'date_desc' | 'status')}
            className="rounded-lg border border-ivory/15 bg-background/70 px-4 py-2 text-sm text-ivory focus:border-brand-500/40 focus:outline-none"
          >
            <option value="date_desc">Date: Newest First</option>
            <option value="date_asc">Date: Oldest First</option>
            <option value="status">Status Priority</option>
          </select>
        </div>
      </div>

      {/* Status Summary */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = statusCounts[status as BookingStatus] || 0;
          const percentage = totalBookings > 0 ? (count / totalBookings) * 100 : 0;

          return (
            <div
              key={status}
              onClick={() => setFilterStatus(status as BookingStatus)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md ${
                filterStatus === status
                  ? config.color
                  : 'border-ivory/10 bg-background/60'
              }`}
            >
              <config.icon className={`h-5 w-5 ${filterStatus === status ? '' : 'text-ivory/60'}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ivory">{config.label}</span>
                  <span className="text-lg font-semibold text-ivory">{count}</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ivory/10">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      filterStatus === status ? 'bg-current' : 'bg-ivory/40'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Events Banner */}
      {upcomingBookings > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-brand-500/30 bg-brand-500/10 p-4">
          <Calendar className="h-5 w-5 text-brand-200" />
          <div className="flex-1">
            <div className="text-sm font-medium text-ivory">Upcoming Events</div>
            <div className="text-xs text-ivory/60">You have {upcomingBookings} event{upcomingBookings > 1 ? 's' : ''} coming up</div>
          </div>
          <Button
            onClick={() => setFilterStatus('confirmed')}
            className="rounded-lg border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200 hover:bg-brand-500/15"
          >
            View
          </Button>
        </div>
      )}

      {/* Booking List */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="py-12 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-ivory/20" />
            <p className="text-ivory/60">
              {filterStatus === 'all' ? 'No bookings yet' : `No ${filterStatus.replace('_', ' ')} bookings`}
            </p>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const config = statusConfig[booking.status];
            const StatusIcon = config.icon;
            const daysUntil = Math.ceil((new Date(booking.eventDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const isUpcoming = daysUntil >= 0 && booking.status !== 'cancelled';

            return (
              <div
                key={booking.id}
                onClick={() => onBookingClick?.(booking)}
                className="flex items-center gap-4 rounded-lg border border-ivory/10 bg-background/60 p-4 transition-all hover:border-ivory/20 hover:shadow-md"
              >
                {/* Status Icon */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${config.color}`}>
                  <StatusIcon className="h-6 w-6" />
                </div>

                {/* Booking Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-ivory">{booking.vendorName}</h3>
                        {isUpcoming && (
                          <Badge className="border-brand-500/30 bg-brand-500/10 text-brand-200 text-xs">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-ivory/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(booking.eventDate)}
                        </span>
                        {booking.eventTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {booking.eventTime}
                          </span>
                        )}
                        {booking.guestCount && (
                          <span>{booking.guestCount} guests</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Open menu
                      }}
                      className="shrink-0 rounded-lg border border-ivory/15 bg-background/70 p-2 text-ivory/60 hover:border-ivory/25"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Event Details */}
                  <div className="mt-3 flex items-center gap-4 text-xs text-ivory/80">
                    <Badge className="border-ivory/15 bg-ivory/5">
                      {booking.eventType}
                    </Badge>
                    {booking.venue && (
                      <span className="truncate">{booking.venue}</span>
                    )}
                  </div>

                  {/* Payment Info */}
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-ivory/10 bg-background/40 p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ivory/60">Total:</span>
                        <span className="text-sm font-semibold text-ivory">
                          {formatCurrency(booking.totalAmount)}
                        </span>
                      </div>
                      {booking.depositAmount && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-ivory/60">Deposit:</span>
                          <span className={`text-sm ${
                            booking.depositPaid ? 'text-emerald-200' : 'text-amber-200'
                          }`}>
                            {formatCurrency(booking.depositAmount)}
                            {booking.depositPaid ? ' ✓' : ' pending'}
                          </span>
                        </div>
                      )}
                      {booking.balanceDue !== undefined && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-ivory/60">Balance:</span>
                          <span className="text-sm font-semibold text-ivory">
                            {formatCurrency(booking.balanceDue)}
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookingClick?.(booking);
                      }}
                      className="shrink-0 rounded-lg border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200 hover:bg-brand-500/15"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </GlassCard>
  );
};
