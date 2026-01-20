/**
 * Types for Phithiai Pro Subscription Dashboard
 */

export type SubscriptionPlanType = 'starter' | 'professional' | 'business' | 'enterprise';

export interface SubscriptionPlan {
  id: SubscriptionPlanType;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  yearlyDiscount?: number;
  features: PlanFeature[];
  popular?: boolean;
  icon: string;
  color: string;
}

export interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
  description?: string;
  limit?: number;
}

export interface Subscription {
  id: string;
  vendorId: string;
  plan: SubscriptionPlanType;
  status: 'active' | 'past_due' | 'canceled' | 'unpaid' | 'trialing';
  startDate: Date;
  endDate?: Date;
  nextBillingDate: Date;
  autoRenew: boolean;
  billingCycle: 'monthly' | 'yearly';
  paymentMethod: PaymentMethod;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'promptpay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
  accountNumber?: string;
  isDefault: boolean;
}

export interface SubscriptionUsage {
  plan: SubscriptionPlanType;
  features: FeatureUsage[];
  period: {
    start: Date;
    end: Date;
  };
  resetDate: Date;
}

export interface FeatureUsage {
  featureId: string;
  featureName: string;
  used: number;
  limit: number;
  percentage: number;
  resetFrequency: 'daily' | 'monthly' | 'yearly';
}

export interface BillingInvoice {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'void';
  date: Date;
  dueDate: Date;
  paidDate?: Date;
  downloadUrl?: string;
}

export interface PremiumBadge {
  id: string;
  type: 'pro' | 'verified' | 'top-rated' | 'featured';
  name: string;
  description: string;
  icon: string;
  color: string;
  requirements: string[];
}

export interface VendorListing {
  id: string;
  vendorId: string;
  name: string;
  category: string;
  badges: PremiumBadge[];
  rating: number;
  reviewCount: number;
  isPro: boolean;
  subscriptionTier?: SubscriptionPlanType;
}
