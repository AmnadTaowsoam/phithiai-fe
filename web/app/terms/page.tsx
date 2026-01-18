import React from 'react';
import { FileText, Users, CreditCard, AlertCircle, Scale, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4 thai-heading">
              ข้อกำหนดการให้บริการ
            </h1>
            <p className="text-lg text-gray-600">
              อัปเดตล่าสุด: 10 มกราคม 2568
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-amber-600" />
                1. การยอมรับข้อกำหนด
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>ยินดีต้อนรับสู่ Phithiai การเข้าถึงหรือใช้บริการของเราถือว่าคุณยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดการให้บริการนี้ หากคุณไม่เห็นด้วยกับข้อกำหนดใดๆ กรุณาหยุดการใช้บริการของเราทันที</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-amber-600" />
                2. บัญชีผู้ใช้
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เพื่อใช้บริการบางอย่าง คุณต้องสร้างบัญชีผู้ใช้ คุณรับผิดชอบ:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>การรักษาความลับของรหัสผ่านและข้อมูลบัญชี</li>
                  <li>กิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ</li>
                  <li>การแจ้งเราทันทีหากมีการใช้บัญชีโดยไม่ได้รับอนุญาต</li>
                  <li>การให้ข้อมูลที่ถูกต้องและเป็นปัจจุบัน</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-amber-600" />
                3. การชำระเงินและการคืนเงิน
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <h3 className="font-semibold text-gray-800 mt-4">3.1 ราคาและการชำระเงิน</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ราคาทั้งหมดแสดงเป็นสกุลเงินบาทไทย (THB) <strong>รวมภาษีมูลค่าเพิ่ม (ถ้ามี)</strong></li>
                  <li>การชำระเงินต้องดำเนินการผ่านช่องทางที่กำหนดในแพลตฟอร์ม</li>
                  <li>เราใช้ระบบ Escrow เพื่อปกป้องทั้งลูกค้าและพาร์ทเนอร์</li>
                  <li>ค่าธรรมเนียมบริการ Phithiai คิดเป็น <strong>10% ของมูลค่าการจอง</strong> (ไม่รวม VAT)</li>
                  <li>ราคาที่แสดงเป็น &quot;ราคาเริ่มต้น&quot; เป็นข้อมูลอ้างอิงเท่านั้น ราคาจริงอาจแตกต่างตามรายละเอียดงาน</li>
                </ul>

                <h3 className="font-semibold text-gray-800 mt-4">3.2 นโยบายการคืนเงิน</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>การยกเลิกมากกว่า 30 วันก่อนงาน: คืนเงิน 100%</li>
                  <li>การยกเลิก 15-30 วันก่อนงาน: คืนเงิน 50%</li>
                  <li>การยกเลิกน้อยกว่า 15 วันก่อนงาน: ไม่คืนเงิน</li>
                  <li>กรณีพิเศษจะพิจารณาเป็นกรณีๆ ไป</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-amber-600" />
                4. ความรับผิดชอบของผู้ใช้
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>ในการใช้บริการของเรา คุณตกลงว่าจะ:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้องทั้งหมด</li>
                  <li>ไม่ใช้บริการเพื่อวัตถุประสงค์ที่ผิดกฎหมายหรือไม่ได้รับอนุญาต</li>
                  <li>ไม่ละเมิดสิทธิทรัพย์สินทางปัญญาของผู้อื่น</li>
                  <li>ไม่เผยแพร่เนื้อหาที่ไม่เหมาะสม หมิ่นประมาท หรือก่อกวน</li>
                  <li>ไม่แทรกแซงหรือขัดขวางการทำงานของแพลตฟอร์ม</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. บทบาทของ Phithiai
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>Phithiai ทำหน้าที่เป็นแพลตฟอร์มเชื่อมต่อระหว่างลูกค้าและพาร์ทเนอร์:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>เราไม่ได้เป็นผู้ให้บริการโดยตรง แต่เป็นตัวกลางในการเชื่อมต่อ</li>
                  <li>เราคัดกรองและตรวจสอบพาร์ทเนอร์ตามมาตรฐานของเรา</li>
                  <li>เราไม่รับประกันคุณภาพหรือผลลัพธ์ของบริการที่พาร์ทเนอร์ให้</li>
                  <li>ความรับผิดชอบหลักในการให้บริการอยู่ที่พาร์ทเนอร์</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                6. การจำกัดความรับผิด
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>Phithiai และพันธมิตรจะไม่รับผิดชอบต่อ:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ความเสียหายทางอ้อม ความเสียหายพิเศษ หรือความเสียหายที่เกิดขึ้นตามมา</li>
                  <li>การสูญเสียข้อมูล ผลกำไร หรือรายได้</li>
                  <li>การหยุดชะงักของธุรกิจหรือการใช้งาน</li>
                  <li>ข้อผิดพลาดหรือการละเว้นในเนื้อหาที่พาร์ทเนอร์ให้</li>
                </ul>
                <p className="mt-3">
                  ความรับผิดรวมของเราจะไม่เกินจำนวนเงินที่คุณชำระให้เราในช่วง 12 เดือนที่ผ่านมา
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. ภาษีและใบกำกับภาษี
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <h3 className="font-semibold text-gray-800">7.1 ใบกำกับภาษี</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Phithiai</strong> จะออกใบกำกับภาษีสำหรับ<strong>ค่าธรรมเนียมบริการ</strong> (10%) เท่านั้น</li>
                  <li><strong>พาร์ทเนอร์</strong>เป็นผู้ออกใบกำกับภาษีสำหรับ<strong>ค่าบริการ</strong>ให้ลูกค้าโดยตรง</li>
                  <li>หากพาร์ทเนอร์ไม่ได้จดทะเบียน VAT พาร์ทเนอร์ไม่สามารถออกใบกำกับภาษีได้</li>
                  <li>ลูกค้าควรสอบถามและยืนยันเรื่องใบกำกับภาษีกับพาร์ทเนอร์ก่อนทำสัญญา</li>
                </ul>

                <h3 className="font-semibold text-gray-800 mt-4">7.2 ภาระภาษี</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>พาร์ทเนอร์รับผิดชอบภาษีจากรายได้ของตนเอง</li>
                  <li>Phithiai จะหัก ณ ที่จ่าย (Withholding Tax) ตามที่กฎหมายกำหนด (ถ้ามี)</li>
                  <li>พาร์ทเนอร์ต้องปฏิบัติตามกฎหมายภาษีอากรของประเทศไทย</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. ทรัพย์สินทางปัญญา
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เนื้อหาทั้งหมดบนแพลตฟอร์ม รวมถึงข้อความ กราฟิก โลโก้ รูปภาพ และซอฟต์แวร์ เป็นทรัพย์สินของ Phithiai หรือผู้อนุญาต และได้รับการคุ้มครองโดยกฎหมายลิขสิทธิ์และทรัพย์สินทางปัญญา</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. การระงับและการยกเลิกบัญชี
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เราสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีของคุณโดยไม่ต้องแจ้งให้ทราบล่วงหน้า หากคุณละเมิดข้อกำหนดนี้หรือมีพฤติกรรมที่ไม่เหมาะสม คุณสามารถยกเลิกบัญชีของคุณได้ตลอดเวลาโดยติดต่อฝ่ายสนับสนุนลูกค้า</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                10. การแก้ไขข้อกำหนด
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เราอาจแก้ไขข้อกำหนดการให้บริการนี้เป็นครั้งคราว การเปลี่ยนแปลงจะมีผลทันทีเมื่อเผยแพร่บนเว็บไซต์ การใช้บริการต่อไปหลังจากการเปลี่ยนแปลงถือว่าคุณยอมรับข้อกำหนดที่แก้ไขแล้ว</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                11. กฎหมายที่ใช้บังคับ
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>ข้อกำหนดนี้อยู่ภายใต้และตีความตามกฎหมายไทย ข้อพิพาทใดๆ จะอยู่ภายใต้เขตอำนาจของศาลไทย</p>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                12. ติดต่อเรา
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>หากคุณมีคำถามเกี่ยวกับข้อกำหนดการให้บริการนี้ กรุณาติดต่อเราที่:</p>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p><strong>อีเมล:</strong> legal@phithiai.com</p>
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

