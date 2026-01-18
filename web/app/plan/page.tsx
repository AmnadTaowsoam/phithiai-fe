'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Calculator, CheckSquare, Download, Star, Clock, MapPin } from 'lucide-react';
import { PlanningAPI } from '@/lib/api/planning-api';
import { PlanningLoadingStates } from '@/components/planning/LoadingStates';
import { PlanningErrorBoundary } from '@/components/planning/ErrorBoundary';

interface AuspiciousDate {
  date: string;
  thaiDate: string;
  score: number;
  rating: number;
  reasons: string[];
  luckyTimes: string[];
  luckyColors: string[];
  luckyElements: string[];
}

interface BudgetEstimate {
  total: {
    p10: number;
    median: number;
    p90: number;
  };
  breakdown: {
    venue: { p10: number; median: number; p90: number };
    catering: { p10: number; median: number; p90: number };
    decoration: { p10: number; median: number; p90: number };
    photography: { p10: number; median: number; p90: number };
    entertainment: { p10: number; median: number; p90: number };
    beverages: { p10: number; median: number; p90: number };
    others: { p10: number; median: number; p90: number };
  };
  tips: string[];
}

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  category: string;
}

export default function PlanningPage() {
  const [activeTab, setActiveTab] = useState('auspicious');
  const [auspiciousData, setAuspiciousData] = useState<AuspiciousDate[]>([]);
  const [budgetData, setBudgetData] = useState<BudgetEstimate | null>(null);
  const [checklistData, setChecklistData] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState<string | null>(null);

  // API Data States
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [planningModes, setPlanningModes] = useState<any[]>([]);
  const [eventLevels, setEventLevels] = useState<any[]>([]);
  const [venueTypes, setVenueTypes] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [subdistricts, setSubdistricts] = useState<any[]>([]);

  // Handle province change
  const handleProvinceChange = async (provinceCode: string) => {
    setBudgetForm({ ...budgetForm, location: provinceCode, district: '', subdistrict: '' });
    setDistricts([]);
    setSubdistricts([]);
    
    if (provinceCode) {
      try {
        const districtsData = await PlanningAPI.getDistricts(provinceCode);
        setDistricts(districtsData);
      } catch (error) {
        console.error('Error loading districts:', error);
      }
    }
  };

  // Handle district change
  const handleDistrictChange = async (districtCode: string) => {
    setBudgetForm({ ...budgetForm, district: districtCode, subdistrict: '' });
    setSubdistricts([]);
    
    if (districtCode) {
      try {
        const subdistrictsData = await PlanningAPI.getSubdistricts(districtCode);
        setSubdistricts(subdistrictsData);
      } catch (error) {
        console.error('Error loading subdistricts:', error);
      }
    }
  };

  // Auspicious form state
  const [auspiciousForm, setAuspiciousForm] = useState({
    eventType: '',
    mode: 'moderate',
    startMonth: '',
    endMonth: '',
    birthdate: '',
    partnerBirthdate: '',
    birthTime: '',
    partnerBirthTime: '',
    birthPlace: '',
    partnerBirthPlace: ''
  });

  // Budget form state
  const [budgetForm, setBudgetForm] = useState({
    eventType: '',
    guestCount: 100,
    venue: 'hotel',
    level: 'standard',
    location: 'bangkok',
    district: '',
    subdistrict: ''
  });

  // Checklist form state
  const [checklistForm, setChecklistForm] = useState({
    eventType: '',
    date: '',
    customItems: ''
  });

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setInitialLoading(true);
        setInitialError(null);
        const [eventTypesData, planningModesData, eventLevelsData, venueTypesData, provincesData] = await Promise.all([
          PlanningAPI.getEventTypes(),
          PlanningAPI.getPlanningModes(),
          PlanningAPI.getEventLevels(),
          PlanningAPI.getVenueTypes(),
          PlanningAPI.getProvinces()
        ]);
        
        setEventTypes(eventTypesData);
        setPlanningModes(planningModesData);
        setEventLevels(eventLevelsData);
        setVenueTypes(venueTypesData);
        setProvinces(provincesData);
      } catch (error) {
        console.error('Error loading initial data:', error);
        setInitialError(error instanceof Error ? error.message : 'Failed to load planning options');
      } finally {
        setInitialLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  if (initialLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <PlanningLoadingStates />
      </div>
    );
  }

  if (initialError) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-ivory">
          <h2 className="text-lg font-semibold">Unable to load planning options</h2>
          <p className="mt-2 text-sm text-ivory/70">{initialError}</p>
          <div className="mt-4">
            <Button onClick={() => window.location.reload()}>Reload</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAuspiciousSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        eventType: auspiciousForm.eventType,
        mode: auspiciousForm.mode,
        startDate: auspiciousForm.startMonth,
        endDate: auspiciousForm.endMonth,
        birthDate: auspiciousForm.birthdate,
        partnerBirthDate: auspiciousForm.partnerBirthdate,
        birthTime: auspiciousForm.birthTime,
        partnerBirthTime: auspiciousForm.partnerBirthTime,
        birthPlace: auspiciousForm.birthPlace,
        partnerBirthPlace: auspiciousForm.partnerBirthPlace,
      };
      const result = await PlanningAPI.calculateAuspicious(payload);
      const normalized: AuspiciousDate[] =
        result?.topDates?.map((item) => ({
          date: item.date,
          thaiDate: item.thaiDate ?? '',
          score: item.score,
          rating: item.rating ?? 0,
          reasons: item.reasons ?? [],
          luckyTimes: item.luckyTimes ?? [],
          luckyColors: item.luckyColors ?? [],
          luckyElements: item.luckyElements ?? [],
        })) ?? [];
      setAuspiciousData(normalized);
    } catch (error) {
      console.error('Error generating auspicious dates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBudgetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await PlanningAPI.calculateBudget({
        eventType: budgetForm.eventType,
        guestCount: Number(budgetForm.guestCount),
        tier: budgetForm.level,
        venue: budgetForm.venue,
        zone: budgetForm.location,
        location: budgetForm.location,
        district: budgetForm.district,
        subdistrict: budgetForm.subdistrict,
      });

      if (response) {
        setBudgetData({
          total: response.total,
          breakdown: {
            venue: response.breakdown.venue || { p10: 0, median: 0, p90: 0 },
            catering: response.breakdown.catering || { p10: 0, median: 0, p90: 0 },
            decoration: response.breakdown.decoration || { p10: 0, median: 0, p90: 0 },
            photography: response.breakdown.photography || { p10: 0, median: 0, p90: 0 },
            entertainment: response.breakdown.entertainment || { p10: 0, median: 0, p90: 0 },
            beverages: response.breakdown.beverages || { p10: 0, median: 0, p90: 0 },
            others: response.breakdown.other || response.breakdown.others || { p10: 0, median: 0, p90: 0 },
          },
          tips: response.tips || [],
        });
      } else {
        setBudgetData(null);
      }
    } catch (error) {
      console.error('Error estimating budget:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChecklistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const customItems = checklistForm.customItems
        ? checklistForm.customItems.split('\n').filter(Boolean).map((task) => ({ name: task }))
        : undefined;

      const result = await PlanningAPI.generateChecklist({
        eventType: checklistForm.eventType,
        date: checklistForm.date,
        customItems,
      });

      const tasks: ChecklistItem[] = [];
      if (result?.checklist) {
        Object.values(result.checklist).forEach((group) => {
          group.forEach((item) => {
            tasks.push({
              id: item.id,
              title: item.task,
              completed: item.completed ?? false,
              category: item.owner ?? 'ทั่วไป',
            });
          });
        });
      }
      setChecklistData(tasks);
    } catch (error) {
      console.error('Error generating checklist:', error);
    } finally {
      setLoading(false);
    }
  };


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
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <PlanningErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4 thai-heading">
            เครื่องมือวางแผนพิธีไทย
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            วางแผนงานพิธีของคุณอย่างสมบูรณ์แบบด้วย AI ที่เข้าใจวัฒนธรรมไทย
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="auspicious" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              ฤกษ์ยาม
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              งบประมาณ
            </TabsTrigger>
            <TabsTrigger value="checklist" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              เช็กลิสต์
            </TabsTrigger>
          </TabsList>

          {/* Auspicious Dates Tab */}
          <TabsContent value="auspicious">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  คำนวณฤกษ์ยาม
                </CardTitle>
                <CardDescription>
                  เลือกวันดีสำหรับงานพิธีตามหลักโหราศาสตร์ไทย
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuspiciousSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventType">ประเภทพิธี</Label>
                      <p className="text-xs text-gray-500 mb-2">เลือกประเภทงานเพื่อคำนวณฤกษ์ยามที่เหมาะสม</p>
                      <Select
                        value={auspiciousForm.eventType}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, eventType: e.target.value })}
                      >
                        <option value="">เลือกประเภทพิธี</option>
                        {eventTypes.map((eventType) => (
                          <option key={eventType.value} value={eventType.value}>
                            {eventType.icon} {eventType.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="mode">โหมดการเลือก</Label>
                      <p className="text-xs text-gray-500 mb-2">เลือกระดับความละเอียดในการคำนวณฤกษ์ยาม</p>
                      <Select
                        value={auspiciousForm.mode}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, mode: e.target.value })}
                      >
                        <option value="">เลือกโหมด</option>
                        {planningModes.map((mode) => (
                          <option key={mode.value} value={mode.value}>
                            {mode.icon} {mode.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="startMonth">เดือนเริ่มต้น</Label>
                      <p className="text-xs text-gray-500 mb-2">เลือกช่วงเวลาที่ต้องการจัดงาน</p>
                      <Input
                        type="month"
                        id="startMonth"
                        value={auspiciousForm.startMonth}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, startMonth: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="endMonth">เดือนสิ้นสุด</Label>
                      <p className="text-xs text-gray-500 mb-2">เลือกช่วงเวลาสุดท้ายที่สามารถจัดงานได้</p>
                      <Input
                        type="month"
                        id="endMonth"
                        value={auspiciousForm.endMonth}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, endMonth: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="birthdate">วันเกิดเจ้าภาพ (ไม่บังคับ)</Label>
                      <Input
                        type="date"
                        id="birthdate"
                        value={auspiciousForm.birthdate}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, birthdate: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="partnerBirthdate">วันเกิดคู่ครอง (ไม่บังคับ)</Label>
                      <Input
                        type="date"
                        id="partnerBirthdate"
                        value={auspiciousForm.partnerBirthdate}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, partnerBirthdate: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="birthTime">เวลาเกิดเจ้าภาพ (ไม่บังคับ)</Label>
                      <Input
                        type="time"
                        id="birthTime"
                        value={auspiciousForm.birthTime}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, birthTime: e.target.value })}
                      />
                      <p className="text-xs text-gray-500 mt-1">ช่วยให้การคำนวณแม่นยำขึ้น</p>
                    </div>

                    <div>
                      <Label htmlFor="partnerBirthTime">เวลาเกิดคู่ครอง (ไม่บังคับ)</Label>
                      <Input
                        type="time"
                        id="partnerBirthTime"
                        value={auspiciousForm.partnerBirthTime}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, partnerBirthTime: e.target.value })}
                      />
                      <p className="text-xs text-gray-500 mt-1">ช่วยให้การคำนวณแม่นยำขึ้น</p>
                    </div>

                    <div>
                      <Label htmlFor="birthPlace">สถานที่เกิดเจ้าภาพ (ไม่บังคับ)</Label>
                      <Input
                        id="birthPlace"
                        placeholder="เช่น กรุงเทพมหานคร"
                        value={auspiciousForm.birthPlace}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, birthPlace: e.target.value })}
                      />
                      <p className="text-xs text-gray-500 mt-1">สำหรับปรับตามเขตเวลา</p>
                    </div>

                    <div>
                      <Label htmlFor="partnerBirthPlace">สถานที่เกิดคู่ครอง (ไม่บังคับ)</Label>
                      <Input
                        id="partnerBirthPlace"
                        placeholder="เช่น เชียงใหม่"
                        value={auspiciousForm.partnerBirthPlace}
                        onChange={(e) => setAuspiciousForm({ ...auspiciousForm, partnerBirthPlace: e.target.value })}
                      />
                      <p className="text-xs text-gray-500 mt-1">สำหรับปรับตามเขตเวลา</p>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'กำลังคำนวณ...' : 'คำนวณฤกษ์ยาม'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            {auspiciousData.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">วันที่แนะนำ</h2>
                <div className="grid gap-4">
                  {auspiciousData.map((date, index) => (
                    <Card key={index} className="border-2 border-amber-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{date.thaiDate}</h3>
                            <p className="text-gray-800/70">{new Date(date.date).toLocaleDateString('th-TH')}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-2">
                              {getRatingStars(date.rating)}
                            </div>
                            <p className="text-sm text-gray-800/70">คะแนน: {date.score}/100</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">เหตุผล</h4>
                            <ul className="space-y-1">
                              {date.reasons.map((reason, i) => (
                                <li key={i} className="text-sm text-gray-800/80 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">ฤกษ์ยามดี</h4>
                            <div className="flex flex-wrap gap-2">
                              {date.luckyTimes.map((time, i) => (
                                <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm">
                                  {time}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">สี/ธาตุมงคล</h4>
                            <div className="space-y-1">
                              <div className="flex gap-2">
                                <span className="text-sm text-gray-800/80">สี:</span>
                                <div className="flex gap-1">
                                  {date.luckyColors.map((color, i) => (
                                    <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm">
                                      {color}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-sm text-gray-800/80">ธาตุ:</span>
                                <div className="flex gap-1">
                                  {date.luckyElements.map((element, i) => (
                                    <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm">
                                      {element}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  คำนวณงบประมาณ
                </CardTitle>
                <CardDescription>
                  ประเมินงบประมาณสำหรับงานพิธีของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBudgetSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budgetEventType">ประเภทพิธี</Label>
                      <Select
                        value={budgetForm.eventType}
                        onChange={(e) => setBudgetForm({ ...budgetForm, eventType: e.target.value })}
                      >
                        <option value="">เลือกประเภทพิธี</option>
                        {eventTypes.map((eventType) => (
                          <option key={eventType.value} value={eventType.value}>
                            {eventType.icon} {eventType.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="guestCount">จำนวนแขก</Label>
                      <Input
                        type="number"
                        id="guestCount"
                        min="50"
                        max="1000"
                        value={budgetForm.guestCount}
                        onChange={(e) => setBudgetForm({ ...budgetForm, guestCount: parseInt(e.target.value) })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">จังหวัด</Label>
                      <Select
                        value={budgetForm.location}
                        onChange={(e) => handleProvinceChange(e.target.value)}
                      >
                        <option value="">เลือกจังหวัด</option>
                        {provinces.map((province) => (
                          <option key={province.code} value={province.code}>
                            {province.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="district">อำเภอ/เขต</Label>
                      <Select
                        value={budgetForm.district}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                      >
                        <option value="">เลือกอำเภอ/เขต</option>
                        {districts.map((district) => (
                          <option key={district.code} value={district.code}>
                            {district.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subdistrict">ตำบล/แขวง</Label>
                      <Select
                        value={budgetForm.subdistrict}
                        onChange={(e) => setBudgetForm({ ...budgetForm, subdistrict: e.target.value })}
                      >
                        <option value="">เลือกตำบล/แขวง (ไม่บังคับ)</option>
                        {subdistricts.map((subdistrict) => (
                          <option key={subdistrict.code} value={subdistrict.code}>
                            {subdistrict.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="venue">สถานที่</Label>
                      <Select
                        value={budgetForm.venue}
                        onChange={(e) => setBudgetForm({ ...budgetForm, venue: e.target.value })}
                      >
                        <option value="">เลือกสถานที่</option>
                        {venueTypes.map((venue) => (
                          <option key={venue.value} value={venue.value}>
                            {venue.icon} {venue.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="level">ระดับงาน</Label>
                      <Select
                        value={budgetForm.level}
                        onChange={(e) => setBudgetForm({ ...budgetForm, level: e.target.value })}
                      >
                        <option value="">เลือกระดับงาน</option>
                        {eventLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.icon} {level.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'กำลังคำนวณ...' : 'คำนวณงบประมาณ'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Budget Results */}
            {budgetData && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">งบประมาณที่แนะนำ</h2>
                
                {/* Total Budget */}
                <Card className="border-2 border-amber-200">
                  <CardContent className="p-6">
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">ข้อมูลพื้นที่</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">จังหวัด:</span>
                        <span className="ml-2 font-medium text-gray-800">
                          {budgetForm.location === 'bangkok' ? 'กรุงเทพมหานคร' :
                           budgetForm.location === 'chiangmai' ? 'เชียงใหม่' :
                           budgetForm.location === 'phuket' ? 'ภูเก็ต' :
                           budgetForm.location === 'pattaya' ? 'พัทยา' :
                           budgetForm.location === 'krabi' ? 'กระบี่' :
                           budgetForm.location === 'samui' ? 'เกาะสมุย' :
                           budgetForm.location === 'hua_hin' ? 'หัวหิน' :
                           budgetForm.location === 'kanchanaburi' ? 'กาญจนบุรี' :
                           budgetForm.location === 'ayutthaya' ? 'อยุธยา' :
                           budgetForm.location === 'sukhothai' ? 'สุโขทัย' :
                           budgetForm.location === 'lampang' ? 'ลำปาง' :
                           budgetForm.location === 'chiangrai' ? 'เชียงราย' :
                           budgetForm.location === 'nan' ? 'น่าน' :
                           budgetForm.location === 'phrae' ? 'แพร่' :
                           'อื่นๆ'}
                        </span>
                      </div>
                      {budgetForm.district && (
                        <div>
                          <span className="text-gray-600">อำเภอ/เขต:</span>
                          <span className="ml-2 font-medium text-gray-800">{budgetForm.district}</span>
                        </div>
                      )}
                      {budgetForm.subdistrict && (
                        <div>
                          <span className="text-gray-600">ตำบล/แขวง:</span>
                          <span className="ml-2 font-medium text-gray-800">{budgetForm.subdistrict}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4">งบประมาณรวม</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <p className="text-sm text-gray-800/70 mb-1">ประหยัด</p>
                        <p className="text-2xl font-bold text-gray-800">{formatCurrency(budgetData.total.p10)}</p>
                      </div>
                      <div className="text-center p-4 bg-amber-100 rounded-lg">
                        <p className="text-sm text-gray-800/70 mb-1">พอดี</p>
                        <p className="text-2xl font-bold text-gray-800">{formatCurrency(budgetData.total.median)}</p>
                      </div>
                      <div className="text-center p-4 bg-amber-200 rounded-lg">
                        <p className="text-sm text-gray-800/70 mb-1">พรีเมียม</p>
                        <p className="text-2xl font-bold text-gray-800">{formatCurrency(budgetData.total.p90)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>แบ่งตามหมวด</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">หมวด</th>
                            <th className="text-right py-2">ประหยัด</th>
                            <th className="text-right py-2">พอดี</th>
                            <th className="text-right py-2">พรีเมียม</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(budgetData.breakdown).map(([category, prices]) => (
                            <tr key={category} className="border-b">
                              <td className="py-2 capitalize">{category}</td>
                              <td className="text-right py-2">{formatCurrency(prices.p10)}</td>
                              <td className="text-right py-2">{formatCurrency(prices.median)}</td>
                              <td className="text-right py-2">{formatCurrency(prices.p90)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle>คำแนะนำ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {budgetData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-800/80">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Checklist Tab */}
          <TabsContent value="checklist">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5" />
                  สร้างเช็กลิสต์
                </CardTitle>
                <CardDescription>
                  สร้างรายการสิ่งที่ต้องทำและไทม์ไลน์สำหรับงานพิธี
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChecklistSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checklistEventType">ประเภทพิธี</Label>
                      <Select
                        value={checklistForm.eventType}
                        onChange={(e) => setChecklistForm({ ...checklistForm, eventType: e.target.value })}
                      >
                        <option value="">เลือกประเภทพิธี</option>
                        {eventTypes.map((eventType) => (
                          <option key={eventType.value} value={eventType.value}>
                            {eventType.icon} {eventType.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="eventDate">วันที่จัดงาน</Label>
                      <Input
                        type="date"
                        id="eventDate"
                        value={checklistForm.date}
                        onChange={(e) => setChecklistForm({ ...checklistForm, date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customItems">รายการเพิ่มเติม (ไม่บังคับ)</Label>
                    <Input
                      id="customItems"
                      placeholder="จองรถเช่า, จองโรงแรมสำหรับญาติ (คั่นด้วยจุลภาค)"
                      value={checklistForm.customItems}
                      onChange={(e) => setChecklistForm({ ...checklistForm, customItems: e.target.value })}
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'กำลังสร้าง...' : 'สร้างเช็กลิสต์'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Checklist Results */}
            {checklistData.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">เช็กลิสต์งานพิธี</h2>
                
                <div className="grid gap-6">
                  {['3_months_before', '1_month_before', '1_week_before', 'day_of'].map((category) => {
                    const categoryItems = checklistData.filter(item => item.category === category);
                    if (categoryItems.length === 0) return null;

                    const categoryTitle = {
                      '3_months_before': '3 เดือนก่อนงาน',
                      '1_month_before': '1 เดือนก่อนงาน',
                      '1_week_before': '1 สัปดาห์ก่อนงาน',
                      'day_of': 'วันงาน'
                    }[category];

                    return (
                      <Card key={category}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            {categoryTitle}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {categoryItems.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                                <input
                                  type="checkbox"
                                  id={item.id}
                                  checked={item.completed}
                                  onChange={(e) => {
                                    setChecklistData(prev => 
                                      prev.map(i => 
                                        i.id === item.id ? { ...i, completed: e.target.checked } : i
                                      )
                                    );
                                  }}
                                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                                />
                                <label htmlFor={item.id} className="flex-1 cursor-pointer">
                                  <span className={`${item.completed ? 'line-through text-gray-800/60' : 'text-gray-800'}`}>
                                    {item.title}
                                  </span>
                                  {item.dueDate && (
                                    <span className="ml-2 text-sm text-gray-800/60">
                                      (กำหนด: {new Date(item.dueDate).toLocaleDateString('th-TH')})
                                    </span>
                                  )}
                                </label>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Export Section */}
        {(auspiciousData.length > 0 || budgetData || checklistData.length > 0) && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                ส่งออกข้อมูล
              </CardTitle>
              <CardDescription>
                ดาวน์โหลดข้อมูลทั้งหมดเป็น PDF หรือ Excel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  ดาวน์โหลด PDF
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  ดาวน์โหลด Excel
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  แชร์ลิงก์
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </PlanningErrorBoundary>
  );
}
