'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconWorld,
  IconLanguage,
  IconFiles,
  IconCheck,
  IconClock,
  IconAlertTriangle,
  IconTrendingUp,
  IconUsers,
  IconRefresh,
  IconSettings,
  IconTransfer,
  IconBook,
  IconChartBar
} from '@tabler/icons-react';
import type {
  LocaleInfo,
  TranslationProgress,
  ContentType,
  TranslationJob,
  ContentFilter
} from './types';

// Mock data
const LOCALES: LocaleInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', direction: 'ltr', enabled: true, default: true },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', direction: 'ltr', enabled: true, default: false },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', direction: 'ltr', enabled: true, default: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', direction: 'ltr', enabled: true, default: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', direction: 'ltr', enabled: true, default: false },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', direction: 'ltr', enabled: true, default: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', direction: 'ltr', enabled: true, default: false },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', direction: 'ltr', enabled: true, default: false },
];

const TRANSLATION_PROGRESS: TranslationProgress[] = [
  { locale: 'en', totalContent: 245, translated: 245, reviewed: 245, published: 245, percentage: 100 },
  { locale: 'th', totalContent: 245, translated: 245, reviewed: 230, published: 225, percentage: 100 },
  { locale: 'zh', totalContent: 245, translated: 200, reviewed: 180, published: 170, percentage: 82 },
  { locale: 'ja', totalContent: 245, translated: 180, reviewed: 150, published: 140, percentage: 73 },
  { locale: 'ko', totalContent: 245, translated: 150, reviewed: 120, published: 110, percentage: 61 },
  { locale: 'ms', totalContent: 245, translated: 120, reviewed: 100, published: 95, percentage: 49 },
  { locale: 'id', totalContent: 245, translated: 100, reviewed: 80, published: 75, percentage: 41 },
  { locale: 'vi', totalContent: 245, translated: 80, reviewed: 60, published: 55, percentage: 33 },
];

const RECENT_CONTENTS: ContentType[] = [
  {
    id: '1',
    type: 'page',
    slug: 'wedding-ceremony-guide',
    primaryLocale: 'en',
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-19'),
    createdBy: 'admin@phithiai.com',
    seoSettings: {},
    translations: {
      en: { locale: 'en', title: 'Wedding Ceremony Guide', description: 'Complete guide for traditional Thai wedding ceremonies', status: 'published' },
      th: { locale: 'th', title: 'คู่มือพิธีแต่งงาน', description: 'คู่มือสมบูรณ์สำหรับพิธีแต่งงานแบบไทย', status: 'published' },
      zh: { locale: 'zh', title: '婚礼仪式指南', description: '传统泰式婚礼仪式完整指南', status: 'review' },
    }
  },
  {
    id: '2',
    type: 'ritual',
    slug: 'ordination-ceremony',
    primaryLocale: 'en',
    createdAt: new Date('2026-01-17'),
    updatedAt: new Date('2026-01-18'),
    createdBy: 'admin@phithiai.com',
    seoSettings: {},
    translations: {
      en: { locale: 'en', title: 'Ordination Ceremony', description: 'Buddhist ordination ceremony planning', status: 'published' },
      th: { locale: 'th', title: 'พิธีอุปสมบท', description: 'การวางแผนพิธีอุปสมบท', status: 'review' },
    }
  },
  {
    id: '3',
    type: 'blog',
    slug: 'thai-wedding-traditions-2026',
    primaryLocale: 'en',
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-16'),
    createdBy: 'content@phithiai.com',
    seoSettings: {},
    translations: {
      en: { locale: 'en', title: 'Thai Wedding Traditions 2026', description: 'Latest trends in Thai wedding ceremonies', status: 'published' },
    }
  },
];

const TRANSLATION_JOBS: TranslationJob[] = [
  { id: '1', sourceLocale: 'en', targetLocales: ['zh', 'ja', 'ko'], contentIds: ['1', '2', '3'], status: 'in-progress', createdAt: new Date('2026-01-19'), assignedTo: 'translator@phithiai.com' },
  { id: '2', sourceLocale: 'en', targetLocales: ['ms', 'id', 'vi'], contentIds: ['4', '5', '6'], status: 'pending', createdAt: new Date('2026-01-20') },
  { id: '3', sourceLocale: 'th', targetLocales: ['en'], contentIds: ['7'], status: 'completed', createdAt: new Date('2026-01-15'), completedAt: new Date('2026-01-16') },
];

export function MultilingualDashboard() {
  const [selectedLocale, setSelectedLocale] = useState<string>('all');
  const [filter, setFilter] = useState<ContentFilter>({});

  const enabledLocales = LOCALES.filter(l => l.enabled);
  const totalContent = TRANSLATION_PROGRESS[0].totalContent;
  const avgProgress = Math.round(
    TRANSLATION_PROGRESS.reduce((sum, p) => sum + p.percentage, 0) / TRANSLATION_PROGRESS.length
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-50';
      case 'review': return 'text-yellow-600 bg-yellow-50';
      case 'draft': return 'text-gray-600 bg-gray-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <IconWorld className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Multilingual CMS</h1>
                <p className="text-sm text-gray-500">Manage translations across 8 languages</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <IconRefresh className="w-4 h-4" />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                <IconTransfer className="w-4 h-4" />
                Auto Translate
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <IconSettings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Content</p>
                <p className="text-3xl font-bold text-gray-900">{totalContent}</p>
                <p className="text-sm text-green-600 mt-1">+12 this week</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <IconFiles className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Languages</p>
                <p className="text-3xl font-bold text-gray-900">{enabledLocales.length}</p>
                <p className="text-sm text-gray-500 mt-1">8 locales enabled</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <IconLanguage className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg Progress</p>
                <p className="text-3xl font-bold text-gray-900">{avgProgress}%</p>
                <p className="text-sm text-green-600 mt-1">+5% this month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <IconTrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{TRANSLATION_JOBS.filter(j => j.status === 'in-progress').length}</p>
                <p className="text-sm text-orange-600 mt-1">{TRANSLATION_JOBS.filter(j => j.status === 'pending').length} pending</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <IconClock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Translation Progress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <IconChartBar className="w-5 h-5 text-purple-600" />
                  Translation Progress by Locale
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {TRANSLATION_PROGRESS.map((progress) => {
                  const locale = LOCALES.find(l => l.code === progress.locale);
                  if (!locale) return null;

                  return (
                    <motion.div
                      key={progress.locale}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                        {locale.flag}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{locale.nativeName}</p>
                            <p className="text-sm text-gray-500">{locale.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">{progress.percentage}%</p>
                            <p className="text-sm text-gray-500">{progress.published} published</p>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                            transition={{ duration: 0.8 }}
                            className={`h-full ${getProgressColor(progress.percentage)} rounded-full`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Recent Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <IconBook className="w-5 h-5 text-purple-600" />
                  Recent Content
                </h2>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View All →
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {RECENT_CONTENTS.map((content) => (
                  <div key={content.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            content.type === 'page' ? 'bg-blue-100 text-blue-700' :
                            content.type === 'blog' ? 'bg-purple-100 text-purple-700' :
                            content.type === 'ritual' ? 'bg-pink-100 text-pink-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {content.type}
                          </span>
                          <span className="text-sm text-gray-500">/{content.slug}</span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {content.translations[content.primaryLocale]?.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {content.translations[content.primaryLocale]?.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {Object.values(content.translations).map((trans) => (
                            <span
                              key={trans.locale}
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(trans.status)}`}
                            >
                              {trans.locale.toUpperCase()} - {trans.status}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="ml-4 px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Translation Jobs */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <IconUsers className="w-5 h-5 text-purple-600" />
                  Translation Jobs
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {TRANSLATION_JOBS.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {job.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-lg">{LOCALES.find(l => l.code === job.sourceLocale)?.flag}</span>
                      <IconTransfer className="w-4 h-4 text-gray-400" />
                      {job.targetLocales.map((code) => (
                        <span key={code} className="text-lg">
                          {LOCALES.find(l => l.code === code)?.flag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {job.contentIds.length} content items
                    </p>
                    {job.assignedTo && (
                      <p className="text-xs text-gray-500">
                        Assigned to: {job.assignedTo}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-100">
                <button className="w-full py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100">
                  Create New Job
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <IconTransfer className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Bulk Translate</p>
                    <p className="text-sm text-gray-500">Translate multiple items</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <IconCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Review Translations</p>
                    <p className="text-sm text-gray-500">Pending review items</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <IconAlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Quality Check</p>
                    <p className="text-sm text-gray-500">Run quality analysis</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <IconBook className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Manage Glossary</p>
                    <p className="text-sm text-gray-500">Terminology database</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
