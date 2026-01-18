import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PaymentForm } from '@/components/booking/PaymentForm';
import { listMyBookings } from '@/lib/api/bookings';
import { listPaymentIntents } from '@/lib/api/payments';
import { getServerAccessToken } from '@/lib/auth/server';

type PaymentPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const asString = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const token = getServerAccessToken();
  if (!token) {
    redirect('/auth/login?next=/payment');
  }

  const bookingId = asString(searchParams?.bookingId);
  const { bookings } = await listMyBookings(undefined, token).catch(() => ({ bookings: [] }));
  const selectedBooking = bookingId ? bookings.find((b) => b.id === bookingId) : bookings[0];

  const intents = selectedBooking
    ? await listPaymentIntents({ bookingId: selectedBooking.id }, token).catch(() => [])
    : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-semibold text-ivory">Payments</h1>
        <p className="max-w-2xl text-ivory/60">
          Create and track payment intents for a booking. For PromptPay, we display a QR code when available.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="border-ivory/10 bg-background/70">
            <CardHeader>
              <CardTitle>Select booking</CardTitle>
              <CardDescription>Pick a booking to view its payment intents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {bookings.length ? (
                <div className="flex flex-col gap-2">
                  {bookings.slice(0, 6).map((b) => (
                    <Link
                      key={b.id}
                      href={`/payment?bookingId=${encodeURIComponent(b.id)}`}
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        selectedBooking?.id === b.id
                          ? 'border-brand-500/40 bg-brand-500/10 text-brand-100'
                          : 'border-ivory/15 bg-background/60 text-ivory hover:border-ivory/25'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate font-semibold">Booking #{b.id}</div>
                          <div className="truncate text-xs opacity-70">
                            {b.eventType ? `${b.eventType} • ` : ''}
                            {b.eventDate ? new Date(b.eventDate).toLocaleDateString('th-TH') : '—'}
                          </div>
                        </div>
                        <Badge className="shrink-0 bg-ivory/10 text-ivory">{b.status}</Badge>
                      </div>
                    </Link>
                  ))}
                  {bookings.length > 6 ? (
                    <div className="text-xs text-ivory/60">Showing first 6 bookings.</div>
                  ) : null}
                </div>
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
              <CardTitle>Payment intents</CardTitle>
              <CardDescription>Latest intents for the selected booking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedBooking ? (
                intents.length ? (
                  <div className="space-y-3">
                    {intents.slice(0, 8).map((intent) => (
                      <div
                        key={intent.id}
                        className="rounded-2xl border border-ivory/15 bg-background/50 p-4 text-sm text-ivory"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="font-semibold">Intent #{intent.id}</div>
                          <Badge className="bg-ivory/10 text-ivory">{intent.status}</Badge>
                        </div>
                        <div className="mt-2 text-xs text-ivory/70">
                          Amount: {intent.amount.toLocaleString('th-TH')} {intent.currency ?? 'THB'}
                          {intent.method ? ` • Method: ${intent.method}` : null}
                        </div>
                        {intent.qrCode ? (
                          <div className="mt-2 text-xs">
                            QR:{' '}
                            <a
                              className="break-all text-brand-200 hover:text-brand-100"
                              href={`https://promptpay.io/api/v1/image/${encodeURIComponent(intent.qrCode)}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open image
                            </a>
                          </div>
                        ) : null}
                      </div>
                    ))}
                    {intents.length > 8 ? <div className="text-xs text-ivory/60">Showing latest 8 intents.</div> : null}
                  </div>
                ) : (
                  <div className="text-sm text-ivory/70">No payment intents yet for this booking.</div>
                )
              ) : (
                <div className="text-sm text-ivory/70">Select a booking first.</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <PaymentForm
            bookingId={selectedBooking?.id}
            vendorId={selectedBooking?.vendorId ?? selectedBooking?.vendor?.id}
            initialAmount={selectedBooking?.depositAmount ?? selectedBooking?.total}
          />
        </div>
      </div>
    </div>
  );
}

