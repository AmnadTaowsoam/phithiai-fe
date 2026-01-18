import React from 'react';
import { DollarSign, TrendingDown, Shield, Info, CheckCircle, XCircle, Calculator } from 'lucide-react';

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <DollarSign className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4 thai-heading">
              ความโปร่งใสค่าธรรมเนียม
            </h1>
            <p className="text-lg text-gray-800/80 max-w-2xl mx-auto">
              เราเชื่อในความโปร่งใส ไม่มีค่าธรรมเนียมซ่อนเร้น คุณจ่ายเท่าไหร่ รู้ชัดเจนตั้งแต่เริ่มต้น
            </p>
          </div>

          {/* Main Fee Structure */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              ค่าธรรมเนียมบริการ malAI
            </h2>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-8 rounded-xl mb-6">
              <div className="text-center">
                <p className="text-lg mb-2 opacity-90">ค่าธรรมเนียมมาตรฐาน</p>
                <div className="text-6xl font-bold mb-2">10%</div>
                <p className="text-lg opacity-90">ของมูลค่าการจอง (ไม่รวม VAT)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  รวมในค่าธรรมเนียม 10%
                </h3>
                <ul className="space-y-2 text-gray-800/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>การใช้แพลตฟอร์มไม่จำกัด</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Malai Copilot™ AI Assistant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>ระบบ Escrow เงินค่ำประกัน</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>การไกล่เกลี่ยข้อพิพาท</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>ทีมสนับสนุน 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>การประกันภัยครอบคลุม</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>ออกใบกำกับภาษี/ใบเสร็จ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>ระบบติดตามและแจ้งเตือน</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  ไม่มีค่าธรรมเนียมเพิ่มเติม
                </h3>
                <ul className="space-y-2 text-gray-800/70">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>ไม่มีค่าสมัครสมาชิก</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>ไม่มีค่าบริการรายเดือน</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>ไม่มีค่าธรรมเนียมการยกเลิก</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>ไม่มีค่าธรรมเนียมซ่อนเร้น</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>ไม่มีค่าธรรมเนียมการทำธุรกรรม</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>ไม่มีค่าธรรมเนียมการคืนเงิน</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fee Calculator */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-amber-600" />
              ตัวอย่างการคำนวณค่าธรรมเนียม
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3">ตัวอย่างที่ 1: การจองช่างภาพ</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-800/70">ค่าบริการจากพาร์ทเนอร์:</span>
                    <span className="font-semibold">50,000 บาท</span>
                  </div>
                  <div className="flex justify-between text-amber-600">
                    <span>ค่าธรรมเนียม malAI (10%):</span>
                    <span className="font-semibold">5,000 บาท</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>VAT 7% (จากค่าธรรมเนียม):</span>
                    <span className="font-semibold">350 บาท</span>
                  </div>
                  <div className="border-t-2 border-blue-300 pt-2 mt-2 flex justify-between text-lg font-bold">
                    <span>ยอดชำระทั้งหมด:</span>
                    <span className="text-blue-600">55,350 บาท</span>
                  </div>
                </div>
                <p className="text-xs text-gray-800/60 mt-3">
                  * พาร์ทเนอร์ได้รับ 50,000 บาท | malAI ได้รับ 5,350 บาท (รวม VAT)
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3">ตัวอย่างที่ 2: แพ็กเกจจัดงานแต่ง</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-800/70">ค่าบริการจากพาร์ทเนอร์:</span>
                    <span className="font-semibold">500,000 บาท</span>
                  </div>
                  <div className="flex justify-between text-amber-600">
                    <span>ค่าธรรมเนียม malAI (10%):</span>
                    <span className="font-semibold">50,000 บาท</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>VAT 7% (จากค่าธรรมเนียม):</span>
                    <span className="font-semibold">3,500 บาท</span>
                  </div>
                  <div className="border-t-2 border-purple-300 pt-2 mt-2 flex justify-between text-lg font-bold">
                    <span>ยอดชำระทั้งหมด:</span>
                    <span className="text-purple-600">553,500 บาท</span>
                  </div>
                </div>
                <p className="text-xs text-gray-800/60 mt-3">
                  * พาร์ทเนอร์ได้รับ 500,000 บาท | malAI ได้รับ 53,500 บาท (รวม VAT)
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              วิธีการชำระเงิน
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">💳</div>
                <h3 className="font-semibold text-gray-800 mb-1">บัตรเครดิต/เดบิต</h3>
                <p className="text-sm text-gray-800/70">Visa, Mastercard, JCB</p>
                <p className="text-xs text-green-600 mt-2">✓ ไม่มีค่าธรรมเนียมเพิ่ม</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h3 className="font-semibold text-gray-800 mb-1">โอนเงินธนาคาร</h3>
                <p className="text-sm text-gray-800/70">ทุกธนาคารในไทย</p>
                <p className="text-xs text-green-600 mt-2">✓ ไม่มีค่าธรรมเนียมเพิ่ม</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-semibold text-gray-800 mb-1">QR Payment</h3>
                <p className="text-sm text-gray-800/70">PromptPay</p>
                <p className="text-xs text-green-600 mt-2">✓ ไม่มีค่าธรรมเนียมเพิ่ม</p>
              </div>
            </div>
          </div>

          {/* Tax Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-amber-600" />
              ข้อมูลภาษีและใบกำกับภาษี
            </h2>
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">ใบกำกับภาษีจาก malAI</h3>
                <p className="text-sm text-gray-800/70">
                  คุณจะได้รับใบกำกับภาษีจาก malAI สำหรับ<strong>ค่าธรรมเนียมบริการ 10%</strong> เท่านั้น 
                  (เช่น ในตัวอย่างที่ 1: ใบกำกับภาษีจำนวน 5,350 บาท รวม VAT)
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">ใบกำกับภาษีจากพาร์ทเนอร์</h3>
                <p className="text-sm text-gray-800/70">
                  สำหรับ<strong>ค่าบริการ</strong> คุณต้องขอใบกำกับภาษีจากพาร์ทเนอร์โดยตรง 
                  (เช่น ในตัวอย่างที่ 1: ใบกำกับภาษีจากช่างภาพจำนวน 50,000 บาท)<br />
                  <strong>หมายเหตุ:</strong> หากพาร์ทเนอร์ไม่ได้จดทะเบียน VAT จะไม่สามารถออกใบกำกับภาษีได้
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">การหักภาษี ณ ที่จ่าย</h3>
                <p className="text-sm text-gray-800/70">
                  หากคุณเป็นนิติบุคคลและต้องการหักภาษี ณ ที่จ่าย กรุณาแจ้งล่วงหน้า 
                  เราจะส่งหนังสือรับรองการหักภาษี ณ ที่จ่ายให้คุณภายใน 7 วันทำการ
                </p>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-amber-600" />
              นโยบายการคืนเงิน
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">ยกเลิกมากกว่า 30 วันก่อนงาน</p>
                  <p className="text-sm text-gray-800/70">คืนเงิน 100% (รวมค่าธรรมเนียม malAI)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">ยกเลิก 15-30 วันก่อนงาน</p>
                  <p className="text-sm text-gray-800/70">คืนเงิน 50% (คืนค่าธรรมเนียม malAI 100%)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">ยกเลิกน้อยกว่า 15 วันก่อนงาน</p>
                  <p className="text-sm text-gray-800/70">ไม่คืนเงิน (ตามนโยบายของพาร์ทเนอร์)</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 ข้อควรทราบ:</strong> หากพาร์ทเนอร์ไม่สามารถให้บริการได้ 
                  คุณจะได้รับเงินคืน 100% (รวมค่าธรรมเนียม malAI) ผ่านระบบ Escrow ภายใน 7 วันทำการ
                </p>
              </div>
            </div>
          </div>

          {/* Escrow Protection */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <Shield className="w-12 h-12 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  🔒 ระบบ Escrow ปกป้องเงินของคุณ
                </h2>
                <p className="mb-4 opacity-90">
                  เงินทั้งหมดที่คุณจ่าย (ค่าบริการ + ค่าธรรมเนียม) จะถูกเก็บไว้ใน<strong>บัญชี Escrow 
                  ที่ธนาคารกสิกรไทย</strong> และจะถูกปลดให้พาร์ทเนอร์เมื่อ:
                </p>
                <ul className="space-y-2 opacity-90">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>บริการเสร็จสมบูรณ์ตามสัญญา</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>คุณยืนยันความพึงพอใจ (หรือพ้นระยะเวลาร้องเรียน 14 วัน)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>ไม่มีข้อพิพาทที่ค้างอยู่</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm opacity-75">
                  หากเกิดปัญหา เงินจะยังคงอยู่ใน Escrow จนกว่าจะได้ข้อสรุป
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              คำถามที่พบบ่อย
            </h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  ทำไมต้องจ่ายค่าธรรมเนียม malAI 10%?
                </summary>
                <div className="p-4 text-gray-800/70 text-sm">
                  ค่าธรรมเนียม 10% ครอบคลุมบริการครบวงจร: การคัดสรรพาร์ทเนอร์คุณภาพ, ระบบ Escrow, 
                  ทีมสนับสนุน 24/7, การไกล่เกลี่ยข้อพิพาท, AI Assistant, และการประกันภัย 
                  เปรียบเทียบกับตัวแทนทั่วไปที่คิด 15-25% เราถูกกว่าและให้บริการที่มีมูลค่ามากกว่า
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  หากฉันยกเลิก ได้เงินคืนไหม?
                </summary>
                <div className="p-4 text-gray-800/70 text-sm">
                  ได้ครับ หากยกเลิกมากกว่า 30 วันก่อนงาน คุณจะได้เงินคืน 100% 
                  หากยกเลิก 15-30 วันก่อนงาน จะได้เงินคืน 50% (แต่ได้ค่าธรรมเนียม malAI คืน 100%) 
                  รายละเอียดในนโยบายการคืนเงินด้านบน
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  ฉันจะได้ใบกำกับภาษีไหม?
                </summary>
                <div className="p-4 text-gray-800/70 text-sm">
                  คุณจะได้ใบกำกับภาษี 2 ใบ: (1) จาก malAI สำหรับค่าธรรมเนียม 10%, 
                  (2) จากพาร์ทเนอร์สำหรับค่าบริการ กรุณาแจ้งพาร์ทเนอร์หากต้องการใบกำกับภาษีสำหรับค่าบริการ
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  ถ้าพาร์ทเนอร์ทำงานไม่ดี เงินจะคืนไหม?
                </summary>
                <div className="p-4 text-gray-800/70 text-sm">
                  ได้ครับ เงินจะยังคงอยู่ในระบบ Escrow จนกว่าคุณจะยืนยันความพึงพอใจ 
                  หากมีปัญหา กรุณาแจ้งภายใน 14 วันหลังงาน ทีมของเราจะไกล่เกลี่ย 
                  หากพบว่าพาร์ทเนอร์ผิดสัญญา คุณจะได้เงินคืนตามส่วน
                </div>
              </details>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center mt-12">
            <p className="text-gray-800/70 mb-4">
              มีคำถามเกี่ยวกับค่าธรรมเนียม?
            </p>
            <a href="/contact" className="text-amber-600 hover:underline font-semibold">
              ติดต่อทีมการเงินของเรา →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

