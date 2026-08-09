export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Converted"
  | "Lost"
  | "Spam";

export type LeadPriority = "Low" | "Medium" | "High" | "Urgent";

export type LeadSource =
  | "Website Form"
  | "Contact Page"
  | "Landing Page"
  | "Referral"
  | "Social Media"
  | "Campaign"
  | "Manual"
  | "Other";

export type ContactPreference = "Any" | "Email" | "Phone" | "WhatsApp";

export interface LeadTracking {
  referrerUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface PopulatedUserReference {
  _id?: string;
  id?: string;
  email?: string;
  role?: string;
}

export interface LeadNote {
  _id?: string;
  text: string;
  addedBy: string | PopulatedUserReference;
  createdAt: string;
}

export interface Lead {
  _id: string;
  id?: string;
  name: string;
  phone: string;
  email: string;
  purpose: string;
  pageUrl: string;
  pagePath: string;
  location: string;
  contactPreference: ContactPreference;
  tracking: LeadTracking;
  status: LeadStatus;
  priority: LeadPriority;
  source: LeadSource;
  assignedTo?: string | PopulatedUserReference;
  tags: string[];
  internalSummary?: string;
  notes?: LeadNote[];
  nextFollowUpAt?: string;
  lastContactedAt?: string;
  convertedAt?: string;
  lostReason?: string;
  requestIp?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadInput {
  name: string;
  phone: string;
  email: string;
  purpose: string;
  pageUrl: string;
  pagePath: string;
  location: string;
  contactPreference?: ContactPreference;
  tracking?: LeadTracking;
}


export interface CreateAdminLeadInput extends CreateLeadInput {
  status?: LeadStatus;
  priority?: LeadPriority;
  source?: LeadSource;
  assignedTo?: string;
  tags?: string[];
  internalSummary?: string | null;
  nextFollowUpAt?: string | null;
}

export interface CreateLeadResult {
  id: string;
  status: LeadStatus;
  createdAt: string;
}

export interface LeadListQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus;
  priority?: LeadPriority;
  source?: LeadSource;
  assignedTo?: string;
  pagePath?: string;
  location?: string;
  tag?: string;
  fromDate?: string;
  toDate?: string;
  followUpDue?: boolean;
  unassigned?: boolean;
  sortBy?:
    | "createdAt"
    | "updatedAt"
    | "name"
    | "status"
    | "priority"
    | "nextFollowUpAt"
    | "lastContactedAt";
  sortOrder?: "asc" | "desc";
}

export interface UpdateLeadInput {
  name?: string;
  phone?: string;
  email?: string;
  purpose?: string;
  pageUrl?: string;
  pagePath?: string;
  location?: string;
  contactPreference?: ContactPreference;
  tracking?: LeadTracking;
  status?: LeadStatus;
  priority?: LeadPriority;
  source?: LeadSource;
  assignedTo?: string | null;
  tags?: string[];
  internalSummary?: string | null;
  nextFollowUpAt?: string | null;
  lastContactedAt?: string | null;
  lostReason?: string | null;
}

export interface UpdateLeadStatusInput {
  status: LeadStatus;
  lostReason?: string | null;
  nextFollowUpAt?: string | null;
}

export interface LeadStatistics {
  total: number;
  newToday: number;
  unassigned: number;
  overdueFollowUps: number;
  byStatus: Array<{ status: LeadStatus | string; count: number }>;
  byPriority: Array<{ priority: LeadPriority | string; count: number }>;
  bySource: Array<{ source: LeadSource | string; count: number }>;
}

export interface LeadPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
