'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import type { RitualPhase, MemoryPhoto } from './types';

interface MemoryFiltersProps {
  phases: RitualPhase[];
  selectedPhase: string | null;
  onSelectPhase: (phaseId: string | null) => void;
  onClose: () => void;
}

export function MemoryFilters({ phases, selectedPhase, onSelectPhase, onClose }: MemoryFiltersProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Filter by Ritual Phase
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <IconX className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* All Photos Option */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => onSelectPhase(null)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                selectedPhase === null
                  ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  All Photos
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View all {phases.reduce((sum, p) => sum + 1, 0)} photos
                </p>
              </div>
            </motion.button>

            {/* Phase Filters */}
            <div className="space-y-3 mt-4">
              {phases.map((phase) => {
                const phasePhotos = phases.filter(p => p.ritualPhaseId === phase.id).length;
                const isSelected = selectedPhase === phase.id;

                return (
                  <motion.button
                    key={phase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    onClick={() => onSelectPhase(phase.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                        : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-2xl">{phase.icon}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={`font-semibold ${
                        isSelected
                          ? 'text-purple-700 dark:text-purple-300'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {phase.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {phase.time}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          isSelected
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}>
                          {phasePhotos} photos
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Close Filters
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
