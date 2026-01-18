'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconDownload, IconSparkles } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { ConsultationForm } from '@/components/sections/consultation-form';

export const BookingCTA = () => {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const lookbookUrl = process.env.NEXT_PUBLIC_LOOKBOOK_URL;
  const router = useRouter();

  const handleSuccess = () => {
    setOpen(false);
    setConfirmation('ทีม Concierge ได้รับข้อมูลของคุณแล้ว และจะติดต่อกลับภายใน 90 นาที (09:00-21:00 ICT).');
    setTimeout(() => setConfirmation(null), 8000);
  };

  const handleLookbook = () => {
    if (lookbookUrl) {
      window.open(lookbookUrl, '_blank', 'noopener');
    } else {
      router.push('/docs/lookbook');
    }
  };

  return (
    <section className="container relative overflow-hidden rounded-[44px] border border-brand-500/30 bg-gradient-card/90 px-10 py-16 shadow-glow md:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(255,182,193,0.25),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(80,200,120,0.25),transparent_45%)]" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-ivory/70">เริ่มต้นการเดินทางกับ Phithiai</p>
          <h2 className="font-display text-3xl text-ivory md:text-4xl">
            รับแผนพิธีและรายชื่อพาร์ทเนอร์ฟรี ภายใน 72 ชั่วโมง
          </h2>
          <p className="text-ivory/70">
            แชร์วิสัยทัศน์ จำนวนแขก และพิธีที่ต้องการ ทีม Ritual Designer จะผสานข้อมูลกับ Phithiai Copilot
            เพื่อคัดสรรไอเดีย วางไทม์ไลน์ และประเมินงบประมาณเบื้องต้นอย่างโปร่งใส
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setOpen(true)} icon={<IconSparkles size={18} />}>
            จองเซสชันคอนเซียร์จ
          </Button>
          <Button variant="ghost" onClick={handleLookbook} icon={<IconDownload size={18} />}>
            ดาวน์โหลดลุคบุ๊กซิกเนเจอร์
          </Button>
        </div>
      </div>
      {confirmation ? (
        <div className="relative mt-6 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-4 text-sm text-emerald-200">
          {confirmation}
        </div>
      ) : null}

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="จองเซสชันคอนเซียร์จ"
        description="ให้รายละเอียดเล็กน้อย ทีมคอนเซียร์จจะคัดสรรแผนพิธีเบื้องต้นให้คุณ"
      >
        <ConsultationForm onSuccess={handleSuccess} />
      </Modal>
    </section>
  );
};
