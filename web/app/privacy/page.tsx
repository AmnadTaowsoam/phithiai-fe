import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, FileText } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4 thai-heading">
              นโยบายความเป็นส่วนตัว
            </h1>
            <p className="text-lg text-gray-600">
              อัปเดตล่าสุด: 10 มกราคม 2568
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-amber-600" />
                1. ข้อมูลที่เราเก็บรวบรวม
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>เราเก็บรวบรวมข้อมูลส่วนบุคคลที่คุณให้แก่เราโดยตรง เช่น:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ชื่อ-นามสกุล, อีเมล, หมายเลขโทรศัพท์</li>
                  <li>ข้อมูลการชำระเงินและการทำธุรกรรม</li>
                  <li>ข้อมูลเกี่ยวกับงานพิธีและการจอง</li>
                  <li>ข้อมูลการสื่อสารระหว่างคุณกับพาร์ทเนอร์</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-amber-600" />
                2. วิธีการใช้ข้อมูล
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>เราใช้ข้อมูลของคุณเพื่อ:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>จัดการและดำเนินการตามคำขอการจองและบริการของคุณ</li>
                  <li>ประสานงานระหว่างคุณและพาร์ทเนอร์ของเร า</li>
                  <li>ปรับปรุงและพัฒนาบริการของเรา</li>
                  <li>ส่งข้อมูลข่าวสารและข้อเสนอพิเศษ (หากคุณยินยอม)</li>
                  <li>ปฏิบัติตามกฎหมายและข้อกำหนดทางกฎหมาย</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-amber-600" />
                3. การปกป้องข้อมูล
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>เราใช้มาตรการรักษาความปลอดภัยทางเทคนิคและองค์กรเพื่อปกป้องข้อมูลส่วนบุคคลของคุณ รวมถึง:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>การเข้ารหัสข้อมูล (SSL/TLS)</li>
                  <li>การควบคุมการเข้าถึงข้อมูลอย่างเข้มงวด</li>
                  <li>การสำรองข้อมูลเป็นประจำ</li>
                  <li>การตรวจสอบและทดสอบระบบความปลอดภัย</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-amber-600" />
                4. สิทธิของคุณ
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>คุณมีสิทธิในการ:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>เข้าถึงและขอสำเนาข้อมูลส่วนบุคคลของคุณ</li>
                  <li>แก้ไขหรืออัปเดตข้อมูลของคุณ</li>
                  <li>ขอให้ลบข้อมูลส่วนบุคคลของคุณ</li>
                  <li>คัดค้านการประมวลผลข้อมูลของคุณ</li>
                  <li>ขอให้จำกัดการประมวลผลข้อมูล</li>
                  <li>ถอนความยินยอมที่ให้ไว้</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-amber-600" />
                5. การแบ่งปันข้อมูล
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>เราอาจแบ่งปันข้อมูลของคุณกับ:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>พาร์ทเนอร์ที่ให้บริการแก่คุณ</li>
                  <li>ผู้ให้บริการชำระเงินและการทำธุรกรรม</li>
                  <li>ผู้ให้บริการโครงสร้างพื้นฐานทางเทคนิค</li>
                  <li>หน่วยงานราชการตามที่กฎหมายกำหนด</li>
                </ul>
                <p className="mt-3">
                  เราจะไม่ขายหรือเผยแพร่ข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาดโดยไม่ได้รับความยินยอมจากคุณ
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. คุกกี้และเทคโนโลยีติดตาม
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อปรับปรุงประสบการณ์การใช้งานของคุณ วิเคราะห์การใช้งาน และส่งมอบเนื้อหาที่เกี่ยวข้อง คุณสามารถจัดการการตั้งค่าคุกกี้ผ่านเบราว์เซอร์ของคุณได้</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. การเปลี่ยนแปลงนโยบาย
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว การเปลี่ยนแปลงที่สำคัญจะมีการแจ้งให้คุณทราบผ่านอีเมลหรือประกาศบนเว็บไซต์</p>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. ติดต่อเรา
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ หรือต้องการใช้สิทธิของคุณ กรุณาติดต่อเราที่:</p>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p><strong>อีเมล:</strong> privacy@phithiai.com</p>
                  <p><strong>โทรศัพท์:</strong> +66 2 123 4567</p>
                  <p><strong>ที่อยู่:</strong> 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

