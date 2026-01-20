/**
 * Types for Multilingual CMS
 */

export type SupportedLocale = 'en' | 'th' | 'zh' | 'ja' | 'ko' | 'ms' | 'id' | 'vi';

export interface LocaleInfo {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  enabled: boolean;
  default: boolean;
}

export interface ContentTranslation {
  locale: SupportedLocale;
  title: string;
  description: string;
  content?: string;
  keywords?: string[];
  status: 'draft' | 'review' | 'published';
  lastModified?: Date;
  modifiedBy?: string;
}

export interface ContentType {
  id: string;
  type: 'page' | 'blog' | 'product' | 'ritual' | 'vendor' | 'static';
  slug: string;
  translations: Partial<Record<SupportedLocale, ContentTranslation>>;
  primaryLocale: SupportedLocale;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  seoSettings: SEOSettings;
}

export interface SEOSettings {
  metaTitle?: Record<SupportedLocale, string>;
  metaDescription?: Record<SupportedLocale, string>;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  sitemapPriority?: number;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export interface TranslationProgress {
  locale: SupportedLocale;
  totalContent: number;
  translated: number;
  reviewed: number;
  published: number;
  percentage: number;
}

export interface TranslationMemory {
  sourceText: string;
  sourceLocale: SupportedLocale;
  targetText: string;
  targetLocale: SupportedLocale;
  confidence: number;
  lastUsed: Date;
}

export interface GlossaryTerm {
  term: string;
  translations: Record<SupportedLocale, string>;
  context: string;
  category: string;
}

export interface TranslationJob {
  id: string;
  sourceLocale: SupportedLocale;
  targetLocales: SupportedLocale[];
  contentIds: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  assignedTo?: string;
}

export interface ContentFilter {
  type?: ContentType['type'];
  locale?: SupportedLocale;
  status?: ContentTranslation['status'];
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface TranslationQuality {
  score: number;
  issues: QualityIssue[];
  suggestions: string[];
}

export interface QualityIssue {
  type: 'grammar' | 'spelling' | 'terminology' | 'style' | 'length' | 'formatting';
  severity: 'low' | 'medium' | 'high';
  message: string;
  suggestion?: string;
}

export interface AutoTranslateOptions {
  sourceLocale: SupportedLocale;
  targetLocales: SupportedLocale[];
  useMemory: boolean;
  useGlossary: boolean;
  preserveFormatting: boolean;
}
