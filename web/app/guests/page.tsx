import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { listMyBookings } from '@/lib/api/bookings';
import { getGuestsForBooking } from '@/lib/api/guests';
import { getServerAccessToken } from '@/lib/auth/server';

type GuestsPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const asString = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function GuestsPage({ searchParams }: GuestsPageProps) {
  const token = getServerAccessToken();
  if (!token) {
    redirect('/auth/login?next=/guests');
  }

  const bookingId = asString(searchParams?.bookingId);
  const { bookings } = await listMyBookings(undefined, token).catch(() => ({ bookings: [] }));
  const selectedBooking = bookingId ? bookings.find((b) => b.id === bookingId) : bookings[0];

  const { guests } = selectedBooking
    ? await getGuestsForBooking(selectedBooking.id, token).catch(() => ({ guests: [] }))
    : { guests: [] };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-semibold text-ivory">Guests</h1>
        <p className="max-w-2xl text-ivory/60">View guests for a booking via the Guest Service (through the API gateway).</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-ivory/10 bg-background/70">
          <CardHeader>
            <CardTitle>Select booking</CardTitle>
            <CardDescription>Pick a booking to view guests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {bookings.length ? (
              bookings.slice(0, 8).map((b) => (
                <Link
                  key={b.id}
                  href={`/guests?bookingId=${encodeURIComponent(b.id)}`}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm ${
                    selectedBooking?.id === b.id
                      ? 'border-brand-500/40 bg-brand-500/10 text-brand-100'
                      : 'border-ivory/15 bg-background/60 text-ivory hover:border-ivory/25'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate font-semibold">Booking #{b.id}</div>
                    <div className="truncate text-xs opacity-70">
                      {b.eventType ? `${b.eventType} • ` : ''}
                      {b.eventDate ? new Date(b.eventDate).toLocaleDateString('th-TH') : '—'}
                    </div>
                  </div>
                  <Badge className="bg-ivory/10 text-ivory">{b.status}</Badge>
                </Link>
              ))
            ) : (
              <div className="text-sm text-ivory/70">
                No bookings found. Start from{' '}
                <Link href="/booking" className="text-brand-200 hover:text-brand-100">
                  booking
                </Link>
                .
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/70">
          <CardHeader>
            <CardTitle>Guest list</CardTitle>
            <CardDescription>{selectedBooking ? `Booking #${selectedBooking.id}` : 'Select a booking to load guests.'}</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedBooking ? (
              guests.length ? (
                <div className="space-y-3">
                  {guests.map((guest) => (
                    <div
                      key={guest.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-ivory/15 bg-background/50 px-4 py-3 text-sm text-ivory"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-semibold">
                          {guest.firstName} {guest.lastName ?? ''}
                        </div>
                        <div className="truncate text-xs text-ivory/60">
                          {guest.email ?? '—'} {guest.phone ? `• ${guest.phone}` : ''}
                        </div>
                      </div>
                      <div className="text-xs text-ivory/60">
                        {guest.tableNumber ? `Table ${guest.tableNumber}` : '—'}
                        {guest.seatNumber ? ` / Seat ${guest.seatNumber}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-ivory/70">No guests found for this booking.</div>
              )
            ) : (
              <div className="text-sm text-ivory/70">Select a booking first.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

