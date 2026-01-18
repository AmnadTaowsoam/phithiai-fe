import { z } from 'zod';
import { apiFetch } from './http';
import { apiRoutes } from './config';
import { authUserSchema } from './auth';

export const getMe = async (accessToken: string) =>
  apiFetch(apiRoutes.users.me, {
    schema: authUserSchema,
    token: accessToken,
    selector: (envelope) => (envelope.data as any)?.user,
    tags: ['me'],
  });

export const updateMe = async (
  accessToken: string,
  payload: { firstName?: string; lastName?: string; phone?: string; avatar?: string },
) =>
  apiFetch(apiRoutes.users.updateMe, {
    method: 'PATCH',
    schema: authUserSchema,
    token: accessToken,
    body: payload,
    selector: (envelope) => (envelope.data as any)?.user,
  });

export const changePassword = async (
  accessToken: string,
  payload: { currentPassword: string; newPassword: string },
) =>
  apiFetch(apiRoutes.users.changePassword, {
    method: 'POST',
    schema: z.object({ message: z.string().optional() }),
    token: accessToken,
    body: payload,
  });

