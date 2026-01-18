import { z } from 'zod';
import { apiFetch } from './http';
import { apiRoutes } from './config';

const matchResultSchema = z
  .object({
    matches: z.array(z.record(z.any())).optional(),
    requestId: z.string().optional(),
    expiresAt: z.string().optional(),
  })
  .passthrough();

const historySchema = z.object({
  history: z.array(z.record(z.any())),
});

const preferencesSchema = z.object({
  preferences: z.record(z.any()),
});

export type MatchResult = z.infer<typeof matchResultSchema>;

export const findMatches = (payload: Record<string, unknown>) =>
  apiFetch<MatchResult, MatchResult>(apiRoutes.matching.smartMatch, {
    method: 'POST',
    schema: matchResultSchema,
    body: payload,
  });

export const getMatchResults = (requestId: string) =>
  apiFetch<MatchResult, MatchResult>(`${apiRoutes.matching.smartMatch}/${requestId}`, {
    method: 'GET',
    schema: matchResultSchema,
  });

export const trackMatchInteraction = (matchResultId: string, type: string) =>
  apiFetch<unknown, unknown>(`${apiRoutes.matching.smartMatch}/results/${matchResultId}/track`, {
    method: 'POST',
    schema: z.object({}).passthrough(),
    body: { type },
  });

export const getMatchHistory = () =>
  apiFetch(apiRoutes.matching.history, {
    method: 'GET',
    schema: historySchema,
  });

export const getMatchPreferences = () =>
  apiFetch(apiRoutes.matching.preferences, {
    method: 'GET',
    schema: preferencesSchema,
  });

export const updateMatchWeights = (weights: Record<string, number>) =>
  apiFetch(apiRoutes.matching.preferences, {
    method: 'PATCH',
    schema: z.object({ message: z.string().optional() }),
    body: weights,
  });
