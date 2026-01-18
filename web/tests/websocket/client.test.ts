import { describe, expect, it, vi } from 'vitest';
import { WebSocketClient } from '@/lib/websocket/client';
import type { WebSocketMessage } from '@/lib/websocket/types';

class MockWebSocket {
  static OPEN = 1;

  readyState = MockWebSocket.OPEN;
  sent: string[] = [];

  onopen: (() => void) | null = null;
  onmessage: ((event: { data: unknown }) => void) | null = null;
  onclose: (() => void) | null = null;

  constructor(public url: string) {
    queueMicrotask(() => this.onopen?.());
  }

  send(payload: string) {
    this.sent.push(payload);
  }

  close() {
    this.onclose?.();
  }
}

describe('WebSocketClient', () => {
  it('parses JSON messages and falls back to raw', async () => {
    (globalThis as any).WebSocket = MockWebSocket;

    const onMessage = vi.fn<(message: WebSocketMessage) => void>();
    const client = new WebSocketClient({ url: 'ws://test', onMessage });
    client.connect();

    const socket = (client as any).socket as MockWebSocket;
    socket.onmessage?.({ data: JSON.stringify({ type: 'chat', payload: { text: 'hi' }, ts: '2026-01-18T00:00:00Z' }) });
    socket.onmessage?.({ data: 'not-json' });

    expect(onMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'chat', payload: expect.objectContaining({ text: 'hi' }) }),
    );
    expect(onMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'raw', payload: 'not-json' }));
  });

  it('adds ts when sending and returns false when disconnected', () => {
    (globalThis as any).WebSocket = MockWebSocket;

    const client = new WebSocketClient({ url: 'ws://test' });
    expect(client.send({ type: 'chat', payload: { text: 'nope' } } as any)).toBe(false);

    client.connect();
    expect(client.send({ type: 'chat', payload: { text: 'ok' } } as any)).toBe(true);

    const socket = (client as any).socket as MockWebSocket;
    expect(socket.sent).toHaveLength(1);
    expect(JSON.parse(socket.sent[0])).toMatchObject({
      type: 'chat',
      payload: { text: 'ok' },
      ts: expect.any(String),
    });
  });
});

