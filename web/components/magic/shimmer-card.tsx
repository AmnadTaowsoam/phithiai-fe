import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type ShimmerCardProps = {
  className?: string;
  children: ReactNode;
};

export const ShimmerCard = ({ className, children }: ShimmerCardProps) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-card/80 p-[1px] shadow-subtle',
      className,
    )}
  >
    <div className="relative h-full w-full rounded-[calc(theme(borderRadius.3xl)-2px)] bg-background/95 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-emerald/30" />
      </div>
      {children}
    </div>
  </div>
);
