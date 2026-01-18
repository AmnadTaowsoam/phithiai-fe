'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Flag, ToggleLeft, ToggleRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useFeatureFlags } from '@/hooks/use-feature-flags';

const stateColors: Record<string, 'default' | 'warning' | 'success'> = {
  OFF: 'default',
  BETA: 'warning',
  ON: 'success',
};

export default function FeatureFlagsPage() {
  const { flags, loading, error, toggleFlag } = useFeatureFlags();

  const flagStats = {
    total: flags.length,
    on: flags.filter((f) => f.state === 'ON').length,
    beta: flags.filter((f) => f.state === 'BETA').length,
    off: flags.filter((f) => f.state === 'OFF').length,
  };

  return (
    <div>
      <PageHeader
        title="Feature Flags"
        description="Manage feature rollouts and A/B testing"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Feature Flag
          </Button>
        }
      />

      {/* Error State */}
      {error && (
        <Card className="p-6 mb-6">
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Using default data. Please check your API connection.
            </p>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Flags</p>
              {loading ? (
                <Skeleton className="h-8 w-8 mt-1" />
              ) : (
                <p className="text-2xl font-bold">{flagStats.total}</p>
              )}
            </div>
            <Flag className="h-8 w-8 text-gray-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Enabled</p>
              {loading ? (
                <Skeleton className="h-8 w-8 mt-1" />
              ) : (
                <p className="text-2xl font-bold">{flagStats.on}</p>
              )}
            </div>
            <ToggleRight className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Beta</p>
              {loading ? (
                <Skeleton className="h-8 w-8 mt-1" />
              ) : (
                <p className="text-2xl font-bold">{flagStats.beta}</p>
              )}
            </div>
            <ToggleRight className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Disabled</p>
              {loading ? (
                <Skeleton className="h-8 w-8 mt-1" />
              ) : (
                <p className="text-2xl font-bold">{flagStats.off}</p>
              )}
            </div>
            <ToggleLeft className="h-8 w-8 text-gray-500" />
          </div>
        </Card>
      </div>

      {/* Feature Flags Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flag Key</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Pack Reference</TableHead>
              <TableHead>Segments</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-20" />
                  </TableCell>
                </TableRow>
              ))
            ) : flags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">No feature flags found</p>
                </TableCell>
              </TableRow>
            ) : (
              flags.map((flag) => (
                <TableRow key={flag.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Flag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm">{flag.key}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={stateColors[flag.state]}>{flag.state}</Badge>
                  </TableCell>
                  <TableCell>
                    {flag.packReference && (
                      <Badge variant="outline">{flag.packReference}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {flag.segments ? (
                      <div className="space-y-1">
                        {flag.segments.roles && (
                          <Badge variant="secondary" className="mr-1">
                            Roles: {flag.segments.roles.join(', ')}
                          </Badge>
                        )}
                        {flag.segments.percentage !== undefined && (
                          <Badge variant="secondary">
                            {flag.segments.percentage}% rollout
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">All users</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(flag.updatedAt, 'long')}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFlag(flag.id)}
                      className={cn(
                        flag.state === 'ON' && 'text-green-600',
                        flag.state === 'BETA' && 'text-yellow-600',
                        flag.state === 'OFF' && 'text-gray-600'
                      )}
                    >
                      {flag.state === 'OFF' ? (
                        <ToggleLeft className="h-5 w-5 mr-1" />
                      ) : (
                        <ToggleRight className="h-5 w-5 mr-1" />
                      )}
                      Toggle
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

