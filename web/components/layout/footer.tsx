import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLine,
  IconBrandLinkedin,
} from '@tabler/icons-react';

const social = [
  { Icon: IconBrandInstagram, label: 'Instagram', href: 'https://instagram.com/phithiai' },
  { Icon: IconBrandLine, label: 'LINE', href: 'https://line.me/R/ti/p/@phithiai' },
  { Icon: IconBrandFacebook, label: 'Facebook', href: 'https://facebook.com/phithiai' },
  { Icon: IconBrandLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/phithiai' },
];

export const Footer = () => (
  <footer id="contact" className="mt-24 border-t border-ivory/15 bg-background/95">
    <div className="container grid gap-12 py-16 md:grid-cols-[2fr,1fr] md:items-start">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">คอนเซียร์จคัดสรร</p>
        <h2 className="max-w-2xl text-3xl font-light leading-snug text-ivory md:text-4xl">
          ออกแบบพิธีไทยร่วมสมัย ที่เป็นเอกลักษณ์และเหนือกาลเวลา เฉพาะสำหรับคุณ
        </h2>
        <p className="max-w-xl text-ivory/65">
          จองเซสชันพบนักออกแบบพิธีของเรา หรือติดต่อผ่าน LINE @Phithiai ทีมงานพร้อมตอบภายใน 90 นาที
          ตั้งแต่ 09:00-21:00 น. ทุกวัน
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-ivory/70">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-surface/80 px-5 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-emerald" />
            คอนเซียร์จออนไลน์
          </span>
          <span>กรุงเทพฯ · เชียงใหม่ · ภูเก็ต</span>
        </div>
      </div>

      <div className="space-y-6 rounded-3xl border border-ivory/15 bg-surface/70 p-8 shadow-subtle backdrop-blur-xl">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">ติดต่อโดยตรง</p>
          <a
            href="mailto:hello@phithiai.com"
            className="text-lg font-medium text-ivory transition hover:text-brand-300"
          >
            hello@phithiai.com
          </a>
          <p className="text-sm text-ivory/60">LINE: @Phithiai · โทร: +66 2 123 4567</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {social.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 bg-background/70 text-ivory transition hover:border-brand-400/80 hover:text-brand-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
        <div className="rounded-2xl border border-brand-500/30 bg-gradient-card/70 p-4 text-xs text-ivory/70">
          <p className="font-semibold uppercase tracking-[0.35em] text-brand-300">รับรองโดย Phithiai</p>
          <p className="mt-2">
            คัดสรรพาร์ทเนอร์เพียง 8% · ชำระผ่าน Escrow ปลอดภัย · AI ช่วยควบคุมคุณภาพทุกขั้นตอน
          </p>
        </div>
      </div>
    </div>
    <div className="border-t border-ivory/10">
      {/* Platform Disclaimer */}
      <div className="container py-4 border-b border-ivory/10">
        <div className="text-center text-xs text-ivory/60 max-w-4xl mx-auto">
          <p>
            <strong>ข้อมูลสำคัญ:</strong> Phithiai เป็นแพลตฟอร์มเชื่อมต่อ (Marketplace) ที่ทำหน้าที่เป็นตัวกลางระหว่างลูกค้าและพาร์ทเนอร์ผู้ให้บริการ 
            เราไม่ได้เป็นผู้ให้บริการด้านพิธีกรรมหรือจัดเลี้ยงโดยตรง พาร์ทเนอร์แต่ละรายรับผิดชอบต่อการให้บริการของตนเอง 
            * <a href="/disclaimer" className="underline hover:text-ivory">อ่านข้อจำกัดความรับผิด</a> · 
            <a href="/pdpa" className="underline hover:text-ivory ml-1">PDPA</a> · 
            <a href="/vendor-compliance" className="underline hover:text-ivory ml-1">ข้อกำหนดพาร์ทเนอร์</a> · 
            <a href="/escrow" className="underline hover:text-ivory ml-1">ระบบ Escrow</a> · 
            <a href="/quality" className="underline hover:text-ivory ml-1">มาตรฐานคุณภาพ</a>
          </p>
        </div>
      </div>

      <div className="container flex flex-col gap-4 py-6 text-xs text-ivory/55 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Phithiai Platform สร้างสรรค์ที่กรุงเทพฯ ร่วมกับพาร์ทเนอร์ภาคเหนือและภาคใต้</p>
        <div className="flex flex-wrap gap-5">
          <a href="/privacy" className="transition hover:text-ivory">
            ความเป็นส่วนตัว
          </a>
          <a href="/terms" className="transition hover:text-ivory">
            ข้อกำหนด
          </a>
          <a href="/security" className="transition hover:text-ivory">
            ความปลอดภัย
          </a>
          <a href="/trust" className="transition hover:text-ivory">
            ความน่าเชื่อถือ
          </a>
          <a href="/fees" className="transition hover:text-ivory">
            ค่าธรรมเนียม
          </a>
          <a href="/about" className="transition hover:text-ivory">
            เกี่ยวกับเรา
          </a>
          <a href="/press" className="transition hover:text-ivory">
            ข่าวสาร
          </a>
          <a href="/brand" className="transition hover:text-ivory">
            แบรนด์
          </a>
        </div>
      </div>
    </div>
  </footer>
);
