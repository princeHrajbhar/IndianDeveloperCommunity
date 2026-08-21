import type { JobReference } from "@/src/lib/features/job-applications/job-application-types";

export type HRInterviewStatus = "awaiting-candidate" | "scheduled" | "completed" | "cancelled" | "no-show";
export type HRInterviewMode = "video" | "phone" | "in-person";
export type HRInterviewRecommendation = "strong-hire" | "hire" | "hold" | "no-hire";
export type HRSchedulingMode = "admin-fixed" | "candidate-choice";

export interface HRInterviewAvailability {
  timezone: string;
  windowStart: string;
  windowEnd: string;
  dailyStart: string;
  dailyEnd: string;
  slotIntervalMinutes: number;
  allowedWeekdays: number[];
  specificSlots: string[];
  templateId?: string;
}

export interface HRInterview {
  id: string;
  _id?: string;
  applicationId: string;
  jobId: JobReference;
  candidateUserId?: string;
  candidateName: string;
  candidateEmail: string;
  roundName: string;
  schedulingMode: HRSchedulingMode;
  scheduledAt?: string;
  selectedAt?: string;
  availability?: HRInterviewAvailability;
  availableSlots?: string[];
  durationMinutes: number;
  mode: HRInterviewMode;
  location?: string;
  meetingUrl?: string;
  interviewerIds: Array<string | { _id?: string; id?: string; email?: string; role?: string }>;
  status: HRInterviewStatus;
  score?: number;
  recommendation?: HRInterviewRecommendation;
  strengths?: string;
  concerns?: string;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HRInterviewList {
  success: boolean;
  data: HRInterview[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface CreateHRInterviewInput {
  applicationId: string;
  roundName: string;
  schedulingMode?: HRSchedulingMode;
  scheduledAt?: string;
  availability?: HRInterviewAvailability;
  durationMinutes: number;
  mode: HRInterviewMode;
  location?: string;
  meetingUrl?: string;
  interviewerIds?: string[];
  sendEmail?: boolean;
}

export interface UpdateHRInterviewInput {
  roundName?: string;
  scheduledAt?: string;
  durationMinutes?: number;
  mode?: HRInterviewMode;
  location?: string;
  meetingUrl?: string;
  interviewerIds?: string[];
  status?: HRInterviewStatus;
  score?: number;
  recommendation?: HRInterviewRecommendation;
  strengths?: string;
  concerns?: string;
  feedback?: string;
  sendEmail?: boolean;
}

export interface HRScheduleTemplate {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  timezone: string;
  durationMinutes: number;
  mode: HRInterviewMode;
  location?: string;
  meetingUrl?: string;
  windowDays: number;
  dailyStart: string;
  dailyEnd: string;
  slotIntervalMinutes: number;
  allowedWeekdays: number[];
  interviewerIds: Array<string | { _id?: string; id?: string; email?: string; role?: string }>;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type HRScheduleTemplateInput = Omit<HRScheduleTemplate, "id" | "_id" | "createdAt" | "updatedAt" | "interviewerIds"> & { interviewerIds: string[] };
