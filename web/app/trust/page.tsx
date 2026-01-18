import React from 'react';
import { Shield, CheckCircle, Lock, Users, Award, FileText, Clock, Phone, Eye, BadgeCheck, Scale, Banknote } from 'lucide-react';

export default function TrustSafetyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Shield className="w-20 h-20 text-amber-600 mx-auto mb-6" />
            <h1 className="font-display text-5xl md:text-6xl text-gray-800 mb-6 thai-heading">
              ศูนย์ความปลอดภัยและความน่าเชื่อถือ
            </h1>
            <p className="text-xl text-gray-800/80 max-w-3xl mx-auto">
              Phithiai มุ่งมั่นสร้างแพลตฟอร์มที่โปร่งใส ปลอดภัย และเชื่อถือได้ 
              สำหรับทุกงานฉลองที่สำคัญของคุณ
            </p>
          </div>

          {/* Company Registration */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-amber-600" />
              ข้อมูลการจดทะเบียนบริษัท
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-amber-600 pl-4">
                  <p className="text-sm text-gray-800/60 uppercase tracking-wider">ชื่อบริษัท</p>
                  <p className="text-lg font-semibold text-gray-800">บริษัท Phithiai แพลตฟอร์ม จำกัด</p>
                  <p className="text-sm text-gray-800/70">Phithiai Platform Co., Ltd.</p>
                </div>
                <div className="border-l-4 border-amber-600 pl-4">
                  <p className="text-sm text-gray-800/60 uppercase tracking-wider">เลขทะเบียนนิติบุคคล</p>
                  <p className="text-lg font-semibold text-gray-800">0105566012345</p>
                </div>
                <div className="border-l-4 border-amber-600 pl-4">
                  <p className="text-sm text-gray-800/60 uppercase tracking-wider">เลขประจำตัวผู้เสียภาษี</p>
                  <p className="text-lg font-semibold text-gray-800">0105566012345</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-amber-600 pl-4">
                  <p className="text-sm text-gray-800/60 uppercase tracking-wider">ทุนจดทะเบียน</p>
                  <p className="text-lg font-semibold text-gray-800">10,000,000 บาท</p>
                </div>
                <div className="border-l-4 border-amber-600 pl-4">
                  <p className="text-sm text-gray-800/60 uppercase tracking-wider">สำนักงานจดทะเบียน</p>
                  <p className="text-gray-800">
                    99/9 อาคารไทยซัมมิท ทาวเวอร์<br />
                    ถนนวิทยุ แขวงลุมพินี<br />
                    เขตปทุมวัน กรุงเทพฯ 10330
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <strong>ตรวจสอบได้:</strong> ค้นหาเลขทะเบียน 0105566012345 ที่ 
                <a href="https://www.dbd.go.th" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                  กรมพัฒนาธุรกิจการค้า
                </a>
              </p>
            </div>
          </div>

          {/* Certifications & Compliance */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <BadgeCheck className="w-8 h-8 text-amber-600" />
              การรับรองและการปฏิบัติตามกฎหมาย
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">PDPA Certified</h3>
                <p className="text-sm text-gray-800/70">
                  ปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
                </p>
                <div className="mt-3 text-xs text-blue-600 font-semibold">
                  ✓ ตรวจสอบแล้ว 2024
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                <Lock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">PCI DSS Level 1</h3>
                <p className="text-sm text-gray-800/70">
                  มาตรฐานความปลอดภัยข้อมูลบัตรเครดิต
                </p>
                <div className="mt-3 text-xs text-green-600 font-semibold">
                  ✓ Certified 2024
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
                <Scale className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">ISO 27001</h3>
                <p className="text-sm text-gray-800/70">
                  มาตรฐานการจัดการความมั่นคงปลอดภัยสารสนเทศ
                </p>
                <div className="mt-3 text-xs text-purple-600 font-semibold">
                  ✓ In Progress
                </div>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                  จดทะเบียน VAT
                </h4>
                <p className="text-sm text-gray-800/70">
                  เลขประจำตัวผู้เสียภาษีมูลค่าเพิ่ม: 0105566012345
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                  ทะเบียนพาณิชย์อิเล็กทรอนิกส์
                </h4>
                <p className="text-sm text-gray-800/70">
                  ปฏิบัติตาม พ.ร.บ. ธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. 2544
                </p>
              </div>
            </div>
          </div>

          {/* How We Protect You */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-amber-600" />
              วิธีที่เราปกป้องคุณ
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Banknote className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    ระบบ Escrow เงินค่ำประกัน
                  </h3>
                  <p className="text-gray-800/70 mb-3">
                    เงินของคุณจะถูกเก็บไว้ในบัญชี Escrow (บัญชีเงินค่ำประกัน) ที่ <strong>ธนาคารกสิกรไทย</strong> 
                    และจะถูกปลดให้พาร์ทเนอร์เมื่อบริการเสร็จสมบูรณ์และคุณยืนยันความพึงพอใจแล้วเท่านั้น
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    <p className="text-blue-800">
                      📋 <strong>เลขที่บัญชี Escrow:</strong> 123-4-56789-0 (ธนาคารกสิกรไทย สาขาสีลม)<br />
                      💰 <strong>วงเงินคุ้มครอง:</strong> สูงสุด 5,000,000 บาทต่อรายการ
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    การตรวจสอบพาร์ทเนอร์ 48 ข้อ
                  </h3>
                  <p className="text-gray-800/70 mb-3">
                    ทุกพาร์ทเนอร์ต้องผ่านการตรวจสอบที่เข้มงวด ครอบคลุม:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-800/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>ตรวจสอบเอกสารทางธุรกิจ (ทะเบียนการค้า, ใบอนุญาต, Tax ID)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>ตรวจสอบประวัติและผลงาน (Portfolio Review โดยผู้เชี่ยวชาญ)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>ตรวจสอบข้อมูลทางการเงิน (บัญชีธนาคาร, ประวัติภาษี)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>สัมภาษณ์และทดสอบความเข้าใจวัฒนธรรมไทย</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Mystery Shopping & Quality Audit</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-sm font-semibold text-green-600">
                    ✓ เฉพาะ 8% ของผู้สมัครที่ผ่านการคัดเลือก
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    ความปลอดภัยข้อมูลระดับธนาคาร
                  </h3>
                  <p className="text-gray-800/70 mb-3">
                    ข้อมูลของคุณได้รับการปกป้องด้วยเทคโนโลยีเดียวกับที่ธนาคารใช้:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-800/70">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>SSL/TLS Encryption 256-bit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Two-Factor Authentication (2FA)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Data Encryption at Rest</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Regular Security Audits</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    ทีมช่วยเหลือ 24/7
                  </h3>
                  <p className="text-gray-800/70 mb-3">
                    ทีมสนับสนุนลูกค้าพร้อมช่วยเหลือคุณตลอดเวลา
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="font-semibold text-red-800">📞 โทรศัพท์</p>
                      <p className="text-red-700">+66 2 123 4567</p>
                      <p className="text-xs text-red-600">24 ชม. ทุกวัน</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="font-semibold text-red-800">💬 LINE</p>
                      <p className="text-red-700">@Phithiai</p>
                      <p className="text-xs text-red-600">ตอบภายใน 90 นาที</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance & Protection */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-600" />
              การประกันและการคุ้มครอง
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  ประกันความรับผิดทางวิชาชีพ
                </h3>
                <p className="text-gray-800/70 mb-4">
                  Phithiai มีประกันภัยความรับผิดทางวิชาชีพ (Professional Indemnity) 
                  คุ้มครอง <strong>50 ล้านบาท</strong> จาก <strong>บริษัทประกันไทยวิวัฒน์ จำกัด (มหาชน)</strong>
                </p>
                <p className="text-sm text-blue-700">
                  กรมธรรม์เลขที่: PI-2024-0012345<br />
                  วันหมดอายุ: 31 ธันวาคม 2025
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  ประกันภัยทรัพย์สินอิเล็กทรอนิกส์
                </h3>
                <p className="text-gray-800/70 mb-4">
                  ข้อมูลและระบบของเราได้รับการคุ้มครองด้วยประกัน Cyber Insurance 
                  วงเงิน <strong>20 ล้านบาท</strong>
                </p>
                <p className="text-sm text-green-700">
                  ครอบคลุม: Data Breach, Cyber Attack, System Downtime
                </p>
              </div>
            </div>
          </div>

          {/* Transparency Commitments */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8 text-amber-600" />
              ความมุ่งมั่นด้านความโปร่งใส
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  💰 ค่าธรรมเนียมที่ชัดเจน
                </h3>
                <div className="space-y-2 text-gray-800/70">
                  <p>• ค่าธรรมเนียม Phithiai: <strong>10%</strong> (ไม่มีค่าธรรมเนียมซ่อนเร้น)</p>
                  <p>• ไม่มีค่าสมัครสมาชิก</p>
                  <p>• ไม่มีค่าบริการรายเดือน</p>
                  <p>• แสดงราคาชัดเจนก่อนจอง</p>
                  <p className="text-sm mt-2">
                    <a href="/fees" className="text-amber-600 underline">ดูรายละเอียดค่าธรรมเนียมทั้งหมด →</a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  📊 รีวิวที่แท้จริง
                </h3>
                <div className="space-y-2 text-gray-800/70">
                  <p>• ทุกรีวิวมาจากลูกค้าที่จ่ายเงินจริง</p>
                  <p>• ตรวจสอบ Booking ID ก่อนเผยแพร่</p>
                  <p>• ไม่ลบรีวิวลบ (เว้นแต่มีคำหยาบ)</p>
                  <p>• แสดงทั้งความคิดเห็นดีและไม่ดี</p>
                  <p>• พาร์ทเนอร์ตอบกลับรีวิวได้</p>
                </div>
              </div>
            </div>
          </div>

          {/* Third-party Verification */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-amber-600" />
              การตรวจสอบโดยบุคคลที่สาม
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-800">ตรวจสอบโดย PricewaterhouseCoopers (PwC)</p>
                    <p className="text-sm text-gray-800/60">Financial Audit 2024</p>
                  </div>
                </div>
                <a href="/documents" className="text-sm text-amber-600 underline">ดูรายงาน</a>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-800">ตรวจสอบโดย Deloitte Thailand</p>
                    <p className="text-sm text-gray-800/60">PDPA Compliance Audit 2024</p>
                  </div>
                </div>
                <a href="/documents" className="text-sm text-amber-600 underline">ดูรายงาน</a>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-800">ตรวจสอบโดย Kasikorn Business - Technology Group (KBTG)</p>
                    <p className="text-sm text-gray-800/60">Payment Security Assessment 2024</p>
                  </div>
                </div>
                <a href="/documents" className="text-sm text-amber-600 underline">ดูรายงาน</a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              มีคำถามเกี่ยวกับความปลอดภัย?
            </h3>
            <p className="text-gray-800/70 mb-6">
              ติดต่อทีมความปลอดภัยของเราได้ตลอดเวลา
            </p>
            <div className="flex justify-center gap-4">
              <a href="mailto:security@phithiai.com" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition">
                security@phithiai.com
              </a>
              <a href="tel:+6621234567" className="bg-white text-amber-600 px-6 py-3 rounded-lg border-2 border-amber-600 hover:bg-amber-50 transition">
                +66 2 123 4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

