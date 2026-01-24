import { apiFetch } from './http';
import { resolveApiUrl } from './config';
import type { ApiFetchOptions } from './http';
import { z } from 'zod';

// Types
export interface Document {
  id: string;
  type: 'quote' | 'contract' | 'invoice' | 'receipt' | 'tax_invoice';
  title: string;
  vendorName: string;
  vendorId?: string;
  amount?: number;
  currency?: string;
  date: string;
  status: 'draft' | 'sent' | 'signed' | 'paid' | 'cancelled';
  fileUrl: string;
  previewUrl?: string;
  downloadUrl: string;
  fileSize?: number;
  fileType: string;
  bookingId?: string;
  contractId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentFilters {
  type?: string;
  status?: string;
  vendorId?: string;
  bookingId?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export interface DocumentUploadInput {
  type: 'quote' | 'contract' | 'invoice' | 'receipt' | 'tax_invoice';
  title: string;
  file: File;
  vendorId?: string;
  bookingId?: string;
  contractId?: string;
  amount?: number;
  currency?: string;
}

// Schemas
const documentSchema = z.object({
  id: z.string(),
  type: z.enum(['quote', 'contract', 'invoice', 'receipt', 'tax_invoice']),
  title: z.string(),
  vendorName: z.string(),
  vendorId: z.string().optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  date: z.string(),
  status: z.enum(['draft', 'sent', 'signed', 'paid', 'cancelled']),
  fileUrl: z.string(),
  previewUrl: z.string().optional(),
  downloadUrl: z.string(),
  fileSize: z.number().optional(),
  fileType: z.string(),
  bookingId: z.string().optional(),
  contractId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export class DocumentsAPI {
  /**
   * Get all documents for current user
   */
  static async getMyDocuments(filters?: DocumentFilters, token?: string) {
    const options: ApiFetchOptions<Document[], { documents: Document[] }> = {
      schema: z.array(documentSchema),
      selector: (envelope) => envelope.data.documents || [],
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    if (filters) {
      options.query = filters as unknown as Record<string, string | number | boolean | null | undefined>;
    }

    return apiFetch(resolveApiUrl('documents'), options);
  }

  /**
   * Get a specific document by ID
   */
  static async getDocument(documentId: string, token?: string) {
    const options: ApiFetchOptions<Document, Document> = {
      schema: documentSchema,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`documents/${documentId}`), options);
  }

  /**
   * Upload a document
   */
  static async uploadDocument(input: DocumentUploadInput, token?: string) {
    const formData = new FormData();
    formData.append('type', input.type);
    formData.append('title', input.title);
    formData.append('file', input.file);

    if (input.vendorId) {
      formData.append('vendorId', input.vendorId);
    }
    if (input.bookingId) {
      formData.append('bookingId', input.bookingId);
    }
    if (input.contractId) {
      formData.append('contractId', input.contractId);
    }
    if (input.amount !== undefined) {
      formData.append('amount', String(input.amount));
    }
    if (input.currency) {
      formData.append('currency', input.currency);
    }

    const url = resolveApiUrl('documents/upload');
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload document');
    }

    const json = await response.json();
    return documentSchema.parse(json.data.document);
  }

  /**
   * Download a document
   */
  static async downloadDocument(documentId: string, token?: string): Promise<Blob> {
    const url = resolveApiUrl(`documents/${documentId}/download`);
    const headers: HeadersInit = {
      'Accept': 'application/octet-stream',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to download document');
    }

    return response.blob();
  }

  /**
   * Get document preview URL
   */
  static getPreviewUrl(documentId: string): string {
    return resolveApiUrl(`documents/${documentId}/preview`);
  }

  /**
   * Delete a document
   */
  static async deleteDocument(documentId: string, token?: string) {
    const options: ApiFetchOptions<{ success: boolean }, { success: boolean }> = {
      method: 'DELETE',
      schema: z.object({ success: z.boolean() }),
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`documents/${documentId}`), options);
  }

  /**
   * Get document statistics
   */
  static async getStatistics(token?: string) {
    const options: ApiFetchOptions<{
      total: number;
      byType: Record<string, number>;
      byStatus: Record<string, number>;
    }, {
      statistics: {
        total: number;
        byType: Record<string, number>;
        byStatus: Record<string, number>;
      };
    }> = {
      schema: z.object({
        total: z.number(),
        byType: z.record(z.string(), z.number()),
        byStatus: z.record(z.string(), z.number()),
      }),
      selector: (envelope) => envelope.data.statistics,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl('documents/statistics'), options);
  }
}
