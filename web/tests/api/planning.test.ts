import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/api/http', () => ({
  apiFetch: vi.fn(),
}));

import { apiFetch } from '@/lib/api/http';
import { PlanningAPI } from '@/lib/api/planning-api';

describe('PlanningAPI', () => {
  it('returns fallbacks when request fails twice', async () => {
    vi.useFakeTimers();
    vi.mocked(apiFetch).mockRejectedValueOnce(new Error('network down')).mockRejectedValueOnce(new Error('still down'));

    const promise = PlanningAPI.getEventTypes();
    await vi.advanceTimersByTimeAsync(260);

    await expect(promise).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: 'wedding' }),
        expect.objectContaining({ value: 'ordination' }),
      ]),
    );
    expect(vi.mocked(apiFetch)).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('uses selector to map API envelope', async () => {
    vi.mocked(apiFetch).mockImplementation(async (_path, options: any) => {
      const envelope = { success: true, data: { eventTypes: [{ value: 'custom', label: 'Custom', icon: '✨' }] } };
      const payload = typeof options.selector === 'function' ? options.selector(envelope) : envelope.data;
      return options.schema.parse(payload);
    });

    await expect(PlanningAPI.getEventTypes()).resolves.toEqual([{ value: 'custom', label: 'Custom', icon: '✨' }]);
  });
});
