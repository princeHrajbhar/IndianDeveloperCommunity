import { baseApi } from "@/src/lib/api/base-api";
import type {
  CreateHRInterviewInput,
  HRInterview,
  HRInterviewList,
  HRInterviewStatus,
  UpdateHRInterviewInput,
} from "./hr-recruitment-types";

type ListQuery = {
  page?: number;
  limit?: number;
  status?: HRInterviewStatus;
  applicationId?: string;
  jobId?: string;
  from?: string;
  to?: string;
};

type Envelope<T> = { success: boolean; data: T; message?: string };

export const hrRecruitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHRInterviews: builder.query<HRInterviewList, ListQuery | void>({
      query: (params) => ({ url: "/hr-management/recruitment/interviews", params: params || {} }),
      providesTags: (result) => [
        { type: "HRInterview", id: "LIST" },
        ...(result?.data.map((item) => ({ type: "HRInterview" as const, id: item.id })) ?? []),
      ],
    }),
    createHRInterview: builder.mutation<Envelope<HRInterview>, CreateHRInterviewInput>({
      query: (body) => ({ url: "/hr-management/recruitment/interviews", method: "POST", body }),
      invalidatesTags: [
        { type: "HRInterview", id: "LIST" },
        { type: "JobApplication", id: "ADMIN_LIST" },
        "HROverview",
      ],
    }),
    updateHRInterview: builder.mutation<Envelope<HRInterview>, { id: string; body: UpdateHRInterviewInput }>({
      query: ({ id, body }) => ({ url: `/hr-management/recruitment/interviews/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "HRInterview", id: arg.id },
        { type: "HRInterview", id: "LIST" },
        { type: "JobApplication", id: "ADMIN_LIST" },
        "HROverview",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHRInterviewsQuery,
  useCreateHRInterviewMutation,
  useUpdateHRInterviewMutation,
} = hrRecruitmentApi;
