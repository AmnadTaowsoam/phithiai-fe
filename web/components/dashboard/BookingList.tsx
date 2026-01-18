import Link from 'next/link';
import type { Booking } from '@/lib/api/bookings';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';

type Props = {
  bookings: Booking[];
  title?: string;
};

export const BookingList = ({ bookings, title = 'Recent bookings' }: Props) => (
  <GlassCard className="p-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-ivory">{title}</h2>
      <Link href="/dashboard/bookings" className="text-sm text-brand-200 hover:text-brand-100">
        View all →
      </Link>
    </div>
    <div className="mt-4 space-y-3">
      {bookings.length ? (
        bookings.slice(0, 6).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between rounded-2xl border border-ivory/10 bg-background/60 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-ivory">
                  {booking.vendor?.name ? booking.vendor.name : `Booking ${booking.id}`}
                </div>
                <div className="text-xs text-ivory/60">
                  {booking.eventType ?? 'Event'} {booking.eventDate ? `• ${new Date(booking.eventDate).toLocaleDateString()}` : ''}
                </div>
              </div>
            <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">{booking.status}</Badge>
          </div>
        ))
      ) : (
        <p className="text-sm text-ivory/60">No bookings yet.</p>
      )}
    </div>
  </GlassCard>
);
