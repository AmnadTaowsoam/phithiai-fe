import { useState, useEffect, useCallback } from 'react';
import type { Booking, BookingStatus, EventType } from '@/types';
import {
  listBookings,
  confirmBooking,
  completeBooking,
  cancelBooking,
} from '@phithiai/api/bookings';
import type { BookingRecord } from '@phithiai/api/types';

const defaultBookings: Booking[] = [];

const mapStatus = (status?: string): BookingStatus => {
  if (!status) return 'pending_deposit';
  if (
    status === 'pending_deposit' ||
    status === 'confirmed' ||
    status === 'in_progress' ||
    status === 'completed' ||
    status === 'cancelled' ||
    status === 'disputed'
  ) {
    return status;
  }
  return 'pending_deposit';
};

const mapEventType = (value?: string): EventType => {
  if (!value) return 'other';
  const normalized = value.toLowerCase();
  if (
    normalized === 'wedding' ||
    normalized === 'engagement' ||
    normalized === 'housewarming' ||
    normalized === 'ordination' ||
    normalized === 'funeral'
  ) {
    return normalized;
  }
  return 'other';
};

const transformBooking = (record: BookingRecord): Booking => ({
  id: record.id,
  userId: record.userId ?? '',
  vendorId: record.vendorId ?? '',
  eventDate: record.eventDate ?? record.createdAt ?? '',
  eventType: mapEventType(record.eventType ?? record.ceremonyType),
  status: mapStatus(record.status),
  total: record.total ?? 0,
  depositAmount: record.depositAmount ?? 0,
  createdAt: record.createdAt ?? new Date().toISOString(),
  updatedAt: record.updatedAt ?? new Date().toISOString(),
  user: record.user as any,
  vendor: record.vendor as any,
});

export function useBookings(searchQuery = '') {
  const [bookings, setBookings] = useState<Booking[]>(defaultBookings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await listBookings(searchQuery ? { keyword: searchQuery } : undefined);
      if (response?.bookings) {
        setBookings(response.bookings.map(transformBooking));
      } else {
        setBookings(defaultBookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
      setBookings(defaultBookings);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleConfirm = async (bookingId: string) => {
    await confirmBooking(bookingId);
    fetchBookings();
  };

  const handleComplete = async (bookingId: string) => {
    await completeBooking(bookingId);
    fetchBookings();
  };

  const handleCancel = async (bookingId: string, reason?: string) => {
    await cancelBooking(bookingId, reason);
    fetchBookings();
  };

  return {
    bookings,
    loading,
    error,
    refresh: fetchBookings,
    confirm: handleConfirm,
    complete: handleComplete,
    cancel: handleCancel,
  };
}
