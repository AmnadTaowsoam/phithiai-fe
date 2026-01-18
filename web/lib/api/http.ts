import { z } from 'zod';
import { apiConfig, resolveApiUrl } from './config';
import { ApiError } from './errors';

type Primitive = string | number | boolean;

type QueryValue = Primitive | null | undefined;

export type ApiFetchOptions<T, S = unknown> = {
  schema: z.ZodType<T>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown> | FormData | undefined;
  headers?: Record<string, string>;
  query?: Record<string, QueryValue | QueryValue[]>;
  token?: string;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  fallback?: (error: unknown) => T | Promise<T>;
  selector?: (envelope: ApiEnvelopeSuccess<S>) => unknown;
};

const errorSchema = z
  .object({
    code: z.string().optional(),
    message: z.string().optional(),
    details: z.any().optional(),
  })
  .optional();

const paginationSchema = z
  .object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean().optional(),
    hasPrev: z.boolean().optional(),
  })
  .partial()
  .optional();

const metaSchema = z
  .object({
    timestamp: z.string().optional(),
    requestId: z.string().optional(),
  })
  .optional();

const envelopeSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: errorSchema,
  pagination: paginationSchema,
  meta: metaSchema,
});

const successEnvelopeSchema = envelopeSchema.extend({
  success: z.literal(true),
});

export type ApiEnvelopeSuccess<S = unknown> = z.infer<typeof successEnvelopeSchema> & {
  data: S;
};

const buildUrl = (path: string, query?: Record<string, QueryValue | QueryValue[]>) => {
  const url = new URL(resolveApiUrl(path));

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === null || typeof value === 'undefined') {
        return;
      }

      const values = Array.isArray(value) ? value : [value];
      values.forEach((item) => url.searchParams.append(key, String(item)));
    });
  }

  return url;
};

export const apiFetch = async <T, S = unknown>(path: string, options: ApiFetchOptions<T, S>) => {
  const {
    schema,
    method = 'GET',
    body,
    headers,
    token,
    query,
    cache = 'no-store',
    revalidate,
    tags,
    fallback,
    selector,
  } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), apiConfig.timeoutMs);

  const url = buildUrl(path, query);
  const initHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  };

  let requestBody: BodyInit | undefined = undefined;

  if (body instanceof FormData) {
    requestBody = body;
  } else if (body) {
    requestBody = JSON.stringify(body);
    initHeaders['Content-Type'] = 'application/json';
  }

  if (token) {
    initHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const nextConfig =
      typeof revalidate === 'number' || (tags && tags.length)
        ? {
            ...(typeof revalidate === 'number' ? { revalidate } : {}),
            ...(tags && tags.length ? { tags } : {}),
          }
        : undefined;

    const response = await fetch(url, {
      method,
      headers: initHeaders,
      body: requestBody,
      cache,
      ...(nextConfig ? { next: nextConfig } : {}),
      signal: controller.signal,
    });

    const status = response.status;
    const json = await response.json().catch(() => ({}));
    const parsedEnvelope = envelopeSchema.safeParse(json);

    if (parsedEnvelope.success) {
      if (!response.ok || parsedEnvelope.data.success !== true) {
        const message =
          parsedEnvelope.data.error?.message ||
          response.statusText ||
          `API request failed with status ${status}`;
        const code = parsedEnvelope.data.error?.code;
        const details = parsedEnvelope.data.error?.details;
        throw new ApiError(message, status, code, details);
      }

      const successEnvelope = successEnvelopeSchema.parse(parsedEnvelope.data) as ApiEnvelopeSuccess<S>;
      const payload = selector ? selector(successEnvelope) : successEnvelope.data;
      return schema.parse(payload);
    }

    if (!response.ok) {
      const message =
        (typeof (json as any)?.error === 'string' ? (json as any).error : undefined) ||
        (typeof (json as any)?.message === 'string' ? (json as any).message : undefined) ||
        response.statusText ||
        `API request failed with status ${status}`;
      const code = typeof (json as any)?.code === 'string' ? (json as any).code : undefined;
      const details = (json as any)?.details;
      throw new ApiError(message, status, code, details);
    }

    const syntheticEnvelope: ApiEnvelopeSuccess<S> = {
      success: true,
      data: json as S,
      error: undefined,
      pagination: undefined,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    const payload = selector ? selector(syntheticEnvelope) : syntheticEnvelope.data;
    return schema.parse(payload);
  } catch (error) {
    if (fallback) {
      return fallback(error);
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
};
