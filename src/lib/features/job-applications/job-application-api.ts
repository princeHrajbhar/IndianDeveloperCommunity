import { baseApi } from "@/src/lib/api/base-api";
import type {
  AdminApplicationsQuery,
  ApiEnvelope,
  ApplicationStatus,
  CreateApplicationInput,
  JobApplication,
  MessageEnvelope,
  UpdateOwnApplicationInput,
} from "./job-application-types";

function createApplicationFormData(input: CreateApplicationInput): FormData {
  const formData = new FormData();
  formData.set("jobId", input.jobId);
  formData.set("personalInfo", JSON.stringify(input.personalInfo));
  formData.set("education", JSON.stringify(input.education));
  formData.set("experience", JSON.stringify(input.experience));
  if (input.socialLinks) formData.set("socialLinks", JSON.stringify(input.socialLinks));
  if (input.screeningAnswers) formData.set("screeningAnswers", JSON.stringify(input.screeningAnswers));
  formData.set("declarationAccepted", "true");
  formData.set("resume", input.resume);
  if (input.photo) formData.set("photo", input.photo);
  if (input.coverLetter) formData.set("coverLetter", input.coverLetter);
  return formData;
}

export const jobApplicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkJobApplicationDuplicate: builder.query<
      ApiEnvelope<{ isDuplicate: boolean; canApply: boolean }>,
      string
    >({
      query: (jobId) => ({ url: "/job-applications/check-duplicate", params: { jobId } }),
      providesTags: [{ type: "JobApplication", id: "DUPLICATE" }],
    }),

    getMyJobApplication: builder.query<ApiEnvelope<JobApplication[]>, void>({
      query: () => "/job-applications/mine",
      providesTags: (result) => [
        { type: "JobApplication", id: "MINE" },
        ...(result?.data.map((application) => ({ type: "JobApplication" as const, id: application.id })) ?? []),
      ],
    }),

    getOwnJobApplication: builder.query<ApiEnvelope<JobApplication>, string>({
      query: (id) => `/job-applications/${id}`,
      keepUnusedDataFor: 0,
      providesTags: (_result, _error, id) => [{ type: "JobApplication", id }],
    }),

    createJobApplication: builder.mutation<
      ApiEnvelope<JobApplication> & { meta?: { confirmationEmailQueued?: boolean } },
      CreateApplicationInput
    >({
      query: (input) => ({
        url: "/job-applications",
        method: "POST",
        body: createApplicationFormData(input),
      }),
      invalidatesTags: [
        { type: "JobApplication", id: "MINE" },
        { type: "JobApplication", id: "DUPLICATE" },
        { type: "JobApplication", id: "ADMIN_LIST" },
      ],
    }),

    updateOwnJobApplication: builder.mutation<
      ApiEnvelope<JobApplication>,
      { id: string; body: UpdateOwnApplicationInput }
    >({
      query: ({ id, body }) => ({
        url: `/job-applications/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "JobApplication", id },
        { type: "JobApplication", id: "MINE" },
      ],
    }),

    withdrawOwnJobApplication: builder.mutation<ApiEnvelope<JobApplication>, string>({
      query: (id) => ({ url: `/job-applications/${id}/withdraw`, method: "PATCH" }),
      invalidatesTags: (_result, _error, id) => [
        { type: "JobApplication", id },
        { type: "JobApplication", id: "MINE" },
        { type: "JobApplication", id: "ADMIN_LIST" },
      ],
    }),

    adminListJobApplications: builder.query<
      {
        success: boolean;
        data: JobApplication[];
        pagination: { page: number; limit: number; total: number; totalPages: number };
      },
      AdminApplicationsQuery | void
    >({
      query: (params) => ({ url: "/job-applications/admin/list", params: params || undefined }),
      providesTags: (result) => [
        { type: "JobApplication", id: "ADMIN_LIST" },
        ...(result?.data.map((application) => ({
          type: "JobApplication" as const,
          id: application.id,
        })) ?? []),
      ],
    }),

    adminGetJobApplication: builder.query<ApiEnvelope<JobApplication>, string>({
      query: (id) => `/job-applications/admin/${id}`,
      keepUnusedDataFor: 0,
      providesTags: (_result, _error, id) => [{ type: "JobApplication", id }],
    }),

    adminUpdateJobApplicationStatus: builder.mutation<
      ApiEnvelope<JobApplication> & { meta?: { notificationEmailQueued?: boolean } },
      { id: string; status: ApplicationStatus; recruiterNotes?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/job-applications/admin/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "JobApplication", id },
        { type: "JobApplication", id: "MINE" },
        { type: "JobApplication", id: "ADMIN_LIST" },
      ],
    }),

    adminDeleteJobApplication: builder.mutation<MessageEnvelope, string>({
      query: (id) => ({ url: `/job-applications/admin/${id}`, method: "DELETE" }),
      invalidatesTags: [
        { type: "JobApplication", id: "ADMIN_LIST" },
        { type: "JobApplication", id: "MINE" },
        { type: "JobApplication", id: "DUPLICATE" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCheckJobApplicationDuplicateQuery,
  useGetMyJobApplicationQuery,
  useGetOwnJobApplicationQuery,
  useCreateJobApplicationMutation,
  useUpdateOwnJobApplicationMutation,
  useWithdrawOwnJobApplicationMutation,
  useAdminListJobApplicationsQuery,
  useAdminGetJobApplicationQuery,
  useAdminUpdateJobApplicationStatusMutation,
  useAdminDeleteJobApplicationMutation,
} = jobApplicationApi;
