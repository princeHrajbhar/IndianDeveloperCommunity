import { baseApi } from "@/src/lib/api/base-api";
import type { CreateHRScheduleInput, HRDirectoryRecipient, HRScheduleInvitation, HRScheduleOrganizer } from "./hr-scheduling-types";
type Envelope<T> = { success: boolean; data: T; message?: string };
export const hrSchedulingApi = baseApi.injectEndpoints({ endpoints: (builder) => ({
  getHRSchedules: builder.query<{ success: boolean; data: HRScheduleInvitation[]; pagination: { page: number; limit: number; total: number; totalPages: number } }, { page?: number; limit?: number; status?: string; kind?: string; search?: string } | void>({ query: (params) => ({ url: "/hr-management/scheduling", params: params || undefined }), providesTags: [{ type: "HRSchedule", id: "LIST" }] }),
  createHRSchedule: builder.mutation<Envelope<HRScheduleInvitation>, CreateHRScheduleInput>({ query: (body) => ({ url: "/hr-management/scheduling", method: "POST", body }), invalidatesTags: [{ type: "HRSchedule", id: "LIST" }] }),
  cancelHRSchedule: builder.mutation<Envelope<HRScheduleInvitation>, string>({ query: (id) => ({ url: `/hr-management/scheduling/${id}/cancel`, method: "PATCH", body: { status: "cancelled" } }), invalidatesTags: [{ type: "HRSchedule", id: "LIST" }] }),
  searchHRScheduleDirectory: builder.query<Envelope<HRDirectoryRecipient[]>, string>({ query: (search) => ({ url: "/hr-management/scheduling/directory", params: { search } }) }),
  getHRScheduleOrganizers: builder.query<Envelope<HRScheduleOrganizer[]>, string | void>({ query: (search) => ({ url: "/hr-management/scheduling/organizers", params: search ? { search } : undefined }) }),
  getPublicHRSchedule: builder.query<Envelope<HRScheduleInvitation>, string>({ query: (token) => `/hr-management/scheduling/public/${encodeURIComponent(token)}`, providesTags: (_result, _error, token) => [{ type: "HRSchedule", id: `PUBLIC:${token}` }] }),
  bookPublicHRSchedule: builder.mutation<Envelope<HRScheduleInvitation>, { token: string; slot: string }>({ query: ({ token, slot }) => ({ url: `/hr-management/scheduling/public/${encodeURIComponent(token)}/book`, method: "POST", body: { slot } }), invalidatesTags: (_result, _error, { token }) => [{ type: "HRSchedule", id: `PUBLIC:${token}` }] }),
}), overrideExisting: false });
export const { useGetHRSchedulesQuery, useCreateHRScheduleMutation, useCancelHRScheduleMutation, useSearchHRScheduleDirectoryQuery, useGetHRScheduleOrganizersQuery, useGetPublicHRScheduleQuery, useBookPublicHRScheduleMutation } = hrSchedulingApi;
