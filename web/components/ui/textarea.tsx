'use client';

import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full rounded-2xl border border-ivory/15 bg-background/90 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 transition focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-300/30',
      className,
    )}
    {...props}
  />
));

Textarea.displayName = 'Textarea';
