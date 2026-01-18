import { z } from 'zod';
import { apiFetch } from './http';
import { apiFetchAuthed } from './authed';
import { apiRoutes } from './config';
import { paymentIntentSchema } from './schema';
import type { PaymentIntent } from './schema';

const paymentIntentListSchema = z.array(paymentIntentSchema);
type PaymentQuery = Record<
  string,
  string | number | boolean | Array<string | number | boolean> | null | undefined
>;

export const listPaymentIntents = (query?: PaymentQuery, token?: string) =>
  apiFetchAuthed<PaymentIntent[], PaymentIntent[]>(apiRoutes.payments.intents, {
    method: 'GET',
    schema: paymentIntentListSchema,
    query,
    token,
  });

export const createPaymentIntent = (payload: Record<string, unknown>, token?: string) =>
  apiFetchAuthed<PaymentIntent, PaymentIntent>(apiRoutes.payments.intents, {
    method: 'POST',
    schema: paymentIntentSchema,
    body: payload,
    token,
  });

export const getPaymentIntent = (intentId: string, token?: string) =>
  apiFetchAuthed<PaymentIntent, PaymentIntent>(apiRoutes.payments.intentById(intentId), {
    method: 'GET',
    schema: paymentIntentSchema,
    token,
  });

export const confirmPaymentIntent = (intentId: string, payload: Record<string, unknown>, token?: string) =>
  apiFetchAuthed<PaymentIntent, PaymentIntent>(`${apiRoutes.payments.intentById(intentId)}/confirm`, {
    method: 'POST',
    schema: paymentIntentSchema,
    body: payload,
    token,
  });

export const failPaymentIntent = (intentId: string, payload: Record<string, unknown>, token?: string) =>
  apiFetchAuthed<PaymentIntent, PaymentIntent>(`${apiRoutes.payments.intentById(intentId)}/fail`, {
    method: 'POST',
    schema: paymentIntentSchema,
    body: payload,
    token,
  });

export const createEscrowAccount = (payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.payments.escrow, {
    method: 'POST',
    schema: z.object({ data: z.record(z.any()).optional() }).passthrough(),
    body: payload,
  });

export const configureEscrowMilestones = (bookingId: string, payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.payments.escrowMilestones(bookingId), {
    method: 'POST',
    schema: z.object({ success: z.boolean().optional() }),
    body: payload,
  });

export const releaseEscrowMilestone = (bookingId: string, payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.payments.escrowRelease(bookingId), {
    method: 'POST',
    schema: z.object({ data: z.record(z.any()).optional() }),
    body: payload,
  });

export const refundEscrow = (bookingId: string, payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.payments.escrowRefund(bookingId), {
    method: 'POST',
    schema: z.object({ data: z.record(z.any()).optional() }),
    body: payload,
  });

export const listPayouts = (query?: PaymentQuery) =>
  apiFetch(apiRoutes.payments.payouts, {
    method: 'GET',
    schema: z.array(z.record(z.any())),
    query,
  });

export const processPayout = (payoutId: string, payload?: Record<string, unknown>) =>
  apiFetch(`${apiRoutes.payments.payouts}/${payoutId}/process`, {
    method: 'POST',
    schema: z.object({ data: z.record(z.any()).optional() }),
    body: payload,
  });
