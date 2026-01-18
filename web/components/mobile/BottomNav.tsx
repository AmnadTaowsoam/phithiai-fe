'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/vendors', label: 'Vendors' },
  { href: '/plan', label: 'Plan' },
  { href: '/profile', label: 'Profile' },
];

export const BottomNav = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-ivory/10 bg-background/90 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-around px-4 py-3 text-xs text-ivory/70">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? 'text-brand-200' : 'text-ivory/70 hover:text-ivory'}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

