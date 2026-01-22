'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconHeart, IconZoomIn, IconDownload, IconShare, IconFilter, IconLayoutGrid, IconList, IconX } from '@tabler/icons-react';
import { TimelineMasonry } from '../../components/memory-book/TimelineMasonry';
import { MemoryHighlight } from '../../components/memory-book/MemoryHighlight';
import { SocialExport } from '../../components/memory-book/SocialExport';
import { MemoryFilters } from '../../components/memory-book/MemoryFilters';
import type { RitualPhase, MemoryPhoto, MemoryBook } from '../../components/memory-book/types';

export default function MemoryBookPage() {
  const [memoryBook, setMemoryBook] = useState<MemoryBook | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [viewMode, setViewMode] = useState<'masonry' | 'timeline'>('masonry');
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Mock data - replace with API call
    setMemoryBook({
      id: 'MB-2024-001',
      title: 'Somchai & Naree - Thai Wedding Ceremony',
      ceremonyType: 'wedding',
      date: new Date('2024-01-15'),
      location: 'Grand Ballroom, Bangkok',
      ritualPhases: [
        { id: 'phase-1', name: 'Khan Mak Procession', description: 'Traditional groom procession', time: '09:00', icon: '🎊' },
        { id: 'phase-2', name: 'Rod Nam Sang', description: 'Water pouring ceremony', time: '10:00', icon: '💧' },
        { id: 'phase-3', name: 'Mon Son Pha', description: 'Blessing ceremony', time: '11:00', icon: '🙏' },
        { id: 'phase-4', name: 'Khan Maak', description: 'Veil placing ceremony', time: '12:00', icon: '👰' },
        { id: 'phase-5', name: 'Sin Phit', description: 'Ring exchange ceremony', time: '13:00', icon: '💍' },
        { id: 'phase-6', name: 'Phiti Mongkhon', description: 'Water blessing', time: '14:00', icon: '💦' },
      ],
      photos: [
        { id: 'photo-1', url: '/photos/wedding-1.jpg', thumbnail: '/photos/wedding-1-thumb.jpg', ritualPhaseId: 'phase-1', timestamp: new Date('2024-01-15T09:15:00'), caption: 'The groom arrives in traditional procession', faces: [{ id: 'face-1', x: 120, y: 80, confidence: 0.95 }], isHighlight: true },
        { id: 'photo-2', url: '/photos/wedding-2.jpg', thumbnail: '/photos/wedding-2-thumb.jpg', ritualPhaseId: 'phase-2', timestamp: new Date('2024-01-15T10:30:00'), caption: 'Water pouring moment', faces: [{ id: 'face-2', x: 200, y: 150, confidence: 0.92 }] },
        { id: 'photo-3', url: '/photos/wedding-3.jpg', thumbnail: '/photos/wedding-3-thumb.jpg', ritualPhaseId: 'phase-3', timestamp: new Date('2024-01-15T11:45:00'), caption: 'Blessing ceremony', faces: [{ id: 'face-3', x: 150, y: 100, confidence: 0.98 }], isHighlight: true },
        { id: 'photo-4', url: '/photos/wedding-4.jpg', thumbnail: '/photos/wedding-4-thumb.jpg', ritualPhaseId: 'phase-4', timestamp: new Date('2024-01-15T12:30:00'), caption: 'Veil placing ceremony' },
        { id: 'photo-5', url: '/photos/wedding-5.jpg', thumbnail: '/photos/wedding-5-thumb.jpg', ritualPhaseId: 'phase-5', timestamp: new Date('2024-01-15T13:15:00'), caption: 'Ring exchange', faces: [{ id: 'face-4', x: 180, y: 120, confidence: 0.96 }, { id: 'face-5', x: 300, y: 110, confidence: 0.94 }], isHighlight: true },
        { id: 'photo-6', url: '/photos/wedding-6.jpg', thumbnail: '/photos/wedding-6-thumb.jpg', ritualPhaseId: 'phase-6', timestamp: new Date('2024-01-15T14:30:00'), caption: 'Final water blessing' },
        { id: 'photo-7', url: '/photos/wedding-7.jpg', thumbnail: '/photos/wedding-7-thumb.jpg', ritualPhaseId: 'phase-1', timestamp: new Date('2024-01-15T09:30:00'), caption: 'Family gathering' },
        { id: 'photo-8', url: '/photos/wedding-8.jpg', thumbnail: '/photos/wedding-8-thumb.jpg', ritualPhaseId: 'phase-2', timestamp: new Date('2024-01-15T10:45:00'), caption: 'Elder participation' },
        { id: 'photo-9', url: '/photos/wedding-9.jpg', thumbnail: '/photos/wedding-9-thumb.jpg', ritualPhaseId: 'phase-3', timestamp: new Date('2024-01-15T11:45:00'), caption: 'Monks blessing' },
        { id: 'photo-10', url: '/photos/wedding-10.jpg', thumbnail: '/photos/wedding-10-thumb.jpg', ritualPhaseId: 'phase-4', timestamp: new Date('2024-01-15T12:30:00'), caption: 'Bride preparation' },
        { id: 'photo-11', url: '/photos/wedding-11.jpg', thumbnail: '/photos/wedding-11-thumb.jpg', ritualPhaseId: 'phase-5', timestamp: new Date('2024-01-15T13:15:00'), caption: 'Guests watching' },
        { id: 'photo-12', url: '/photos/wedding-12.jpg', thumbnail: '/photos/wedding-12-thumb.jpg', ritualPhaseId: 'phase-6', timestamp: new Date('2024-01-15T14:30:00'), caption: 'Celebration moment' },
      ],
      coverPhoto: '/photos/wedding-cover.jpg',
      aiGenerated: {
        summary: 'A beautiful traditional Thai wedding ceremony filled with joy, tradition, and family blessings. The day began with the Khan Mak procession, followed by the sacred Rod Nam Sang water pouring ceremony, and concluded with a meaningful ring exchange.',
        highlights: [
          'The emotional moment of water pouring',
          'Family gathering for blessing',
          'The exchange of rings between the couple',
          'Traditional music throughout the ceremony',
        ],
        musicSuggestions: [
          'Pleng Thai Classical',
          'Traditional Thai Wedding Music',
          'Peaceful instrumental pieces',
        ],
      },
    });
  }, []);

  const filteredPhotos = selectedPhase
    ? memoryBook?.photos.filter(p => p.ritualPhaseId === selectedPhase) || []
    : memoryBook?.photos || [];

  const handleExport = async (platform: 'instagram' | 'facebook') => {
    setIsExporting(true);
    try {
      // Simulate export - replace with actual export logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Export to social platform
      console.log(`Exporting to ${platform}...`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!memoryBook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading memory book...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${memoryBook.coverPhoto})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        </div>
        <div className="relative h-full flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {memoryBook.title}
              </h1>
              <p className="text-lg text-white/90 mb-4">
                {memoryBook.date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <IconHeart className="w-4 h-4 text-pink-400" />
                  AI-Curated Memory Book
                </span>
                <span>•</span>
                <span>{memoryBook.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Summary Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <IconHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                AI-Generated Summary
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {memoryBook.aiGenerated?.summary}
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Memory Highlights
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {memoryBook.aiGenerated?.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconHeart className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-sm text-purple-900 dark:text-purple-300">
                      {highlight}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Music Suggestions */}
          {memoryBook.aiGenerated?.musicSuggestions && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Suggested Music
              </h3>
              <div className="flex flex-wrap gap-2">
                {memoryBook.aiGenerated.musicSuggestions.map((music, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 rounded-full text-sm"
                  >
                    {music}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Ritual Phases Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ceremony Timeline
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'masonry'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <IconLayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <IconList className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <IconFilter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Phase Filters */}
        <AnimatePresence>
          {showFilters && (
            <MemoryFilters
              phases={memoryBook.ritualPhases}
              photos={memoryBook.photos}
              selectedPhase={selectedPhase}
              onSelectPhase={setSelectedPhase}
              onClose={() => setShowFilters(false)}
            />
          )}
        </AnimatePresence>

        {/* Content */}
        {viewMode === 'masonry' ? (
          <TimelineMasonry
            phases={memoryBook.ritualPhases}
            photos={filteredPhotos}
            onPhotoClick={setSelectedPhoto}
          />
        ) : (
          <div className="space-y-8">
            {memoryBook.ritualPhases.map((phase) => {
              const phasePhotos = filteredPhotos.filter(p => p.ritualPhaseId === phase.id);
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{phase.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold">{phase.name}</h3>
                        <p className="text-purple-100 text-sm">{phase.description}</p>
                      </div>
                      <span className="text-lg font-mono">{phase.time}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    {phasePhotos.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {phasePhotos.map((photo) => (
                          <MemoryHighlight
                            key={photo.id}
                            photo={photo}
                            onClick={() => setSelectedPhoto(photo)}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        No photos for this phase
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Social Export Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SocialExport
          onExport={handleExport}
          isExporting={isExporting}
        />
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <IconX className="w-6 h-6 text-white" />
                </button>
                
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || 'Memory photo'}
                  className="w-full h-auto"
                />
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedPhoto.caption}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span>
                      {selectedPhoto.timestamp.toLocaleString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {selectedPhoto.faces && selectedPhoto.faces.length > 0 && (
                      <span className="flex items-center gap-1">
                        <IconHeart className="w-4 h-4 text-pink-500" />
                        {selectedPhoto.faces.length} face(s) detected
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = selectedPhoto.url;
                        link.download = `memory-${selectedPhoto.id}.jpg`;
                        link.click();
                      }}
                      className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <IconDownload className="w-5 h-5" />
                      Download
                    </button>
                    <button
                      onClick={() => handleExport('instagram')}
                      disabled={isExporting}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <IconShare className="w-5 h-5" />
                      {isExporting ? 'Sharing...' : 'Share to Instagram'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
