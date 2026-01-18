'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Send, Download, Copy, QrCode, Users, Calendar, MapPin, Clock } from 'lucide-react';

interface Invitation {
  id: string;
  title: string;
  eventType: string;
  date: string;
  time: string;
  venue: string;
  template: string;
  status: 'draft' | 'sent' | 'active';
  sentCount: number;
  confirmedCount: number;
  declinedCount: number;
  viewCount: number;
  shareLink: string;
}

export default function InvitationPage() {
  const [invitations] = useState<Invitation[]>([
    {
      id: 'inv_1',
      title: 'งานแต่งงาน สมชาย & สมหญิง',
      eventType: 'งานแต่งงาน',
      date: '2025-06-15',
      time: '18:00',
      venue: 'โรงแรมแชงกรี-ลา กรุงเทพฯ',
      template: 'elegant_gold',
      status: 'sent',
      sentCount: 150,
      confirmedCount: 120,
      declinedCount: 15,
      viewCount: 145,
      shareLink: 'https://malai.app/i/abc123'
    }
  ]);

  const templates = [
    {
      id: 'elegant_gold',
      name: 'Elegant Gold',
      preview: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
      category: 'งานแต่ง'
    },
    {
      id: 'lanna_style',
      name: 'Lanna Style',
      preview: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=400&q=80',
      category: 'ล้านนา'
    },
    {
      id: 'modern_minimal',
      name: 'Modern Minimal',
      preview: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80',
      category: 'สมัยใหม่'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts: { [key: string]: string } = {
      draft: 'ร่าง',
      sent: 'ส่งแล้ว',
      active: 'กำลังใช้งาน'
    };
    return texts[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4 thai-heading">
            การ์ดเชิญดิจิทัล
          </h1>
          <p className="text-lg text-ivory/80">
            สร้างและส่งการ์ดเชิญสวยงามให้แขกของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Existing Invitations */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>การ์ดเชิญของฉัน</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    สร้างการ์ดใหม่
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {invitations.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-ivory/70 mb-4">ยังไม่มีการ์ดเชิญ</p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      สร้างการ์ดแรกของคุณ
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {invitations.map((invitation) => (
                      <div key={invitation.id} className="border rounded-lg p-6 hover:bg-amber-50">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-ivory mb-2">{invitation.title}</h3>
                            <div className="flex flex-wrap gap-2 text-sm text-ivory/70">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(invitation.date).toLocaleDateString('th-TH')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {invitation.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {invitation.venue}
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(invitation.status)}>
                            {getStatusText(invitation.status)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Send className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                            <p className="text-sm font-semibold text-ivory">{invitation.sentCount}</p>
                            <p className="text-xs text-ivory/70">ส่งแล้ว</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <Users className="w-5 h-5 mx-auto text-green-600 mb-1" />
                            <p className="text-sm font-semibold text-ivory">{invitation.confirmedCount}</p>
                            <p className="text-xs text-ivory/70">ยืนยัน</p>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <Users className="w-5 h-5 mx-auto text-red-600 mb-1" />
                            <p className="text-sm font-semibold text-ivory">{invitation.declinedCount}</p>
                            <p className="text-xs text-ivory/70">ปฏิเสธ</p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <Eye className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                            <p className="text-sm font-semibold text-ivory">{invitation.viewCount}</p>
                            <p className="text-xs text-ivory/70">เปิดดู</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <input
                            type="text"
                            value={invitation.shareLink}
                            readOnly
                            className="flex-1 px-3 py-2 border rounded-md bg-gray-50 text-sm"
                          />
                          <Button variant="outline" className="px-3 py-2">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" className="px-3 py-2">
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            ดูตัวอย่าง
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            แก้ไข
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Send className="w-4 h-4 mr-2" />
                            ส่งเพิ่ม
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            ดาวน์โหลด
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Templates */}
            <Card>
              <CardHeader>
                <CardTitle>เทมเพลตการ์ดเชิญ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div key={template.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-ivory mb-1">{template.name}</h4>
                        <p className="text-sm text-ivory/70 mb-3">{template.category}</p>
                        <Button variant="outline" className="w-full px-3 py-2 text-sm">
                          ใช้เทมเพลตนี้
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>คุณสมบัติ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ivory text-sm">ติดตาม RSVP</h4>
                    <p className="text-xs text-ivory/70">ดูว่าใครยืนยันมา/ไม่มา</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ivory text-sm">QR Check-in</h4>
                    <p className="text-xs text-ivory/70">สแกน QR เมื่อมาถึงงาน</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Send className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ivory text-sm">ส่งหลายช่องทาง</h4>
                    <p className="text-xs text-ivory/70">LINE, Email, SMS, Link</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ivory text-sm">Analytics</h4>
                    <p className="text-xs text-ivory/70">ดูสถิติการเปิดและตอบกลับ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>วิธีใช้งาน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-ivory/80">
                <div>
                  <p className="font-semibold text-ivory mb-1">1. เลือกเทมเพลต</p>
                  <p className="text-xs">เลือกจากเทมเพลตสวยๆ ที่เราเตรียมไว้</p>
                </div>
                <div>
                  <p className="font-semibold text-ivory mb-1">2. กรอกข้อมูล</p>
                  <p className="text-xs">ใส่รายละเอียดงานของคุณ</p>
                </div>
                <div>
                  <p className="font-semibold text-ivory mb-1">3. ส่งการ์ด</p>
                  <p className="text-xs">ส่งผ่าน LINE, Email หรือแชร์ลิงก์</p>
                </div>
                <div>
                  <p className="font-semibold text-ivory mb-1">4. ติดตามผล</p>
                  <p className="text-xs">ดูว่าใครเปิดดูและยืนยันมาแล้ว</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


