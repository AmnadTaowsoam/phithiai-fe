import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCurrency = (
  value: number,
  options: Intl.NumberFormatOptions = { style: 'currency', currency: 'THB', maximumFractionDigits: 0 },
  locale = 'th-TH',
) => new Intl.NumberFormat(locale, options).format(value);

export const formatNumber = (value: number, locale = 'th-TH') => new Intl.NumberFormat(locale).format(value);

export const formatThaiDate = (isoDate: string, locale = 'th-TH') =>
  new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoDate));
