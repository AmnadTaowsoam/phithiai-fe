export type BookingDraft = {
  vendorId: string;
  vendorName?: string;
  quoteId: string;
  contractId: string;
  packageId?: string;
  eventType: string;
  eventDate: string;
  eventTime?: string;
  venue?: string;
  guestCount?: number;
  totalAmount: number;
  depositAmount: number;
  specialRequests?: string;
};

export const calculateDeposit = (totalAmount: number, depositPercent: number) =>
  Math.max(0, Math.round((totalAmount * depositPercent) / 100));

