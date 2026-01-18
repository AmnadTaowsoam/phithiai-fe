import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BadgeProps = {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const Badge = ({ icon, children, className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand-200',
      className,
    )}
  >
    {icon ? <span className="text-base">{icon}</span> : null}
    {children}
  </span>
);
