'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { getRSVPSummary, submitRSVP, checkInGuest } from '@/lib/api/guests';
import type { RsvpSummary } from '@/lib/api/types';

export default function LiffGuestConsole() {
  const [bookingId, setBookingId] = useState('');
  const [guestId, setGuestId] = useState('');
  const [attending, setAttending] = useState<'YES' | 'NO' | 'MAYBE'>('YES');
  const [summary, setSummary] = useState<RsvpSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchSummary = async () => {
    if (!bookingId) return;
    setLoading(true);
    try {
      const response = await getRSVPSummary(bookingId);
      setSummary(response?.summary ?? null);
      setMessage(null);
    } catch (error) {
      console.error(error);
      setMessage('ไม่สามารถดึงข้อมูล RSVP ได้');
    } finally {
      setLoading(false);
    }
  };

  const sendRSVP = async () => {
    if (!guestId) return;
    setLoading(true);
    try {
      await submitRSVP({
        guestId,
        attending,
      });
      setMessage('บันทึกการตอบรับเรียบร้อยแล้ว');
    } catch (error) {
      console.error(error);
      setMessage('ไม่สามารถส่งการตอบรับได้');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!guestId) return;
    setLoading(true);
    try {
      await checkInGuest({ guestId });
      setMessage('เช็กอินสำเร็จ');
    } catch (error) {
      console.error(error);
      setMessage('เช็กอินไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LIFF Guest Console</CardTitle>
          <p className="text-sm text-muted-foreground">
            เครื่องมือสำหรับตอบรับคำเชิญและเช็กอินอย่างรวดเร็วผ่าน LINE LIFF
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-muted-foreground">Booking ID</label>
              <Input value={bookingId} onChange={(e) => setBookingId(e.target.value)} placeholder="booking_cuid" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Guest ID</label>
              <Input value={guestId} onChange={(e) => setGuestId(e.target.value)} placeholder="guest_cuid" />
            </div>
          </div>
          <div className="flex gap-2">
            {(['YES', 'NO', 'MAYBE'] as const).map((value) => (
              <Button
                key={value}
                variant={attending === value ? 'primary' : 'outline'}
                onClick={() => setAttending(value)}
              >
                {value}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={fetchSummary} disabled={loading}>
              ดูสถานะ RSVP
            </Button>
            <Button variant="secondary" onClick={sendRSVP} disabled={loading}>
              ส่งการตอบรับ
            </Button>
            <Button variant="outline" onClick={handleCheckIn} disabled={loading}>
              เช็กอินหน้างาน
            </Button>
          </div>
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </CardContent>
      </Card>

      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>สรุปการตอบรับ</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase text-muted-foreground">ตอบรับแล้ว</p>
              <p className="text-2xl font-semibold">{summary.yes}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">รอดำเนินการ</p>
              <p className="text-2xl font-semibold">{summary.pending}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">ปฏิเสธ</p>
              <p className="text-2xl font-semibold">{summary.no}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">ผู้ร่วมงานคาดการณ์</p>
              <p className="text-2xl font-semibold">{summary.expectedAttendees}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs uppercase text-muted-foreground mb-2">บันทึก</p>
              <Textarea rows={3} placeholder="ข้อความที่อยากส่งถึงทีมงาน..." disabled className="resize-none" />
            </div>
            <div className="col-span-2 flex gap-2">
              <Badge className="bg-transparent border-brand-500/40 text-brand-200">รวม {summary.total} รายชื่อ</Badge>
              <Badge className="bg-brand-500/20 border-brand-400/60 text-brand-100">{summary.maybe} Maybe</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
