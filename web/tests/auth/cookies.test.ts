import { describe, expect, it } from 'vitest';
import {
  clearClientAuthTokens,
  getClientAccessToken,
  getClientRefreshToken,
  setClientAuthTokens,
  setClientCookie,
  getClientCookie,
} from '@/lib/auth';
import { authCookieNames } from '@/lib/auth/constants';

describe('auth cookies (client)', () => {
  it('sets and reads auth tokens', () => {
    clearClientAuthTokens();

    setClientAuthTokens('access-123', 'refresh-456');
    expect(getClientAccessToken()).toBe('access-123');
    expect(getClientRefreshToken()).toBe('refresh-456');

    clearClientAuthTokens();
    expect(getClientAccessToken()).toBeUndefined();
    expect(getClientRefreshToken()).toBeUndefined();
  });

  it('handles URL-encoded cookie values', () => {
    setClientCookie(authCookieNames.accessToken, 'hello world');
    expect(getClientCookie(authCookieNames.accessToken)).toBe('hello world');
  });
});
