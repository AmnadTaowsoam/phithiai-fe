'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconReceipt, IconTrendingDown, IconInfoCircle, IconRefresh } from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrency } from '@/contexts/CurrencyContext';

export interface PriceBreakdownItem {
  id: string;
  label: string;
  amount: number;
  currency: string;
  type: 'base' | 'tax' | 'fee' | 'discount' | 'total';
  description?: string;
  percentage?: number;
}

export interface PriceBreakdownProps {
  items: PriceBreakdownItem[];
  baseCurrency: string;
  targetCurrency: string;
  exchangeRate?: number;
  exchangeRateLastUpdated?: Date;
  showTaxDetails?: boolean;
  showFXDetails?: boolean;
  variant?: 'compact' | 'detailed' | 'summary';
}

export function PriceBreakdown({
  items,
  baseCurrency,
  targetCurrency,
  exchangeRate,
  exchangeRateLastUpdated,
  showTaxDetails = true,
  showFXDetails = true,
  variant = 'detailed',
}: PriceBreakdownProps) {
  const { formatPrice, getExchangeRate } = useCurrency();

  const baseItem = items.find((item) => item.type === 'base');
  const taxItems = items.filter((item) => item.type === 'tax');
  const feeItems = items.filter((item) => item.type === 'fee');
  const discountItems = items.filter((item) => item.type === 'discount');
  const totalItem = items.find((item) => item.type === 'total');

  const totalTax = taxItems.reduce((sum, item) => sum + item.amount, 0);
  const totalFees = feeItems.reduce((sum, item) => sum + item.amount, 0);
  const totalDiscounts = discountItems.reduce((sum, item) => sum + item.amount, 0);
  const subtotal = (baseItem?.amount || 0) + totalTax + totalFees - totalDiscounts;

  const effectiveExchangeRate = exchangeRate || getExchangeRate(baseCurrency as any, targetCurrency as any);
  const isForeignCurrency = baseCurrency !== targetCurrency;

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const renderCompact = () => (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex justify-between items-center text-sm"
        >
          <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
          <span
            className={`font-medium ${
              item.type === 'total'
                ? 'text-lg font-bold text-gray-900 dark:text-white'
                : item.type === 'discount'
                ? 'text-green-600'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {item.type === 'discount' ? '-' : ''}
            {formatPrice(item.amount, item.currency as any)}
          </span>
        </div>
      ))}
    </div>
  );

  const renderDetailed = () => (
    <div className="space-y-4">
      {/* Base Price */}
      {baseItem && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-start"
        >
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-white">{baseItem.label}</div>
            {baseItem.description && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {baseItem.description}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900 dark:text-white">
              {formatPrice(baseItem.amount, baseItem.currency as any)}
            </div>
            {isForeignCurrency && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {baseItem.amount.toLocaleString()} {baseCurrency}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Tax Breakdown */}
      {showTaxDetails && taxItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="border-t border-gray-200 dark:border-gray-700 pt-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <IconInfoCircle className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Taxes
            </span>
          </div>
          <div className="space-y-2 pl-6">
            {taxItems.map((tax) => (
              <div key={tax.id} className="flex justify-between items-start text-sm">
                <div className="flex-1">
                  <div className="text-gray-600 dark:text-gray-400">{tax.label}</div>
                  {tax.percentage && (
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {tax.percentage}% of base price
                    </div>
                  )}
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(tax.amount, tax.currency as any)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Service Fees */}
      {feeItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="border-t border-gray-200 dark:border-gray-700 pt-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <IconReceipt className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Service Fees
            </span>
          </div>
          <div className="space-y-2 pl-6">
            {feeItems.map((fee) => (
              <div key={fee.id} className="flex justify-between items-start text-sm">
                <div className="flex-1">
                  <div className="text-gray-600 dark:text-gray-400">{fee.label}</div>
                  {fee.description && (
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {fee.description}
                    </div>
                  )}
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(fee.amount, fee.currency as any)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* FX Conversion Fee */}
      {showFXDetails && isForeignCurrency && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="border-t border-gray-200 dark:border-gray-700 pt-3"
        >
          <div className="flex justify-between items-start text-sm">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <IconTrendingDown className="w-4 h-4" />
                <span>FX Conversion</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                1 {baseCurrency} = {effectiveExchangeRate.toFixed(4)} {targetCurrency}
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900 dark:text-white">
                {formatPrice(baseItem!.amount * effectiveExchangeRate, baseCurrency as any)}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Discounts */}
      {discountItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-200 dark:border-gray-700 pt-3"
        >
          <div className="space-y-2 pl-6">
            {discountItems.map((discount) => (
              <div key={discount.id} className="flex justify-between items-start text-sm">
                <div className="flex-1">
                  <div className="text-green-600">{discount.label}</div>
                  {discount.percentage && (
                    <div className="text-xs text-green-500/70">
                      {discount.percentage}% discount
                    </div>
                  )}
                </div>
                <div className="font-medium text-green-600">
                  -{formatPrice(discount.amount, discount.currency as any)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Total */}
      {totalItem && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t-2 border-gray-300 dark:border-gray-600 pt-4 mt-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {totalItem.label}
              </div>
              {isForeignCurrency && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Includes FX conversion at {effectiveExchangeRate.toFixed(4)}
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
              {formatPrice(totalItem.amount, totalItem.currency as any)}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
        <span className="font-medium text-gray-900 dark:text-white">
          {formatPrice(subtotal, targetCurrency as any)}
        </span>
      </div>
      {totalTax > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span className="text-gray-900 dark:text-white">
            {formatPrice(totalTax, targetCurrency as any)}
          </span>
        </div>
      )}
      {totalFees > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Fees</span>
          <span className="text-gray-900 dark:text-white">
            {formatPrice(totalFees, targetCurrency as any)}
          </span>
        </div>
      )}
      {totalDiscounts > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-green-600">Discount</span>
          <span className="text-green-600">
            -{formatPrice(totalDiscounts, targetCurrency as any)}
          </span>
        </div>
      )}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900 dark:text-white">Total</span>
          <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
            {formatPrice(totalItem?.amount || subtotal, targetCurrency as any)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="border-ivory/10 bg-background/70">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <IconReceipt className="w-5 h-5 text-brand-600" />
            Price Breakdown
          </CardTitle>
          {isForeignCurrency && exchangeRateLastUpdated && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <IconRefresh className="w-3 h-3" />
              {formatTimestamp(exchangeRateLastUpdated)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {variant === 'compact' && renderCompact()}
        {variant === 'detailed' && renderDetailed()}
        {variant === 'summary' && renderSummary()}
      </CardContent>
    </Card>
  );
}

// Helper function to create standard price breakdown items
export function createStandardPriceBreakdown(
  basePrice: number,
  baseCurrency: string,
  taxRate: number = 7, // Thailand VAT default
  serviceFeeRate: number = 5, // Platform service fee
  fxConversionFee: number = 1.5, // FX conversion fee percentage
  targetCurrency?: string,
  discountAmount: number = 0,
  discountPercentage?: number,
): PriceBreakdownItem[] {
  const items: PriceBreakdownItem[] = [];

  // Base price
  items.push({
    id: 'base',
    label: 'Base Price',
    amount: basePrice,
    currency: baseCurrency,
    type: 'base',
  });

  // Tax (VAT)
  const taxAmount = (basePrice * taxRate) / 100;
  if (taxAmount > 0) {
    items.push({
      id: 'tax',
      label: 'VAT (Value Added Tax)',
      amount: taxAmount,
      currency: baseCurrency,
      type: 'tax',
      percentage: taxRate,
    });
  }

  // Service fee
  const serviceFeeAmount = (basePrice * serviceFeeRate) / 100;
  if (serviceFeeAmount > 0) {
    items.push({
      id: 'service-fee',
      label: 'Platform Service Fee',
      amount: serviceFeeAmount,
      currency: baseCurrency,
      type: 'fee',
      percentage: serviceFeeRate,
      description: 'Secure payment processing & platform maintenance',
    });
  }

  // FX conversion fee (if foreign currency)
  if (targetCurrency && targetCurrency !== baseCurrency) {
    const fxFeeAmount = (basePrice * fxConversionFee) / 100;
    items.push({
      id: 'fx-fee',
      label: 'FX Conversion Fee',
      amount: fxFeeAmount,
      currency: baseCurrency,
      type: 'fee',
      percentage: fxConversionFee,
    });
  }

  // Discount
  if (discountAmount > 0) {
    items.push({
      id: 'discount',
      label: 'Discount',
      amount: discountAmount,
      currency: baseCurrency,
      type: 'discount',
      percentage: discountPercentage,
    });
  }

  // Total
  const total = items.reduce((sum, item) => {
    if (item.type === 'discount') return sum - item.amount;
    return sum + item.amount;
  }, 0);

  items.push({
    id: 'total',
    label: 'Total',
    amount: total,
    currency: baseCurrency,
    type: 'total',
  });

  return items;
}
