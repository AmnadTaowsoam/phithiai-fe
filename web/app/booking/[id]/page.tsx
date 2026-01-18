import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getBookingById } from '@/lib/api/bookings';
import { getServerAccessToken } from '@/lib/auth/server';

type BookingDetailPageProps = {
  params: { id: string };
};

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const token = getServerAccessToken();
  if (!token) {
    redirect('/auth/login?next=/booking');
  }

  const { booking } = await getBookingById(params.id, token);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-ivory">Booking</h1>
        <Link href="/booking" className="text-sm text-brand-200 hover:text-brand-100">
          Back to booking
        </Link>
      </div>

      <Card className="border-ivory/10 bg-background/70">
        <CardHeader>
          <CardTitle>Booking #{booking.id}</CardTitle>
          <CardDescription>Status: {booking.status}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-ivory/70">
          {booking.vendor?.name ? <p>Vendor: {booking.vendor.name}</p> : null}
          {booking.eventType ? <p>Event type: {booking.eventType}</p> : null}
          {booking.eventDate ? <p>Event date: {new Date(booking.eventDate).toLocaleString()}</p> : null}
          {booking.total ? <p>Total: {booking.total.toLocaleString('th-TH')} THB</p> : null}
          <div className="pt-4">
            <Button as="a" href="/dashboard">
              Go to dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
