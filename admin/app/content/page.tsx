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
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useContent, ContentItem } from '@/hooks/use-content';

const typeLabels: Record<string, string> = {
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
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    slug: '',
    type: 'BLOG' as const,
    excerpt: '',
  });

  const { content, loading, error, publishContent, archiveContent, deleteContent, createContent } =
    useContent(searchQuery, filterType === 'ALL' ? undefined : filterType, filterStatus === 'ALL' ? undefined : filterStatus);

  const handlePublish = async (id: string) => {
    try {
      await publishContent(id);
    } catch (err) {
      alert('Failed to publish content');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveContent(id);
    } catch (err) {
      alert('Failed to archive content');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบเนื้อหานี้?')) {
      try {
        await deleteContent(id);
      } catch (err) {
        alert('Failed to delete content');
      }
    }
  };

  const handleCreate = async () => {
    try {
      await createContent(newContent);
      setShowCreateDialog(false);
      setNewContent({
        title: '',
        slug: '',
        type: 'BLOG',
        excerpt: '',
      });
    } catch (err: any) {
      alert(err.message || 'Failed to create content');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="จัดการเนื้อหา"
        description="จัดการบทความ ศูนย์ช่วยเหลือ และประกาศ"
        actions={
          <Button onClick={() => setShowCreateDialog(true)}>
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
            onChange={(e) => setFilterType(e.target.value)}
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
        {loading ? (
          <CardContent className="p-6 text-center text-muted-foreground">Loading...</CardContent>
        ) : error ? (
          <CardContent className="p-6 text-center text-red-500">{error}</CardContent>
        ) : (
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
              {content.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">ไม่พบเนื้อหา</p>
                  </TableCell>
                </TableRow>
              ) : (
                content.map((item) => (
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
        )}
      </Card>

      {/* Create Content Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">เพิ่มเนื้อหาใหม่</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">ชื่อเรื่อง</label>
                <Input
                  value={newContent.title}
                  onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                  placeholder="ชื่อเรื่อง"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Slug</label>
                <Input
                  value={newContent.slug}
                  onChange={(e) => setNewContent({ ...newContent, slug: e.target.value })}
                  placeholder="slug"
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">ประเภท</label>
                <select
                  value={newContent.type}
                  onChange={(e) => setNewContent({ ...newContent, type: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="BLOG">บทความ</option>
                  <option value="HELP_CENTER">ศูนย์ช่วยเหลือ</option>
                  <option value="FAQ">คำถามที่พบบ่อย</option>
                  <option value="ANNOUNCEMENT">ประกาศ</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">บทสรุป</label>
                <Textarea
                  value={newContent.excerpt}
                  onChange={(e) => setNewContent({ ...newContent, excerpt: e.target.value })}
                  placeholder="บทสรุปของเนื้อหา"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                ยกเลิก
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!newContent.title || !newContent.slug || !newContent.excerpt}
              >
                สร้างเนื้อหา
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
