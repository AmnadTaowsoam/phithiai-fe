'use client';

import { motion } from 'framer-motion';
import {
  IconBrain,
  IconTrendingUp,
  IconStar,
  IconCrown,
  IconInfoCircle
} from '@tabler/icons-react';

export interface PersonalizationLevel {
  level: 'basic' | 'moderate' | 'high' | 'expert';
  score: number; // 0-100
  factors: {
    profileCompleteness: number;
    preferenceHistory: number;
    interactionCount: number;
    feedbackProvided: number;
  };
  nextLevel?: {
    level: string;
    threshold: number;
    benefits: string[];
  };
}

export function PersonalizationLevel({ personalization }: { personalization: PersonalizationLevel }) {
  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'expert':
        return {
          icon: IconCrown,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          borderColor: 'border-purple-300',
          gradient: 'from-purple-500 to-pink-500',
          label: 'Expert',
          description: 'AI knows your preferences perfectly'
        };
      case 'high':
        return {
          icon: IconStar,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-300',
          gradient: 'from-blue-500 to-cyan-500',
          label: 'High',
          description: 'AI has strong understanding of your needs'
        };
      case 'moderate':
        return {
          icon: IconTrendingUp,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-300',
          gradient: 'from-green-500 to-teal-500',
          label: 'Moderate',
          description: 'AI is learning your preferences'
        };
      default:
        return {
          icon: IconBrain,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-300',
          gradient: 'from-gray-500 to-gray-600',
          label: 'Basic',
          description: 'AI is getting to know you'
        };
    }
  };

  const config = getLevelConfig(personalization.level);
  const LevelIcon = config.icon;

  return (
    <div className={`rounded-xl border-2 ${config.borderColor} overflow-hidden`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.gradient} px-5 py-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/20`}>
              <LevelIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Personalization Level</h3>
              <p className="text-sm text-white/80">{config.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{personalization.score}%</div>
            <div className="text-sm text-white/80">{config.label}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 py-4 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Personalization Progress</span>
          <span className="text-sm text-gray-500">{personalization.score}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${personalization.score}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
          />
        </div>
      </div>

      {/* Factors */}
      <div className="px-5 py-4 bg-gray-50 space-y-3">
        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <IconInfoCircle className="w-4 h-4" />
          Contributing Factors
        </h4>

        {/* Profile Completeness */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Profile Completeness</span>
            <span className="font-semibold text-gray-900">{personalization.factors.profileCompleteness}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${personalization.factors.profileCompleteness}%` }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Preference History */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Preference History</span>
            <span className="font-semibold text-gray-900">{personalization.factors.preferenceHistory}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${personalization.factors.preferenceHistory}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full bg-purple-500 rounded-full"
            />
          </div>
        </div>

        {/* Interaction Count */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Platform Interactions</span>
            <span className="font-semibold text-gray-900">{personalization.factors.interactionCount}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${personalization.factors.interactionCount}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full bg-green-500 rounded-full"
            />
          </div>
        </div>

        {/* Feedback Provided */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Feedback Provided</span>
            <span className="font-semibold text-gray-900">{personalization.factors.feedbackProvided}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${personalization.factors.feedbackProvided}%` }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-full bg-pink-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Next Level */}
      {personalization.nextLevel && (
        <div className="px-5 py-4 bg-white border-t border-gray-200">
          <div className="flex items-start gap-3">
            <IconTrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900">
                Next Level: {personalization.nextLevel.level}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                Reach {personalization.nextLevel.threshold}% to unlock better recommendations
              </p>
              <ul className="mt-2 space-y-1">
                {personalization.nextLevel.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-600">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
