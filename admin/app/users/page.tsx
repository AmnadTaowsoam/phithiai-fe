'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Edit, Shield, Ban, CheckCircle, UserPlus } from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/lib/utils';

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: 'BUYER' | 'VENDOR' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  phone?: string;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  bookings?: number;
  totalSpent?: number;
};

const sampleUsers: UserRow[] = [
  {
    id: 'usr_001',
    email: 'somchai@example.com',
    name: 'Somchai Jaidee',
    role: 'BUYER',
    status: 'ACTIVE',
    phone: '081-234-5678',
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    bookings: 3,
    totalSpent: 150000,
  },
  {
    id: 'usr_002',
    email: 'vendor@example.com',
    name: 'Maison Lanna',
    role: 'VENDOR',
    status: 'ACTIVE',
    phone: '082-345-6789',
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    bookings: 24,
    totalSpent: 0,
  },
  {
    id: 'usr_003',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'ADMIN',
    status: 'ACTIVE',
    phone: '083-456-7890',
    lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'usr_004',
    email: 'nattaya@example.com',
    name: 'Nattaya Srisuk',
    role: 'BUYER',
    status: 'SUSPENDED',
    phone: '084-567-8901',
    lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    bookings: 1,
    totalSpent: 50000,
  },
  {
    id: 'usr_005',
    email: 'newuser@example.com',
    name: 'New User',
    role: 'BUYER',
    status: 'PENDING',
    phone: '085-678-9012',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const roleLabels: Record<string, string> = {
  BUYER: 'ผู้ใช้งาน',
  VENDOR: 'วอเตอร์',
  ADMIN: 'ผู้ดูแลระบบ',
};

const roleColors: Record<string, 'default' | 'secondary' | 'destructive'> = {
  BUYER: 'default',
  VENDOR: 'secondary',
  ADMIN: 'destructive',
};

const statusLabels: Record<string, string> = {
  ACTIVE: 'ใช้งานได้',
  SUSPENDED: 'ระงับการใช้งาน',
  PENDING: 'รอยืนยัน',
};

const statusColors: Record<string, 'default' | 'success' | 'destructive' | 'warning'> = {
  ACTIVE: 'success',
  SUSPENDED: 'destructive',
  PENDING: 'warning',
};

export default function AdminUsersPage() {
  const [query, setQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [users, setUsers] = useState(sampleUsers);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [suspendReason, setSuspendReason] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = users.filter((u) => {
      const matchesSearch =
        u.email.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q);
      const matchesRole = filterRole === 'ALL' || u.role === filterRole;
      const matchesStatus = filterStatus === 'ALL' || u.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
    return filtered;
  }, [query, users, filterRole, filterStatus]);

  const handleSuspend = () => {
    if (selectedUser && suspendReason.trim()) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, status: 'SUSPENDED' as const } : u
        )
      );
      setShowSuspendDialog(false);
      setSuspendReason('');
      setSelectedUser(null);
    }
  };

  const handleUnsuspend = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'ACTIVE' as const } : u))
    );
  };

  const handleActivate = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'ACTIVE' as const } : u))
    );
  };

  const activeCount = users.filter((u) => u.status === 'ACTIVE').length;
  const suspendedCount = users.filter((u) => u.status === 'SUSPENDED').length;
  const pendingCount = users.filter((u) => u.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="จัดการผู้ใช้"
        description="จัดการบัญชีผู้ใช้และสิทธิ์การเข้าถึง"
        actions={
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            เพิ่มผู้ใช้
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ทั้งหมด</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <UserPlus className="h-8 w-8 text-gray-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ใช้งานได้</p>
              <p className="text-2xl font-bold text-green-500">{activeCount}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ระงับการใช้งาน</p>
              <p className="text-2xl font-bold text-red-500">{suspendedCount}</p>
            </div>
            <Ban className="h-8 w-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">รอยืนยัน</p>
              <p className="text-2xl font-bold text-yellow-500">{pendingCount}</p>
            </div>
            <Shield className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ค้นหาผู้ใช้..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="ALL">ทุกบทบาท</option>
            {Object.entries(roleLabels).map(([value, label]) => (
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

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อ</TableHead>
              <TableHead>อีเมล</TableHead>
              <TableHead>เบอร์โทร</TableHead>
              <TableHead>บทบาท</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>การจอง/ใช้จ่าย</TableHead>
              <TableHead>เข้าใช้ล่าสุด</TableHead>
              <TableHead>สมัครเมื่อ</TableHead>
              <TableHead className="text-right">การดำเนินการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <p className="text-muted-foreground">ไม่พบผู้ใช้</p>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[user.status]}>{statusLabels[user.status]}</Badge>
                  </TableCell>
                  <TableCell>
                    {user.role === 'BUYER' ? (
                      <div>
                        <p className="text-sm">{user.bookings || 0} การจอง</p>
                        <p className="text-xs text-muted-foreground">
                          ฿{user.totalSpent?.toLocaleString() || 0}
                        </p>
                      </div>
                    ) : user.role === 'VENDOR' ? (
                      <div>
                        <p className="text-sm">{user.bookings || 0} งาน</p>
                        <p className="text-xs text-muted-foreground">
                          รับจอง
                        </p>
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {user.lastLogin ? (
                      <div>
                        <p className="text-sm">{formatDate(user.lastLogin, 'short')}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(user.lastLogin)}
                        </p>
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt, 'short')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user.status === 'ACTIVE' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowSuspendDialog(true);
                          }}
                          className="text-red-600"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                      {user.status === 'SUSPENDED' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUnsuspend(user.id)}
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {user.status === 'PENDING' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleActivate(user.id)}
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          อนุมัติ
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

      {/* Suspend Dialog */}
      {showSuspendDialog && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">ระงับการใช้งานผู้ใช้</h3>
            <p className="text-sm text-muted-foreground mb-4">
              คุณกำลังระงับการใช้งาน: <strong>{selectedUser.name}</strong>
            </p>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">เหตุผลในการระงับ</label>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="ระบุเหตุผลในการระงับการใช้งาน..."
                rows={4}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
                ยกเลิก
              </Button>
              <Button
                variant="destructive"
                onClick={handleSuspend}
                disabled={!suspendReason.trim()}
              >
                ยืนยันการระงับ
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
