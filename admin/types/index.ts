export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'buyer' | 'vendor' | 'admin';
  phone?: string;
  avatar?: string;
  status: 'active' | 'suspended' | 'deleted';
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  coverImage?: string;
  description: string;
  category: VendorCategory;
  zone: Zone;
  rating: number;
  reviewCount: number;
  verified: boolean;
  status: 'pending' | 'active' | 'suspended' | 'rejected';
  startingPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export type VendorCategory = 
  | 'venue'
  | 'photography'
  | 'catering'
  | 'decoration'
  | 'entertainment'
  | 'other';

export type Zone = 'bangkok' | 'central' | 'north' | 'northeast' | 'south';

export interface Booking {
  id: string;
  userId: string;
  vendorId: string;
  eventDate: string;
  eventType: EventType;
  status: BookingStatus;
  total: number;
  depositAmount: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  vendor?: Vendor;
}

export type EventType = 'wedding' | 'engagement' | 'housewarming' | 'ordination' | 'funeral' | 'other';

export type BookingStatus =
  | 'pending_deposit'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export interface Dispute {
  id: string;
  bookingId: string;
  type: DisputeType;
  status: DisputeStatus;
  description: string;
  evidence?: string[];
  assignedTo?: string;
  openedAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  booking?: Booking;
}

export type DisputeType =
  | 'vendor_no_show'
  | 'quality_issue'
  | 'payment_issue'
  | 'contract_breach'
  | 'other';

export type DisputeStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface PricingRule {
  id: string;
  ruleType: string;
  filters: Record<string, any>;
  takeRateBp: number;
  discountBp: number;
  activeFrom: string;
  activeTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureFlag {
  id: string;
  key: string;
  state: 'OFF' | 'BETA' | 'ON';
  segments?: Record<string, any>;
  packReference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardMetrics {
  gmv: number;
  totalBookings: number;
  activeUsers: number;
  activeVendors: number;
  conversionRate: number;
  averageOrderValue: number;
  revenue: number;
  pendingDisputes: number;
}

export interface MetricData {
  key: string;
  value: number;
  change?: number;
  changePercent?: number;
  trend?: 'up' | 'down' | 'stable';
  data?: Array<{ date: string; value: number }>;
}

export interface AdminUser {
  id: string;
  email: string;
  roleId: string;
  role: AdminRole;
  lastLoginAt?: string;
  createdAt: string;
}

export interface AdminRole {
  id: string;
  name: string;
  permissions: string[];
}

export interface AuditLog {
  id: string;
  adminUserId: string;
  action: string;
  resourceType?: string;
  resourceId?: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  adminUser?: AdminUser;
}

