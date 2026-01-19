'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';

type ContentType = 'BLOG' | 'HELP_CENTER' | 'FAQ' | 'ANNOUNCEMENT';

type ContentItem = {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  excerpt: string;
  author: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

const sampleContent: ContentItem[] = [
  {
    id: 'cnt_001',
    title: 'วิธีการจองวอเตอร์สำหรับงานแต่งงาน',
    slug: 'how-to-book-vendor-wedding',
    type: 'HELP_CENTER',
    status: 'PUBLISHED',
    excerpt: 'คำแนะนำทีละขั้นตอนในการค้นหาและจองวอเตอร์สำหรับงานแต่งงานของคุณ',
    author: 'Admin',
    publishedAt: '2026-01-15T10:00:00Z',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'cnt_002',
    title: 'รู้จักกับพิธีไทย: งานบวชพระ',
    slug: 'thai-ceremony-ordination',
    type: 'BLOG',
    status: 'PUBLISHED',
    excerpt: 'เรียนรู้เกี่ยวกับประเพณีและความเชื่อในพิธีบวชพระ',
    author: 'Admin',
    publishedAt: '2026-01-12T10:00:00Z',
    createdAt: '2026-01-08T10:00:00Z',
    updatedAt: '2026-01-12T10:00:00Z',
  },
  {
    id: 'cnt_003',
    title: 'คำถามที่พบบ่อยเกี่ยวกับการชำระเงิน',
    slug: 'faq-payment',
    type: 'FAQ',
    status: 'PUBLISHED',
    excerpt: 'คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับระบบการชำระเงิน',
    author: 'Admin',
    publishedAt: '2026-01-10T10:00:00Z',
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'cnt_004',
    title: 'อัปเดตระบบใหม่: ฟีเจอร์การวางแผนด้วย AI',
    slug: 'new-ai-planning-feature',
    type: 'ANNOUNCEMENT',
    status: 'DRAFT',
    excerpt: 'แจ้งเตือนเกี่ยวกับฟีเจอร์ใหม่ที่จะเปิดตัวเร็วๆ นี้',
    author: 'Admin',
    createdAt: '2026-01-18T10:00:00Z',
    updatedAt: '2026-01-18T10:00:00Z',
  },
];

const typeLabels: Record<ContentType, string> = {
  BLOG: 'บทความ',
  HELP_CENTER: 'ศูนย์ช่วยเหลือ',
  FAQ: 'คำถามที่พบบ่อย',
  ANNOUNCEMENT: 'ประกาศ',
};

const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning'> = {
  DRAFT: 'secondary',
  PUBLISHED: 'success',
  ARCHIVED: 'default',
};

const statusLabels: Record<string, string> = {
  DRAFT: 'ร่าง',
  PUBLISHED: 'เผยแพร่แล้ว',
  ARCHIVED: 'เก็บถาวร',
};

export default function ContentManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ContentType | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [content, setContent] = useState<ContentItem[]>(sampleContent);

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'ALL' || item.type === filterType;
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handlePublish = (id: string) => {
    setContent((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: 'PUBLISHED' as const, publishedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const handleArchive = (id: string) => {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'ARCHIVED' as const } : item))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบเนื้อหานี้?')) {
      setContent((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="จัดการเนื้อหา"
        description="จัดการบทความ ศูนย์ช่วยเหลือ และประกาศ"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            เพิ่มเนื้อหาใหม่
          </Button>
        }
      />

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ค้นหาเนื้อหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ContentType | 'ALL')}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="ALL">ทุกประเภท</option>
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="ALL">ทุกสถานะ</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Content Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อเรื่อง</TableHead>
              <TableHead>ประเภท</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>ผู้เขียน</TableHead>
              <TableHead>วันที่เผยแพร่</TableHead>
              <TableHead>วันที่อัปเดต</TableHead>
              <TableHead className="text-right">การดำเนินการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-muted-foreground">ไม่พบเนื้อหา</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {item.excerpt}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{typeLabels[item.type]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[item.status]}>{statusLabels[item.status]}</Badge>
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>
                    {item.publishedAt ? formatDate(item.publishedAt, 'short') : '-'}
                  </TableCell>
                  <TableCell>{formatDate(item.updatedAt, 'short')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {item.status === 'DRAFT' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePublish(item.id)}
                          className="text-green-600"
                        >
                          เผยแพร่
                        </Button>
                      )}
                      {item.status === 'PUBLISHED' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleArchive(item.id)}
                        >
                          เก็บถาวร
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
