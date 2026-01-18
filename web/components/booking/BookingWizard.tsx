'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import type { VendorSummary } from '@/lib/api';
import { createBooking } from '@/lib/api/bookings';
import { getClientAccessToken } from '@/lib/auth';
import { calculateDeposit, type BookingDraft } from '@/lib/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaymentForm } from '@/components/booking/PaymentForm';

const draftSchema = z.object({
  vendorId: z.string().min(1),
  quoteId: z.string().min(1),
  contractId: z.string().min(1),
  eventType: z.string().min(1),
  eventDate: z.string().min(1),
  totalAmount: z.coerce.number().positive(),
  depositPercent: z.coerce.number().min(0).max(100).default(30),
  guestCount: z.coerce.number().int().positive().optional(),
});

type Props = {
  vendors: VendorSummary[];
};

export const BookingWizard = ({ vendors }: Props) => {
  const router = useRouter();
  const accessToken = getClientAccessToken();

  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState({
    vendorId: vendors[0]?.id ?? '',
    quoteId: '',
    contractId: '',
    packageId: '',
    eventType: 'WEDDING_THAI',
    eventDate: '',
    eventTime: '',
    venue: '',
    guestCount: '',
    totalAmount: '',
    depositPercent: '30',
    specialRequests: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const selectedVendor = useMemo(() => vendors.find((v) => v.id === draft.vendorId), [vendors, draft.vendorId]);

  const depositAmount = useMemo(() => {
    const total = Number(draft.totalAmount);
    const pct = Number(draft.depositPercent);
    if (!Number.isFinite(total) || !Number.isFinite(pct)) return 0;
    return calculateDeposit(total, pct);
  }, [draft.totalAmount, draft.depositPercent]);

  const goNext = () => setStep((s) => Math.min(5, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const onCreateBooking = async () => {
    setError(null);
    if (!accessToken) {
      setError('Please sign in before creating a booking.');
      return;
    }

    const parsed = draftSchema.safeParse({
      vendorId: draft.vendorId,
      quoteId: draft.quoteId,
      contractId: draft.contractId,
      eventType: draft.eventType,
      eventDate: draft.eventDate,
      totalAmount: draft.totalAmount,
      depositPercent: draft.depositPercent,
      guestCount: draft.guestCount || undefined,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please complete required fields.');
      return;
    }

    setCreating(true);
    try {
      const totalAmount = Number(draft.totalAmount);
      const bookingDraft: BookingDraft = {
        vendorId: draft.vendorId,
        vendorName: selectedVendor?.name,
        quoteId: draft.quoteId,
        contractId: draft.contractId,
        packageId: draft.packageId || undefined,
        eventType: draft.eventType,
        eventDate: new Date(draft.eventDate).toISOString(),
        eventTime: draft.eventTime || undefined,
        venue: draft.venue || undefined,
        guestCount: draft.guestCount ? Number(draft.guestCount) : undefined,
        totalAmount,
        depositAmount,
        specialRequests: draft.specialRequests || undefined,
      };

      const result = await createBooking(accessToken, bookingDraft);
      router.push(`/booking/${result.booking.id}`);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create booking.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-ivory">Booking</h1>
        <div className="text-sm text-ivory/60">Step {step} of 5</div>
      </div>

      {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}

      {step === 1 ? (
        <Card className="border-ivory/10 bg-background/70">
          <CardHeader>
            <CardTitle>Select a vendor</CardTitle>
            <CardDescription>Choose who you want to book.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <select
                id="vendor"
                value={draft.vendorId}
                onChange={(e) => setDraft((d) => ({ ...d, vendorId: e.target.value }))}
                className="h-11 w-full rounded-2xl border border-ivory/15 bg-background/90 px-4 text-sm text-ivory outline-none"
              >
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <Button onClick={goNext} disabled={!draft.vendorId}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 2 ? (
        <Card className="border-ivory/10 bg-background/70">
          <CardHeader>
            <CardTitle>Event details</CardTitle>
            <CardDescription>Date, type, and guest count.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="eventType">Event type</Label>
                <Input
                  id="eventType"
                  value={draft.eventType}
                  onChange={(e) => setDraft((d) => ({ ...d, eventType: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={draft.eventDate}
                  onChange={(e) => setDraft((d) => ({ ...d, eventDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="guestCount">Guest count</Label>
                <Input
                  id="guestCount"
                  inputMode="numeric"
                  value={draft.guestCount}
                  onChange={(e) => setDraft((d) => ({ ...d, guestCount: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" value={draft.venue} onChange={(e) => setDraft((d) => ({ ...d, venue: e.target.value }))} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={goBack}>
                Back
              </Button>
              <Button onClick={goNext} disabled={!draft.eventDate}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 3 ? (
        <Card className="border-ivory/10 bg-background/70">
          <CardHeader>
            <CardTitle>Quote + contract references</CardTitle>
            <CardDescription>Required by the backend booking service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quoteId">Quote ID</Label>
                <Input id="quoteId" value={draft.quoteId} onChange={(e) => setDraft((d) => ({ ...d, quoteId: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractId">Contract ID</Label>
                <Input
                  id="contractId"
                  value={draft.contractId}
                  onChange={(e) => setDraft((d) => ({ ...d, contractId: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="packageId">Package ID (optional)</Label>
              <Input
                id="packageId"
                value={draft.packageId}
                onChange={(e) => setDraft((d) => ({ ...d, packageId: e.target.value }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={goBack}>
                Back
              </Button>
              <Button onClick={goNext} disabled={!draft.quoteId || !draft.contractId}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 4 ? (
        <Card className="border-ivory/10 bg-background/70">
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>Set total price and deposit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total amount (THB)</Label>
                <Input
                  id="totalAmount"
                  inputMode="numeric"
                  value={draft.totalAmount}
                  onChange={(e) => setDraft((d) => ({ ...d, totalAmount: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depositPercent">Deposit %</Label>
                <Input
                  id="depositPercent"
                  inputMode="numeric"
                  value={draft.depositPercent}
                  onChange={(e) => setDraft((d) => ({ ...d, depositPercent: e.target.value }))}
                />
              </div>
            </div>
            <p className="text-sm text-ivory/60">Calculated deposit: {depositAmount.toLocaleString('th-TH')} THB</p>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={goBack}>
                Back
              </Button>
              <Button onClick={goNext} disabled={!draft.totalAmount}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 5 ? (
        <div className="space-y-6">
          <Card className="border-ivory/10 bg-background/70">
            <CardHeader>
              <CardTitle>Confirm & create booking</CardTitle>
              <CardDescription>Review and submit to the booking service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-ivory/70">
                Vendor: {selectedVendor?.name ?? draft.vendorId}
                <br />
                Event: {draft.eventType} on {draft.eventDate || '—'}
                <br />
                Total: {Number(draft.totalAmount || 0).toLocaleString('th-TH')} THB (deposit {depositAmount.toLocaleString('th-TH')} THB)
              </div>
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={goBack}>
                  Back
                </Button>
                <Button onClick={onCreateBooking} disabled={creating}>
                  {creating ? 'Creating…' : 'Create booking'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <PaymentForm />
        </div>
      ) : null}
    </div>
  );
};

