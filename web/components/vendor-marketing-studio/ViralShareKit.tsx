'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconPhoto,
  IconDownload,
  IconShare,
  IconPalette,
  IconX,
  IconCheck,
  IconSparkles,
  IconRefresh,
  IconSocial,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLine,
  IconCopy
} from '@tabler/icons-react';
import {
  ViralShareTemplate,
  ViralShareRequest,
  RitualType
} from './types';

interface ViralShareKitProps {
  templates: ViralShareTemplate[];
  onGenerateImage: (request: ViralShareRequest) => Promise<string>;
  onDownloadImage?: (imageUrl: string, filename: string) => void;
}

export default function ViralShareKit({ templates, onGenerateImage, onDownloadImage }: ViralShareKitProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ViralShareTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [themeColors, setThemeColors] = useState<string[]>(['#9333ea', '#ec4899']);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const ritualTypes: { value: RitualType; label: string; icon: string }[] = [
    { value: 'wedding', label: 'Wedding', icon: '💒' },
    { value: 'ordination', label: 'Ordination', icon: '🙏' },
    { value: 'funeral', label: 'Funeral', icon: '🕯️' },
    { value: 'annual-merit', label: 'Annual Merit', icon: '🪷' },
    { value: 'house-warming', label: 'House Warming', icon: '🏠' },
    { value: 'birthday', label: 'Birthday', icon: '🎂' },
    { value: 'corporate', label: 'Corporate', icon: '🏢' }
  ];

  const colorPresets = [
    { name: 'Royal Purple', colors: ['#7c3aed', '#db2777'] },
    { name: 'Ocean Blue', colors: ['#2563eb', '#0891b2'] },
    { name: 'Golden Luxury', colors: ['#d97706', '#dc2626'] },
    { name: 'Emerald Green', colors: ['#059669', '#10b981'] },
    { name: 'Rose Gold', colors: ['#f43f5e', '#fbbf24'] },
    { name: 'Midnight', colors: ['#1e293b', '#475569'] }
  ];

  const handleGenerate = async (request: ViralShareRequest) => {
    setIsGenerating(true);
    try {
      const imageUrl = await onGenerateImage(request);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage && onDownloadImage) {
      onDownloadImage(generatedImage, `phithiai-share-${Date.now()}.png`);
    }
  };

  const handleShare = (platform: string) => {
    if (!generatedImage) return;

    const shareUrl = window.location.href;
    const text = 'Check out this amazing vendor package on Phithiai!';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'line':
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-orange-600 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <IconPhoto className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Viral Share Kit</h2>
            <p className="text-pink-100 text-sm">Auto-generate promotional images</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Template Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <IconPhoto className="w-5 h-5 text-pink-600" />
            Choose a Template
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <motion.button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                  selectedTemplate?.id === template.id
                    ? 'border-pink-500 ring-2 ring-pink-200 dark:ring-pink-800'
                    : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700'
                }`}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  <span className="text-4xl">{ritualTypes.find(r => r.value === template.ritualType)?.icon}</span>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {template.templateName}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {ritualTypes.find(r => r.value === template.ritualType)?.label}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Customization Form */}
        <AnimatePresence>
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              {/* Package Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <IconSparkles className="w-5 h-5 text-pink-600" />
                  Package Details
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      value={customizations.vendorName || ''}
                      onChange={(e) => setCustomizations({ ...customizations, vendorName: e.target.value })}
                      placeholder="Your business name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Package Name
                    </label>
                    <input
                      type="text"
                      value={customizations.packageName || ''}
                      onChange={(e) => setCustomizations({ ...customizations, packageName: e.target.value })}
                      placeholder="e.g., Royal Wedding Package"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      value={customizations.price || ''}
                      onChange={(e) => setCustomizations({ ...customizations, price: e.target.value })}
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <select
                      value={customizations.currency || 'THB'}
                      onChange={(e) => setCustomizations({ ...customizations, currency: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="THB">THB - Thai Baht</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="SGD">SGD - Singapore Dollar</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Customizable Fields */}
              {selectedTemplate.customizableFields.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <IconPalette className="w-5 h-5 text-pink-600" />
                    Customize Content
                  </h3>

                  {selectedTemplate.customizableFields.map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={customizations[field] || ''}
                        onChange={(e) => setCustomizations({ ...customizations, [field]: e.target.value })}
                        placeholder={`Enter ${field.toLowerCase()}...`}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Theme Colors */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <IconPalette className="w-5 h-5 text-pink-600" />
                  Theme Colors
                </h3>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setThemeColors(preset.colors)}
                      className={`p-2 rounded-xl border-2 transition-all ${
                        themeColors.join(',') === preset.colors.join(',')
                          ? 'border-pink-500 ring-2 ring-pink-200 dark:ring-pink-800'
                          : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700'
                      }`}
                    >
                      <div className="flex gap-1 h-8">
                        {preset.colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-l-lg"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                        {preset.name}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 items-center">
                  {themeColors.map((color, index) => (
                    <div key={index} className="flex-1">
                      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Color {index + 1}
                      </label>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          const newColors = [...themeColors];
                          newColors[index] = e.target.value;
                          setThemeColors(newColors);
                        }}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={() => handleGenerate({
                  templateId: selectedTemplate.id,
                  vendorName: customizations.vendorName || '',
                  packageName: customizations.packageName || '',
                  price: Number(customizations.price) || 0,
                  currency: customizations.currency || 'THB',
                  ritualType: selectedTemplate.ritualType,
                  customizations,
                  themeColors
                })}
                disabled={isGenerating || !customizations.vendorName || !customizations.packageName}
                className="w-full py-4 px-6 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-xl font-semibold hover:from-pink-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <IconRefresh className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <IconSparkles className="w-5 h-5" />
                    <span>Generate Share Image</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generated Image Preview */}
        <AnimatePresence>
          {generatedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="border-2 border-pink-200 dark:border-pink-800 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-900/20 dark:to-orange-900/20 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <IconCheck className="w-5 h-5 text-green-600" />
                    Generated Image Ready!
                  </h3>
                </div>
                <div className="p-4">
                  <img
                    src={generatedImage}
                    alt="Generated share image"
                    className="w-full rounded-xl"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <IconDownload className="w-5 h-5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-xl font-semibold hover:from-pink-700 hover:to-orange-700 transition-colors flex items-center justify-center gap-2"
                >
                  <IconShare className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => {
                    setGeneratedImage(null);
                    setCustomizations({});
                  }}
                  className="py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShareModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="bg-gradient-to-r from-pink-600 to-orange-600 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <IconSocial className="w-6 h-6" />
                    Share Image
                  </h2>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <IconX className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Share your promotional image on social media
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <IconBrandFacebook className="w-6 h-6" />
                    <span>Facebook</span>
                  </button>

                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <IconBrandTwitter className="w-6 h-6" />
                    <span>Twitter</span>
                  </button>

                  <button
                    onClick={() => handleShare('line')}
                    className="p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <IconBrandLine className="w-6 h-6" />
                    <span>LINE</span>
                  </button>

                  <button
                    onClick={() => handleShare('copy')}
                    className="p-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedLink ? (
                      <>
                        <IconCheck className="w-6 h-6" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <IconCopy className="w-6 h-6" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
