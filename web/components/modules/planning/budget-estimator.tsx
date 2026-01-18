'use client';

import { useState, useTransition, type ReactNode } from 'react';
import { IconCoin, IconSparkles } from '@tabler/icons-react';
import { estimateBudgetAction, type ActionResult } from '@/app/actions/planning';
import type { BudgetEstimate } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type BudgetEstimatorProps = {
  initialData: BudgetEstimate;
};

const venues = [
  { label: 'Luxury hotel', value: 'hotel' },
  { label: 'Heritage venue', value: 'heritage' },
  { label: 'Private estate', value: 'estate' },
  { label: 'Beachfront', value: 'beach' },
];

const levels = [
  { label: 'Median (recommended)', value: 'median' },
  { label: 'Signature (p90)', value: 'p90' },
  { label: 'Intimate (p10)', value: 'p10' },
];

export const BudgetEstimator = ({ initialData }: BudgetEstimatorProps) => {
  const [pending, startTransition] = useTransition();
  const [response, setResponse] = useState<ActionResult<BudgetEstimate>>({
    ok: true,
    data: initialData,
  });
  const [form, setForm] = useState({
    eventType: 'wedding',
    guestCount: 250,
    venue: 'hotel',
    level: 'median',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: key === 'guestCount' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await estimateBudgetAction({
        eventType: form.eventType,
        guestCount: form.guestCount,
        venue: form.venue,
        level: form.level,
      });
      setResponse(result);
    });
  };

  const budget = response.ok ? response.data : initialData;

  return (
    <div className="space-y-6 rounded-3xl border border-ivory/15 bg-background/85 p-6 shadow-subtle">
      <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-ivory/60">
        <IconCoin size={20} className="text-brand-200" />
        Budget estimator
      </div>
      <form className="grid gap-5 md:grid-cols-[0.8fr,1.2fr]" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Field label="Guest count">
            <Input
              type="number"
              min={50}
              max={1500}
              value={form.guestCount}
              onChange={(event) => handleChange('guestCount', event.target.value)}
            />
          </Field>
          <Field label="Venue style">
            <select
              value={form.venue}
              onChange={(event) => handleChange('venue', event.target.value)}
              className="h-11 w-full rounded-2xl border border-ivory/15 bg-background/90 px-4 text-sm text-ivory focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
            >
              {venues.map((venue) => (
                <option key={venue.value} value={venue.value}>
                  {venue.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Experience level">
            <select
              value={form.level}
              onChange={(event) => handleChange('level', event.target.value)}
              className="h-11 w-full rounded-2xl border border-ivory/15 bg-background/90 px-4 text-sm text-ivory focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
            >
              {levels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </Field>
          <Button type="submit" disabled={pending} className="w-full" icon={<IconSparkles size={18} />}>
            {pending ? 'Analysing investment...' : 'Estimate investment'}
          </Button>
          {!response.ok ? (
            <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
              {response.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-4 rounded-3xl border border-ivory/15 bg-ivory/5 p-6 text-sm text-ivory/75">
          <div className="grid gap-3 md:grid-cols-3">
            <BudgetTile label="Intimate (p10)" value={formatCurrency(budget.total.p10)} />
            <BudgetTile label="Median" value={formatCurrency(budget.total.median)} />
            <BudgetTile label="Signature (p90)" value={formatCurrency(budget.total.p90)} />
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">Breakdown by category</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {Object.entries(budget.breakdown).map(([category, values]) => (
                <div key={category} className="rounded-2xl border border-ivory/15 bg-background/90 p-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">{category}</p>
                  <p className="text-sm text-ivory">
                    {formatCurrency(values.median)}{' '}
                    <span className="text-ivory/50">
                      ({formatCurrency(values.p10)} - {formatCurrency(values.p90)})
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          {budget.tips?.length ? (
            <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-4 text-xs text-ivory/70">
              <p className="uppercase tracking-[0.3em] text-brand-200">Concierge insights</p>
              <ul className="mt-2 space-y-2">
                {budget.tips.map((tip) => (
                  <li key={tip}>â€¢ {tip}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="space-y-2 text-sm text-ivory/60">
    <span className="block text-xs uppercase tracking-[0.3em] text-ivory/50">{label}</span>
    {children}
  </label>
);

const BudgetTile = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-ivory/15 bg-background/90 p-4 text-center text-sm text-ivory">
    <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">{label}</p>
    <p className="mt-2 text-lg font-semibold">{value}</p>
  </div>
);
