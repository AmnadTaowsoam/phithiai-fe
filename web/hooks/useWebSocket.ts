'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export type WebSocketMessage = {
  type: 'message' | 'typing' | 'read_receipt' | 'presence' | 'error';
  data: any;
  timestamp: string;
  senderId: string;
  conversationId: string;
};

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface UseWebSocketOptions {
  url: string;
  onMessage?: (message: WebSocketMessage) => void;
  onStatusChange?: (status: WebSocketStatus) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export function useWebSocket({
  url,
  onMessage,
  onStatusChange,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
}: UseWebSocketOptions) {
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setStatus('connecting');
    onStatusChange?.('connecting');

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus('connected');
        onStatusChange?.('connected');
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          // Handle typing indicators
          if (message.type === 'typing') {
            const { userId, isTyping: userIsTyping } = message.data;
            setTypingUsers((prev) => {
              const newUsers = new Set(prev);
              if (userIsTyping) {
                newUsers.add(userId);
              } else {
                newUsers.delete(userId);
              }
              return newUsers;
            });
          }

          onMessage?.(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onclose = (event) => {
        setStatus('disconnected');
        onStatusChange?.('disconnected');

        // Attempt to reconnect if not closed intentionally
        if (!event.wasClean && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setStatus('error');
        onStatusChange?.('error');
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setStatus('error');
      onStatusChange?.('error');
    }
  }, [url, onMessage, onStatusChange, reconnectInterval, maxReconnectAttempts]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setStatus('disconnected');
    onStatusChange?.('disconnected');
  }, [onStatusChange]);

  const send = useCallback((message: Omit<WebSocketMessage, 'timestamp' | 'senderId'>) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const fullMessage: WebSocketMessage = {
        ...message,
        timestamp: new Date().toISOString(),
        senderId: 'current-user', // This should come from auth context
      };
      wsRef.current.send(JSON.stringify(fullMessage));
      return true;
    }
    return false;
  }, []);

  const sendTypingIndicator = useCallback(
    (conversationId: string, isTyping: boolean) => {
      send({
        type: 'typing',
        data: {
          conversationId,
          isTyping,
        },
        conversationId,
      });

      // Auto-clear typing indicator after 3 seconds
      if (isTyping) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          sendTypingIndicator(conversationId, false);
        }, 3000);
      }
    },
    [send]
  );

  const sendReadReceipt = useCallback((conversationId: string, messageId: string) => {
    send({
      type: 'read_receipt',
      data: {
        conversationId,
        messageId,
      },
      conversationId,
    });
  }, [send]);

  const sendPresence = useCallback((status: 'online' | 'offline' | 'away') => {
    send({
      type: 'presence',
      data: { status },
      conversationId: 'system',
    });
  }, [send]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    status,
    isTyping,
    typingUsers,
    send,
    sendTypingIndicator,
    sendReadReceipt,
    sendPresence,
    connect,
    disconnect,
  };
}
