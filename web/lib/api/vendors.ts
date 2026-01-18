import { z } from 'zod';
import { apiFetch } from './http';
import { apiRoutes } from './config';
import {
  paginationSchema,
  vendorAvailabilitySchema,
  vendorDetailSchema,
  vendorReviewSchema,
  vendorSummarySchema,
  type VendorAvailability,
  type VendorDetail,
  type VendorReview,
  type VendorSummary,
} from './schema';
import { vendorCollectionFallback, vendorDetailFallback } from './fallbacks';

export type VendorQuery = {
  keyword?: string;
  zone?: string;
  category?: string;
  budget_min?: number;
  budget_max?: number;
  rating_min?: number;
  verified?: boolean;
  available_date?: string;
  sort?: 'recommended' | 'price_asc' | 'price_desc' | 'rating_desc';
  page?: number;
  limit?: number;
  tags?: string[];
};

const vendorCollectionSchema = z.object({
  items: z.array(vendorSummarySchema),
  pagination: paginationSchema,
});

type VendorCollection = z.infer<typeof vendorCollectionSchema>;

const toNumber = (value: unknown) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() && !Number.isNaN(Number(value))) return Number(value);
  return undefined;
};

const mapVendorSummary = (vendor: any): VendorSummary => ({
  id: String(vendor?.id ?? ''),
  name: String(vendor?.businessName ?? vendor?.name ?? ''),
  slug: String(vendor?.slug ?? ''),
  logo: typeof vendor?.logo === 'string' ? vendor.logo : undefined,
  coverImage: typeof vendor?.coverImage === 'string' ? vendor.coverImage : undefined,
  description: typeof vendor?.description === 'string' ? vendor.description : undefined,
  category: String(vendor?.category ?? 'unknown'),
  zone: String(vendor?.zone ?? 'unknown'),
  rating: toNumber(vendor?.averageRating),
  reviewCount: toNumber(vendor?.totalReviews),
  verified: typeof vendor?.verified === 'boolean' ? vendor.verified : undefined,
  startingPrice: undefined,
  tags: [],
  availability: vendor?.minAdvanceBooking
    ? {
        status: 'unknown',
        leadTimeDays: toNumber(vendor.minAdvanceBooking),
      }
    : undefined,
});

export const getVendors = async (query: VendorQuery = {}) => {
  const page = query.page && query.page > 0 ? query.page : 1;
  const limit = query.limit && query.limit > 0 ? query.limit : 20;
  const offset = (page - 1) * limit;

  const backendQuery: Record<string, unknown> = {
    ...(query.category ? { category: query.category } : {}),
    ...(query.zone ? { zone: query.zone } : {}),
    ...(query.verified !== undefined ? { verified: query.verified } : {}),
    ...(query.rating_min ? { minRating: query.rating_min } : {}),
    ...(query.keyword ? { search: query.keyword } : {}),
    limit,
    offset,
    sortBy: query.sort === 'rating_desc' ? 'rating' : 'newest',
  };

  return apiFetch('vendors/search', {
    schema: vendorCollectionSchema,
    query: backendQuery as any,
    selector: (envelope) => {
      const vendors = (envelope.data as any)?.vendors ?? [];
      const total = typeof (envelope.data as any)?.total === 'number' ? (envelope.data as any).total : 0;
      const totalPages = limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1;

      return {
        items: Array.isArray(vendors) ? vendors.map(mapVendorSummary) : [],
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    },
    fallback: vendorCollectionFallback,
    tags: ['vendors'],
  }) as Promise<VendorCollection>;
};

export const getVendorById = async (idOrSlug: string) =>
  apiFetch(
    `${apiRoutes.vendors}/slug/${idOrSlug}`,
    {
      schema: vendorDetailSchema,
      selector: (envelope) => mapVendorSummary((envelope.data as any)?.vendor ?? {}),
      fallback: async (error) => {
        try {
          return await apiFetch(`${apiRoutes.vendors}/${idOrSlug}`, {
            schema: vendorDetailSchema,
            selector: (envelope) => mapVendorSummary((envelope.data as any)?.vendor ?? {}),
          });
        } catch (fallbackError) {
          return vendorDetailFallback(idOrSlug, fallbackError);
        }
      },
      tags: ['vendors', `vendor:${idOrSlug}`],
    },
  ) as Promise<VendorDetail>;

export const getVendorAvailability = async (id: string, date?: string) =>
  apiFetch(
    apiRoutes.vendorAvailability(id),
    {
      schema: vendorAvailabilitySchema,
      query: date ? { date } : undefined,
      fallback: () => ({
        date: date ?? new Date().toISOString().split('T')[0],
        available: false,
      }),
      tags: ['vendors', `vendor:${id}`, 'availability'],
    },
  ) as Promise<VendorAvailability>;

export const getVendorReviews = async (id: string) =>
  apiFetch(
    apiRoutes.vendorReviews(id),
    {
      schema: z.array(vendorReviewSchema),
      fallback: () => [],
      tags: ['vendors', `vendor:${id}`, 'reviews'],
    },
  ) as Promise<VendorReview[]>;
