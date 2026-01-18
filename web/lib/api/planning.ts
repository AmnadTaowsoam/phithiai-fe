import { z } from 'zod';
import { apiFetch } from './http';
import { apiRoutes } from './config';
import {
  auspiciousDateSchema,
  auspiciousPlanningSchema,
  budgetEstimateSchema,
  planningChecklistSchema,
  ceremonyTemplateSchema,
  planTimelineSchema,
  checklistAnalyticsSchema,
  checklistTaskV1Schema,
  type AuspiciousPlanning,
  type BudgetEstimate,
  type PlanningChecklist,
  type CeremonyTemplate,
  type PlanTimeline,
  type ChecklistAnalytics,
  type ChecklistTaskV1,
} from './schema';
import { planningFallbacks } from './fallbacks';

export type AuspiciousRequest = {
  eventType: string;
  mode?: 'traditional' | 'moderate' | 'modern';
  startMonth: string;
  endMonth: string;
  birthdate?: string;
  partnerBirthdate?: string;
};

export const generateAuspiciousDates = (payload: AuspiciousRequest) =>
  apiFetch<AuspiciousPlanning, AuspiciousPlanning>(apiRoutes.planning.tools.auspicious, {
    method: 'POST',
    schema: auspiciousPlanningSchema,
    body: payload,
    fallback: planningFallbacks.auspicious,
  });

export type BudgetEstimateRequest = {
  eventType: string;
  guestCount: number;
  venue: string;
  level?: string;
};

export const estimateBudget = (payload: BudgetEstimateRequest) =>
  apiFetch<BudgetEstimate, BudgetEstimate>(apiRoutes.planning.tools.estimateBudget, {
    method: 'POST',
    schema: budgetEstimateSchema,
    body: payload,
    fallback: planningFallbacks.budget,
  });

export type ChecklistRequest = {
  eventType: string;
  date: string;
  customItems?: string[];
};

export const generateChecklist = (payload: ChecklistRequest) =>
  apiFetch<PlanningChecklist, PlanningChecklist>(apiRoutes.planning.tools.generateChecklist, {
    method: 'POST',
    schema: planningChecklistSchema,
    body: payload,
    fallback: planningFallbacks.checklist,
  });

export const getCeremonyTemplate = (type: string) =>
  apiFetch<CeremonyTemplate, CeremonyTemplate>(apiRoutes.planning.v1.template(type), {
    method: 'GET',
    schema: ceremonyTemplateSchema,
    fallback: () =>
      ({
        key: type,
        name: type,
      }) as CeremonyTemplate,
  });

export type TimelineRequest = {
  eventDate?: string;
  includeChecklist?: boolean;
  customTasks?: Array<{
    name: string;
    category?: string;
    priority?: string;
    deadline?: string;
  }>;
};

export const generatePlanTimeline = (planId: string, payload: TimelineRequest) =>
  apiFetch<PlanTimeline, PlanTimeline>(apiRoutes.planning.v1.timeline(planId), {
    method: 'POST',
    schema: planTimelineSchema,
    body: payload,
  });

export const calculatePlanAuspicious = (
  planId: string,
  payload: Partial<{ startDate: string; endDate: string; mode: 'astrologer' | 'balanced' | 'convenient'; topN: number }>,
) =>
  apiFetch<{ dates: AuspiciousPlanning['topDates'] }, { dates: AuspiciousPlanning['topDates'] }>(
    apiRoutes.planning.v1.auspicious(planId),
    {
      method: 'POST',
      schema: z.object({ dates: z.array(auspiciousDateSchema) }),
      body: payload,
    },
  );

export const getPlanChecklist = (planId: string, regenerate?: boolean) =>
  apiFetch<{ checklist: ChecklistTaskV1[]; analytics: ChecklistAnalytics }, { checklist: ChecklistTaskV1[]; analytics: ChecklistAnalytics }>(
    apiRoutes.planning.v1.checklist(planId),
    {
      method: 'GET',
      schema: z.object({
        checklist: z.array(checklistTaskV1Schema),
        analytics: checklistAnalyticsSchema,
      }),
      query: regenerate ? { regenerate: 'true' } : undefined,
    },
  );

export const updateChecklistTask = (taskId: string, payload: { planId: string } & Partial<ChecklistTaskV1>) =>
  apiFetch<{ task: ChecklistTaskV1; analytics: ChecklistAnalytics }, { task: ChecklistTaskV1; analytics: ChecklistAnalytics }>(
    apiRoutes.planning.v1.updateTask(taskId),
    {
      method: 'PATCH',
      schema: z.object({
        task: checklistTaskV1Schema,
        analytics: checklistAnalyticsSchema,
      }),
      body: payload,
    },
  );

export const getBudgetForecastForPlan = (planId: string, tier?: 'basic' | 'standard' | 'premium') =>
  apiFetch<BudgetEstimate, BudgetEstimate>(apiRoutes.planning.v1.budgetForecast(planId), {
    method: 'GET',
    schema: budgetEstimateSchema,
    query: tier ? { tier } : undefined,
  });

export const getCostBreakdownForPlan = (planId: string) =>
  apiFetch<BudgetEstimate, BudgetEstimate>(apiRoutes.planning.v1.costBreakdown(planId), {
    method: 'GET',
    schema: budgetEstimateSchema,
  });
