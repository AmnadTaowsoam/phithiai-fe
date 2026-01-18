import React from 'react';
import { Palette, Type, Layout, Image as ImageIcon, Download, Eye } from 'lucide-react';

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Palette className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4 thai-heading">
              Brand Guidelines
            </h1>
            <p className="text-lg text-gray-800/80">
              คู่มือการใช้งานแบรนด์ malAI
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                เกี่ยวกับแบรนด์ malAI
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>malAI เป็นแพลตฟอร์มที่ผสมผสานความงดงามของพิธีกรรมไทยเข้ากับเทคโนโลยีสมัยใหม่ แบรนด์ของเราสะท้อนถึงความหรูหรา ความเป็นไทย และนวัตกรรม</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Palette className="w-6 h-6 text-amber-600" />
                1. สีประจำแบรนด์
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="h-24 bg-[#D4AF37] rounded-lg mb-2 border-2 border-gray-200"></div>
                    <p className="font-semibold text-gray-800">Gold</p>
                    <p className="text-sm text-gray-800/70">#D4AF37</p>
                    <p className="text-xs text-gray-800/60">Primary</p>
                  </div>
                  <div>
                    <div className="h-24 bg-[#1A1A1A] rounded-lg mb-2 border-2 border-gray-200"></div>
                    <p className="font-semibold text-gray-800">Ivory Black</p>
                    <p className="text-sm text-gray-800/70">#1A1A1A</p>
                    <p className="text-xs text-gray-800/60">Secondary</p>
                  </div>
                  <div>
                    <div className="h-24 bg-[#F5F5DC] rounded-lg mb-2 border-2 border-gray-200"></div>
                    <p className="font-semibold text-gray-800">Cream</p>
                    <p className="text-sm text-gray-800/70">#F5F5DC</p>
                    <p className="text-xs text-gray-800/60">Accent</p>
                  </div>
                  <div>
                    <div className="h-24 bg-[#8B4513] rounded-lg mb-2 border-2 border-gray-200"></div>
                    <p className="font-semibold text-gray-800">Saddle Brown</p>
                    <p className="text-sm text-gray-800/70">#8B4513</p>
                    <p className="text-xs text-gray-800/60">Accent</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Type className="w-6 h-6 text-amber-600" />
                2. ฟอนต์
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-display text-3xl text-gray-800 mb-2">Playfair Display</p>
                  <p className="text-sm text-gray-800/70">สำหรับหัวข้อและข้อความที่ต้องการความหรูหรา</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-2xl text-gray-800 mb-2" style={{ fontFamily: 'Charm, serif' }}>Charm</p>
                  <p className="text-sm text-gray-800/70">สำหรับข้อความภาษาไทย</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-2xl text-gray-800 mb-2">Inter</p>
                  <p className="text-sm text-gray-800/70">สำหรับเนื้อหาทั่วไปและอินเทอร์เฟซ</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-amber-600" />
                3. โลโก้
              </h2>
              <div className="space-y-4 text-gray-800/80">
                <p>โลโก้ malAI มี 3 เวอร์ชัน:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-900 p-6 rounded-lg text-center">
                    <div className="text-white text-3xl font-display mb-2">malAI</div>
                    <p className="text-sm text-gray-300">Full Color</p>
                  </div>
                  <div className="bg-white border-2 p-6 rounded-lg text-center">
                    <div className="text-gray-900 text-3xl font-display mb-2">malAI</div>
                    <p className="text-sm text-gray-600">Light Background</p>
                  </div>
                  <div className="bg-gray-900 p-6 rounded-lg text-center">
                    <div className="text-white text-3xl font-display mb-2">malAI</div>
                    <p className="text-sm text-gray-300">Dark Background</p>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg mt-4">
                  <p className="text-sm"><strong>คำแนะนำ:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                    <li>ใช้โลโก้บนพื้นหลังที่มีความคมชัด</li>
                    <li>รักษาพื้นที่ว่างรอบโลโก้อย่างน้อย 20px</li>
                    <li>ไม่ควรบิดเบือน ยืด หรือหมุนโลโก้</li>
                    <li>ขนาดต่ำสุดของโลโก้ควรเป็น 80px กว้าง</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Layout className="w-6 h-6 text-amber-600" />
                4. หลักการออกแบบ
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">ความหรูหรา (Luxury)</h4>
                    <p className="text-sm">ใช้พื้นที่ว่างอย่างชาญฉลาด เลือกภาพที่มีคุณภาพสูง</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">ความเป็นไทย (Thai Heritage)</h4>
                    <p className="text-sm">ใช้ลวดลายไทยอย่างละเอียดอ่อน ผสมผสานกับความทันสมัย</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">นวัตกรรม (Innovation)</h4>
                    <p className="text-sm">แสดงเทคโนโลยี AI และระบบอัตโนมัติ</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">ความไว้วางใจ (Trust)</h4>
                    <p className="text-sm">สื่อสารอย่างชัดเจน แสดงการรับรองและความปลอดภัย</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Tone of Voice
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>การสื่อสารของ malAI ควร:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>มีความเป็นมืออาชีพ:</strong> ใช้ภาษาที่สุภาพและเป็นทางการ</li>
                  <li><strong>เป็นมิตร:</strong> อบอุ่นและเข้าถึงได้</li>
                  <li><strong>มีความรู้:</strong> แสดงความเชี่ยวชาญด้านพิธีกรรมไทย</li>
                  <li><strong>เป็นนวัตกร:</strong> เน้นเทคโนโลยีและความทันสมัย</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. ภาพถ่ายและกราฟิก
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>แนวทางสำหรับการเลือกภาพ:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ใช้ภาพถ่ายที่มีคุณภาพสูง ความละเอียดอย่างน้อย 1920x1080px</li>
                  <li>เน้นการแสดงพิธีกรรมไทย งานดอกไม้ และการจัดงานที่หรูหรา</li>
                  <li>ใช้แสงธรรมชาติและสีโทนอบอุ่น</li>
                  <li>หลีกเลี่ยงภาพที่มีสีสดจนเกินไป</li>
                </ul>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Download className="w-6 h-6 text-amber-600" />
                7. ดาวน์โหลด Brand Assets
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>ต้องการใช้ logo หรือ brand assets ของเรา?</p>
                <div className="flex gap-3">
                  <button className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    ดาวน์โหลด Logo Pack
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    ดู Brand Guide ฉบับเต็ม
                  </button>
                </div>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. ติดต่อทีมแบรนด์
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>หากคุณมีคำถามเกี่ยวกับการใช้งานแบรนด์ กรุณาติดต่อ:</p>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p><strong>อีเมล:</strong> brand@malai.app</p>
                  <p><strong>โทรศัพท์:</strong> +66 2 123 4567</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

