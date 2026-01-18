'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Shield,
  CreditCard,
  Calendar,
  Star,
  AlertCircle,
  Info,
  User
} from 'lucide-react';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  popular: boolean;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdated: string;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
    email: '',
    phone: ''
  });

  const faqs: FAQ[] = [
    {
      id: 'faq_1',
      category: 'general',
      question: 'Phithiai คืออะไร?',
      answer: 'Phithiai เป็นแพลตฟอร์มวางแผนงานพิธีไทยที่ใช้ AI ช่วยในการเลือกวันดี คำนวณงบประมาณ และจับคู่กับพาร์ทเนอร์ที่เหมาะสม',
      popular: true
    },
    {
      id: 'faq_2',
      category: 'general',
      question: 'ใช้บริการฟรีหรือไม่?',
      answer: 'Phithiai มีบริการฟรีสำหรับการวางแผนพื้นฐาน และมีแพ็กเกจพรีเมียมสำหรับการใช้งานขั้นสูง',
      popular: true
    },
    {
      id: 'faq_3',
      category: 'booking',
      question: 'จะจองพาร์ทเนอร์ได้อย่างไร?',
      answer: '1. ค้นหาพาร์ทเนอร์ที่ต้องการ 2. ส่งข้อความสอบถาม 3. รับใบเสนอราคา 4. ชำระมัดจำ 5. ยืนยันการจอง',
      popular: true
    },
    {
      id: 'faq_4',
      category: 'payment',
      question: 'ชำระเงินด้วยวิธีใดได้บ้าง?',
      answer: 'รองรับการชำระผ่าน Thai QR, บัตรเครดิต/เดบิต, และการโอนเงินผ่านธนาคาร',
      popular: false
    },
    {
      id: 'faq_5',
      category: 'payment',
      question: 'ระบบ Escrow คืออะไร?',
      answer: 'ระบบ Escrow เป็นการเก็บเงินไว้ในบัญชีกลาง จนกว่าพาร์ทเนอร์จะส่งงานครบตามสัญญา เพื่อความปลอดภัยของทั้งสองฝ่าย',
      popular: true
    },
    {
      id: 'faq_6',
      category: 'cancellation',
      question: 'ยกเลิกการจองได้หรือไม่?',
      answer: 'สามารถยกเลิกได้ตามเงื่อนไขของแต่ละพาร์ทเนอร์ โดยทั่วไปจะคืนเงินเต็มจำนวนหากยกเลิกก่อน 7 วัน',
      popular: false
    },
    {
      id: 'faq_7',
      category: 'technical',
      question: 'มีปัญหาการใช้งานทำอย่างไร?',
      answer: 'ติดต่อทีมสนับสนุนผ่านช่องทางต่างๆ หรือส่งคำร้องขอความช่วยเหลือในหน้านี้',
      popular: false
    },
    {
      id: 'faq_8',
      category: 'account',
      question: 'ลืมรหัสผ่านทำอย่างไร?',
      answer: 'คลิก "ลืมรหัสผ่าน" ในหน้าเข้าสู่ระบบ ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณ',
      popular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: BookOpen },
    { id: 'general', name: 'ทั่วไป', icon: HelpCircle },
    { id: 'booking', name: 'การจอง', icon: Calendar },
    { id: 'payment', name: 'การชำระเงิน', icon: CreditCard },
    { id: 'cancellation', name: 'การยกเลิก', icon: AlertCircle },
    { id: 'technical', name: 'เทคนิค', icon: Shield },
    { id: 'account', name: 'บัญชี', icon: User }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement contact form submission
    console.log('Contact form submitted:', contactForm);
    setShowContactForm(false);
    setContactForm({
      subject: '',
      category: '',
      priority: 'medium',
      message: '',
      email: '',
      phone: ''
    });
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityText = (priority: string) => {
    const texts: { [key: string]: string } = {
      low: 'ต่ำ',
      medium: 'ปานกลาง',
      high: 'สูง',
      urgent: 'ด่วน'
    };
    return texts[priority] || priority;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4 thai-heading">
            ศูนย์ช่วยเหลือ
          </h1>
          <p className="text-lg text-ivory/80 max-w-2xl mx-auto">
            ค้นหาคำตอบและรับความช่วยเหลือจากทีมสนับสนุนของเรา
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="ค้นหาคำถามที่พบบ่อย..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  คำถามที่พบบ่อย ({filteredFAQs.length})
                </CardTitle>
                <CardDescription>
                  ค้นหาคำตอบสำหรับคำถามที่พบบ่อย
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border rounded-lg">
                      <button
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-amber-50"
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-ivory font-medium">{faq.question}</span>
                          {faq.popular && (
                            <Badge className="bg-amber-100 text-amber-800 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              ยอดนิยม
                            </Badge>
                          )}
                        </div>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="px-4 pb-4 text-ivory/80">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            {showContactForm && (
              <Card>
                <CardHeader>
                  <CardTitle>ส่งคำร้องขอความช่วยเหลือ</CardTitle>
                  <CardDescription>
                    กรอกข้อมูลด้านล่างและทีมสนับสนุนจะติดต่อกลับภายใน 24 ชั่วโมง
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">หัวข้อ</Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">หมวดหมู่</Label>
                        <Select
                          id="category"
                          value={contactForm.category}
                          onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                        >
                          <option value="">เลือกหมวดหมู่</option>
                          <option value="general">ทั่วไป</option>
                          <option value="booking">การจอง</option>
                          <option value="payment">การชำระเงิน</option>
                          <option value="technical">เทคนิค</option>
                          <option value="account">บัญชี</option>
                          <option value="other">อื่นๆ</option>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">อีเมล</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                        <Input
                          id="phone"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="priority">ระดับความเร่งด่วน</Label>
                      <Select
                        id="priority"
                        value={contactForm.priority}
                        onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                      >
                        <option value="">เลือกระดับความเร่งด่วน</option>
                        <option value="low">ต่ำ</option>
                        <option value="medium">ปานกลาง</option>
                        <option value="high">สูง</option>
                        <option value="urgent">ด่วน</option>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">รายละเอียดปัญหา</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="อธิบายปัญหาหรือคำถามของคุณ..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        ส่งคำร้อง
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>
                        ยกเลิก
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>ติดต่อเรา</CardTitle>
                <CardDescription>
                  เลือกช่องทางที่สะดวกสำหรับคุณ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full justify-start"
                  onClick={() => setShowContactForm(!showContactForm)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  ส่งคำร้องขอความช่วยเหลือ
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  โทร: +66 2 123 4567
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  support@phithiai.com
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>ลิงก์ด่วน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  คู่มือการใช้งาน
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  นโยบายความเป็นส่วนตัว
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Info className="w-4 h-4 mr-2" />
                  เงื่อนไขการใช้งาน
                </Button>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  เวลาทำการ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-ivory/80">จันทร์ - ศุกร์</span>
                    <span className="font-semibold text-ivory">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/80">เสาร์ - อาทิตย์</span>
                    <span className="font-semibold text-ivory">10:00 - 16:00</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">ทีมสนับสนุนพร้อมให้บริการ</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle>บทความยอดนิยม</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {faqs.filter(faq => faq.popular).map((faq) => (
                    <div key={faq.id} className="p-3 bg-amber-50 rounded-lg cursor-pointer hover:bg-amber-100">
                      <h4 className="font-medium text-ivory text-sm mb-1">{faq.question}</h4>
                      <p className="text-xs text-ivory/70 line-clamp-2">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
