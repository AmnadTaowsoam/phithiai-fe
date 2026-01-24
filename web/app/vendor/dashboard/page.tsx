import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerAccessToken } from '@/lib/auth/server';
import { getMe } from '@/lib/api/users';
import { listMyBookings } from '@/lib/api/bookings';
import { InquiryAPI } from '@/lib/api/inquiry';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  Calendar,
  MessageSquare,
  TrendingUp,
  Package,
  Users,
  Star,
} from 'lucide-react';

export default async function VendorDashboardPage() {
  const token = getServerAccessToken();
  if (!token) {
    redirect('/auth/login?next=/vendor/dashboard');
  }

  const me = await getMe(token);
  if (me.role && String(me.role).toUpperCase() !== 'VENDOR') {
    redirect('/dashboard');
  }

  // Fetch vendor data from APIs
  let revenue = 0;
  let bookings: any[] = [];
  let messages: any[] = [];
  let packages: any[] = [];

  try {
    // Fetch bookings
    const bookingsData = await listMyBookings(undefined, token);
    bookings = bookingsData.bookings || [];

    // Calculate revenue from bookings
    revenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);

    // Fetch messages (conversations)
    const conversations = await InquiryAPI.getConversations(token);
    messages = conversations || [];

    // Mock packages data (would come from vendor-service)
    packages = [
      {
        id: 'pkg-1',
        name: 'Standard Wedding Package',
        price: 50000,
        bookings: 5,
        active: true,
      },
      {
        id: 'pkg-2',
        name: 'Premium Wedding Package',
        price: 80000,
        bookings: 3,
        active: true,
      },
      {
        id: 'pkg-3',
        name: 'Deluxe Wedding Package',
        price: 120000,
        bookings: 2,
        active: true,
      },
    ];
  } catch (error) {
    console.error('Failed to fetch vendor data:', error);
  }

  const stats = [
    {
      label: 'Total Revenue',
      value: new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(revenue),
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-emerald-200',
      bgColor: 'bg-emerald-500/20',
    },
    {
      label: 'Total Bookings',
      value: String(bookings.length),
      icon: <Calendar className="h-5 w-5" />,
      color: 'text-brand-200',
      bgColor: 'bg-brand-500/20',
    },
    {
      label: 'Active Messages',
      value: String(messages.length),
      icon: <MessageSquare className="h-5 w-5" />,
      color: 'text-blue-200',
      bgColor: 'bg-blue-500/20',
    },
    {
      label: 'Active Packages',
      value: String(packages.length),
      icon: <Package className="h-5 w-5" />,
      color: 'text-purple-200',
      bgColor: 'bg-purple-500/20',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-ivory">Vendor Dashboard</h1>
          <p className="text-ivory/60">
            Welcome back, {me.firstName && me.lastName ? `${me.firstName} ${me.lastName}` : 'Vendor'}! Manage your business here.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/vendor/leads">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Leads
            </Button>
          </Link>
          <Link href="/vendor/calendar">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </Link>
          <Link href="/vendor/quotes">
            <Button variant="outline">
              <Package className="mr-2 h-4 w-4" />
              Quotes
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-ivory/10 bg-background/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg ${stat.bgColor} p-3`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div>
                  <p className="text-sm text-ivory/60">{stat.label}</p>
                  <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card className="mb-8 border-ivory/10 bg-background/60">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Bookings</span>
            <Link href="/vendor/leads" className="text-sm text-brand-200 hover:text-brand-100">
              View All →
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="py-8 text-center text-ivory/60">No bookings yet</p>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border border-ivory/10 bg-background/70 p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium text-ivory">{booking.eventType || 'Event'}</p>
                    <p className="text-sm text-ivory/60">
                      {booking.eventDate
                        ? new Date(booking.eventDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'Date TBD'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        booking.status === 'confirmed'
                          ? 'bg-emerald-500/20 text-emerald-200'
                          : booking.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-200'
                          : 'bg-red-500/20 text-red-200'
                      }
                    >
                      {String(booking.status).toUpperCase()}
                    </Badge>
                    {booking.total && (
                      <p className="text-sm font-medium text-ivory">
                        {new Intl.NumberFormat('th-TH', {
                          style: 'currency',
                          currency: 'THB',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(booking.total)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Packages */}
      <Card className="mb-8 border-ivory/10 bg-background/60">
        <CardHeader>
          <CardTitle>Active Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-center justify-between rounded-lg border border-ivory/10 bg-background/70 p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ivory">{pkg.name}</p>
                    <Badge className="bg-brand-500/20 text-brand-200">
                      {pkg.bookings} bookings
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-ivory/60">4.5</span>
                  </div>
                  <p className="text-lg font-semibold text-ivory">
                    {new Intl.NumberFormat('th-TH', {
                      style: 'currency',
                      currency: 'THB',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(pkg.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-ivory">Performance Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ivory/60">This Month</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span className="text-lg font-semibold text-emerald-200">+15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ivory/60">Response Rate</span>
                <span className="text-lg font-semibold text-brand-200">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ivory/60">Avg. Booking Value</span>
                <span className="text-lg font-semibold text-ivory">
                  {bookings.length > 0
                    ? new Intl.NumberFormat('th-TH', {
                        style: 'currency',
                        currency: 'THB',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(revenue / bookings.length)
                    : '-'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-ivory">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/vendor/leads">
                <Button className="w-full" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Leads
                </Button>
              </Link>
              <Link href="/vendor/calendar">
                <Button className="w-full" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Update Availability
                </Button>
              </Link>
              <Link href="/vendor/quotes">
                <Button className="w-full" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Create Quote
                </Button>
              </Link>
              <Link href="/vendor/portfolio">
                <Button className="w-full" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Update Portfolio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
