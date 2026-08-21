import { baseApi } from "@/src/lib/api/base-api";
import type {
  CreateHRInterviewInput,
  HRInterview,
  HRInterviewList,
  HRInterviewStatus,
  HRScheduleTemplate,
  HRScheduleTemplateInput,
  UpdateHRInterviewInput,
} from "./hr-recruitment-types";

type ListQuery = { page?: number; limit?: number; status?: HRInterviewStatus; applicationId?: string; jobId?: string; from?: string; to?: string };
type Envelope<T> = { success: boolean; data: T; message?: string };

export const hrRecruitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHRInterviews: builder.query<HRInterviewList, ListQuery | void>({
      query: (params) => ({ url: "/hr-management/recruitment/interviews", params: params || {} }),
      providesTags: (result) => [{ type: "HRInterview", id: "LIST" }, ...(result?.data.map((item) => ({ type: "HRInterview" as const, id: item.id })) ?? [])],
    }),
    getMyHRInterviews: builder.query<Envelope<HRInterview[]>, void>({
      query: () => "/hr-management/recruitment/my/interviews",
      providesTags: (result) => [{ type: "HRInterview", id: "MY" }, ...(result?.data.map((item) => ({ type: "HRInterview" as const, id: item.id })) ?? [])],
    }),
    selectHRInterviewSlot: builder.mutation<Envelope<HRInterview>, { id: string; slot: string }>({
      query: ({ id, slot }) => ({ url: `/hr-management/recruitment/interviews/${id}/select-slot`, method: "POST", body: { slot } }),
      invalidatesTags: (_r, _e, arg) => [{ type: "HRInterview", id: arg.id }, { type: "HRInterview", id: "MY" }, { type: "HRInterview", id: "LIST" }, { type: "JobApplication", id: "MINE" }],
    }),
    createHRInterview: builder.mutation<Envelope<HRInterview>, CreateHRInterviewInput>({
      query: (body) => ({ url: "/hr-management/recruitment/interviews", method: "POST", body }),
      invalidatesTags: [{ type: "HRInterview", id: "LIST" }, { type: "JobApplication", id: "ADMIN_LIST" }, "HROverview"],
    }),
    updateHRInterview: builder.mutation<Envelope<HRInterview>, { id: string; body: UpdateHRInterviewInput }>({
      query: ({ id, body }) => ({ url: `/hr-management/recruitment/interviews/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, arg) => [{ type: "HRInterview", id: arg.id }, { type: "HRInterview", id: "LIST" }, { type: "HRInterview", id: "MY" }, { type: "JobApplication", id: "ADMIN_LIST" }, "HROverview"],
    }),
    getHRInterviewTemplates: builder.query<Envelope<HRScheduleTemplate[]>, void>({
      query: () => "/hr-management/recruitment/interview-templates",
      providesTags: [{ type: "HRInterview", id: "TEMPLATES" }],
    }),
    createHRInterviewTemplate: builder.mutation<Envelope<HRScheduleTemplate>, HRScheduleTemplateInput>({
      query: (body) => ({ url: "/hr-management/recruitment/interview-templates", method: "POST", body }),
      invalidatesTags: [{ type: "HRInterview", id: "TEMPLATES" }],
    }),
    updateHRInterviewTemplate: builder.mutation<Envelope<HRScheduleTemplate>, { id: string; body: Partial<HRScheduleTemplateInput> }>({
      query: ({ id, body }) => ({ url: `/hr-management/recruitment/interview-templates/${id}`, method: "PATCH", body }),
      invalidatesTags: [{ type: "HRInterview", id: "TEMPLATES" }],
    }),
    deleteHRInterviewTemplate: builder.mutation<Envelope<{ id: string }>, string>({
      query: (id) => ({ url: `/hr-management/recruitment/interview-templates/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "HRInterview", id: "TEMPLATES" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHRInterviewsQuery,
  useGetMyHRInterviewsQuery,
  useSelectHRInterviewSlotMutation,
  useCreateHRInterviewMutation,
  useUpdateHRInterviewMutation,
  useGetHRInterviewTemplatesQuery,
  useCreateHRInterviewTemplateMutation,
  useUpdateHRInterviewTemplateMutation,
  useDeleteHRInterviewTemplateMutation,
} = hrRecruitmentApi;
