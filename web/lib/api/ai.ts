import { z } from 'zod';
import { apiFetch } from './http';
import { apiRoutes } from './config';

const chatResponseSchema = z.object({
  conversationId: z.string().optional(),
  messages: z.array(z.record(z.any())).optional(),
  reply: z.string().optional(),
});

const historySchema = z.object({
  conversations: z.array(z.record(z.any())).optional(),
});

const recommendationSchema = z.object({
  recommendations: z.array(z.record(z.any())).optional(),
});

export const sendAiMessage = (payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.ai.chat, {
    method: 'POST',
    schema: chatResponseSchema,
    body: payload,
  });

export const getAiConversationHistory = () =>
  apiFetch(apiRoutes.ai.history, {
    method: 'GET',
    schema: historySchema,
  });

export const getAiRecommendations = () =>
  apiFetch(apiRoutes.ai.recommendations, {
    method: 'GET',
    schema: recommendationSchema,
  });
