import { z } from 'zod';
import { apiFetch } from './http';
import { apiRoutes } from './config';
import { mediaItemSchema } from './schema';

const mediaEnvelopeSchema = z.object({
  data: mediaItemSchema.optional(),
  success: z.boolean().optional(),
});

export const uploadMedia = (form: FormData) =>
  apiFetch(apiRoutes.media.upload, {
    method: 'POST',
    schema: mediaEnvelopeSchema,
    body: form,
  });

export const getMediaItem = (mediaId: string) =>
  apiFetch(apiRoutes.media.detail(mediaId), {
    method: 'GET',
    schema: mediaEnvelopeSchema,
  });

export const deleteMediaItem = (mediaId: string) =>
  apiFetch(apiRoutes.media.detail(mediaId), {
    method: 'DELETE',
    schema: z.object({ success: z.boolean().optional() }),
  });

export const createStreamSession = (eventId: string, payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.media.streamSessions(eventId), {
    method: 'POST',
    schema: z.object({ stream: mediaItemSchema }),
    body: payload,
  });

export const listCeremonyDocuments = (ceremonyId: string, entityType?: string) =>
  apiFetch(apiRoutes.media.ceremonyDocuments(ceremonyId), {
    method: 'GET',
    schema: z.object({ documents: z.array(mediaItemSchema).optional() }),
    query: entityType ? { entityType } : undefined,
  });
