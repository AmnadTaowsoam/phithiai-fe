import { VendorCard } from '@/components/vendors/VendorCard';
import { getVendors } from '@/lib/api';

export default async function LookbookPage() {
  const { items } = await getVendors({ limit: 12, sort: 'recommended' });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-semibold text-ivory">Lookbook</h1>
        <p className="max-w-2xl text-ivory/60">
          Inspiration curated from real vendor profiles. Explore and open a profile to view galleries and packages.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}

