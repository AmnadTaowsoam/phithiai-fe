export const apiConfig = {
  baseUrl:
    process.env.PHITHIAI_API_URL ??
    process.env.phithiai_API_URL ??
    process.env.NEXT_PUBLIC_PHITHIAI_API_URL ??
    process.env.NEXT_PUBLIC_phithiai_API_URL ??
    'http://localhost:3000',
  prefix: 'api',
  timeoutMs: 8000,
};

export const apiRoutes = {
  auth: {
    register: 'auth/register',
    login: 'auth/login',
    refresh: 'auth/refresh',
    logout: 'auth/logout',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password',
    verifyEmail: 'auth/verify-email',
  },
  users: {
    me: 'users/me',
    updateMe: 'users/me',
    changePassword: 'users/me/change-password',
    statistics: 'users/me/statistics',
    loginHistory: 'users/me/login-history',
    sessions: 'users/me/sessions',
    revokeSession: (sessionId: string) => `users/me/sessions/${sessionId}`,
  },
  vendors: 'vendors',
  vendorAvailability: (id: string) => `vendors/${id}/availability`,
  vendorReviews: (id: string) => `vendors/${id}/reviews`,
  planning: {
    eventTypes: 'event-types',
    planningModes: 'planning-modes',
    eventLevels: 'event-levels',
    venueTypes: 'venue-types',
    provinces: 'locations/provinces',
    districts: 'locations/districts',
    subdistricts: 'locations/subdistricts',
    tools: {
      auspicious: 'tools/auspicious',
      estimateBudget: 'tools/budget',
      generateChecklist: 'tools/checklist',
    },
    v1: {
      template: (ceremonyType: string) => `v1/ceremonies/${ceremonyType}/templates`,
      timeline: (planId: string) => `v1/ceremonies/${planId}/timeline`,
      auspicious: (planId: string) => `v1/ceremonies/${planId}/auspicious-dates`,
      checklist: (planId: string) => `v1/checklists/${planId}`,
      updateTask: (taskId: string) => `v1/tasks/${taskId}`,
      budgetForecast: (planId: string) => `v1/budgets/${planId}/forecast`,
      costBreakdown: (planId: string) => `v1/reports/${planId}/cost-breakdown`,
    },
  },
  matching: {
    smartMatch: 'matches',
    history: 'matches/me/history',
    preferences: 'matches/me/preferences',
  },
  bookings: {
    list: 'bookings',
    me: 'bookings/me',
    statistics: 'bookings/me/statistics',
    detail: (bookingId: string) => `bookings/${bookingId}`,
    confirm: (bookingId: string) => `bookings/${bookingId}/confirm`,
    complete: (bookingId: string) => `bookings/${bookingId}/complete`,
    cancel: (bookingId: string) => `bookings/${bookingId}/cancel`,
  },
  guests: {
    base: 'guests',
    bookingGuests: (bookingId: string) => `guests/bookings/${bookingId}/guests`,
    rsvp: 'guests/rsvp',
    rsvpSummary: (bookingId: string) => `guests/bookings/${bookingId}/rsvp/summary`,
    importRSVP: 'guests/rsvp/import',
    invitations: 'guests/invitations',
    checkin: 'guests/checkin',
  },
  payments: {
    intents: 'v1/payments/payment/intents',
    intentById: (intentId: string) => `v1/payments/payment/intents/${intentId}`,
    escrow: 'v1/payments/escrow',
    escrowMilestones: (bookingId: string) => `v1/payments/escrow/${bookingId}/milestones`,
    escrowRelease: (bookingId: string) => `v1/payments/escrow/${bookingId}/release`,
    escrowRefund: (bookingId: string) => `v1/payments/escrow/${bookingId}/refund`,
    payouts: 'v1/payments/payouts',
  },
  notifications: {
    me: 'notifications/me',
    send: 'notifications/send',
    templates: 'notifications/templates',
    broadcast: 'v1/notifications/broadcast',
  },
  media: {
    upload: 'media/upload',
    detail: (mediaId: string) => `media/${mediaId}`,
    streamSessions: (eventId: string) => `v1/events/${eventId}/stream-sessions`,
    ceremonyDocuments: (ceremonyId: string) => `v1/documents/${ceremonyId}`,
  },
  ai: {
    chat: 'ai/chat',
    history: 'ai/chat/history',
    recommendations: 'ai/recommendations',
  },
  compliance: {
    consent: 'compliance/consent',
    consentMe: 'compliance/consent/me',
    reports: 'compliance/reports',
    dataRequest: 'compliance/data-request',
  },
} as const;

export const resolveApiUrl = (path: string) => {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${apiConfig.baseUrl.replace(/\/$/, '')}/${apiConfig.prefix}/${normalized}`;
};
