import { GlassCard } from '@/components/ui/glass-card';

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export const StatCard = ({ label, value, hint }: StatCardProps) => (
  <GlassCard className="p-6">
    <div className="text-xs uppercase tracking-[0.3em] text-ivory/55">{label}</div>
    <div className="mt-3 text-3xl font-semibold text-ivory">{value}</div>
    {hint ? <div className="mt-2 text-sm text-ivory/60">{hint}</div> : null}
  </GlassCard>
);

