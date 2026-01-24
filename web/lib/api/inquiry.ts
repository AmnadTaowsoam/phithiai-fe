import { apiFetch } from './http';
import { resolveApiUrl } from './config';
import type { ApiFetchOptions } from './http';
import { z } from 'zod';

// Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  readAt?: string;
  type: 'text' | 'image' | 'file';
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  isTyping: boolean;
  vendorName?: string;
  eventName?: string;
  vendorId?: string;
  bookingId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageInput {
  conversationId: string;
  content: string;
  type?: 'text' | 'image' | 'file';
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
}

export interface CreateConversationInput {
  vendorId: string;
  bookingId?: string;
  initialMessage?: string;
}

// Schemas
const messageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  senderName: z.string(),
  content: z.string(),
  timestamp: z.string(),
  readAt: z.string().optional(),
  type: z.enum(['text', 'image', 'file']),
  attachments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
  })).optional(),
});

const conversationSchema = z.object({
  id: z.string(),
  participantId: z.string(),
  participantName: z.string(),
  participantAvatar: z.string().optional(),
  lastMessage: z.string(),
  lastMessageTime: z.string(),
  unreadCount: z.number(),
  isOnline: z.boolean(),
  isTyping: z.boolean(),
  vendorName: z.string().optional(),
  eventName: z.string().optional(),
  vendorId: z.string().optional(),
  bookingId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export class InquiryAPI {
  /**
   * Get all conversations for the current user
   */
  static async getConversations(token?: string) {
    const options: ApiFetchOptions = {
      schema: z.array(conversationSchema),
      selector: (envelope) => (envelope.data as any)?.conversations || [],
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl('inquiries/conversations'), options);
  }

  /**
   * Get messages for a specific conversation
   */
  static async getMessages(conversationId: string, token?: string) {
    const options: ApiFetchOptions = {
      schema: z.array(messageSchema),
      selector: (envelope) => (envelope.data as any)?.messages || [],
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`inquiries/conversations/${conversationId}/messages`), options);
  }

  /**
   * Send a message to a conversation
   */
  static async sendMessage(input: SendMessageInput, token?: string) {
    const options: ApiFetchOptions = {
      method: 'POST',
      schema: messageSchema,
      body: input,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`inquiries/conversations/${input.conversationId}/messages`), options);
  }

  /**
   * Create a new conversation with a vendor
   */
  static async createConversation(input: CreateConversationInput, token?: string) {
    const options: ApiFetchOptions = {
      method: 'POST',
      schema: conversationSchema,
      body: input,
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl('inquiries/conversations'), options);
  }

  /**
   * Mark messages as read
   */
  static async markAsRead(conversationId: string, token?: string) {
    const options: ApiFetchOptions = {
      method: 'POST',
      schema: z.object({ success: z.boolean() }),
    };

    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    return apiFetch(resolveApiUrl(`inquiries/conversations/${conversationId}/read`), options);
  }

  /**
   * Get WebSocket URL for real-time messaging
   */
  static getWebSocketUrl(token?: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_PHITHIAI_WS_URL || 'ws://localhost:3001';
    const wsPath = token ? `/ws?token=${token}` : '/ws';
    return `${baseUrl}${wsPath}`;
  }
}
