import { cookies } from 'next/headers';
import { authCookieNames } from './constants';

export const getServerAccessToken = () => cookies().get(authCookieNames.accessToken)?.value;
export const getServerRefreshToken = () => cookies().get(authCookieNames.refreshToken)?.value;

