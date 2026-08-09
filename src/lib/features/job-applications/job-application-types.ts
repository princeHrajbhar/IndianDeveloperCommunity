import type { JobListItem } from "@/src/lib/features/jobs/job-types";

export type ApplicationStatus =
  | "Applied"
  | "Reviewing"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Interviewed"
  | "Offered"
  | "Hired"
  | "Rejected"
  | "Withdrawn";

export interface ApplicationPersonalInfo {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email?: string;
  dateOfBirth: string;
  currentLocation: string;
}

export interface ApplicationEducation {
  _id?: string;
  schoolOrUniversity: string;
  degree: string;
  startDate: string;
  endDate: string;
  percentageOrCGPA?: string;
}

export interface ApplicationExperience {
  _id?: string;
  companyName: string;
  role: string;
  responsibilities: string;
  startDate: string;
  endDate?: string;
  currentSalary?: number;
  expectedSalary?: number;
}

export interface ApplicationSocialLinks {
  portfolio?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export interface PresentedAsset {
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
}

export type JobReference = string | ({ _id?: string; id?: string } & Partial<JobListItem>);

export interface JobApplication {
  id: string;
  applicantUserId: string | { _id?: string; email?: string; role?: string; isVerified?: boolean };
  jobId: JobReference;
  personalInfo: ApplicationPersonalInfo;
  education: ApplicationEducation[];
  experience: ApplicationExperience[];
  socialLinks: ApplicationSocialLinks;
  screeningAnswers?: Array<{
    question: string;
    type: "text" | "textarea" | "radio" | "checkbox" | "number";
    answer: string | string[] | number;
  }>;
  documents?: {
    resume?: PresentedAsset;
    photo?: PresentedAsset;
    coverLetter?: PresentedAsset;
  };
  declarationAccepted: boolean;
  status: ApplicationStatus;
  recruiterNotes?: string;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationInput {
  jobId: string;
  personalInfo: Omit<ApplicationPersonalInfo, "email"> & { email?: string };
  education: ApplicationEducation[];
  experience: ApplicationExperience[];
  socialLinks?: ApplicationSocialLinks;
  screeningAnswers?: Array<{ question: string; answer: string | string[] | number }>;
  declarationAccepted: true;
  resume: File;
  photo?: File;
  coverLetter?: File;
}

export interface UpdateOwnApplicationInput {
  personalInfo?: Partial<Omit<ApplicationPersonalInfo, "email">>;
  education?: ApplicationEducation[];
  experience?: ApplicationExperience[];
  socialLinks?: ApplicationSocialLinks;
}

export interface AdminApplicationsQuery {
  page?: number;
  limit?: number;
  jobId?: string;
  status?: ApplicationStatus;
  email?: string;
  sortBy?: "appliedAt" | "createdAt" | "updatedAt" | "status";
  sortOrder?: "asc" | "desc";
}

export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
}

export interface MessageEnvelope {
  success: boolean;
  message: string;
}
