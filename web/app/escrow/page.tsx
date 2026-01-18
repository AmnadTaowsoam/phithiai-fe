import React from 'react';
import { Shield, Lock, CheckCircle, AlertCircle, DollarSign, FileCheck, Users, Clock, ArrowRight } from 'lucide-react';

export default function EscrowPage() {
  const steps = [
    {
      number: '01',
      title: 'คุณจองและชำระเงิน',
      description: 'เมื่อคุณยืนยันการจองและชำระเงิน เงินทั้งหมด (ค่าบริการ + ค่าธรรมเนียม malAI) จะถูกโอนเข้าบัญชี Escrow ที่ธนาคารกสิกรไทย',
      details: [
        'เงินจะไม่ถูกโอนให้พาร์ทเนอร์ทันที',
        'คุณได้รับใบเสร็จและการยืนยันทันที',
        'สัญญาถูกสร้างและส่งให้ทั้งสองฝ่าย'
      ],
      icon: DollarSign,
      color: 'blue'
    },
    {
      number: '02',
      title: 'เงินถูกเก็บไว้อย่างปลอดภัย',
      description: 'เงินของคุณจะถูกเก็บไว้ในบัญชี Escrow แยกต่างหาก ไม่สามารถนำไปใช้ในกิจการของ malAI หรือพาร์ทเนอร์ได้',
      details: [
        'บัญชี Escrow ที่ธนาคารกสิกรไทย สาขาสีลม',
        'เลขที่บัญชี: 123-4-56789-0',
        'ตรวจสอบได้ตลอดเวลา',
        'คุ้มครองโดยกฎหมาย'
      ],
      icon: Lock,
      color: 'green'
    },
    {
      number: '03',
      title: 'พาร์ทเนอร์ให้บริการ',
      description: 'พาร์ทเนอร์ดำเนินการให้บริการตามสัญญา ในระหว่างนี้เงินยังคงอยู่ใน Escrow อย่างปลอดภัย',
      details: [
        'คุณสามารถติดตามสถานะได้ real-time',
        'แจ้งปัญหาได้ทันทีหากมีอะไรผิดปกติ',
        'ทีม malAI คอยตรวจสอบและช่วยเหลือ'
      ],
      icon: Users,
      color: 'purple'
    },
    {
      number: '04',
      title: 'คุณยืนยันความพึงพอใจ',
      description: 'หลังงานเสร็จสิ้น คุณมีเวลา 14 วันในการตรวจสอบและยืนยันว่าบริการเป็นไปตามสัญญา',
      details: [
        'ตรวจสอบคุณภาพงาน',
        'ยืนยันความพึงพอใจผ่านระบบ',
        'หรือระบบจะปลดเงินอัตโนมัติหลัง 14 วัน (หากไม่มีข้อร้องเรียน)'
      ],
      icon: CheckCircle,
      color: 'amber'
    },
    {
      number: '05',
      title: 'เงินถูกปลดให้พาร์ทเนอร์',
      description: 'เมื่อคุณยืนยันความพึงพอใจหรือพ้นระยะเวลา 14 วัน เงินจะถูกโอนให้พาร์ทเนอร์ (หัก ณ ที่จ่ายตามกฎหมาย)',
      details: [
        'พาร์ทเนอร์ได้รับเงิน 90% ของค่าบริการ',
        'malAI ได้รับค่าธรรมเนียม 10%',
        'ออกใบเสร็จ/ใบกำกับภาษีให้ทั้งสองฝ่าย'
      ],
      icon: FileCheck,
      color: 'green'
    }
  ];

  const protectionScenarios = [
    {
      scenario: 'พาร์ทเนอร์ไม่มาทำงาน',
      action: 'เงินถูกคืนให้คุณ 100%',
      timeline: 'ภายใน 3 วันทำการ',
      color: 'red'
    },
    {
      scenario: 'งานไม่ตรงตามสัญญา',
      action: 'ทีม malAI ไกล่เกลี่ย และคืนเงินตามส่วน',
      timeline: 'ภายใน 14 วันหลังร้องเรียน',
      color: 'orange'
    },
    {
      scenario: 'ต้องการยกเลิกล่วงหน้า',
      action: 'คืนเงินตามนโยบาย (100%, 50%, หรือ 0%)',
      timeline: 'ขึ้นอยู่กับระยะเวลาที่ยกเลิก',
      color: 'blue'
    },
    {
      scenario: 'เกิด Force Majeure',
      action: 'คืนเงิน 100% หรือเลื่อนงาน',
      timeline: 'เจรจาร่วมกับพาร์ทเนอร์',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <Shield className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="font-display text-5xl md:text-6xl text-gray-800 mb-6 thai-heading">
              ระบบ Escrow ทำงานอย่างไร?
            </h1>
            <p className="text-xl text-gray-800/80 max-w-3xl mx-auto leading-relaxed">
              เงินของคุณจะถูกเก็บไว้อย่างปลอดภัยในบัญชีค่ำประกัน 
              และจะถูกปลดให้พาร์ทเนอร์เมื่อบริการเสร็จสมบูรณ์เท่านั้น
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ปลอดภัย 100%</h3>
              <p className="text-gray-800/70 text-sm">
                เงินเก็บที่ธนาคารกสิกรไทย ไม่ผ่านมือใคร
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">โปร่งใส</h3>
              <p className="text-gray-800/70 text-sm">
                ตรวจสอบสถานะเงินได้ตลอดเวลา
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">คุ้มครอง</h3>
              <p className="text-gray-800/70 text-sm">
                หากมีปัญหา เงินคืนเต็มจำนวน
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
              5 ขั้นตอนการทำงานของ Escrow
            </h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 to-amber-200 -mb-8" />
                  )}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center text-white font-bold shadow-lg`}>
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-start gap-4 mb-4">
                        <step.icon className={`w-8 h-8 text-${step.color}-600 flex-shrink-0`} />
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                          <p className="text-gray-800/70 mb-4">{step.description}</p>
                          <ul className="space-y-2">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-800/70">
                                <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protection Scenarios */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-amber-600" />
              Escrow ปกป้องคุณในทุกสถานการณ์
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {protectionScenarios.map((item, index) => (
                <div key={index} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 p-6 rounded-xl border-2 border-${item.color}-200`}>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <AlertCircle className={`w-5 h-5 text-${item.color}-600`} />
                    {item.scenario}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-800/70">
                      <strong>การดำเนินการ:</strong> {item.action}
                    </p>
                    <p className="text-gray-800/70">
                      <strong>ระยะเวลา:</strong> {item.timeline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              <Lock className="w-8 h-8" />
              บัญชี Escrow อย่างเป็นทางการ
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-sm opacity-75 mb-2">ธนาคาร</p>
                <p className="text-xl font-semibold">ธนาคารกสิกรไทย</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-sm opacity-75 mb-2">สาขา</p>
                <p className="text-xl font-semibold">สีลม (0002)</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-sm opacity-75 mb-2">เลขที่บัญชี</p>
                <p className="text-xl font-semibold">123-4-56789-0</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-sm opacity-75 mb-2">ชื่อบัญชี</p>
                <p className="text-xl font-semibold">malAI Escrow Account</p>
              </div>
            </div>
            <div className="mt-6 bg-white/20 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sm">
                <strong>ข้อมูลสำคัญ:</strong> บัญชีนี้เป็นบัญชีเงินค่ำประกัน (Escrow Account) 
                ที่แยกจากบัญชีธุรกิจของ malAI เงินในบัญชีนี้ไม่สามารถนำไปใช้ในกิจการได้ 
                และถูกตรวจสอบโดย PwC Thailand ทุกไตรมาส
              </p>
            </div>
          </div>

          {/* Timeline Visual */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center gap-3">
              <Clock className="w-8 h-8 text-amber-600" />
              ระยะเวลาการปลดเงิน
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-32 text-right">
                  <span className="text-2xl font-bold text-green-600">0-7 วัน</span>
                </div>
                <div className="flex-1 bg-green-100 p-4 rounded-lg border-l-4 border-green-600">
                  <p className="font-semibold text-green-900">ช่วงให้บริการ</p>
                  <p className="text-sm text-green-700">พาร์ทเนอร์ดำเนินการให้บริการตามสัญญา</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-32 text-right">
                  <span className="text-2xl font-bold text-blue-600">วันที่ 7-21</span>
                </div>
                <div className="flex-1 bg-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
                  <p className="font-semibold text-blue-900">ช่วงตรวจสอบ (14 วัน)</p>
                  <p className="text-sm text-blue-700">คุณตรวจสอบคุณภาพและยืนยันความพึงพอใจ</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-32 text-right">
                  <span className="text-2xl font-bold text-amber-600">วันที่ 21+</span>
                </div>
                <div className="flex-1 bg-amber-100 p-4 rounded-lg border-l-4 border-amber-600">
                  <p className="font-semibold text-amber-900">ปลดเงิน</p>
                  <p className="text-sm text-amber-700">เงินถูกโอนให้พาร์ทเนอร์ (หากไม่มีข้อร้องเรียน)</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              คำถามที่พบบ่อย
            </h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  ทำไมต้องใช้ระบบ Escrow?
                </summary>
                <div className="p-4 text-gray-800/70 text-sm">
                  ระบบ Escrow ปกป้องทั้งลูกค้าและพาร์ทเนอร์ คุณมั่นใจได้ว่าเงินจะไม่หายไป 
                  และพาร์ทเนอร์ก็มั่นใจว่าจะได้เงินเมื่อทำงานเสร็จ ลดความเสี่ยงให้ทั้งสองฝ่าย
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  ถ้าฉันไม่ยืนยันภายใน 14 วัน จะเกิดอะไรขึ้น?
                </summary>
                <div className="p-4 text-gray-800/70 text-sm">
                  หากคุณไม่ได้ยืนยันหรือร้องเรียนภายใน 14 วัน ระบบจะถือว่าคุณพึงพอใจและปลดเงินให้พาร์ทเนอร์อัตโนมัติ 
                  นี่เป็นมาตรฐานสากลเพื่อให้พาร์ทเนอร์ได้รับเงินที่ควรได้
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  ถ้าเกิดข้อพิพาท เงินจะอยู่ที่ไหน?
                </summary>
                <div className="p-4 text-gray-800/70 text-sm">
                  เงินจะยังคงอยู่ในบัญชี Escrow จนกว่าจะมีการไกล่เกลี่ยหรือตัดสินข้อพิพาทเสร็จสิ้น 
                  ทีม malAI จะทำหน้าที่เป็นคนกลางและพิจารณาหลักฐานจากทั้งสองฝ่ายอย่างยุติธรรม
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  มีค่าธรรมเนียมเพิ่มเติมสำหรับ Escrow ไหม?
                </summary>
                <div className="p-4 text-gray-800/70 text-sm">
                  ไม่มีครับ ค่าบริการ Escrow รวมอยู่ในค่าธรรมเนียม malAI 10% แล้ว 
                  ไม่มีค่าธรรมเนียมซ่อนเร้นหรือค่าใช้จ่ายเพิ่มเติมใดๆ
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  ตรวจสอบสถานะเงินในบัญชี Escrow ได้ไหม?
                </summary>
                <div className="p-4 text-gray-800/70 text-sm">
                  ได้ครับ คุณสามารถเข้าดูสถานะเงินของคุณได้ตลอดเวลาผ่านแดชบอร์ดใน malAI Platform 
                  และเราจะส่งการแจ้งเตือนทุกครั้งที่มีการเคลื่อนไหวของเงิน
                </div>
              </details>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              มั่นใจได้ว่าเงินของคุณปลอดภัย
            </h3>
            <p className="text-gray-800/70 mb-6">
              จองบริการกับ malAI วันนี้ พร้อมการคุ้มครองด้วยระบบ Escrow
            </p>
            <div className="flex justify-center gap-4">
              <a href="/vendors" className="bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition font-semibold">
                เริ่มจองเลย
              </a>
              <a href="/trust" className="bg-white text-amber-600 px-8 py-4 rounded-lg border-2 border-amber-600 hover:bg-amber-50 transition font-semibold">
                ดูข้อมูลความปลอดภัย
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

