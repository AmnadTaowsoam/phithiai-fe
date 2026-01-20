'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Vendor = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  zone: string;
};

type BookingFormData = {
  vendorId: string;
  eventName: string;
  eventDate: string;
  eventType: 'WEDDING' | 'ORDINATION' | 'FUNERAL' | 'MERIT_MAKING';
  guestCount: number;
  location: string;
  requirements: string;
  budget: number;
};

const sampleVendors: Vendor[] = [
  {
    id: 'ven_001',
    name: 'Maison Lanna Collective',
    category: 'decoration',
    rating: 4.9,
    reviewCount: 87,
    zone: 'north',
  },
  {
    id: 'ven_002',
    name: 'Siam Symphony',
    category: 'catering',
    rating: 4.7,
    reviewCount: 62,
    zone: 'central',
  },
  {
    id: 'ven_003',
    name: 'Thai Heritage Events',
    category: 'decoration',
    rating: 4.8,
    reviewCount: 45,
    zone: 'north',
  },
];

const eventTypeLabels: Record<string, string> = {
  WEDDING: 'งานแต่งงาน',
  ORDINATION: 'งานบวชพระ',
  FUNERAL: 'งานศพ',
  MERIT_MAKING: 'งานบุญ',
};

export default function LiffBookingPage() {
  const [step, setStep] = useState<'vendor' | 'details' | 'confirm'>('vendor');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    vendorId: '',
    eventName: '',
    eventDate: '',
    eventType: 'WEDDING',
    guestCount: 100,
    location: '',
    requirements: '',
    budget: 100000,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pre-fill event date with today's date
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, eventDate: today }));
  }, []);

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setFormData(prev => ({ ...prev, vendorId: vendor.id }));
    setStep('details');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Booking submitted:', formData);
      setStep('confirm');
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการส่งคำขอจอง กรุณาลองใหม่');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call to confirm booking
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Booking confirmed:', formData);
      alert('ส่งคำขอจองสำเร็จแล้ว!');
      
      // Reset form
      setStep('vendor');
      setSelectedVendor(null);
      setFormData({
        vendorId: '',
        eventName: '',
        eventDate: new Date().toISOString().split('T')[0],
        eventType: 'WEDDING',
        guestCount: 100,
        location: '',
        requirements: '',
        budget: 100000,
      });
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการยืนยันการจอง กรุณาลองใหม่');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (step === 'confirm') {
      setStep('details');
    } else if (step === 'details') {
      setStep('vendor');
      setSelectedVendor(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="liff-header">
        <div className="liff-nav">
          <Link href="/" className="flex items-center gap-2 text-gray-600">
            <span>←</span>
            <span>กลับ</span>
          </Link>
          <h1 className="text-lg font-bold text-purple-600">จองวอเตอร์</h1>
        </div>
      </header>

      <main className="liff-container">
        {/* Step 1: Vendor Selection */}
        {step === 'vendor' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">เลือกวอเตอร์</h2>
              <p className="text-sm text-gray-600">เลือกวอเตอร์ที่ต้องการจอง</p>
            </div>

            <div className="space-y-3">
              {sampleVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  onClick={() => handleVendorSelect(vendor)}
                  className="liff-card cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{vendor.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600 capitalize">{vendor.category}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{vendor.zone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{vendor.rating}</span>
                      <span className="text-sm text-gray-500">({vendor.reviewCount})</span>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Booking Details */}
        {step === 'details' && selectedVendor && (
          <div className="space-y-4">
            <div className="liff-card bg-purple-50 border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                  {selectedVendor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedVendor.name}</h3>
                  <p className="text-sm text-gray-600">{selectedVendor.category} • {selectedVendor.zone}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">ประเภทีงาน</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="liff-input"
                  required
                >
                  {Object.entries(eventTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ชื่องาน</label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  placeholder="เช่น งานแต่งงาน - สมชัย & สมศรี"
                  className="liff-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">วันที่จัดงาน</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="liff-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">จำนวนแขก</label>
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  placeholder="100"
                  className="liff-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">สถานที่จัดงาน</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="เช่น กรุงเทพฯ"
                  className="liff-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">งบประมาณ</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="100000"
                  className="liff-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ความต้องการเพิ่มเติม</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="ระบุความต้องการเพิ่มเติม..."
                  rows={4}
                  className="liff-input"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <span className="text-xl">⚠️</span>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="liff-button liff-button-secondary"
                  disabled={isSubmitting}
                >
                  ย้อนกลับ
                </button>
                <button
                  type="submit"
                  className="liff-button liff-button-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'กำลังส่ง...' : 'ถัดไป'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirm' && selectedVendor && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">ยืนยันการจอง</h2>
              <p className="text-sm text-gray-600">ตรวจสอบรายละเอียดการจองก่อนยืนยัน</p>
            </div>

            <div className="liff-card space-y-4">
              <div>
                <h3 className="font-semibold text-purple-600 mb-2">วอเตอร์</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                    {selectedVendor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{selectedVendor.name}</p>
                    <p className="text-sm text-gray-600">{selectedVendor.category} • {selectedVendor.zone}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">รายละเอียดการจอง</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ประเภทีงาน:</span>
                    <span className="font-medium">{eventTypeLabels[formData.eventType]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ชื่องาน:</span>
                    <span className="font-medium">{formData.eventName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">วันที่จัดงาน:</span>
                    <span className="font-medium">{formData.eventDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">จำนวนแขก:</span>
                    <span className="font-medium">{formData.guestCount} คน</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">สถานที่จัดงาน:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  {formData.requirements && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">ความต้องการ:</span>
                      <span className="font-medium text-right flex-1 ml-4">{formData.requirements}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">งบประมาณโดยประมาณ:</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ฿{formData.budget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={goBack}
                className="liff-button liff-button-secondary"
                disabled={isSubmitting}
              >
                แก้ไข
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="liff-button liff-button-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'กำลังยืนยัน...' : 'ยืนยันการจอง'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
