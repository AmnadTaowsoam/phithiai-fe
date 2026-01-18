import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLandingPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Card className="border-ivory/10 bg-background/70">
        <CardHeader>
          <CardTitle>Admin console</CardTitle>
          <CardDescription>
            The admin console runs as a separate Next.js app (default: `http://localhost:4000`).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-ivory/70">
          <p>
            Open:{' '}
            <a className="text-brand-200 hover:text-brand-100" href="http://localhost:4000" target="_blank" rel="noreferrer">
              http://localhost:4000
            </a>
          </p>
          <p>
            Or go to the admin routes in this app: <Link href="/dashboard" className="text-brand-200 hover:text-brand-100">Dashboard</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

