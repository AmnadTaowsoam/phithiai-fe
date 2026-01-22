export type PriceDataPoint = {
  date: Date;
  price: number;
  predictedPrice: number;
  confidence: number;
};

export type RitualPhase = {
  id: string;
  name: string;
  description: string;
  time: string;
  icon: string;
};

export type MemoryPhoto = {
  id: string;
  url: string;
  thumbnail: string;
  ritualPhaseId: string;
  timestamp: Date;
  caption?: string;
  faces?: Array<{
    id: string;
    x: number;
    y: number;
    confidence: number;
  }>;
  isHighlight?: boolean;
};

export type MemoryBook = {
  id: string;
  title: string;
  ceremonyType: 'wedding' | 'ordination' | 'funeral' | 'merit';
  date: Date;
  location: string;
  ritualPhases: RitualPhase[];
  photos: MemoryPhoto[];
  coverPhoto: string;
  aiGenerated?: {
    summary: string;
    highlights: string[];
    musicSuggestions: string[];
  };
};
