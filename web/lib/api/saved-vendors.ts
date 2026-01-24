import { apiFetch } from './http';
import { resolveApiUrl } from './config';
import type { ApiFetchOptions } from './http';
import { z } from 'zod';

// Types
export interface SavedVendor {
  id: string;
  name: string;
  category: string;
  logo?: string;
  coverImage?: string;
  rating: number;
  reviewCount: number;
  zone: string;
  startingPrice: number;
  verified: boolean;
  tags: string[];
  minAdvanceBooking: number;
  savedAt: string;
  vendorId: string;
  slug: string;
}

// Schemas
const savedVendorSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  rating: z.number(),
  reviewCount: z.number(),
  zone: z.string(),
  startingPrice: z.number(),
  verified: z.boolean(),
  tags: z.array(z.string()),
  minAdvanceBooking: z.number(),
  savedAt: z.string(),
  vendorId: z.string(),
  slug: z.string(),
});

export class SavedVendorsAPI {
  /**
   * Get all saved vendors for current user
   */
  static async getMySavedVendors(token?: string) {
    const options: ApiFetchOptions<SavedVendor[], { savedVendors: SavedVendor[] }> = {
      schema: z.array(savedVendorSchema),
      selector: (envelope) => envelope.data.savedVendors || [],
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl('users/me/saved-vendors'), options);
  }

  /**
   * Save a vendor
   */
  static async saveVendor(vendorId: string, token?: string) {
    const options: ApiFetchOptions<SavedVendor, SavedVendor> = {
      method: 'POST',
      schema: savedVendorSchema,
      body: { vendorId } as unknown as Record<string, unknown>,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl('users/me/saved-vendors'), options);
  }

  /**
   * Unsave a vendor
   */
  static async unsaveVendor(vendorId: string, token?: string) {
    const options: ApiFetchOptions<{ success: boolean }, { success: boolean }> = {
      method: 'DELETE',
      schema: z.object({ success: z.boolean() }),
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`users/me/saved-vendors/${vendorId}`), options);
  }

  /**
   * Check if a vendor is saved
   */
  static async isVendorSaved(vendorId: string, token?: string) {
    const options: ApiFetchOptions<{ saved: boolean }, { saved: boolean }> = {
      schema: z.object({ saved: z.boolean() }),
      selector: (envelope) => envelope.data,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`users/me/saved-vendors/${vendorId}/check`), options);
  }
}
