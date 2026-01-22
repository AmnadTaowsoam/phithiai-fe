import Link from 'next/link';
import { redirect } from 'next/navigation';
import { StatCard } from '@/components/dashboard/StatCard';
import { BookingStatusOverview } from '@/components/dashboard/BookingStatusOverview';
import { PlanningTimeline } from '@/components/dashboard/PlanningTimeline';
import { BudgetTracker } from '@/components/dashboard/BudgetTracker';
import { SavedVendors } from '@/components/dashboard/SavedVendors';
import { getServerAccessToken } from '@/lib/auth/server';
import { listMyBookings, getBookingStatistics } from '@/lib/api/bookings';

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

  // Mock data for planning timeline (would come from planning API)
  const mockTimelineTasks = [
    {
      id: '1',
      name: 'Select venue',
      category: 'Venue',
      status: 'completed' as const,
      deadline: '2026-01-15',
      priority: 'high' as const,
      assignee: 'Bride',
    },
    {
      id: '2',
      name: 'Book photographer',
      category: 'Photography',
      status: 'in_progress' as const,
      deadline: '2026-01-25',
      priority: 'high' as const,
      assignee: 'Groom',
    },
    {
      id: '3',
      name: 'Finalize catering menu',
      category: 'Catering',
      status: 'pending' as const,
      deadline: '2026-02-01',
      priority: 'medium' as const,
      assignee: 'Bride',
    },
    {
      id: '4',
      name: 'Order invitations',
      category: 'Invitations',
      status: 'pending' as const,
      deadline: '2026-02-15',
      priority: 'medium' as const,
      assignee: 'Groom',
    },
    {
      id: '5',
      name: 'Finalize decorations',
      category: 'Decorations',
      status: 'pending' as const,
      deadline: '2026-02-20',
      priority: 'low' as const,
      assignee: 'Bride',
    },
  ];

  // Mock data for budget tracker (would come from planning API)
  const mockBudgetData = {
    totalBudget: 500000,
    totalSpent: 285000,
    remaining: 215000,
    currency: 'THB',
    categories: [
      {
        id: '1',
        name: 'Venue',
        budgeted: 150000,
        spent: 150000,
        color: '#3b82f6',
      },
      {
        id: '2',
        name: 'Catering',
        budgeted: 100000,
        spent: 80000,
        color: '#8b5cf6',
      },
      {
        id: '3',
        name: 'Photography',
        budgeted: 80000,
        spent: 30000,
        color: '#10b981',
      },
      {
        id: '4',
        name: 'Decorations',
        budgeted: 70000,
        spent: 15000,
        color: '#f59e0b',
      },
      {
        id: '5',
        name: 'Entertainment',
        budgeted: 50000,
        spent: 10000,
        color: '#ef4444',
      },
      {
        id: '6',
        name: 'Other',
        budgeted: 50000,
        spent: 0,
        color: '#06b6d4',
      },
    ],
    items: [
      {
        id: '1',
        name: 'Venue Deposit',
        category: 'Venue',
        budgeted: 75000,
        spent: 75000,
        status: 'on_track' as const,
      },
      {
        id: '2',
        name: 'Catering Deposit',
        category: 'Catering',
        budgeted: 50000,
        spent: 40000,
        status: 'on_track' as const,
      },
      {
        id: '3',
        name: 'Photographer Deposit',
        category: 'Photography',
        budgeted: 30000,
        spent: 30000,
        status: 'on_track' as const,
      },
      {
        id: '4',
        name: 'Decorations Deposit',
        category: 'Decorations',
        budgeted: 20000,
        spent: 15000,
        status: 'under' as const,
      },
    ],
  };

  // Mock data for saved vendors (would come from user API)
  const mockSavedVendors = [
    {
      id: '1',
      name: 'Thai Wedding Photography',
      category: 'Photography',
      logo: undefined,
      coverImage: undefined,
      rating: 4.8,
      reviewCount: 124,
      zone: 'Bangkok',
      startingPrice: 30000,
      verified: true,
      tags: ['Wedding', 'Photography', 'Professional'],
      minAdvanceBooking: 14,
      savedAt: '2026-01-10T10:00:00Z',
    },
    {
      id: '2',
      name: 'Royal Thai Catering',
      category: 'Catering',
      logo: undefined,
      coverImage: undefined,
      rating: 4.5,
      reviewCount: 89,
      zone: 'Chiang Mai',
      startingPrice: 500,
      verified: true,
      tags: ['Catering', 'Thai Cuisine', 'Buffet'],
      minAdvanceBooking: 7,
      savedAt: '2026-01-08T14:30:00Z',
    },
    {
      id: '3',
      name: 'Elegant Decor',
      category: 'Decorations',
      logo: undefined,
      coverImage: undefined,
      rating: 4.7,
      reviewCount: 56,
      zone: 'Phuket',
      startingPrice: 20000,
      verified: false,
      tags: ['Decorations', 'Flowers', 'Setup'],
      minAdvanceBooking: 21,
      savedAt: '2026-01-05T09:15:00Z',
    },
  ];

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
        <StatCard label="Tasks" value={String(mockTimelineTasks.length)} hint="Planning tasks to complete" />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Planning Timeline */}
          <PlanningTimeline
            tasks={mockTimelineTasks}
            view="list"
            onTaskClick={(task) => console.log('Task clicked:', task)}
            onTaskStatusChange={(taskId, status) => console.log('Task status changed:', taskId, status)}
          />

          {/* Budget Tracker */}
          <BudgetTracker
            data={mockBudgetData}
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
            vendors={mockSavedVendors}
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
