'use client';

import { useMemo, useState } from 'react';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPaymentIntent } from '@/lib/api/payments';
import { toUiErrorMessage } from '@/lib/api/ui-errors';
import { getMe } from '@/lib/api/users';
import { getClientAccessToken } from '@/lib/auth';
import { useCurrency } from '@/contexts/CurrencyContext';
import { PriceBreakdown, createStandardPriceBreakdown, PriceBreakdownItem } from './PriceBreakdown';
import { FXRateDisplay, useFXRates, FXRate } from './FXRateDisplay';

const schema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  vendorId: z.string().min(1, 'Vendor ID is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  currency: z.string().min(3).default('THB'),
  method: z.enum(['THAI_QR', 'CARD', 'BANK_TRANSFER']).default('THAI_QR'),
});

export const PaymentForm = (props?: { bookingId?: string; vendorId?: string; initialAmount?: number }) => {
  const accessToken = getClientAccessToken();
  const { currency, setCurrency, CURRENCIES, refreshFXRates, isRefreshingFX, lastFXUpdate, isRateStale } = useCurrency();

  const [bookingId, setBookingId] = useState(props?.bookingId ?? '');
  const [vendorId, setVendorId] = useState(props?.vendorId ?? '');
  const [amount, setAmount] = useState(String(props?.initialAmount ?? 0));
  const [baseCurrency, setBaseCurrency] = useState('THB');
  const [method, setMethod] = useState<'THAI_QR' | 'CARD' | 'BANK_TRANSFER'>('THAI_QR');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  // Fetch FX rates for currency conversion
  const { rates, isLoading: isLoadingFX, error: fxError, getRate } = useFXRates(
    baseCurrency as any,
    [currency, 'USD', 'EUR', 'SGD', 'JPY', 'CNY']
  );

  const numericAmount = useMemo(() => Number(amount) || 0, [amount]);

  // Generate price breakdown items
  const priceBreakdownItems: PriceBreakdownItem[] = useMemo(() => {
    if (numericAmount <= 0) return [];

    return createStandardPriceBreakdown(
      numericAmount,
      baseCurrency as any,
      7, // 7% VAT
      5, // 5% service fee
      1.5, // 1.5% FX fee
      baseCurrency !== currency ? currency : undefined,
      0, // No discount by default
    );
  }, [numericAmount, baseCurrency, currency]);

  // Get current FX rate
  const currentFXRate: FXRate | undefined = useMemo(() => {
    if (baseCurrency === currency) return undefined;
    return getRate(currency);
  }, [baseCurrency, currency, getRate, rates]);

  const canSubmit = useMemo(
    () => bookingId.trim().length > 0 && vendorId.trim().length > 0 && numericAmount > 0,
    [amount, bookingId, vendorId, numericAmount],
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
      setShowPriceBreakdown(true);
    } catch (error) {
      setError(toUiErrorMessage(error, 'Failed to create payment intent'));
    } finally {
      setLoading(false);
    }
  };

  const qrImageUrl = useMemo(() => {
    if (!qrCode) return null;
    return `https://promptpay.io/api/v1/image/${encodeURIComponent(qrCode)}`;
  }, [qrCode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Payment Form */}
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
                <Label htmlFor="baseCurrency">Base Currency</Label>
                <select
                  id="baseCurrency"
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-ivory/15 bg-background/90 px-4 text-sm text-ivory outline-none"
                >
                  {Object.entries(CURRENCIES).map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.flag} {code} - {info.name}
                    </option>
                  ))}
                </select>
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

            {/* Currency Selection & FX Rate */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="targetCurrency" className="text-purple-900 dark:text-purple-100">
                  Pay in
                </Label>
                {isRateStale && (
                  <motion.button
                    type="button"
                    onClick={() => refreshFXRates()}
                    disabled={isRefreshingFX}
                    className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className={`w-3 h-3 ${isRefreshingFX ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {isRefreshingFX ? 'Updating...' : 'Update rates'}
                  </motion.button>
                )}
              </div>
              <select
                id="targetCurrency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="h-11 w-full rounded-xl border border-purple-300 dark:border-purple-700 bg-white dark:bg-gray-800 px-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
              >
                {Object.entries(CURRENCIES).map(([code, info]) => (
                  <option key={code} value={code}>
                    {info.flag} {code} - {info.name}
                  </option>
                ))}
              </select>

              {/* FX Rate Display */}
              {currentFXRate && baseCurrency !== currency && (
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-purple-700 dark:text-purple-300">
                    Rate: 1 {baseCurrency} = {currentFXRate.rate.toFixed(4)} {currency}
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {lastFXUpdate ? formatTimeAgo(lastFXUpdate) : 'Just now'}
                  </span>
                </div>
              )}
            </div>

            {error ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            ) : null}
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <p className="text-sm text-green-600 dark:text-green-400">{result}</p>
              </motion.div>
            ) : null}
            {qrImageUrl ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-ivory/15 bg-background/50 p-4"
              >
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
              </motion.div>
            ) : null}
            <Button type="submit" disabled={!canSubmit || loading} className="w-full">
              {loading ? 'Creating…' : 'Create payment intent'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Price Breakdown Panel */}
      {showPriceBreakdown && priceBreakdownItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PriceBreakdown
            items={priceBreakdownItems}
            baseCurrency={baseCurrency as any}
            targetCurrency={currency}
            exchangeRate={currentFXRate?.rate}
            exchangeRateLastUpdated={currentFXRate?.lastUpdated}
            showTaxDetails={true}
            showFXDetails={baseCurrency !== currency}
            variant="detailed"
          />
        </motion.div>
      )}
    </div>
  );
};

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}
