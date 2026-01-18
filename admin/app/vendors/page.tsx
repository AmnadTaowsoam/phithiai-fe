'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type VendorRow = {
  id: string;
  name: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  category: string;
};

const initialVendors: VendorRow[] = [
  { id: 'ven_001', name: 'Maison Lanna Collective', status: 'PENDING', category: 'decoration' },
  { id: 'ven_002', name: 'Siam Symphony', status: 'APPROVED', category: 'entertainment' },
];

export default function AdminVendorsPage() {
  const [query, setQuery] = useState('');
  const [vendors, setVendors] = useState(initialVendors);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vendors;
    return vendors.filter((v) => v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q));
  }, [query, vendors]);

  const updateStatus = (id: string, status: VendorRow['status']) => {
    setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Vendors" description="Approve and manage vendors." />
      <Card>
        <CardContent className="space-y-4 p-6">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search vendors…" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-mono text-xs">{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.category}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{vendor.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="secondary" onClick={() => updateStatus(vendor.id, 'APPROVED')}>
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(vendor.id, 'REJECTED')}>
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

