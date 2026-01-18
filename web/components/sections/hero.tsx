'use client';

import {
  IconCalendarEvent,
  IconSparkles,
  IconStars,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Aurora } from '@/components/magic/aurora';
import { ShimmerCard } from '@/components/magic/shimmer-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const stats = [
  {
    label: 'แผนพิธีไทย',
    value: '120+',
    description: 'รูปแบบพิธีไทยและระหว่างศาสนา',
  },
  {
    label: 'คะแนนพาร์ทเนอร์',
    value: '4.9/5',
    description: 'คะแนนเฉลี่ยใน 11 จังหวัด',
  },
  {
    label: 'เวลาเสนอแผน',
    value: '72 ชม.',
    description: 'จากรับบรีฟถึงแผนเชิงโต้ตอบ',
  },
];

const timeline = [
  {
    title: 'พิธีสวดมนต์โดยพระสงฆ์',
    detail: 'วัดประยุรวงศาวาส เวลา 09:09 น.',
    tone: 'brand',
  },
  {
    title: 'ตกแต่งโต๊ะดอกบัว',
    detail: 'Maison Lanna Collective, เชียงใหม่',
    tone: 'emerald',
  },
  {
    title: 'ลองชุดผ้าไหม',
    detail: 'ชุดศรบรรณ์ พร้อมผ้าทองสุกแดง',
    tone: 'lotus',
  },
];

export const Hero = () => (
  <section className="relative isolate overflow-hidden pt-24">
    <Aurora className="absolute inset-0 -z-10 opacity-80" />
    <div className="container relative">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr,0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-8"
        >
          <Badge
            icon={<IconSparkles size={16} className="text-brand-200 drop-shadow" />}
            className="border-brand-500/40 bg-brand-500/10 text-ivory"
          >
            ระบบอัจฉริยะพิธีไทย
          </Badge>
          <h1 className="font-display text-4xl leading-relaxed text-ivory md:text-5xl lg:text-6xl thai-heading">
            สร้างสรรค์พิธีไทยสุดหรู ด้วยคอนเซียร์จ AI ที่เข้าใจทุกประเพณี
          </h1>
          <p className="max-w-xl text-lg text-ivory/70">
            Phithiai ผสานความเข้าใจวัฒนธรรมไทยกับข้อมูลพาร์ทเนอร์แบบเรียลไทม์ เพื่อออกแบบทุกพิธีกรรม จัดการพาร์ทเนอร์ 
            และดูแลประสบการณ์แขก ทุกข้อเสนอถูกสร้างโดยนักวางแผนมืออาชีพและความแม่นยำของ AI
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button as="a" href="/plan" icon={<IconStars size={18} />}>
              รับแผนพิธีของคุณ
            </Button>
            <Button as="a" href="/vendors" variant="secondary" icon={<IconCalendarEvent size={18} />}>
              สำรวจพาร์ทเนอร์พรีเมียม
            </Button>
          </div>
          <div className="grid gap-6 text-sm text-ivory/70 sm:grid-cols-3">
            {stats.map(({ label, value, description }) => (
              <div key={label} className="rounded-2xl border border-ivory/15 bg-surface/70 p-4 shadow-subtle">
                <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-ivory">{value}</p>
                <p className="mt-1">{description}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="relative"
        >
          <ShimmerCard className="rounded-[34px]">
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-ivory/60">
                <span>ขั้นตอนพิธี Phithiai</span>
                <span>กรุงเทพฯ & เชียงใหม่</span>
              </div>
              <div className="overflow-hidden rounded-3xl border border-ivory/15">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=80"
                  alt="Premium Thai ceremony design"
                  width={880}
                  height={1024}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="grid gap-4 rounded-3xl border border-brand-500/30 bg-background/90 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-500/50 bg-brand-500/10 text-sm font-semibold text-brand-200">
                    ai
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-ivory/70">
                      ไทม์ไลน์คอนเซียร์จ
                    </p>
                    <p className="text-xs text-ivory/50">สร้างโดย Phithiai Copilot</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-ivory/75">
                  {timeline.map(({ title, detail, tone }) => (
                    <div key={title} className="flex items-start gap-3">
                      <span
                        className={cn(
                          'mt-1 h-2.5 w-2.5 rounded-full shadow-emerald',
                          tone === 'brand' && 'bg-brand-300',
                          tone === 'emerald' && 'bg-emerald-500',
                          tone === 'lotus' && 'bg-lotus-500',
                        )}
                      />
                      <div>
                        <p className="font-medium text-ivory">{title}</p>
                        <p className="text-ivory/55">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/plan"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-brand-200 transition hover:text-brand-100"
                >
                  สร้างพิธีเฉพาะคุณ {'->'}
                </Link>
              </div>
            </div>
          </ShimmerCard>
        </motion.div>
      </div>
    </div>
  </section>
);
