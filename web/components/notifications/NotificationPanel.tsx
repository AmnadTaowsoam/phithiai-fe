'use client';

import { useMemo } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

export const NotificationPanel = () => {
  const wsUrl = useMemo(() => process.env.NEXT_PUBLIC_PHITHIAI_WS_URL ?? process.env.NEXT_PUBLIC_phithiai_WS_URL, []);
  const { messages } = useWebSocket(wsUrl);
  const notifications = messages.filter((m) => m.type.startsWith('notification.'));

  return (
    <div className="rounded-3xl border border-ivory/10 bg-background/70 p-5">
      <div className="text-sm font-semibold text-ivory">Live notifications</div>
      <div className="mt-3 space-y-2 text-sm text-ivory/70">
        {notifications.length ? (
          notifications.slice(-10).reverse().map((n, idx) => (
            <div key={idx} className="rounded-2xl border border-ivory/10 bg-background/50 p-3">
              <div className="text-xs uppercase tracking-[0.3em] text-ivory/50">{n.type}</div>
              <div className="mt-1">{typeof n.payload === 'string' ? n.payload : JSON.stringify(n.payload)}</div>
            </div>
          ))
        ) : (
          <div className="text-ivory/50">No notifications yet.</div>
        )}
      </div>
    </div>
  );
};

