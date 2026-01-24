import Link from 'next/link';
import { redirect } from 'next/navigation';
import { StatCard } from '@/components/dashboard/StatCard';
import { BookingStatusOverview } from '@/components/dashboard/BookingStatusOverview';
import { PlanningTimeline } from '@/components/dashboard/PlanningTimeline';
import { BudgetTracker } from '@/components/dashboard/BudgetTracker';
import { SavedVendors } from '@/components/dashboard/SavedVendors';
import { getServerAccessToken } from '@/lib/auth/server';
import { listMyBookings, getBookingStatistics } from '@/lib/api/bookings';
import { PlanningAPI } from '@/lib/api/planning-api';
import { SavedVendorsAPI } from '@/lib/api/saved-vendors';

export default async function DashboardPage() {
  const token = getServerAccessToken();
  if (!token) {
    redirect('/auth/login?next=/dashboard');
  }

  const [{ bookings }, stats] = await Promise.all([
    listMyBookings(undefined, token).catch(() => ({ bookings: [] })),
    getBookingStatistics(token).catch(() => ({ statistics: {} as any })),
  ]);

  const totalBookings = bookings.length;
  const upcoming = bookings.filter((b) => b.status && String(b.status).toLowerCase().includes('upcoming')).length;
  const confirmed = bookings.filter((b) => b.status && String(b.status).toLowerCase().includes('confirmed')).length;

  // Fetch planning timeline from API
  let timelineTasks: Array<{
    id: string;
    name: string;
    category: string;
    status: 'pending' | 'in_progress' | 'completed' | 'overdue';
    deadline: string;
    priority: 'low' | 'medium' | 'high';
    assignee: string;
  }> = [];

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
      Object.entries(checklistData.checklist).forEach(([category, tasks]) => {
        tasks.forEach((task: any) => {
          timelineTasks.push({
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
    console.error('Failed to fetch planning timeline:', error);
    // Fallback to empty array
  }

  // Fetch budget data from API
  let budgetData = {
    totalBudget: 500000,
    totalSpent: 0,
    remaining: 500000,
    currency: 'THB',
    categories: [] as Array<{
      id: string;
      name: string;
      budgeted: number;
      spent: number;
      color: string;
    }>,
    items: [] as Array<{
      id: string;
      name: string;
      category: string;
      budgeted: number;
      spent: number;
      status: 'under' | 'on_track' | 'over';
    }>,
  };

  try {
    const budgetEstimate = await PlanningAPI.calculateBudget({
      eventType: 'wedding',
      guestCount: 100,
      region: 'central',
      budget: 500000,
    });
    if (budgetEstimate) {
      budgetData.totalBudget = budgetEstimate.total.median;
      budgetData.categories = [
        {
          id: '1',
          name: 'Venue',
          budgeted: budgetEstimate.breakdown.venue.median,
          spent: 0,
          color: '#3b82f6',
        },
        {
          id: '2',
          name: 'Catering',
          budgeted: budgetEstimate.breakdown.catering.median,
          spent: 0,
          color: '#8b5cf6',
        },
        {
          id: '3',
          name: 'Photography',
          budgeted: budgetEstimate.breakdown.photography.median,
          spent: 0,
          color: '#10b981',
        },
        {
          id: '4',
          name: 'Decorations',
          budgeted: budgetEstimate.breakdown.decoration.median,
          spent: 0,
          color: '#f59e0b',
        },
        {
          id: '5',
          name: 'Entertainment',
          budgeted: budgetEstimate.breakdown.entertainment.median,
          spent: 0,
          color: '#ef4444',
        },
        {
          id: '6',
          name: 'Other',
          budgeted: budgetEstimate.breakdown.others.median,
          spent: 0,
          color: '#06b6d4',
        },
      ];
      budgetData.remaining = budgetData.totalBudget;
    }
  } catch (error) {
    console.error('Failed to fetch budget data:', error);
  }

  // Fetch saved vendors from API
  let savedVendors: Array<{
    id: string;
    name: string;
    category: string;
    logo?: string;
    coverImage?: string;
    rating: number;
    reviewCount: number;
    zone: string;
    startingPrice: number;
    verified: boolean;
    tags: string[];
    minAdvanceBooking: number;
    savedAt: string;
  }> = [];

  try {
    savedVendors = await SavedVendorsAPI.getMySavedVendors(token);
  } catch (error) {
    console.error('Failed to fetch saved vendors:', error);
  }

  // Transform bookings to match BookingStatusOverview type
  const transformedBookings = bookings.map((b) => ({
    id: b.id,
    vendorName: b.vendor?.name || `Vendor ${b.id}`,
    vendorLogo: undefined,
    eventType: b.eventType || 'Event',
    eventDate: b.eventDate || new Date().toISOString(),
    eventTime: undefined,
    venue: undefined,
    guestCount: undefined,
    status: (b.status?.toLowerCase() || 'pending') as any,
    totalAmount: b.total || 0,
    depositAmount: b.depositAmount,
    depositPaid: undefined,
    balanceDue: b.total && b.depositAmount ? b.total - b.depositAmount : undefined,
    specialRequests: undefined,
    createdAt: b.createdAt || new Date().toISOString(),
    updatedAt: b.updatedAt || new Date().toISOString(),
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold text-ivory">Dashboard</h1>
        <p className="text-ivory/60">
          Track your wedding planning progress, budget, bookings, and saved vendors — or jump back to{' '}
          <Link href="/plan" className="text-brand-200 hover:text-brand-100">
            planning tools
          </Link>
          .
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <StatCard label="Bookings" value={String(totalBookings)} hint="Total bookings in your account" />
        <StatCard label="Upcoming" value={String(upcoming)} hint="Bookings marked upcoming" />
        <StatCard label="Confirmed" value={String(confirmed)} hint="Bookings confirmed by vendors" />
        <StatCard label="Tasks" value={String(timelineTasks.length)} hint="Planning tasks to complete" />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Planning Timeline */}
          <PlanningTimeline
            tasks={timelineTasks}
            view="list"
            onTaskClick={(task) => console.log('Task clicked:', task)}
            onTaskStatusChange={(taskId, status) => console.log('Task status changed:', taskId, status)}
          />

          {/* Budget Tracker */}
          <BudgetTracker
            data={budgetData}
            onItemEdit={(itemId) => console.log('Edit budget item:', itemId)}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Booking Status Overview */}
          <BookingStatusOverview
            bookings={transformedBookings}
            onBookingClick={(booking) => console.log('Booking clicked:', booking)}
            onStatusChange={(bookingId, status) => console.log('Status changed:', bookingId, status)}
          />

          {/* Saved Vendors */}
          <SavedVendors
            vendors={savedVendors}
            onVendorClick={(vendor: any) => console.log('Vendor clicked:', vendor)}
            onUnsave={(vendorId: any) => console.log('Unsave vendor:', vendorId)}
            onContact={(vendor: any) => console.log('Contact vendor:', vendor)}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-lg border border-ivory/10 bg-background/60 p-6">
        <h2 className="mb-4 text-lg font-semibold text-ivory">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/vendors"
            className="flex items-center gap-2 rounded-lg border border-ivory/15 bg-background/70 px-4 py-3 text-sm font-medium text-ivory hover:border-ivory/25"
          >
            Browse Vendors
          </Link>
          <Link
            href="/booking"
            className="flex items-center gap-2 rounded-lg border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm font-medium text-brand-200 hover:bg-brand-500/15"
          >
            Start New Booking
          </Link>
          <Link
            href="/plan"
            className="flex items-center gap-2 rounded-lg border border-ivory/15 bg-background/70 px-4 py-3 text-sm font-medium text-ivory hover:border-ivory/25"
          >
            Planning Tools
          </Link>
          <Link
            href="/dashboard/bookings"
            className="flex items-center gap-2 rounded-lg border border-ivory/15 bg-background/70 px-4 py-3 text-sm font-medium text-ivory hover:border-ivory/25"
          >
            All Bookings
          </Link>
          <Link
            href="/dashboard/budget"
            className="flex items-center gap-2 rounded-lg border border-ivory/15 bg-background/70 px-4 py-3 text-sm font-medium text-ivory hover:border-ivory/25"
          >
            Budget Details
          </Link>
          <Link
            href="/dashboard/checklist"
            className="flex items-center gap-2 rounded-lg border border-ivory/15 bg-background/70 px-4 py-3 text-sm font-medium text-ivory hover:border-ivory/25"
          >
            Full Checklist
          </Link>
        </div>
      </div>
    </div>
  );
}
