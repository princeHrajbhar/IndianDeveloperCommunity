import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope } from "@/src/lib/api/api-types";
import type {
  AudiencePreview,
  AudienceRequest,
  EmailCampaign,
  EmailSuppression,
  EmailTemplateRecord,
} from "./email-types";

interface Paginated<T> {
  success: boolean;
  data: T[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export const emailManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmailTemplates: builder.query<
      ApiEnvelope<{ builtIn: EmailTemplateRecord[]; custom: EmailTemplateRecord[] }>,
      void
    >({
      query: () => "/email-management/templates",
      providesTags: [{ type: "EmailTemplate", id: "LIST" }],
    }),
    createEmailTemplate: builder.mutation<ApiEnvelope<EmailTemplateRecord>, { name: string; subject: string; html: string; text?: string }>({
      query: (body) => ({ url: "/email-management/templates", method: "POST", body }),
      invalidatesTags: [{ type: "EmailTemplate", id: "LIST" }],
    }),
    updateEmailTemplate: builder.mutation<ApiEnvelope<EmailTemplateRecord>, { id: string; body: Partial<{ name: string; subject: string; html: string; text: string }> }>({
      query: ({ id, body }) => ({ url: `/email-management/templates/${id}`, method: "PATCH", body }),
      invalidatesTags: [{ type: "EmailTemplate", id: "LIST" }],
    }),
    deleteEmailTemplate: builder.mutation<ApiEnvelope<{ id: string }>, string>({
      query: (id) => ({ url: `/email-management/templates/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "EmailTemplate", id: "LIST" }],
    }),
    previewEmailAudience: builder.mutation<ApiEnvelope<AudiencePreview>, AudienceRequest>({
      query: (body) => ({ url: "/email-management/preview", method: "POST", body }),
    }),
    createEmailCampaign: builder.mutation<
      ApiEnvelope<EmailCampaign>,
      AudienceRequest & { name: string; templateId?: string; subject?: string; html?: string; text?: string; replyTo?: string }
    >({
      query: (body) => ({ url: "/email-management/campaigns", method: "POST", body }),
      invalidatesTags: [{ type: "EmailCampaign", id: "LIST" }],
    }),
    getEmailCampaigns: builder.query<Paginated<EmailCampaign>, { page?: number; limit?: number } | void>({
      query: (params) => ({ url: "/email-management/campaigns", params: params || undefined }),
      providesTags: [{ type: "EmailCampaign", id: "LIST" }],
    }),
    getEmailSuppressions: builder.query<Paginated<EmailSuppression>, { page?: number; limit?: number; search?: string } | void>({
      query: (params) => ({ url: "/email-management/suppressions", params: params || undefined }),
      providesTags: [{ type: "EmailSuppression", id: "LIST" }],
    }),
    blockEmail: builder.mutation<ApiEnvelope<EmailSuppression>, { email: string; reason?: string }>({
      query: (body) => ({ url: "/email-management/suppressions/block", method: "POST", body }),
      invalidatesTags: [{ type: "EmailSuppression", id: "LIST" }],
    }),
    unblockEmail: builder.mutation<ApiEnvelope<{ email: string; unblocked: boolean }>, { email: string }>({
      query: (body) => ({ url: "/email-management/suppressions/unblock", method: "POST", body }),
      invalidatesTags: [{ type: "EmailSuppression", id: "LIST" }],
    }),
    getUserEmailPreference: builder.query<ApiEnvelope<{ email: string; blocked: boolean; reason?: string; blockedAt?: string }>, string>({
      query: (id) => `/user/${id}/email-preference`,
      providesTags: (_result, _error, id) => [{ type: "EmailSuppression", id: `USER:${id}` }],
    }),
    setUserEmailPreference: builder.mutation<ApiEnvelope<unknown>, { id: string; blocked: boolean; reason?: string }>({
      query: ({ id, ...body }) => ({ url: `/user/${id}/email-preference`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "EmailSuppression", id: "LIST" },
        { type: "EmailSuppression", id: `USER:${id}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEmailTemplatesQuery,
  useCreateEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  usePreviewEmailAudienceMutation,
  useCreateEmailCampaignMutation,
  useGetEmailCampaignsQuery,
  useGetEmailSuppressionsQuery,
  useBlockEmailMutation,
  useUnblockEmailMutation,
  useGetUserEmailPreferenceQuery,
  useSetUserEmailPreferenceMutation,
} = emailManagementApi;
