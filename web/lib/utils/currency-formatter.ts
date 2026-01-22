/**
 * Enhanced Currency Formatter for International Support
 * Supports 10+ international locales with proper formatting
 */

import { Currency, CURRENCIES, CurrencyInfo } from '@/contexts/CurrencyContext';

export interface CurrencyFormatOptions {
  locale?: string;
  style?: 'decimal' | 'currency' | 'percent';
  currency?: Currency;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
}

export interface NumberFormatOptions extends CurrencyFormatOptions {
  currency?: never;
}

/**
 * Extended locale mappings for better international support
 */
export const LOCALE_MAPPINGS: Record<string, string> = {
  // Thai
  'th-TH': 'th-TH',
  // English variants
  'en-US': 'en-US',
  'en-GB': 'en-GB',
  'en-AU': 'en-AU',
  'en-CA': 'en-CA',
  'en-SG': 'en-SG',
  // European
  'de-DE': 'de-DE', // German (EU)
  'fr-FR': 'fr-FR', // French (EU)
  'es-ES': 'es-ES', // Spanish (EU)
  // Asian
  'ja-JP': 'ja-JP', // Japanese
  'zh-CN': 'zh-CN', // Chinese (Simplified)
  'zh-TW': 'zh-TW', // Chinese (Traditional)
  'ko-KR': 'ko-KR', // Korean
  'vi-VN': 'vi-VN', // Vietnamese
  'ms-MY': 'ms-MY', // Malay (Malaysia)
  'id-ID': 'id-ID', // Indonesian
  // Middle East (for future RTL support)
  'ar-SA': 'ar-SA', // Arabic (Saudi Arabia)
  'he-IL': 'he-IL', // Hebrew (Israel)
};

/**
 * Get the best locale for a currency
 */
export function getLocaleForCurrency(currency: Currency): string {
  return CURRENCIES[currency]?.locale || 'en-US';
}

/**
 * Format a price with currency symbol and locale
 */
export function formatPrice(
  amount: number,
  currency: Currency = 'THB',
  options: CurrencyFormatOptions = {}
): string {
  const locale = options.locale || getLocaleForCurrency(currency);
  const currencyInfo = CURRENCIES[currency];

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
    useGrouping: options.useGrouping ?? true,
    notation: options.notation ?? 'standard',
  }).format(amount);
}

/**
 * Format a number without currency
 */
export function formatNumber(
  amount: number,
  options: NumberFormatOptions = {}
): string {
  const locale = options.locale || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: options.style || 'decimal',
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
    useGrouping: options.useGrouping ?? true,
    notation: options.notation ?? 'standard',
  }).format(amount);
}

/**
 * Format a percentage
 */
export function formatPercentage(
  value: number,
  options: { locale?: string; minimumFractionDigits?: number; maximumFractionDigits?: number } = {}
): string {
  const locale = options.locale || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  }).format(value / 100);
}

/**
 * Format a compact number (e.g., 1.2K, 1.5M)
 */
export function formatCompactNumber(
  amount: number,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

/**
 * Format a price range
 */
export function formatPriceRange(
  min: number,
  max: number,
  currency: Currency = 'THB',
  options: CurrencyFormatOptions = {}
): string {
  const locale = options.locale || getLocaleForCurrency(currency);

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  });

  return `${formatter.format(min)} – ${formatter.format(max)}`;
}

/**
 * Parse a formatted currency string back to a number
 */
export function parseFormattedPrice(formatted: string, locale: string = 'en-US'): number {
  const parts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).formatToParts(1);

  const currencySymbol = parts.find((part) => part.type === 'currency')?.value || '';
  const cleanString = formatted.replace(currencySymbol, '').trim();

  return parseFloat(cleanString.replace(/[^\d.-]/g, '')) || 0;
}

/**
 * Get currency symbol for display
 */
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCIES[currency]?.symbol || '';
}

/**
 * Format a price with tax breakdown
 */
export interface TaxBreakdown {
  amount: number;
  taxRate: number;
  taxAmount: number;
  currency: Currency;
}

export function formatPriceWithTax(
  breakdown: TaxBreakdown,
  options: CurrencyFormatOptions = {}
): { formatted: string; breakdown: string } {
  const formatted = formatPrice(breakdown.amount + breakdown.taxAmount, breakdown.currency, options);
  const taxFormatted = formatPrice(breakdown.taxAmount, breakdown.currency, options);

  return {
    formatted,
    breakdown: `Includes ${breakdown.taxRate}% VAT (${taxFormatted})`,
  };
}

/**
 * Format a price with discount
 */
export interface DiscountBreakdown {
  originalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  finalPrice: number;
  currency: Currency;
}

export function formatPriceWithDiscount(
  breakdown: DiscountBreakdown,
  options: CurrencyFormatOptions = {}
): { formatted: string; savings: string } {
  const formatted = formatPrice(breakdown.finalPrice, breakdown.currency, options);
  const savingsFormatted = formatPrice(breakdown.discountAmount, breakdown.currency, options);

  return {
    formatted,
    savings: `Save ${breakdown.discountPercentage}% (${savingsFormatted})`,
  };
}

/**
 * Format a timestamp as "time ago"
 */
export function formatTimeAgo(date: Date, locale: string = 'en-US'): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (seconds < 60) return rtf.format(-seconds, 'second');
  if (minutes < 60) return rtf.format(-minutes, 'minute');
  if (hours < 24) return rtf.format(-hours, 'hour');
  if (days < 7) return rtf.format(-days, 'day');
  if (days < 30) return rtf.format(-Math.floor(days / 7), 'week');
  if (days < 365) return rtf.format(-Math.floor(days / 30), 'month');
  return rtf.format(-Math.floor(days / 365), 'year');
}

/**
 * Format a date with locale
 */
export function formatDate(date: Date, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(date);
}

/**
 * Format a date and time with locale
 */
export function formatDateTime(date: Date, locale: string = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Check if a locale is RTL (Right-to-Left)
 */
export function isRTL(locale: string): boolean {
  const rtlLocales = ['ar', 'he', 'fa', 'ur'];
  return rtlLocales.some((rtl) => locale.startsWith(rtl));
}

/**
 * Get text direction for a locale
 */
export function getTextDirection(locale: string): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

/**
 * Currency formatter class for advanced usage
 */
export class CurrencyFormatter {
  private locale: string;
  private currency: Currency;

  constructor(currency: Currency = 'THB', locale?: string) {
    this.currency = currency;
    this.locale = locale || getLocaleForCurrency(currency);
  }

  format(amount: number, options?: CurrencyFormatOptions): string {
    return formatPrice(amount, this.currency, { ...options, locale: this.locale });
  }

  formatRange(min: number, max: number, options?: CurrencyFormatOptions): string {
    return formatPriceRange(min, max, this.currency, { ...options, locale: this.locale });
  }

  setCurrency(currency: Currency): void {
    this.currency = currency;
    this.locale = getLocaleForCurrency(currency);
  }

  setLocale(locale: string): void {
    this.locale = locale;
  }

  getLocale(): string {
    return this.locale;
  }

  getCurrency(): Currency {
    return this.currency;
  }

  getSymbol(): string {
    return getCurrencySymbol(this.currency);
  }

  isRTL(): boolean {
    return isRTL(this.locale);
  }

  getTextDirection(): 'ltr' | 'rtl' {
    return getTextDirection(this.locale);
  }
}

/**
 * Create a currency formatter instance
 */
export function createCurrencyFormatter(currency: Currency = 'THB', locale?: string): CurrencyFormatter {
  return new CurrencyFormatter(currency, locale);
}

/**
 * Format multiple prices for comparison
 */
export function formatPriceComparison(
  prices: Array<{ amount: number; currency: Currency; label?: string }>,
  baseCurrency: Currency = 'THB',
  options: CurrencyFormatOptions = {}
): Array<{ label?: string; formatted: string; amount: number; currency: Currency }> {
  const formatter = createCurrencyFormatter(baseCurrency, options.locale);

  return prices.map((price) => ({
    label: price.label,
    formatted: formatter.format(price.amount),
    amount: price.amount,
    currency: price.currency,
  }));
}
