import Link from 'next/link';
import { redirect } from 'next/navigation';
import { StatCard } from '@/components/dashboard/StatCard';
import { BookingList } from '@/components/dashboard/BookingList';
import { getServerAccessToken } from '@/lib/auth/server';
import { listMyBookings, getBookingStatistics } from '@/lib/api/bookings';

export default async function DashboardPage() {
  const token = getServerAccessToken();
  if (!token) {
    redirect('/auth/login?next=/dashboard');
  }

  const [{ bookings }, stats] = await Promise.all([
    listMyBookings(undefined, token).catch(() => ({ bookings: [] })),
    getBookingStatistics(token).catch(() => ({ statistics: {} as any })),
  ]);

  const totalBookings = bookings.length;
  const upcoming = bookings.filter((b) => b.status && String(b.status).toLowerCase().includes('upcoming')).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold text-ivory">Dashboard</h1>
        <p className="text-ivory/60">
          Track bookings, budgets, and checklists — or jump back to{' '}
          <Link href="/plan" className="text-brand-200 hover:text-brand-100">
            planning tools
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard label="Bookings" value={String(totalBookings)} hint="Total bookings in your account" />
        <StatCard label="Upcoming" value={String(upcoming)} hint="Bookings marked upcoming" />
        <StatCard label="Insights" value={String(Object.keys((stats as any).statistics ?? {}).length)} hint="Stats payload keys" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <BookingList bookings={bookings} />
        <div className="space-y-6">
          <StatCard label="Quick actions" value="Ready" hint="Start a new booking or explore vendors" />
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vendors"
              className="rounded-2xl border border-ivory/15 bg-background/70 px-4 py-2 text-sm font-semibold text-ivory hover:border-ivory/25"
            >
              Browse vendors
            </Link>
            <Link
              href="/booking"
              className="rounded-2xl border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-100 hover:bg-brand-500/15"
            >
              Start booking
            </Link>
            <Link
              href="/profile"
              className="rounded-2xl border border-ivory/15 bg-background/70 px-4 py-2 text-sm font-semibold text-ivory hover:border-ivory/25"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
