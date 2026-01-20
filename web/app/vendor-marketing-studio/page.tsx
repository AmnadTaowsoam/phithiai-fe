'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconWriting,
  IconChartBar,
  IconPhoto,
  IconDashboard,
  IconMenu2,
  IconX,
  IconSparkles,
  IconArrowRight
} from '@tabler/icons-react';
import AICopywriter from '../../components/vendor-marketing-studio/AICopywriter';
import MarketIntelligence from '../../components/vendor-marketing-studio/MarketIntelligence';
import ViralShareKit from '../../components/vendor-marketing-studio/ViralShareKit';
import {
  AICopywriterRequest,
  AICopywriterResponse,
  MarketIntelligenceData,
  MarketingInsight,
  ViralShareTemplate,
  ViralShareRequest
} from '../../components/vendor-marketing-studio/types';

type TabType = 'dashboard' | 'copywriter' | 'intelligence' | 'share-kit';

export default function VendorMarketingStudioPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [marketData, setMarketData] = useState<MarketIntelligenceData | null>(null);
  const [insights, setInsights] = useState<MarketingInsight[]>([]);
  const [templates, setTemplates] = useState<ViralShareTemplate[]>([]);

  // Mock data initialization
  useEffect(() => {
    // Initialize mock market data
    setMarketData({
      vendorId: 'v1',
      vendorName: 'Royal Thai Cuisine',
      category: 'Catering',
      currency: 'THB',
      averageRegionalPrice: 75000,
      vendorPrice: 85000,
      pricePosition: 'above',
      marketShare: 15,
      competitorCount: 8,
      topPerformingFeatures: [
        'Premium Ingredients',
        'Custom Menu Design',
        'Professional Service',
        'Halal Certified',
        'Allergy-Friendly Options'
      ],
      priceHistory: Array.from({ length: 12 }, (_, i) => ({
        date: new Date(2024, i, 1),
        price: 80000 + (i * 500),
        averagePrice: 75000 + (i * 200)
      })),
      demandTrend: 'rising',
      seasonality: [
        { month: 'January', demandLevel: 60, averagePrice: 72000 },
        { month: 'February', demandLevel: 70, averagePrice: 74000 },
        { month: 'March', demandLevel: 80, averagePrice: 76000 },
        { month: 'April', demandLevel: 85, averagePrice: 78000 },
        { month: 'May', demandLevel: 90, averagePrice: 80000 },
        { month: 'June', demandLevel: 95, averagePrice: 82000 },
        { month: 'July', demandLevel: 85, averagePrice: 80000 },
        { month: 'August', demandLevel: 75, averagePrice: 78000 },
        { month: 'September', demandLevel: 80, averagePrice: 79000 },
        { month: 'October', demandLevel: 85, averagePrice: 81000 },
        { month: 'November', demandLevel: 90, averagePrice: 83000 },
        { month: 'December', demandLevel: 95, averagePrice: 85000 }
      ]
    });

    // Initialize mock insights
    setInsights([
      {
        id: 'i1',
        type: 'price',
        severity: 'warning',
        title: 'Price Above Regional Average',
        description: 'Your pricing is 13% higher than the regional average for catering services.',
        actionable: 'Consider highlighting premium features or offering tiered packages to justify the premium pricing.',
        impact: 'high'
      },
      {
        id: 'i2',
        type: 'content',
        severity: 'success',
        title: 'Strong Feature Portfolio',
        description: 'Your top 5 features align with market demand trends.',
        actionable: 'Leverage these features in your marketing copy and promotional materials.',
        impact: 'medium'
      },
      {
        id: 'i3',
        type: 'timing',
        severity: 'info',
        title: 'Peak Season Approaching',
        description: 'Demand is expected to peak in June and December.',
        actionable: 'Increase marketing spend and promotional activities 2 months before peak seasons.',
        impact: 'high'
      },
      {
        id: 'i4',
        type: 'feature',
        severity: 'info',
        title: 'Consider Adding Live Entertainment',
        description: 'Competitors offering live entertainment packages show 20% higher conversion rates.',
        actionable: 'Partner with local entertainers to create bundled packages.',
        impact: 'medium'
      }
    ]);

    // Initialize mock templates
    setTemplates([
      {
        id: 't1',
        ritualType: 'wedding',
        templateName: 'Elegant Wedding',
        previewImage: '/templates/wedding-elegant.jpg',
        customizableFields: ['Tagline', 'Special Offer', 'Contact Info']
      },
      {
        id: 't2',
        ritualType: 'wedding',
        templateName: 'Modern Minimalist',
        previewImage: '/templates/wedding-modern.jpg',
        customizableFields: ['Tagline', 'Price Highlight', 'Contact Info']
      },
      {
        id: 't3',
        ritualType: 'ordination',
        templateName: 'Traditional Ordination',
        previewImage: '/templates/ordination-traditional.jpg',
        customizableFields: ['Blessing Message', 'Menu Highlights', 'Contact Info']
      },
      {
        id: 't4',
        ritualType: 'funeral',
        templateName: 'Respectful Tribute',
        previewImage: '/templates/funeral-respectful.jpg',
        customizableFields: ['Memorial Message', 'Service Details', 'Contact Info']
      },
      {
        id: 't5',
        ritualType: 'annual-merit',
        templateName: 'Merit Celebration',
        previewImage: '/templates/merit-celebration.jpg',
        customizableFields: ['Merit Message', 'Offering Details', 'Contact Info']
      },
      {
        id: 't6',
        ritualType: 'corporate',
        templateName: 'Corporate Excellence',
        previewImage: '/templates/corporate-excellence.jpg',
        customizableFields: ['Company Message', 'Service Highlights', 'Contact Info']
      }
    ]);
  }, []);

  const handleGenerateCopy = async (request: AICopywriterRequest): Promise<AICopywriterResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      generatedContent: `Transform your special day into an unforgettable culinary journey with our ${request.packageName}. 

Crafted with passion and precision, our premium catering service brings the authentic flavors of Thailand to your ${request.ritualType} celebration. From traditional recipes passed down through generations to innovative fusion creations, every dish tells a story.

${request.keyFeatures.map((feature, index) => `${index + 1}. ${feature}`).join('\n')}

Perfectly suited for ${request.targetAudience}, our team of expert chefs and dedicated staff ensure seamless service from preparation to presentation. Let us handle the culinary details while you focus on creating beautiful memories.

Book now and experience the difference that premium, authentic Thai catering can make for your special occasion.`,
      alternativeVersions: [
        `Elevate your ${request.ritualType} with our ${request.packageName}. 

Experience the art of Thai cuisine at its finest. Our award-winning chefs combine traditional techniques with modern presentation to create dishes that delight both the eyes and the palate.

What's Included:
${request.keyFeatures.map(f => `✓ ${f}`).join('\n')}

Tailored for ${request.targetAudience}, we bring restaurant-quality dining to your venue. With our commitment to excellence, your guests will be talking about the food long after the celebration ends.`,
        `Make your ${request.ritualType} truly memorable with our ${request.packageName}.

At the heart of every great celebration lies exceptional food. Our catering service delivers the authentic taste of Thailand, prepared with the freshest ingredients and served with genuine Thai hospitality.

Our Premium Offerings:
${request.keyFeatures.map(f => `• ${f}`).join('\n')}

Designed for ${request.targetAudience}, we understand that every detail matters. From initial consultation to final cleanup, our team ensures a flawless catering experience that exceeds expectations.`
      ],
      suggestions: [
        'Add customer testimonials to build trust and credibility',
        'Include dietary accommodation options (vegetarian, gluten-free, halal)',
        'Mention any awards or certifications your business has received',
        'Highlight your team\'s experience and years in the industry',
        'Consider adding a limited-time offer to create urgency'
      ],
      estimatedConversionScore: 87
    };
  };

  const handleGenerateImage = async (request: ViralShareRequest): Promise<string> => {
    // Simulate API call - in production, this would call an image generation service
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Return a placeholder image URL
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMWUxYjRiIj5HZW5lcmF0ZWQgU2hhcmUgSW1hZ2U8L3RleHQ+PC9zdmc+';
  };

  const handleDownloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.click();
  };

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: IconDashboard },
    { id: 'copywriter' as TabType, label: 'AI Copywriter', icon: IconWriting },
    { id: 'intelligence' as TabType, label: 'Market Intelligence', icon: IconChartBar },
    { id: 'share-kit' as TabType, label: 'Viral Share Kit', icon: IconPhoto }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <IconSparkles className="w-6 h-6 text-white" />
                </div>
                Vendor AI Marketing Studio
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Empower your business with AI-powered marketing tools
              </p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {mobileMenuOpen ? (
                <IconX className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <IconMenu2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex lg:space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Welcome Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
              >
                <h2 className="text-2xl font-bold mb-2">Welcome to Your AI Marketing Studio</h2>
                <p className="text-purple-100 mb-6">
                  Leverage AI-powered tools to optimize your marketing, understand your market position, and create stunning promotional content.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="text-3xl font-bold">87%</div>
                    <div className="text-purple-100 text-sm">Avg. Conversion Score</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="text-3xl font-bold">15%</div>
                    <div className="text-purple-100 text-sm">Market Share</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="text-3xl font-bold">4</div>
                    <div className="text-purple-100 text-sm">Active Insights</div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tabs.slice(1).map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center mb-4">
                      <tab.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{tab.label}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get started</p>
                    <div className="mt-2 text-purple-600 dark:text-purple-400">
                      <IconArrowRight className="w-5 h-5" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Recent Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent AI Insights</h3>
                <div className="space-y-3">
                  {insights.slice(0, 3).map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-4 border-l-4 rounded-r-xl ${
                        insight.severity === 'success'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : insight.severity === 'warning'
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {insight.actionable}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'copywriter' && (
            <motion.div
              key="copywriter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <AICopywriter onRequestGenerate={handleGenerateCopy} />
            </motion.div>
          )}

          {activeTab === 'intelligence' && marketData && (
            <motion.div
              key="intelligence"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <MarketIntelligence data={marketData} insights={insights} />
            </motion.div>
          )}

          {activeTab === 'share-kit' && (
            <motion.div
              key="share-kit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ViralShareKit
                templates={templates}
                onGenerateImage={handleGenerateImage}
                onDownloadImage={handleDownloadImage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
