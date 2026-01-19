'use client';

import { useState } from 'react';
import { CalendarView } from '@/components/vendor/CalendarView';
import { RevenuePerformance, RevenueData, BookingStats, PerformanceMetrics } from '@/components/vendor/RevenuePerformance';
import { ServicePackageEditor, ServicePackage } from '@/components/vendor/ServicePackageEditor';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Search, Settings, Plus, TrendingUp, Calendar, Package, MessageSquare } from 'lucide-react';

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'packages' | 'messages'>('overview');

  // Mock data for revenue
  const revenueData: RevenueData = [
    { month: 'Jan', revenue: 45000, bookings: 3 },
    { month: 'Feb', revenue: 60000, bookings: 4 },
    { month: 'Mar', revenue: 35000, bookings: 2 },
    { month: 'Apr', revenue: 50000, bookings: 3 },
    { month: 'May', revenue: 55000, bookings: 4 },
  ];

  const bookingStats: BookingStats = {
    total: 24,
    pending: 5,
    confirmed: 15,
    completed: 4,
  };

  const performanceMetrics: PerformanceMetrics = {
    responseRate: 92,
    averageResponseTime: '2 hours',
    rating: 4.8,
    totalReviews: 45,
  };

  // Mock data for calendar availability
  const availability = {
    '2025-01-20': {
      date: '2025-01-20',
      slots: [
        { id: '1', time: '09:00 - 12:00', available: true, bookingId: null },
        { id: '2', time: '13:00 - 17:00', available: false, bookingId: 'booking-1' },
      ],
    },
    '2025-01-21': {
      date: '2025-01-21',
      slots: [
        { id: '3', time: '09:00 - 12:00', available: true, bookingId: null },
        { id: '4', time: '13:00 - 17:00', available: true, bookingId: null },
      ],
    },
  };

  // Mock data for packages
  const [packages, setPackages] = useState<ServicePackage[]>([
    {
      id: '1',
      name: 'Basic Photography Package',
      description: 'Essential photography coverage for your special day',
      price: 15000,
      duration: 'Full day (8 hours)',
      included: ['Photography', 'Digital files', 'Online gallery', '1 photographer'],
      isActive: true,
      minGuests: 50,
      maxGuests: 200,
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    {
      id: '2',
      name: 'Premium Photography Package',
      description: 'Complete photography and videography package',
      price: 35000,
      duration: 'Full day (12 hours)',
      included: ['Photography', 'Videography', 'Drone footage', '2 photographers', 'Digital files', 'Online gallery', 'Photo album'],
      isActive: true,
      minGuests: 100,
      maxGuests: 500,
      availability: ['Saturday', 'Sunday'],
    },
    {
      id: '3',
      name: 'Destination Wedding Package',
      description: 'Complete coverage for destination weddings',
      price: 50000,
      duration: 'Multi-day',
      included: ['Photography', 'Videography', 'Drone footage', 'Travel included', '2 photographers', '1 videographer', 'Digital files', 'Online gallery', 'Photo album', 'Video highlights'],
      isActive: false,
      minGuests: 50,
      maxGuests: 300,
      availability: ['Saturday', 'Sunday'],
    },
  ]);

  const handlePackageAdd = (pkg: ServicePackage) => {
    setPackages([...packages, pkg]);
  };

  const handlePackageEdit = (pkg: ServicePackage) => {
    setPackages(packages.map(p => p.id === pkg.id ? pkg : p));
  };

  const handlePackageDelete = (packageId: string) => {
    setPackages(packages.filter(p => p.id !== packageId));
  };

  const handlePackageSave = (pkg: ServicePackage) => {
    setPackages(packages.map(p => p.id === pkg.id ? pkg : p));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-ivory/10 bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ivory">Vendor Dashboard</h1>
              <p className="text-sm text-ivory/60">Welcome back, Photographer Pro</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-lg border border-ivory/15 bg-background/70 py-2 pl-10 pr-4 text-sm text-ivory placeholder:text-ivory/40 focus:border-brand-500/50 focus:outline-none"
                />
              </div>

              <Button variant="outline" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </Button>

              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-ivory/10 bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-brand-500 text-brand-200'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'calendar'
                  ? 'border-b-2 border-brand-500 text-brand-200'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'packages'
                  ? 'border-b-2 border-brand-500 text-brand-200'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              Packages
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'border-b-2 border-brand-500 text-brand-200'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              Messages
              <Badge className="ml-2 border-red-500/30 bg-red-500/10 text-red-200 text-xs">
                5
              </Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-4">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ivory/60">Total Revenue</p>
                    <p className="text-2xl font-bold text-ivory">฿245,000</p>
                    <p className="text-xs text-emerald-400">+12% from last month</p>
                  </div>
                  <div className="rounded-lg bg-brand-500/20 p-3">
                    <TrendingUp className="h-6 w-6 text-brand-200" />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ivory/60">Total Bookings</p>
                    <p className="text-2xl font-bold text-ivory">24</p>
                    <p className="text-xs text-emerald-400">+3 this week</p>
                  </div>
                  <div className="rounded-lg bg-emerald-500/20 p-3">
                    <Calendar className="h-6 w-6 text-emerald-200" />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ivory/60">Active Packages</p>
                    <p className="text-2xl font-bold text-ivory">3</p>
                    <p className="text-xs text-ivory/60">1 inactive</p>
                  </div>
                  <div className="rounded-lg bg-purple-500/20 p-3">
                    <Package className="h-6 w-6 text-purple-200" />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ivory/60">New Inquiries</p>
                    <p className="text-2xl font-bold text-ivory">5</p>
                    <p className="text-xs text-amber-400">2 urgent</p>
                  </div>
                  <div className="rounded-lg bg-amber-500/20 p-3">
                    <MessageSquare className="h-6 w-6 text-amber-200" />
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Revenue Performance */}
            <RevenuePerformance
              revenueData={revenueData}
              bookingStats={bookingStats}
              performanceMetrics={performanceMetrics}
            />

            {/* Quick Actions */}
            <GlassCard className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-ivory">Quick Actions</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <Button className="flex items-center justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Availability Slot
                </Button>
                <Button variant="outline" className="flex items-center justify-start gap-2">
                  <Package className="h-4 w-4" />
                  Create New Package
                </Button>
                <Button variant="outline" className="flex items-center justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Update Profile
                </Button>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === 'calendar' && (
          <CalendarView availability={availability} />
        )}

        {activeTab === 'packages' && (
          <ServicePackageEditor
            packages={packages}
            onPackageAdd={handlePackageAdd}
            onPackageEdit={handlePackageEdit}
            onPackageDelete={handlePackageDelete}
            onPackageSave={handlePackageSave}
          />
        )}

        {activeTab === 'messages' && (
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-ivory">Messages</h2>
              <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">
                5 conversations
              </Badge>
            </div>

            <div className="space-y-4">
              {/* Message Item */}
              <div className="flex cursor-pointer items-start gap-4 rounded-lg border border-ivory/10 bg-background/50 p-4 hover:border-ivory/20">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-ivory">Somchai Meesri</h4>
                    <span className="text-xs text-ivory/60">2 hours ago</span>
                  </div>
                  <p className="text-sm text-ivory/80">Hi, I'm interested in your Basic Photography Package for my wedding...</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs">
                      Inquiry
                    </Badge>
                    <Badge className="border-red-500/30 bg-red-500/10 text-red-200 text-xs">
                      Urgent
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Message Item */}
              <div className="flex cursor-pointer items-start gap-4 rounded-lg border border-ivory/10 bg-background/50 p-4 hover:border-ivory/20">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold">
                  NP
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-ivory">Nattaya Prasert</h4>
                    <span className="text-xs text-ivory/60">5 hours ago</span>
                  </div>
                  <p className="text-sm text-ivory/80">Thank you for the quote! Can we schedule a call to discuss the details?</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-xs">
                      In Progress
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Message Item */}
              <div className="flex cursor-pointer items-start gap-4 rounded-lg border border-ivory/10 bg-background/50 p-4 hover:border-ivory/20">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold">
                  SK
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-ivory">Siriporn Klin</h4>
                    <span className="text-xs text-ivory/60">Yesterday</span>
                  </div>
                  <p className="text-sm text-ivory/80">I'd like to book the Premium Package for my daughter's wedding...</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-200 text-xs">
                      Booking
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Message Item */}
              <div className="flex cursor-pointer items-start gap-4 rounded-lg border border-ivory/10 bg-background/50 p-4 hover:border-ivory/20">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                  WC
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-ivory">Wichai Chai</h4>
                    <span className="text-xs text-ivory/60">2 days ago</span>
                  </div>
                  <p className="text-sm text-ivory/80">Is the Destination Wedding Package available for dates in December?</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs">
                      Inquiry
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Message Item */}
              <div className="flex cursor-pointer items-start gap-4 rounded-lg border border-ivory/10 bg-background/50 p-4 hover:border-ivory/20">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                  PT
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-ivory">Piyathida Tan</h4>
                    <span className="text-xs text-ivory/60">3 days ago</span>
                  </div>
                  <p className="text-sm text-ivory/80">Can you provide more details about the video editing options?</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className="border-purple-500/30 bg-purple-500/10 text-purple-200 text-xs">
                      Question
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        )}
      </main>
    </div>
  );
}
