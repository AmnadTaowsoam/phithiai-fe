'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: 'BUYER' | 'VENDOR' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
};

const sampleUsers: UserRow[] = [
  { id: 'usr_001', email: 'somchai@example.com', name: 'Somchai Jaidee', role: 'BUYER', status: 'ACTIVE' },
  { id: 'usr_002', email: 'vendor@example.com', name: 'Maison Lanna', role: 'VENDOR', status: 'ACTIVE' },
  { id: 'usr_003', email: 'admin@example.com', name: 'Admin', role: 'ADMIN', status: 'ACTIVE' },
];

export default function AdminUsersPage() {
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleUsers;
    return sampleUsers.filter((u) => u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage user accounts and roles." />
      <Card>
        <CardContent className="space-y-4 p-6">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users…" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'ACTIVE' ? 'default' : 'destructive'}>{user.status}</Badge>
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

