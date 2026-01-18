import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerAccessToken } from '@/lib/auth/server';

export default function VendorPortfolioPage() {
  const token = getServerAccessToken();
  if (!token) redirect('/auth/login?next=/vendor/portfolio');

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-ivory">Portfolio</h1>
      <p className="mt-2 text-ivory/60">Upload and manage portfolio assets (media-service integration).</p>
      <Link href="/vendor/dashboard" className="mt-6 inline-block text-sm text-brand-200 hover:text-brand-100">
        Back to vendor dashboard →
      </Link>
    </div>
  );
}
