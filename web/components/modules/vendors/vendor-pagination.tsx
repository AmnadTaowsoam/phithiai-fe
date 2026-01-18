'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

type PaginationProps = {
  page?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export const VendorPagination = ({ page = 1, totalPages = 1, hasNext, hasPrev }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (target: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(target));

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex items-center justify-between rounded-3xl border border-ivory/15 bg-background/80 px-4 py-3 text-sm text-ivory/70 shadow-subtle">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => goToPage(page - 1)} disabled={pending || !hasPrev}>
          Previous
        </Button>
        <Button variant="ghost" onClick={() => goToPage(page + 1)} disabled={pending || !hasNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
