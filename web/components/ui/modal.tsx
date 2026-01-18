'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export const Modal = ({ open, onOpenChange, title, description, children, className }: ModalProps) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur"
        onClick={() => onOpenChange(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className={cn(
            'relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-ivory/15 bg-background/95 p-8 text-ivory shadow-subtle',
            className,
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-6 rounded-full border border-ivory/15 bg-background/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-ivory/60 transition hover:text-ivory"
          >
            Close
          </button>
          <div className="space-y-4 pr-12">
            <h3 className="font-display text-3xl">{title}</h3>
            {description ? <p className="text-sm text-ivory/70">{description}</p> : null}
          </div>
          <div className="mt-8">{children}</div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
