'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { listBookings, confirmBooking, cancelBooking } from '@/lib/api/bookings';
import { listPaymentIntents } from '@/lib/api/payments';
import type { BookingRecord, PaymentIntent } from '@/lib/api/types';
import { formatCurrency, formatThaiDate } from '@/lib/utils';

export default function MobileOperations() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [intents, setIntents] = useState<PaymentIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'payments'>('bookings');

  const load = async () => {
    setLoading(true);
    try {
      const [bookingResponse, paymentResponse] = await Promise.all([
        listBookings({ limit: 5 }),
        listPaymentIntents(),
      ]);
      setBookings(bookingResponse?.bookings ?? []);
      setIntents(paymentResponse ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mx-auto max-w-4xl py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mobile Operations View</CardTitle>
          <p className="text-sm text-muted-foreground">
            สรุปสถานะ bookings และการชำระเงินสำหรับทีมภาคสนาม
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'bookings' | 'payments')}>
            <TabsList>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
            <TabsContent value="bookings" className="space-y-4 pt-4">
              {loading ? (
                <p className="text-sm text-muted-foreground">กำลังโหลด...</p>
              ) : bookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">ยังไม่มี booking</p>
              ) : (
                bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="py-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Booking ID</p>
                          <p className="font-semibold">{booking.id}</p>
                        </div>
                        <span className="text-xs uppercase text-muted-foreground">{booking.status}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <p>{booking.eventType ?? booking.ceremonyType ?? 'Ceremony'}</p>
                        <p>{booking.eventDate ? formatThaiDate(booking.eventDate) : 'TBD'}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">ยอดรวม</p>
                        <p className="font-semibold">{formatCurrency(booking.total ?? 0)}</p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          className="px-4 py-2 text-xs"
                          variant="secondary"
                          disabled={booking.status !== 'pending_deposit'}
                          onClick={async () => {
                            await confirmBooking(booking.id);
                            load();
                          }}
                        >
                          Confirm
                        </Button>
                        <Button
                          className="px-4 py-2 text-xs"
                          variant="outline"
                          disabled={booking.status === 'completed'}
                          onClick={async () => {
                            await cancelBooking(booking.id, 'mobile-action');
                            load();
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            <TabsContent value="payments" className="space-y-4 pt-4">
              {loading ? (
                <p className="text-sm text-muted-foreground">กำลังโหลด...</p>
              ) : intents.length === 0 ? (
                <p className="text-sm text-muted-foreground">ยังไม่มีการชำระเงิน</p>
              ) : (
                intents.map((intent) => (
                  <Card key={intent.id}>
                    <CardContent className="py-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Intent</p>
                          <p className="font-semibold">{intent.id}</p>
                        </div>
                        <span className="text-xs uppercase text-muted-foreground">{intent.status}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-semibold">{formatCurrency(intent.amount)}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
