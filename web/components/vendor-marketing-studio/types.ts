// Vendor AI Marketing Studio Types

export type CopywritingTone = 'professional' | 'friendly' | 'luxury' | 'playful' | 'traditional' | 'modern';
export type RitualType = 'wedding' | 'ordination' | 'funeral' | 'annual-merit' | 'house-warming' | 'birthday' | 'corporate';
export type ContentStyle = 'detailed' | 'concise' | 'storytelling' | 'feature-focused';

export interface AICopywriterRequest {
  packageName: string;
  price: number;
  currency: string;
  ritualType: RitualType;
  keyFeatures: string[];
  targetAudience: string;
  tone: CopywritingTone;
  style: ContentStyle;
  language: string;
}

export interface AICopywriterResponse {
  generatedContent: string;
  alternativeVersions: string[];
  suggestions: string[];
  estimatedConversionScore: number;
}

export interface MarketIntelligenceData {
  vendorId: string;
  vendorName: string;
  category: string;
  currency: string;
  averageRegionalPrice: number;
  vendorPrice: number;
  pricePosition: 'below' | 'average' | 'above';
  marketShare: number;
  competitorCount: number;
  topPerformingFeatures: string[];
  priceHistory: PriceHistoryPoint[];
  demandTrend: 'rising' | 'stable' | 'declining';
  seasonality: SeasonalityData[];
}

export interface PriceHistoryPoint {
  date: Date;
  price: number;
  averagePrice: number;
}

export interface SeasonalityData {
  month: string;
  demandLevel: number; // 0-100
  averagePrice: number;
}

export interface ViralShareTemplate {
  id: string;
  ritualType: RitualType;
  templateName: string;
  previewImage: string;
  customizableFields: string[];
  generatedImage?: string;
}

export interface ViralShareRequest {
  templateId: string;
  vendorName: string;
  packageName: string;
  price: number;
  currency: string;
  ritualType: RitualType;
  customizations: Record<string, string>;
  themeColors?: string[];
}

export interface MarketingInsight {
  id: string;
  type: 'price' | 'content' | 'timing' | 'feature';
  severity: 'info' | 'warning' | 'success';
  title: string;
  description: string;
  actionable: string;
  impact: 'low' | 'medium' | 'high';
}
