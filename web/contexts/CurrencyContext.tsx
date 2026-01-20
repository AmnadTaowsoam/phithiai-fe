'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'THB' | 'USD' | 'EUR' | 'SGD' | 'MYR' | 'GBP' | 'JPY' | 'CNY' | 'AUD' | 'CAD';

export interface CurrencyRate {
  from: Currency;
  to: Currency;
  rate: number;
  lastUpdated: Date;
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

// Mock exchange rates (base: THB)
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

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number, originalCurrency?: Currency) => string;
  convertPrice: (price: number, fromCurrency?: Currency) => number;
  getExchangeRate: (from: Currency, to: Currency) => number;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('THB');

  // Load saved currency from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('phithiai-currency') as Currency;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  // Save currency to localStorage when changed
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('phithiai-currency', newCurrency);
  };

  // Get exchange rate between two currencies
  const getExchangeRate = (from: Currency, to: Currency): number => {
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
        currencies: Object.keys(CURRENCIES) as Currency[]
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
