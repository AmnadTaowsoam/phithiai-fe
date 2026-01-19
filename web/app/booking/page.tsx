import { BookingWizard } from '@/components/booking/BookingWizard';
import { getVendors } from '@/lib/api';
import { toUiErrorMessage } from '@/lib/api/ui-errors';

export default async function BookingPage() {
  let vendors: Awaited<ReturnType<typeof getVendors>>['items'] = [];
  let errorMessage: string | null = null;

  try {
    const { items } = await getVendors({ limit: 10, sort: 'recommended' });
    vendors = items;
  } catch (error) {
    errorMessage = toUiErrorMessage(error, 'Unable to load vendors right now.');
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {errorMessage ? (
        <div className="mb-6 rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-200">
          {errorMessage}
        </div>
      ) : null}
      <BookingWizard vendors={vendors} />
    </div>
  );
}
