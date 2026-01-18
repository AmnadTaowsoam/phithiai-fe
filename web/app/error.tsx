'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Global error boundary:', error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-6xl items-center px-6 py-16">
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-ivory">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-ivory/70">{error.message}</p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="ghost" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    </div>
  );
}

