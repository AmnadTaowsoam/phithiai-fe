'use client';

import { useEffect } from 'react';

type ToastProps = {
  message: string;
  variant?: 'info' | 'success' | 'error';
  onDismiss?: () => void;
  durationMs?: number;
};

export const Toast = ({ message, variant = 'info', onDismiss, durationMs = 3500 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss?.(), durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, onDismiss]);

  const styles =
    variant === 'success'
      ? 'border-brand-500/30 bg-brand-500/10 text-brand-100'
      : variant === 'error'
        ? 'border-red-500/30 bg-red-500/10 text-red-200'
        : 'border-ivory/15 bg-background/80 text-ivory';

  return (
    <div className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-3xl border p-4 shadow-subtle ${styles}`}>
      <div className="text-sm">{message}</div>
      {onDismiss ? (
        <button className="mt-2 text-xs uppercase tracking-[0.3em] opacity-70 hover:opacity-100" onClick={onDismiss}>
          Dismiss
        </button>
      ) : null}
    </div>
  );
};

