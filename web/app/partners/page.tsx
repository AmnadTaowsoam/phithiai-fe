'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Shield, 
  FileText, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
  MessageSquare,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Award,
  Target,
  Zap
} from 'lucide-react';

export default function PartnersPage() {
  const partnerFeatures = [
    {
      icon: Building2,
      title: 'สมัครเป็นพาร์ทเนอร์',
      description: 'เข้าร่วมเครือข่ายพาร์ทเนอร์ของ Phithiai และรับลูกค้าคุณภาพ',
      features: [
        'ตรวจสอบคุณสมบัติอัตโนมัติ',
        'อนุมัติภายใน 24 ชั่วโมง',
        'การฝึกอบรมฟรี',
        'เครื่องมือจัดการครบครัน'
      ],
      buttonText: 'สมัครเลย',
      href: '/vendor-compliance',
      color: 'blue'
    },
    {
      icon: BarChart3,
      title: 'แดชบอร์ดพาร์ทเนอร์',
      description: 'จัดการธุรกิจของคุณอย่างมีประสิทธิภาพด้วยแดชบอร์ดที่ครบครัน',
      features: [
        'สถิติการจองแบบเรียลไทม์',
        'จัดการโปรไฟล์และผลงาน',
        'ติดตามการชำระเงิน',
        'รายงานรายได้รายเดือน'
      ],
      buttonText: 'เข้าสู่แดชบอร์ด',
      href: '/vendor-dashboard',
      color: 'green'
    },
    {
      icon: DollarSign,
      title: 'ค่าธรรมเนียมและเงิน',
      description: 'เข้าใจค่าธรรมเนียมและระบบการชำระเงินอย่างชัดเจน',
      features: [
        'ค่าธรรมเนียม 10% ต่อการจอง',
        'ชำระเงินทุกสัปดาห์',
        'ไม่มีค่าธรรมเนียมซ่อนเร้น',
        'ระบบ Escrow ปลอดภัย'
      ],
      buttonText: 'ดูรายละเอียด',
      href: '/fees',
      color: 'amber'
    },
    {
      icon: Shield,
      title: 'ระบบ Escrow',
      description: 'เงินของคุณปลอดภัยด้วยระบบ Escrow ที่ธนาคารกสิกรไทย',
      features: [
        'เงินถูกเก็บแยกต่างหาก',
        'ตรวจสอบได้ตลอดเวลา',
        'คุ้มครองโดยกฎหมาย',
        'โอนเงินหลังงานเสร็จ'
      ],
      buttonText: 'เรียนรู้เพิ่มเติม',
      href: '/escrow',
      color: 'purple'
    },
    {
      icon: FileText,
      title: 'จัดการใบเสนอราคา',
      description: 'สร้างและจัดการใบเสนอราคาให้ลูกค้าอย่างมืออาชีพ',
      features: [
        'เทมเพลตใบเสนอราคา',
        'ติดตามสถานะ',
        'ส่งอัตโนมัติ',
        'เก็บประวัติการเสนอราคา'
      ],
      buttonText: 'จัดการใบเสนอราคา',
      href: '/quote',
      color: 'indigo'
    },
    {
      icon: Users,
      title: 'จัดการลูกค้า',
      description: 'ติดต่อและจัดการลูกค้าผ่านระบบแชทและติดตาม',
      features: [
        'แชทกับลูกค้าแบบเรียลไทม์',
        'ติดตามสถานะการจอง',
        'ประวัติลูกค้า',
        'การแจ้งเตือนอัตโนมัติ'
      ],
      buttonText: 'จัดการลูกค้า',
      href: '/inquiry',
      color: 'pink'
    }
  ];

  const quickActions = [
    {
      icon: Plus,
      title: 'เพิ่มผลงานใหม่',
      description: 'อัปโหลดผลงานและรูปภาพใหม่',
      href: '/vendor-dashboard?tab=portfolio'
    },
    {
      icon: Calendar,
      title: 'จัดการตารางงาน',
      description: 'ดูและจัดการตารางงานของคุณ',
      href: '/vendor-dashboard?tab=calendar'
    },
    {
      icon: MessageSquare,
      title: 'ข้อความใหม่',
      description: 'ตอบกลับลูกค้าและจัดการข้อความ',
      href: '/inquiry'
    },
    {
      icon: Download,
      title: 'ดาวน์โหลดรายงาน',
      description: 'ดาวน์โหลดรายงานรายได้และสถิติ',
      href: '/vendor-dashboard?tab=reports'
    }
  ];

  const stats = [
    { label: 'พาร์ทเนอร์ทั้งหมด', value: '1,200+', icon: Users },
    { label: 'การจองต่อเดือน', value: '5,000+', icon: Calendar },
    { label: 'คะแนนเฉลี่ย', value: '4.8/5', icon: Star },
    { label: 'รายได้รวม', value: '฿50M+', icon: TrendingUp }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      amber: 'bg-amber-50 border-amber-200 text-amber-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            สำหรับพาร์ทเนอร์
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-gray-800 mb-6 thai-heading">
            ศูนย์กลางพาร์ทเนอร์
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            เครื่องมือและทรัพยากรที่คุณต้องการเพื่อสร้างธุรกิจที่ประสบความสำเร็จบน Phithiai
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">การดำเนินการด่วน</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <action.icon className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ฟีเจอร์หลัก</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-lg ${getColorClasses(feature.color)}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-800">{feature.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    as="a" 
                    href={feature.href}
                    className="w-full"
                    variant="outline"
                  >
                    {feature.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardContent className="p-8 text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">ต้องการความช่วยเหลือ?</h3>
            <p className="text-lg mb-6 opacity-90">
              ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" as="a" href="/help">
                <HelpCircle className="w-4 h-4 mr-2" />
                ศูนย์ช่วยเหลือ
              </Button>
              <Button variant="secondary" as="a" href="/contact">
                <MessageSquare className="w-4 h-4 mr-2" />
                ติดต่อเรา
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
