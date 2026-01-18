'use client';

import { useMemo, useState, useTransition, type ReactNode } from 'react';
import { IconChecklist, IconPlus } from '@tabler/icons-react';
import { generateChecklistAction, type ActionResult } from '@/app/actions/planning';
import type { PlanningChecklist } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ChecklistGeneratorProps = {
  initialData: PlanningChecklist;
};

export const ChecklistGenerator = ({ initialData }: ChecklistGeneratorProps) => {
  const [pending, startTransition] = useTransition();
  const [response, setResponse] = useState<ActionResult<PlanningChecklist>>({
    ok: true,
    data: initialData,
  });
  const [form, setForm] = useState({
    eventType: 'wedding',
    date: new Date().toISOString().slice(0, 10),
    customItem: '',
  });
  const [customItems, setCustomItems] = useState<string[]>([]);

  const sections = useMemo(() => {
    if (!response.ok || !response.data.checklist) return [];
    return Object.entries(response.data.checklist);
  }, [response]);

  const timeline = response.ok ? response.data.timeline ?? [] : [];

  const addCustomItem = () => {
    if (!form.customItem.trim()) return;
    setCustomItems((prev) => [...prev, form.customItem.trim()]);
    setForm((prev) => ({ ...prev, customItem: '' }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const payload = {
        eventType: form.eventType,
        date: form.date,
        customItems: customItems.length ? customItems : undefined,
      };
      const result = await generateChecklistAction(payload);
      setResponse(result);
    });
  };

  return (
    <div className="space-y-6 rounded-3xl border border-ivory/15 bg-background/85 p-6 shadow-subtle">
      <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-ivory/60">
        <IconChecklist size={20} className="text-brand-200" />
        Timeline & checklist
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Event type">
            <select
              value={form.eventType}
              onChange={(event) => setForm((prev) => ({ ...prev, eventType: event.target.value }))}
              className="h-11 w-full rounded-2xl border border-ivory/15 bg-background/90 px-4 text-sm text-ivory focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
            >
              <option value="wedding">Wedding ceremony</option>
              <option value="engagement">Engagement</option>
              <option value="house">House blessing</option>
            </select>
          </Field>
          <Field label="Ceremony date">
            <Input
              type="date"
              value={form.date}
              onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              required
            />
          </Field>
        </div>
        <div className="space-y-2">
          <span className="block text-xs uppercase tracking-[0.3em] text-ivory/50">Add custom task</span>
          <div className="flex gap-3">
            <Input
              value={form.customItem}
              onChange={(event) => setForm((prev) => ({ ...prev, customItem: event.target.value }))}
              placeholder="e.g., Rehearsal dinner tasting, family blessing notes..."
            />
            <Button type="button" variant="secondary" onClick={addCustomItem}>
              <IconPlus size={16} />
              Add
            </Button>
          </div>
          {customItems.length ? (
            <p className="text-xs text-ivory/50">Will include: {customItems.join(' | ')}</p>
          ) : null}
        </div>
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Composing timeline...' : 'Generate concierge checklist'}
        </Button>
        {!response.ok ? (
          <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
            {response.message}
          </p>
        ) : null}
      </form>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4 rounded-3xl border border-ivory/15 bg-background/90 p-5 text-sm text-ivory/75">
          <h3 className="text-lg font-semibold text-ivory">Checklist milestones</h3>
          {sections.length ? (
            sections.map(([section, tasks]) => (
              <div key={section} className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">{section.replace(/_/g, ' ')}</p>
                <ul className="space-y-1">
                  {tasks?.map((task) => (
                    <li key={task.id} className="rounded-2xl border border-ivory/15 bg-ivory/5 px-3 py-2">
                      <span className="font-medium text-ivory">{task.task}</span>
                      {task.owner ? <p className="text-xs text-ivory/50">Owner: {task.owner}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-ivory/60">Tasks will appear once you generate a checklist.</p>
          )}
        </div>
        <div className="space-y-3 rounded-3xl border border-ivory/15 bg-background/90 p-5 text-sm text-ivory/75">
          <h3 className="text-lg font-semibold text-ivory">Day-of timeline</h3>
          {timeline.length ? (
            timeline.map((item) => (
              <div key={`${item.time}-${item.activity}`} className="rounded-2xl border border-ivory/15 bg-ivory/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">{item.time}</p>
                <p className="text-ivory">{item.activity}</p>
                {item.owner ? <p className="text-xs text-ivory/50">Lead: {item.owner}</p> : null}
              </div>
            ))
          ) : (
            <p className="text-ivory/60">Generate a checklist to view the timeline milestones.</p>
          )}
          <p className="text-xs text-ivory/50">
            malAI syncs these activities to Magic UI Workspace and vendor dashboards automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <label className="space-y-2 text-sm text-ivory/60">
    <span className="block text-xs uppercase tracking-[0.3em] text-ivory/50">{label}</span>
    {children}
  </label>
);
