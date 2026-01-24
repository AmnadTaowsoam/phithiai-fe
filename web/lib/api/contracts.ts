import { apiFetch } from './http';
import { resolveApiUrl } from './config';
import type { ApiFetchOptions } from './http';
import { z } from 'zod';

// Types
export interface ContractParty {
  id: string;
  name: string;
  role: 'user' | 'vendor' | 'witness';
  status: 'pending' | 'signed' | 'rejected';
  signedAt?: string;
  email?: string;
}

export interface ContractMarker {
  id: string;
  type: 'signature' | 'date' | 'initial';
  partyId: string;
  position: number;
  label: string;
  required: boolean;
  signedAt?: string;
  signatureData?: string;
}

export interface Contract {
  id: string;
  title: string;
  content: string;
  parties: ContractParty[];
  markers: ContractMarker[];
  status: 'draft' | 'pending' | 'signed' | 'completed' | 'cancelled';
  createdAt: string;
  expiresAt?: string;
  completedAt?: string;
  bookingId?: string;
  quoteId?: string;
  totalAmount?: number;
  currency?: string;
}

export interface ESignatureInitiateInput {
  contractId: string;
  returnUrl?: string;
}

export interface ESignatureStatus {
  status: 'pending' | 'initiated' | 'signed' | 'completed' | 'expired' | 'cancelled';
  signedParties: string[];
  pendingParties: string[];
  expiresAt?: string;
  downloadUrl?: string;
}

export interface SignatureSubmitInput {
  markerId: string;
  signatureData: string; // Base64 encoded signature
  ipAddress?: string;
  userAgent?: string;
}

// Schemas
const contractPartySchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(['user', 'vendor', 'witness']),
  status: z.enum(['pending', 'signed', 'rejected']),
  signedAt: z.string().optional(),
  email: z.string().optional(),
});

const contractMarkerSchema = z.object({
  id: z.string(),
  type: z.enum(['signature', 'date', 'initial']),
  partyId: z.string(),
  position: z.number(),
  label: z.string(),
  required: z.boolean(),
  signedAt: z.string().optional(),
  signatureData: z.string().optional(),
});

const contractSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  parties: z.array(contractPartySchema),
  markers: z.array(contractMarkerSchema),
  status: z.enum(['draft', 'pending', 'signed', 'completed', 'cancelled']),
  createdAt: z.string(),
  expiresAt: z.string().optional(),
  completedAt: z.string().optional(),
  bookingId: z.string().optional(),
  quoteId: z.string().optional(),
  totalAmount: z.number().optional(),
  currency: z.string().optional(),
});

const eSignatureStatusSchema = z.object({
  status: z.enum(['pending', 'initiated', 'signed', 'completed', 'expired', 'cancelled']),
  signedParties: z.array(z.string()),
  pendingParties: z.array(z.string()),
  expiresAt: z.string().optional(),
  downloadUrl: z.string().optional(),
});

export class ContractsAPI {
  /**
   * Get a contract by ID
   */
  static async getContract(contractId: string, token?: string) {
    const options: ApiFetchOptions<Contract, { contract: Contract }> = {
      schema: contractSchema,
      selector: (envelope) => envelope.data.contract,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`contracts/${contractId}`), options);
  }

  /**
   * Get contracts for the current user
   */
  static async getMyContracts(filters?: {
    status?: string;
    bookingId?: string;
    limit?: number;
    offset?: number;
  }, token?: string) {
    const options: ApiFetchOptions<Contract[], { contracts: Contract[] }> = {
      schema: z.array(contractSchema),
      selector: (envelope) => envelope.data.contracts || [],
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    if (filters) {
      options.query = filters;
    }

    return apiFetch(resolveApiUrl('contracts'), options);
  }

  /**
   * Initiate e-signature process for a contract
   */
  static async initiateESignature(input: ESignatureInitiateInput, token?: string) {
    const options: ApiFetchOptions<ESignatureStatus, ESignatureStatus> = {
      method: 'POST',
      schema: eSignatureStatusSchema,
      body: input as unknown as Record<string, unknown>,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`contracts/${input.contractId}/esign/initiate`), options);
  }

  /**
   * Get e-signature status for a contract
   */
  static async getESignatureStatus(contractId: string, token?: string) {
    const options: ApiFetchOptions<ESignatureStatus, ESignatureStatus> = {
      schema: eSignatureStatusSchema,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`contracts/${contractId}/esign/status`), options);
  }

  /**
   * Submit a signature for a marker
   */
  static async submitSignature(contractId: string, input: SignatureSubmitInput, token?: string) {
    const options: ApiFetchOptions<ContractMarker, ContractMarker> = {
      method: 'POST',
      schema: contractMarkerSchema,
      body: input as unknown as Record<string, unknown>,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`contracts/${contractId}/esign/sign`), options);
  }

  /**
   * Download a signed contract
   */
  static async downloadContract(contractId: string, format: 'pdf' | 'docx' = 'pdf', token?: string): Promise<Blob> {
    const url = resolveApiUrl(`contracts/${contractId}/download?format=${format}`);
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to download contract');
    }

    return response.blob();
  }

  /**
   * Get contract preview URL
   */
  static getPreviewUrl(contractId: string): string {
    return resolveApiUrl(`contracts/${contractId}/preview`);
  }

  /**
   * Cancel a contract
   */
  static async cancelContract(contractId: string, reason?: string, token?: string) {
    const options: ApiFetchOptions<Contract, Contract> = {
      method: 'POST',
      schema: contractSchema,
      body: { reason },
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`contracts/${contractId}/cancel`), options);
  }
}
