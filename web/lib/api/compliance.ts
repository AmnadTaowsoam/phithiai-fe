import { z } from 'zod';
import { apiFetch } from './http';
import { apiRoutes } from './config';

const consentSchema = z.object({
  consents: z.array(z.record(z.any())).optional(),
});

const reportSchema = z.object({
  reports: z.array(z.record(z.any())).optional(),
});

export const getMyConsents = () =>
  apiFetch(apiRoutes.compliance.consentMe, {
    method: 'GET',
    schema: consentSchema,
  });

export const updateConsent = (payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.compliance.consent, {
    method: 'POST',
    schema: z.object({ success: z.boolean().optional() }),
    body: payload,
  });

export const createComplianceReport = (payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.compliance.reports, {
    method: 'POST',
    schema: z.object({ report: z.record(z.any()).optional() }),
    body: payload,
  });

export const requestDataExport = (payload: Record<string, unknown>) =>
  apiFetch(apiRoutes.compliance.dataRequest, {
    method: 'POST',
    schema: z.object({ request: z.record(z.any()).optional() }),
    body: payload,
  });
