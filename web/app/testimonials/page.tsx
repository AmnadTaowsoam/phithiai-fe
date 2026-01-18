'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  Quote, 
  Heart, 
  Calendar,
  MapPin,
  Users,
  Camera,
  Music,
  Flower,
  Crown,
  Award,
  ThumbsUp,
  MessageCircle,
  Share2,
  Play
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  eventType: string;
  rating: number;
  review: string;
  date: string;
  image: string;
  eventImage: string;
  category: string;
  verified: boolean;
  helpful: number;
  response?: string;
  responseDate?: string;
}

interface Story {
  id: string;
  title: string;
  description: string;
  author: string;
  authorRole: string;
  authorImage: string;
  eventType: string;
  location: string;
  date: string;
  images: string[];
  video?: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
}

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  const testimonials: Testimonial[] = [
    {
      id: 'testimonial_1',
      name: 'คุณสมชาย ใจดี',
      role: 'เจ้าของธุรกิจ',
      location: 'กรุงเทพฯ',
      eventType: 'งานแต่งงาน',
      rating: 5,
      review: 'Phithiai ช่วยให้การจัดงานแต่งงานของเราสมบูรณ์แบบมาก ระบบ AI แนะนำพาร์ทเนอร์ที่เหมาะสมกับงบประมาณและความต้องการของเราได้อย่างแม่นยำ ประหยัดเวลาและเงินไปได้เยอะมาก',
      date: '2024-12-15',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      eventImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
      category: 'wedding',
      verified: true,
      helpful: 24,
      response: 'ขอบคุณสำหรับรีวิวที่ดีมากค่ะ เรายินดีที่ได้เป็นส่วนหนึ่งในวันสำคัญของคุณ',
      responseDate: '2024-12-16'
    },
    {
      id: 'testimonial_2',
      name: 'คุณสุนทรี วิไล',
      role: 'แม่บ้าน',
      location: 'เชียงใหม่',
      eventType: 'งานบวช',
      rating: 5,
      review: 'การจัดงานบวชลูกชายด้วย Phithiai ทำให้ทุกอย่างเป็นไปตามประเพณีไทยอย่างถูกต้อง พาร์ทเนอร์ที่แนะนำมาทำงานได้ดีมาก และระบบติดตามความคืบหน้าทำให้เรารู้สึกมั่นใจตลอดเวลา',
      date: '2024-11-20',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      eventImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      category: 'ordination',
      verified: true,
      helpful: 18,
      response: 'ยินดีที่ได้ช่วยให้งานบวชเป็นไปตามประเพณีอย่างสมบูรณ์ค่ะ',
      responseDate: '2024-11-21'
    },
    {
      id: 'testimonial_3',
      name: 'คุณวิชัย เก่งมาก',
      role: 'ผู้จัดการบริษัท',
      location: 'ภูเก็ต',
      eventType: 'งานเลี้ยงบริษัท',
      rating: 4,
      review: 'ใช้ Phithiai จัดงานเลี้ยงบริษัท 200 คน ระบบ AI ช่วยคำนวณงบประมาณและแนะนำสถานที่ที่เหมาะสม ทำให้งานออกมาสำเร็จและประหยัดงบประมาณไปได้ 30%',
      date: '2024-10-05',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      eventImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
      category: 'corporate',
      verified: true,
      helpful: 12,
      response: 'ขอบคุณที่ไว้วางใจ Phithiai ในการจัดงานบริษัทค่ะ',
      responseDate: '2024-10-06'
    },
    {
      id: 'testimonial_4',
      name: 'คุณมาลี สวยงาม',
      role: 'ครู',
      location: 'ขอนแก่น',
      eventType: 'งานขึ้นบ้านใหม่',
      rating: 5,
      review: 'Phithiai ช่วยให้การจัดงานขึ้นบ้านใหม่เป็นไปอย่างราบรื่น ระบบแนะนำวันดีตามโหราศาสตร์และพาร์ทเนอร์ที่เหมาะสม ทำให้งานเป็นไปตามประเพณีไทยอย่างสมบูรณ์',
      date: '2024-09-18',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      eventImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
      category: 'housewarming',
      verified: true,
      helpful: 15,
      response: 'ยินดีที่ได้ช่วยให้งานขึ้นบ้านใหม่เป็นไปอย่างสมบูรณ์ค่ะ',
      responseDate: '2024-09-19'
    },
    {
      id: 'testimonial_5',
      name: 'คุณประเสริฐ ดีมาก',
      role: 'นักธุรกิจ',
      location: 'พัทยา',
      eventType: 'งานเลี้ยงรับแขก',
      rating: 5,
      review: 'การจัดงานเลี้ยงรับแขกด้วย Phithiai ทำให้ทุกอย่างเป็นไปตามที่วางแผนไว้ ระบบ AI ช่วยจัดการทุกอย่างตั้งแต่การจองสถานที่ไปจนถึงการจัดเมนูอาหาร',
      date: '2024-08-30',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      eventImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80',
      category: 'party',
      verified: true,
      helpful: 20,
      response: 'ขอบคุณสำหรับรีวิวที่ดีมากค่ะ เรายินดีที่ได้เป็นส่วนหนึ่งในงานสำคัญของคุณ',
      responseDate: '2024-08-31'
    }
  ];

  const stories: Story[] = [
    {
      id: 'story_1',
      title: 'งานแต่งงานในสไตล์ล้านนา',
      description: 'การจัดงานแต่งงานสไตล์ล้านนาแท้ ที่ผสมผสานความงามของประเพณีโบราณกับเทคโนโลยีสมัยใหม่',
      author: 'คุณสมชาย & คุณสุนทรี',
      authorRole: 'คู่บ่าวสาว',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      eventType: 'งานแต่งงาน',
      location: 'เชียงใหม่',
      date: '2024-12-15',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80'
      ],
      tags: ['ล้านนา', 'ประเพณี', 'ผ้าไหม', 'ทองคำ'],
      likes: 156,
      comments: 23,
      shares: 45
    },
    {
      id: 'story_2',
      title: 'พิธีกรรมในวัดโบราณ',
      description: 'การจัดพิธีกรรมศักดิ์สิทธิ์ในวัดโบราณ ที่รักษาประเพณีไทยไว้อย่างสมบูรณ์',
      author: 'คุณมาลี วิไล',
      authorRole: 'แม่บ้าน',
      authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      eventType: 'งานบวช',
      location: 'กรุงเทพฯ',
      date: '2024-11-20',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80'
      ],
      tags: ['วัด', 'พระสงฆ์', 'พิธีกรรม', 'ประเพณี'],
      likes: 89,
      comments: 15,
      shares: 32
    },
    {
      id: 'story_3',
      title: 'งานเลี้ยงชายหาด',
      description: 'งานเลี้ยงสุดโรแมนติกบนชายหาดสวยงาม พร้อมพระอาทิตย์ตกและเสียงคลื่น',
      author: 'คุณวิชัย & คุณมาลี',
      authorRole: 'คู่รัก',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      eventType: 'งานเลี้ยงรับแขก',
      location: 'ภูเก็ต',
      date: '2024-10-05',
      images: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80'
      ],
      video: 'https://example.com/video.mp4',
      tags: ['ชายหาด', 'โรแมนติก', 'พระอาทิตย์ตก', 'ทะเล'],
      likes: 234,
      comments: 45,
      shares: 67
    }
  ];

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: Star },
    { id: 'wedding', name: 'งานแต่งงาน', icon: Heart },
    { id: 'ordination', name: 'งานบวช', icon: Flower },
    { id: 'corporate', name: 'งานบริษัท', icon: Users },
    { id: 'housewarming', name: 'ขึ้นบ้านใหม่', icon: Crown },
    { id: 'party', name: 'งานเลี้ยง', icon: Music }
  ];

  const filteredTestimonials = activeTab === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category === activeTab);

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : Star;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Quote className="w-12 h-12 text-amber-600" />
            <h1 className="font-display text-4xl md:text-5xl text-gray-800 thai-heading">
              เรื่องราวความสำเร็จ
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            ฟังเรื่องราวจากลูกค้าของเราที่ได้ใช้ Phithiai ในการจัดงานพิเศษ 
            และค้นพบว่าการวางแผนงานที่ดีสามารถสร้างความทรงจำที่ยั่งยืนได้อย่างไร
          </p>
        </div>

        {/* Testimonials */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Award className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-semibold text-gray-800">รีวิวจากลูกค้า</h2>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial) => {
                  const IconComponent = getCategoryIcon(testimonial.category);
                  return (
                    <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                              {testimonial.verified && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  <Award className="w-3 h-3 mr-1" />
                                  ยืนยันแล้ว
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {testimonial.location}
                              <Calendar className="w-3 h-3 ml-2" />
                              {testimonial.date}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {getRatingStars(testimonial.rating)}
                          </div>
                          <Badge className="text-xs">
                            <IconComponent className="w-3 h-3 mr-1" />
                            {testimonial.eventType}
                          </Badge>
                        </div>
                        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                          &ldquo;{testimonial.review}&rdquo;
                        </p>
                        {testimonial.eventImage && (
                          <img
                            src={testimonial.eventImage}
                            alt={testimonial.eventType}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                          />
                        )}
                        {testimonial.response && (
                          <div className="bg-amber-50 p-3 rounded-lg mb-3">
                            <p className="text-sm text-amber-800">
                              <strong>Phithiai:</strong> {testimonial.response}
                            </p>
                            <p className="text-xs text-amber-600 mt-1">{testimonial.responseDate}</p>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <button className="flex items-center gap-1 hover:text-amber-600">
                              <ThumbsUp className="w-4 h-4" />
                              {testimonial.helpful}
                            </button>
                            <button className="flex items-center gap-1 hover:text-amber-600">
                              <MessageCircle className="w-4 h-4" />
                              ตอบกลับ
                            </button>
                            <button className="flex items-center gap-1 hover:text-amber-600">
                              <Share2 className="w-4 h-4" />
                              แชร์
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Camera className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-semibold text-gray-800">เรื่องราวความสำเร็จ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={story.images[0]}
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                  {story.video && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <Button className="bg-white text-black hover:bg-gray-100">
                        <Play className="w-4 h-4 mr-2" />
                        ดูวิดีโอ
                      </Button>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-amber-500 text-white">
                      <Camera className="w-3 h-3 mr-1" />
                      เรื่องราว
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">{story.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{story.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={story.authorImage}
                      alt={story.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{story.author}</p>
                      <p className="text-xs text-gray-600">{story.authorRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {story.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {story.date}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {story.tags.map((tag, index) => (
                      <Badge key={index} className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-red-500">
                        <Heart className="w-4 h-4" />
                        {story.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-amber-600">
                        <MessageCircle className="w-4 h-4" />
                        {story.comments}
                      </button>
                      <button className="flex items-center gap-1 hover:text-amber-600">
                        <Share2 className="w-4 h-4" />
                        {story.shares}
                      </button>
                    </div>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      อ่านต่อ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Quote className="w-8 h-8" />
                <h2 className="text-2xl font-semibold">สร้างเรื่องราวของคุณเอง</h2>
              </div>
              <p className="text-lg mb-6 opacity-90">
                เริ่มวางแผนงานพิเศษของคุณกับ Phithiai และสร้างความทรงจำที่ยั่งยืน
              </p>
              <Button className="bg-white text-amber-600 hover:bg-gray-100">
                เริ่มวางแผนเลย
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
