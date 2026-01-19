import { Hero } from '@/components/sections/hero';
import { SignatureExperience } from '@/components/sections/signature-experience';
import { VendorShowcase } from '@/components/sections/vendor-showcase';
import { PlatformSuite } from '@/components/sections/platform-suite';
import { Testimonials } from '@/components/sections/testimonials';
import { BookingCTA } from '@/components/sections/cta';
import { Process } from '@/components/sections/process';
import { TrustBadges } from '@/components/ui/trust-badges';
import { getVendors } from '@/lib/api';
import { toUiErrorMessage } from '@/lib/api/ui-errors';

const HomePage = async () => {
  let vendors: Awaited<ReturnType<typeof getVendors>>['items'] = [];
  let vendorError: string | null = null;

  try {
    const result = await getVendors({ limit: 3, sort: 'recommended' });
    vendors = result.items;
  } catch (error) {
    vendorError = toUiErrorMessage(error, 'Unable to load featured vendors right now.');
  }

  return (
    <div className="flex flex-col gap-24 pb-24">
      <main className="flex flex-col gap-24">
        <Hero />
        <TrustBadges />
        <SignatureExperience />
        <Process />
        <VendorShowcase vendors={vendors} errorMessage={vendorError} />
        <PlatformSuite />
        <Testimonials />
        <BookingCTA />
      </main>
    </div>
  );
};

export default HomePage;
