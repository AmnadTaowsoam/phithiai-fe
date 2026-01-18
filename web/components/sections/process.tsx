import { GlassCard } from '@/components/ui/glass-card';

const steps = [
  {
    step: '01',
    title: 'อาเทลิเยร์วิสัยทัศน์',
    description:
      'ค้นพบแบบเต็มรูปแบบกับนักออกแบบพิธีของเรา จับภาพเชื้อสาย ทิศทางความงาม และสัญญาณทางประสาทสัมผัส รับลุคบุ๊กแรงบันดาลใจภายใน 72 ชั่วโมง',
  },
  {
    step: '02',
    title: 'แบบแปลนอัจฉริยะ',
    description:
      'Malai Copilot และนักวางแผนคอนเซียร์จร่วมสร้างไทม์ไลน์แบบองค์รวม กรอบงบประมาณ และรายชื่อพาร์ทเนอร์พร้อมคำแนะนำที่รองรับด้วยข้อมูล',
  },
  {
    step: '03',
    title: 'ความสงบที่ประสานกลมกลืน',
    description:
      'Magic UI Workspace เชื่อมโยงครอบครัว พาร์ทเนอร์ และแขก การติดตามความรู้สึกแบบสดและการตรวจสอบคุณภาพทุกขั้นตอน ทำให้ทุกช่วงเวลาดำเนินไปอย่างไร้ที่ติ',
  },
];

export const Process = () => (
  <section id="intelligence" className="container space-y-14 py-24">
    <div className="mx-auto max-w-3xl space-y-6 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-200/80">เส้นทางคอนเซียร์จ</p>
      <h2 className="font-display text-4xl text-ivory md:text-5xl">
        กระบวนการระดับพรีเมียม ออกแบบเพื่อความสงบ ชัดเจน และแม่นยำทางวัฒนธรรม
      </h2>
    </div>
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map(({ step, title, description }) => (
        <GlassCard key={step} className="relative overflow-hidden bg-background/95">
          <div className="absolute -top-10 right-6 text-8xl font-light text-ivory/5">{step}</div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">ขั้นตอน {step}</p>
            <h3 className="text-2xl font-semibold text-ivory">{title}</h3>
            <p className="text-ivory/70">{description}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  </section>
);
