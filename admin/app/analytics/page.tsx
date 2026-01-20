'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { BookingStatusChart } from '@/components/dashboard/booking-status-chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAnalytics, useGrowthMetrics, useConversionFunnel, useTopPerformers } from '@/hooks/use-analytics';
import { Users, Store, Calendar, DollarSign, TrendingUp, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminAnalyticsPage() {
  const [days, setDays] = useState(30);
  const [activeTab, setActiveTab] = useState<'overview' | 'growth' | 'funnel' | 'performers'>('overview');

  const growth = useGrowthMetrics(days);
  const funnel = useConversionFunnel();
  const topPerformers = useTopPerformers();

  const handleExport = async () => {
    try {
      // This would call the export API endpoint
      alert('Export functionality will be implemented with the backend export endpoint');
    } catch (err) {
      alert('Failed to export report');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={funnel.data?.registered || 0}
          change={0.05}
          trend="up"
          icon={Users}
          formatType="number"
        />
        <StatCard
          title="Active Vendors"
          value={topPerformers.data?.topVendors.length || 0}
          change={0.03}
          trend="up"
          icon={Store}
          formatType="number"
        />
        <StatCard
          title="Total Bookings"
          value={funnel.data?.booked || 0}
          change={0.08}
          trend="up"
          icon={Calendar}
          formatType="number"
        />
        <StatCard
          title="Revenue"
          value={growth.data?.revenue.reduce((sum, r) => sum + r.amount, 0) || 0}
          change={0.12}
          trend="up"
          icon={DollarSign}
          formatType="currency"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart
          data={growth.data?.revenue.map((r, i) => ({
            date: r.date,
            revenue: r.amount,
            gmv: r.amount * 1.5,
          })) || []}
        />
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey from visitors to completed bookings</CardDescription>
          </CardHeader>
          <CardContent>
            {funnel.loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-3">
                {[
                  { label: 'Visitors', value: funnel.data?.visitors || 0 },
                  { label: 'Registered', value: funnel.data?.registered || 0 },
                  { label: 'Plan Created', value: funnel.data?.planCreated || 0 },
                  { label: 'Vendor Contacted', value: funnel.data?.vendorContacted || 0 },
                  { label: 'Quote Received', value: funnel.data?.quoteReceived || 0 },
                  { label: 'Booked', value: funnel.data?.booked || 0 },
                  { label: 'Completed', value: funnel.data?.completed || 0 },
                ].map((step, index) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <div className="w-32 text-sm font-medium">{step.label}</div>
                    <div className="flex-1 h-8 bg-muted rounded overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(step.value / (funnel.data?.visitors || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-medium">{step.value.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGrowth = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Growth Metrics</CardTitle>
          <CardDescription>Track platform growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <label className="text-sm font-medium">Time Period:</label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>
          {growth.loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Users</h3>
                <div className="h-40 bg-muted rounded flex items-end gap-1 p-2">
                  {growth.data?.users.map((u) => (
                    <div
                      key={u.date}
                      className="flex-1 bg-primary rounded-t"
                      style={{
                        height: `${(u.count / (Math.max(...growth.data.users.map((u) => u.count)) || 1)) * 100}%`,
                      }}
                      title={`${u.date}: ${u.count}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Vendors</h3>
                <div className="h-40 bg-muted rounded flex items-end gap-1 p-2">
                  {growth.data?.vendors.map((v) => (
                    <div
                      key={v.date}
                      className="flex-1 bg-green-500 rounded-t"
                      style={{
                        height: `${(v.count / (Math.max(...growth.data.vendors.map((v) => v.count)) || 1)) * 100}%`,
                      }}
                      title={`${v.date}: ${v.count}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Bookings</h3>
                <div className="h-40 bg-muted rounded flex items-end gap-1 p-2">
                  {growth.data?.bookings.map((b) => (
                    <div
                      key={b.date}
                      className="flex-1 bg-blue-500 rounded-t"
                      style={{
                        height: `${(b.count / (Math.max(...growth.data.bookings.map((b) => b.count)) || 1)) * 100}%`,
                      }}
                      title={`${b.date}: ${b.count}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Revenue</h3>
                <div className="h-40 bg-muted rounded flex items-end gap-1 p-2">
                  {growth.data?.revenue.map((r) => (
                    <div
                      key={r.date}
                      className="flex-1 bg-yellow-500 rounded-t"
                      style={{
                        height: `${(r.amount / (Math.max(...growth.data.revenue.map((r) => r.amount)) || 1)) * 100}%`,
                      }}
                      title={`${r.date}: ฿${r.amount.toLocaleString()}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderFunnel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel Analysis</CardTitle>
          <CardDescription>Detailed breakdown of user conversion stages</CardDescription>
        </CardHeader>
        <CardContent>
          {funnel.loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-4">
              {[
                { label: 'Visitors', value: funnel.data?.visitors || 0, color: 'bg-gray-500' },
                { label: 'Registered', value: funnel.data?.registered || 0, color: 'bg-blue-500' },
                { label: 'Plan Created', value: funnel.data?.planCreated || 0, color: 'bg-cyan-500' },
                { label: 'Vendor Contacted', value: funnel.data?.vendorContacted || 0, color: 'bg-teal-500' },
                { label: 'Quote Received', value: funnel.data?.quoteReceived || 0, color: 'bg-green-500' },
                { label: 'Booked', value: funnel.data?.booked || 0, color: 'bg-yellow-500' },
                { label: 'Completed', value: funnel.data?.completed || 0, color: 'bg-orange-500' },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium">{step.label}</div>
                  <div className="flex-1">
                    <div className="h-12 bg-muted rounded overflow-hidden flex items-center">
                      <div
                        className={`h-full ${step.color} flex items-center justify-center text-white text-sm font-medium`}
                        style={{
                          width: `${(step.value / (funnel.data?.visitors || 1)) * 100}%`,
                          minWidth: '60px',
                        }}
                      >
                        {step.value.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="w-24 text-right text-sm text-muted-foreground">
                    {funnel.data?.visitors && step.value > 0
                      ? `${((step.value / funnel.data.visitors) * 100).toFixed(1)}%`
                      : '0%'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderPerformers = () => (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Vendors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Vendors</CardTitle>
            <CardDescription>Best performing vendors by bookings and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            {topPerformers.loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : topPerformers.data?.topVendors.length === 0 ? (
              <p className="text-center text-muted-foreground">No data available</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Bookings</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.data?.topVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell className="text-right">{vendor.bookings}</TableCell>
                      <TableCell className="text-right">฿{vendor.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">⭐ {vendor.rating}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Top Packages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Packages</CardTitle>
            <CardDescription>Most popular packages</CardDescription>
          </CardHeader>
          <CardContent>
            {topPerformers.loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : topPerformers.data?.topPackages.length === 0 ? (
              <p className="text-center text-muted-foreground">No data available</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package</TableHead>
                    <TableHead className="text-right">Bookings</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.data?.topPackages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell className="text-right">{pkg.bookings}</TableCell>
                      <TableCell className="text-right">฿{pkg.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Regions */}
      <Card>
        <CardHeader>
          <CardTitle>Top Regions</CardTitle>
          <CardDescription>Performance by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          {topPerformers.loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : topPerformers.data?.topRegions.length === 0 ? (
            <p className="text-center text-muted-foreground">No data available</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Bookings</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformers.data?.topRegions.map((region) => (
                  <TableRow key={region.name}>
                    <TableCell className="font-medium">{region.name}</TableCell>
                    <TableCell className="text-right">{region.bookings}</TableCell>
                    <TableCell className="text-right">฿{region.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Platform analytics and performance metrics"
        actions={
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        }
      />

      {/* Tabs */}
      <Card>
        <CardContent className="p-2">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'growth', label: 'Growth' },
              { id: 'funnel', label: 'Conversion Funnel' },
              { id: 'performers', label: 'Top Performers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'growth' && renderGrowth()}
      {activeTab === 'funnel' && renderFunnel()}
      {activeTab === 'performers' && renderPerformers()}
    </div>
  );
}
