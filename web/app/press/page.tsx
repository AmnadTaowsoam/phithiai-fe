import React from 'react';
import { Newspaper, Award, TrendingUp, Calendar, ExternalLink } from 'lucide-react';

export default function PressPage() {
  const press = [
    {
      date: '15 มกราคม 2025',
      outlet: 'TechCrunch Thailand',
      title: 'phithiai Raises $5M Series A to Revolutionize Thai Wedding Industry',
      excerpt: 'phithiai, แพลตฟอร์มที่ใช้ AI ช่วยวางแผนงานฉลองไทย ได้รับการลงทุนรอบ Series A จำนวน 50 ล้านบาท...',
      link: '#',
      image: '📰'
    },
    {
      date: '3 มกราคม 2025',
      outlet: 'Forbes Thailand',
      title: 'Top 10 Most Promising Startups in Thailand 2024',
      excerpt: 'phithiai ติดอันดับ Top 10 สตาร์ทอัพที่น่าจับตามองที่สุดในประเทศไทย ประจำปี 2024...',
      link: '#',
      image: '🏆'
    },
    {
      date: '20 ธันวาคม 2024',
      outlet: 'Bangkok Post',
      title: 'AI Platform Transforms Thai Traditional Ceremonies',
      excerpt: 'แพลตฟอร์ม phithiai กำลังเปลี่ยนวิธีการจัดงานฉลองไทยด้วยเทคโนโลยี AI และการคัดกรองพาร์ทเนอร์อย่างเข้มงวด...',
      link: '#',
      image: '📱'
    },
    {
      date: '10 พฤศจิกายน 2024',
      outlet: 'Nation Thailand',
      title: 'Preserving Thai Culture Through Technology',
      excerpt: 'phithiai ไม่ได้แค่ใช้เทคโนโลยี แต่ยังเคารพและอนุรักษ์วัฒนธรรมไทยผ่านการคัดกรองและอบรมพาร์ทเนอร์...',
      link: '#',
      image: '🎭'
    }
  ];

  const awards = [
    {
      year: 2024,
      title: 'Best Startup of the Year',
      organization: 'Thailand Tech Startup Awards',
      description: 'รางวัลสตาร์ทอัพยอดเยี่ยมแห่งปี จากผลงานโดดเด่นในการใช้ AI และการรักษาวัฒนธรรมไทย'
    },
    {
      year: 2024,
      title: 'Gold Medal - Innovation Category',
      organization: 'DIGITAL THAILAND Awards',
      description: 'เหรียญทองด้านนวัตกรรม จากการพัฒนาแพลตฟอร์มที่ผสมผสาน AI กับวัฒนธรรมไทย'
    },
    {
      year: 2024,
      title: 'Cultural Preservation Award',
      organization: 'กรมส่งเสริมวัฒนธรรม',
      description: 'รางวัลอนุรักษ์วัฒนธรรม จากการส่งเสริมและถ่ายทอดพิธีกรรมไทยสู่รุ่นใหม่'
    },
    {
      year: 2023,
      title: 'Rising Star Startup',
      organization: 'Techsauce Global Summit',
      description: 'รางวัลสตาร์ทอัพรุ่นใหม่ที่มีศักยภาพสูง'
    }
  ];

  const milestones = [
    { date: 'ม.ค. 2025', event: 'ระดมทุนรอบ Series A ได้ 50 ล้านบาท', value: '50M THB' },
    { date: 'ธ.ค. 2024', event: 'มีพาร์ทเนอร์เข้าร่วมครบ 500 ราย', value: '500+' },
    { date: 'พ.ย. 2024', event: 'จัดงานสำเร็จครบ 1,000 งาน', value: '1,000' },
    { date: 'ต.ค. 2024', event: 'เปิดให้บริการในภูเก็ต', value: 'Phuket' },
    { date: 'ก.ย. 2024', event: 'ได้รับรางวัล DIGITAL THAILAND', value: '🥇' },
    { date: 'ส.ค. 2024', event: 'เปิดให้บริการในเชียงใหม่', value: 'Chiang Mai' },
    { date: 'เม.ย. 2024', event: 'เปิดตัว phithiai Copilot™ AI', value: 'AI Launch' },
    { date: 'ม.ค. 2024', event: 'เปิดให้บริการในกรุงเทพฯ', value: 'Bangkok' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Newspaper className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4 thai-heading">
              ข่าวสารและสื่อมวลชน
            </h1>
            <p className="text-lg text-gray-800/80 max-w-2xl mx-auto">
              ติดตามข่าวสาร รางวัล และความก้าวหน้าของ phithiai
            </p>
          </div>

          {/* Press Coverage */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
              <Newspaper className="w-8 h-8 text-amber-600" />
              ข่าวและบทความ
            </h2>
            <div className="space-y-6">
              {press.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex gap-6">
                    <div className="text-5xl flex-shrink-0">{item.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-amber-600 font-semibold">{item.outlet}</span>
                        <span className="text-xs text-gray-800/50">•</span>
                        <span className="text-sm text-gray-800/60">{item.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-800/70 mb-4">{item.excerpt}</p>
                      <a href={item.link} className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold">
                        อ่านบทความเต็ม <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
              <Award className="w-8 h-8 text-amber-600" />
              รางวัลและการยอมรับ
            </h2>
            <div className="space-y-6">
              {awards.map((award, index) => (
                <div key={index} className="flex gap-6 items-start border-l-4 border-amber-600 pl-6 py-4">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-3xl font-bold text-amber-600">{award.year}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{award.title}</h3>
                    <p className="text-amber-600 font-semibold mb-2">{award.organization}</p>
                    <p className="text-sm text-gray-800/70">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-amber-600" />
              เหตุการณ์สำคัญ
            </h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-amber-600">{milestone.date}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{milestone.event}</p>
                  </div>
                  <div className="flex-shrink-0 bg-amber-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                    {milestone.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media Kit */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-semibold mb-4">Media Kit</h2>
            <p className="mb-6 opacity-90">
              ดาวน์โหลดโลโก้ รูปภาพ และข้อมูลบริษัทสำหรับสื่อมวลชน
            </p>
            <div className="flex justify-center gap-4">
              <a href="/media" className="bg-white text-amber-600 px-6 py-3 rounded-lg hover:bg-amber-50 transition font-semibold">
                ดาวน์โหลด Media Kit
              </a>
              <a href="mailto:press@phithiai.app" className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition font-semibold">
                ติดต่อทีมสื่อสาร
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

