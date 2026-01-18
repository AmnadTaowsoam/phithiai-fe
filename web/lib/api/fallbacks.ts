import type {
  AuspiciousPlanning,
  BudgetEstimate,
  PlanningChecklist,
  VendorDetail,
  VendorSummary,
} from './schema';

const fallbackVendors: VendorDetail[] = [
  {
    id: 'vendor_maison_lanna',
    name: 'Maison Lanna Collective',
    slug: 'maison-lanna-collective',
    logo: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=320&q=80',
    coverImage:
      'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1200&q=80',
    description:
      'งานดอกไม้คูตูร์และการจัดพิธีแบบแช่ตัว ฝังรากในงานฝีมือล้านนา คัดสรรเฉพาะงานฉลองระดับสูง',
    longDescription:
      'Maison Lanna Collective สานเรื่องราวผ่านศิลปะพฤกษศาสตร์ การจัดแสงสถาปัตยกรรม และการติดตั้งเฉพาะที่ให้เกียรติมรดกล้านนา แต่ละงานถูกจัดการโดยคอนเซียร์จออกแบบเฉพาะและเครื่องมือออเคสเตรชัน phithiai เพื่อไทม์ไลน์ที่แม่นยำ',
    category: 'decoration',
    zone: 'chiang-mai',
    rating: 4.9,
    reviewCount: 87,
    verified: true,
    startingPrice: 120000,
    tags: ['งานดอกไม้คูตูร์', 'การออกแบบแช่ตัว', 'ล้านนา'],
    availability: { status: 'available', leadTimeDays: 45 },
    packages: [
      {
        id: 'pkg_ml_01',
        name: 'Lotus Reverie',
        price: 185000,
        description: 'ดอกไม้พิธีพร้อมการแสดงตัวอย่างความเป็นจริงเสริมและประสบการณ์น้ำหอมในสถานที่',
        includes: [
          'การทำแผนที่ดอกไม้แบบโต้ตอบด้วย phithiai Vision',
          'น้ำตกดอกบัวผูกมือและทางเข้าพิธี',
          'บาร์กลิ่นสดกับช่างน้ำหอมผู้เชี่ยวชาญ',
        ],
        addons: [{ name: 'แสงขบวนแห่โฮโลแกรม', price: 35000 }],
      },
    ],
    stats: {
      totalBookings: 162,
      completionRate: 99,
      avgResponseTime: 35,
      responseTimeUnit: 'minutes',
    },
    contact: {
      phone: '+66912340000',
      email: 'concierge@maisonlanna.com',
      website: 'https://maisonlanna.com',
      instagram: '@maisonlanna',
      line: '@maisonlanna',
    },
    address: '78 Fing Bua Alley, Chiang Mai Old Town, Chiang Mai',
    location: {
      lat: 18.7883,
      lng: 98.9853,
    },
    featuredIn: ['Vogue Wedding Thailand', 'Thailand Tatler Celebrations'],
  },
  {
    id: 'vendor_silk_atelier',
    name: 'Silk Atelier Chiang Mai',
    slug: 'silk-atelier-chiang-mai',
    logo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=320&q=80',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'ชุดผ้าไหมเฉพาะตัว ชุดพิธี และการออกแบบตู้เสื้อผ้ามรดก',
    longDescription:
      'Silk Atelier คัดสรรคลังเสื้อผ้าที่สวมใส่ได้ เกิดแรงบันดาลใจจากรูปทรงราชวงศ์ไทยและคูตูร์ร่วมสมัย แต่ละชิ้นถูกวัดตัวแบบดิจิทัลด้วย phithiai Draper และเสร็จสิ้นด้วยการตกแต่งทอด้วยมือจากสหกรณ์ช่างฝีมือ',
    category: 'attire',
    zone: 'bangkok',
    rating: 4.95,
    reviewCount: 132,
    startingPrice: 65000,
    verified: true,
    tags: ['อาเทลิเยร์', 'ผ้าไหมเฉพาะตัว', 'การปักมรดก'],
    availability: { status: 'waitlist', leadTimeDays: 75 },
    packages: [
      {
        id: 'pkg_sa_01',
        name: 'Royal Heritage Capsule',
        price: 230000,
        description:
          'ชุดขบวนแห่สามแบบพร้อมการจัดสไตล์เครื่องประดับเฉพาะตัวและการวิจัยลวดลายบรรพบุรุษ',
        includes: [
          'การสแกนร่างกาย 3D ด้วย phithiai Draper',
          'ผ้าดอกไหมทอด้วยมือพร้อมงานทองเฉพาะตัว',
          'การปรึกษาสัญลักษณ์ทางวัฒนธรรมกับนักประวัติศาสตร์ประจำ',
        ],
        addons: [{ name: 'ผ้าคลุมไหมดอกบัว', price: 18000 }],
      },
    ],
    stats: {
      totalBookings: 204,
      completionRate: 98,
      avgResponseTime: 55,
      responseTimeUnit: 'minutes',
    },
    contact: {
      phone: '+66876540000',
      email: 'hello@silkatelier.co',
      website: 'https://silkatelier.co',
      instagram: '@silkatelier',
      line: '@silkatelier',
    },
    address: '18 Sukhumvit 31, Klongtoey Nua, Bangkok',
    location: {
      lat: 13.7427,
      lng: 100.567,
    },
    awards: [
      {
        year: 2024,
        title: 'รางวัลช่างฝีมือมรดกไทย',
        organization: 'กรมส่งเสริมวัฒนธรรม',
      },
    ],
  },
  {
    id: 'vendor_siam_symphony',
    name: 'Siam Symphony',
    slug: 'siam-symphony',
    logo: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=320&q=80',
    coverImage:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    description:
      'การกำกับดนตรีเฉพาะตัว วงดนตรีสด และเสียงประกอบด้วย AI สำหรับช่วงเวลาพิธี',
    longDescription:
      'Siam Symphony คัดสรรการแสดงแบบหลายประสาทสัมผัส ผสมผสานเครื่องดนตรีไทยคลาสสิกกับวงดนตรีสมัยใหม่ phithiai Maestro เพิ่มรายการเพลงโดยใช้ข้อมูลการปรับจูนจากงานฉลองก่อนหน้า',
    category: 'entertainment',
    zone: 'bangkok',
    rating: 4.85,
    reviewCount: 64,
    verified: true,
    startingPrice: 90000,
    tags: ['วงออเคสตร้าสด', 'การออกแบบเสียง', 'ขบวนแห่'],
    availability: { status: 'available', leadTimeDays: 30 },
    packages: [
      {
        id: 'pkg_ss_01',
        name: 'Celestial Ceremony Suite',
        price: 145000,
        description: 'การออเคสเตรชันขบวนแห่ คอนเสิร์ตอาหารค่ำ และการให้คะแนนรอบทิศทางแช่ตัว',
        includes: [
          'วงออเคสตร้าห้องไทยพร้อมศิลปินเดี่ยวแขก',
          'การปรับจูนความรู้สึก phithiai Maestro',
          'วิศวกรรมเสียงเชิงพื้นที่พร้อมเสียงสะท้อนวัด',
        ],
        addons: [{ name: 'โปรแกรมผู้ชมเสริมความเป็นจริง', price: 22000 }],
      },
    ],
    stats: {
      totalBookings: 138,
      completionRate: 100,
      avgResponseTime: 15,
      responseTimeUnit: 'minutes',
    },
    contact: {
      phone: '+6621234567',
      email: 'concierge@siamsymphony.com',
      website: 'https://siamsymphony.com',
      instagram: '@siamsymphony',
    },
    featuredIn: ['Prestige Thailand', 'HiSo Party Magazine'],
  },
];

const clone = <T>(value: T): T => structuredClone(value);

export const vendorCollectionFallback = () => {
  const items: VendorSummary[] = fallbackVendors.map(
    ({ id, name, slug, logo, coverImage, description, category, zone, rating, reviewCount, verified, startingPrice, tags, availability }) => ({
      id,
      name,
      slug,
      logo,
      coverImage,
      description,
      category,
      zone,
      rating,
      reviewCount,
      verified,
      startingPrice,
      tags,
      availability,
    }),
  );

  return {
    items,
    pagination: undefined,
  };
};

export const vendorDetailFallback = (idOrSlug: string, _error?: unknown) => {
  const vendor =
    fallbackVendors.find((item) => item.id === idOrSlug || item.slug === idOrSlug) ??
    fallbackVendors[0];

  return clone({
    ...vendor,
    id: vendor.id ?? idOrSlug,
    slug: vendor.slug ?? idOrSlug,
  });
};

export const auspiciousFallback = (): AuspiciousPlanning =>
  clone({
    topDates: [
      {
        date: '2025-06-15',
        thaiDate: 'วันอาทิตย์ ที่ 15 เดือนมิถุนายน พ.ศ. 2568',
        score: 95,
        rating: 5,
        reasons: [
          'ฤกษ์มหาทักษาที่เกื้อหนุนงานมงคลสมรส',
          'พลังจิตวิญญาณสัมพันธ์ธาตุดินและน้ำที่สมดุล',
          'เหมาะสำหรับพิธีสงฆ์ช่วงเช้าและงานเลี้ยงค่ำ',
        ],
        luckyTimes: ['08:39-10:15', '18:09-20:00'],
        luckyColors: ['ทอง', 'ชมพู'],
        luckyElements: ['ดิน', 'ทอง'],
      },
      {
        date: '2025-07-20',
        thaiDate: 'วันอาทิตย์ ที่ 20 เดือนกรกฎาคม พ.ศ. 2568',
        score: 88,
        rating: 4,
        reasons: ['วันธงชัย เหมาะกับงานเฉลิมฉลอง', 'ดาวคู่สมรสเด่นทั้งคู่'],
        luckyTimes: ['09:09-11:00', '19:19-21:00'],
        luckyColors: ['เขียวมรกต', 'ขาวงาช้าง'],
        luckyElements: ['ไม้', 'ทอง'],
      },
    ],
    calendar: {
      '2025-06': {
        '15': { level: 'excellent', score: 95 },
        '22': { level: 'good', score: 82 },
        '29': { level: 'fair', score: 68 },
      },
      '2025-07': {
        '7': { level: 'auspicious', score: 86 },
        '20': { level: 'excellent', score: 88 },
      },
    },
  });

export const budgetEstimateFallback = (): BudgetEstimate =>
  clone({
    total: { p10: 240000, median: 420000, p90: 1180000 },
    breakdown: {
      venue: { p10: 30000, median: 70000, p90: 180000 },
      catering: { p10: 110000, median: 210000, p90: 420000 },
      decoration: { p10: 20000, median: 45000, p90: 160000 },
      photography: { p10: 20000, median: 40000, p90: 120000 },
      entertainment: { p10: 15000, median: 32000, p90: 90000 },
      beverages: { p10: 8000, median: 20000, p90: 60000 },
      ritual: { p10: 10000, median: 25000, p90: 70000 },
      others: { p10: 8000, median: 20000, p90: 50000 },
    },
    perGuestCost: { p10: 1200, median: 2100, p90: 5200 },
    tips: [
      'จัดสรรงบพิธีสงฆ์และพิธีไทยให้แยกจากงานเลี้ยงอย่างน้อย 15%',
      'เผื่อ contingency ไม่น้อยกว่า 12% สำหรับค่าใช้จ่าย surprise',
      'เลือก vendor ที่มี milestone payment เพื่อควบคุม cash flow',
    ],
  });

export const planningChecklistFallback = (): PlanningChecklist =>
  clone({
    checklist: {
      nine_months_before: [
        {
          id: 'cl_9m_01',
          task: 'ยืนยันธีมพิธีและ moodboard กับมาลายครีเอทีฟ',
          completed: false,
        },
        {
          id: 'cl_9m_02',
          task: 'จองสถานที่หลักและสถานที่สำรอง',
          completed: false,
          owner: 'planner',
        },
      ],
      three_months_before: [
        { id: 'cl_3m_01', task: 'ทดลองชุดพิธี พร้อม AI fitting session', owner: 'bride' },
        { id: 'cl_3m_02', task: 'ยืนยันรายการอาหารและแพ้อาหารแขก', owner: 'groom' },
      ],
      one_week_before: [
        { id: 'cl_1w_01', task: 'Final vendor sync ผ่าน phithiai Ops', owner: 'planner' },
        { id: 'cl_1w_02', task: 'จัดชุดเซอร์ไพรส์สำหรับงานเลี้ยงเย็น', owner: 'bride' },
      ],
      day_of: [
        { id: 'cl_d_01', task: 'ทำบุญตักบาตรเช้า', owner: 'family' },
        { id: 'cl_d_02', task: 'พิธีรดน้ำสังข์ 10:09 น.', owner: 'planner' },
      ],
    },
    timeline: [
      { time: '06:00', activity: 'ทีมมาลายเซ็ตอัพพิธีสงฆ์', owner: 'phithiai crew' },
      { time: '09:09', activity: 'พิธีหมั้น & รดน้ำสังข์', owner: 'master of ceremony' },
      { time: '18:30', activity: 'งานเลี้ยงค่ำพร้อม performance Siam Symphony', owner: 'music director' },
    ],
  });

export const planningFallbacks = {
  auspicious: auspiciousFallback,
  budget: budgetEstimateFallback,
  checklist: planningChecklistFallback,
};
