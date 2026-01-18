import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type GlassCardProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
};

export const GlassCard = ({ as: Component = 'div', className, children }: GlassCardProps) => (
  <Component className={cn('glass-panel rounded-3xl p-8', className)}>{children}</Component>
);
