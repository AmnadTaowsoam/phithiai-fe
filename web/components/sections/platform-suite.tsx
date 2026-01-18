import {
  IconCalendarStats,
  IconChecklist,
  IconDeviceAnalytics,
  IconMessageChatbot,
} from '@tabler/icons-react';
import { GlassCard } from '@/components/ui/glass-card';

const modules = [
  {
    Icon: IconMessageChatbot,
    title: 'Malai Copilot™',
    description:
      'นักออกแบบพิธี AI แบบสนทนา พร้อมรองรับภาษาไทยและอังกฤษ ระบบเลือกวันมงคล และสคริปต์ที่สอดคล้องกับวัฒนธรรม',
    outcomes: ['คำแนะนำวันมงคล', 'พิธีกรรมส่วนตัว', 'การปกป้องวัฒนธรรม'],
  },
  {
    Icon: IconCalendarStats,
    title: 'Magic UI Timeline',
    description:
      'ไทม์ไลน์หลายงานที่ปรับตัวตามการเดินทาง สภาพอากาศ และสัญญาณจากพาร์ทเนอร์ การเปลี่ยนแปลงทั้งหมดซิงค์ทันทีกับทุกฝ่าย',
    outcomes: ['ระบบอัตโนมัติเส้นทางแขก', 'ตรวจสุขภาพขั้นตอน', 'จ่ายเงินผ่าน Escrow'],
  },
  {
    Icon: IconChecklist,
    title: 'คอนโซลพาร์ทเนอร์คอนเซียร์จ',
    description: 'เจรจา อนุมัติ และติดตามงานส่งมอบในพื้นที่ปลอดภัยที่ตรวจสอบโดยผู้ตรวจสอบคุณภาพ malAI',
    outcomes: ['ห้องเก็บสัญญา', 'ตรวจสอบคุณภาพขั้นตอน', 'ความพร้อมแบบสด'],
  },
  {
    Icon: IconDeviceAnalytics,
    title: 'การวิเคราะห์อารมณ์',
    description:
      'แดชบอร์ดความรู้สึกแบบเรียลไทม์ รวมคำติชมจากแขก ผลงานพาร์ทเนอร์ และการติดตามความสอดคล้องของพิธีกรรม',
    outcomes: ['คะแนนความพึงพอใจ', 'แผนแก้ไขปัญหา', 'การเล่าเรื่องหลังงาน'],
  },
];

export const PlatformSuite = () => (
  <section id="platform" className="container space-y-14 py-24">
    <div className="mx-auto max-w-3xl space-y-6 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-200/80">ชุดแพลตฟอร์ม malAI</p>
      <h2 className="font-display text-4xl text-ivory md:text-5xl thai-heading-md">
        สแต็กออเคสเตรชันระดับพรีเมียม สร้างสำหรับพิธีสำคัญ
      </h2>
      <p className="text-lg text-ivory/70">
        ทุกโมดูลถูกสร้างสรรค์สำหรับนักวางแผนที่ต้องการความลึกซึ้งทางวัฒนธรรม ความเป็นเลิศในการดำเนินการ และความสงบที่วัดผลได้
      </p>
    </div>
    <div className="grid gap-8 md:grid-cols-2">
      {modules.map(({ Icon, title, description, outcomes }) => (
        <GlassCard key={title} className="flex h-full flex-col gap-6 border border-brand-500/25 bg-background/85">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-500/40 bg-brand-500/10 text-brand-200">
              <Icon size={22} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ivory">{title}</h3>
              <p className="text-sm text-ivory/65">{description}</p>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-ivory/70">
            {outcomes.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-brand-300" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      ))}
    </div>
  </section>
);
