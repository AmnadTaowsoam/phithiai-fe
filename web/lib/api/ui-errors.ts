import { ApiError } from './errors';

export const toUiErrorMessage = (error: unknown, fallbackMessage = 'Something went wrong. Please try again.') => {
  if (error instanceof ApiError) {
    if (error.status === 400) return error.message || 'Please check your input and try again.';
    if (error.status === 401) return error.message || 'Please sign in to continue.';
    if (error.status >= 500) return 'Server error. Please try again in a moment.';
    return error.message || fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message || fallbackMessage;
  }

  return fallbackMessage;
};

