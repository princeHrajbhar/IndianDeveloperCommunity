import type { ApplicationStatus } from "../job-applications/job-application-types";
export type ExternalSource = "Manual" | "CSV" | "Excel" | "Google Sheet" | "Google Form";
export interface ExternalStatusHistoryEntry { fromStatus: ApplicationStatus; toStatus: ApplicationStatus; changedAt: string; changedBy: string; }
export interface ExternalApplication { id: string; _id?: string; fields: Record<string,string>; columns: string[]; name?: string; email?: string; phone?: string; status: ApplicationStatus; statusHistory?: ExternalStatusHistoryEntry[]; source: ExternalSource; sourceLabel?: string; importedAt: string; createdAt?: string; updatedAt?: string; }
export interface ExternalListQuery { page?: number; limit?: number; search?: string; status?: ApplicationStatus; source?: ExternalSource; fromDate?: string; toDate?: string; }
