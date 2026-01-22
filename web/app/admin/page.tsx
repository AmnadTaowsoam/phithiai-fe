'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialHealthDashboard } from '@/components/admin/FinancialHealthDashboard';

export default function AdminLandingPage() {
  const [activeView, setActiveView] = useState<'overview' | 'financial'>('overview');

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-ivory mb-2">Admin Console</h1>
        <p className="text-ivory/60">
          The admin console runs as a separate Next.js app (default: `http://localhost:4000`).
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex gap-2 border-b border-ivory/15">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeView === 'overview'
                ? 'text-brand-200 border-b-2 border-brand-500'
                : 'text-ivory/70 hover:text-ivory hover:bg-ivory/5'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView('financial')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeView === 'financial'
                ? 'text-brand-200 border-b-2 border-brand-500'
                : 'text-ivory/70 hover:text-ivory hover:bg-ivory/5'
            }`}
          >
            Financial Health
          </button>
        </div>
      </div>

      {/* Content */}
      {activeView === 'overview' && (
        <Card className="border-ivory/10 bg-background/70">
          <CardHeader>
            <CardTitle>Admin Overview</CardTitle>
            <CardDescription>
              Quick access to admin tools and external services.
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
              Or go to the admin routes in this app:{' '}
              <Link href="/dashboard" className="text-brand-200 hover:text-brand-100">
                Dashboard
              </Link>
            </p>
          </CardContent>
        </Card>
      )}

      {activeView === 'financial' && <FinancialHealthDashboard />}
    </div>
  );
}

