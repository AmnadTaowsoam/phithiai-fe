'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Zap, 
  Target, 
  BarChart3, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Cpu,
  Database,
  Shield,
  Lightbulb
} from 'lucide-react';

interface AIFeature {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
  benefits: string[];
  examples: string[];
  status: 'active' | 'beta' | 'coming_soon';
}

interface AICaseStudy {
  id: string;
  title: string;
  description: string;
  result: string;
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  image: string;
}

export default function IntelligencePage() {
  const [activeTab, setActiveTab] = useState('planning');
  
  const aiFeatures: AIFeature[] = [
    {
      id: 'smart_planning',
      title: 'การวางแผนอัจฉริยะ',
      description: 'AI วิเคราะห์ความต้องการและแนะนำแผนงานที่เหมาะสมที่สุด',
      category: 'planning',
      icon: Calendar,
      benefits: [
        'ประหยัดเวลา 70%',
        'ลดต้นทุน 25%',
        'เพิ่มความแม่นยำ 90%'
      ],
      examples: [
        'แนะนำวันดีตามโหราศาสตร์',
        'คำนวณงบประมาณที่เหมาะสม',
        'จัดลำดับความสำคัญของงาน'
      ],
      status: 'active'
    },
    {
      id: 'vendor_matching',
      title: 'การจับคู่พาร์ทเนอร์',
      description: 'AI จับคู่พาร์ทเนอร์ที่เหมาะสมที่สุดตามความต้องการและงบประมาณ',
      category: 'matching',
      icon: Users,
      benefits: [
        'ความแม่นยำ 95%',
        'ประหยัดเวลา 80%',
        'เพิ่มความพึงพอใจ 40%'
      ],
      examples: [
        'จับคู่ช่างภาพตามสไตล์',
        'เลือกสถานที่ตามธีมงาน',
                'แนะนำผู้ให้บริการตามงบประมาณ'
      ],
      status: 'active'
    },
    {
      id: 'budget_optimization',
      title: 'การปรับแต่งงบประมาณ',
      description: 'AI วิเคราะห์และปรับแต่งงบประมาณให้เหมาะสมที่สุด',
      category: 'optimization',
      icon: BarChart3,
      benefits: [
        'ประหยัดงบประมาณ 30%',
        'เพิ่มมูลค่า 50%',
        'ลดความเสี่ยง 60%'
      ],
      examples: [
        'คำนวณต้นทุนที่แท้จริง',
        'แนะนำการประหยัดงบประมาณ',
        'คาดการณ์ค่าใช้จ่ายเพิ่มเติม'
      ],
      status: 'active'
    },
    {
      id: 'real_time_monitoring',
      title: 'การติดตามแบบเรียลไทม์',
      description: 'AI ติดตามความคืบหน้าและแจ้งเตือนอัตโนมัติ',
      category: 'monitoring',
      icon: Target,
      benefits: [
        'ลดความล่าช้า 90%',
        'เพิ่มความโปร่งใส 100%',
        'ลดความเครียด 70%'
      ],
      examples: [
        'แจ้งเตือนความคืบหน้า',
        'คาดการณ์ปัญหาที่อาจเกิดขึ้น',
        'แนะนำการแก้ไขปัญหา'
      ],
      status: 'beta'
    },
    {
      id: 'personalization',
      title: 'การปรับแต่งส่วนบุคคล',
      description: 'AI เรียนรู้และปรับแต่งประสบการณ์ตามความชอบส่วนบุคคล',
      category: 'personalization',
      icon: Brain,
      benefits: [
        'เพิ่มความพึงพอใจ 60%',
        'ลดเวลาในการตัดสินใจ 50%',
        'เพิ่มความแม่นยำ 85%'
      ],
      examples: [
        'แนะนำธีมงานตามความชอบ',
        'ปรับแต่งเมนูอาหาร',
        'เลือกเพลงตามอารมณ์'
      ],
      status: 'coming_soon'
    },
    {
      id: 'quality_assurance',
      title: 'การประกันคุณภาพ',
      description: 'AI ตรวจสอบและประกันคุณภาพของพาร์ทเนอร์และบริการ',
      category: 'quality',
      icon: Shield,
      benefits: [
        'เพิ่มความมั่นใจ 95%',
        'ลดความเสี่ยง 80%',
        'เพิ่มคุณภาพ 70%'
      ],
      examples: [
        'ตรวจสอบประวัติพาร์ทเนอร์',
        'ประเมินคุณภาพงาน',
        'คาดการณ์ความพึงพอใจ'
      ],
      status: 'active'
    }
  ];

  const caseStudies: AICaseStudy[] = [
    {
      id: 'wedding_planning',
      title: 'การวางแผนงานแต่งงานด้วย AI',
      description: 'คู่รักใช้ AI วางแผนงานแต่งงาน 200 คน ในงบประมาณ 500,000 บาท',
      result: 'ประหยัดงบประมาณ 30% และประหยัดเวลา 70%',
      metrics: [
        { label: 'งบประมาณที่ประหยัด', value: '150,000 บาท', improvement: '+30%' },
        { label: 'เวลาที่ประหยัด', value: '120 ชั่วโมง', improvement: '+70%' },
        { label: 'ความพึงพอใจ', value: '95%', improvement: '+40%' }
      ],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'corporate_event',
      title: 'การจัดงานบริษัทด้วย AI',
      description: 'บริษัทใช้ AI จัดงานสัมมนา 500 คน ใน 3 เมือง',
      result: 'เพิ่มประสิทธิภาพ 50% และลดต้นทุน 25%',
      metrics: [
        { label: 'ประสิทธิภาพ', value: '50%', improvement: '+50%' },
        { label: 'ต้นทุนที่ลด', value: '200,000 บาท', improvement: '+25%' },
        { label: 'ความแม่นยำ', value: '98%', improvement: '+30%' }
      ],
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'cultural_ceremony',
      title: 'การจัดพิธีกรรมวัฒนธรรมด้วย AI',
      description: 'ครอบครัวใช้ AI จัดพิธีกรรมตามประเพณีไทยโบราณ',
      result: 'รักษาประเพณีได้ 100% และเพิ่มความเข้าใจ 80%',
      metrics: [
        { label: 'ความถูกต้อง', value: '100%', improvement: '+100%' },
        { label: 'ความเข้าใจ', value: '80%', improvement: '+80%' },
        { label: 'ความพึงพอใจ', value: '98%', improvement: '+60%' }
      ],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const categories = [
    { id: 'planning', name: 'การวางแผน', icon: Calendar },
    { id: 'matching', name: 'การจับคู่', icon: Users },
    { id: 'optimization', name: 'การปรับแต่ง', icon: BarChart3 },
    { id: 'monitoring', name: 'การติดตาม', icon: Target },
    { id: 'personalization', name: 'ส่วนบุคคล', icon: Brain },
    { id: 'quality', name: 'คุณภาพ', icon: Shield }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? aiFeatures 
    : aiFeatures.filter(feature => feature.category === activeTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white">ใช้งานได้</Badge>;
      case 'beta':
        return <Badge className="bg-yellow-500 text-white">ทดสอบ</Badge>;
      case 'coming_soon':
        return <Badge className="bg-blue-500 text-white">เร็วๆ นี้</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-amber-600" />
            <h1 className="font-display text-4xl md:text-5xl text-gray-800 thai-heading">
              ระบบอัจฉริยะ
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            ใช้พลัง AI และ Machine Learning เพื่อสร้างประสบการณ์การจัดงานที่สมบูรณ์แบบ 
            เรียนรู้จากข้อมูลจริงและปรับแต่งให้เหมาะกับความต้องการของคุณ
          </p>
        </div>

        {/* AI Features */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Cpu className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-semibold text-gray-800">ฟีเจอร์ AI</h2>
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
                {filteredFeatures.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                              <IconComponent className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                              <CardTitle className="text-gray-800">{feature.title}</CardTitle>
                              <CardDescription className="text-gray-600">
                                {feature.description}
                              </CardDescription>
                            </div>
                          </div>
                          {getStatusBadge(feature.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">ประโยชน์</h4>
                            <ul className="space-y-1">
                              {feature.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">ตัวอย่างการใช้งาน</h4>
                            <ul className="space-y-1">
                              {feature.examples.map((example, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                                  {example}
                                </li>
                              ))}
                            </ul>
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

        {/* Case Studies */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <BarChart3 className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-semibold text-gray-800">กรณีศึกษา</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      กรณีศึกษา
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">{study.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{study.description}</p>
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-green-800 font-semibold text-sm">ผลลัพธ์: {study.result}</p>
                  </div>
                  <div className="space-y-2">
                    {study.metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{metric.label}</span>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-800">{metric.value}</span>
                          <span className="text-xs text-green-600 ml-2">{metric.improvement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Database className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-semibold text-gray-800">เทคโนโลยี</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Machine Learning', description: 'เรียนรู้จากข้อมูลจริง', icon: Brain },
              { name: 'Natural Language Processing', description: 'เข้าใจภาษาไทย', icon: Zap },
              { name: 'Computer Vision', description: 'วิเคราะห์ภาพและวิดีโอ', icon: Target },
              { name: 'Predictive Analytics', description: 'คาดการณ์ผลลัพธ์', icon: BarChart3 }
            ].map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="p-3 bg-amber-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{tech.name}</h3>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-8 h-8" />
                <h2 className="text-2xl font-semibold">เริ่มใช้ AI วันนี้</h2>
              </div>
              <p className="text-lg mb-6 opacity-90">
                ลองใช้ระบบ AI ของเราเพื่อวางแผนงานของคุณอย่างอัจฉริยะ
              </p>
              <Button className="bg-white text-amber-600 hover:bg-gray-100">
                ทดลองใช้ฟรี
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
