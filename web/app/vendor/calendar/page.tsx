'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, X, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { VendorCalendarAPI, type BlockedDate, type BookingEvent } from '@/lib/api/vendor-calendar';
import { getAccessToken } from '@/lib/auth/client';

const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const THAI_DAYS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

export default function VendorCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [bookings, setBookings] = useState<BookingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [blockReason, setBlockReason] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingEvent | null>(null);

  const token = getAccessToken();

  // Load calendar data
  useEffect(() => {
    const loadCalendarData = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const data = await VendorCalendarAPI.getMonthEvents(year, month, token || undefined);
        setBlockedDates(data.blockedDates || []);
        setBookings(data.bookings || []);
      } catch (error) {
        console.error('Failed to load calendar data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCalendarData();
  }, [currentDate, token]);

  const handleBlockDate = async () => {
    if (selectedDate && blockReason.trim()) {
      try {
        const blocked = await VendorCalendarAPI.blockDate({
          date: selectedDate.toISOString().split('T')[0],
          reason: blockReason,
        }, token || undefined);
        setBlockedDates([...blockedDates, blocked]);
        setShowBlockDialog(false);
        setBlockReason('');
        setSelectedDate(null);
      } catch (error) {
        console.error('Failed to block date:', error);
        alert('Failed to block date. Please try again.');
      }
    }
  };

  const handleUnblockDate = async (dateId: string) => {
    try {
      await VendorCalendarAPI.unblockDate(dateId, token || undefined);
      setBlockedDates(blockedDates.filter((d) => d.id !== dateId));
    } catch (error) {
      console.error('Failed to unblock date:', error);
      alert('Failed to unblock date. Please try again.');
    }
  };

  const navigateMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateBlocked = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedDates.some((d) => d.date === dateStr);
  };

  const getDateBookings = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter((b) => b.eventDate === dateStr);
  };

  const getBlockedDateInfo = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedDates.find((d) => d.date === dateStr);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-ivory">ปฏิทินว่าง</h1>
          <p className="mt-2 text-ivory/60">จัดการวันที่ว่างและการจองของคุณ</p>
        </div>
        <Button
          onClick={() => setShowBlockDialog(true)}
          className="bg-brand-500 hover:bg-brand-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          บล็อกวันที่
        </Button>
      </div>

      {/* Calendar Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold">
              {THAI_MONTHS[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
            </h2>
            <Button variant="ghost" onClick={() => navigateMonth(1)}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {THAI_DAYS.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-ivory/60">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={index} className="h-24" />;
                }

                const blocked = isDateBlocked(date);
                const dayBookings = getDateBookings(date);
                const blockedInfo = getBlockedDateInfo(date);
                const isToday = new Date().toDateString() === date.toDateString();

                return (
                  <div
                    key={date.toISOString()}
                    className={`h-24 p-2 rounded-lg border cursor-pointer transition-colors ${
                      blocked
                        ? 'bg-red-50 border-red-200'
                        : dayBookings.length > 0
                        ? 'bg-blue-50 border-blue-200'
                        : isToday
                        ? 'bg-brand-50 border-brand-200'
                        : 'bg-white border-gray-200 hover:border-brand-300'
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-sm font-medium ${isToday ? 'text-brand-600' : ''}`}>
                        {date.getDate()}
                      </span>
                      {blocked && (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          บล็อก
                        </Badge>
                      )}
                    </div>
                    {dayBookings.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {dayBookings.slice(0, 2).map((booking) => (
                          <div
                            key={booking.id}
                            className={`text-xs px-1 py-0.5 rounded truncate ${
                              booking.status === 'CONFIRMED'
                                ? 'bg-blue-100 text-blue-800'
                                : booking.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBooking(booking);
                            }}
                          >
                            {booking.customerName}
                          </div>
                        ))}
                        {dayBookings.length > 2 && (
                          <div className="text-xs text-ivory/60">
                            +{dayBookings.length - 2} เพิ่มเติม
                          </div>
                        )}
                      </div>
                    )}
                    {blocked && blockedInfo?.reason && (
                      <div className="mt-1 text-xs text-red-600 truncate">
                        {blockedInfo.reason}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blocked Dates List */}
      {blockedDates.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <X className="h-5 w-5 text-red-500" />
              วันที่บล็อก ({blockedDates.length})
            </h3>
            <div className="space-y-2">
              {blockedDates.map((blocked) => (
                <div
                  key={blocked.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">
                        {new Date(blocked.date).toLocaleDateString('th-TH', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                      {blocked.reason && (
                        <p className="text-sm text-ivory/60">{blocked.reason}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUnblockDate(blocked.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Block Date Dialog */}
      {showBlockDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">บล็อกวันที่</h3>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">วันที่</label>
              <Input
                type="date"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">เหตุผล (ไม่บังคับ)</label>
              <Textarea
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="ระบุเหตุผลในการบล็อกวันที่..."
                rows={3}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
                ยกเลิก
              </Button>
              <Button
                onClick={handleBlockDate}
                className="bg-red-600 hover:bg-red-700"
                disabled={!selectedDate}
              >
                <X className="h-4 w-4 mr-2" />
                บล็อกวันที่
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Booking Detail Dialog */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">รายละเอียดการจอง</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-ivory/60">ลูกค้า:</span>
                <span className="font-medium">{selectedBooking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-ivory/60">ประเภท:</span>
                <span className="font-medium">{selectedBooking.eventType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-ivory/60">วันที่:</span>
                <span className="font-medium">
                  {new Date(selectedBooking.eventDate).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              {selectedBooking.startTime && (
                <div className="flex justify-between">
                  <span className="text-sm text-ivory/60">เวลา:</span>
                  <span className="font-medium">
                    {selectedBooking.startTime} - {selectedBooking.endTime}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-ivory/60">สถานะ:</span>
                <Badge className={STATUS_COLORS[selectedBooking.status]}>
                  {selectedBooking.status}
                </Badge>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                ปิด
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
