/**
 * Types for Vendor Earnings Calculator & Transparent Ledger
 */

export type CommissionTier = 'standard' | 'silver' | 'gold' | 'platinum' | 'pro';

export interface CommissionStructure {
  tier: CommissionTier;
  rate: number; // Percentage
  monthlyVolumeThreshold: number;
  benefits: string[];
  icon: string;
}

export interface EarningsCalculation {
  grossRevenue: number;
  commissionRate: number;
  commissionAmount: number;
  netEarnings: number;
  platformFee: number;
  paymentProcessingFee: number;
  taxWithholding?: number;
  finalPayout: number;
}

export interface PayoutRecord {
  id: string;
  period: {
    start: Date;
    end: Date;
  };
  grossRevenue: number;
  commissionRate: number;
  commissionAmount: number;
  platformFee: number;
  processingFee: number;
  netPayout: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paidDate?: Date;
  transactionId?: string;
  paymentMethod: string;
}

export interface EarningsBreakdown {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  trendValue?: number;
}

export interface RevenueStream {
  id: string;
  name: string;
  icon: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface EarningsProjection {
  month: string;
  projected: number;
  actual?: number;
  variance?: number;
}

export interface VendorStats {
  totalEarnings: number;
  totalBookings: number;
  averageRevenuePerBooking: number;
  commissionTier: CommissionTier;
  nextTierProgress: number;
  nextTierThreshold: number;
  currentTierVolume: number;
  totalPayouts: number;
  pendingPayouts: number;
}

export interface CommissionTooltip {
  tier: CommissionTier;
  rate: number;
  description: string;
  requirements: string[];
  nextTier?: {
    tier: CommissionTier;
    threshold: number;
    additionalSavings: number;
  };
}

export interface LedgerEntry {
  id: string;
  date: Date;
  type: 'booking' | 'refund' | 'adjustment' | 'bonus' | 'penalty';
  description: string;
  amount: number;
  balance: number;
  category: string;
  reference?: string;
}

export interface PayoutSchedule {
  id: string;
  scheduledDate: Date;
  estimatedAmount: number;
  status: 'scheduled' | 'processing' | 'completed';
  paymentMethod: string;
}
