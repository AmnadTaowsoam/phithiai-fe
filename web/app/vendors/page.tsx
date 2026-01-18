import { VendorCard } from '@/components/vendors/VendorCard';
import { VendorFilters, type VendorFilterValues } from '@/components/vendors/VendorFilters';
import { VendorPagination } from '@/components/modules/vendors/vendor-pagination';
import { getVendors } from '@/lib/api';

const toNumber = (value: string | string[] | undefined) => {
  if (!value) return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
};

type VendorsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function VendorsPage({ searchParams }: VendorsPageProps) {
  const initialValues: VendorFilterValues = {
    keyword: typeof searchParams.keyword === 'string' ? searchParams.keyword : '',
    zone: typeof searchParams.zone === 'string' ? searchParams.zone : '',
    category: typeof searchParams.category === 'string' ? searchParams.category : '',
    rating_min: typeof searchParams.rating_min === 'string' ? searchParams.rating_min : '',
    sort: typeof searchParams.sort === 'string' ? searchParams.sort : 'recommended',
  };

  const page = toNumber(searchParams.page) ?? 1;
  const limit = 12;
  const ratingMin = toNumber(searchParams.rating_min);

  const { items, pagination } = await getVendors({
    keyword: initialValues.keyword || undefined,
    zone: initialValues.zone || undefined,
    category: initialValues.category || undefined,
    rating_min: ratingMin,
    sort: (initialValues.sort as any) || 'recommended',
    page,
    limit,
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-semibold text-ivory">Discover vendors</h1>
        <p className="max-w-2xl text-ivory/60">
          Browse Phithiai verified partners and refine the list with smart filters.
        </p>
      </div>

      <div className="space-y-8">
        <VendorFilters initialValues={initialValues} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        <VendorPagination
          page={pagination?.page ?? page}
          totalPages={pagination?.totalPages ?? 1}
          hasNext={pagination?.hasNext}
          hasPrev={pagination?.hasPrev}
        />
      </div>
    </div>
  );
}

