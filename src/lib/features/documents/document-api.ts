import { baseApi } from "@/src/lib/api/base-api";
import type {
  BulkIssueDocumentInput,
  DataEnvelope,
  DocumentIssue,
  DocumentTemplate,
  IssueDocumentInput,
  ListEnvelope,
  TemplateInput,
} from "./document-types";

const idOf = (value: { id?: string; _id?: string }) => value.id ?? value._id ?? "";

export const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDocumentTemplates: builder.query<ListEnvelope<DocumentTemplate>, { page?: number; limit?: number; status?: string; search?: string } | void>({
      query: (query) => ({ url: "/documents/templates", params: query || undefined }),
      providesTags: (result) => [
        { type: "DocumentTemplate", id: "LIST" },
        ...(result?.data.map((item) => ({ type: "DocumentTemplate" as const, id: idOf(item) })) ?? []),
      ],
    }),
    getDocumentTemplate: builder.query<DataEnvelope<DocumentTemplate>, string>({
      query: (id) => `/documents/templates/${id}`,
      providesTags: (_result, _error, id) => [{ type: "DocumentTemplate", id }],
    }),
    createDocumentTemplate: builder.mutation<DataEnvelope<DocumentTemplate>, TemplateInput>({
      query: (body) => ({ url: "/documents/templates", method: "POST", body }),
      invalidatesTags: [{ type: "DocumentTemplate", id: "LIST" }],
    }),
    updateDocumentTemplate: builder.mutation<DataEnvelope<DocumentTemplate>, { id: string; body: Partial<TemplateInput> }>({
      query: ({ id, body }) => ({ url: `/documents/templates/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "DocumentTemplate", id },
        { type: "DocumentTemplate", id: "LIST" },
      ],
    }),
    deleteDocumentTemplate: builder.mutation<DataEnvelope<{ deleted: boolean; archived: boolean; id: string }>, string>({
      query: (id) => ({ url: `/documents/templates/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [
        { type: "DocumentTemplate", id },
        { type: "DocumentTemplate", id: "LIST" },
      ],
    }),
    previewDocumentTemplate: builder.mutation<DataEnvelope<{ renderedHtml: string; stylesCss: string; variables: Record<string, string> }>, { id: string; recipientUserId?: string; variables?: Record<string, string> }>({
      query: ({ id, ...body }) => ({ url: `/documents/templates/${id}/preview`, method: "POST", body }),
    }),
    getIssuedDocuments: builder.query<ListEnvelope<DocumentIssue>, { page?: number; limit?: number; search?: string; status?: string } | void>({
      query: (query) => ({ url: "/documents/issues", params: query || undefined }),
      providesTags: (result) => [
        { type: "DocumentIssue", id: "ADMIN_LIST" },
        ...(result?.data.map((item) => ({ type: "DocumentIssue" as const, id: idOf(item) })) ?? []),
      ],
    }),
    getIssuedDocument: builder.query<DataEnvelope<DocumentIssue>, string>({
      query: (id) => `/documents/issues/${id}`,
      providesTags: (_result, _error, id) => [{ type: "DocumentIssue", id }],
    }),
    issueDocument: builder.mutation<DataEnvelope<DocumentIssue>, IssueDocumentInput>({
      query: (body) => ({ url: "/documents/issues", method: "POST", body }),
      invalidatesTags: [
        { type: "DocumentIssue", id: "ADMIN_LIST" },
        { type: "DocumentIssue", id: "MY_LIST" },
      ],
    }),
    bulkIssueDocuments: builder.mutation<DataEnvelope<{ batchId: string; issued: number; failed: number; results: Array<{ recipientUserId: string; issueId?: string; success: boolean; message?: string }> }>, BulkIssueDocumentInput>({
      query: (body) => ({ url: "/documents/issues/bulk", method: "POST", body }),
      invalidatesTags: [
        { type: "DocumentIssue", id: "ADMIN_LIST" },
        { type: "DocumentIssue", id: "MY_LIST" },
      ],
    }),
    revokeIssuedDocument: builder.mutation<DataEnvelope<DocumentIssue>, { id: string; reason: string }>({
      query: ({ id, reason }) => ({ url: `/documents/issues/${id}/revoke`, method: "PATCH", body: { reason } }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "DocumentIssue", id },
        { type: "DocumentIssue", id: "ADMIN_LIST" },
        { type: "DocumentIssue", id: "MY_LIST" },
      ],
    }),
    getMyDocuments: builder.query<ListEnvelope<DocumentIssue>, { page?: number; limit?: number; status?: string } | void>({
      query: (query) => ({ url: "/documents/me", params: query || undefined }),
      providesTags: (result) => [
        { type: "DocumentIssue", id: "MY_LIST" },
        ...(result?.data.map((item) => ({ type: "DocumentIssue" as const, id: idOf(item) })) ?? []),
      ],
    }),
    getMyDocument: builder.query<DataEnvelope<DocumentIssue>, string>({
      query: (id) => `/documents/me/${id}`,
      providesTags: (_result, _error, id) => [{ type: "DocumentIssue", id }],
    }),
    submitDocumentAcknowledgement: builder.mutation<DataEnvelope<DocumentIssue>, { id: string; values: Record<string, string | boolean>; message?: string; signedDocument?: File }>({
      query: ({ id, values, message, signedDocument }) => {
        const body = new FormData();
        body.append("payload", JSON.stringify({ values, ...(message ? { message } : {}) }));
        if (signedDocument) body.append("signedDocument", signedDocument);
        return { url: `/documents/me/${id}/acknowledge`, method: "POST", body };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "DocumentIssue", id },
        { type: "DocumentIssue", id: "MY_LIST" },
        { type: "DocumentIssue", id: "ADMIN_LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDocumentTemplatesQuery,
  useGetDocumentTemplateQuery,
  useCreateDocumentTemplateMutation,
  useUpdateDocumentTemplateMutation,
  useDeleteDocumentTemplateMutation,
  usePreviewDocumentTemplateMutation,
  useGetIssuedDocumentsQuery,
  useGetIssuedDocumentQuery,
  useIssueDocumentMutation,
  useBulkIssueDocumentsMutation,
  useRevokeIssuedDocumentMutation,
  useGetMyDocumentsQuery,
  useGetMyDocumentQuery,
  useSubmitDocumentAcknowledgementMutation,
} = documentApi;
