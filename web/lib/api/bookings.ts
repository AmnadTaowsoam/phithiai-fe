import { z } from 'zod';
import { apiFetch } from './http';
import { apiFetchAuthed } from './authed';
import { apiRoutes } from './config';
import { bookingSchema } from './schema';

const bookingCollectionSchema = z.object({
  bookings: z.array(bookingSchema),
});

const bookingEnvelopeSchema = z.object({
  booking: bookingSchema,
});

const statisticsSchema = z.object({
  statistics: z.record(z.any()),
});

export type Booking = z.infer<typeof bookingSchema>;

export const listBookings = (query?: Record<string, string | number | boolean>, token?: string) =>
  (token ? apiFetch : apiFetchAuthed)<{ bookings: Booking[] }, { bookings: Booking[] }>(apiRoutes.bookings.list, {
    method: 'GET',
    schema: bookingCollectionSchema,
    query,
    token,
  });

export const listMyBookings = (query?: Record<string, string | number | boolean>, token?: string) =>
  (token ? apiFetch : apiFetchAuthed)<{ bookings: Booking[] }, { bookings: Booking[] }>(apiRoutes.bookings.me, {
    method: 'GET',
    schema: bookingCollectionSchema,
    query,
    token,
  });

export const getBookingStatistics = (token?: string) =>
  (token ? apiFetch : apiFetchAuthed)(apiRoutes.bookings.statistics, {
    method: 'GET',
    schema: statisticsSchema,
    token,
  });

export const getBookingById = (bookingId: string, token?: string) =>
  (token ? apiFetch : apiFetchAuthed)<{ booking: Booking }, { booking: Booking }>(apiRoutes.bookings.detail(bookingId), {
    method: 'GET',
    schema: bookingEnvelopeSchema,
    token,
  });

export const createBooking = (
  token: string,
  payload: {
    vendorId: string;
    contractId: string;
    quoteId: string;
    packageId?: string;
    eventType: string;
    eventDate: string;
    eventTime?: string;
    venue?: string;
    guestCount?: number;
    totalAmount: number;
    depositAmount: number;
    specialRequests?: string;
  },
) =>
  apiFetch<{ booking: Booking }, { booking: Booking }>(apiRoutes.bookings.list, {
    method: 'POST',
    schema: bookingEnvelopeSchema,
    token,
    body: payload as any,
  });

export const confirmBooking = (bookingId: string, token?: string) =>
  (token ? apiFetch : apiFetchAuthed)<{ booking: Booking }, { booking: Booking }>(apiRoutes.bookings.confirm(bookingId), {
    method: 'POST',
    schema: bookingEnvelopeSchema,
    token,
  });

export const completeBooking = (bookingId: string, token?: string) =>
  (token ? apiFetch : apiFetchAuthed)<{ booking: Booking }, { booking: Booking }>(apiRoutes.bookings.complete(bookingId), {
    method: 'POST',
    schema: bookingEnvelopeSchema,
    token,
  });

export const cancelBooking = (bookingId: string, reason?: string, token?: string) =>
  (token ? apiFetch : apiFetchAuthed)<{ booking: Booking }, { booking: Booking }>(apiRoutes.bookings.cancel(bookingId), {
    method: 'POST',
    schema: bookingEnvelopeSchema,
    body: reason ? { reason } : undefined,
    token,
  });
