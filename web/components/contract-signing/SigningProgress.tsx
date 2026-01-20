'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconClock, IconAlertCircle } from '@tabler/icons-react';
import type { Contract } from './types';

interface SigningProgressProps {
  contract: Contract;
  signatures: Record<string, string>;
  currentMarkerIndex: number;
}

export function SigningProgress({ contract, signatures, currentMarkerIndex }: SigningProgressProps) {
  const completedMarkers = Object.keys(signatures).length;
  const totalRequiredMarkers = contract.markers.filter(m => m.required).length;
  const progress = totalRequiredMarkers > 0 ? (completedMarkers / totalRequiredMarkers) * 100 : 0;
  
  const completedParties = contract.parties.filter(p => p.status === 'signed').length;
  const totalParties = contract.parties.length;

  return (
    <div className="flex items-center gap-4">
      {/* Progress Circle */}
      <div className="relative w-16 h-16">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Status Info */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-2">
          <IconCheck className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {completedMarkers}/{totalRequiredMarkers} signed
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          {completedParties === totalParties ? (
            <IconCheck className="w-4 h-4 text-green-500" />
          ) : (
            <IconClock className="w-4 h-4 text-yellow-500" />
          )}
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {completedParties}/{totalParties} parties
          </span>
        </div>
      </div>

      {/* Mobile Status */}
      <div className="sm:hidden">
        <div className="flex items-center gap-2">
          {progress === 100 ? (
            <IconCheck className="w-5 h-5 text-green-500" />
          ) : (
            <IconAlertCircle className="w-5 h-5 text-purple-500" />
          )}
        </div>
      </div>
    </div>
  );
}
