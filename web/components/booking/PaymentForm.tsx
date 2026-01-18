'use client';

import { useMemo, useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPaymentIntent } from '@/lib/api/payments';
import { getMe } from '@/lib/api/users';
import { getClientAccessToken } from '@/lib/auth';

const schema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  vendorId: z.string().min(1, 'Vendor ID is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  currency: z.string().min(3).default('THB'),
  method: z.enum(['THAI_QR', 'CARD', 'BANK_TRANSFER']).default('THAI_QR'),
});

export const PaymentForm = (props?: { bookingId?: string; vendorId?: string; initialAmount?: number }) => {
  const accessToken = getClientAccessToken();

  const [bookingId, setBookingId] = useState(props?.bookingId ?? '');
  const [vendorId, setVendorId] = useState(props?.vendorId ?? '');
  const [amount, setAmount] = useState(String(props?.initialAmount ?? 0));
  const [currency, setCurrency] = useState('THB');
  const [method, setMethod] = useState<'THAI_QR' | 'CARD' | 'BANK_TRANSFER'>('THAI_QR');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => bookingId.trim().length > 0 && vendorId.trim().length > 0 && Number(amount) > 0,
    [amount, bookingId, vendorId],
  );

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setResult(null);
    setQrCode(null);

    if (!accessToken) {
      setError('Please sign in to create a payment.');
      return;
    }

    const parsed = schema.safeParse({ bookingId, vendorId, amount, currency, method });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid payment details');
      return;
    }

    setLoading(true);
    try {
      const me = await getMe(accessToken);
      const intent = await createPaymentIntent(
        {
          bookingId: parsed.data.bookingId,
          vendorId: parsed.data.vendorId,
          userId: me.id,
          amount: parsed.data.amount,
          currency: parsed.data.currency,
          method: parsed.data.method,
        },
        accessToken,
      );

      if (parsed.data.method === 'THAI_QR' && intent.qrCode) {
        setQrCode(intent.qrCode);
      }
      setResult(`Created payment intent: ${intent.id} (${intent.status})`);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create payment intent');
    } finally {
      setLoading(false);
    }
  };

  const qrImageUrl = useMemo(() => {
    if (!qrCode) return null;
    return `https://promptpay.io/api/v1/image/${encodeURIComponent(qrCode)}`;
  }, [qrCode]);

  return (
    <Card className="border-ivory/10 bg-background/70">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Create a payment intent via the API gateway.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bookingId">Booking ID</Label>
              <Input id="bookingId" value={bookingId} onChange={(e) => setBookingId(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendorId">Vendor ID</Label>
              <Input id="vendorId" value={vendorId} onChange={(e) => setVendorId(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">Method</Label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="h-11 w-full rounded-2xl border border-ivory/15 bg-background/90 px-4 text-sm text-ivory outline-none"
              >
                <option value="THAI_QR">Thai QR (PromptPay)</option>
                <option value="CARD">Card</option>
                <option value="BANK_TRANSFER">Bank transfer</option>
              </select>
            </div>
          </div>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          {result ? <p className="text-sm text-brand-200">{result}</p> : null}
          {qrImageUrl ? (
            <div className="rounded-2xl border border-ivory/15 bg-background/50 p-4">
              <div className="text-sm font-semibold text-ivory">PromptPay QR</div>
              <div className="mt-3 flex justify-center">
                <img
                  src={qrImageUrl}
                  alt="PromptPay QR code"
                  className="h-56 w-56 rounded-2xl bg-white p-2"
                  loading="lazy"
                />
              </div>
              <div className="mt-2 break-all text-xs text-ivory/60">{qrCode}</div>
            </div>
          ) : null}
          <Button type="submit" disabled={!canSubmit || loading}>
            {loading ? 'Creating…' : 'Create payment intent'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
