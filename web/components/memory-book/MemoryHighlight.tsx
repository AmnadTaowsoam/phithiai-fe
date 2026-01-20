'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconHeart, IconZoomIn } from '@tabler/icons-react';
import type { MemoryPhoto } from './types';

interface MemoryHighlightProps {
  photo: MemoryPhoto;
  onClick: (photo: MemoryPhoto) => void;
}

export function MemoryHighlight({ photo, onClick }: MemoryHighlightProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(photo)}
      className={`relative group cursor-pointer overflow-hidden rounded-xl ${
        photo.isHighlight ? 'ring-4 ring-purple-500' : ''
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={photo.thumbnail}
          alt={photo.caption || 'Memory photo'}
          className="w-full h-full object-cover transition-transform duration-300"
        />

        {/* Face Detection Overlay */}
        {photo.faces && photo.faces.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {photo.faces.map((face) => (
              <motion.div
                key={face.id}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isZoomed ? 1.3 : 1,
                  opacity: isHovered || isZoomed ? 1 : 0.3
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
                style={{
                  left: `${face.x}%`,
                  top: `${face.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-16 h-16 rounded-full border-4 border-white/50 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <IconHeart className="w-8 h-8 text-pink-500" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Zoom Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center"
        >
          <IconZoomIn className="w-10 h-10 text-white" />
        </motion.div>

        {/* Highlight Badge */}
        {photo.isHighlight && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
          >
            <IconHeart className="w-3 h-3" />
            Highlight
          </motion.div>
        )}
      </div>

      {/* Caption */}
      {photo.caption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-white dark:bg-gray-800"
        >
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {photo.caption}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
