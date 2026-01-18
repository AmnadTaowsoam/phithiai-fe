'use client';

import { useEffect, useMemo, useState } from 'react';
import { WebSocketClient } from '@/lib/websocket/client';
import type { WebSocketMessage } from '@/lib/websocket/types';

export const useWebSocket = (url?: string) => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  const client = useMemo(() => {
    if (!url) return null;
    return new WebSocketClient({
      url,
      onOpen: () => setConnected(true),
      onClose: () => setConnected(false),
      onMessage: (message) => setMessages((prev) => [...prev.slice(-99), message]),
    });
  }, [url]);

  useEffect(() => {
    if (!client) return;
    client.connect();
    return () => client.disconnect();
  }, [client]);

  const send = (message: WebSocketMessage) => client?.send(message) ?? false;

  return { connected, messages, send };
};

