'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconChevronDown, IconFileText, IconSignature } from '@tabler/icons-react';
import type { SigningMarker, Contract } from './types';

interface LegalReaderProps {
  contract: Contract;
  currentMarkerIndex: number;
  onMarkerClick: (index: number) => void;
}

export function LegalReader({ contract, currentMarkerIndex, onMarkerClick }: LegalReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll to current marker
  useEffect(() => {
    if (autoScroll && containerRef.current) {
      const currentMarker = contract.markers[currentMarkerIndex];
      if (currentMarker) {
        const scrollPercentage = currentMarker.position;
        const container = containerRef.current;
        const scrollPosition = (scrollPercentage / 100) * (container.scrollHeight - container.clientHeight);
        
        container.scrollTo({
          top: scrollPosition - 100, // Offset for better visibility
          behavior: 'smooth'
        });
      }
    }
  }, [currentMarkerIndex, contract.markers, autoScroll]);

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollPercentage = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
      
      // Find the nearest marker based on scroll position
      const nearestMarkerIndex = contract.markers.findIndex(
        (marker, index) => {
          const nextMarker = contract.markers[index + 1];
          if (nextMarker) {
            return scrollPercentage >= marker.position && scrollPercentage < nextMarker.position;
          }
          return scrollPercentage >= marker.position;
        }
      );

      if (nearestMarkerIndex !== -1 && nearestMarkerIndex !== currentMarkerIndex) {
        onMarkerClick(nearestMarkerIndex);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <IconFileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {contract.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {contract.markers.length} signing points
              </p>
            </div>
          </div>
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              autoScroll
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Auto-Scroll: {autoScroll ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {/* Document Content */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[70vh] overflow-y-auto p-6 md:p-10 scroll-smooth"
      >
        <div
          className="prose prose-sm md:prose-base max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: contract.content }}
        />

        {/* Signature Markers */}
        <div className="space-y-8 mt-8">
          {contract.markers.map((marker, index) => {
            const isCurrent = index === currentMarkerIndex;
            const party = contract.parties.find(p => p.id === marker.partyId);

            return (
              <motion.div
                key={marker.id}
                id={`marker-${marker.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border-2 transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-500 shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                }`}
              >
                {/* Marker Number Badge */}
                <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  isCurrent ? 'bg-purple-600' : 'bg-gray-400'
                }`}>
                  {index + 1}
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <IconSignature className={`w-5 h-5 ${isCurrent ? 'text-purple-600' : 'text-gray-400'}`} />
                      <h3 className={`font-semibold ${isCurrent ? 'text-purple-700 dark:text-purple-300' : 'text-gray-900 dark:text-white'}`}>
                        {marker.label}
                      </h3>
                      {marker.required && (
                        <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Signer: {party?.name} ({party?.role})
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Type: {marker.type}
                    </p>
                  </div>

                  {isCurrent && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center"
                    >
                      <IconChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                  )}
                </div>

                {/* Signature Placeholder */}
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <p className="text-center text-gray-400 dark:text-gray-500 text-sm">
                    {isCurrent ? 'Tap to sign here' : 'Signature will appear here'}
                  </p>
                </div>

                {/* Progress Indicator */}
                {isCurrent && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-2">
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentMarkerIndex / (contract.markers.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
          />
        </div>
      </div>
    </div>
  );
}
