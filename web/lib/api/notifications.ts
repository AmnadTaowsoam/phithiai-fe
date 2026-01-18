import { z } from 'zod';
import { apiFetch } from './http';
import { apiFetchAuthed } from './authed';
import { apiRoutes } from './config';
import { notificationSchema } from './schema';

const notificationListSchema = z.object({
  notifications: z.array(notificationSchema),
});

const templatesSchema = z.object({
  templates: z.array(z.record(z.any())),
});

export const getMyNotifications = () =>
  apiFetchAuthed(apiRoutes.notifications.me, {
    method: 'GET',
    schema: notificationListSchema,
  });

export const sendNotification = (payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.notifications.send, {
    method: 'POST',
    schema: z.object({ id: z.string().optional(), status: z.string().optional() }).passthrough(),
    body: payload,
  });

export const listNotificationTemplates = () =>
  apiFetch(apiRoutes.notifications.templates, {
    method: 'GET',
    schema: templatesSchema,
  });

export const broadcastNotification = (payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.notifications.broadcast, {
    method: 'POST',
    schema: z.object({
      requested: z.number().optional(),
      queued: z.number().optional(),
      results: z.array(z.record(z.any())).optional(),
    }),
    body: payload,
  });
