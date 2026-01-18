'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Filter, Search, File, FileCheck, FileX, Calendar } from 'lucide-react';

interface Document {
  id: string;
  type: 'quote' | 'contract' | 'invoice' | 'receipt' | 'tax_invoice';
  title: string;
  vendorName: string;
  amount: number;
  date: string;
  status: 'draft' | 'sent' | 'signed' | 'paid';
  fileUrl: string;
}

export default function DocumentsPage() {
  const [documents] = useState<Document[]>([
    {
      id: 'doc_1',
      type: 'quote',
      title: 'ใบเสนอราคา - แพ็กถ่ายภาพ Premium',
      vendorName: 'Dream Wedding Studio',
      amount: 30000,
      date: '2025-01-10',
      status: 'sent',
      fileUrl: '#'
    },
    {
      id: 'doc_2',
      type: 'contract',
      title: 'สัญญาจ้างบริการถ่ายภาพ',
      vendorName: 'Dream Wedding Studio',
      amount: 30000,
      date: '2025-01-12',
      status: 'signed',
      fileUrl: '#'
    },
    {
      id: 'doc_3',
      type: 'invoice',
      title: 'ใบแจ้งหนี้ - งวดที่ 1',
      vendorName: 'Dream Wedding Studio',
      amount: 9000,
      date: '2025-01-15',
      status: 'paid',
      fileUrl: '#'
    }
  ]);

  const getTypeText = (type: string) => {
    const types: { [key: string]: string } = {
      quote: 'ใบเสนอราคา',
      contract: 'สัญญา',
      invoice: 'ใบแจ้งหนี้',
      receipt: 'ใบเสร็จ',
      tax_invoice: 'ใบกำกับภาษี'
    };
    return types[type] || type;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      signed: 'bg-green-100 text-green-800',
      paid: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts: { [key: string]: string } = {
      draft: 'ร่าง',
      sent: 'ส่งแล้ว',
      signed: 'ลงนามแล้ว',
      paid: 'ชำระแล้ว'
    };
    return texts[status] || status;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return <File className="w-5 h-5 text-blue-600" />;
      case 'contract':
        return <FileCheck className="w-5 h-5 text-green-600" />;
      case 'invoice':
      case 'receipt':
      case 'tax_invoice':
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <FileX className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4 thai-heading">
            ศูนย์รวมเอกสาร
          </h1>
          <p className="text-lg text-ivory/80">
            จัดการเอกสารทั้งหมดในที่เดียว
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>เอกสารของฉัน</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" className="px-4 py-2 text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  กรอง
                </Button>
                <Button variant="outline" className="px-4 py-2 text-sm">
                  <Search className="w-4 h-4 mr-2" />
                  ค้นหา
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4 hover:bg-amber-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(doc.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-ivory">{doc.title}</h3>
                          <Badge className={getStatusColor(doc.status)}>
                            {getStatusText(doc.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-ivory/70 mb-1">{doc.vendorName}</p>
                        <div className="flex items-center gap-4 text-sm text-ivory/70">
                          <span>ประเภท: {getTypeText(doc.type)}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(doc.date).toLocaleDateString('th-TH')}
                          </span>
                          <span className="font-semibold text-ivory">
                            {doc.amount.toLocaleString()} บาท
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="px-3 py-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="px-3 py-2">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


