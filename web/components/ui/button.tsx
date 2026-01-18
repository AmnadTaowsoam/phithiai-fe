'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-tr from-brand-500 via-brand-400 to-emerald-500 text-background shadow-glow focus-visible:ring-2 focus-visible:ring-brand-300/70',
  secondary:
    'bg-surface/90 text-ivory border border-brand-500/40 hover:border-brand-400/60 focus-visible:ring-2 focus-visible:ring-brand-300/50',
  ghost:
    'bg-transparent text-ivory hover:bg-ivory/10 border border-transparent focus-visible:ring-2 focus-visible:ring-ivory/30',
  outline:
    'border border-ivory/40 text-ivory hover:bg-ivory/10 focus-visible:ring-2 focus-visible:ring-ivory/30',
};

type MotionButtonProps = ComponentProps<typeof motion.button>;
type MotionAnchorProps = ComponentProps<typeof motion.a>;

type BaseProps = {
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<MotionButtonProps, 'children' | 'className' | 'whileTap' | 'whileHover'> & { as?: 'button' };
type ButtonAsAnchor = BaseProps &
  Omit<MotionAnchorProps, 'children' | 'className' | 'whileTap' | 'whileHover'> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = ({ className, children, variant = 'primary', icon, as = 'button', ...props }: ButtonProps) => {
  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none',
        variantStyles[variant],
        className,
      )}
      {...(props as Record<string, unknown>)}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 mix-blend-overlay" />
      </span>
      {children}
      {icon ? <span className="text-lg transition-transform group-hover:translate-x-0.5">{icon}</span> : null}
    </Component>
  );
};
