import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/api/http', () => ({
  apiFetch: vi.fn(),
}));

import { apiFetch } from '@/lib/api/http';
import { getVendors } from '@/lib/api/vendors';

describe('vendors API mapping', () => {
  it('maps vendor list and pagination from backend envelope', async () => {
    vi.mocked(apiFetch).mockImplementation(async (_path, options: any) => {
      const envelope = {
        success: true,
        data: {
          vendors: [
            {
              id: 123,
              businessName: 'Acme Studio',
              slug: 'acme-studio',
              category: 'photo',
              zone: 'bkk',
              averageRating: '4.6',
              totalReviews: 12,
              verified: true,
              minAdvanceBooking: 7,
            },
          ],
          total: 21,
        },
      };

      const payload = typeof options.selector === 'function' ? options.selector(envelope) : envelope.data;
      return options.schema.parse(payload);
    });

    const result = await getVendors({ page: 2, limit: 10, keyword: 'acme', sort: 'rating_desc' });
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      id: '123',
      name: 'Acme Studio',
      slug: 'acme-studio',
      category: 'photo',
      zone: 'bkk',
      rating: 4.6,
      reviewCount: 12,
      verified: true,
      availability: { status: 'unknown', leadTimeDays: 7 },
    });

    expect(result.pagination).toMatchObject({
      page: 2,
      limit: 10,
      total: 21,
      totalPages: 3,
      hasNext: true,
      hasPrev: true,
    });

    const [, options] = vi.mocked(apiFetch).mock.calls[0];
    expect(options.query).toMatchObject({
      search: 'acme',
      limit: 10,
      offset: 10,
      sortBy: 'rating',
    });
  });
});

