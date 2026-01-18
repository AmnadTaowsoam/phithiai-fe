import { z } from 'zod';

export const metaSchema = z
  .object({
    timestamp: z.string().optional(),
    requestId: z.string().optional(),
  })
  .optional();

export const paginationSchema = z
  .object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean().optional(),
    hasPrev: z.boolean().optional(),
  })
  .partial()
  .optional();

export const vendorAvailabilitySchema = z.object({
  date: z.string(),
  available: z.boolean(),
  slots: z
    .array(
      z.object({
        time: z.string(),
        available: z.boolean(),
      }),
    )
    .optional(),
  alternativeDates: z
    .array(
      z.object({
        date: z.string(),
        available: z.boolean().optional(),
      }),
    )
    .optional(),
});

export const vendorSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  description: z.string().optional(),
  category: z.string(),
  zone: z.string(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  verified: z.boolean().optional(),
  startingPrice: z.number().optional(),
  tags: z.array(z.string()).default([]),
  availability: z
    .object({
      status: z.string(),
      leadTimeDays: z.number().optional(),
    })
    .optional(),
});

export const vendorPackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().optional(),
  description: z.string().optional(),
  includes: z.array(z.string()).default([]),
  addons: z
    .array(
      z.object({
        name: z.string(),
        price: z.number().optional(),
      }),
    )
    .default([]),
});

export const vendorReviewSchema = z.object({
  id: z.string(),
  rating: z.number(),
  comment: z.string().optional(),
  createdAt: z.string(),
  images: z.array(z.string()).default([]),
  user: z
    .object({
      name: z.string(),
      avatar: z.string().url().optional(),
    })
    .optional(),
});

export const vendorStatsSchema = z
  .object({
    totalBookings: z.number().optional(),
    completionRate: z.number().optional(),
    avgResponseTime: z.number().optional(),
    responseTimeUnit: z.string().optional(),
  })
  .optional();

export const vendorDetailSchema = vendorSummarySchema.extend({
  longDescription: z.string().optional(),
  address: z.string().optional(),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  contact: z
    .object({
      phone: z.string().optional(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      line: z.string().optional(),
      instagram: z.string().optional(),
    })
    .optional(),
  packages: z.array(vendorPackageSchema).optional(),
  awards: z
    .array(
      z.object({
        year: z.number().optional(),
        title: z.string(),
        organization: z.string().optional(),
      }),
    )
    .optional(),
  featuredIn: z.array(z.string()).optional(),
  stats: vendorStatsSchema,
});

export const auspiciousDateSchema = z.object({
  date: z.string(),
  thaiDate: z.string().optional(),
  score: z.number(),
  rating: z.number().optional(),
  reasons: z.array(z.string()).optional(),
  luckyTimes: z.array(z.string()).optional(),
  luckyColors: z.array(z.string()).optional(),
  luckyElements: z.array(z.string()).optional(),
});

export const auspiciousCalendarSchema = z.record(
  z
    .record(
      z.object({
        level: z.string(),
        score: z.number(),
      }),
    )
    .optional(),
);

export const auspiciousPlanningSchema = z.object({
  topDates: z.array(auspiciousDateSchema),
  calendar: auspiciousCalendarSchema.optional(),
});

export const budgetPercentileSchema = z.object({
  p10: z.number(),
  median: z.number(),
  p90: z.number(),
});

export const budgetBreakdownSchema = z.record(budgetPercentileSchema);

export const budgetEstimateSchema = z.object({
  total: budgetPercentileSchema,
  breakdown: budgetBreakdownSchema,
  perGuestCost: budgetPercentileSchema.optional(),
  tips: z.array(z.string()).optional(),
});

export const checklistItemSchema = z.object({
  id: z.string(),
  task: z.string(),
  completed: z.boolean().optional(),
  owner: z.string().optional(),
});

export const planningChecklistSchema = z.object({
  checklist: z.record(z.array(checklistItemSchema)).optional(),
  timeline: z
    .array(
      z.object({
        time: z.string(),
        activity: z.string(),
        duration: z.number().optional(),
        owner: z.string().optional(),
      }),
    )
    .optional(),
});

export const optionWithIconSchema = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  description: z.string().optional(),
});

export const provinceSchema = z.object({
  code: z.string(),
  name: z.string(),
  name_en: z.string().optional(),
});

export const districtSchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const subdistrictSchema = z.object({
  code: z.string(),
  name: z.string(),
  postcode: z.string().optional(),
});

export const ceremonyTemplateSchema = z
  .object({
    key: z.string(),
    name: z.string(),
    description: z.string().optional(),
    phases: z
      .array(
        z.object({
          name: z.string(),
          summary: z.string().optional(),
          keyMoments: z.array(z.string()).optional(),
        }),
      )
      .optional(),
    essentials: z.array(z.string()).optional(),
    serviceNeeds: z.array(z.string()).optional(),
    budgetGuidelines: z
      .object({
        floorBudget: z.number().optional(),
        typicalRange: z.string().optional(),
        notes: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .passthrough();

export const checklistTaskV1Schema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  priority: z.string(),
  phase: z.string(),
  deadline: z.string(),
  weeksBeforeEvent: z.number().optional(),
  estimatedHours: z.number().optional(),
  completed: z.boolean().optional(),
  notes: z.string().optional(),
});

export const checklistAnalyticsSchema = z.object({
  completionPercent: z.number().optional(),
  summary: z.array(z.record(z.any())).optional(),
  upcoming: z.array(checklistTaskV1Schema).optional(),
  overdue: z.array(checklistTaskV1Schema).optional(),
});

export const planTimelineSchema = z.object({
  plan: z.record(z.any()).optional(),
  checklist: z.array(checklistTaskV1Schema).optional(),
  timeline: z.record(z.any()).optional(),
});

export const rsvpSummarySchema = z.object({
  total: z.number(),
  yes: z.number(),
  no: z.number(),
  maybe: z.number(),
  pending: z.number(),
  yesPercentage: z.number(),
  expectedAttendees: z.number(),
});

export const guestSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  guestType: z.string().optional(),
  tableNumber: z.number().optional(),
  seatNumber: z.number().optional(),
  relationToBride: z.string().optional(),
  relationToGroom: z.string().optional(),
});

export const bookingSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  vendorId: z.string().optional(),
  eventDate: z.string().optional(),
  eventType: z.string().optional(),
  ceremonyType: z.string().optional(),
  status: z.string(),
  total: z.number().optional(),
  depositAmount: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  user: z
    .object({
      id: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
    })
    .optional(),
  vendor: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
    })
    .optional(),
});

export const paymentIntentSchema = z.object({
  id: z.string(),
  status: z.string(),
  amount: z.number(),
  currency: z.string().optional(),
  bookingId: z.string().optional(),
  milestoneId: z.string().nullable().optional(),
  userId: z.string().optional(),
  vendorId: z.string().optional(),
  method: z.string().optional(),
  provider: z.string().nullable().optional(),
  providerChargeId: z.string().nullable().optional(),
  providerResponse: z.record(z.any()).nullable().optional(),
  qrCode: z.string().nullable().optional(),
  failureReason: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  paidAt: z.string().nullable().optional(),
  failedAt: z.string().nullable().optional(),
}).passthrough();

export const notificationSchema = z.object({
  id: z.string(),
  channel: z.string(),
  subject: z.string().optional(),
  body: z.string().optional(),
  createdAt: z.string().optional(),
  status: z.string().optional(),
});

export const mediaItemSchema = z.object({
  id: z.string(),
  url: z.string(),
  filename: z.string().optional(),
  type: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export type VendorSummary = z.infer<typeof vendorSummarySchema>;
export type VendorDetail = z.infer<typeof vendorDetailSchema>;
export type VendorReview = z.infer<typeof vendorReviewSchema>;
export type VendorAvailability = z.infer<typeof vendorAvailabilitySchema>;
export type BudgetEstimate = z.infer<typeof budgetEstimateSchema>;
export type AuspiciousPlanning = z.infer<typeof auspiciousPlanningSchema>;
export type PlanningChecklist = z.infer<typeof planningChecklistSchema>;
export type CeremonyTemplate = z.infer<typeof ceremonyTemplateSchema>;
export type ChecklistTaskV1 = z.infer<typeof checklistTaskV1Schema>;
export type ChecklistAnalytics = z.infer<typeof checklistAnalyticsSchema>;
export type PlanTimeline = z.infer<typeof planTimelineSchema>;
export type RsvpSummary = z.infer<typeof rsvpSummarySchema>;
export type GuestRecord = z.infer<typeof guestSchema>;
export type BookingRecord = z.infer<typeof bookingSchema>;
export type PaymentIntent = z.infer<typeof paymentIntentSchema>;
export type NotificationRecord = z.infer<typeof notificationSchema>;
export type MediaItem = z.infer<typeof mediaItemSchema>;
