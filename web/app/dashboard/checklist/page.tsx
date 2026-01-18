import Link from 'next/link';

export default function DashboardChecklistPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-ivory">Checklist</h1>
      <p className="mt-2 text-ivory/60">
        Generate and manage tasks via{' '}
        <Link href="/plan" className="text-brand-200 hover:text-brand-100">
          checklist generator
        </Link>
        .
      </p>
    </div>
  );
}

