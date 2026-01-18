'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Users, Wallet } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useBookingDetail } from '@/hooks/use-booking-detail';
import { confirmBooking, completeBooking, cancelBooking } from '@phithiai/api/bookings';

const statusCopy: Record<string, string> = {
  pending_deposit: 'Pending Deposit',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  disputed: 'Disputed',
};

export default function BookingDetailPage() {
  const params = useParams<{ bookingId: string }>();
  const router = useRouter();
  const bookingId = params?.bookingId;
  const { booking, guests, summary, paymentIntents, loading, error, refresh, importGuests } = useBookingDetail(bookingId);
  const [rsvpImport, setRsvpImport] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAction = async (action: 'confirm' | 'complete' | 'cancel') => {
    if (!booking) return;
    setSaving(true);
    try {
      if (action === 'confirm') {
        await confirmBooking(booking.id);
      } else if (action === 'complete') {
        await completeBooking(booking.id);
      } else {
        await cancelBooking(booking.id, 'Admin update');
      }
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const handleImport = async () => {
    if (!rsvpImport.trim()) return;
    setSaving(true);
    try {
      await importGuests(rsvpImport);
      setRsvpImport('');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push('/bookings')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <PageHeader title={booking ? `Booking ${booking.id}` : 'Booking Details'} description="Guest, RSVP, and payment details" />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading booking details...
        </div>
      ) : error ? (
        <Card className="p-6">
          <p className="text-red-500">{error}</p>
        </Card>
      ) : (
        booking && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Booking Overview</CardTitle>
                  <p className="text-sm text-muted-foreground">{booking.eventType ?? 'N/A'}</p>
                </div>
                <Badge variant="outline">{statusCopy[booking.status ?? 'pending_deposit']}</Badge>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Event Date</p>
                  <p className="text-lg font-semibold">{booking.eventDate ? formatDate(booking.eventDate) : 'TBD'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold">{formatCurrency(booking.total ?? 0)}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction('confirm')} disabled={booking.status !== 'pending_deposit' || saving}>
                    Confirm
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleAction('complete')} disabled={booking.status !== 'in_progress' || saving}>
                    Complete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction('cancel')} disabled={saving}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    RSVP Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {summary ? (
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Yes</p>
                        <p className="text-lg font-semibold">{summary.yes}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pending</p>
                        <p className="text-lg font-semibold">{summary.pending}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">No</p>
                        <p className="text-lg font-semibold">{summary.no}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expected Attendees</p>
                        <p className="text-lg font-semibold">{summary.expectedAttendees}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No RSVP summary available yet.</p>
                  )}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="firstName,email,YES"
                      value={rsvpImport}
                      onChange={(e) => setRsvpImport(e.target.value)}
                      rows={4}
                    />
                    <Button onClick={handleImport} disabled={saving}>
                      Import RSVP Entries
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Payment Intents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paymentIntents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No payment intents have been created.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paymentIntents.map((intent) => (
                          <TableRow key={intent.id}>
                            <TableCell className="font-mono text-xs">{intent.id}</TableCell>
                            <TableCell>{intent.status}</TableCell>
                            <TableCell>{formatCurrency(intent.amount)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Guest List</CardTitle>
              </CardHeader>
              <CardContent>
                {guests.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No guests imported yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {guests.map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell>{guest.firstName}</TableCell>
                          <TableCell>{guest.email}</TableCell>
                          <TableCell>{guest.guestType ?? 'Guest'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </>
        )
      )}
    </div>
  );
}
