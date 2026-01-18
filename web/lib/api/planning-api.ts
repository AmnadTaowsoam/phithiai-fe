import { z } from 'zod';
import { apiFetch } from './http';
import type { ApiFetchOptions } from './http';
import { apiRoutes } from './config';
import {
  optionWithIconSchema,
  provinceSchema,
  districtSchema,
  subdistrictSchema,
  auspiciousPlanningSchema,
  budgetEstimateSchema,
  planningChecklistSchema,
} from './schema';
import { planningFallbacks } from './fallbacks';

const fallbackEventTypes = [
  { value: 'wedding', label: 'งานแต่งงาน', icon: '💒' },
  { value: 'ordination', label: 'งานบวช', icon: '🧘' },
  { value: 'funeral', label: 'งานศพ', icon: '🕊️' },
  { value: 'housewarming', label: 'งานขึ้นบ้านใหม่', icon: '🏠' },
  { value: 'merit', label: 'งานทำบุญ', icon: '🙏' },
];

const fallbackPlanningModes = [
  { value: 'astrology', label: 'โหมดโหร', icon: '🔮', description: 'คำนวณเต็มรูปแบบ' },
  { value: 'moderate', label: 'โหมดกลาง', icon: '⚖️', description: 'ดูเฉพาะฤกษ์สำคัญ' },
  { value: 'simple', label: 'โหมดง่าย', icon: '✨', description: 'เลือกเฉพาะวันดี' },
];

const fallbackEventLevels = [
  { value: 'budget', label: 'ประหยัด', icon: '💰' },
  { value: 'standard', label: 'มาตรฐาน', icon: '💎' },
  { value: 'premium', label: 'พรีเมียม', icon: '👑' },
];

const fallbackVenueTypes = [
  { value: 'home', label: 'บ้าน/วัด', icon: '🏠' },
  { value: 'hotel', label: 'โรงแรม', icon: '🏨' },
  { value: 'outdoor', label: 'กลางแจ้ง', icon: '🌳' },
  { value: 'resort', label: 'รีสอร์ท', icon: '🏖️' },
];

const fallbackProvinces = [
  { code: '10', name: 'กรุงเทพมหานคร', name_en: 'Bangkok' },
  { code: '50', name: 'เชียงใหม่', name_en: 'Chiang Mai' },
  { code: '83', name: 'ภูเก็ต', name_en: 'Phuket' },
];

const fallbackDistricts: Record<string, Array<{ code: string; name: string }>> = {
  '10': [
    { code: '1001', name: 'พระนคร' },
    { code: '1002', name: 'ดุสิต' },
  ],
  '50': [
    { code: '5001', name: 'เมืองเชียงใหม่' },
    { code: '5002', name: 'จอมทอง' },
  ],
};

const fallbackSubdistricts: Record<string, Array<{ code: string; name: string; postcode?: string }>> = {
  '1001': [
    { code: '100101', name: 'พระบรมมหาราชวัง', postcode: '10200' },
    { code: '100102', name: 'วังบูรพาภิรมย์', postcode: '10200' },
  ],
  '5001': [
    { code: '500101', name: 'ศรีภูมิ', postcode: '50200' },
    { code: '500102', name: 'พระสิงห์', postcode: '50200' },
  ],
};

const safeFetch = async <T>(
  path: string,
  schema: z.ZodType<T>,
  fallback: () => T | Promise<T>,
  options: Omit<ApiFetchOptions<T, T>, 'schema'> = {},
) => {
  const attempt = async () => apiFetch<T, T>(path, { schema, fallback, ...options });

  try {
    return await attempt();
  } catch (_error) {
    // Retry once for transient failures (timeouts/network)
    await new Promise((resolve) => setTimeout(resolve, 250));
    try {
      return await attempt();
    } catch (_retryError) {
      return fallback();
    }
  }
};

export class PlanningAPI {
  static async getEventTypes() {
    return safeFetch(
      apiRoutes.planning.eventTypes,
      z.array(optionWithIconSchema),
      () => fallbackEventTypes,
      {
        selector: (envelope) => (envelope.data as any)?.eventTypes,
      }
    );
  }

  static async getPlanningModes() {
    return safeFetch(
      apiRoutes.planning.planningModes,
      z.array(optionWithIconSchema),
      () => fallbackPlanningModes,
      {
        selector: (envelope) => (envelope.data as any)?.planningModes,
      }
    );
  }

  static async getEventLevels() {
    return safeFetch(
      apiRoutes.planning.eventLevels,
      z.array(optionWithIconSchema),
      () => fallbackEventLevels,
      {
        selector: (envelope) => (envelope.data as any)?.eventLevels,
      }
    );
  }

  static async getVenueTypes() {
    return safeFetch(
      apiRoutes.planning.venueTypes,
      z.array(optionWithIconSchema),
      () => fallbackVenueTypes,
      {
        selector: (envelope) => (envelope.data as any)?.venueTypes,
      }
    );
  }

  static async getProvinces() {
    return safeFetch(apiRoutes.planning.provinces, z.array(provinceSchema), () => fallbackProvinces, {
      selector: (envelope) => (envelope.data as any)?.provinces,
    });
  }

  static async getDistricts(provinceCode: string) {
    if (!provinceCode) return [];
    return safeFetch(
      apiRoutes.planning.districts,
      z.array(districtSchema),
      () => fallbackDistricts[provinceCode] ?? [],
      { query: { province: provinceCode }, selector: (envelope) => (envelope.data as any)?.districts },
    );
  }

  static async getSubdistricts(districtCode: string) {
    if (!districtCode) return [];
    return safeFetch(
      apiRoutes.planning.subdistricts,
      z.array(subdistrictSchema),
      () => fallbackSubdistricts[districtCode] ?? [],
      { query: { district: districtCode }, selector: (envelope) => (envelope.data as any)?.subdistricts },
    );
  }

  static async calculateAuspicious(payload: Record<string, unknown>) {
    return apiFetch(apiRoutes.planning.tools.auspicious, {
      method: 'POST',
      schema: auspiciousPlanningSchema,
      body: payload,
      fallback: planningFallbacks.auspicious,
      selector: (envelope) => {
        const dates = (envelope.data as any)?.dates ?? [];
        const toStars = (score: number) => {
          if (score >= 80) return 5;
          if (score >= 65) return 4;
          if (score >= 50) return 3;
          if (score >= 35) return 2;
          return 1;
        };

        return {
          topDates: Array.isArray(dates)
            ? dates.map((item: any) => ({
                date: typeof item?.date === 'string' ? item.date : '',
                thaiDate: typeof item?.lunarText === 'string' ? item.lunarText : undefined,
                score: typeof item?.score === 'number' ? item.score : 0,
                rating: typeof item?.score === 'number' ? toStars(item.score) : undefined,
                reasons: Array.isArray(item?.reasons) ? item.reasons : undefined,
                luckyTimes: [],
                luckyColors: [],
                luckyElements: [],
              }))
            : [],
        };
      },
    });
  }

  static async calculateBudget(payload: Record<string, unknown>) {
    return apiFetch(apiRoutes.planning.tools.estimateBudget, {
      method: 'POST',
      schema: budgetEstimateSchema,
      body: payload,
      fallback: planningFallbacks.budget,
      selector: (envelope) => {
        const estimate = (envelope.data as any)?.estimate;
        const median = typeof estimate?.total === 'number' ? estimate.total : 0;
        const p10 = Math.round(median * 0.85);
        const p90 = Math.round(median * 1.15);

        const breakdown = (estimate?.breakdown ?? {}) as Record<string, number>;
        const percentile = (value: number) => ({
          p10: Math.round(value * 0.85),
          median: Math.round(value),
          p90: Math.round(value * 1.15),
        });

        return {
          total: { p10, median, p90 },
          breakdown: {
            venue: percentile(breakdown.venue ?? 0),
            catering: percentile(breakdown.catering ?? 0),
            decoration: percentile(breakdown.decoration ?? 0),
            photography: percentile(breakdown.photography ?? 0),
            entertainment: percentile(breakdown.entertainment ?? 0),
            beverages: percentile(breakdown.beverages ?? 0),
            others: percentile(breakdown.other ?? breakdown.others ?? 0),
          },
          perGuestCost: estimate?.pricePerGuest ? percentile(estimate.pricePerGuest) : undefined,
          tips: Array.isArray(estimate?.details)
            ? estimate.details
                .map((d: any) => (typeof d?.description === 'string' ? d.description : null))
                .filter(Boolean)
            : undefined,
        };
      },
    });
  }

  static async generateChecklist(payload: Record<string, unknown>) {
    return apiFetch(apiRoutes.planning.tools.generateChecklist, {
      method: 'POST',
      schema: planningChecklistSchema,
      body: payload,
      fallback: planningFallbacks.checklist,
      selector: (envelope) => {
        const tasks = (envelope.data as any)?.checklist ?? [];
        const grouped: Record<string, Array<{ id: string; task: string; completed?: boolean; owner?: string }>> = {};

        if (Array.isArray(tasks)) {
          tasks.forEach((task: any) => {
            const phase = typeof task?.phase === 'string' ? task.phase : 'ทั่วไป';
            const id = typeof task?.id === 'string' ? task.id : '';
            const name = typeof task?.name === 'string' ? task.name : '';
            const completed = typeof task?.completed === 'boolean' ? task.completed : false;
            const owner =
              typeof task?.categoryName === 'string'
                ? task.categoryName
                : typeof task?.category === 'string'
                  ? task.category
                  : undefined;

            if (!grouped[phase]) grouped[phase] = [];
            grouped[phase].push({ id, task: name, completed, owner });
          });
        }

        return { checklist: grouped };
      },
    });
  }
}
