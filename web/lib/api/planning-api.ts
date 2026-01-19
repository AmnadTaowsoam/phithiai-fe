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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async <T>(
  path: string,
  schema: z.ZodType<T>,
  options: Omit<ApiFetchOptions<T, unknown>, 'schema'> = {},
) => {
  try {
    return await apiFetch<T, any>(path, { schema, ...options } as any);
  } catch (error) {
    await sleep(250);
    return await apiFetch<T, any>(path, { schema, ...options } as any);
  }
};

export class PlanningAPI {
  static async getEventTypes() {
    return fetchWithRetry(apiRoutes.planning.eventTypes, z.array(optionWithIconSchema), {
      selector: (envelope) => (envelope.data as any)?.eventTypes,
    });
  }

  static async getPlanningModes() {
    return fetchWithRetry(apiRoutes.planning.planningModes, z.array(optionWithIconSchema), {
      selector: (envelope) => (envelope.data as any)?.planningModes,
    });
  }

  static async getEventLevels() {
    return fetchWithRetry(apiRoutes.planning.eventLevels, z.array(optionWithIconSchema), {
      selector: (envelope) => (envelope.data as any)?.eventLevels,
    });
  }

  static async getVenueTypes() {
    return fetchWithRetry(apiRoutes.planning.venueTypes, z.array(optionWithIconSchema), {
      selector: (envelope) => (envelope.data as any)?.venueTypes,
    });
  }

  static async getProvinces() {
    return fetchWithRetry(apiRoutes.planning.provinces, z.array(provinceSchema), {
      selector: (envelope) => (envelope.data as any)?.provinces,
    });
  }

  static async getDistricts(provinceCode: string) {
    if (!provinceCode) return [];
    return fetchWithRetry(apiRoutes.planning.districts, z.array(districtSchema), {
      query: { province: provinceCode },
      selector: (envelope) => (envelope.data as any)?.districts,
    });
  }

  static async getSubdistricts(districtCode: string) {
    if (!districtCode) return [];
    return fetchWithRetry(apiRoutes.planning.subdistricts, z.array(subdistrictSchema), {
      query: { district: districtCode },
      selector: (envelope) => (envelope.data as any)?.subdistricts,
    });
  }

  static async calculateAuspicious(payload: Record<string, unknown>) {
    return apiFetch(apiRoutes.planning.tools.auspicious, {
      method: 'POST',
      schema: auspiciousPlanningSchema,
      body: payload,
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
