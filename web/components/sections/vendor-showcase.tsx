import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import type { VendorSummary } from '@/lib/api';

type VendorShowcaseProps = {
  vendors: VendorSummary[];
};

export const VendorShowcase = ({ vendors }: VendorShowcaseProps) => (
  <section id="vendors" className="container space-y-12 py-24">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-200/80">พาร์ทเนอร์คัดสรร</p>
        <h2 className="font-display text-4xl text-ivory md:text-5xl thai-heading" style={{ marginBottom: '2rem' }}>
          ช่างฝีมือชั้นเลิศจากงานฉลองที่โด่งดังที่สุดในไทย
        </h2>
      </div>
      <div className="space-y-4 text-ivory/70">
        <p>
          ทุกพาร์ทเนอร์ผ่านการตรวจสอบ 48 ข้อของ Phithiai ครอบคลุมความเป็นเลิศด้านงานฝีมือ ความเข้าใจวัฒนธรรม
          ความน่าเชื่อถือในการดำเนินงาน และคะแนนความพึงพอใจของแขก เพียง 8% ของผู้สมัครเข้าร่วมได้
        </p>
        <Button as="a" href="/vendors" variant="secondary" className="w-full sm:w-auto">
          สำรวจพาร์ทเนอร์ทั้งหมด
        </Button>
      </div>
    </div>
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {vendors.map((vendor) => (
        <GlassCard key={vendor.id} className="overflow-hidden p-0">
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={
                vendor.coverImage ??
                'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80'
              }
              alt={vendor.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-ivory/70 backdrop-blur">
              {vendor.category} / {vendor.zone}
            </span>
          </div>
          <div className="space-y-4 px-6 pb-6 pt-5 text-ivory">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{vendor.name}</h3>
                <p className="mt-1 text-sm text-ivory/65">{vendor.description}</p>
              </div>
              {vendor.rating ? (
                <span className="rounded-full border border-brand-500/50 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-200">
                  {vendor.rating.toFixed(2)}
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {vendor.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-ivory/15 bg-ivory/5 px-3 py-1 text-xs text-ivory/65"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-ivory/60">
              <span>
                {vendor.reviewCount ? `${vendor.reviewCount} รีวิวที่ตรวจสอบแล้ว` : 'รอรีวิวแรก'}
              </span>
              {vendor.startingPrice ? (
                <span className="font-semibold text-brand-200">
                  {vendor.startingPrice.toLocaleString()} บาท
                </span>
              ) : null}
            </div>
            <Link
              href={`/vendors/${vendor.slug ?? vendor.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition hover:text-brand-100"
            >
              ดูโปรไฟล์ {'->'}
            </Link>
          </div>
        </GlassCard>
      ))}
    </div>
  </section>
);
