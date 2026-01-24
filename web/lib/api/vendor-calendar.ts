import { apiFetch } from './http';
import { z } from 'zod';

// Zod schemas for type safety
const BlockedDateSchema = z.object({
  id: z.string(),
  date: z.string(), // ISO date string
  reason: z.string().optional(),
  createdAt: z.string(),
});

const BookingEventSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  customerName: z.string(),
  eventType: z.string(),
  eventDate: z.string(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
});

const AvailabilitySchema = z.object({
  vendorId: z.string(),
  blockedDates: z.array(BlockedDateSchema),
  bookings: z.array(BookingEventSchema),
  workingHours: z.object({
    monday: z.array(z.string()),
    tuesday: z.array(z.string()),
    wednesday: z.array(z.string()),
    thursday: z.array(z.string()),
    friday: z.array(z.string()),
    saturday: z.array(z.string()),
    sunday: z.array(z.string()),
  }).optional(),
});

const WorkingHoursSchema = z.object({
  monday: z.array(z.string()),
  tuesday: z.array(z.string()),
  wednesday: z.array(z.string()),
  thursday: z.array(z.string()),
  friday: z.array(z.string()),
  saturday: z.array(z.string()),
  sunday: z.array(z.string()),
});

// TypeScript types inferred from Zod schemas
export type BlockedDate = z.infer<typeof BlockedDateSchema>;
export type BookingEvent = z.infer<typeof BookingEventSchema>;
export type Availability = z.infer<typeof AvailabilitySchema>;
export type WorkingHours = z.infer<typeof WorkingHoursSchema>;

// API input types
export interface BlockDateInput extends Record<string, unknown> {
  date: string; // ISO date string
  reason?: string;
}

export interface UpdateWorkingHoursInput extends Record<string, unknown> {
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
}

export class VendorCalendarAPI {
  /**
   * Get vendor's calendar availability
   */
  static async getAvailability(token?: string): Promise<Availability> {
    const response = await apiFetch<Availability, Availability>('/vendor/calendar', {
      method: 'GET',
      schema: AvailabilitySchema,
      token,
    });
    return response;
  }

  /**
   * Get availability for a specific date range
   */
  static async getAvailabilityForRange(
    startDate: string,
    endDate: string,
    token?: string
  ): Promise<Availability> {
    const response = await apiFetch<Availability, Availability>(
      `/vendor/calendar?startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
        schema: AvailabilitySchema,
        token,
      }
    );
    return response;
  }

  /**
   * Block a date (mark as unavailable)
   */
  static async blockDate(input: BlockDateInput, token?: string): Promise<BlockedDate> {
    const response = await apiFetch<BlockedDate, BlockedDate>('/vendor/calendar/block', {
      method: 'POST',
      schema: BlockedDateSchema,
      body: input,
      token,
    });
    return response;
  }

  /**
   * Unblock a date (make available again)
   */
  static async unblockDate(dateId: string, token?: string): Promise<void> {
    await apiFetch<void, void>(`/vendor/calendar/block/${dateId}`, {
      method: 'DELETE',
      schema: z.any(),
      token,
    });
  }

  /**
   * Update working hours
   */
  static async updateWorkingHours(
    input: UpdateWorkingHoursInput,
    token?: string
  ): Promise<WorkingHours> {
    const response = await apiFetch<WorkingHours, WorkingHours>(
      '/vendor/calendar/working-hours',
      {
        method: 'PUT',
        schema: WorkingHoursSchema,
        body: input,
        token,
      }
    );
    return response;
  }

  /**
   * Get calendar events for a month
   */
  static async getMonthEvents(
    year: number,
    month: number,
    token?: string
  ): Promise<{ blockedDates: BlockedDate[]; bookings: BookingEvent[] }> {
    const response = await apiFetch<
      { blockedDates: BlockedDate[]; bookings: BookingEvent[] },
      { blockedDates: BlockedDate[]; bookings: BookingEvent[] }
    >(`/vendor/calendar/events?year=${year}&month=${month}`, {
      method: 'GET',
      schema: z.object({
        blockedDates: z.array(BlockedDateSchema),
        bookings: z.array(BookingEventSchema),
      }),
      token,
    });
    return response;
  }
}
