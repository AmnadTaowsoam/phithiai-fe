'use client';

import { useMemo, useState, useTransition, type ReactNode } from 'react';
import { IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { planAuspiciousAction, type ActionResult } from '@/app/actions/planning';
import type { AuspiciousPlanning } from '@/lib/api';
import { formatThaiDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type AuspiciousPlannerProps = {
  initialData: AuspiciousPlanning;
};

const eventTypes = [
  { label: 'Wedding ceremony', value: 'wedding' },
  { label: 'Engagement', value: 'engagement' },
  { label: 'House blessing', value: 'house' },
];

const modes = [
  { label: 'Traditional', value: 'traditional' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Modern', value: 'modern' },
];

export const AuspiciousPlanner = ({ initialData }: AuspiciousPlannerProps) => {
  const [pending, startTransition] = useTransition();
  const [response, setResponse] = useState<ActionResult<AuspiciousPlanning>>({
    ok: true,
    data: initialData,
  });
  const [form, setForm] = useState({
    eventType: 'wedding',
    mode: 'moderate',
    startMonth: new Date().toISOString().slice(0, 7),
    endMonth: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().slice(0, 7),
    birthdate: '',
    partnerBirthdate: '',
  });

  const topDates = response.ok ? response.data.topDates : [];

  const calendarMonths = useMemo(
    () =>
      response.ok && response.data.calendar
        ? Object.entries(response.data.calendar)
        : [],
    [response],
  );

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await planAuspiciousAction({
        eventType: form.eventType,
        mode: form.mode as 'traditional' | 'moderate' | 'modern',
        startMonth: form.startMonth,
        endMonth: form.endMonth,
        birthdate: form.birthdate || undefined,
        partnerBirthdate: form.partnerBirthdate || undefined,
      });

      setResponse(result);
    });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr,1.15fr]">
      <div className="space-y-6 rounded-3xl border border-ivory/15 bg-background/85 p-6 shadow-subtle">
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-ivory/60">
          <IconCalendar size={20} className="text-brand-200" />
          Auspicious Planner
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <SelectField
              label="Event type"
              value={form.eventType}
              onChange={(value) => handleChange('eventType', value)}
              options={eventTypes}
            />
            <SelectField
              label="Energy mode"
              value={form.mode}
              onChange={(value) => handleChange('mode', value)}
              options={modes}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Start month">
              <Input
                type="month"
                value={form.startMonth}
                onChange={(event) => handleChange('startMonth', event.target.value)}
                required
              />
            </Field>
            <Field label="End month">
              <Input
                type="month"
                value={form.endMonth}
                min={form.startMonth}
                onChange={(event) => handleChange('endMonth', event.target.value)}
                required
              />
            </Field>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Your birthdate (optional)">
              <Input
                type="date"
                value={form.birthdate}
                onChange={(event) => handleChange('birthdate', event.target.value)}
              />
            </Field>
            <Field label="Partner birthdate (optional)">
              <Input
                type="date"
                value={form.partnerBirthdate}
                onChange={(event) => handleChange('partnerBirthdate', event.target.value)}
              />
            </Field>
          </div>
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Calculating auspicious dates...' : 'Generate auspicious timeline'}
          </Button>
          {!response.ok ? (
            <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
              {response.message}
            </p>
          ) : null}
        </form>
        <p className="text-xs text-ivory/50">
          Data trained on Thai royal almanac, monk advisories, and phithiai lunar archives.
        </p>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-ivory/15 bg-background/85 p-6 shadow-subtle">
          <h3 className="text-xl font-semibold text-ivory">Recommended dates</h3>
          {topDates.length ? (
            <div className="mt-4 space-y-4">
              {topDates.map((date) => (
                <div key={date.date} className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-4 text-ivory/80">
                  <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Score {date.score}</p>
                  <p className="mt-2 text-lg font-semibold text-ivory">{formatThaiDate(date.date)}</p>
                  {date.thaiDate ? <p className="text-sm text-ivory/60">{date.thaiDate}</p> : null}
                  {date.luckyTimes?.length ? (
                    <p className="mt-2 text-sm">
                      Lucky times: <span className="text-ivory">{date.luckyTimes.join(', ')}</span>
                    </p>
                  ) : null}
                  {date.luckyColors?.length ? (
                    <p className="text-sm">
                      Lucky colours: <span className="text-ivory">{date.luckyColors.join(', ')}</span>
                    </p>
                  ) : null}
                  {date.reasons?.length ? (
                    <ul className="mt-3 space-y-1 text-sm text-ivory/70">
                      {date.reasons.map((reason) => (
                        <li key={reason}>â€¢ {reason}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-ivory/60">No recommendations yet. Try adjusting your search window.</p>
          )}
        </div>
        {calendarMonths.length ? (
          <div className="rounded-3xl border border-ivory/15 bg-background/85 p-6 shadow-subtle">
            <h3 className="text-xl font-semibold text-ivory">Monthly overview</h3>
            <div className="mt-4 space-y-4">
              {calendarMonths.map(([month, days]) => (
                <div key={month} className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-ivory/50">{month}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-ivory/70">
                    {days
                      ? Object.entries(days).map(([day, meta]) => (
                          <span
                            key={`${month}-${day}`}
                            className="inline-flex items-center rounded-full border border-ivory/15 bg-ivory/5 px-3 py-1"
                          >
                            {day} Â· {meta.level} Â· {meta.score}
                          </span>
                        ))
                      : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

type FieldProps = {
  label: string;
  children: ReactNode;
};

const Field = ({ label, children }: FieldProps) => (
  <label className="space-y-2 text-sm text-ivory/60">
    <span className="block text-xs uppercase tracking-[0.3em] text-ivory/50">{label}</span>
    {children}
  </label>
);

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
};

const SelectField = ({ label, value, onChange, options }: SelectFieldProps) => (
  <label className="space-y-2 text-sm text-ivory/60">
    <span className="block text-xs uppercase tracking-[0.3em] text-ivory/50">{label}</span>
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-2xl border border-ivory/15 bg-background/90 px-4 text-sm text-ivory focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
      >
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ivory/40" size={16} />
    </div>
  </label>
);
