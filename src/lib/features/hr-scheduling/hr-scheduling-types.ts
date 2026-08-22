export type HRScheduleKind = "interview" | "meeting";
export type HRScheduleStatus = "awaiting-recipient" | "scheduled" | "cancelled";
export type HRScheduleMode = "video" | "phone" | "in-person";
export interface HRScheduleTimeRange { start: string; end: string }
export interface HRDirectoryRecipient { id: string; email: string; name: string; source: "user" | "lead" | "application" | "external-application"; role?: string }
export interface HRScheduleOrganizer { id: string; email: string; name: string; role: string }
export interface HRScheduleInvitation {
  id: string;
  kind: HRScheduleKind;
  recipientName?: string;
  recipientEmail: string;
  subject: string;
  bodyHtml: string;
  timezone: string;
  windowStart: string;
  windowEnd: string;
  durationMinutes: number;
  slotIntervalMinutes: number;
  allowedWeekdays: number[];
  timeRanges: HRScheduleTimeRange[];
  specificSlots: string[];
  mode: HRScheduleMode;
  location?: string;
  meetingUrl?: string;
  organizerIds: Array<string | { id?: string; _id?: string; email?: string; role?: string }>;
  scheduledAt?: string;
  selectedAt?: string;
  status: HRScheduleStatus;
  availableSlots?: string[];
  bookingUrl?: string;
  emailDelivery?: { sent: number; skipped: number; failed: number };
  createdAt: string;
  updatedAt: string;
}
export interface CreateHRScheduleInput {
  kind: HRScheduleKind;
  recipientName?: string;
  recipientEmail: string;
  linkedUserId?: string;
  externalApplicationId?: string;
  subject: string;
  bodyHtml: string;
  timezone: string;
  windowStart: string;
  windowEnd: string;
  durationMinutes: number;
  slotIntervalMinutes: number;
  allowedWeekdays: number[];
  timeRanges: HRScheduleTimeRange[];
  specificSlots?: string[];
  mode: HRScheduleMode;
  location?: string;
  meetingUrl?: string;
  organizerIds: string[];
  sendEmail: boolean;
}
