'use client';

export const PlanningLoadingStates = () => (
  <div className="space-y-6">
    <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-ivory/10" />
    <div className="grid gap-4 md:grid-cols-2">
      <div className="h-56 animate-pulse rounded-3xl bg-ivory/10" />
      <div className="h-56 animate-pulse rounded-3xl bg-ivory/10" />
    </div>
    <div className="h-72 animate-pulse rounded-3xl bg-ivory/10" />
  </div>
);

