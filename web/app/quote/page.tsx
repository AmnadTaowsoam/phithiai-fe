'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Send, Eye, Edit, Check, X, Clock, DollarSign, Calendar, User } from 'lucide-react';

interface Quote {
  id: string;
  vendorName: string;
  eventType: string;
  eventDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  expiresAt: string;
  items: { name: string; quantity: number; price: number }[];
}

export default function QuotePage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [quotes] = useState<Quote[]>([
    {
      id: 'quote_1',
      vendorName: 'Maison Lanna Collective',
      eventType: 'งานแต่งงาน',
      eventDate: '2025-06-15',
      amount: 185000,
      status: 'sent',
      createdAt: '2025-01-10',
      expiresAt: '2025-01-25',
      items: [
        { name: 'การจัดดอกไม้หลัก', quantity: 1, price: 85000 },
        { name: 'การตกแต่งโต๊ะอาหาร', quantity: 15, price: 5000 },
        { name: 'ค่าติดตั้งและรื้อถอน', quantity: 1, price: 25000 }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      viewed: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts: { [key: string]: string } = {
      draft: 'ร่าง',
      sent: 'ส่งแล้ว',
      viewed: 'อ่านแล้ว',
      accepted: 'ยอมรับ',
      rejected: 'ปฏิเสธ',
      expired: 'หมดอายุ'
    };
    return texts[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Contract Disclaimer */}
        {showDisclaimer && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-600 p-4 rounded-lg relative max-w-4xl mx-auto">
            <button
              onClick={() => setShowDisclaimer(false)}
              className="absolute top-2 right-2 text-amber-600 hover:text-amber-800"
            >
              ✕
            </button>
            <p className="text-sm text-amber-800 pr-6">
              <strong>📝 ข้อควรทราบ:</strong> สัญญาการให้บริการเกิดขึ้นระหว่าง<strong>คุณ</strong>กับ<strong>พาร์ทเนอร์</strong>โดยตรง 
              malAI เป็นเพียงแพลตฟอร์มอำนวยความสะดวกและรักษาเงินค่ำประกัน กรุณาอ่านข้อกำหนดในสัญญาอย่างละเอียดก่อนลงนาม 
              <a href="/disclaimer" className="underline ml-1">อ่านข้อจำกัดความรับผิด</a>
            </p>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4 thai-heading">
            ใบเสนอราคาและสัญญา
          </h1>
          <p className="text-lg text-ivory/80">จัดการใบเสนอราคาและสัญญาของคุณ</p>
        </div>

        <div className="grid gap-6">
          {quotes.map((quote) => (
            <Card key={quote.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{quote.vendorName}</CardTitle>
                    <p className="text-sm text-ivory/70">{quote.eventType}</p>
                  </div>
                  <Badge className={getStatusColor(quote.status)}>
                    {getStatusText(quote.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-ivory/70">วันที่จัดงาน</p>
                      <p className="font-medium text-ivory">{new Date(quote.eventDate).toLocaleDateString('th-TH')}</p>
                    </div>
                    <div>
                      <p className="text-ivory/70">ยอดรวม</p>
                      <p className="font-medium text-ivory text-xl">{quote.amount.toLocaleString()} บาท</p>
                    </div>
                    <div>
                      <p className="text-ivory/70">หมดอายุ</p>
                      <p className="font-medium text-ivory">{new Date(quote.expiresAt).toLocaleDateString('th-TH')}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-ivory mb-3">รายการ</h4>
                    {quote.items.map((item, i) => (
                      <div key={i} className="flex justify-between py-2 text-sm">
                        <span className="text-ivory/80">{item.name} x {item.quantity}</span>
                        <span className="font-medium text-ivory">{item.price.toLocaleString()} บาท</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button className="flex-1"><Eye className="w-4 h-4 mr-2" />ดูรายละเอียด</Button>
                    <Button variant="outline"><Download className="w-4 h-4 mr-2" />ดาวน์โหลด</Button>
                    {quote.status === 'sent' && (
                      <>
                        <Button className="bg-green-600"><Check className="w-4 h-4 mr-2" />ยอมรับ</Button>
                        <Button variant="outline"><X className="w-4 h-4 mr-2" />ปฏิเสธ</Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

