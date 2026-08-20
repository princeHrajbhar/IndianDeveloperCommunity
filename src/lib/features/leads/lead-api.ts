import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope, MessageEnvelope } from "@/src/lib/api/api-types";
import type {
  CreateAdminLeadInput, CreateLeadInput, CreateLeadResult, Lead, LeadActivityType, LeadAssignee, LeadBulkEmailResult, LeadImportResult, LeadListQuery, LeadPagination, LeadPriority, LeadQualification, LeadStatistics, LeadStatus, UpdateLeadInput, UpdateLeadStatusInput,
} from "./lead-types";

interface LeadListEnvelope { success: boolean; data: Lead[]; pagination: LeadPagination; }
const leadTags = (id: string) => [{ type: "Lead" as const, id }, { type: "Lead" as const, id: "LIST" }, "LeadStatistics" as const];

export const leadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLead: builder.mutation<ApiEnvelope<CreateLeadResult>, CreateLeadInput>({ query: (body) => ({ url: "/lead", method: "POST", body }), invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics"] }),
    createAdminLead: builder.mutation<ApiEnvelope<Lead>, CreateAdminLeadInput>({ query: (body) => ({ url: "/lead/admin", method: "POST", body }), invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics"] }),
    getLeads: builder.query<LeadListEnvelope, LeadListQuery | void>({ query: (params) => ({ url: "/lead/admin", params: params || undefined }), providesTags: (result) => [{ type: "Lead", id: "LIST" }, ...(result?.data.map((lead) => ({ type: "Lead" as const, id: lead.id ?? lead._id })) ?? [])] }),
    getLeadStatistics: builder.query<ApiEnvelope<LeadStatistics>, void>({ query: () => "/lead/admin/statistics", providesTags: ["LeadStatistics"] }),
    getLeadAssignees: builder.query<ApiEnvelope<LeadAssignee[]>, void>({ query: () => "/lead/admin/assignees", providesTags: ["User"] }),
    getLeadDuplicates: builder.query<ApiEnvelope<Lead[]>, { email?: string; phone?: string; excludeId?: string }>({ query: (params) => ({ url: "/lead/admin/duplicates", params }) }),
    getLeadById: builder.query<ApiEnvelope<Lead>, string>({ query: (id) => `/lead/admin/${id}`, providesTags: (_result, _error, id) => [{ type: "Lead", id }] }),
    updateLead: builder.mutation<ApiEnvelope<Lead>, { id: string; body: UpdateLeadInput }>({ query: ({ id, body }) => ({ url: `/lead/admin/${id}`, method: "PATCH", body }), invalidatesTags: (_result, _error, { id }) => leadTags(id) }),
    updateLeadStatus: builder.mutation<ApiEnvelope<Lead>, { id: string; body: UpdateLeadStatusInput }>({ query: ({ id, body }) => ({ url: `/lead/admin/${id}/status`, method: "PATCH", body }), invalidatesTags: (_result, _error, { id }) => leadTags(id) }),
    assignLead: builder.mutation<ApiEnvelope<Lead>, { id: string; assignedTo: string | null }>({ query: ({ id, assignedTo }) => ({ url: `/lead/admin/${id}/assign`, method: "PATCH", body: { assignedTo } }), invalidatesTags: (_result, _error, { id }) => leadTags(id) }),
    bulkAssignLeads: builder.mutation<ApiEnvelope<{ matched: number; updated: number }>, { ids: string[]; assignedTo: string | null }>({ query: (body) => ({ url: "/lead/admin/bulk/assign", method: "PATCH", body }), invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics", "Workspace"] }),
    bulkRoundRobinLeads: builder.mutation<ApiEnvelope<{ matched: number; updated: number; assignments: Array<{ userId: string; email: string; count: number }> }>, { ids: string[] }>({ query: (body) => ({ url: "/lead/admin/bulk/round-robin", method: "PATCH", body }), invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics", "Workspace"] }),
    bulkUpdateLeads: builder.mutation<ApiEnvelope<{ matched: number; updated: number }>, { ids: string[]; status?: LeadStatus; priority?: LeadPriority; qualification?: LeadQualification; nextFollowUpAt?: string | null }>({ query: (body) => ({ url: "/lead/admin/bulk/update", method: "PATCH", body }), invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics"] }),
    communicateWithLead: builder.mutation<ApiEnvelope<Lead>, { id: string; kind: "email" | "followup"; subject?: string; message: string; nextFollowUpAt?: string }>({ query: ({ id, ...body }) => ({ url: `/lead/admin/${id}/communications`, method: "POST", body }), invalidatesTags: (_result, _error, { id }) => [...leadTags(id), "Workspace"] }),
    bulkEmailLeads: builder.mutation<ApiEnvelope<LeadBulkEmailResult>, { ids: string[]; subject: string; message: string; nextFollowUpAt?: string }>({ query: (body) => ({ url: "/lead/admin/bulk/email", method: "POST", body }), invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics"] }),
    addLeadNote: builder.mutation<ApiEnvelope<Lead>, { id: string; text: string }>({ query: ({ id, text }) => ({ url: `/lead/admin/${id}/notes`, method: "POST", body: { text } }), invalidatesTags: (_result, _error, { id }) => leadTags(id) }),
    addLeadActivity: builder.mutation<ApiEnvelope<Lead>, { id: string; type: LeadActivityType; title: string; description?: string; outcome?: string; dueAt?: string; completedAt?: string }>({ query: ({ id, ...body }) => ({ url: `/lead/admin/${id}/activities`, method: "POST", body }), invalidatesTags: (_result, _error, { id }) => leadTags(id) }),
    importLeads: builder.mutation<ApiEnvelope<LeadImportResult>, FormData>({ query: (body) => ({ url: "/lead/admin/import", method: "POST", body }), invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics"] }),
    deleteLead: builder.mutation<MessageEnvelope, string>({ query: (id) => ({ url: `/lead/admin/${id}`, method: "DELETE" }), invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics"] }),
  }),
  overrideExisting: false,
});

export const {
  useCreateLeadMutation, useCreateAdminLeadMutation, useGetLeadsQuery, useLazyGetLeadsQuery, useGetLeadStatisticsQuery, useGetLeadAssigneesQuery, useGetLeadDuplicatesQuery, useLazyGetLeadByIdQuery, useGetLeadByIdQuery, useUpdateLeadMutation, useUpdateLeadStatusMutation, useAssignLeadMutation, useBulkAssignLeadsMutation, useBulkRoundRobinLeadsMutation, useBulkUpdateLeadsMutation, useCommunicateWithLeadMutation, useBulkEmailLeadsMutation, useAddLeadNoteMutation, useAddLeadActivityMutation, useImportLeadsMutation, useDeleteLeadMutation,
} = leadApi;
