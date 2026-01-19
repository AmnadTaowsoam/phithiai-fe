'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Calendar, Clock } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';

export type TimelineTask = {
  id: string;
  name: string;
  category: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  deadline: string;
  description?: string;
  dependencies?: string[];
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
};

export type TimelineView = 'gantt' | 'list';

type Props = {
  tasks: TimelineTask[];
  view?: TimelineView;
  onTaskClick?: (task: TimelineTask) => void;
  onTaskStatusChange?: (taskId: string, status: TimelineTask['status']) => void;
};

const statusColors = {
  pending: 'bg-ivory/10 text-ivory/70 border-ivory/20',
  in_progress: 'bg-brand-500/10 text-brand-200 border-brand-500/30',
  completed: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/30',
  overdue: 'bg-red-500/10 text-red-200 border-red-500/30',
};

const priorityColors = {
  low: 'text-ivory/60',
  medium: 'text-amber-200',
  high: 'text-red-200',
};

export const PlanningTimeline = ({ tasks, view = 'list', onTaskClick, onTaskStatusChange }: Props) => {
  const [currentView, setCurrentView] = useState<TimelineView>(view);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, TimelineTask[]>);

  const sortedCategories = Object.keys(groupedTasks).sort((a, b) => {
    const aTasks = groupedTasks[a];
    const bTasks = groupedTasks[b];
    const aEarliest = Math.min(...aTasks.map(t => new Date(t.deadline).getTime()));
    const bEarliest = Math.min(...bTasks.map(t => new Date(t.deadline).getTime()));
    return aEarliest - bEarliest;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return 'Overdue';
    if (daysUntil === 0) return 'Today';
    if (daysUntil === 1) return 'Tomorrow';
    if (daysUntil < 7) return `${daysUntil} days`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (currentView === 'gantt') {
    return (
      <GlassCard className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ivory">Planning Timeline</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView('gantt')}
              className="rounded-lg border border-brand-500/40 bg-brand-500/10 px-3 py-1.5 text-sm font-medium text-brand-200"
            >
              Gantt
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className="rounded-lg border border-ivory/15 bg-background/70 px-3 py-1.5 text-sm font-medium text-ivory hover:border-ivory/25"
            >
              List
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="mb-4 grid grid-cols-[200px_1fr] gap-4 border-b border-ivory/10 pb-2">
              <div className="text-sm font-medium text-ivory/60">Task</div>
              <div className="text-sm font-medium text-ivory/60">Timeline</div>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {sortedCategories.map((category) => (
                <div key={category}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className="mb-2 flex w-full items-center gap-2 text-left font-medium text-ivory hover:text-ivory/80"
                  >
                    {expandedCategories.has(category) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    {category}
                    <span className="ml-auto text-sm text-ivory/60">
                      {groupedTasks[category].length} tasks
                    </span>
                  </button>

                  {expandedCategories.has(category) && (
                    <div className="ml-4 space-y-2">
                      {groupedTasks[category].map((task) => {
                        const daysUntil = getDaysUntil(task.deadline);
                        const barWidth = Math.max(10, Math.min(100, daysUntil * 2));
                        const barColor = task.status === 'completed' ? 'bg-emerald-500' :
                                       task.status === 'overdue' ? 'bg-red-500' :
                                       daysUntil <= 7 ? 'bg-amber-500' : 'bg-brand-500';

                        return (
                          <div
                            key={task.id}
                            onClick={() => onTaskClick?.(task)}
                            className="grid grid-cols-[200px_1fr] gap-4 rounded-lg border border-ivory/10 bg-background/60 px-4 py-3 hover:border-ivory/20 cursor-pointer transition-colors"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="truncate text-sm font-medium text-ivory">{task.name}</div>
                                {task.priority && (
                                  <span className={`text-xs ${priorityColors[task.priority]}`}>
                                    {task.priority.toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 flex items-center gap-3 text-xs text-ivory/60">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(task.deadline)}
                                </span>
                                {task.assignee && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {task.assignee}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="h-2 w-full rounded-full bg-ivory/10">
                                  <div
                                    className={`h-full rounded-full ${barColor}`}
                                    style={{ width: `${barWidth}%` }}
                                  />
                                </div>
                              </div>
                              <Badge className={`border ${statusColors[task.status]}`}>
                                {task.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }

  // List View
  return (
    <GlassCard className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ivory">Planning Timeline</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView('gantt')}
            className="rounded-lg border border-ivory/15 bg-background/70 px-3 py-1.5 text-sm font-medium text-ivory hover:border-ivory/25"
          >
            Gantt
          </button>
          <button
            onClick={() => setCurrentView('list')}
            className="rounded-lg border border-brand-500/40 bg-brand-500/10 px-3 py-1.5 text-sm font-medium text-brand-200"
          >
            List
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedCategories.map((category) => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              className="mb-3 flex w-full items-center gap-2 text-left font-medium text-ivory hover:text-ivory/80"
            >
              {expandedCategories.has(category) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {category}
              <span className="ml-auto text-sm text-ivory/60">
                {groupedTasks[category].length} tasks
              </span>
            </button>

            {expandedCategories.has(category) && (
              <div className="ml-4 space-y-2">
                {groupedTasks[category].map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onTaskClick?.(task)}
                    className="flex items-center justify-between rounded-lg border border-ivory/10 bg-background/60 px-4 py-3 hover:border-ivory/20 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="truncate text-sm font-medium text-ivory">{task.name}</div>
                        {task.priority && (
                          <span className={`text-xs ${priorityColors[task.priority]}`}>
                            {task.priority.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-ivory/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(task.deadline)}
                        </span>
                        {task.assignee && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.assignee}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {onTaskStatusChange && (
                        <select
                          value={task.status}
                          onChange={(e) => onTaskStatusChange(task.id, e.target.value as TimelineTask['status'])}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg border border-ivory/15 bg-background/70 px-2 py-1 text-xs text-ivory focus:border-brand-500/40 focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="overdue">Overdue</option>
                        </select>
                      )}
                      <Badge className={`border ${statusColors[task.status]}`}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
