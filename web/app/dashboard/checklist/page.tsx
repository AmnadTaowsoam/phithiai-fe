import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerAccessToken } from '@/lib/auth/server';
import { PlanningAPI } from '@/lib/api/planning-api';
import { PlanningTimeline, type TimelineTask } from '@/components/dashboard/PlanningTimeline';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Clock, Calendar, Filter, Download } from 'lucide-react';

export default async function DashboardChecklistPage() {
  const token = getServerAccessToken();
  if (!token) {
    redirect('/auth/login?next=/dashboard/checklist');
  }

  // Fetch checklist from API
  let tasks: TimelineTask[] = [];
  try {
    const checklistData = await PlanningAPI.generateChecklist({
      eventType: 'wedding',
      eventDate: new Date().toISOString(),
      guestCount: 100,
      budget: 500000,
    });
    // Transform checklist data to timeline tasks
    if (checklistData && checklistData.checklist) {
      let taskId = 1;
      Object.entries(checklistData.checklist).forEach(([category, items]) => {
        items.forEach((task: any) => {
          tasks.push({
            id: String(taskId++),
            name: task.task,
            category: category,
            status: task.completed ? 'completed' : 'pending',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default 30 days
            priority: 'medium',
            assignee: task.owner || 'Unassigned',
          });
        });
      });
    }
  } catch (error) {
    console.error('Failed to fetch checklist:', error);
  }

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-ivory">Planning Checklist</h1>
          <p className="text-ivory/60">
            Track your wedding planning tasks and stay organized
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid gap-4 md:grid-cols-5">
        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-500/20 p-2">
                <Circle className="h-5 w-5 text-brand-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Total Tasks</p>
                <p className="text-2xl font-semibold text-ivory">{totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/20 p-2">
                <CheckCircle className="h-5 w-5 text-emerald-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Completed</p>
                <p className="text-2xl font-semibold text-emerald-200">{completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/20 p-2">
                <Clock className="h-5 w-5 text-amber-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">In Progress</p>
                <p className="text-2xl font-semibold text-amber-200">{inProgressTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/20 p-2">
                <Calendar className="h-5 w-5 text-blue-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Pending</p>
                <p className="text-2xl font-semibold text-blue-200">{pendingTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-500/20 p-2">
                <Circle className="h-5 w-5 text-red-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Overdue</p>
                <p className="text-2xl font-semibold text-red-200">{overdueTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 rounded-lg border border-ivory/10 bg-background/60 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ivory">Overall Progress</span>
          <span className="text-2xl font-semibold text-brand-200">{completionRate}%</span>
        </div>
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-ivory/10">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Planning Timeline */}
      <PlanningTimeline
        tasks={tasks}
        view="list"
        onTaskClick={(task) => console.log('Task clicked:', task)}
        onTaskStatusChange={(taskId, status) => console.log('Task status changed:', taskId, status)}
      />

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-6">
            <h3 className="mb-2 text-lg font-semibold text-ivory">Generate New Checklist</h3>
            <p className="mb-4 text-sm text-ivory/60">
              Create a customized checklist based on your wedding details
            </p>
            <Link
              href="/plan"
              className="flex w-full items-center justify-center rounded-lg border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm font-medium text-brand-200 hover:bg-brand-500/15"
            >
              Go to Planning Tools
            </Link>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-6">
            <h3 className="mb-2 text-lg font-semibold text-ivory">Quick Tips</h3>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li className="flex items-start gap-2">
                <span className="text-brand-200">•</span>
                <span>Start with high-priority tasks like venue and catering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-200">•</span>
                <span>Set realistic deadlines for each task</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-200">•</span>
                <span>Assign tasks to specific people for accountability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-200">•</span>
                <span>Review and update your checklist weekly</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Back Link */}
      <div className="mt-8">
        <Link
          href="/dashboard"
          className="text-sm text-brand-200 hover:text-brand-100"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
