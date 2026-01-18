import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function InquiryPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Card className="border-ivory/10 bg-background/70">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Chat/inquiry UI is being wired to the Inquiry Service (Phase 2).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-ivory/70">
          <p>
            For now, use booking details and your <Link href="/dashboard" className="text-brand-200 hover:text-brand-100">dashboard</Link>{' '}
            to track actions while Inquiry endpoints are finalized.
          </p>
          <p className="text-xs text-ivory/60">
            TODO: connect real inquiry threads + messages once ROO inquiry endpoints are finalized.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
