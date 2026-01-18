import { ApiError } from './errors';
import type { ApiFetchOptions } from './http';
import { apiFetch } from './http';
import { refresh } from './auth';
import {
  clearClientAuthTokens,
  getClientAccessToken,
  getClientRefreshToken,
  setClientAuthTokens,
} from '@/lib/auth';

type AuthedOptions<T, S> = ApiFetchOptions<T, S>;

const resolveClientAccessToken = () => {
  try {
    return getClientAccessToken();
  } catch {
    return undefined;
  }
};

const resolveClientRefreshToken = () => {
  try {
    return getClientRefreshToken();
  } catch {
    return undefined;
  }
};

export const apiFetchAuthed = async <T, S = unknown>(path: string, options: AuthedOptions<T, S>) => {
  const rest = options;
  const token = options.token ?? resolveClientAccessToken();

  try {
    return await apiFetch<T, S>(path, { ...rest, token });
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    if (error.status !== 401) throw error;

    const refreshToken = resolveClientRefreshToken();
    if (!refreshToken) {
      clearClientAuthTokens();
      throw new ApiError('Session expired. Please sign in again.', 401, error.code, error.details);
    }

    try {
      const nextTokens = await refresh({ refreshToken });
      setClientAuthTokens(nextTokens.accessToken, nextTokens.refreshToken);
      try {
        return await apiFetch<T, S>(path, { ...rest, token: nextTokens.accessToken });
      } catch (retryError) {
        if (retryError instanceof ApiError && retryError.status === 401) {
          throw new ApiError('Session expired. Please sign in again.', 401, retryError.code, retryError.details);
        }
        throw retryError;
      }
    } catch (refreshError) {
      clearClientAuthTokens();
      if (refreshError instanceof ApiError && refreshError.status === 401) {
        throw new ApiError('Session expired. Please sign in again.', 401, refreshError.code, refreshError.details);
      }
      throw refreshError;
    }
  }
};
