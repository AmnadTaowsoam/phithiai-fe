'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconBrain,
  IconInfoCircle,
  IconCheck,
  IconX,
  IconTrendingUp,
  IconPalette,
  IconCoin,
  IconStar
} from '@tabler/icons-react';

export interface AIMatchingFactors {
  overallScore: number; // 0-100
  priceMatch: number; // 0-100
  ritualExpertise: number; // 0-100
  colorPaletteMatch: number; // 0-100
  availabilityMatch: number; // 0-100
  locationMatch: number; // 0-100
  reviewScore: number; // 0-100
}

export interface AIInsightProps {
  matchingFactors: AIMatchingFactors;
  vendorName: string;
  eventType?: string;
  budget?: number;
  preferredColors?: string[];
  ritualType?: string;
}

export function AIInsightBadge({
  matchingFactors,
  vendorName,
  eventType = 'Wedding',
  budget,
  preferredColors = [],
  ritualType
}: AIInsightProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <IconCheck className="w-4 h-4" />;
    if (score >= 75) return <IconTrendingUp className="w-4 h-4" />;
    return <IconInfoCircle className="w-4 h-4" />;
  };

  const getMatchLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Great';
    if (score >= 60) return 'Good';
    return 'Fair';
  };

  return (
    <div className="relative">
      {/* AI Badge */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium hover:border-purple-400/50 transition-all"
      >
        <IconBrain className="w-3.5 h-3.5" />
        <span>{matchingFactors.overallScore}% Match</span>
        <IconInfoCircle className="w-3 h-3 opacity-70" />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowTooltip(false)}
            />

            {/* Tooltip Content */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 bottom-full left-0 mb-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconBrain className="w-5 h-5" />
                    <span className="font-semibold">AI Recommendation</span>
                  </div>
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <IconX className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-purple-100 mt-1">
                  {vendorName} matches your {eventType} needs
                </p>
              </div>

              {/* Overall Score */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Overall Match</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(matchingFactors.overallScore)}`}>
                      {getMatchLabel(matchingFactors.overallScore)}
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      {matchingFactors.overallScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Matching Factors */}
              <div className="p-4 space-y-3">
                {/* Price Match */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IconCoin className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Price Range</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getScoreIcon(matchingFactors.priceMatch)}
                      <span className="font-semibold text-gray-900">{matchingFactors.priceMatch}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${matchingFactors.priceMatch}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    />
                  </div>
                  {budget && (
                    <p className="text-xs text-gray-500">
                      Fits within your budget of {budget.toLocaleString('th-TH')} THB
                    </p>
                  )}
                </div>

                {/* Ritual Expertise */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IconStar className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">Ritual Expertise</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getScoreIcon(matchingFactors.ritualExpertise)}
                      <span className="font-semibold text-gray-900">{matchingFactors.ritualExpertise}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${matchingFactors.ritualExpertise}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                    />
                  </div>
                  {ritualType && (
                    <p className="text-xs text-gray-500">
                      Specialized in {ritualType} ceremonies
                    </p>
                  )}
                </div>

                {/* Color Palette Match */}
                {preferredColors.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <IconPalette className="w-4 h-4 text-pink-600" />
                        <span className="font-medium">Color Palette</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getScoreIcon(matchingFactors.colorPaletteMatch)}
                        <span className="font-semibold text-gray-900">{matchingFactors.colorPaletteMatch}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${matchingFactors.colorPaletteMatch}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
                      />
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {preferredColors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {preferredColors.join(', ')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Availability Match */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IconCheck className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Availability</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getScoreIcon(matchingFactors.availabilityMatch)}
                      <span className="font-semibold text-gray-900">{matchingFactors.availabilityMatch}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${matchingFactors.availabilityMatch}%` }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    />
                  </div>
                </div>

                {/* Location Match */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IconTrendingUp className="w-4 h-4 text-orange-600" />
                      <span className="font-medium">Location</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getScoreIcon(matchingFactors.locationMatch)}
                      <span className="font-semibold text-gray-900">{matchingFactors.locationMatch}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${matchingFactors.locationMatch}%` }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                    />
                  </div>
                </div>

                {/* Review Score */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IconStar className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium">Reviews</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getScoreIcon(matchingFactors.reviewScore)}
                      <span className="font-semibold text-gray-900">{matchingFactors.reviewScore}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${matchingFactors.reviewScore}%` }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  AI-powered recommendations based on your preferences and vendor performance
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
