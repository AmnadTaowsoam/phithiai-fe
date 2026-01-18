import React from 'react';
import { Users, Award, Target, Heart, Briefcase, GraduationCap, TrendingUp, Globe, Eye } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'ดร. สมชาย วิริยะพันธุ์',
      role: 'CEO & Co-Founder',
      education: 'Ph.D. Computer Science, Stanford University',
      background: 'อดีต Head of Product ที่ Agoda, 15 ปีประสบการณ์ในอุตสาหกรรม Tech',
      image: '👨‍💼'
    },
    {
      name: 'คุณสุดารัตน์ เจริญสุข',
      role: 'COO & Co-Founder',
      education: 'MBA, Chulalongkorn University',
      background: 'อดีต Event Director ที่ Anantara Hotels, 12 ปีประสบการณ์ด้านงานฉลอง',
      image: '👩‍💼'
    },
    {
      name: 'คุณธนากร ชาญเดช',
      role: 'CTO',
      education: 'M.S. AI & Machine Learning, MIT',
      background: 'อดีต Senior Engineer ที่ LINE Thailand, ผู้เชี่ยวชาญ AI/ML',
      image: '👨‍💻'
    },
    {
      name: 'คุณปภาวรินทร์ สว่างศรี',
      role: 'Chief Legal Officer',
      education: 'LLM, Harvard Law School',
      background: 'ทนายความด้าน Tech & Startup, อดีต Legal Counsel ที่ Grab Thailand',
      image: '👩‍⚖️'
    }
  ];

  const advisors = [
    {
      name: 'ศ.ดร. วิทยา นามบุตร',
      role: 'Academic Advisor',
      affiliation: 'อาจารย์ คณะพาณิชยศาสตร์และการบัญชี จุฬาลงกรณ์มหาวิทยาลัย'
    },
    {
      name: 'คุณอนุชา ศรีวิชัย',
      role: 'Cultural Advisor',
      affiliation: 'ผู้เชี่ยวชาญด้านวัฒนธรรมไทย, อดีตผู้อำนวยการสำนักศิลปวัฒนธรรม'
    },
    {
      name: 'คุณประสงค์ เศรษฐีธนากุล',
      role: 'Business Advisor',
      affiliation: 'CEO บริษัทเทคโนโลยีชั้นนำ, Angel Investor'
    }
  ];

  const investors = [
    { name: 'Kasikorn X Venture Capital', type: 'Lead Investor' },
    { name: 'SCB 10X', type: 'Strategic Investor' },
    { name: 'Thai Venture Capital', type: 'Series A Investor' },
    { name: 'Angel Investors Network Thailand', type: 'Angel Round' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <Heart className="w-16 h-16 text-amber-600 mx-auto mb-6" />
            <h1 className="font-display text-5xl md:text-6xl text-gray-800 mb-6 thai-heading">
              เกี่ยวกับ Phithiai
            </h1>
            <p className="text-xl text-gray-800/80 max-w-3xl mx-auto leading-relaxed">
              เราคือทีมที่หลงใหลในวัฒนธรรมไทยและเทคโนโลยี 
              มุ่งมั่นสร้างแพลตฟอร์มที่ทำให้การจัดงานฉลองไทยพรีเมียมเข้าถึงได้ง่ายขึ้น
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Target className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">พันธกิจ</h3>
              <p className="text-gray-800/70">
                ทำให้การจัดงานฉลองไทยพรีเมียมเข้าถึงได้ง่าย โปร่งใส และมีมาตรฐาน
                ด้วยเทคโนโลยี AI และทีมงานมืออาชีพ
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Eye className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">วิสัยทัศน์</h3>
              <p className="text-gray-800/70">
                เป็นแพลตฟอร์มอันดับ 1 ในไทยสำหรับงานฉลองระดับพรีเมียม
                ที่เคารพและอนุรักษ์วัฒนธรรมไทย
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Heart className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">ค่านิยมหลัก</h3>
              <ul className="text-gray-800/70 space-y-2 text-sm">
                <li>• โปร่งใสและซื่อสัตย์</li>
                <li>• เคารพวัฒนธรรมไทย</li>
                <li>• คุณภาพเหนือทุกอย่าง</li>
                <li>• นวัตกรรมที่ใส่ใจ</li>
              </ul>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center gap-3">
              <Users className="w-8 h-8 text-amber-600" />
              ทีมผู้บริหาร
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{member.image}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                      <p className="text-amber-600 font-semibold mb-2">{member.role}</p>
                      <p className="text-sm text-gray-800/70 mb-2">
                        <GraduationCap className="w-4 h-4 inline mr-1" />
                        {member.education}
                      </p>
                      <p className="text-sm text-gray-800/70">
                        <Briefcase className="w-4 h-4 inline mr-1" />
                        {member.background}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advisors */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-600" />
              ที่ปรึกษา
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {advisors.map((advisor, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{advisor.name}</h3>
                  <p className="text-amber-600 font-semibold text-sm mb-2">{advisor.role}</p>
                  <p className="text-xs text-gray-800/70">{advisor.affiliation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investors */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-amber-600" />
              ผู้ร่วมลงทุน
            </h2>
            <p className="text-gray-800/70 mb-6">
              Phithiai ได้รับการสนับสนุนจากกลุ่มนักลงทุนชั้นนำของประเทศไทย
              ที่เชื่อมั่นในวิสัยทัศน์และศักยภาพของเรา
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {investors.map((investor, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                  <p className="font-semibold text-gray-800 text-sm mb-1">{investor.name}</p>
                  <p className="text-xs text-blue-600">{investor.type}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-green-800">
                <strong>Series A Funding:</strong> 50 ล้านบาท (2024) 
                · <strong>Total Funding:</strong> 85 ล้านบาท
              </p>
            </div>
          </div>

          {/* Partnerships */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <Globe className="w-8 h-8 text-amber-600" />
              พาร์ทเนอร์และความร่วมมือ
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">พาร์ทเนอร์ธนาคาร</h3>
                <ul className="space-y-2 text-gray-800/70">
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span>ธนาคารกสิกรไทย (ระบบ Escrow)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span>ธนาคารไทยพาณิชย์ (Payment Gateway)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">พาร์ทเนอร์ประกันภัย</h3>
                <ul className="space-y-2 text-gray-800/70">
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>บริษัทประกันไทยวิวัฒน์ จำกัด (มหาชน)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">พาร์ทเนอร์เทคโนโลยี</h3>
                <ul className="space-y-2 text-gray-800/70">
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-red-600" />
                    <span>AWS Thailand (Cloud Infrastructure)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span>LINE Thailand (Communication Platform)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">พาร์ทเนอร์วัฒนธรรม</h3>
                <ul className="space-y-2 text-gray-800/70">
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>สำนักศิลปวัฒนธรรมร่วมสมัย</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              <Award className="w-8 h-8" />
              รางวัลและการยอมรับ
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-semibold mb-1">🏆 Best Startup of the Year 2024</p>
                <p className="text-sm opacity-90">Thailand Tech Startup Awards</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-semibold mb-1">🥇 Gold Medal - Innovation Category</p>
                <p className="text-sm opacity-90">DIGITAL THAILAND Awards 2024</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-semibold mb-1">⭐ Top 10 Most Promising Startups</p>
                <p className="text-sm opacity-90">Forbes Thailand 2024</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-semibold mb-1">🎖️ Cultural Preservation Award</p>
                <p className="text-sm opacity-90">กรมส่งเสริมวัฒนธรรม 2024</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              สนใจร่วมงานกับเรา?
            </h3>
            <p className="text-gray-800/70 mb-6">
              เรากำลังมองหาผู้ร่วมทีมที่หลงใหลในวัฒนธรรมไทยและเทคโนโลยี
            </p>
            <div className="flex justify-center gap-4">
              <a href="mailto:careers@phithiai.com" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition">
                ดูตำแหน่งงาน
              </a>
              <a href="/contact" className="bg-white text-amber-600 px-6 py-3 rounded-lg border-2 border-amber-600 hover:bg-amber-50 transition">
                ติดต่อเรา
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
