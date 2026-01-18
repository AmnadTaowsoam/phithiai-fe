import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerAccessToken } from '@/lib/auth/server';
import { listMyBookings } from '@/lib/api/bookings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function DashboardBookingsPage() {
  const token = getServerAccessToken();
  if (!token) redirect('/auth/login?next=/dashboard/bookings');

  const { bookings } = await listMyBookings(undefined, token).catch(() => ({ bookings: [] }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-ivory">Your bookings</h1>
        <Link href="/dashboard" className="text-sm text-brand-200 hover:text-brand-100">
          Back to dashboard →
        </Link>
      </div>
      <div className="grid gap-4">
        {bookings.length ? (
          bookings.map((booking) => (
            <Card key={booking.id} className="border-ivory/10 bg-background/70">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4">
                  <span className="truncate">{booking.vendor?.name ?? `Booking ${booking.id}`}</span>
                  <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">{booking.status}</Badge>
                </CardTitle>
                <CardDescription>
                  {booking.eventType ?? 'Event'} {booking.eventDate ? `• ${new Date(booking.eventDate).toLocaleString()}` : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/booking/${booking.id}`} className="text-sm text-brand-200 hover:text-brand-100">
                  View booking →
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-ivory/60">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
