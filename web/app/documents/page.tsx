'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Download,
  Eye,
  Filter,
  Search,
  Trash2,
  Calendar,
} from 'lucide-react';
import { DocumentsAPI, type Document } from '@/lib/api/documents';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  // Load documents from API
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const docs = await DocumentsAPI.getMyDocuments(undefined, token);
          setDocuments(docs);
        }
      } catch (error) {
        console.error('Failed to load documents:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.vendorName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: documents.length,
    byType: {
      quote: documents.filter(d => d.type === 'quote').length,
      contract: documents.filter(d => d.type === 'contract').length,
      invoice: documents.filter(d => d.type === 'invoice').length,
      receipt: documents.filter(d => d.type === 'receipt').length,
      tax_invoice: documents.filter(d => d.type === 'tax_invoice').length,
    },
    byStatus: {
      draft: documents.filter(d => d.status === 'draft').length,
      sent: documents.filter(d => d.status === 'sent').length,
      signed: documents.filter(d => d.status === 'signed').length,
      paid: documents.filter(d => d.status === 'paid').length,
      cancelled: documents.filter(d => d.status === 'cancelled').length,
    },
  };

  const handleDownload = async (doc: Document) => {
    try {
      const token = localStorage.getItem('access_token');
      const blob = await DocumentsAPI.downloadDocument(doc.id, token);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc.type}-${doc.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download document:', error);
      alert('Failed to download document. Please try again.');
    }
  };

  const handleDelete = async (doc: Document) => {
    if (confirm(`Are you sure you want to delete "${doc.title}"?`)) {
      try {
        const token = localStorage.getItem('access_token');
        await DocumentsAPI.deleteDocument(doc.id, token);
        setDocuments(prev => prev.filter(d => d.id !== doc.id));
      } catch (error) {
        console.error('Failed to delete document:', error);
        alert('Failed to delete document. Please try again.');
      }
    }
  };

  const getTypeText = (type: string) => {
    const types: { [key: string]: string } = {
      quote: 'ใบเสนอราคา',
      contract: 'สัญญา',
      invoice: 'ใบแจ้งหนี้',
      receipt: 'ใบเสร็จ',
      tax_invoice: 'ใบกำกับภาษี',
    };
    return types[type] || type;
  };

  const getStatusColor = (status: string) => {
    const colors: {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      signed: 'bg-green-100 text-green-800',
      paid: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts: { [key: string]: string } = {
      draft: 'ร่าง',
      sent: 'ส่งแล้ว',
      signed: 'ลงนามแล้ว',
      paid: 'ชำระแล้ว',
      cancelled: 'ยกเลิก',
    };
    return texts[status] || status;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'contract':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'invoice':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'receipt':
        return <FileText className="w-5 h-5 text-amber-600" />;
      case 'tax_invoice':
        return <FileText className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4 thai-heading">
            ศูนยรวมเอกสาร
          </h1>
          <p className="text-lg text-ivory/80">
            จัดการและเอกสารทั้งหมดในที่เดียว
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card className="border-ivory/10 bg-background/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-brand-500/20 p-2">
                  <FileText className="h-6 w-6 text-brand-200" />
                </div>
                <div>
                  <p className="text-sm text-ivory/60">เอกสารทั้งหมด</p>
                  <p className="text-2xl font-semibold text-ivory">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-ivory/10 bg-background/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/20 p-2">
                  <FileText className="h-6 w-6 text-blue-200" />
                </div>
                <div>
                  <p className="text-sm text-ivory/60">ใบเสนอราคา</p>
                  <p className="text-2xl font-semibold text-blue-200">{stats.byType.quote}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-ivory/10 bg-background/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-500/20 p-2">
                  <FileText className="h-6 w-6 text-green-200" />
                </div>
                <div>
                  <p className="text-sm text-ivory/60">สัญญา</p>
                  <p className="text-2xl font-semibold text-green-200">{stats.byType.contract}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-ivory/10 bg-background/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-500/20 p-2">
                  <FileText className="h-6 w-6 text-purple-200" />
                </div>
                <div>
                  <p className="text-sm text-ivory/60">ใบแจ้งหนี้</p>
                  <p className="text-2xl font-semibold text-purple-200">{stats.byType.invoice}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-ivory/10 bg-background/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-500/20 p-2">
                  <FileText className="h-6 w-6 text-amber-200" />
                </div>
                <div>
                  <p className="text-sm text-ivory/60">ใบเสร็จ</p>
                  <p className="text-2xl font-semibold text-amber-200">{stats.byType.receipt}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-ivory/10 bg-background/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-500/20 p-2">
                  <FileText className="h-6 w-6 text-red-200" />
                </div>
                <div>
                  <p className="text-sm text-ivory/60">ใบกำกับภาษี</p>
                  <p className="text-2xl font-semibold text-red-200">{stats.byType.tax_invoice}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
                <Input
                  type="text"
                  placeholder="ค้นหาเอกสาร..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-ivory/15 bg-background/70 text-ivory rounded-lg focus:border-brand-500/40 focus:outline-none"
                >
                  <option value="all">ทุกประเภท</option>
                  <option value="quote">ใบเสนอราคา</option>
                  <option value="contract">สัญญา</option>
                  <option value="invoice">ใบแจ้งหนี้</option>
                  <option value="receipt">ใบเสร็จ</option>
                  <option value="tax_invoice">ใบกำกับภาษี</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-ivory/15 bg-background/70 text-ivory rounded-lg focus:border-brand-500/40 focus:outline-none"
                >
                  <option value="all">ทุกสถานะ</option>
                  <option value="draft">ร่าง</option>
                  <option value="sent">ส่งแล้ว</option>
                  <option value="signed">ลงนามแล้ว</option>
                  <option value="paid">ชำระแล้ว</option>
                  <option value="cancelled">ยกเลิก</option>
                </select>
              </div>

              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                ตั้งค่า
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card className="border-ivory/10 bg-background/60">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>เอกสารของฉัน</span>
              <span className="text-sm text-ivory/60">{filteredDocuments.length} เอกสาร</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-16 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
                <p className="text-ivory/60">กำลังโหลด...</p>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="py-16 text-center">
                <FileText className="mx-auto mb-4 h-16 w-16 text-ivory/20" />
                <p className="text-ivory/60">ไม่พบเอกสาร</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start justify-between rounded-lg border border-ivory/10 bg-background/70 p-4 hover:bg-ivory/5 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-ivory/5 rounded-lg flex items-center justify-center">
                        {getTypeIcon(doc.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-ivory">{doc.title}</h3>
                          <Badge className={getStatusColor(doc.status)}>
                            {getStatusText(doc.status)}
                          </Badge>
                        </div>
                        </div>
                        <p className="text-sm text-ivory/60">{doc.vendorName}</p>
                        <div className="flex items-center gap-4 text-sm text-ivory/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(doc.date).toLocaleDateString('th-TH', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          {doc.amount && (
                            <span className="font-semibold text-ivory">
                              {new Intl.NumberFormat('th-TH', {
                                style: 'currency',
                                currency: doc.currency || 'THB',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(doc.amount)} บาท
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDoc(doc)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(doc)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(doc)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
