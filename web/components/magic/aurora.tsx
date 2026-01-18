'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type AuroraProps = {
  className?: string;
  children?: ReactNode;
};

export const Aurora = ({ className, children }: AuroraProps) => (
  <div className={cn('relative overflow-hidden', className)}>
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -top-1/3 left-0 h-[140%] w-full bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.35),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(80,200,120,0.25),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(255,182,193,0.25),transparent_60%)] blur-[60px]"
      animate={{
        rotate: [0, 8, -6, 0],
        scale: [1, 1.05, 0.98, 1],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    {children}
  </div>
);
