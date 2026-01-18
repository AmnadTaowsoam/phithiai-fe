'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/experiences', label: 'ประสบการณ์พิเศษ' },
  { href: '/intelligence', label: 'ระบบอัจฉริยะ' },
  { href: '/vendors', label: 'พาร์ทเนอร์คัดสรร' },
  { href: '/plan', label: 'วางแผนด้วย AI' },
  { href: '/testimonials', label: 'เรื่องราว' },
];

const brandMark =
  'flex items-center gap-3 rounded-full border border-brand-500/40 bg-surface/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-white shadow-subtle transition hover:border-brand-400/70';

export const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const activePath = useMemo(() => pathname.replace(/\/$/, '') || '/', [pathname]);

  return (
    <header className="sticky top-0 z-50 pt-6">
      <div className="container">
        <div className="relative flex items-center justify-between overflow-hidden rounded-full border border-ivory/10 bg-background/80 px-5 py-3 shadow-subtle backdrop-blur-xl">
          <Link href="/" className={brandMark}>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-brand-500 via-brand-400 to-emerald-500 text-lg font-bold text-background shadow-emerald">
              P
            </span>
            Phithiai
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
            {links.map(({ href, label }) => {
              const isActive = href === activePath;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative transition-all duration-200 hover:text-white',
                    isActive ? 'text-white' : undefined,
                  )}
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-brand-500 via-emerald-500 to-brand-400 transition-[width] duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="ghost" as="a" href="/partners" className="text-sm text-white/80 hover:text-white">
              สำหรับพาร์ทเนอร์
            </Button>
            <Button as="a" href="/plan">
              วางแผนกับ Phithiai
            </Button>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-surface/80 text-white shadow-subtle transition hover:border-brand-400/60 lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="space-y-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-current"
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 w-4 bg-current"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-current"
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container mt-2 overflow-hidden rounded-3xl border border-white/20 bg-background/90 shadow-subtle backdrop-blur-xl">
              <nav className="flex flex-col divide-y divide-white/10 text-sm text-white/80">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-6 py-4 transition hover:bg-white/10 hover:text-white"
                  >
                    {label}
                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">สำรวจ</span>
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3 px-6 py-5">
                <Button variant="secondary" as="a" href="/vendors" className="w-full">
                  ดูพาร์ทเนอร์ทั้งหมด
                </Button>
                <Button as="a" href="/plan" className="w-full">
                  วางแผนกับ Phithiai
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
