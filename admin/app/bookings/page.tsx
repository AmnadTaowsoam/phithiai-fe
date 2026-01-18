'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const rows = [
  { id: 'bok_001', buyer: 'somchai@example.com', vendor: 'Maison Lanna', status: 'PENDING' },
  { id: 'bok_002', buyer: 'buyer@example.com', vendor: 'Siam Symphony', status: 'CONFIRMED' },
];

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Bookings" description="Monitor bookings across the platform." />
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs">{row.id}</TableCell>
                  <TableCell>{row.buyer}</TableCell>
                  <TableCell>{row.vendor}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{row.status}</Badge>
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

