import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4 thai-heading">
              ติดต่อเรา
            </h1>
            <p className="text-lg text-ivory/80">
              เรายินดีให้บริการและตอบคำถามของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-ivory mb-6">ข้อมูลติดต่อ</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ivory mb-1">โทรศัพท์</h4>
                    <p className="text-ivory/70">+66 2 123 4567</p>
                    <p className="text-sm text-ivory/60">จันทร์ - ศุกร์ 09:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ivory mb-1">อีเมล</h4>
                    <p className="text-ivory/70">hello@phithiai.com</p>
                    <p className="text-sm text-ivory/60">ตอบกลับภายใน 24 ชั่วโมง</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ivory mb-1">LINE Official</h4>
                    <p className="text-ivory/70">@Phithiai</p>
                    <p className="text-sm text-ivory/60">แชทตอบเร็ว ทุกวัน</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ivory mb-1">สำนักงาน</h4>
                    <p className="text-ivory/70">
                      123 ถนนสุขุมวิท<br />
                      แขวงคลองเตย เขตคลองเตย<br />
                      กรุงเทพฯ 10110
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ivory mb-1">เวลาทำการ</h4>
                    <p className="text-ivory/70">
                      จันทร์ - ศุกร์: 09:00 - 18:00<br />
                      เสาร์: 10:00 - 16:00<br />
                      อาทิตย์: ปิดทำการ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-ivory mb-6">ส่งข้อความถึงเรา</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ivory mb-2">ชื่อ-นามสกุล</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="กรอกชื่อของคุณ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ivory mb-2">อีเมล</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ivory mb-2">หมายเลขโทรศัพท์</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="08x-xxx-xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ivory mb-2">เรื่อง</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600">
                    <option>สอบถามบริการ</option>
                    <option>ปัญหาการใช้งาน</option>
                    <option>ข้อเสนอแนะ</option>
                    <option>สมัครเป็นพาร์ทเนอร์</option>
                    <option>อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ivory mb-2">ข้อความ</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="เขียนข้อความของคุณที่นี่..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  ส่งข้อความ
                </button>
              </form>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-ivory mb-4 text-center">พื้นที่ให้บริการ</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="font-semibold text-ivory">กรุงเทพฯ</p>
                <p className="text-sm text-ivory/70">พื้นที่หลัก</p>
              </div>
              <div>
                <p className="font-semibold text-ivory">เชียงใหม่</p>
                <p className="text-sm text-ivory/70">ภาคเหนือ</p>
              </div>
              <div>
                <p className="font-semibold text-ivory">ภูเก็ต</p>
                <p className="text-sm text-ivory/70">ภาคใต้</p>
              </div>
              <div>
                <p className="font-semibold text-ivory">พัทยา</p>
                <p className="text-sm text-ivory/70">ชายทะเล</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


