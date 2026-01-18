'use client';

import type { ChangeEvent } from 'react';
import { useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconAdjustments, IconX } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const zones = [
  { label: 'All regions', value: '' },
  { label: 'Bangkok', value: 'bangkok' },
  { label: 'Central', value: 'central' },
  { label: 'North', value: 'north' },
  { label: 'Northeast', value: 'northeast' },
  { label: 'South', value: 'south' },
];

const categories = [
  { label: 'All categories', value: '' },
  { label: 'Venue', value: 'venue' },
  { label: 'Floral & Styling', value: 'decoration' },
  { label: 'Photography & Film', value: 'photography' },
  { label: 'Culinary & Beverage', value: 'catering' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Attire & Beauty', value: 'attire' },
];

const ratingOptions = [
  { label: 'Any rating', value: '' },
  { label: '4.5 stars & above', value: '4.5' },
  { label: '4.0 stars & above', value: '4.0' },
  { label: '3.5 stars & above', value: '3.5' },
];

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
];

export type VendorFilterValues = {
  keyword?: string;
  zone?: string;
  category?: string;
  rating_min?: string;
  sort?: string;
};

type VendorFiltersProps = {
  initialValues?: VendorFilterValues;
};

export const VendorFilters = ({ initialValues }: VendorFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState<VendorFilterValues>({
    keyword: initialValues?.keyword ?? '',
    zone: initialValues?.zone ?? '',
    category: initialValues?.category ?? '',
    rating_min: initialValues?.rating_min ?? '',
    sort: initialValues?.sort ?? 'recommended',
  });

  const hasActiveFilters = useMemo(
    () =>
      Boolean(
        values.keyword ||
          values.zone ||
          values.category ||
          values.rating_min ||
          (values.sort && values.sort !== 'recommended'),
      ),
    [values],
  );

  const updateValue = (key: keyof VendorFilterValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    params.delete('page');

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const resetFilters = () => {
    setValues({
      keyword: '',
      zone: '',
      category: '',
      rating_min: '',
      sort: 'recommended',
    });

    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  return (
    <div className="rounded-3xl border border-ivory/15 bg-background/80 p-6 shadow-subtle">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-ivory/60">
          <IconAdjustments size={18} className="text-brand-200" />
          Refine selection
        </div>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ivory/50 transition hover:text-ivory"
          >
            <IconX size={14} />
            Clear all
          </button>
        ) : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="keyword" className="text-xs uppercase tracking-[0.3em] text-ivory/50">
            Keyword
          </label>
          <Input
            id="keyword"
            name="keyword"
            value={values.keyword}
            onChange={(event) => updateValue('keyword', event.target.value)}
            placeholder="Search by name, style, specialty"
          />
        </div>
        <FilterSelect
          id="zone"
          label="Zone"
          value={values.zone ?? ''}
          onChange={(event) => updateValue('zone', event.target.value)}
          options={zones}
        />
        <FilterSelect
          id="category"
          label="Category"
          value={values.category ?? ''}
          onChange={(event) => updateValue('category', event.target.value)}
          options={categories}
        />
        <FilterSelect
          id="rating_min"
          label="Minimum rating"
          value={values.rating_min ?? ''}
          onChange={(event) => updateValue('rating_min', event.target.value)}
          options={ratingOptions}
        />
        <FilterSelect
          id="sort"
          label="Sort by"
          value={values.sort ?? 'recommended'}
          onChange={(event) => updateValue('sort', event.target.value)}
          options={sortOptions}
        />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button onClick={applyFilters} disabled={pending}>
          {pending ? 'Applying...' : 'Apply filters'}
        </Button>
        <Button variant="ghost" onClick={resetFilters} disabled={pending}>
          Reset
        </Button>
      </div>
    </div>
  );
};

type FilterSelectProps = {
  id: string;
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const FilterSelect = ({ id, label, value, options, onChange }: FilterSelectProps) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-xs uppercase tracking-[0.3em] text-ivory/50">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="h-11 w-full rounded-2xl border border-ivory/15 bg-background/90 px-4 text-sm text-ivory outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
    >
      {options.map((option) => (
        <option key={`${id}-${option.value || 'all'}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
