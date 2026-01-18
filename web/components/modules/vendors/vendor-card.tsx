import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { VendorSummary } from '@/lib/api';

type VendorCardProps = {
  vendor: VendorSummary;
};

export const VendorCard = ({ vendor }: VendorCardProps) => (
  <GlassCard className="flex h-full flex-col overflow-hidden p-0">
    <div className="relative h-56 w-full overflow-hidden">
      <Image
        src={
          vendor.coverImage ??
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1100&q=80'
        }
        alt={vendor.name}
        fill
        className="object-cover transition-transform duration-500 hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-ivory/70">
        <span className="rounded-full border border-ivory/15 bg-background/80 px-3 py-1 backdrop-blur">
          {vendor.category}
        </span>
        <span className="rounded-full border border-ivory/15 bg-background/80 px-3 py-1 backdrop-blur">
          {vendor.zone}
        </span>
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-5 text-ivory">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{vendor.name}</h3>
          <p className="mt-1 text-sm text-ivory/65">{vendor.description}</p>
        </div>
        {vendor.rating ? (
          <span className="inline-flex items-center justify-center rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-200">
            {vendor.rating.toFixed(1)}
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-ivory/65">
        {vendor.tags?.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-ivory/15 bg-ivory/5 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between text-sm text-ivory/60">
        <span>
          {vendor.reviewCount
            ? `${formatNumber(vendor.reviewCount)} verified reviews`
            : vendor.verified
              ? 'malAI verified'
              : 'Awaiting reviews'}
        </span>
        {vendor.startingPrice ? (
          <span className="font-semibold text-brand-200">{formatCurrency(vendor.startingPrice)}</span>
        ) : null}
      </div>
      <Link
        href={`/vendors/${vendor.slug ?? vendor.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition hover:text-brand-100"
      >
        View profile →
      </Link>
    </div>
  </GlassCard>
);
