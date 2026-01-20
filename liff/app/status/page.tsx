'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type BookingStatus = {
  id: string;
  eventName: string;
  eventDate: string;
  status: 'CONFIRMED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  vendorName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  timeline: TimelineEvent[];
};

type TimelineEvent = {
  id: string;
  type: 'BOOKING_CREATED' | 'PAYMENT_RECEIVED' | 'VENDOR_CONFIRMED' | 'PREPARING' | 'COMPLETED' | 'CANCELLED';
  title: string;
  description: string;
  timestamp: string;
};

const statusLabels: Record<string, string> = {
  CONFIRMED: 'ยืนยันแล้ว',
  PENDING: 'รอการยืนยัน',
  IN_PROGRESS: 'กำลังดำเนินการ',
  COMPLETED: 'เสร็จสิ้น',
  CANCELLED: 'ยกเลิก',
};

const statusColors: Record<string, string> = {
  CONFIRMED: 'bg-green-100 text-green-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-purple-100 text-purple-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const timelineIcons: Record<string, string> = {
  BOOKING_CREATED: '📋',
  PAYMENT_RECEIVED: '💳',
  VENDOR_CONFIRMED: '✅',
  PREPARING: '⚙️',
  COMPLETED: '🎉',
  CANCELLED: '❌',
};

export default function LiffStatusPage() {
  const [bookingId, setBookingId] = useState<string>('');
  const [booking, setBooking] = useState<BookingStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get booking ID from URL query params
    const params = new URLSearchParams(window.location.search);
    const id = params.get('bookingId');
    if (id) {
      setBookingId(id);
      fetchBookingStatus(id);
    }
  }, []);

  const fetchBookingStatus = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock booking data
      const mockBooking: BookingStatus = {
        id: id,
        eventName: 'งานแต่งงาน - สมชัย & สมศรี',
        eventDate: '2026-02-15T10:00:00Z',
        status: 'CONFIRMED',
        vendorName: 'Maison Lanna Collective',
        totalAmount: 120000,
        paidAmount: 36000,
        remainingAmount: 84000,
        timeline: [
          {
            id: 'evt_001',
            type: 'BOOKING_CREATED',
            title: 'สร้างการจอง',
            description: 'คุณได้สร้างการจองสำเร็จ',
            timestamp: '2026-01-15T10:30:00Z',
          },
          {
            id: 'evt_002',
            type: 'PAYMENT_RECEIVED',
            title: 'รับชำระเงินมัดจำ',
            description: 'ชำระเงินมัดจำ ฿36,000 ได้รับยืนยัน',
            timestamp: '2026-01-15T11:00:00Z',
          },
          {
            id: 'evt_003',
            type: 'VENDOR_CONFIRMED',
            title: 'วอเตอร์ยืนยัน',
            description: 'Maison Lanna Collective ได้รับการจองแล้ว',
            timestamp: '2026-01-16T09:00:00Z',
          },
        ],
      };
      
      setBooking(mockBooking);
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูลสถานะการจองได้ กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
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

  const handlePayment = async () => {
    if (!booking) return;
    
    // Navigate to payment page or open payment modal
    alert('จะนำไปยังหน้าชำระเงิน');
  };

  const handleContactVendor = async () => {
    if (!booking) return;
    
    // Open LINE chat with vendor
    alert('จะเปิดแชท LINE กับวอเตอร์');
  };

  const progressPercentage = booking ? Math.round((booking.paidAmount / booking.totalAmount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="liff-header">
        <div className="liff-nav">
          <Link href="/" className="flex items-center gap-2 text-gray-600">
            <span>←</span>
            <span>กลับหน้าแรก</span>
          </Link>
          <h1 className="text-lg font-bold text-purple-600">สถานะการจอง</h1>
        </div>
      </header>

      <main className="liff-container">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="liff-card bg-red-50 border-red-200">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="liff-button liff-button-primary mt-4"
              >
                ลองใหม่
              </button>
            </div>
          </div>
        ) : booking ? (
          <div className="space-y-4">
            {/* Booking Summary Card */}
            <div className="liff-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{booking.eventName}</h2>
                <span className={`liff-badge ${statusColors[booking.status]}`}>
                  {statusLabels[booking.status]}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">วอเตอร์:</span>
                  <span className="font-medium">{booking.vendorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">วันที่จัดงาน:</span>
                  <span className="font-medium">{formatDate(booking.eventDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">รหัสการจอง:</span>
                  <span className="font-medium">{booking.id}</span>
                </div>
              </div>
            </div>

            {/* Payment Progress Card */}
            <div className="liff-card bg-purple-50 border-purple-200">
              <h3 className="font-semibold mb-4 text-purple-600">ความชำระเงิน</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">ความความคืบร้อย</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ยอดรวม:</span>
                  <span className="font-medium">฿{booking.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ชำระแล้ว:</span>
                  <span className="font-medium text-green-600">฿{booking.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">คงเหลือ:</span>
                  <span className="font-medium text-orange-600">฿{booking.remainingAmount.toLocaleString()}</span>
                </div>
              </div>

              {booking.status === 'CONFIRMED' && booking.remainingAmount > 0 && (
                <button
                  onClick={handlePayment}
                  className="liff-button liff-button-primary mt-4"
                >
                  ชำระเงินคงเหลือ
                </button>
              )}
            </div>

            {/* Timeline Card */}
            <div className="liff-card">
              <h3 className="font-semibold mb-4">ประวัติการ</h3>
              
              <div className="space-y-4">
                {booking.timeline.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index < booking.timeline.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-200" />
                    )}
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">{timelineIcons[event.type]}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-gray-600">{event.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatRelativeTime(event.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleContactVendor}
                className="liff-button liff-button-secondary"
              >
                ติดต่อกับวอเตอร์
              </button>
              <Link href="/" className="liff-button liff-button-outline block text-center">
                กลับหน้าแรก
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
