/**
 * i18n Utilities for Locale-Specific Formatting
 * Provides utilities for formatting dates, numbers, and currencies according to locale conventions
 */

import { CURRENCIES, Currency } from '@/contexts/CurrencyContext';

export interface LocaleConfig {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  dateFormat: 'short' | 'medium' | 'long';
  timeFormat: '12h' | '24h';
  numberFormat: 'decimal' | 'grouped' | 'currency';
  currencyFormat: 'symbol' | 'code' | 'name';
}

export const LOCALE_CONFIGS: Record<string, LocaleConfig> = {
  'th-TH': {
    code: 'th-TH',
    name: 'Thai',
    nativeName: 'ไทย',
    direction: 'ltr',
    dateFormat: 'long',
    timeFormat: '24h',
    numberFormat: 'grouped',
    currencyFormat: 'symbol',
  },
  'en-US': {
    code: 'en-US',
    name: 'English (United States)',
    nativeName: 'English',
    direction: 'ltr',
    dateFormat: 'medium',
    timeFormat: '12h',
    numberFormat: 'decimal',
    currencyFormat: 'symbol',
  },
  'ja-JP': {
    code: 'ja-JP',
    name: 'Japanese (Japan)',
    nativeName: '日本語',
    direction: 'ltr',
    dateFormat: 'long',
    timeFormat: '24h',
    numberFormat: 'grouped',
    currencyFormat: 'symbol',
  },
  'zh-CN': {
    code: 'zh-CN',
    name: 'Chinese (Simplified, China)',
    nativeName: '简体中文',
    direction: 'ltr',
    dateFormat: 'long',
    timeFormat: '24h',
    numberFormat: 'grouped',
    currencyFormat: 'symbol',
  },
  'ko-KR': {
    code: 'ko-KR',
    name: 'Korean (South Korea)',
    nativeName: '한국어',
    direction: 'ltr',
    dateFormat: 'long',
    timeFormat: '24h',
    numberFormat: 'grouped',
    currencyFormat: 'symbol',
  },
  'ar-SA': {
    code: 'ar-SA',
    name: 'Arabic (Saudi Arabia)',
    nativeName: 'العربية',
    direction: 'rtl',
    dateFormat: 'long',
    timeFormat: '24h',
    numberFormat: 'grouped',
    currencyFormat: 'symbol',
  },
  'ms-MY': {
    code: 'ms-MY',
    name: 'Malay (Malaysia)',
    nativeName: 'Bahasa Melayu',
    direction: 'ltr',
    dateFormat: 'medium',
    timeFormat: '24h',
    numberFormat: 'grouped',
    currencyFormat: 'symbol',
  },
  'vi-VN': {
    code: 'vi-VN',
    name: 'Vietnamese (Vietnam)',
    nativeName: 'Tiếng Việt',
    direction: 'ltr',
    dateFormat: 'medium',
    timeFormat: '24h',
    numberFormat: 'grouped',
    currencyFormat: 'symbol',
  },
};

/**
 * Get locale configuration for a given locale code
 */
export function getLocaleConfig(locale: string): LocaleConfig {
  return LOCALE_CONFIGS[locale] || LOCALE_CONFIGS['en-US'];
}

/**
 * Format a date according to locale conventions
 */
export function formatDate(date: Date, locale: string = 'en-US', format: 'short' | 'medium' | 'long' = 'medium'): string {
  const config = getLocaleConfig(locale);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric',
  };

  switch (format) {
    case 'short':
      options.day = 'numeric';
      options.month = 'short';
      options.year = '2-digit';
      break;
    case 'medium':
      options.day = 'numeric';
      options.month = 'short';
      options.year = 'numeric';
      break;
    case 'long':
      options.day = 'numeric';
      options.month = 'long';
      options.year = 'numeric';
      break;
  }

  return new Intl.DateTimeFormat(config.code, options).format(date);
}

/**
 * Format a time according to locale conventions
 */
export function formatTime(date: Date, locale: string = 'en-US', format: '12h' | '24h' = '24h'): string {
  const config = getLocaleConfig(locale);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: format === '12h',
  };

  return new Intl.DateTimeFormat(config.code, options).format(date);
}

/**
 * Format a number according to locale conventions
 */
export function formatNumber(
  value: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  const config = getLocaleConfig(locale);
  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: config.numberFormat === 'grouped',
  };

  return new Intl.NumberFormat(config.code, { ...defaultOptions, ...options }).format(value);
}

/**
 * Format a currency amount according to locale conventions
 */
export function formatCurrency(
  amount: number,
  currency: Currency = 'THB',
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  const config = getLocaleConfig(locale);
  const currencyInfo = CURRENCIES[currency];
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currencyInfo.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  };

  return new Intl.NumberFormat(config.code, {
    ...defaultOptions,
    ...options,
  }).format(amount);
}

/**
 * Format a relative time (e.g., "2 hours ago", "yesterday")
 */
export function formatRelativeTime(date: Date, locale: string = 'en-US'): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (seconds < 60) {
    return rtf.format(-seconds, 'second');
  } else if (minutes < 60) {
    return rtf.format(-minutes, 'minute');
  } else if (hours < 24) {
    return rtf.format(-hours, 'hour');
  } else if (days < 7) {
    return rtf.format(-days, 'day');
  } else {
    return formatDate(date, locale, 'short');
  }
}

/**
 * Format a date range
 */
export function formatDateRange(startDate: Date, endDate: Date, locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedStart = new Intl.DateTimeFormat(config.code, options).format(startDate);
  const formattedEnd = new Intl.DateTimeFormat(config.code, options).format(endDate);

  return `${formattedStart} - ${formattedEnd}`;
}

/**
 * Get text direction for a locale
 */
export function getTextDirection(locale: string): 'ltr' | 'rtl' {
  const config = getLocaleConfig(locale);
  return config.direction;
}

/**
 * Check if a locale is RTL
 */
export function isRTLLocale(locale: string): boolean {
  return getTextDirection(locale) === 'rtl';
}

/**
 * Format a percentage according to locale conventions
 */
export function formatPercentage(value: number, locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);
  const options: Intl.NumberFormatOptions = {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  };

  return new Intl.NumberFormat(config.code, options).format(value / 100);
}

/**
 * Format a list of items with locale-appropriate separators
 */
export function formatList(items: string[], locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);
  const listFormatter = new Intl.ListFormat(config.code, {
    style: 'long',
    type: 'conjunction',
  });

  return listFormatter.format(items);
}

/**
 * Get plural form for a number
 */
export function getPluralForm(
  singular: string,
  plural: string,
  count: number,
  locale: string = 'en-US'
): string {
  const config = getLocaleConfig(locale);
  const pluralRule = new Intl.PluralRules(config.code);

  const form = pluralRule.select(count);
  return form === 'one' ? singular : plural;
}

/**
 * Format a file size according to locale conventions
 */
export function formatFileSize(bytes: number, locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];

  const threshold = 1024;
  if (bytes < threshold) return `${bytes} B`;

  const kb = bytes / 1024;
  if (kb < threshold) return `${Math.round(kb)} KB`;

  const mb = kb / 1024;
  if (mb < threshold) return `${Math.round(mb)} MB`;

  const gb = mb / 1024;
  return `${Math.round(gb)} GB`;
}

/**
 * Get appropriate date format pattern for a locale
 */
export function getDateFormatPattern(locale: string): string {
  const config = getLocaleConfig(locale);

  switch (config.dateFormat) {
    case 'short':
      return 'dd/MM/yyyy';
    case 'medium':
      return 'MMM d, yyyy';
    case 'long':
      return 'MMMM d, yyyy';
    default:
      return 'MMM d, yyyy';
  }
}

/**
 * Format a phone number according to locale conventions
 */
export function formatPhoneNumber(phoneNumber: string, locale: string = 'en-US'): string {
  const cleaned = phoneNumber.replace(/[^\d+\s]/g, '');

  if (cleaned.startsWith('0')) {
    return cleaned.replace(/^0/, '+66 ');
  }

  if (cleaned.startsWith('66')) {
    return cleaned.replace(/^66/, '0 ');
  }

  return cleaned
    .replace(/(\d{3})(\d{4})/, '$1 $2')
    .replace(/(\d{3})(\d{4})/, '$1 $2');
}

/**
 * Get locale-specific greeting
 */
export function getGreeting(locale: string, timeOfDay: 'morning' | 'afternoon' | 'evening' = 'morning'): string {
  const config = getLocaleConfig(locale);

  switch (config.code) {
    case 'th-TH':
      switch (timeOfDay) {
        case 'morning':
          return 'สวัสดีตอนเช้า';
        case 'afternoon':
          return 'สวัสดีตอนบ่าย';
        case 'evening':
          return 'สวัสดีตอนเย็น';
      }
      return 'สวัสดี';
    case 'ja-JP':
      switch (timeOfDay) {
        case 'morning':
          return 'おはようございます';
        case 'afternoon':
          return 'こんにちは';
        case 'evening':
          return 'こんばんは';
      }
      return 'おはようございます';
    case 'zh-CN':
      switch (timeOfDay) {
        case 'morning':
          return '早上好';
        case 'afternoon':
          return '下午好';
        case 'evening':
          return '晚上好';
      }
      return '早上好';
    case 'ko-KR':
      switch (timeOfDay) {
        case 'morning':
          return '좋은 아침입니다';
        case 'afternoon':
          return '안녕하세요';
        case 'evening':
          return '좋은 저녁입니다';
      }
      return '좋은 아침입니다';
    case 'ar-SA':
      switch (timeOfDay) {
        case 'morning':
          return 'صباح الخير';
        case 'afternoon':
          return 'مساء الخير';
        case 'evening':
          return 'مساء الخير';
      }
      return 'صباح الخير';
    default:
      switch (timeOfDay) {
        case 'morning':
          return 'Good morning';
        case 'afternoon':
          return 'Good afternoon';
        case 'evening':
          return 'Good evening';
      }
      return 'Good morning';
  }
}

/**
 * Get locale-specific error message
 */
export function getErrorMessage(key: string, locale: string = 'en-US'): string {
  const errorMessages: Record<string, Record<string, string>> = {
    'required_field': {
      'en-US': 'This field is required',
      'th-TH': 'กรุณากรอกข้อมูลในช่องนี้',
      'ja-JP': 'この項目は必須です',
      'zh-CN': '此字段为必填项',
      'ko-KR': '이 필드는 필수 항목입니다',
      'ar-SA': 'هذا الحقل مطلوب',
    },
    'invalid_email': {
      'en-US': 'Please enter a valid email address',
      'th-TH': 'กรุณากรอกอีเมลที่ถูกต้อง',
      'ja-JP': '有効なメールアドレスを入力してください',
      'zh-CN': '请输入有效的电子邮件地址',
      'ko-KR': '유효한 이메일 주소를 입력해 주세요',
      'ar-SA': 'الرجاء إدخال عنوان بريد إلكتروني صالح',
    },
    'payment_failed': {
      'en-US': 'Payment failed. Please try again.',
      'th-TH': 'การชำระเงินล้มเหลว กรุณาลองใหม่',
      'ja-JP': 'お支払いに失敗しました。もう一度お試しください。',
      'zh-CN': '付款失败。请重试。',
      'ko-KR': '결제에 실패했습니다. 다시 시도해 주세요.',
      'ar-SA': 'فشلت الدفع. يرجى المحاولة مرة أخرى.',
    },
    'network_error': {
      'en-US': 'Network error. Please check your connection.',
      'th-TH': 'เกิดข้อผิดพลาดเครือข่าย กรุณาตรวจสอบการเชื่อมต่อ',
      'ja-JP': 'ネットワークエラーが発生しました。接続を確認してください。',
      'zh-CN': '网络错误。请检查您的连接。',
      'ko-KR': '네트워크 오류가 발생했습니다. 연결을 확인해 주세요.',
      'ar-SA': 'خطأ في الشبكة. يرجى التحقق من الاتصال.',
    },
  };

  return errorMessages[key]?.[locale] || errorMessages[key]?.['en-US'] || 'An error occurred';
}

/**
 * Get locale-specific month names
 */
export function getMonthName(monthIndex: number, locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);

  const monthNames: Record<string, string[]> = {
    'en-US': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'th-TH': ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
    'ja-JP': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'zh-CN': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    'ko-KR': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    'ar-SA': ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    'ms-MY': ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
    'vi-VN': ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  };

  return monthNames[locale]?.[monthIndex] || monthNames['en-US'][monthIndex];
}

/**
 * Get locale-specific day names
 */
export function getDayName(dayIndex: number, locale: string = 'en-US', format: 'short' | 'long' = 'long'): string {
  const config = getLocaleConfig(locale);

  const dayNames: Record<string, { short: string[]; long: string[] }> = {
    'en-US': {
      short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    'th-TH': {
      short: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
      long: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
    },
    'ja-JP': {
      short: ['日', '月', '火', '水', '木', '金', '土'],
      long: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    },
    'zh-CN': {
      short: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      long: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    },
    'ko-KR': {
      short: ['일', '월', '화', '수', '목', '금', '토'],
      long: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    },
    'ar-SA': {
      short: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      long: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    },
    'ms-MY': {
      short: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
      long: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
    },
    'vi-VN': {
      short: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      long: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
    },
  };

  return dayNames[locale]?.[format][dayIndex] || dayNames['en-US'][format][dayIndex];
}

/**
 * Format an address according to locale conventions
 */
export function formatAddress(
  address: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  },
  locale: string = 'en-US'
): string {
  const config = getLocaleConfig(locale);
  const isRTL = config.direction === 'rtl';

  const parts: string[] = [];

  if (address.street) parts.push(address.street);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.postalCode) parts.push(address.postalCode);
  if (address.country) parts.push(address.country);

  if (isRTL) {
    return parts.reverse().join(', ');
  }

  return parts.join(', ');
}

/**
 * Get locale-specific date separator
 */
export function getDateSeparator(locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);

  switch (config.code) {
    case 'th-TH':
    case 'ja-JP':
    case 'zh-CN':
    case 'ko-KR':
      return '/';
    case 'ar-SA':
      return '/';
    default:
      return '/';
  }
}

/**
 * Format a duration in locale-appropriate format
 */
export function formatDuration(minutes: number, locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} ${getPluralForm('minute', 'minutes', mins, locale)}`;
  }

  if (mins === 0) {
    return `${hours} ${getPluralForm('hour', 'hours', hours, locale)}`;
  }

  return `${hours} ${getPluralForm('hour', 'hours', hours, locale)} ${mins} ${getPluralForm('minute', 'minutes', mins, locale)}`;
}

/**
 * Get locale-specific decimal separator
 */
export function getDecimalSeparator(locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);
  const formatter = new Intl.NumberFormat(config.code);
  const parts = formatter.formatToParts(1.1);
  const decimalPart = parts.find((part) => part.type === 'decimal');
  return decimalPart?.value || '.';
}

/**
 * Get locale-specific thousands separator
 */
export function getThousandsSeparator(locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);
  const formatter = new Intl.NumberFormat(config.code);
  const parts = formatter.formatToParts(1000);
  const groupPart = parts.find((part) => part.type === 'group');
  return groupPart?.value || ',';
}

/**
 * Format a compact number (e.g., 1.2K, 1.5M)
 */
export function formatCompactNumber(value: number, locale: string = 'en-US'): string {
  const config = getLocaleConfig(locale);
  const formatter = new Intl.NumberFormat(config.code, {
    notation: 'compact',
    compactDisplay: 'short',
  });

  return formatter.format(value);
}

/**
 * Get locale-specific currency symbol position
 */
export function getCurrencySymbolPosition(locale: string = 'en-US'): 'before' | 'after' {
  const config = getLocaleConfig(locale);

  switch (config.code) {
    case 'ja-JP':
    case 'zh-CN':
    case 'ko-KR':
      return 'before';
    case 'th-TH':
      return 'before';
    case 'ar-SA':
      return 'after';
    default:
      return 'before';
  }
}

/**
 * Format a timestamp to locale-appropriate string
 */
export function formatTimestamp(timestamp: number, locale: string = 'en-US'): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (diff < oneDay && date.getDate() === now.getDate()) {
    return formatTime(date, locale);
  }

  if (diff < oneDay * 2) {
    return locale === 'th-TH' ? 'เมื่อวาน' : 'Yesterday';
  }

  if (diff < oneDay * 7) {
    return formatDate(date, locale, 'short');
  }

  return formatDate(date, locale, 'medium');
}

/**
 * I18nFormatter class for comprehensive locale formatting
 */
export class I18nFormatter {
  private locale: string;

  constructor(locale: string = 'en-US') {
    this.locale = locale;
  }

  setLocale(locale: string): void {
    this.locale = locale;
  }

  getLocale(): string {
    return this.locale;
  }

  formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
    return formatDate(date, this.locale, format);
  }

  formatTime(date: Date, format: '12h' | '24h' = '24h'): string {
    return formatTime(date, this.locale, format);
  }

  formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return formatNumber(value, this.locale, options);
  }

  formatCurrency(amount: number, currency: Currency = 'THB', options?: Intl.NumberFormatOptions): string {
    return formatCurrency(amount, currency, this.locale, options);
  }

  formatRelativeTime(date: Date): string {
    return formatRelativeTime(date, this.locale);
  }

  formatPercentage(value: number): string {
    return formatPercentage(value, this.locale);
  }

  formatList(items: string[]): string {
    return formatList(items, this.locale);
  }

  formatFileSize(bytes: number): string {
    return formatFileSize(bytes, this.locale);
  }

  formatPhoneNumber(phoneNumber: string): string {
    return formatPhoneNumber(phoneNumber, this.locale);
  }

  getGreeting(timeOfDay: 'morning' | 'afternoon' | 'evening' = 'morning'): string {
    return getGreeting(this.locale, timeOfDay);
  }

  getErrorMessage(key: string): string {
    return getErrorMessage(key, this.locale);
  }

  getMonthName(monthIndex: number): string {
    return getMonthName(monthIndex, this.locale);
  }

  getDayName(dayIndex: number, format: 'short' | 'long' = 'long'): string {
    return getDayName(dayIndex, this.locale, format);
  }

  formatAddress(address: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }): string {
    return formatAddress(address, this.locale);
  }

  formatDuration(minutes: number): string {
    return formatDuration(minutes, this.locale);
  }

  formatCompactNumber(value: number): string {
    return formatCompactNumber(value, this.locale);
  }

  formatTimestamp(timestamp: number): string {
    return formatTimestamp(timestamp, this.locale);
  }

  isRTL(): boolean {
    return isRTLLocale(this.locale);
  }

  getTextDirection(): 'ltr' | 'rtl' {
    return getTextDirection(this.locale);
  }
}

// Export a singleton instance for convenience
export const i18n = new I18nFormatter('en-US');
