import React from 'react';
import { Shield, Lock, Key, Server, Eye, AlertTriangle, CheckCircle, FileCheck } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Lock className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4 thai-heading">
              ความปลอดภัยและการรักษาความมั่นคง
            </h1>
            <p className="text-lg text-gray-800/80">
              เราให้ความสำคัญกับความปลอดภัยของข้อมูลและธุรกรรมของคุณเป็นอันดับแรก
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-amber-600" />
                1. การเข้ารหัสข้อมูล
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>SSL/TLS Encryption:</strong> ข้อมูลทั้งหมดที่ส่งระหว่างเบราว์เซอร์และเซิร์ฟเวอร์ของเราได้รับการเข้ารหัสด้วย SSL/TLS 256-bit</li>
                  <li><strong>การเข้ารหัสฐานข้อมูล:</strong> ข้อมูลส่วนบุคคลที่ละเอียดอ่อนถูกเข้ารหัสก่อนบันทึกในฐานข้อมูล</li>
                  <li><strong>การเข้ารหัสรหัสผ่าน:</strong> ใช้ bcrypt hashing algorithm สำหรับการจัดเก็บรหัสผ่าน</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Key className="w-6 h-6 text-amber-600" />
                2. การควบคุมการเข้าถึง
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>การตรวจสอบสิทธิ์แบบหลายขั้นตอน (MFA):</strong> รองรับการใช้ MFA สำหรับความปลอดภัยเพิ่มเติม</li>
                  <li><strong>Role-Based Access Control (RBAC):</strong> จำกัดการเข้าถึงข้อมูลตามบทบาทและหน้าที่</li>
                  <li><strong>Session Management:</strong> ระบบจัดการเซสชันที่ปลอดภัยพร้อมการหมดอายุอัตโนมัติ</li>
                  <li><strong>IP Whitelisting:</strong> สำหรับบัญชีผู้ดูแลระบบและพาร์ทเนอร์</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Server className="w-6 h-6 text-amber-600" />
                3. โครงสร้างพื้นฐาน
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Cloud Infrastructure:</strong> ใช้บริการ cloud ชั้นนำที่ได้รับการรับรองมาตรฐานสากล (ISO 27001, SOC 2)</li>
                  <li><strong>การสำรองข้อมูล:</strong> สำรองข้อมูลอัตโนมัติทุกวันและเก็บไว้หลายที่</li>
                  <li><strong>Disaster Recovery:</strong> แผนการกู้คืนระบบเมื่อเกิดเหตุฉุกเฉิน</li>
                  <li><strong>Firewall & DDoS Protection:</strong> ป้องกันการโจมตีจากภายนอก</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-amber-600" />
                4. การตรวจสอบและการติดตาม
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>24/7 Monitoring:</strong> ติดตามระบบตลอด 24 ชั่วโมงเพื่อตรวจจับภัยคุกคาม</li>
                  <li><strong>Audit Logs:</strong> บันทึกกิจกรรมที่สำคัญทั้งหมดเพื่อการตรวจสอบย้อนหลัง</li>
                  <li><strong>Intrusion Detection:</strong> ระบบตรวจจับการบุกรุกอัตโนมัติ</li>
                  <li><strong>Regular Security Audits:</strong> ตรวจสอบความปลอดภัยเป็นประจำโดยผู้เชี่ยวชาญภายนอก</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-amber-600" />
                5. การชำระเงินที่ปลอดภัย
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>PCI DSS Compliance:</strong> ปฏิบัติตามมาตรฐาน PCI DSS สำหรับการประมวลผลบัตรเครดิต</li>
                  <li><strong>Escrow System:</strong> ระบบเก็บเงินค่ำประกันเพื่อปกป้องทั้งลูกค้าและพาร์ทเนอร์</li>
                  <li><strong>ไม่เก็บข้อมูลบัตร:</strong> เราไม่เก็บข้อมูลบัตรเครดิตบนเซิร์ฟเวอร์ของเรา</li>
                  <li><strong>การยืนยันตัวตน:</strong> ใช้ 3D Secure สำหรับการชำระเงินออนไลน์</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-amber-600" />
                6. การตรวจสอบพาร์ทเนอร์
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>เราใช้กระบวนการตรวจสอบ 48 ข้อเพื่อคัดกรองพาร์ทเนอร์:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>การตรวจสอบเอกสารทางธุรกิจและใบอนุญาต</li>
                  <li>การตรวจสอบประวัติและผลงาน</li>
                  <li>การตรวจสอบรีวิวและคำรับรองจากลูกค้า</li>
                  <li>การประเมินคุณภาพและมาตรฐาน</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                7. การรายงานช่องโหว่ด้านความปลอดภัย
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>หากคุณพบช่องโหว่ด้านความปลอดภัย กรุณาแจ้งเราทันทีที่:</p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p><strong>อีเมล:</strong> security@malai.app</p>
                  <p className="mt-2 text-sm">กรุณาอย่าเปิดเผยช่องโหว่สาธารณะก่อนที่เราจะมีโอกาสแก้ไข เราจะตอบกลับภายใน 48 ชั่วโมง</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. มาตรฐานและการรับรอง
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>malAI ปฏิบัติตามมาตรฐานความปลอดภัยระดับสากล:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800">ISO 27001</p>
                    <p className="text-sm">ระบบการจัดการความมั่นคงปลอดภัยสารสนเทศ</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800">PDPA Compliance</p>
                    <p className="text-sm">ปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800">PCI DSS</p>
                    <p className="text-sm">มาตรฐานความปลอดภัยข้อมูลอุตสาหกรรมบัตรชำระเงิน</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800">SOC 2 Type II</p>
                    <p className="text-sm">การตรวจสอบการควบคุมความปลอดภัย</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. ติดต่อทีมความปลอดภัย
              </h2>
              <div className="space-y-3 text-gray-800/80">
                <p>หากคุณมีคำถามเกี่ยวกับความปลอดภัย กรุณาติดต่อทีมของเราที่:</p>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p><strong>อีเมล:</strong> security@malai.app</p>
                  <p><strong>โทรศัพท์ฉุกเฉิน:</strong> +66 2 123 4567 (ตลอด 24 ชั่วโมง)</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

