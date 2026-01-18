'use client';

import { useEffect, useState } from 'react';
import type { LiffProfile } from '@/lib/liff-sdk';
import { ensureLoggedIn, getProfile, initLiff } from '@/lib/liff-sdk';

export const useLiff = () => {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<LiffProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          setError('NEXT_PUBLIC_LIFF_ID is not set');
          return;
        }

        await initLiff(liffId);
        const ok = await ensureLoggedIn();
        if (!ok) return;
        setProfile(await getProfile());
        setReady(true);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to init LIFF');
      }
    };
    run();
  }, []);

  return { ready, profile, error };
};

