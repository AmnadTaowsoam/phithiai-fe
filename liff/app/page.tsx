'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, User, Bell, Home, LogOut, ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

type TabType = 'home' | 'bookings' | 'rsvp' | 'notifications' | 'profile';

type Booking = {
  id: string;
  eventName: string;
  eventDate: string;
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  vendorName: string;
  totalAmount: number;
};

type Notification = {
  id: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

type Guest = {
  id: string;
  name: string;
  attending: 'YES' | 'NO' | 'MAYBE';
  checkedIn: boolean;
};

const sampleBookings: Booking[] = [
  {
    id: 'bok_001',
    eventName: 'งานแต่งงาน - สมชัย & สมศรี',
    eventDate: '2026-02-15T10:00:00Z',
    status: 'CONFIRMED',
    vendorName: 'Maison Lanna Collective',
    totalAmount: 120000,
  },
  {
    id: 'bok_002',
    eventName: 'งานบวชพระ - นายวิชัย',
    eventDate: '2026-03-01T09:00:00Z',
    status: 'PENDING',
    vendorName: 'Siam Symphony',
    totalAmount: 45000,
  },
];

const sampleNotifications: Notification[] = [
  {
    id: 'not_001',
    type: 'SUCCESS',
    title: 'การจองสำเร็จ',
    message: 'การจองของคุณได้รับการยืนยันแล้ว',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'not_002',
    type: 'INFO',
    title: 'เตือนการจอง',
    message: 'งานของคุณจะเกิดขึ้นใน 7 วัน',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'not_003',
    type: 'WARNING',
    title: 'ต้องการการชำระเงิน',
    message: 'กรุณาชำระเงินมัดจำนอย่างน้อย฿36,000',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
];

const sampleGuests: Guest[] = [
  { id: 'gst_001', name: 'สมชาย ใจดี', attending: 'YES', checkedIn: false },
  { id: 'gst_002', name: 'สมศรี รักษ์ดี', attending: 'MAYBE', checkedIn: false },
  { id: 'gst_003', name: 'สมศักดิ์ มั่นคง', attending: 'YES', checkedIn: true },
];

const statusLabels: Record<string, string> = {
  CONFIRMED: 'ยืนยันแล้ว',
  PENDING: 'รอการยืนยัน',
  COMPLETED: 'เสร็จสิ้น',
  CANCELLED: 'ยกเลิก',
};

const statusColors: Record<string, string> = {
  CONFIRMED: 'bg-green-100 text-green-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const notificationTypeIcons: Record<string, any> = {
  INFO: AlertCircle,
  SUCCESS: CheckCircle,
  WARNING: AlertCircle,
  ERROR: AlertCircle,
};

const notificationTypeColors: Record<string, string> = {
  INFO: 'bg-blue-100 text-blue-600',
  SUCCESS: 'bg-green-100 text-green-600',
  WARNING: 'bg-yellow-100 text-yellow-600',
  ERROR: 'bg-red-100 text-red-600',
};

export default function LiffPage() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; lineId: string } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [guests, setGuests] = useState<Guest[]>(sampleGuests);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [rsvpValue, setRsvpValue] = useState<'YES' | 'NO' | 'MAYBE'>('YES');

  // Simulate LINE LIFF login
  useEffect(() => {
    // In production, this would use @line/liff SDK
    const simulateLogin = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser({
        name: 'สมชัย ใจดี',
        lineId: 'U1234567890',
      });
      setIsLoggedIn(true);
    };

    simulateLogin();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleRSVP = () => {
    if (selectedGuest) {
      setGuests((prev) =>
        prev.map((g) =>
          g.id === selectedGuest.id ? { ...g, attending: rsvpValue } : g
        )
      );
      setSelectedGuest(null);
    }
  };

  const handleCheckIn = (guestId: string) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, checkedIn: true } : g))
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatRelativeTime = (dateString: string) => {
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
    return formatDate(dateString);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Phithiai</h1>
            <p className="text-gray-600 mt-2">วางแผนพิธีไทยด้วย AI</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">เข้าสู่ระบบด้วย LINE</p>
                <p className="text-sm text-gray-600">ใช้บัญชี LINE ของคุณ</p>
              </div>
            </div>
            <button className="liff-button liff-button-primary flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
              </svg>
              เข้าสู่ระบบด้วย LINE
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="liff-header">
        <div className="liff-nav">
          <div>
            <h1 className="text-lg font-bold text-purple-600">Phithiai</h1>
            <p className="text-xs text-gray-600">สวัสดี, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="liff-container">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <div className="liff-card">
              <h2 className="font-semibold mb-3">ภาพรวม</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-600">{bookings.length}</p>
                  <p className="text-sm text-gray-600">การจองทั้งหมด</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-green-600">
                    {notifications.filter((n) => !n.read).length}
                  </p>
                  <p className="text-sm text-gray-600">การแจ้งเตือนใหม่</p>
                </div>
              </div>
            </div>

            <div className="liff-card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">การจองล่าสุด</h2>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-purple-600 text-sm flex items-center gap-1"
                >
                  ดูทั้งหมด
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {bookings.slice(0, 2).map((booking) => (
                  <div
                    key={booking.id}
                    className="border rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{booking.eventName}</p>
                        <p className="text-sm text-gray-600">{booking.vendorName}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(booking.eventDate)}
                        </p>
                      </div>
                      <span
                        className={`liff-badge ${statusColors[booking.status]}`}
                      >
                        {statusLabels[booking.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="liff-card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">การแจ้งเตือนล่าสุด</h2>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className="text-purple-600 text-sm flex items-center gap-1"
                >
                  ดูทั้งหมด
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 2).map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      notification.read ? 'bg-gray-50' : 'bg-purple-50'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notificationTypeColors[notification.type]
                      }`}
                    >
                      {React.createElement(notificationTypeIcons[notification.type], {
                        className: 'w-4 h-4',
                      })}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">การจองของฉัน</h2>
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="liff-card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{booking.eventName}</p>
                      <p className="text-sm text-gray-600">{booking.vendorName}</p>
                    </div>
                    <span
                      className={`liff-badge ${statusColors[booking.status]}`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {formatDate(booking.eventDate)}
                    </div>
                    <p className="font-semibold text-purple-600">
                      ฿{booking.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="liff-button liff-button-outline mt-3"
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rsvp' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">รายชื่อแขก</h2>
            <div className="space-y-3">
              {guests.map((guest) => (
                <div key={guest.id} className="liff-card">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{guest.name}</p>
                      <span
                        className={`liff-badge ${
                          guest.attending === 'YES'
                            ? 'liff-badge-success'
                            : guest.attending === 'NO'
                            ? 'liff-badge-error'
                            : 'liff-badge-warning'
                        }`}
                      >
                        {guest.attending === 'YES'
                          ? 'เข้าร่วม'
                          : guest.attending === 'NO'
                          ? 'ไม่เข้าร่วม'
                          : 'อาจเข้าร่วม'}
                      </span>
                    </div>
                    {guest.checkedIn && (
                      <span className="liff-badge liff-badge-success">
                        เช็กอินแล้ว
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedGuest(guest);
                        setRsvpValue('YES');
                      }}
                      className="liff-button liff-button-outline text-sm py-2"
                    >
                      เข้าร่วม
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGuest(guest);
                        setRsvpValue('MAYBE');
                      }}
                      className="liff-button liff-button-outline text-sm py-2"
                    >
                      อาจเข้าร่วม
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGuest(guest);
                        setRsvpValue('NO');
                      }}
                      className="liff-button liff-button-outline text-sm py-2"
                    >
                      ไม่เข้าร่วม
                    </button>
                    {!guest.checkedIn && (
                      <button
                        onClick={() => handleCheckIn(guest.id)}
                        className="liff-button liff-button-primary text-sm py-2"
                      >
                        เช็กอิน
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">การแจ้งเตือน</h2>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`liff-card ${
                    notification.read ? 'bg-gray-50' : 'bg-purple-50'
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notificationTypeColors[notification.type]
                      }`}
                    >
                      {React.createElement(notificationTypeIcons[notification.type], {
                        className: 'w-5 h-5',
                      })}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="liff-card">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl font-bold">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-lg">{user?.name}</p>
                  <p className="text-sm text-gray-600">LINE ID: {user?.lineId}</p>
                </div>
              </div>
            </div>
            <div className="liff-card space-y-3">
              <button className="liff-button liff-button-outline flex items-center justify-between">
                <span>ข้อมูลส่วนตัว</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="liff-button liff-button-outline flex items-center justify-between">
                <span>การตั้งค่า</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="liff-button liff-button-outline flex items-center justify-between">
                <span>ความช่วยเหลือ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="liff-button liff-button-outline text-red-600 flex items-center justify-between"
              >
                <span>ออกจากระบบ</span>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`liff-nav-item ${activeTab === 'home' ? 'active' : ''}`}
          >
            <Home className="w-6 h-6" />
            <span>หน้าแรก</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`liff-nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
          >
            <Calendar className="w-6 h-6" />
            <span>การจอง</span>
          </button>
          <button
            onClick={() => setActiveTab('rsvp')}
            className={`liff-nav-item ${activeTab === 'rsvp' ? 'active' : ''}`}
          >
            <CheckCircle className="w-6 h-6" />
            <span>RSVP</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`liff-nav-item ${activeTab === 'notifications' ? 'active' : ''} relative`}
          >
            <Bell className="w-6 h-6" />
            <span>แจ้งเตือน</span>
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="absolute top-0 right-2 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`liff-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <User className="w-6 h-6" />
            <span>โปรไฟล์</span>
          </button>
        </div>
      </nav>

      {/* RSVP Modal */}
      {selectedGuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">ตอบรับคำเชิญ</h3>
            <p className="text-gray-600 mb-4">
              คุณต้องการตอบรับคำเชิญสำหรับ {selectedGuest.name} หรือไม่?
            </p>
            <div className="space-y-2 mb-4">
              {(['YES', 'NO', 'MAYBE'] as const).map((value) => (
                <button
                  key={value}
                  onClick={() => setRsvpValue(value)}
                  className={`liff-button liff-button-outline ${
                    rsvpValue === value ? 'border-purple-600 bg-purple-50' : ''
                  }`}
                >
                  {value === 'YES' ? 'เข้าร่วม' : value === 'NO' ? 'ไม่เข้าร่วม' : 'อาจเข้าร่วม'}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedGuest(null)}
                className="liff-button liff-button-secondary"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleRSVP}
                className="liff-button liff-button-primary"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
