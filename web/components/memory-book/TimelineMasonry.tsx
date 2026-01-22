'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconZoomIn } from '@tabler/icons-react';
import { MemoryHighlight } from './MemoryHighlight';
import type { RitualPhase, MemoryPhoto } from './types';

interface TimelineMasonryProps {
  phases: RitualPhase[];
  photos: MemoryPhoto[];
  onPhotoClick: (photo: MemoryPhoto) => void;
}

export function TimelineMasonry({ phases, photos, onPhotoClick }: TimelineMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<MemoryPhoto[][]>([[], [], []]);

  // Masonry layout calculation
  useEffect(() => {
    const calculateColumns = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const numColumns = containerWidth < 768 ? 1 : containerWidth < 1024 ? 2 : 3;
      
      const newColumns: MemoryPhoto[][] = Array.from({ length: numColumns }, () => []);
      
      photos.forEach((photo) => {
        // Find column with minimum height
        const columnHeights = newColumns.map((col) => 
          col.reduce((sum, p) => sum + (p.thumbnail ? 200 : 0), 0)
        );
        const minColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        newColumns[minColumnIndex].push(photo);
      });

      setColumns(newColumns);
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, [photos]);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {column.map((photo) => (
            <MemoryHighlight key={photo.id} photo={photo} onClick={onPhotoClick} />
          ))}
        </div>
      ))}
    </div>
  );
}
