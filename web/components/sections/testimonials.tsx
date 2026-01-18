import { IconQuote } from '@tabler/icons-react';
import { GlassCard } from '@/components/ui/glass-card';

const testimonials = [
  {
    quote:
      'พิธีกรรมแบบดั้งเดิม การต้อนรับแบบสมัยใหม่ ไร้ความเครียด Phithiai เปลี่ยนงานฉลองข้ามวัฒนธรรมของเราให้เป็นประสบการณ์ที่ซาบซึ้งและสวยงามเหมือนภาพยนตร์',
    name: 'ธนิดา & อรัญ',
    detail: 'กรุงเทพฯ · งานไทย-จีน · 420 แขก',
  },
  {
    quote:
      'คอนเซียร์จ AI เข้าใจครอบครัวเราได้ดีกว่านักวางแผนคนอื่นๆ พาร์ทเนอร์ยอดเยี่ยม และไทม์ไลน์ไม่เคยพลาดแม้แต่ครั้งเดียว',
    name: 'มิลลิ่ & เจมส์',
    detail: 'เชียงใหม่ · งานแต่งสวนล้านนา · เส้นทาง 3 วัน',
  },
  {
    quote:
      'ในฐานะพาร์ทเนอร์ ความชัดเจนและความเคารพไม่มีที่ไหนเทียบได้ ขั้นตอนงาน มู้ดบอร์ด และความรู้สึกของแขกรวมอยู่ที่เดียว เราส่งมอบผลงานที่ดีที่สุดที่นี่',
    name: 'Maison Lanna Collective',
    detail: 'พาร์ทเนอร์ดอกไม้ซิกเนเจอร์',
  },
];

export const Testimonials = () => (
  <section id="testimonials" className="container space-y-12 py-24">
    <div className="mx-auto max-w-2xl space-y-4 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-200/80">เรื่องราวจากวงใน</p>
      <h2 className="font-display text-4xl text-ivory md:text-5xl thai-heading-md">
        งานฉลองที่ออกแบบด้วย Phithiai จดจำไปตลอดชีวิต
      </h2>
    </div>
    <div className="grid gap-8 md:grid-cols-3">
      {testimonials.map(({ quote, name, detail }) => (
        <GlassCard key={name} className="flex h-full flex-col justify-between border border-ivory/15 bg-background/85">
          <IconQuote size={32} className="mb-6 text-brand-200/70" />
          <p className="text-lg text-ivory/80">“{quote}”</p>
          <div className="mt-10 space-y-1 text-sm">
            <p className="font-semibold text-ivory">{name}</p>
            <p className="text-ivory/55">{detail}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  </section>
);
