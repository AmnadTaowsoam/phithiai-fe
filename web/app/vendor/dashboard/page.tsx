import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerAccessToken } from '@/lib/auth/server';
import { getMe } from '@/lib/api/users';

export default async function VendorDashboardPage() {
  const token = getServerAccessToken();
  if (!token) redirect('/auth/login?next=/vendor/dashboard');

  const me = await getMe(token);
  if (me.role && String(me.role).toUpperCase() !== 'VENDOR') {
    redirect('/dashboard');
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-ivory">Vendor dashboard</h1>
      <p className="mt-2 text-ivory/60">Manage leads, quotes, availability, and portfolio.</p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/vendor/leads" className="text-brand-200 hover:text-brand-100">
          Leads →
        </Link>
        <Link href="/vendor/quotes" className="text-brand-200 hover:text-brand-100">
          Quotes →
        </Link>
        <Link href="/vendor/calendar" className="text-brand-200 hover:text-brand-100">
          Calendar →
        </Link>
        <Link href="/vendor/portfolio" className="text-brand-200 hover:text-brand-100">
          Portfolio →
        </Link>
      </div>
    </div>
  );
}
