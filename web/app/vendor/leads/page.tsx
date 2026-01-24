'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Calendar,
  DollarSign,
  MessageSquare,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Plus,
} from 'lucide-react';

type Lead = {
  id: string;
  customerName: string;
  customerEmail: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  budget: number;
  status: 'new' | 'contacted' | 'quoted' | 'booked' | 'lost';
  source: string;
  createdAt: string;
  lastActivity?: string;
};

const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    customerName: 'Somchai Jaidee',
    customerEmail: 'somchai@example.com',
    eventType: 'Wedding',
    eventDate: '2026-03-15',
    guestCount: 150,
    budget: 500000,
    status: 'new',
    source: 'Direct Inquiry',
    createdAt: '2026-01-20T10:30:00Z',
  },
  {
    id: 'lead-2',
    customerName: 'Nattaya Wong',
    customerEmail: 'nattaya@example.com',
    eventType: 'Wedding Reception',
    eventDate: '2026-04-20',
    guestCount: 200,
    budget: 750000,
    status: 'contacted',
    source: 'Marketplace',
    createdAt: '2026-01-18T14:20:00Z',
    lastActivity: '2026-01-21T09:00:00Z',
  },
  {
    id: 'lead-3',
    customerName: 'Kamonwan Siripong',
    customerEmail: 'kamonwan@example.com',
    eventType: 'Wedding Ceremony',
    eventDate: '2026-05-10',
    guestCount: 100,
    budget: 300000,
    status: 'quoted',
    source: 'Vendor Search',
    createdAt: '2026-01-15T16:45:00Z',
    lastActivity: '2026-01-17T11:30:00Z',
  },
  {
    id: 'lead-4',
    customerName: 'Supaporn Sae-Ueng',
    customerEmail: 'supaporn@example.com',
    eventType: 'Pre-wedding Photoshoot',
    eventDate: '2026-02-28',
    guestCount: 2,
    budget: 25000,
    status: 'booked',
    source: 'Referral',
    createdAt: '2026-01-12T08:15:00Z',
    lastActivity: '2026-01-14T15:00:00Z',
  },
  {
    id: 'lead-5',
    customerName: 'Malee Rattana',
    customerEmail: 'malee@example.com',
    eventType: 'Wedding',
    eventDate: '2026-06-01',
    guestCount: 80,
    budget: 400000,
    status: 'lost',
    source: 'Marketplace',
    createdAt: '2026-01-10T11:20:00Z',
    lastActivity: '2026-01-12T14:00:00Z',
  },
];

const statusColors = {
  new: 'bg-blue-500/20 text-blue-200',
  contacted: 'bg-amber-500/20 text-amber-200',
  quoted: 'bg-purple-500/20 text-purple-200',
  booked: 'bg-emerald-500/20 text-emerald-200',
  lost: 'bg-red-500/20 text-red-200',
};

const statusLabels = {
  new: 'New',
  contacted: 'Contacted',
  quoted: 'Quoted',
  booked: 'Booked',
  lost: 'Lost',
};

export default function VendorLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.eventType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    quoted: leads.filter((l) => l.status === 'quoted').length,
    booked: leads.filter((l) => l.status === 'booked').length,
    lost: leads.filter((l) => l.status === 'lost').length,
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const handleContact = (lead: Lead) => {
    handleStatusChange(lead.id, 'contacted');
  };

  const handleCreateQuote = (lead: Lead) => {
    handleStatusChange(lead.id, 'quoted');
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-ivory">Leads Management</h1>
          <p className="text-ivory/60">
            Manage and track incoming customer inquiries
          </p>
        </div>
        <Link href="/vendor/dashboard">
          <Button variant="outline">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-5">
        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-500/20 p-2">
                <Search className="h-5 w-5 text-brand-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Total Leads</p>
                <p className="text-2xl font-semibold text-ivory">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/20 p-2">
                <Plus className="h-5 w-5 text-blue-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">New</p>
                <p className="text-2xl font-semibold text-blue-200">{stats.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/20 p-2">
                <MessageSquare className="h-5 w-5 text-amber-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Contacted</p>
                <p className="text-2xl font-semibold text-amber-200">{stats.contacted}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ivory/10 bg-background/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/20 p-2">
                <DollarSign className="h-5 w-5 text-purple-200" />
              </div>
              <div>
                <p className="text-sm text-ivory/60">Quoted</p>
                <p className="text-2xl font-semibold text-purple-200">{stats.quoted}</p>
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
                <p className="text-sm text-ivory/60">Booked</p>
                <p className="text-2xl font-semibold text-emerald-200">{stats.booked}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8 border-ivory/10 bg-background/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
              <Input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
              >
                All ({stats.total})
              </Button>
              <Button
                variant={statusFilter === 'new' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('new')}
              >
                New ({stats.new})
              </Button>
              <Button
                variant={statusFilter === 'contacted' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('contacted')}
              >
                Contacted ({stats.contacted})
              </Button>
              <Button
                variant={statusFilter === 'quoted' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('quoted')}
              >
                Quoted ({stats.quoted})
              </Button>
              <Button
                variant={statusFilter === 'booked' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('booked')}
              >
                Booked ({stats.booked})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="border-ivory/10 bg-background/60">
        <CardContent className="p-0">
          {filteredLeads.length === 0 ? (
            <div className="py-16 text-center">
              <Search className="mx-auto mb-4 h-16 w-16 text-ivory/20" />
              <p className="text-ivory/60">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ivory/10 bg-background/80">
                    <th className="px-6 py-3 text-left text-sm font-medium text-ivory/60">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-ivory/60">Event Details</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-ivory/60">Budget</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-ivory/60">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-ivory/60">Created</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-ivory/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-ivory/5 hover:bg-ivory/5">
                      <td className="px-6 py-4">
                        <p className="font-medium text-ivory">{lead.customerName}</p>
                        <p className="text-sm text-ivory/60">{lead.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-ivory">{lead.eventType}</p>
                        <p className="text-xs text-ivory/60">
                          {lead.eventDate ? new Date(lead.eventDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }) : 'TBD'}
                        </p>
                        <p className="text-xs text-ivory/60">{lead.guestCount} guests</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-ivory">
                          {new Intl.NumberFormat('th-TH', {
                            style: 'currency',
                            currency: 'THB',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(lead.budget)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={statusColors[lead.status]}>
                          {statusLabels[lead.status]}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-ivory/60">
                          {new Date(lead.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                        {lead.lastActivity && (
                          <p className="text-xs text-ivory/40">
                            Last: {new Date(lead.lastActivity).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {lead.status === 'new' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleContact(lead)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          )}
                          {lead.status === 'contacted' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCreateQuote(lead)}
                            >
                              <DollarSign className="h-4 w-4" />
                            </Button>
                          )}
                          {lead.status === 'quoted' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(lead.id, 'booked')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {lead.status === 'lost' && (
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <XCircle className="h-4 w-4 text-red-400" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
