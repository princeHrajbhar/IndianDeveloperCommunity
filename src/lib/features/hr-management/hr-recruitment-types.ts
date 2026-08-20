import type { JobReference } from "@/src/lib/features/job-applications/job-application-types";

export type HRInterviewStatus = "scheduled" | "completed" | "cancelled" | "no-show";
export type HRInterviewMode = "video" | "phone" | "in-person";
export type HRInterviewRecommendation = "strong-hire" | "hire" | "hold" | "no-hire";

export interface HRInterview {
  id: string;
  _id?: string;
  applicationId: string;
  jobId: JobReference;
  candidateUserId?: string;
  candidateName: string;
  candidateEmail: string;
  roundName: string;
  scheduledAt: string;
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
  scheduledAt: string;
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
