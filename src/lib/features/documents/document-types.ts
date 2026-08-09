export type DocumentTemplateStatus = "draft" | "active" | "archived";
export type DocumentIssueStatus = "issued" | "acknowledged" | "rejected" | "revoked";
export type AcknowledgementFieldType =
  | "text"
  | "textarea"
  | "date"
  | "checkbox"
  | "select"
  | "signature-name";

export interface AcknowledgementField {
  key: string;
  label: string;
  type: AcknowledgementFieldType;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface AcknowledgementConfig {
  enabled: boolean;
  title: string;
  instructions?: string;
  fields: AcknowledgementField[];
  allowMessage: boolean;
  allowSignedDocument: boolean;
  requireSignedDocument: boolean;
}

export interface DocumentTemplate {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  description?: string;
  emailSubject?: string;
  contentHtml: string;
  stylesCss?: string;
  status: DocumentTemplateStatus;
  acknowledgement: AcknowledgementConfig;
  createdAt: string;
  updatedAt: string;
}

export interface SignedDocumentAsset {
  url?: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
  uploadedAt?: string;
}

export interface DocumentAcknowledgementSubmission {
  submittedAt: string;
  values: Record<string, string | boolean>;
  message?: string;
  signedDocument?: SignedDocumentAsset;
}

export interface DocumentIssue {
  _id?: string;
  id?: string;
  documentNumber: string;
  batchId?: string;
  templateId?: string;
  templateName: string;
  category: string;
  recipientUserId: string;
  recipientEmail: string;
  recipientName: string;
  variables: Record<string, string>;
  renderedHtml?: string;
  stylesCss?: string;
  status: DocumentIssueStatus;
  acknowledgement: AcknowledgementConfig;
  acknowledgementSubmission?: DocumentAcknowledgementSubmission;
  emailNotificationRequested: boolean;
  emailQueuedAt?: string;
  issuedAt: string;
  revokeReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ListEnvelope<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

export interface DataEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  emailQueued?: boolean;
}

export interface TemplateInput {
  name: string;
  category: string;
  description?: string;
  emailSubject?: string;
  contentHtml: string;
  stylesCss?: string;
  status: DocumentTemplateStatus;
  acknowledgement: AcknowledgementConfig;
}

export interface IssueDocumentInput {
  templateId: string;
  recipientUserId: string;
  variables?: Record<string, string | number | boolean | null>;
  sendEmail?: boolean;
  acknowledgementEnabled?: boolean;
}

export interface BulkIssueDocumentInput {
  templateId: string;
  recipientUserIds: string[];
  variables?: Record<string, string | number | boolean | null>;
  recipientVariables?: Record<string, Record<string, string | number | boolean | null>>;
  sendEmail?: boolean;
  acknowledgementEnabled?: boolean;
}
