import { baseApi } from "@/src/lib/api/base-api";
import type {
  AdminJobDetail,
  ApiEnvelope,
  EmploymentType,
  JobDetail,
  JobCreateResponse,
  JobListItem,
  JobPagination,
  JobsQuery,
  JobStatistics,
  JobStatus,
  JobUpdatePayload,
  JobWritePayload,
  MessageEnvelope,
} from "./job-types";

interface JobListEnvelope extends ApiEnvelope<{
  jobs: JobListItem[];
  pagination: JobPagination;
}> {}

interface PageRequest {
  page?: number;
  limit?: number;
}

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobListEnvelope, JobsQuery | void>({
      query: (params) => ({ url: "/job", params: params || undefined }),
      providesTags: (result) => [
        { type: "Job", id: "LIST" },
        ...(result?.data.jobs.map((job) => ({ type: "Job" as const, id: job.id })) ?? []),
      ],
    }),

    getFeaturedJobs: builder.query<ApiEnvelope<JobListItem[]>, number | void>({
      query: (limit) => ({ url: "/job/featured", params: { limit: limit ?? 5 } }),
      providesTags: [{ type: "Job", id: "FEATURED" }],
    }),

    getUrgentJobs: builder.query<ApiEnvelope<JobListItem[]>, number | void>({
      query: (limit) => ({ url: "/job/urgent", params: { limit: limit ?? 5 } }),
      providesTags: [{ type: "Job", id: "URGENT" }],
    }),

    getJobById: builder.query<ApiEnvelope<JobDetail>, string>({
      query: (id) => `/job/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Job", id }],
    }),

    getJobBySlug: builder.query<ApiEnvelope<JobDetail>, string>({
      query: (slug) => `/job/slug/${encodeURIComponent(slug)}`,
      providesTags: (result) => result ? [{ type: "Job", id: result.data.id }] : [],
    }),

    getJobsByCompany: builder.query<JobListEnvelope, { companyId: string } & PageRequest>({
      query: ({ companyId, ...params }) => ({
        url: `/job/company/${companyId}`,
        params,
      }),
      providesTags: [{ type: "Job", id: "LIST" }],
    }),

    getJobsByEmploymentType: builder.query<
      JobListEnvelope,
      { employmentType: EmploymentType } & PageRequest
    >({
      query: ({ employmentType, ...params }) => ({
        url: `/job/employment-type/${encodeURIComponent(employmentType)}`,
        params,
      }),
      providesTags: [{ type: "Job", id: "LIST" }],
    }),

    getJobStatistics: builder.query<ApiEnvelope<JobStatistics>, void>({
      query: () => "/job/statistics",
      providesTags: ["JobStatistics"],
    }),

    getManagedJobById: builder.query<ApiEnvelope<AdminJobDetail>, string>({
      query: (id) => `/job/manage/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Job", id }],
    }),

    getJobsByRecruiter: builder.query<
      JobListEnvelope,
      { recruiterId: string } & PageRequest
    >({
      query: ({ recruiterId, ...params }) => ({
        url: `/job/recruiter/${recruiterId}`,
        params,
      }),
      providesTags: [{ type: "Job", id: "MANAGED_LIST" }],
    }),

    getJobsByStatus: builder.query<JobListEnvelope, { status: JobStatus } & PageRequest>({
      query: ({ status, ...params }) => ({
        url: `/job/status/${encodeURIComponent(status)}`,
        params,
      }),
      providesTags: [{ type: "Job", id: "MANAGED_LIST" }],
    }),

    createJob: builder.mutation<ApiEnvelope<JobCreateResponse>, JobWritePayload>({
      query: (body) => ({ url: "/job", method: "POST", body }),
      invalidatesTags: [
        { type: "Job", id: "LIST" },
        { type: "Job", id: "MANAGED_LIST" },
        "JobStatistics",
      ],
    }),

    updateJob: builder.mutation<
      ApiEnvelope<AdminJobDetail>,
      { id: string; body: JobUpdatePayload }
    >({
      query: ({ id, body }) => ({ url: `/job/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Job", id },
        { type: "Job", id: "LIST" },
        { type: "Job", id: "MANAGED_LIST" },
      ],
    }),

    updateJobStatus: builder.mutation<
      ApiEnvelope<AdminJobDetail>,
      { id: string; status: JobStatus }
    >({
      query: ({ id, status }) => ({
        url: `/job/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Job", id },
        { type: "Job", id: "LIST" },
        { type: "Job", id: "MANAGED_LIST" },
        "JobStatistics",
      ],
    }),

    deleteJob: builder.mutation<MessageEnvelope, string>({
      query: (id) => ({ url: `/job/${id}`, method: "DELETE" }),
      invalidatesTags: [
        { type: "Job", id: "LIST" },
        { type: "Job", id: "MANAGED_LIST" },
        "JobStatistics",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJobsQuery,
  useLazyGetJobsQuery,
  useGetFeaturedJobsQuery,
  useGetUrgentJobsQuery,
  useGetJobByIdQuery,
  useGetJobBySlugQuery,
  useGetJobsByCompanyQuery,
  useGetJobsByEmploymentTypeQuery,
  useGetJobStatisticsQuery,
  useGetManagedJobByIdQuery,
  useGetJobsByRecruiterQuery,
  useGetJobsByStatusQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useUpdateJobStatusMutation,
  useDeleteJobMutation,
} = jobApi;
