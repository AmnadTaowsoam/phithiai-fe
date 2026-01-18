import { BookingWizard } from '@/components/booking/BookingWizard';
import { getVendors } from '@/lib/api';

export default async function BookingPage() {
  const { items: vendors } = await getVendors({ limit: 10, sort: 'recommended' });
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <BookingWizard vendors={vendors} />
    </div>
  );
}

