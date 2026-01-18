import { useCallback, useEffect, useState } from 'react';
import type { BookingRecord, GuestRecord, RsvpSummary, PaymentIntent } from '@phithiai/api/types';
import { getBookingById } from '@phithiai/api/bookings';
import { getGuestsForBooking, getRSVPSummary, importRSVPEntries } from '@phithiai/api/guests';
import { listPaymentIntents } from '@phithiai/api/payments';

interface BookingDetailState {
  booking: BookingRecord | null;
  guests: GuestRecord[];
  summary: RsvpSummary | null;
  paymentIntents: PaymentIntent[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  importGuests: (payload: string) => Promise<void>;
}

export const useBookingDetail = (bookingId: string): BookingDetailState => {
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [guests, setGuests] = useState<GuestRecord[]>([]);
  const [summary, setSummary] = useState<RsvpSummary | null>(null);
  const [paymentIntents, setPaymentIntents] = useState<PaymentIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!bookingId) return;
    try {
      setLoading(true);
      setError(null);

      const [bookingResponse, guestsResponse, summaryResponse, intentsResponse] = await Promise.all([
        getBookingById(bookingId),
        getGuestsForBooking(bookingId),
        getRSVPSummary(bookingId),
        listPaymentIntents({ bookingId }),
      ]);

      setBooking(bookingResponse?.booking ?? null);
      setGuests(guestsResponse?.guests ?? []);
      setSummary(summaryResponse?.summary ?? null);
      setPaymentIntents(intentsResponse ?? []);
    } catch (err) {
      console.error('Failed to load booking detail', err);
      setError('Unable to load booking details');
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const importGuests = async (rawText: string) => {
    const lines = rawText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) {
      return;
    }

    const entries = lines.map((line) => {
      const [firstName = '', email = '', attending = 'YES'] = line.split(',').map((value) => value.trim());
      return {
        firstName,
        email,
        attending: attending.toUpperCase() === 'NO' ? 'NO' : attending.toUpperCase() === 'MAYBE' ? 'MAYBE' : 'YES',
      };
    });

    await importRSVPEntries({
      bookingId,
      entries,
    });

    await fetchAll();
  };

  return {
    booking,
    guests,
    summary,
    paymentIntents,
    loading,
    error,
    refresh: fetchAll,
    importGuests,
  };
};
