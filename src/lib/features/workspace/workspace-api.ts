import { baseApi } from "@/src/lib/api/base-api";
import type { Lead } from "../leads/lead-types";
import type { DevTask } from "../developer/developer-types";

export type WorkspaceNotification = {
  _id: string;
  type?: string;
  title: string;
  message: string;
  deepLink?: string;
  createdAt: string;
  readAt?: string;
};

type WorkspaceEnvelope = {
  success: boolean;
  data: {
    leads: Lead[];
    tasks: DevTask[];
    completedTasks: DevTask[];
    notifications: WorkspaceNotification[];
    performance: {
      assigned: number;
      done: number;
      inReview: number;
      points: number;
      avgProgress: number;
      overdue: number;
      completionRate: number;
    };
  };
};

export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspace: builder.query<WorkspaceEnvelope, void>({
      query: () => "/workspace",
      providesTags: ["Workspace"],
    }),
    markWorkspaceNotificationRead: builder.mutation<{ success: boolean; data: WorkspaceNotification }, string>({
      query: (id) => ({ url: `/workspace/notifications/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["Workspace"],
    }),
    markAllWorkspaceNotificationsRead: builder.mutation<{ success: boolean; data: { updated: number } }, void>({
      query: () => ({ url: "/workspace/notifications/read-all", method: "PATCH" }),
      invalidatesTags: ["Workspace"],
    }),
  }),
});

export const {
  useGetWorkspaceQuery,
  useMarkWorkspaceNotificationReadMutation,
  useMarkAllWorkspaceNotificationsReadMutation,
} = workspaceApi;
