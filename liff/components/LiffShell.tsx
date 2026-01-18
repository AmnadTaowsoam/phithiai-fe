'use client';

import Link from 'next/link';
import { useLiff } from '@/hooks/useLiff';

export const LiffShell = ({ children }: { children: React.ReactNode }) => {
  const { ready, profile, error } = useLiff();

  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700 }}>Phithiai LIFF</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {error ? error : ready ? `Hello, ${profile?.displayName ?? 'Guest'}` : 'Loading…'}
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 12, fontSize: 14 }}>
          <Link href="/">Home</Link>
          <Link href="/booking">Quick booking</Link>
          <Link href="/status">Status</Link>
        </nav>
      </header>
      <main style={{ marginTop: 16 }}>{children}</main>
    </div>
  );
};

