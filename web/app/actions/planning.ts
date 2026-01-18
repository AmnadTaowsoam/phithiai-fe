'use server';

import {
  generateAuspiciousDates,
  generateChecklist,
  estimateBudget,
  type ChecklistRequest,
  type AuspiciousRequest,
  type BudgetEstimateRequest,
} from '@/lib/api/planning';
import type { AuspiciousPlanning, BudgetEstimate, PlanningChecklist } from '@/lib/api';
import { ApiError } from '@/lib/api';

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };

const handleAction = async <T>(fn: () => Promise<T>): Promise<ActionResult<T>> => {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        ok: false,
        message: error.message,
      };
    }

    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }

    return { ok: false, message: 'Unable to complete the request. Please try again.' };
  }
};

export const planAuspiciousAction = async (payload: AuspiciousRequest): Promise<ActionResult<AuspiciousPlanning>> =>
  handleAction(() => generateAuspiciousDates(payload));

export const estimateBudgetAction = async (payload: BudgetEstimateRequest): Promise<ActionResult<BudgetEstimate>> =>
  handleAction(() => estimateBudget(payload));

export const generateChecklistAction = async (
  payload: ChecklistRequest,
): Promise<ActionResult<PlanningChecklist>> =>
  handleAction(() => generateChecklist(payload));
