import React from 'react';
import { Shield, FileText, Users, AlertCircle, CheckCircle, Mail, Phone } from 'lucide-react';

export default function PDPAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4 thai-heading">
              พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)
            </h1>
            <p className="text-lg text-gray-800/80">
              การปฏิบัติตามพ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                ข้อมูลทั่วไป
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>
                  phithiai ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของคุณตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) 
                  เอกสารนี้อธิบายว่าเราเก็บรวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณอย่างไร
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-amber-600" />
                1. ผู้ควบคุมข้อมูลส่วนบุคคล
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p><strong>บริษัท:</strong> บริษัท มาลัย เทคโนโลยี จำกัด</p>
                  <p><strong>ที่อยู่:</strong> 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</p>
                  <p><strong>อีเมล:</strong> dpo@phithiai.app</p>
                  <p><strong>โทรศัพท์:</strong> +66 2 123 4567</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-amber-600" />
                2. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
              </h2>
              <div className="space-y-4 text-gray-800/80">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">2.1 ข้อมูลส่วนบุคคลทั่วไป</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>ชื่อ-นามสกุล</li>
                    <li>อีเมล</li>
                    <li>หมายเลขโทรศัพท์</li>
                    <li>ที่อยู่</li>
                    <li>วันเกิด</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">2.2 ข้อมูลทางการเงิน</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>ข้อมูลการชำระเงิน (ผ่านผู้ให้บริการชำระเงินที่ได้รับการรับรอง)</li>
                    <li>ประวัติการทำธุรกรรม</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">2.3 ข้อมูลการใช้งาน</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>ข้อมูลการเข้าถึงเว็บไซต์ (IP address, เบราว์เซอร์, ระบบปฏิบัติการ)</li>
                    <li>คุกกี้และเทคโนโลยีติดตาม</li>
                    <li>ประวัติการค้นหาและการเรียกดู</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. วัตถุประสงค์ในการเก็บรวบรวมข้อมูล
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เราเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของคุณเพื่อ:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>จัดการและดำเนินการตามสัญญาการให้บริการ</li>
                  <li>ประสานงานระหว่างลูกค้าและพาร์ทเนอร์</li>
                  <li>ประมวลผลการชำระเงินและการทำธุรกรรม</li>
                  <li>ปรับปรุงและพัฒนาบริการ</li>
                  <li>ส่งข้อมูลข่าวสารและข้อเสนอพิเศษ (หากได้รับความยินยอม)</li>
                  <li>ปฏิบัติตามกฎหมายและข้อกำหนด</li>
                  <li>ป้องกันและตรวจจับการฉ้อโกงหรือการใช้งานที่ไม่เหมาะสม</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. ฐานทางกฎหมายในการประมวลผลข้อมูล
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เราประมวลผลข้อมูลส่วนบุคคลของคุณโดยอาศัยฐานทางกฎหมายดังนี้:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>ความยินยอม:</strong> สำหรับการส่งข้อมูลทางการตลาด</li>
                  <li><strong>สัญญา:</strong> เพื่อการให้บริการตามที่ตกลง</li>
                  <li><strong>ประโยชน์โดยชอบด้วยกฎหมาย:</strong> เพื่อปรับปรุงบริการและป้องกันการฉ้อโกง</li>
                  <li><strong>หน้าที่ตามกฎหมาย:</strong> เพื่อปฏิบัติตามกฎหมายและข้อบังคับ</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-amber-600" />
                5. สิทธิของเจ้าของข้อมูล
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>ตาม PDPA คุณมีสิทธิดังต่อไปนี้:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">สิทธิในการเข้าถึง</h4>
                    <p className="text-sm">ขอเข้าถึงและรับสำเนาข้อมูลส่วนบุคคลของคุณ</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">สิทธิในการแก้ไข</h4>
                    <p className="text-sm">แก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">สิทธิในการลบ</h4>
                    <p className="text-sm">ขอให้ลบข้อมูลส่วนบุคคลของคุณ</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">สิทธิในการคัดค้าน</h4>
                    <p className="text-sm">คัดค้านการประมวลผลข้อมูลเพื่อวัตถุประสงค์บางอย่าง</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">สิทธิในการจำกัด</h4>
                    <p className="text-sm">ขอให้จำกัดการประมวลผลข้อมูล</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">สิทธิในการเคลื่อนย้าย</h4>
                    <p className="text-sm">ขอรับข้อมูลในรูปแบบที่สามารถอ่านได้ด้วยเครื่อง</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">สิทธิในการถอนความยินยอม</h4>
                    <p className="text-sm">ถอนความยินยอมที่ให้ไว้ได้ตลอดเวลา</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">สิทธิในการร้องเรียน</h4>
                    <p className="text-sm">ร้องเรียนต่อคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. การเปิดเผยข้อมูลส่วนบุคคล
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เราอาจเปิดเผยข้อมูลส่วนบุคคลของคุณให้กับ:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>พาร์ทเนอร์ที่ให้บริการแก่คุณ</li>
                  <li>ผู้ให้บริการชำระเงิน</li>
                  <li>ผู้ให้บริการโครงสร้างพื้นฐานทางเทคนิค</li>
                  <li>บุคคลที่สามที่ได้รับความยินยอมจากคุณ</li>
                  <li>หน่วยงานราชการตามที่กฎหมายกำหนด</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. การโอนข้อมูลไปต่างประเทศ
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>
                  ในกรณีที่จำเป็นต้องโอนข้อมูลส่วนบุคคลของคุณไปยังต่างประเทศ เราจะดำเนินการตามข้อกำหนดของ PDPA 
                  รวมถึงการขอความยินยอมจากคุณและการใช้มาตรการคุ้มครองที่เหมาะสม เช่น Standard Contractual Clauses
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. ระยะเวลาการเก็บรักษาข้อมูล
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เราจะเก็บรักษาข้อมูลส่วนบุคคลของคุณตามระยะเวลาที่จำเป็นเพื่อบรรลุวัตถุประสงค์หรือตามที่กฎหมายกำหนด:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ข้อมูลบัญชี: ตลอดระยะเวลาที่บัญชีใช้งาน + 10 ปี</li>
                  <li>ข้อมูลการทำธุรกรรม: 10 ปี (ตามกฎหมายภาษีอากร)</li>
                  <li>ข้อมูลการตลาด: จนกว่าจะถอนความยินยอม</li>
                  <li>บันทึกการติดต่อ: 5 ปี</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. มาตรการรักษาความมั่นคงปลอดภัย
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เราใช้มาตรการรักษาความมั่นคงปลอดภัยทางเทคนิคและองค์กรที่เหมาะสม รวมถึง:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>การเข้ารหัสข้อมูล (SSL/TLS)</li>
                  <li>การควบคุมการเข้าถึงข้อมูล</li>
                  <li>การสำรองข้อมูลเป็นประจำ</li>
                  <li>การฝึกอบรมพนักงานเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                10. การแจ้งเหตุละเมิดข้อมูลส่วนบุคคล
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>
                  ในกรณีที่เกิดเหตุละเมิดข้อมูลส่วนบุคคลที่อาจมีความเสี่ยงสูงต่อสิทธิและเสรีภาพของคุณ 
                  เราจะแจ้งให้คุณและคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลทราบภายใน 72 ชั่วโมง
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                11. การติดต่อและการใช้สิทธิ
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>หากคุณต้องการใช้สิทธิหรือมีคำถามเกี่ยวกับ PDPA กรุณาติดต่อ:</p>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)</p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <strong>อีเมล:</strong> dpo@phithiai.app
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <strong>โทรศัพท์:</strong> +66 2 123 4567
                  </p>
                  <p className="mt-2">
                    <strong>ที่อยู่:</strong> 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110
                  </p>
                </div>
                <p className="text-sm mt-4">
                  เราจะพิจารณาและตอบกลับคำขอของคุณภายใน 30 วัน หากต้องการเวลาเพิ่มเติม เราจะแจ้งให้คุณทราบพร้อมเหตุผล
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                12. การแก้ไขนโยบาย
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>
                  เราอาจปรับปรุงนโยบาย PDPA นี้เป็นครั้งคราว การเปลี่ยนแปลงที่สำคัญจะมีการแจ้งให้คุณทราบ 
                  ผ่านอีเมลหรือประกาศบนเว็บไซต์อย่างน้อย 30 วันก่อนที่จะมีผลบังคับใช้
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

