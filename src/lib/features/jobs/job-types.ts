export type JobStatus = "Draft" | "Published" | "Paused" | "Closed";
export type EmploymentType =
  | "Full-Time"
  | "Part-Time"
  | "Contract"
  | "Internship"
  | "Freelance";
export type WorkplaceType = "Remote" | "Hybrid" | "On-Site";
export type ExperienceLevel = "Fresher" | "Junior" | "Mid-Level" | "Senior" | "Lead";
export type ScreeningQuestionType = "text" | "textarea" | "radio" | "checkbox" | "number";


export interface JobCreateResponse {
  id: string;
  title: string;
  slug: string;
  department: string;
  employmentType: EmploymentType;
  workplaceType: WorkplaceType;
  status: JobStatus;
  company: { id: string; name: string };
  location: { city: string; state: string; country: string };
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  isUrgentHiring: boolean;
}

export interface JobSalary {
  min?: number;
  max?: number;
  currency: string;
  isNegotiable: boolean;
  hideSalary: boolean;
}

export interface JobListItem {
  id: string;
  title: string;
  slug: string;
  department: string;
  employmentType: EmploymentType;
  workplaceType: WorkplaceType;
  location: { city: string; state: string; country: string };
  company: { id: string; name: string; logo?: string };
  shortDescription: string;
  salary: JobSalary;
  status: JobStatus;
  isFeatured: boolean;
  isUrgentHiring: boolean;
  publishedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface JobDetail extends JobListItem {
  location: { country: string; state: string; city: string; address?: string };
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  skills: string[];
  experience: { level: ExperienceLevel; min: number; max?: number };
  hiringStages: Array<{ name: string; order: number }>;
  benefits: string[];
  perks: string[];
  applicationSettings: {
    deadline?: string;
    vacancies: number;
    allowReferral: boolean;
    externalApplyLink?: string;
  };
  screeningQuestions: Array<{
    question: string;
    type: ScreeningQuestionType;
    required: boolean;
    options?: string[];
  }>;
  seo: { title?: string; description?: string };
  updatedAt: string;
}

export interface AdminJobDetail extends JobDetail {
  analytics: {
    views: number;
    applications: number;
    shortlisted: number;
    rejected: number;
    hired: number;
  };
  recruiterId: string;
  createdBy: string;
}

export interface JobPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface JobsQuery {
  page?: number;
  limit?: number;
  sortBy?: "-createdAt" | "createdAt" | "title" | "-title" | "publishedAt" | "-publishedAt";
  employmentType?: EmploymentType;
  workplaceType?: WorkplaceType;
  department?: string;
  search?: string;
  country?: string;
  state?: string;
  city?: string;
  skills?: string;
  companyId?: string;
  minExperience?: number;
  maxExperience?: number;
  minSalary?: number;
  maxSalary?: number;
  isFeatured?: boolean;
  isUrgentHiring?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface JobWritePayload {
  title: string;
  slug?: string;
  department: string;
  employmentType: EmploymentType;
  workplaceType: WorkplaceType;
  location: { country: string; state: string; city: string; address?: string };
  company: { companyId?: string; name: string; logo?: string };
  shortDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications?: string[];
  skills: string[];
  experience: { level: ExperienceLevel; min: number; max?: number };
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
    isNegotiable?: boolean;
    hideSalary?: boolean;
  } | null;
  hiringStages: Array<{ name: string; order: number }>;
  benefits?: string[];
  perks?: string[];
  applicationSettings?: {
    deadline?: string | null;
    vacancies?: number;
    allowReferral?: boolean;
    externalApplyLink?: string;
  } | null;
  screeningQuestions?: Array<{
    question: string;
    type: ScreeningQuestionType;
    required?: boolean;
    options?: string[];
  }>;
  seo?: { title?: string; description?: string } | null;
  isFeatured?: boolean;
  isUrgentHiring?: boolean;
  recruiterId?: string;
  expiresAt?: string | null;
}

export type JobUpdatePayload = Partial<JobWritePayload>;

export interface JobStatistics {
  totalJobs: number;
  publishedJobs: number;
  draftJobs: number;
  pausedJobs: number;
  closedJobs: number;
  featuredJobs: number;
  urgentJobs: number;
  totalViews: number;
  totalApplications: number;
}

export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface MessageEnvelope {
  success: boolean;
  message: string;
}
