import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope, MessageEnvelope } from "@/src/lib/api/api-types";
import type {
  CreateAdminLeadInput,
  CreateLeadInput,
  CreateLeadResult,
  Lead,
  LeadListQuery,
  LeadPagination,
  LeadStatistics,
  UpdateLeadInput,
  UpdateLeadStatusInput,
} from "./lead-types";

interface LeadListEnvelope {
  success: boolean;
  data: Lead[];
  pagination: LeadPagination;
}

const leadTags = (id: string) => [
  { type: "Lead" as const, id },
  { type: "Lead" as const, id: "LIST" },
  "LeadStatistics" as const,
];

export const leadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLead: builder.mutation<ApiEnvelope<CreateLeadResult>, CreateLeadInput>({
      query: (body) => ({ url: "/lead", method: "POST", body }),
      invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics"],
    }),

    createAdminLead: builder.mutation<ApiEnvelope<Lead>, CreateAdminLeadInput>({
      query: (body) => ({ url: "/lead/admin", method: "POST", body }),
      invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics"],
    }),

    getLeads: builder.query<LeadListEnvelope, LeadListQuery | void>({
      query: (params) => ({
        url: "/lead/admin",
        params: params || undefined,
      }),
      providesTags: (result) => [
        { type: "Lead", id: "LIST" },
        ...(result?.data.map((lead) => ({
          type: "Lead" as const,
          id: lead.id ?? lead._id,
        })) ?? []),
      ],
    }),

    getLeadStatistics: builder.query<ApiEnvelope<LeadStatistics>, void>({
      query: () => "/lead/admin/statistics",
      providesTags: ["LeadStatistics"],
    }),

    getLeadById: builder.query<ApiEnvelope<Lead>, string>({
      query: (id) => `/lead/admin/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Lead", id }],
    }),

    updateLead: builder.mutation<
      ApiEnvelope<Lead>,
      { id: string; body: UpdateLeadInput }
    >({
      query: ({ id, body }) => ({
        url: `/lead/admin/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => leadTags(id),
    }),

    updateLeadStatus: builder.mutation<
      ApiEnvelope<Lead>,
      { id: string; body: UpdateLeadStatusInput }
    >({
      query: ({ id, body }) => ({
        url: `/lead/admin/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => leadTags(id),
    }),

    assignLead: builder.mutation<
      ApiEnvelope<Lead>,
      { id: string; assignedTo: string | null }
    >({
      query: ({ id, assignedTo }) => ({
        url: `/lead/admin/${id}/assign`,
        method: "PATCH",
        body: { assignedTo },
      }),
      invalidatesTags: (_result, _error, { id }) => leadTags(id),
    }),

    addLeadNote: builder.mutation<
      ApiEnvelope<Lead>,
      { id: string; text: string }
    >({
      query: ({ id, text }) => ({
        url: `/lead/admin/${id}/notes`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Lead", id },
        { type: "Lead", id: "LIST" },
      ],
    }),

    deleteLead: builder.mutation<MessageEnvelope, string>({
      query: (id) => ({
        url: `/lead/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Lead", id: "LIST" }, "LeadStatistics"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateLeadMutation,
  useCreateAdminLeadMutation,
  useGetLeadsQuery,
  useLazyGetLeadsQuery,
  useGetLeadStatisticsQuery,
  useGetLeadByIdQuery,
  useLazyGetLeadByIdQuery,
  useUpdateLeadMutation,
  useUpdateLeadStatusMutation,
  useAssignLeadMutation,
  useAddLeadNoteMutation,
  useDeleteLeadMutation,
} = leadApi;
