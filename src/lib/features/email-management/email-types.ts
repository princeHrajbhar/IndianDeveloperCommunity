export type EmailAudience = "users" | "leads" | "applications" | "external-applications" | "manual";

export interface EmailTemplateRecord {
  id: string;
  name: string;
  subject: string;
  html: string;
  text: string;
  builtIn: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AudienceRequest {
  audience: EmailAudience;
  filters?: {
    search?: string;
    role?: string;
    roleScope?: "all" | "organizational" | "standard" | "specific";
    isVerified?: boolean;
    status?: string;
    source?: string;
    priority?: string;
    jobId?: string;
  };
  selectedIds?: string[];
  selectedEmails?: string[];
}

export interface AudiencePreview {
  total: number;
  available: number;
  blocked: number;
  truncated: boolean;
  recipients: Array<{
    id?: string;
    email: string;
    name: string;
    source: EmailAudience;
    blocked: boolean;
    role?: string;
  }>;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  audience: EmailAudience;
  requestedCount: number;
  queuedCount: number;
  sentCount: number;
  failedCount: number;
  skippedCount: number;
  status: "Queued" | "Processing" | "Completed" | "Partial" | "Failed";
  createdAt: string;
  updatedAt: string;
}

export interface EmailSuppression {
  id: string;
  email: string;
  reason?: string;
  createdAt: string;
}


export interface EmailDirectoryRecipient {
  id: string;
  email: string;
  name: string;
  source: "user" | "lead" | "application" | "external-application";
  role?: string;
}

export interface CustomEmailInput {
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  html: string;
  replyTo?: string;
}
