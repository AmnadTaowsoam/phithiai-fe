import { z } from 'zod';
import { apiFetch } from './http';
import { apiRoutes } from './config';

export const authUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  emailVerified: z.boolean().optional(),
  phoneVerified: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export const authSessionSchema = z.object({
  user: authUserSchema,
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type AuthSession = z.infer<typeof authSessionSchema>;

const authMessageSchema = z.object({
  message: z.string(),
});

export const register = async (payload: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: 'BUYER' | 'VENDOR';
}) =>
  apiFetch(apiRoutes.auth.register, {
    method: 'POST',
    schema: authSessionSchema,
    body: payload,
  });

export const login = async (payload: { email: string; password: string }) =>
  apiFetch(apiRoutes.auth.login, {
    method: 'POST',
    schema: authSessionSchema,
    body: payload,
  });

export const refresh = async (payload: { refreshToken: string }) =>
  apiFetch(apiRoutes.auth.refresh, {
    method: 'POST',
    schema: z.object({
      accessToken: z.string().min(1),
      refreshToken: z.string().min(1),
    }),
    body: payload,
  });

export const logout = async (payload: { refreshToken: string }) =>
  apiFetch(apiRoutes.auth.logout, {
    method: 'POST',
    schema: z.any(),
    body: payload,
  });

export const requestPasswordReset = async (payload: { email: string }) =>
  apiFetch(apiRoutes.auth.forgotPassword, {
    method: 'POST',
    schema: authMessageSchema,
    body: payload,
  });

export const resetPassword = async (payload: { token: string; newPassword: string }) =>
  apiFetch(apiRoutes.auth.resetPassword, {
    method: 'POST',
    schema: authMessageSchema,
    body: payload,
  });

