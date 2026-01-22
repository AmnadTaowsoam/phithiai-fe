'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'THB' | 'USD' | 'EUR' | 'SGD' | 'MYR' | 'GBP' | 'JPY' | 'CNY' | 'AUD' | 'CAD';

export interface CurrencyRate {
  from: Currency;
  to: Currency;
  rate: number;
  lastUpdated: Date;
  ttl?: number; // Time to live in minutes
  source?: string;
}

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  flag: string;
  locale: string;
}

export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  THB: { code: 'THB', symbol: '฿', name: 'Thai Baht', flag: '🇹🇭', locale: 'th-TH' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', locale: 'de-DE' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', locale: 'en-SG' },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾', locale: 'ms-MY' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', locale: 'en-GB' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', locale: 'ja-JP' },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳', locale: 'zh-CN' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', locale: 'en-AU' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', locale: 'en-CA' }
};

// Mock exchange rates (base: THB) - will be replaced with real API
const MOCK_RATES: Record<Currency, number> = {
  THB: 1,
  USD: 0.028,
  EUR: 0.026,
  SGD: 0.038,
  MYR: 0.13,
  GBP: 0.022,
  JPY: 4.2,
  CNY: 0.2,
  AUD: 0.043,
  CAD: 0.038
};

// Cache key for localStorage
const FX_RATES_CACHE_KEY = 'phithiai-fx-rates';
const FX_RATES_TIMESTAMP_KEY = 'phithiai-fx-rates-timestamp';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number, originalCurrency?: Currency) => string;
  convertPrice: (price: number, fromCurrency?: Currency) => number;
  getExchangeRate: (from: Currency, to: Currency) => number;
  currencies: Currency[];
  CURRENCIES: Record<Currency, CurrencyInfo>;
  fxRates: Record<string, CurrencyRate>;
  refreshFXRates: () => Promise<void>;
  isRefreshingFX: boolean;
  lastFXUpdate: Date | null;
  isRateStale: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Function to fetch real-time FX rates from API
async function fetchRealTimeFXRates(baseCurrency: Currency = 'THB'): Promise<Record<string, CurrencyRate>> {
  try {
    // In production, replace this with actual API call
    // const response = await fetch(`/api/fx-rates?base=${baseCurrency}`);
    // const data = await response.json();

    // For now, simulate API response with mock data
    const rates: Record<string, CurrencyRate> = {};
    const now = new Date();

    Object.keys(CURRENCIES).forEach((targetCurrency) => {
      if (targetCurrency !== baseCurrency) {
        const key = `${baseCurrency}-${targetCurrency}`;
        rates[key] = {
          from: baseCurrency,
          to: targetCurrency as Currency,
          rate: MOCK_RATES[targetCurrency as Currency] || 1,
          lastUpdated: now,
          ttl: 60, // 1 hour TTL
          source: 'Open Exchange Rates API',
        };
      }
    });

    // Cache the rates
    localStorage.setItem(FX_RATES_CACHE_KEY, JSON.stringify(rates));
    localStorage.setItem(FX_RATES_TIMESTAMP_KEY, now.toISOString());

    return rates;
  } catch (error) {
    console.error('Failed to fetch FX rates:', error);
    // Return cached rates if available
    return getCachedFXRates();
  }
}

// Function to get cached FX rates
function getCachedFXRates(): Record<string, CurrencyRate> {
  try {
    const cached = localStorage.getItem(FX_RATES_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error('Failed to parse cached FX rates:', error);
  }
  return {};
}

// Function to check if cached rates are stale
function areRatesStale(): boolean {
  try {
    const timestamp = localStorage.getItem(FX_RATES_TIMESTAMP_KEY);
    if (!timestamp) return true;

    const cachedTime = new Date(timestamp);
    const now = new Date();
    const diffMinutes = (now.getTime() - cachedTime.getTime()) / 60000;

    return diffMinutes > 60; // Stale if older than 1 hour
  } catch {
    return true;
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('THB');
  const [fxRates, setFxRates] = useState<Record<string, CurrencyRate>>({});
  const [isRefreshingFX, setIsRefreshingFX] = useState(false);
  const [lastFXUpdate, setLastFXUpdate] = useState<Date | null>(null);
  const [isRateStale, setIsRateStale] = useState(true);

  // Load saved currency from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('phithiai-currency') as Currency;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }

    // Load cached FX rates
    const cachedRates = getCachedFXRates();
    if (Object.keys(cachedRates).length > 0) {
      setFxRates(cachedRates);
      const timestamp = localStorage.getItem(FX_RATES_TIMESTAMP_KEY);
      if (timestamp) {
        setLastFXUpdate(new Date(timestamp));
        setIsRateStale(areRatesStale());
      }
    }

    // Initial fetch of real-time rates
    refreshFXRates();
  }, []);

  // Save currency to localStorage when changed
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('phithiai-currency', newCurrency);
  };

  // Refresh FX rates from API
  const refreshFXRates = async () => {
    setIsRefreshingFX(true);
    try {
      const rates = await fetchRealTimeFXRates();
      setFxRates(rates);
      setLastFXUpdate(new Date());
      setIsRateStale(false);
    } catch (error) {
      console.error('Failed to refresh FX rates:', error);
    } finally {
      setIsRefreshingFX(false);
    }
  };

  // Auto-refresh FX rates every hour
  useEffect(() => {
    const interval = setInterval(() => {
      refreshFXRates();
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  // Get exchange rate between two currencies
  const getExchangeRate = (from: Currency, to: Currency): number => {
    // First check real-time rates
    const key = `${from}-${to}`;
    if (fxRates[key] && !isRateStale) {
      return fxRates[key].rate;
    }

    // Fall back to mock rates
    const fromRate = MOCK_RATES[from];
    const toRate = MOCK_RATES[to];
    return toRate / fromRate;
  };

  // Convert price from one currency to another
  const convertPrice = (price: number, fromCurrency: Currency = 'THB'): number => {
    if (fromCurrency === currency) return price;
    const rate = getExchangeRate(fromCurrency, currency);
    return price * rate;
  };

  // Format price with currency symbol and locale
  const formatPrice = (price: number, originalCurrency?: Currency): string => {
    const convertedPrice = convertPrice(price, originalCurrency);
    const currencyInfo = CURRENCIES[currency];

    return new Intl.NumberFormat(currencyInfo.locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        getExchangeRate,
        currencies: Object.keys(CURRENCIES) as Currency[],
        CURRENCIES,
        fxRates,
        refreshFXRates,
        isRefreshingFX,
        lastFXUpdate,
        isRateStale
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
