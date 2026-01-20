'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconBrandInstagram, IconBrandFacebook, IconShare, IconDownload } from '@tabler/icons-react';

interface SocialExportProps {
  onExport: (platform: 'instagram' | 'facebook') => void;
  isExporting: boolean;
}

export function SocialExport({ onExport, isExporting }: SocialExportProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <IconShare className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Share Your Memories
        </h2>
        <p className="text-purple-100 text-center">
          Export your AI-curated memory book to social media
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Instagram Story */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onExport('instagram')}
          disabled={isExporting}
          className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white p-6 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <IconBrandInstagram className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold mb-1">
                Instagram Story
              </h3>
              <p className="text-sm text-white/90">
                Create a 15-second story with your best memories
              </p>
            </div>
          </div>
        </motion.button>

        {/* Facebook Story */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onExport('facebook')}
          disabled={isExporting}
          className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white p-6 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <IconBrandFacebook className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold mb-1">
                Facebook Story
              </h3>
              <p className="text-sm text-white/90">
                Share your ceremony highlights with friends and family
              </p>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Download Option */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <button
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconDownload className="w-5 h-5" />
          <span className="font-medium">Download Full Album</span>
        </button>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-white/10 rounded-xl">
        <h4 className="font-semibold text-white mb-2">
          Tips for Best Results
        </h4>
        <ul className="text-sm text-white/80 space-y-1">
          <li>• Choose 3-5 of your best photos for each story</li>
          <li>• Add music or text overlays for context</li>
          <li>• Use trending hashtags like #ThaiWedding #Phithiai</li>
          <li>• Tag your vendors and guests</li>
          <li>• Stories disappear after 24 hours, share while fresh!</li>
        </ul>
      </div>
    </div>
  );
}
