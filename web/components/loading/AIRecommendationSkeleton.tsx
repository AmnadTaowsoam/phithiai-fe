'use client';

import { motion } from 'framer-motion';

export function AIRecommendationSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20"
          />
          <div className="space-y-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              className="h-5 w-48 bg-gray-200 rounded"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="h-4 w-32 bg-gray-200 rounded"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <motion.div className="h-4 w-20 bg-gray-200 rounded" />
                <motion.div className="h-8 w-24 bg-gray-200 rounded" />
                <motion.div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.2 }}
                className="w-12 h-12 rounded-lg bg-gray-200"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vendor Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="relative h-56 w-full bg-gray-100">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.1 }}
                className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-100/50 to-transparent"
              />
              <div className="absolute left-5 top-5 flex gap-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.2 }}
                  className="h-6 w-16 rounded-full bg-gray-200"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.3 }}
                  className="h-6 w-16 rounded-full bg-gray-200"
                />
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.4 }}
                    className="h-5 w-3/4 bg-gray-200 rounded"
                  />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.5 }}
                    className="h-4 w-1/2 bg-gray-200 rounded"
                  />
                </div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.6 }}
                  className="w-12 h-8 rounded-full bg-gray-200"
                />
              </div>

              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((j) => (
                  <motion.div
                    key={j}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + j * 0.1 + 0.7 }}
                    className="h-6 w-16 rounded-full bg-gray-100"
                  />
                ))}
              </div>

              {/* Footer Skeleton */}
              <div className="flex items-center justify-between mt-4">
                <div className="space-y-1">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 1 }}
                    className="h-4 w-24 bg-gray-200 rounded"
                  />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 1.1 }}
                    className="h-4 w-20 bg-gray-200 rounded"
                  />
                </div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 1.2 }}
                  className="h-8 w-20 bg-gray-200 rounded"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loading Progress Indicator */}
      <div className="flex items-center justify-center gap-3 py-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-6 h-6 rounded-full border-2 border-purple-500 border-t-transparent"
        />
        <div className="text-sm text-gray-600">
          Finding the best vendors for you...
        </div>
      </div>
    </div>
  );
}
