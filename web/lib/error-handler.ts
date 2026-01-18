export type FriendlyError = {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
};

export const toFriendlyError = (error: unknown): FriendlyError => {
  if (error && typeof error === 'object') {
    const anyErr = error as any;
    return {
      message: typeof anyErr.message === 'string' ? anyErr.message : 'Something went wrong',
      code: typeof anyErr.code === 'string' ? anyErr.code : undefined,
      status: typeof anyErr.status === 'number' ? anyErr.status : undefined,
      details: anyErr.details,
    };
  }

  return { message: 'Something went wrong' };
};

