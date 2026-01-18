import { z } from 'zod';
import { apiFetch } from './http';
import { apiFetchAuthed } from './authed';
import { apiRoutes } from './config';
import { guestSchema, rsvpSummarySchema } from './schema';

const guestEnvelopeSchema = z.object({
  guest: guestSchema,
});

const guestsEnvelopeSchema = z.object({
  guests: z.array(guestSchema),
});

const summaryEnvelopeSchema = z.object({
  summary: rsvpSummarySchema,
});

const checkInEnvelopeSchema = z.object({
  checkIn: z.record(z.any()).optional(),
});

export type Guest = z.infer<typeof guestSchema>;

export const createGuest = (payload: Record<string, unknown>, token?: string) =>
  apiFetchAuthed(apiRoutes.guests.base, {
    method: 'POST',
    schema: guestEnvelopeSchema,
    body: payload,
    token,
  });

export const getGuestsForBooking = (bookingId: string, token?: string) =>
  apiFetchAuthed(apiRoutes.guests.bookingGuests(bookingId), {
    method: 'GET',
    schema: guestsEnvelopeSchema,
    token,
  });

export const updateGuest = (guestId: string, payload: Record<string, unknown>, token?: string) =>
  apiFetchAuthed(`${apiRoutes.guests.base}/${guestId}`, {
    method: 'PATCH',
    schema: guestEnvelopeSchema,
    body: payload,
    token,
  });

export const deleteGuest = (guestId: string, token?: string) =>
  apiFetchAuthed(`${apiRoutes.guests.base}/${guestId}`, {
    method: 'DELETE',
    schema: z.object({ success: z.boolean().optional() }),
    token,
  });

export const submitRSVP = (payload: Record<string, unknown>, token?: string) =>
  apiFetchAuthed(apiRoutes.guests.rsvp, {
    method: 'POST',
    schema: z.object({ rsvp: z.record(z.any()).optional() }),
    body: payload,
    token,
  });

export const getRSVPSummary = (bookingId: string, token?: string) =>
  apiFetchAuthed(apiRoutes.guests.rsvpSummary(bookingId), {
    method: 'GET',
    schema: summaryEnvelopeSchema,
    token,
  });

export const importRSVPEntries = (payload: Record<string, unknown>, token?: string) =>
  apiFetchAuthed(apiRoutes.guests.importRSVP, {
    method: 'POST',
    schema: z.object({
      summary: z.object({
        imported: z.number(),
        failed: z.number(),
        errors: z.array(z.string()).optional(),
      }),
    }),
    body: payload,
    token,
  });

export const createInvitation = (payload: Record<string, unknown>, token?: string) =>
  apiFetchAuthed(apiRoutes.guests.invitations, {
    method: 'POST',
    schema: z.object({ invitation: z.record(z.any()).optional() }),
    body: payload,
    token,
  });

export const checkInGuest = (payload: Record<string, unknown>, token?: string) =>
  apiFetchAuthed(apiRoutes.guests.checkin, {
    method: 'POST',
    schema: checkInEnvelopeSchema,
    body: payload,
    token,
  });
