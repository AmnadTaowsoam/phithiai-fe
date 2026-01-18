import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

const articles = [
  {
    id: 'article-1',
    title: '10 สิ่งที่ต้องเตรียมสำหรับงานแต่งงานไทย',
    excerpt: 'เตรียมตัวให้พร้อมสำหรับวันสำคัญด้วยเช็กลิสต์ครบครันที่คัดสรรมาเป็นพิเศษ...',
    author: 'ทีมงาน malAI',
    date: '2025-01-10',
    category: 'คู่มือ',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'article-2',
    title: 'วิธีเลือกช่างภาพงานแต่งที่ใช่สำหรับคุณ',
    excerpt: 'ช่างภาพคือคนที่จะบันทึกความทรงจำในวันสำคัญ เรามีเคล็ดลับดีๆ มาแชร์...',
    author: 'คุณมาลี',
    date: '2025-01-08',
    category: 'เคล็ดลับ',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'article-3',
    title: 'พิธีแต่งงานแบบไทยร่วมสมัย: ผสมผสานประเพณีและความทันสมัย',
    excerpt: 'ค้นพบวิธีผสมผสานความงดงามของพิธีไทยดั้งเดิมเข้ากับสไตล์สมัยใหม่...',
    author: 'อ.สมศักดิ์',
    date: '2025-01-05',
    category: 'แนวคิด',
    image: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=800&q=80'
  }
];

const categories = ['ทั้งหมด', 'คู่มือ', 'เคล็ดลับ', 'แนวคิด', 'เทรนด์', 'เรื่องราว'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4 thai-heading">
            บทความและคู่มือ
          </h1>
          <p className="text-lg text-ivory/80">
            เรื่องราว เคล็ดลับ และแรงบันดาลใจสำหรับงานพิธีของคุณ
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาบทความ..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition duration-300">
                ค้นหา
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-amber-600 hover:bg-amber-50 transition duration-300 text-sm"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-ivory mb-3 hover:text-amber-600 transition-colors">
                    <Link href={`/blog/${article.id}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-ivory/70 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-ivory/60 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.date).toLocaleDateString('th-TH')}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${article.id}`}
                    className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                  >
                    อ่านต่อ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
              โหลดบทความเพิ่มเติม
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-ivory mb-6 flex items-center gap-2">
              <Tag className="w-6 h-6 text-amber-600" />
              หัวข้อยอดนิยม
            </h3>
            <div className="flex flex-wrap gap-3">
              {['งานแต่งงาน', 'งานบวช', 'ช่างภาพ', 'จัดเลี้ยง', 'ตกแต่ง', 'งบประมาณ', 'วันดี', 'พิธีไทย', 'สไตล์ล้านนา', 'เคล็ดลับ'].map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 hover:bg-amber-100 text-ivory px-4 py-2 rounded-full text-sm cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


