import React from 'react';
import { Shield, Lock, Award, CheckCircle, FileText, Users } from 'lucide-react';

export const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: 'ระบบ Escrow',
      subtitle: 'ธนาคารกสิกรไทย',
      color: 'blue'
    },
    {
      icon: Lock,
      title: 'PCI DSS Level 1',
      subtitle: 'ความปลอดภัยข้อมูล',
      color: 'green'
    },
    {
      icon: CheckCircle,
      title: 'PDPA Certified',
      subtitle: 'คุ้มครองข้อมูลส่วนบุคคล',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Verified Partners',
      subtitle: 'ตรวจสอบ 48 ข้อ',
      color: 'amber'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    amber: 'from-amber-500 to-amber-600'
  };

  return (
    <div className="py-8 bg-ivory/5 border-y border-ivory/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">
            ความปลอดภัยและความน่าเชื่อถือ
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-ivory/10 rounded-xl p-4 text-center hover:bg-white/10 transition"
            >
              <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${colorClasses[badge.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center`}>
                <badge.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-ivory mb-1">{badge.title}</p>
              <p className="text-xs text-ivory/60">{badge.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a
            href="/trust"
            className="text-xs text-brand-200 hover:text-brand-100 transition inline-flex items-center gap-1"
          >
            ดูข้อมูลความปลอดภัยทั้งหมด
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const CompanyInfo = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-ivory/10 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <FileText className="w-10 h-10 text-amber-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-ivory mb-2">
            ข้อมูลบริษัทจดทะเบียน
          </h3>
          <div className="space-y-1 text-sm text-ivory/70">
            <p><strong className="text-ivory">บริษัท มาลัย แพลตฟอร์ม จำกัด</strong></p>
            <p>เลขทะเบียน: 0105566012345</p>
            <p>Tax ID: 0105566012345</p>
            <p className="text-xs mt-2">
              <a href="/trust" className="text-brand-200 hover:underline">
                ตรวจสอบที่กรมพัฒนาธุรกิจการค้า →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SecurityBadge = ({ variant = 'default' }: { variant?: 'default' | 'compact' }) => {
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-800 rounded-full text-xs font-semibold">
        <Lock className="w-3 h-3" />
        <span>ปลอดภัย 100%</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
      <div className="flex items-center gap-3">
        <Lock className="w-8 h-8" />
        <div>
          <p className="font-semibold">การชำระเงินปลอดภัย 100%</p>
          <p className="text-xs opacity-90">เข้ารหัส SSL/TLS 256-bit · PCI DSS Level 1</p>
        </div>
      </div>
    </div>
  );
};

export const EscrowBadge = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <Shield className="w-10 h-10 text-blue-600 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-blue-900 mb-1">
            🔒 คุ้มครองด้วยระบบ Escrow
          </h4>
          <p className="text-sm text-blue-800">
            เงินของคุณจะถูกเก็บไว้อย่างปลอดภัยที่ธนาคารกสิกรไทย 
            และจะถูกปลดให้พาร์ทเนอร์เมื่อบริการเสร็จสมบูรณ์เท่านั้น
          </p>
          <a href="/fees" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
            เรียนรู้เพิ่มเติม →
          </a>
        </div>
      </div>
    </div>
  );
};

export const VerifiedPartnerBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-semibold shadow-lg">
      <CheckCircle className="w-4 h-4" />
      <span>พาร์ทเนอร์ตรวจสอบแล้ว</span>
    </div>
  );
};

export const CustomerSupportBadge = () => {
  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-3">
      <div className="flex items-center gap-2 text-sm">
        <Users className="w-5 h-5 text-red-600" />
        <div>
          <p className="font-semibold text-red-900">ทีมช่วยเหลือ 24/7</p>
          <p className="text-xs text-red-700">โทร: +66 2 123 4567 · LINE: @malAI</p>
        </div>
      </div>
    </div>
  );
};

