'use client';

import { PageHeader } from '@/components/layout/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { BookingStatusChart } from '@/components/dashboard/booking-status-chart';
import { RecentBookings } from '@/components/dashboard/recent-bookings';
import { Users, Store, Calendar, DollarSign, TrendingUp, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

const revenueData = [
  { date: 'W1', revenue: 12000, gmv: 50000 },
  { date: 'W2', revenue: 18000, gmv: 62000 },
  { date: 'W3', revenue: 15000, gmv: 59000 },
  { date: 'W4', revenue: 22000, gmv: 71000 },
];

const bookingStatusData = [
  { name: 'Confirmed', value: 12, color: '#8b5cf6' },
  { name: 'Pending', value: 7, color: '#f59e0b' },
  { name: 'Completed', value: 4, color: '#10b981' },
  { name: 'Cancelled', value: 1, color: '#ef4444' },
];

const recentBookings = [
  {
    id: 'bok_001',
    userId: 'usr_001',
    vendorId: 'ven_001',
    eventDate: new Date().toISOString(),
    eventType: 'wedding',
    status: 'confirmed',
    total: 120000,
    depositAmount: 36000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: 'usr_001',
      email: 'somchai@example.com',
      firstName: 'Somchai',
      lastName: 'Jaidee',
      role: 'buyer',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    vendor: {
      id: 'ven_001',
      name: 'Maison Lanna Collective',
      slug: 'maison-lanna',
      description: 'Luxury floral styling',
      category: 'decoration',
      zone: 'north',
      rating: 4.9,
      reviewCount: 87,
      verified: true,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];

const systemAlerts = [
  {
    id: 'alt_001',
    type: 'warning',
    message: 'มีวอเตอร์ 5 รายที่รอการอนุมัติมากกว่า 3 วัน',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'alt_002',
    type: 'error',
    message: 'ระบบการชำระเงินมีความล่าช้าสูง (P95 > 500ms)',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'alt_003',
    type: 'info',
    message: 'อัปเดตระบบสำเร็จ: v2.5.1',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

const topPerformers = [
  { id: 'ven_001', name: 'Maison Lanna Collective', category: 'decoration', bookings: 24, revenue: 480000 },
  { id: 'ven_002', name: 'Siam Symphony', category: 'entertainment', bookings: 18, revenue: 360000 },
  { id: 'ven_003', name: 'Chiang Mai Floral Art', category: 'decoration', bookings: 15, revenue: 300000 },
];

const recentActivities = [
  { id: 'act_001', type: 'vendor_approved', message: 'อนุมัติวอเตอร์: Maison Lanna Collective', actor: 'Admin', createdAt: new Date().toISOString() },
  { id: 'act_002', type: 'booking_created', message: 'การจองใหม่: BOK-001', actor: 'System', createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
  { id: 'act_003', type: 'user_registered', message: 'ผู้ใช้ใหม่: somchai@example.com', actor: 'System', createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="ภาพรวมแพลตฟอร์มและตัวชี้วัดสำคัญ" />

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="ผู้ใช้ทั้งหมด" value={1280} change={0.06} trend="up" icon={Users} formatType="number" />
        <StatCard title="วอเตอร์ที่ใช้งาน" value={214} change={0.02} trend="up" icon={Store} formatType="number" />
        <StatCard title="การจอง" value={96} change={-0.01} trend="down" icon={Calendar} formatType="number" />
        <StatCard title="รายได้" value={67000} change={0.04} trend="up" icon={DollarSign} formatType="currency" />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">GMV</p>
              <p className="text-2xl font-bold">฿242,000</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">อัตราการแปลง</p>
              <p className="text-2xl font-bold">34.5%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1%
              </p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">วอเตอร์รออนุมัติ</p>
              <p className="text-2xl font-bold text-orange-500">8</p>
              <p className="text-xs text-muted-foreground mt-1">
                ต้องดำเนินการ
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">สถานะระบบ</p>
              <p className="text-2xl font-bold text-green-500">ปกติ</p>
              <p className="text-xs text-muted-foreground mt-1">
                Uptime: 99.9%
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={revenueData} />
        <BookingStatusChart data={bookingStatusData} />
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            การแจ้งเตือนระบบ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  alert.type === 'error'
                    ? 'border-red-200 bg-red-50'
                    : alert.type === 'warning'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm">{alert.message}</p>
                  <Badge
                    variant={
                      alert.type === 'error'
                        ? 'destructive'
                        : alert.type === 'warning'
                        ? 'secondary'
                        : 'default'
                    }
                    className="ml-2"
                  >
                    {alert.type === 'error' ? 'ข้อผิดพลาด' : alert.type === 'warning' ? 'คำเตือน' : 'ข้อมูล'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatRelativeTime(alert.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performers & Recent Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>วอเตอร์ยอดนิยม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((vendor, index) => (
                <div key={vendor.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-xs text-muted-foreground">{vendor.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">฿{vendor.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{vendor.bookings} การจอง</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>กิจกรรมล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.actor} • {formatRelativeTime(activity.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <RecentBookings bookings={recentBookings as any} />
    </div>
  );
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'เมื่อสักครู่';
  if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
  if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
  if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
  return formatDate(dateString, 'short');
}
