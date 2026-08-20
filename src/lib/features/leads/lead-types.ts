export type LeadStatus = "New" | "Attempting Contact" | "Contacted" | "Nurturing" | "Qualified" | "Proposal Sent" | "Negotiation" | "Converted" | "Lost" | "Spam";
export type LeadPriority = "Low" | "Medium" | "High" | "Urgent";
export type LeadTemperature = "Cold" | "Warm" | "Hot";
export type LeadQualification = "Unqualified" | "MQL" | "SQL" | "Disqualified";
export type LeadSource = "Website Form" | "Contact Page" | "Landing Page" | "Referral" | "Social Media" | "Campaign" | "Email Campaign" | "Paid Ads" | "Organic Search" | "Webinar" | "Partner" | "Outbound" | "Import" | "Manual" | "Other";
export type ContactPreference = "Any" | "Email" | "Phone" | "WhatsApp";
export type LeadActivityType = "call" | "meeting" | "task" | "whatsapp" | "sms" | "demo" | "status-change" | "assignment" | "other";

export interface LeadTracking { referrerUrl?: string; utmSource?: string; utmMedium?: string; utmCampaign?: string; utmTerm?: string; utmContent?: string; }
export interface PopulatedUserReference { _id?: string; id?: string; email?: string; role?: string; }
export interface LeadCommunication { _id?: string; kind: "email" | "followup"; subject?: string; message: string; sentBy: string | PopulatedUserReference; sentAt: string; emailMessageId?: string; nextFollowUpAt?: string; }
export interface LeadNote { _id?: string; text: string; addedBy: string | PopulatedUserReference; createdAt: string; }
export interface LeadActivity { _id?: string; type: LeadActivityType; title: string; description?: string; outcome?: string; dueAt?: string; completedAt?: string; createdBy: string | PopulatedUserReference; createdAt: string; }
export interface LeadScoreBreakdown { fit: number; intent: number; recency: number; engagement: number; }

export interface Lead {
  _id: string; id?: string; name: string; phone: string; email: string; purpose: string; pageUrl: string; pagePath: string; location: string; contactPreference: ContactPreference; tracking: LeadTracking;
  company?: string; jobTitle?: string; industry?: string; website?: string; companySize?: string; productInterest?: string; budget?: string; timeline?: string; estimatedValue: number; probability: number;
  status: LeadStatus; priority: LeadPriority; source: LeadSource; qualification: LeadQualification; temperature: LeadTemperature; score: number; scoreBreakdown: LeadScoreBreakdown; assignedTo?: string | PopulatedUserReference; tags: string[]; internalSummary?: string; notes?: LeadNote[]; communications?: LeadCommunication[]; activities?: LeadActivity[];
  nextFollowUpAt?: string; lastContactedAt?: string; lastActivityAt?: string; firstResponseAt?: string; ownerAssignedAt?: string; qualifiedAt?: string; convertedAt?: string; stageChangedAt?: string; lostReason?: string; disqualifiedReason?: string; requestIp?: string; userAgent?: string; createdAt: string; updatedAt: string;
}

export interface CreateLeadInput { name: string; phone: string; email: string; purpose: string; pageUrl: string; pagePath: string; location: string; contactPreference?: ContactPreference; tracking?: LeadTracking; }
export interface CreateAdminLeadInput extends CreateLeadInput {
  company?: string | null; jobTitle?: string | null; industry?: string | null; website?: string | null; companySize?: string | null; productInterest?: string | null; budget?: string | null; timeline?: string | null; estimatedValue?: number; probability?: number;
  status?: LeadStatus; priority?: LeadPriority; source?: LeadSource; qualification?: LeadQualification; assignedTo?: string; tags?: string[]; internalSummary?: string | null; nextFollowUpAt?: string | null;
}
export interface CreateLeadResult { id: string; status: LeadStatus; createdAt: string; }

export interface LeadListQuery {
  page?: number; limit?: number; search?: string; status?: LeadStatus; priority?: LeadPriority; source?: LeadSource; qualification?: LeadQualification; temperature?: LeadTemperature; assignedTo?: string; pagePath?: string; location?: string; industry?: string; productInterest?: string; tag?: string; fromDate?: string; toDate?: string; followUpDue?: boolean; unassigned?: boolean; scoreMin?: number; scoreMax?: number;
  sortBy?: "createdAt" | "updatedAt" | "name" | "status" | "priority" | "score" | "estimatedValue" | "nextFollowUpAt" | "lastContactedAt" | "lastActivityAt"; sortOrder?: "asc" | "desc";
}
export interface UpdateLeadInput {
  name?: string; phone?: string; email?: string; purpose?: string; pageUrl?: string; pagePath?: string; location?: string; contactPreference?: ContactPreference; tracking?: LeadTracking;
  company?: string | null; jobTitle?: string | null; industry?: string | null; website?: string | null; companySize?: string | null; productInterest?: string | null; budget?: string | null; timeline?: string | null; estimatedValue?: number; probability?: number;
  status?: LeadStatus; priority?: LeadPriority; source?: LeadSource; qualification?: LeadQualification; assignedTo?: string | null; tags?: string[]; internalSummary?: string | null; nextFollowUpAt?: string | null; lastContactedAt?: string | null; lostReason?: string | null; disqualifiedReason?: string | null;
}
export interface UpdateLeadStatusInput { status: LeadStatus; lostReason?: string | null; nextFollowUpAt?: string | null; }

export interface LeadStatistics {
  total: number; newToday: number; unassigned: number; overdueFollowUps: number; hotLeads: number; qualified: number; converted: number; conversionRate: number; pipelineValue: number; averageScore: number;
  byStatus: Array<{ status: LeadStatus | string; count: number }>;
  byPriority: Array<{ priority: LeadPriority | string; count: number }>;
  bySource: Array<{ source: LeadSource | string; count: number }>;
  byTemperature: Array<{ temperature: LeadTemperature | string; count: number }>;
  byQualification: Array<{ qualification: LeadQualification | string; count: number }>;
  byAssignee: Array<{ userId: string; email: string; count: number; pipelineValue: number }>;
}
export interface LeadPagination { page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrev: boolean; }
export interface LeadAssignee { id: string; email: string; role: string; roleName: string; }
export interface LeadImportResult { totalRows: number; created: number; skippedDuplicates: number; invalid: number; errors: Array<{ row: number; message: string }>; }
export interface LeadBulkEmailResult { requested: number; matched: number; sent: number; failed: number; failures: Array<{ id: string; email: string; error: string }>; }
