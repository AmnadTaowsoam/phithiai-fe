import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="System configuration and admin settings." />
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Configure platform settings.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Add feature flags, payment settings, and operational toggles here.
        </CardContent>
      </Card>
    </div>
  );
}

