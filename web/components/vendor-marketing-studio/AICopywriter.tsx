'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconSparkles,
  IconCopy,
  IconRefresh,
  IconCheck,
  IconLoader2,
  IconX,
  IconBulb,
  IconTrendingUp,
  IconWriting
} from '@tabler/icons-react';
import {
  AICopywriterRequest,
  AICopywriterResponse,
  CopywritingTone,
  RitualType,
  ContentStyle
} from './types';

interface AICopywriterProps {
  onRequestGenerate: (request: AICopywriterRequest) => Promise<AICopywriterResponse>;
  onSaveContent?: (content: string) => void;
}

export default function AICopywriter({ onRequestGenerate, onSaveContent }: AICopywriterProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [request, setRequest] = useState<Partial<AICopywriterRequest>>({
    tone: 'professional',
    style: 'detailed',
    language: 'en'
  });
  const [response, setResponse] = useState<AICopywriterResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'alternatives' | 'suggestions'>('main');

  const tones: { value: CopywritingTone; label: string; icon: string; color: string }[] = [
    { value: 'professional', label: 'Professional', icon: '👔', color: 'blue' },
    { value: 'friendly', label: 'Friendly', icon: '😊', color: 'green' },
    { value: 'luxury', label: 'Luxury', icon: '✨', color: 'purple' },
    { value: 'playful', label: 'Playful', icon: '🎉', color: 'pink' },
    { value: 'traditional', label: 'Traditional', icon: '🏛️', color: 'amber' },
    { value: 'modern', label: 'Modern', icon: '🚀', color: 'cyan' }
  ];

  const ritualTypes: { value: RitualType; label: string; icon: string }[] = [
    { value: 'wedding', label: 'Wedding', icon: '💒' },
    { value: 'ordination', label: 'Ordination', icon: '🙏' },
    { value: 'funeral', label: 'Funeral', icon: '🕯️' },
    { value: 'annual-merit', label: 'Annual Merit', icon: '🪷' },
    { value: 'house-warming', label: 'House Warming', icon: '🏠' },
    { value: 'birthday', label: 'Birthday', icon: '🎂' },
    { value: 'corporate', label: 'Corporate', icon: '🏢' }
  ];

  const contentStyles: { value: ContentStyle; label: string; description: string }[] = [
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive with all features' },
    { value: 'concise', label: 'Concise', description: 'Short and punchy' },
    { value: 'storytelling', label: 'Storytelling', description: 'Narrative-driven content' },
    { value: 'feature-focused', label: 'Feature-Focused', description: 'Highlights key benefits' }
  ];

  const handleGenerate = async () => {
    if (!request.packageName || !request.ritualType || !request.price) {
      return;
    }

    setIsGenerating(true);
    try {
      const result = await onRequestGenerate(request as AICopywriterRequest);
      setResponse(result);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getToneColor = (tone: CopywritingTone) => {
    const toneConfig = tones.find(t => t.value === tone);
    return toneConfig?.color || 'gray';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <IconWriting className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Copywriter</h2>
            <p className="text-purple-100 text-sm">Generate high-converting package descriptions</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Input Form */}
        <div className="space-y-4">
          {/* Package Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Package Name
            </label>
            <input
              type="text"
              value={request.packageName || ''}
              onChange={(e) => setRequest({ ...request, packageName: e.target.value })}
              placeholder="e.g., Royal Wedding Package"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Price and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price
              </label>
              <input
                type="number"
                value={request.price || ''}
                onChange={(e) => setRequest({ ...request, price: Number(e.target.value) })}
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Currency
              </label>
              <select
                value={request.currency || 'THB'}
                onChange={(e) => setRequest({ ...request, currency: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="THB">THB - Thai Baht</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="SGD">SGD - Singapore Dollar</option>
                <option value="MYR">MYR - Malaysian Ringgit</option>
              </select>
            </div>
          </div>

          {/* Ritual Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ritual Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ritualTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setRequest({ ...request, ritualType: type.value })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    request.ritualType === type.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Key Features (comma separated)
            </label>
            <textarea
              value={request.keyFeatures?.join(', ') || ''}
              onChange={(e) =>
                setRequest({
                  ...request,
                  keyFeatures: e.target.value.split(',').map(f => f.trim()).filter(f => f)
                })
              }
              placeholder="e.g., Photography, Catering, Decoration, Entertainment"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Audience
            </label>
            <input
              type="text"
              value={request.targetAudience || ''}
              onChange={(e) => setRequest({ ...request, targetAudience: e.target.value })}
              placeholder="e.g., Couples seeking luxury wedding experiences"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Tone Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tone of Voice
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {tones.map((tone) => (
                <button
                  key={tone.value}
                  onClick={() => setRequest({ ...request, tone: tone.value })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    request.tone === tone.value
                      ? `border-${tone.color}-500 bg-${tone.color}-50 dark:bg-${tone.color}-900/20`
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="text-xl mb-1">{tone.icon}</div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {tone.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {contentStyles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => setRequest({ ...request, style: style.value })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    request.style === style.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    {style.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {style.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={request.language || 'en'}
              onChange={(e) => setRequest({ ...request, language: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="th">Thai (ไทย)</option>
              <option value="zh">Chinese (中文)</option>
              <option value="ja">Japanese (日本語)</option>
              <option value="ko">Korean (한국어)</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !request.packageName || !request.ritualType}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <IconLoader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <IconSparkles className="w-5 h-5" />
                <span>Generate Description</span>
              </>
            )}
          </button>
        </div>

        {/* Response Display */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-6"
            >
              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('main')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'main'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Main Version
                </button>
                <button
                  onClick={() => setActiveTab('alternatives')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'alternatives'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Alternatives ({response.alternativeVersions.length})
                </button>
                <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'suggestions'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Suggestions ({response.suggestions.length})
                </button>
              </div>

              {/* Conversion Score */}
              <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <IconTrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Conversion Score</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {response.estimatedConversionScore}%
                  </p>
                </div>
              </div>

              {/* Main Content */}
              {activeTab === 'main' && (
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                      {response.generatedContent}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(response.generatedContent)}
                      className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <IconCheck className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <IconCopy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    {onSaveContent && (
                      <button
                        onClick={() => onSaveContent(response.generatedContent)}
                        className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                      >
                        Save to Package
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Alternatives */}
              {activeTab === 'alternatives' && (
                <div className="space-y-3">
                  {response.alternativeVersions.map((alt, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-gray-900 dark:text-white whitespace-pre-wrap flex-1">
                          {alt}
                        </p>
                        <button
                          onClick={() => handleCopy(alt)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                        >
                          <IconCopy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {activeTab === 'suggestions' && (
                <div className="space-y-2">
                  {response.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl"
                    >
                      <IconBulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-900 dark:text-white text-sm">
                        {suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Regenerate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="mt-4 w-full py-3 px-4 border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-2"
              >
                <IconRefresh className="w-4 h-4" />
                <span>Generate New Versions</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
