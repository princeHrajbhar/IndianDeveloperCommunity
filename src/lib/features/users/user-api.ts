import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope } from "@/src/lib/api/api-types";
import type {
  AdminSession,
  AdminUser,
  CreateUserInput,
  UpdateUserInput,
  UserListQuery,
  UserLockStatus,
  UserPagination,
} from "./user-types";

interface UserListEnvelope {
  success: boolean;
  data: AdminUser[];
  pagination: UserPagination;
}

const userMutationTags = (id: string) => [
  { type: "User" as const, id },
  { type: "User" as const, id: "LIST" },
  "Auth" as const,
];

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserListEnvelope, UserListQuery | void>({
      query: (params) => ({
        url: "/user",
        params: params || undefined,
      }),
      providesTags: (result) => [
        { type: "User", id: "LIST" },
        ...(result?.data.map((user) => ({
          type: "User" as const,
          id: user.id ?? user._id,
        })) ?? []),
      ],
    }),

    getUserById: builder.query<ApiEnvelope<AdminUser>, string>({
      query: (id) => `/user/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    getUserSessions: builder.query<ApiEnvelope<AdminSession[]>, string>({
      query: (id) => `/user/${id}/sessions`,
      providesTags: (_result, _error, id) => [{ type: "Session", id: `USER:${id}` }],
    }),

    revokeUserSession: builder.mutation<ApiEnvelope<{ id: string }>, { userId: string; sessionId: string }>({
      query: ({ userId, sessionId }) => ({
        url: `/user/${userId}/sessions/${sessionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { userId }) => [{ type: "Session", id: `USER:${userId}` }],
    }),

    revokeAllUserSessions: builder.mutation<ApiEnvelope<{ revokedCount: number }>, string>({
      query: (userId) => ({ url: `/user/${userId}/sessions`, method: "DELETE" }),
      invalidatesTags: (_result, _error, userId) => [{ type: "Session", id: `USER:${userId}` }],
    }),

    getUserLockStatus: builder.query<ApiEnvelope<UserLockStatus>, string>({
      query: (email) => `/user/lock-status/${encodeURIComponent(email)}`,
      providesTags: (_result, _error, email) => [
        { type: "User", id: `LOCK:${email.toLowerCase()}` },
      ],
    }),

    createUser: builder.mutation<ApiEnvelope<AdminUser>, CreateUserInput>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation<
      ApiEnvelope<AdminUser>,
      { id: string; body: UpdateUserInput }
    >({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => userMutationTags(id),
    }),

    setUserVerification: builder.mutation<
      ApiEnvelope<AdminUser>,
      { id: string; isVerified: boolean }
    >({
      query: ({ id, isVerified }) => ({
        url: `/user/${id}/verify`,
        method: "PATCH",
        body: { isVerified },
      }),
      invalidatesTags: (_result, _error, { id }) => userMutationTags(id),
    }),

    unlockUser: builder.mutation<ApiEnvelope<AdminUser>, string>({
      query: (id) => ({
        url: `/user/${id}/unlock`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => userMutationTags(id),
    }),

    deleteUser: builder.mutation<
      ApiEnvelope<{ id: string }>,
      string
    >({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }, "Auth"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetUserSessionsQuery,
  useRevokeUserSessionMutation,
  useRevokeAllUserSessionsMutation,
  useGetUserLockStatusQuery,
  useLazyGetUserLockStatusQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useSetUserVerificationMutation,
  useUnlockUserMutation,
  useDeleteUserMutation,
} = userApi;
