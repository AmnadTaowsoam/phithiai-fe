'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSystemAlerts, SystemAlert } from '@/hooks/use-admin-actions';
import { AlertTriangle, CheckCircle, RefreshCw, Filter } from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/lib/utils';

const severityColors: Record<string, string> = {
  HIGH: 'bg-red-100 text-red-800 border-red-300',
  MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  LOW: 'bg-blue-100 text-blue-800 border-blue-300',
  INFO: 'bg-gray-100 text-gray-800 border-gray-300',
};

const severityIcons: Record<string, any> = {
  HIGH: AlertTriangle,
  MEDIUM: AlertTriangle,
  LOW: AlertTriangle,
  INFO: AlertTriangle,
};

const alertTypeLabels: Record<string, string> = {
  PAYMENT_FAILURE: 'Payment Failure',
  SERVICE_DOWN: 'Service Down',
  HIGH_ERROR_RATE: 'High Error Rate',
  RATE_LIMIT_EXCEEDED: 'Rate Limit Exceeded',
  DATABASE_CONNECTION: 'Database Connection',
  SECURITY_ALERT: 'Security Alert',
  PERFORMANCE_ISSUE: 'Performance Issue',
};

export default function SystemAlertsPage() {
  const [showResolved, setShowResolved] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');

  const { alerts, loading, error, resolveAlert } = useSystemAlerts(!showResolved);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;
    const matchesType = filterType === 'ALL' || alert.alertType === filterType;
    return matchesSeverity && matchesType;
  });

  const handleResolve = async (alertId: string) => {
    try {
      await resolveAlert(alertId);
    } catch (err) {
      alert('Failed to resolve alert');
    }
  };

  const severities = ['ALL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'];
  const types = ['ALL', ...new Set(alerts.map((a) => a.alertType))];

  return (
    <div className="space-y-6">
      <PageHeader
        title="System Alerts"
        description="Monitor and resolve system alerts"
        actions={
          <Button
            variant="outline"
            onClick={() => setShowResolved(!showResolved)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {showResolved ? 'Show Unresolved' : 'Show All'}
          </Button>
        }
      />

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Severity:</label>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {severities.map((s) => (
                  <option key={s} value={s}>
                    {s === 'ALL' ? 'All Severities' : s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Type:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t === 'ALL' ? 'All Types' : alertTypeLabels[t] || t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>
            {filteredAlerts.length} {showResolved ? 'total' : 'unresolved'} alert(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : filteredAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No alerts found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => {
                  const Icon = severityIcons[alert.severity] || AlertTriangle;
                  return (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <Badge className={severityColors[alert.severity]}>
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {alertTypeLabels[alert.alertType] || alert.alertType}
                      </TableCell>
                      <TableCell className="font-medium">{alert.title}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{alert.message}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{alert.source || 'System'}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{formatDate(alert.createdAt, 'short')}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatRelativeTime(alert.createdAt)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {alert.resolved ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Open
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {!alert.resolved && (
                          <Button
                            size="sm"
                            onClick={() => handleResolve(alert.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
