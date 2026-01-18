import { authCookieNames } from './constants';

const parseCookieString = (cookieString: string) =>
  cookieString
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, item) => {
      const idx = item.indexOf('=');
      if (idx === -1) return acc;
      const key = item.slice(0, idx).trim();
      const value = item.slice(idx + 1).trim();
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

export const getClientCookie = (name: string) => {
  if (typeof document === 'undefined') return undefined;
  const parsed = parseCookieString(document.cookie ?? '');
  return parsed[name];
};

export const setClientCookie = (name: string, value: string, options?: { maxAgeDays?: number }) => {
  if (typeof document === 'undefined') return;
  const maxAgeDays = options?.maxAgeDays ?? 7;
  const expires = new Date(Date.now() + maxAgeDays * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax`;
};

export const deleteClientCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
};

export const getClientAccessToken = () => getClientCookie(authCookieNames.accessToken);
export const getClientRefreshToken = () => getClientCookie(authCookieNames.refreshToken);

export const setClientAuthTokens = (accessToken: string, refreshToken: string) => {
  setClientCookie(authCookieNames.accessToken, accessToken, { maxAgeDays: 1 });
  setClientCookie(authCookieNames.refreshToken, refreshToken, { maxAgeDays: 14 });
};

export const clearClientAuthTokens = () => {
  deleteClientCookie(authCookieNames.accessToken);
  deleteClientCookie(authCookieNames.refreshToken);
};

