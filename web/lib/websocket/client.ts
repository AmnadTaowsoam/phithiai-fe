'use client';

import type { WebSocketMessage } from './types';

export type WebSocketClientOptions = {
  url: string;
  onMessage?: (message: WebSocketMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  reconnectMs?: number;
};

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private stopped = false;
  private reconnectMs: number;

  constructor(private options: WebSocketClientOptions) {
    this.reconnectMs = options.reconnectMs ?? 1500;
  }

  connect() {
    if (this.socket || this.stopped) return;
    this.socket = new WebSocket(this.options.url);

    this.socket.onopen = () => {
      this.options.onOpen?.();
    };

    this.socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(String(event.data)) as WebSocketMessage;
        this.options.onMessage?.(parsed);
      } catch {
        this.options.onMessage?.({ type: 'raw', payload: event.data, ts: new Date().toISOString() });
      }
    };

    this.socket.onclose = () => {
      this.socket = null;
      this.options.onClose?.();
      if (!this.stopped) {
        setTimeout(() => this.connect(), this.reconnectMs);
      }
    };
  }

  send(message: WebSocketMessage) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return false;
    this.socket.send(JSON.stringify({ ...message, ts: message.ts ?? new Date().toISOString() }));
    return true;
  }

  disconnect() {
    this.stopped = true;
    this.socket?.close();
    this.socket = null;
  }
}

