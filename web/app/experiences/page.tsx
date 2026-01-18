'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  Camera, 
  Music, 
  Flower,
  Crown,
  Sparkles,
  Award,
  Clock
} from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  location: string;
  duration: string;
  capacity: number;
  tags: string[];
  featured: boolean;
}

export default function ExperiencesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [experiences] = useState<Experience[]>([
    {
      id: 'royal_ceremony',
      title: 'พิธีกรรมราชวงศ์',
      description: 'ประสบการณ์พิเศษที่จำลองพิธีกรรมในราชสำนักไทยโบราณ พร้อมชุดแต่งกายและเครื่องประดับทองคำแท้',
      category: 'royal',
      price: 500000,
      rating: 4.9,
      reviewCount: 24,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
      location: 'กรุงเทพฯ',
      duration: '6 ชั่วโมง',
      capacity: 50,
      tags: ['ราชวงศ์', 'ทองคำ', 'พิธีกรรม'],
      featured: true
    },
    {
      id: 'lanna_wedding',
      title: 'งานแต่งแบบล้านนา',
      description: 'งานแต่งงานสไตล์ล้านนาแท้ กับชุดผ้าไหมและพิธีกรรมตามประเพณีดั้งเดิม',
      category: 'traditional',
      price: 350000,
      rating: 4.8,
      reviewCount: 18,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      location: 'เชียงใหม่',
      duration: '8 ชั่วโมง',
      capacity: 80,
      tags: ['ล้านนา', 'ผ้าไหม', 'ประเพณี'],
      featured: true
    },
    {
      id: 'floating_market',
      title: 'งานเลี้ยงลอยน้ำ',
      description: 'งานเลี้ยงสุดพิเศษบนเรือในตลาดน้ำ พร้อมอาหารพื้นบ้านและกิจกรรมสนุกสนาน',
      category: 'unique',
      price: 280000,
      rating: 4.7,
      reviewCount: 32,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      location: 'อยุธยา',
      duration: '5 ชั่วโมง',
      capacity: 60,
      tags: ['ตลาดน้ำ', 'เรือ', 'อาหารพื้นบ้าน'],
      featured: false
    },
    {
      id: 'temple_ceremony',
      title: 'พิธีกรรมในวัด',
      description: 'พิธีกรรมศักดิ์สิทธิ์ในวัดโบราณ พร้อมพระสงฆ์และพิธีกรรมตามประเพณีไทย',
      category: 'spiritual',
      price: 150000,
      rating: 4.9,
      reviewCount: 45,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      location: 'กรุงเทพฯ',
      duration: '3 ชั่วโมง',
      capacity: 100,
      tags: ['วัด', 'พระสงฆ์', 'พิธีกรรม'],
      featured: false
    },
    {
      id: 'beach_wedding',
      title: 'งานแต่งชายหาด',
      description: 'งานแต่งงานโรแมนติกบนชายหาดสวยงาม พร้อมพระอาทิตย์ตกและเสียงคลื่น',
      category: 'romantic',
      price: 400000,
      rating: 4.8,
      reviewCount: 28,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      location: 'ภูเก็ต',
      duration: '6 ชั่วโมง',
      capacity: 40,
      tags: ['ชายหาด', 'โรแมนติก', 'พระอาทิตย์ตก'],
      featured: true
    },
    {
      id: 'mountain_retreat',
      title: 'งานเลี้ยงบนเขา',
      description: 'งานเลี้ยงสุดพิเศษบนยอดเขา พร้อมวิวธรรมชาติและอากาศบริสุทธิ์',
      category: 'nature',
      price: 320000,
      rating: 4.6,
      reviewCount: 15,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      location: 'เชียงใหม่',
      duration: '7 ชั่วโมง',
      capacity: 30,
      tags: ['ภูเขา', 'ธรรมชาติ', 'อากาศบริสุทธิ์'],
      featured: false
    }
  ]);

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: Sparkles },
    { id: 'royal', name: 'ราชวงศ์', icon: Crown },
    { id: 'traditional', name: 'ประเพณี', icon: Flower },
    { id: 'unique', name: 'พิเศษ', icon: Star },
    { id: 'spiritual', name: 'จิตวิญญาณ', icon: Heart },
    { id: 'romantic', name: 'โรแมนติก', icon: Heart },
    { id: 'nature', name: 'ธรรมชาติ', icon: Flower }
  ];

  const filteredExperiences = activeTab === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeTab);

  const featuredExperiences = experiences.filter(exp => exp.featured);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : Sparkles;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4 thai-heading">
            ประสบการณ์พิเศษ
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            ค้นพบประสบการณ์พิเศษที่ไม่เหมือนใคร ที่จะทำให้งานของคุณเป็นที่จดจำตลอดไป
          </p>
        </div>

        {/* Featured Experiences */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-semibold text-gray-800">ประสบการณ์แนะนำ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExperiences.map((experience) => {
              const IconComponent = getCategoryIcon(experience.category);
              return (
                <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-amber-500 text-white">
                        <IconComponent className="w-3 h-3 mr-1" />
                        แนะนำ
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">{experience.title}</h3>
                      <div className="flex items-center gap-1">
                        {getRatingStars(experience.rating)}
                        <span className="text-sm text-gray-600 ml-1">({experience.reviewCount})</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">{experience.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {experience.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {experience.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {experience.capacity} คน
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {experience.tags.map((tag, index) => (
                        <Badge key={index} className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-600">
                        {formatCurrency(experience.price)}
                      </span>
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* All Experiences */}
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
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
                {filteredExperiences.map((experience) => {
                  const IconComponent = getCategoryIcon(experience.category);
                  return (
                    <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={experience.image}
                          alt={experience.title}
                          className="w-full h-48 object-cover"
                        />
                        {experience.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-amber-500 text-white">
                              <IconComponent className="w-3 h-3 mr-1" />
                              แนะนำ
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-800 text-lg">{experience.title}</h3>
                          <div className="flex items-center gap-1">
                            {getRatingStars(experience.rating)}
                            <span className="text-sm text-gray-600 ml-1">({experience.reviewCount})</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{experience.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {experience.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {experience.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {experience.capacity} คน
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {experience.tags.map((tag, index) => (
                            <Badge key={index} className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-amber-600">
                            {formatCurrency(experience.price)}
                          </span>
                          <Button className="bg-amber-600 hover:bg-amber-700">
                            ดูรายละเอียด
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">สร้างประสบการณ์พิเศษของคุณ</h2>
              <p className="text-lg mb-6 opacity-90">
                ปรึกษากับทีมผู้เชี่ยวชาญของเราเพื่อออกแบบประสบการณ์ที่เหมาะกับคุณ
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
