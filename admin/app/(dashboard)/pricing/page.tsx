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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Edit, Trash, DollarSign } from 'lucide-react';
import { formatDate, formatPercent } from '@/lib/utils';
import { usePricingRules } from '@/hooks/use-pricing-rules';

export default function PricingPage() {
  const { rules, loading, error } = usePricingRules();

  const activeRules = rules.filter((rule) => {
    const now = new Date();
    const activeFrom = new Date(rule.activeFrom);
    const activeTo = rule.activeTo ? new Date(rule.activeTo) : null;
    return activeFrom <= now && (!activeTo || activeTo >= now);
  });

  const defaultRule = rules.find((r) => r.ruleType === 'default');
  const defaultTakeRate = defaultRule ? defaultRule.takeRateBp : 1000;

  return (
    <div>
      <PageHeader
        title="Pricing Rules"
        description="Manage take-rate and pricing rules for the platform"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Pricing Rule
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

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Default Take Rate
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16 mb-2" />
            ) : (
              <div className="text-2xl font-bold">
                {formatPercent(defaultTakeRate / 100)}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Applied to all bookings by default
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-8 mb-2" />
            ) : (
              <div className="text-2xl font-bold">{activeRules.length}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Currently in effect
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-8 mb-2" />
            ) : (
              <div className="text-2xl font-bold">{rules.length}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Including inactive rules
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Rules Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Type</TableHead>
              <TableHead>Filters</TableHead>
              <TableHead>Take Rate</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Effective Take Rate</TableHead>
              <TableHead>Active Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : rules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <p className="text-muted-foreground">No pricing rules found</p>
                </TableCell>
              </TableRow>
            ) : (
              rules.map((rule) => {
                const isActive = activeRules.some((r) => r.id === rule.id);
                const effectiveRate = rule.takeRateBp - rule.discountBp;

                return (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium capitalize">
                      {rule.ruleType.replace('_', ' ')}
                    </TableCell>
                    <TableCell>
                      {Object.keys(rule.filters).length > 0 ? (
                        <div className="space-y-1">
                          {Object.entries(rule.filters).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="mr-1">
                              {key}: {String(value)}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell>{formatPercent(rule.takeRateBp / 100)}</TableCell>
                    <TableCell>
                      {rule.discountBp > 0
                        ? formatPercent(rule.discountBp / 100)
                        : '-'}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatPercent(effectiveRate / 100)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">
                          From: {formatDate(rule.activeFrom)}
                        </p>
                        {rule.activeTo && (
                          <p className="text-sm">To: {formatDate(rule.activeTo)}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={isActive ? 'success' : 'default'}>
                        {isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

