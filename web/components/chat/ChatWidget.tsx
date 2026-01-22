'use client';

import { useMemo, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ChatWidget = () => {
  const wsUrl = useMemo(() => process.env.NEXT_PUBLIC_PHITHIAI_WS_URL ?? process.env.NEXT_PUBLIC_phithiai_WS_URL ?? '', []);
  const { status, send } = useWebSocket({ url: wsUrl });
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Array<{ type: string; payload: any }>>([]);

  const isConnected = status === 'connected';

  return (
    <div className="rounded-3xl border border-ivory/10 bg-background/70 p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-ivory">Chat</div>
        <div className="text-xs text-ivory/60">{isConnected ? 'Connected' : 'Offline'}</div>
      </div>
      <div className="mt-4 h-40 overflow-auto rounded-2xl border border-ivory/10 bg-background/50 p-3 text-xs text-ivory/70">
        {messages.length ? (
          messages.map((m, idx) => (
            <div key={idx} className="py-1">
              <span className="text-ivory/50">{m.type}</span>: {typeof m.payload === 'string' ? m.payload : JSON.stringify(m.payload)}
            </div>
          ))
        ) : (
          <div className="text-ivory/50">No messages yet.</div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" />
        <Button
          onClick={() => {
            if (!text.trim()) return;
            setMessages(prev => [...prev, { type: 'message', payload: { text } }]);
            send({ type: 'message', data: { text }, conversationId: 'default' });
            setText('');
          }}
          disabled={!isConnected}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

