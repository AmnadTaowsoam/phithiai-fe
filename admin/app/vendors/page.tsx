'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Search, Eye, CheckCircle, XCircle, Clock, Ban, ShieldCheck } from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { useVendors, useVendorActions } from '@/hooks/use-vendors';

type VendorRow = {
  id: string;
  name: string;
  slug: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW' | 'BANNED';
  category: string;
  zone: string;
  rating?: number;
  reviewCount?: number;
  submittedAt: string;
  documents?: {
    businessLicense?: string;
    taxId?: string;
    portfolio?: string;
  };
  notes?: string;
  bannedAt?: string;
  banReason?: string;
};

const initialVendors: VendorRow[] = [
  {
    id: 'ven_001',
    name: 'Maison Lanna Collective',
    slug: 'maison-lanna',
    status: 'PENDING',
    category: 'decoration',
    zone: 'north',
    rating: 4.9,
    reviewCount: 87,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    documents: {
      businessLicense: 'BL-001',
      taxId: 'TAX-001',
      portfolio: 'PORT-001',
    },
  },
  {
    id: 'ven_002',
    name: 'Siam Symphony',
    slug: 'siam-symphony',
    status: 'APPROVED',
    category: 'entertainment',
    zone: 'central',
    rating: 4.7,
    reviewCount: 124,
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    documents: {
      businessLicense: 'BL-002',
      taxId: 'TAX-002',
    },
  },
  {
    id: 'ven_003',
    name: 'Chiang Mai Floral Art',
    slug: 'chiang-mai-floral',
    status: 'UNDER_REVIEW',
    category: 'decoration',
    zone: 'north',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    documents: {
      businessLicense: 'BL-003',
    },
  },
  {
    id: 'ven_004',
    name: 'Thai Traditional Music',
    slug: 'thai-traditional-music',
    status: 'PENDING',
    category: 'entertainment',
    zone: 'north',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    documents: {
      businessLicense: 'BL-004',
      taxId: 'TAX-004',
      portfolio: 'PORT-004',
    },
  },
  {
    id: 'ven_005',
    name: 'Bangkok Catering Co.',
    slug: 'bangkok-catering',
    status: 'REJECTED',
    category: 'catering',
    zone: 'central',
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    documents: {
      businessLicense: 'BL-005',
    },
    notes: 'Missing required portfolio documentation',
  },
  {
    id: 'ven_006',
    name: 'Banned Vendor',
    slug: 'banned-vendor',
    status: 'BANNED',
    category: 'catering',
    zone: 'central',
    rating: 3.2,
    reviewCount: 15,
    submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    bannedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    banReason: 'Violation of terms of service',
  },
];

const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'destructive' | 'warning'> = {
  PENDING: 'secondary',
  APPROVED: 'success',
  REJECTED: 'destructive',
  UNDER_REVIEW: 'warning',
  BANNED: 'destructive',
};

const statusLabels: Record<string, string> = {
  PENDING: 'รอตรวจสอบ',
  APPROVED: 'อนุมัติแล้ว',
  REJECTED: 'ปฏิเสธ',
  UNDER_REVIEW: 'กำลังตรวจสอบ',
  BANNED: 'ระงับ',
};

const categoryLabels: Record<string, string> = {
  decoration: 'ตกแต่ง',
  entertainment: 'บันเทิง',
  catering: 'อาหารและเครื่องดื่ม',
  venue: 'สถานที่',
  photography: 'การถ่ายภาพ/วิดีโอ',
};

const zoneLabels: Record<string, string> = {
  north: 'ภาคเหนือ',
  central: 'ภาคกลาง',
  northeast: 'ภาคตะวันออกเฉียงเหนือ',
  south: 'ภาคใต้',
};

export default function AdminVendorsPage() {
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [vendors, setVendors] = useState(initialVendors);
  const [selectedVendor, setSelectedVendor] = useState<VendorRow | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showUnbanDialog, setShowUnbanDialog] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [banDuration, setBanDuration] = useState<number | undefined>(undefined);

  const { banVendor, unbanVendor } = useVendorActions();

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = vendors.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.slug.toLowerCase().includes(q);
      const matchesStatus = filterStatus === 'ALL' || v.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    return filtered;
  }, [query, vendors, filterStatus]);

  const updateStatus = (id: string, status: VendorRow['status'], reason?: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, status, notes: reason || v.notes } : v
      )
    );
    setShowRejectDialog(false);
    setRejectReason('');
    setSelectedVendor(null);
  };

  const handleReject = () => {
    if (selectedVendor && rejectReason.trim()) {
      updateStatus(selectedVendor.id, 'REJECTED', rejectReason);
    }
  };

  const handleBan = async () => {
    if (selectedVendor && banReason.trim()) {
      try {
        await banVendor(selectedVendor.id, banReason, banDuration);
        setVendors((prev) =>
          prev.map((v) =>
            v.id === selectedVendor.id
              ? { ...v, status: 'BANNED', bannedAt: new Date().toISOString(), banReason }
              : v
          )
        );
        setShowBanDialog(false);
        setBanReason('');
        setBanDuration(undefined);
        setSelectedVendor(null);
      } catch (err) {
        alert('Failed to ban vendor');
      }
    }
  };

  const handleUnban = async () => {
    if (selectedVendor && banReason.trim()) {
      try {
        await unbanVendor(selectedVendor.id, banReason);
        setVendors((prev) =>
          prev.map((v) =>
            v.id === selectedVendor.id
              ? { ...v, status: 'APPROVED', bannedAt: undefined, banReason: undefined }
              : v
          )
        );
        setShowUnbanDialog(false);
        setBanReason('');
        setSelectedVendor(null);
      } catch (err) {
        alert('Failed to unban vendor');
      }
    }
  };

  const pendingCount = vendors.filter((v) => v.status === 'PENDING').length;
  const underReviewCount = vendors.filter((v) => v.status === 'UNDER_REVIEW').length;
  const bannedCount = vendors.filter((v) => v.status === 'BANNED').length;

  return (
    <div className="space-y-6">
      <PageHeader title="จัดการวอเตอร์" description="ตรวจสอบและจัดการวอเตอร์" />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ทั้งหมด</p>
              <p className="text-2xl font-bold">{vendors.length}</p>
            </div>
            <Clock className="h-8 w-8 text-gray-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">รอตรวจสอบ</p>
              <p className="text-2xl font-bold text-orange-500">{pendingCount}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">กำลังตรวจสอบ</p>
              <p className="text-2xl font-bold text-yellow-500">{underReviewCount}</p>
            </div>
            <Search className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ระงับ</p>
              <p className="text-2xl font-bold text-red-500">{bannedCount}</p>
            </div>
            <Ban className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ค้นหาวอเตอร์..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
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

      {/* Vendors Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ชื่อวอเตอร์</TableHead>
              <TableHead>หมวดหมู่</TableHead>
              <TableHead>ภูมิภาค</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>เอกสาร</TableHead>
              <TableHead>ส่งเมื่อ</TableHead>
              <TableHead className="text-right">การดำเนินการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <p className="text-muted-foreground">ไม่พบวอเตอร์</p>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-mono text-xs">{vendor.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-muted-foreground">{vendor.slug}</p>
                      {vendor.rating && (
                        <p className="text-xs text-muted-foreground">
                          ⭐ {vendor.rating} ({vendor.reviewCount} รีวิว)
                        </p>
                      )}
                      {vendor.status === 'BANNED' && vendor.bannedAt && (
                        <p className="text-xs text-red-600">
                          Banned: {formatDate(vendor.bannedAt, 'short')}
                        </p>
                      )}
                      {vendor.status === 'BANNED' && vendor.banReason && (
                        <p className="text-xs text-red-600">
                          Reason: {vendor.banReason}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{categoryLabels[vendor.category] || vendor.category}</TableCell>
                  <TableCell>{zoneLabels[vendor.zone] || vendor.zone}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[vendor.status]}>{statusLabels[vendor.status]}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {vendor.documents?.businessLicense && (
                        <Badge variant="outline" className="text-xs">
                          ✓ ใบอนุญาตประกอบธุรกิจ
                        </Badge>
                      )}
                      {vendor.documents?.taxId && (
                        <Badge variant="outline" className="text-xs">
                          ✓ เลขประจำตัวผู้เสียภาษี
                        </Badge>
                      )}
                      {vendor.documents?.portfolio && (
                        <Badge variant="outline" className="text-xs">
                          ✓ ผลงาน
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{formatDate(vendor.submittedAt, 'short')}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(vendor.submittedAt)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {vendor.status === 'PENDING' && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => updateStatus(vendor.id, 'UNDER_REVIEW')}
                          >
                            ตรวจสอบ
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateStatus(vendor.id, 'APPROVED')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            อนุมัติ
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedVendor(vendor);
                              setShowRejectDialog(true);
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            ปฏิเสธ
                          </Button>
                        </>
                      )}
                      {vendor.status === 'UNDER_REVIEW' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateStatus(vendor.id, 'APPROVED')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            อนุมัติ
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedVendor(vendor);
                              setShowRejectDialog(true);
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            ปฏิเสธ
                          </Button>
                        </>
                      )}
                      {vendor.status === 'APPROVED' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowBanDialog(true);
                          }}
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          ระงับ
                        </Button>
                      )}
                      {vendor.status === 'BANNED' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowUnbanDialog(true);
                          }}
                        >
                          <ShieldCheck className="h-4 w-4 mr-1" />
                          ยกเลิกระงับ
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Reject Dialog */}
      {showRejectDialog && selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">ปฏิเสธวอเตอร์</h3>
            <p className="text-sm text-muted-foreground mb-4">
              คุณกำลังปฏิเสธวอเตอร์: <strong>{selectedVendor.name}</strong>
            </p>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">เหตุผลในการปฏิเสธ</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="ระบุเหตุผลในการปฏิเสธ..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                ยกเลิก
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={!rejectReason.trim()}
              >
                ยืนยันการปฏิเสธ
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Ban Dialog */}
      {showBanDialog && selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">ระงับวอเตอร์</h3>
            <p className="text-sm text-muted-foreground mb-4">
              คุณกำลังระงับวอเตอร์: <strong>{selectedVendor.name}</strong>
            </p>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">เหตุผลในการระงับ</label>
              <Textarea
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="ระบุเหตุผลในการระงับ..."
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">ระยะเวลา (วัน)</label>
              <Input
                type="number"
                value={banDuration || ''}
                onChange={(e) => setBanDuration(e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="ว่างเปล่า = ถาวร"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                ปล่อยว่างเปล่าสำหรับระงับถาวร
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBanDialog(false)}>
                ยกเลิก
              </Button>
              <Button
                variant="destructive"
                onClick={handleBan}
                disabled={!banReason.trim()}
              >
                <Ban className="h-4 w-4 mr-2" />
                ระงับวอเตอร์
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Unban Dialog */}
      {showUnbanDialog && selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">ยกเลิกระงับ</h3>
            <p className="text-sm text-muted-foreground mb-4">
              คุณกำลังยกเลิกระงับวอเตอร์: <strong>{selectedVendor.name}</strong>
            </p>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">เหตุผลในการยกเลิกระงับ</label>
              <Textarea
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="ระบุเหตุผลในการยกเลิกระงับ..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUnbanDialog(false)}>
                ยกเลิก
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleUnban}
                disabled={!banReason.trim()}
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                ยกเลิกระงับ
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
