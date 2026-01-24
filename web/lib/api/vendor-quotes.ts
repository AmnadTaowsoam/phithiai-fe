import { apiFetch } from './http';
import { z } from 'zod';

// Zod schemas for type safety
const QuoteItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
});

const QuoteSchema = z.object({
  id: z.string(),
  quoteNumber: z.string(),
  leadId: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  eventType: z.string(),
  eventDate: z.string(),
  eventLocation: z.string(),
  items: z.array(QuoteItemSchema),
  subtotal: z.number(),
  discount: z.number(),
  tax: z.number(),
  totalAmount: z.number(),
  validUntil: z.string(),
  status: z.enum(['DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'REJECTED', 'EXPIRED']),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sentAt: z.string().optional(),
  acceptedAt: z.string().optional(),
});

const QuotesListSchema = z.object({
  quotes: z.array(QuoteSchema),
  total: z.number(),
});

// TypeScript types inferred from Zod schemas
export type QuoteItem = z.infer<typeof QuoteItemSchema>;
export type Quote = z.infer<typeof QuoteSchema>;

// API input types
export interface CreateQuoteInput extends Record<string, unknown> {
  leadId: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  items: Array<{
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  discount?: number;
  taxRate?: number;
  validDays?: number;
  notes?: string;
}

export interface UpdateQuoteInput extends Record<string, unknown> {
  items?: Array<{
    id?: string;
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  discount?: number;
  taxRate?: number;
  validDays?: number;
  notes?: string;
}

export class VendorQuotesAPI {
  /**
   * Get all quotes for the vendor
   */
  static async getMyQuotes(filters?: {
    status?: Quote['status'];
    limit?: number;
    offset?: number;
  }, token?: string): Promise<{ quotes: Quote[]; total: number }> {
    const query = new URLSearchParams();
    if (filters?.status) query.append('status', filters.status);
    if (filters?.limit) query.append('limit', filters.limit.toString());
    if (filters?.offset) query.append('offset', filters.offset.toString());

    const queryString = query.toString();
    const response = await apiFetch<
      { quotes: Quote[]; total: number },
      { quotes: Quote[]; total: number }
    >(`/vendor/quotes${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
      schema: QuotesListSchema,
      token,
    });
    return response;
  }

  /**
   * Get a specific quote by ID
   */
  static async getQuote(quoteId: string, token?: string): Promise<Quote> {
    const response = await apiFetch<Quote, Quote>(`/vendor/quotes/${quoteId}`, {
      method: 'GET',
      schema: QuoteSchema,
      token,
    });
    return response;
  }

  /**
   * Create a new quote
   */
  static async createQuote(input: CreateQuoteInput, token?: string): Promise<Quote> {
    const response = await apiFetch<Quote, Quote>('/vendor/quotes', {
      method: 'POST',
      schema: QuoteSchema,
      body: input,
      token,
    });
    return response;
  }

  /**
   * Update an existing quote
   */
  static async updateQuote(quoteId: string, input: UpdateQuoteInput, token?: string): Promise<Quote> {
    const response = await apiFetch<Quote, Quote>(`/vendor/quotes/${quoteId}`, {
      method: 'PATCH',
      schema: QuoteSchema,
      body: input,
      token,
    });
    return response;
  }

  /**
   * Send a quote to customer
   */
  static async sendQuote(quoteId: string, token?: string): Promise<Quote> {
    const response = await apiFetch<Quote, Quote>(`/vendor/quotes/${quoteId}/send`, {
      method: 'POST',
      schema: QuoteSchema,
      token,
    });
    return response;
  }

  /**
   * Delete a quote
   */
  static async deleteQuote(quoteId: string, token?: string): Promise<void> {
    await apiFetch<void, void>(`/vendor/quotes/${quoteId}`, {
      method: 'DELETE',
      schema: z.any(),
      token,
    });
  }

  /**
   * Duplicate a quote
   */
  static async duplicateQuote(quoteId: string, token?: string): Promise<Quote> {
    const response = await apiFetch<Quote, Quote>(`/vendor/quotes/${quoteId}/duplicate`, {
      method: 'POST',
      schema: QuoteSchema,
      token,
    });
    return response;
  }

  /**
   * Get quote statistics
   */
  static async getStatistics(token?: string): Promise<{
    total: number;
    draft: number;
    sent: number;
    viewed: number;
    accepted: number;
    rejected: number;
    expired: number;
    totalValue: number;
    acceptedValue: number;
    conversionRate: number;
  }> {
    const StatsSchema = z.object({
      total: z.number(),
      draft: z.number(),
      sent: z.number(),
      viewed: z.number(),
      accepted: z.number(),
      rejected: z.number(),
      expired: z.number(),
      totalValue: z.number(),
      acceptedValue: z.number(),
      conversionRate: z.number(),
    });

    const response = await apiFetch<
      typeof StatsSchema['_type'],
      typeof StatsSchema['_type']
    >('/vendor/quotes/statistics', {
      method: 'GET',
      schema: StatsSchema,
      token,
    });
    return response;
  }
}
