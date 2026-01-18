import { IconBrain, IconCalendarCog, IconCrown } from '@tabler/icons-react';
import { GlassCard } from '@/components/ui/glass-card';

const highlights = [
  {
    title: 'Phithiai Copilot™',
    description:
      'คอนเซียร์จ AI แบบสนทนา ที่ได้รับการฝึกฝนจากคลังข้อมูลพิธีไทย สัญญาณความรู้สึกของแขก และข้อมูลความพร้อมแบบเรียลไทม์ ร่วมสร้างสคริปต์ กำหนดการ และคำแนะนำมารยาทเป็นภาษาไทยและอังกฤษ',
    metric: 'ระบบอัจฉริยะพิธีกรรมแบบเรียลไทม์',
    Icon: IconBrain,
  },
  {
    title: 'Magic UI Workspace',
    description:
      'ศูนย์ควบคุมพรีเมียมพร้อมระบบซิงค์ไทม์ไลน์ งานที่ตรวจสอบโดย AI และการชำระแบบ Escrow ผู้มีส่วนเกี่ยวข้องทำงานร่วมกันอย่างชัดเจน ขณะที่ Phithiai คอยติดตามทุกรายการ',
    metric: 'ประสบการณ์การทำงานที่ลงตัวในแดชบอร์ดเดียว',
    Icon: IconCalendarCog,
  },
  {
    title: 'กิลด์ช่างฝีมือมรดก',
    description:
      'เครือข่ายส่วนตัวของอาเทลิเยร์ สถาปนิกดอกไม้ ผู้กำกับดนตรี และนักสร้างสรรค์อาหาร ที่คัดสรรมาเพื่อความเป็นเลิศด้านมรดกและรสนิยมร่วมสมัย',
    metric: 'อัตราการคัดเลือก 8%',
    Icon: IconCrown,
  },
];

export const SignatureExperience = () => (
  <section id="experiences" className="container space-y-14 py-24">
    <div className="mx-auto max-w-3xl space-y-6 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-200/80">ประสบการณ์เฉพาะทาง</p>
      <h2 className="font-display text-4xl text-ivory md:text-5xl thai-heading-md">
        มรดกไทย จัดการด้วยปัญญาประดิษฐ์ที่คู่ควรกับงานฉลองของคุณ
      </h2>
      <p className="text-lg text-ivory/70">
        จากพิธีสงฆ์ยามเช้าถึงงานเลี้ยงใต้แสงระยิบ เราหลอมรวมทีมงานระดับตำนานกับ AI ที่เข้าใจทุกธรรมเนียม
        ให้ทุกช่วงเวลาละเมียดไม่สะดุด
      </p>
    </div>
    <div className="grid gap-8 md:grid-cols-3">
      {highlights.map(({ title, description, metric, Icon }) => (
        <GlassCard key={title} className="relative min-h-[260px] overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-emerald blur-3xl" />
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-brand-200">
              <Icon size={16} className="text-brand-200" />
              {metric}
            </div>
            <h3 className="text-2xl font-semibold text-ivory">{title}</h3>
            <p className="text-ivory/70">{description}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  </section>
);
