import Link from 'next/link';

export default function DashboardBudgetPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-ivory">Budget</h1>
      <p className="mt-2 text-ivory/60">
        Budget tracking integrates with planning tools. Use{' '}
        <Link href="/plan" className="text-brand-200 hover:text-brand-100">
          budget estimator
        </Link>{' '}
        to generate your forecast.
      </p>
    </div>
  );
}

