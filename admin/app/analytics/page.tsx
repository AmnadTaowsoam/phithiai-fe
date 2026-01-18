import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Platform analytics dashboards." />
      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>Connect to metrics and reporting services.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This page is scaffolded for charts, cohorts, funnels, and vendor performance analytics.
        </CardContent>
      </Card>
    </div>
  );
}

