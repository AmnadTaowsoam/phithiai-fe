import React from 'react';
import { Award, CheckCircle, Eye, FileText, Star, Users, Shield, TrendingUp, Target, AlertCircle } from 'lucide-react';

export default function QualityPage() {
  const categories = [
    {
      title: 'เอกสารและใบอนุญาต (8 ข้อ)',
      icon: FileText,
      color: 'blue',
      checks: [
        'หนังสือรับรองการจดทะเบียนนิติบุคคล (ไม่เกิน 6 เดือน)',
        'ใบอนุญาตประกอบธุรกิจ (ถ้าจำเป็น)',
        'เลขประจำตัวผู้เสียภาษี (Tax ID)',
        'การจดทะเบียนภาษีมูลค่าเพิ่ม (ถ้ามี)',
        'ประกันภัยความรับผิด (แนะนำ)',
        'สำเนาบัตรประชาชนผู้มีอำนาจ',
        'หนังสือมอบอำนาจ (ถ้าจำเป็น)',
        'บัญชีธนาคารในนามธุรกิจ'
      ]
    },
    {
      title: 'ผลงานและประสบการณ์ (10 ข้อ)',
      icon: Award,
      color: 'purple',
      checks: [
        'Portfolio อย่างน้อย 10 งาน',
        'ประสบการณ์อย่างน้อย 2 ปี',
        'รูปภาพผลงานคุณภาพสูง (min 2000px)',
        'Video Showreel (ถ้ามี)',
        'รางวัลหรือการยอมรับ (ถ้ามี)',
        'Case Study อย่างน้อย 3 งาน',
        'Before & After (สำหรับบางประเภท)',
        'ตัวอย่างสัญญา/ใบเสนอราคา',
        'รายชื่อลูกค้าที่โดดเด่น',
        'Testimonials จากลูกค้า'
      ]
    },
    {
      title: 'คุณภาพและมาตรฐาน (10 ข้อ)',
      icon: Star,
      color: 'amber',
      checks: [
        'Mystery Shopping Test (คะแนนขั้นต่ำ 4.5/5)',
        'การตอบกลับเร็ว (ภายใน 6 ชม.)',
        'ความเป็นมืออาชีพในการสื่อสาร',
        'ความรู้ด้านวัฒนธรรมไทย (สอบข้อเขียน)',
        'ความสามารถในการแก้ปัญหา',
        'การจัดการเวลา (On-time Rate > 95%)',
        'คุณภาพอุปกรณ์/เครื่องมือ',
        'ทีมงานสำรอง (Backup Team)',
        'การประกันคุณภาพ (Guarantee)',
        'นโยบายการคืนเงิน/แก้ไข'
      ]
    },
    {
      title: 'ความปลอดภัยและความน่าเชื่อถือ (8 ข้อ)',
      icon: Shield,
      color: 'green',
      checks: [
        'การตรวจสอบประวัติอาชญากรรม',
        'ไม่มีประวัติฟ้องร้อง/ข้อพิพาท',
        'การอ้างอิงจากลูกค้าก่อนหน้า (References)',
        'ประกันภัยความรับผิด (Liability Insurance)',
        'การปฏิบัติตาม PDPA',
        'นโยบายความเป็นส่วนตัว',
        'สัญญามาตรฐาน (ตรวจสอบโดยทนาย)',
        'ระบบชำระเงินที่ปลอดภัย'
      ]
    },
    {
      title: 'การบริการลูกค้า (6 ข้อ)',
      icon: Users,
      color: 'red',
      checks: [
        'ช่องทางติดต่อหลากหลาย (โทร, LINE, อีเมล)',
        'เวลาทำการชัดเจน',
        'ระยะเวลาตอบกลับ < 6 ชม.',
        'Consultation ฟรีก่อนจอง',
        'การติดตามหลังงาน (After-sales)',
        'การจัดการข้อร้องเรียนอย่างมีประสิทธิภาพ'
      ]
    },
    {
      title: 'ราคาและความโปร่งใส (6 ข้อ)',
      icon: TrendingUp,
      color: 'indigo',
      checks: [
        'ราคาชัดเจน ไม่คลุมเครือ',
        'รายการค่าใช้จ่ายละเอียด (Itemized Quote)',
        'ไม่มีค่าธรรมเนียมซ่อนเร้น',
        'เงื่อนไขการชำระเงินชัดเจน',
        'นโยบายการยกเลิก/คืนเงินชัดเจน',
        'ราคาสมเหตุสมผล (ไม่สูงหรือต่ำผิดปกติ)'
      ]
    }
  ];

  const verificationProcess = [
    {
      step: '01',
      title: 'สมัครและส่งเอกสาร',
      description: 'พาร์ทเนอร์สมัครผ่านระบบและอัปโหลดเอกสารทั้งหมด',
      duration: '1 วัน'
    },
    {
      step: '02',
      title: 'ตรวจสอบเอกสารเบื้องต้น',
      description: 'ทีมตรวจสอบความครบถ้วนและความถูกต้องของเอกสาร',
      duration: '2-3 วัน'
    },
    {
      step: '03',
      title: 'Portfolio Review',
      description: 'ผู้เชี่ยวชาญประเมินคุณภาพผลงานและประสบการณ์',
      duration: '3-5 วัน'
    },
    {
      step: '04',
      title: 'สัมภาษณ์และทดสอบ',
      description: 'สัมภาษณ์ออนไลน์และทดสอบความรู้วัฒนธรรมไทย',
      duration: '1 วัน'
    },
    {
      step: '05',
      title: 'Mystery Shopping',
      description: 'ทีมปลอมตัวเป็นลูกค้าทดสอบการบริการ',
      duration: '1-2 สัปดาห์'
    },
    {
      step: '06',
      title: 'Reference Check',
      description: 'ติดต่อลูกค้าเก่าเพื่อขอ feedback',
      duration: '3-5 วัน'
    },
    {
      step: '07',
      title: 'Final Review',
      description: 'คณะกรรมการพิจารณาอนุมัติขั้นสุดท้าย',
      duration: '2-3 วัน'
    },
    {
      step: '08',
      title: 'Onboarding',
      description: 'อบรมการใช้งานระบบและนโยบาย malAI',
      duration: '1 วัน'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <Award className="w-20 h-20 text-amber-600 mx-auto mb-6" />
            <h1 className="font-display text-5xl md:text-6xl text-gray-800 mb-6 thai-heading">
              มาตรฐานคุณภาพ 48 ข้อ
            </h1>
            <p className="text-xl text-gray-800/80 max-w-3xl mx-auto leading-relaxed">
              ทุกพาร์ทเนอร์บน malAI ผ่านการตรวจสอบ 48 ข้อที่เข้มงวด 
              เพื่อให้คุณมั่นใจได้ว่าจะได้รับบริการคุณภาพสูงสุด
            </p>
            <div className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-full font-semibold">
              <CheckCircle className="w-5 h-5" />
              <span>เฉพาะ 8% ของผู้สมัครที่ผ่านการคัดเลือก</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-amber-600 mb-2">48</div>
              <p className="text-sm text-gray-800/70">ข้อตรวจสอบ</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">8%</div>
              <p className="text-sm text-gray-800/70">อัตราผ่าน</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">2-4</div>
              <p className="text-sm text-gray-800/70">สัปดาห์กระบวนการ</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">4.8/5</div>
              <p className="text-sm text-gray-800/70">คะแนนเฉลี่ยพาร์ทเนอร์</p>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
              6 หมวดหมู่การตรวจสอบ
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 flex items-center justify-center flex-shrink-0`}>
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {category.checks.map((check, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-800/70">
                        <CheckCircle className={`w-4 h-4 text-${category.color}-600 flex-shrink-0 mt-0.5`} />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Process */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center gap-3">
              <Target className="w-8 h-8 text-amber-600" />
              กระบวนการตรวจสอบ 8 ขั้นตอน
            </h2>
            <div className="space-y-6">
              {verificationProcess.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                      <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-gray-800/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
              <p className="text-sm text-blue-800">
                <strong>⏱️ ระยะเวลารวม:</strong> ประมาณ 2-4 สัปดาห์ 
                (ขึ้นอยู่กับความครบถ้วนของเอกสารและผลการทดสอบ)
              </p>
            </div>
          </div>

          {/* Mystery Shopping */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8" />
              Mystery Shopping Test
            </h2>
            <p className="text-lg opacity-90 mb-6">
              ขั้นตอนที่สำคัญที่สุดในการประเมินพาร์ทเนอร์ ทีมของเราจะปลอมตัวเป็นลูกค้าจริง 
              เพื่อทดสอบคุณภาพการบริการในทุกด้าน
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-semibold mb-3">การสื่อสาร</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• ความเร็วในการตอบกลับ</li>
                  <li>• ความเป็นมืออาชีพ</li>
                  <li>• ความชัดเจนของข้อมูล</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-semibold mb-3">ความรู้</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• ความเข้าใจวัฒนธรรมไทย</li>
                  <li>• คำแนะนำที่เป็นประโยชน์</li>
                  <li>• ความยืดหยุ่น</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-semibold mb-3">ราคาและสัญญา</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• ความโปร่งใสในราคา</li>
                  <li>• เงื่อนไขที่ยุติธรรม</li>
                  <li>• ไม่มีค่าธรรมเนียมซ่อนเร้น</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-white/20 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sm">
                <strong>🎯 เกณฑ์ผ่าน:</strong> คะแนนขั้นต่ำ 4.5/5.0 ในทุกด้าน
              </p>
            </div>
          </div>

          {/* Ongoing Monitoring */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-amber-600" />
              การตรวจสอบอย่างต่อเนื่อง
            </h2>
            <p className="text-gray-800/70 mb-6">
              การผ่านการคัดเลือกเป็นเพียงจุดเริ่มต้น เราติดตามและประเมินพาร์ทเนอร์อย่างต่อเนื่อง:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  รีวิวและคะแนน
                </h3>
                <p className="text-sm text-gray-800/70">
                  ติดตามคะแนนเฉลี่ย หากต่ำกว่า 4.0/5 เป็นเวลา 3 เดือน จะถูกตรวจสอบพิเศษ
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  Mystery Shopping ประจำปี
                </h3>
                <p className="text-sm text-gray-800/70">
                  ทดสอบคุณภาพอีกครั้งทุกปี เพื่อให้แน่ใจว่ามาตรฐานยังคงเดิม
                </p>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-600" />
                  การจัดการข้อร้องเรียน
                </h3>
                <p className="text-sm text-gray-800/70">
                  หากมีข้อร้องเรียนร้ายแรง 3 ครั้งขึ้นไป อาจถูกระงับหรือยกเลิกบัญชี
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-600" />
                  การต่ออายุใบอนุญาต
                </h3>
                <p className="text-sm text-gray-800/70">
                  ตรวจสอบเอกสารและใบอนุญาตทุกปี เพื่อให้แน่ใจว่ายังไม่หมดอายุ
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-semibold mb-6">
              ประโยชน์ที่คุณได้รับ
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">คุณภาพที่รับประกัน</h3>
                  <p className="text-sm opacity-90">
                    ทุกพาร์ทเนอร์ผ่านการตรวจสอบอย่างเข้มงวด คุณมั่นใจได้ว่าจะได้รับบริการคุณภาพสูง
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">ประหยัดเวลา</h3>
                  <p className="text-sm opacity-90">
                    ไม่ต้องเสียเวลาคัดกรองพาร์ทเนอร์เอง เราทำแทนคุณแล้ว
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">ความมั่นใจ</h3>
                  <p className="text-sm opacity-90">
                    รู้ว่าทุกพาร์ทเนอร์มีเอกสารครบถ้วนและถูกต้องตามกฎหมาย
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">การคุ้มครอง</h3>
                  <p className="text-sm opacity-90">
                    หากเกิดปัญหา คุณได้รับการคุ้มครองจากระบบ Escrow และทีม malAI
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              พร้อมจองพาร์ทเนอร์คุณภาพสูงแล้วหรือยัง?
            </h3>
            <p className="text-gray-800/70 mb-6">
              สำรวจพาร์ทเนอร์คัดสรรที่ผ่านมาตรฐาน 48 ข้อของ malAI
            </p>
            <a href="/vendors" className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition font-semibold">
              ดูพาร์ทเนอร์ทั้งหมด
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

