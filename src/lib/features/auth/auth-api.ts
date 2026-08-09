import { baseApi } from "@/src/lib/api/base-api";
import {
  authCheckFailed,
  authCheckStarted,
  sessionCleared,
  sessionReceived,
} from "@/src/lib/features/auth/auth-slice";
import type {
  ApiEnvelope,
  AuthSession,
  AuthUser,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  GoogleAuthRequest,
  LoginRequest,
  MessageEnvelope,
  RegisterRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from "@/src/lib/features/auth/auth-types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ApiEnvelope<{ email: string }>, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),

    verifyOtp: builder.mutation<
      ApiEnvelope<{ id: string; email: string; isVerified: boolean }>,
      VerifyOtpRequest
    >({
      query: (body) => ({ url: "/auth/verify-otp", method: "POST", body }),
    }),

    resendOtp: builder.mutation<MessageEnvelope, ResendOtpRequest>({
      query: (body) => ({ url: "/auth/resend-otp", method: "POST", body }),
    }),

    login: builder.mutation<ApiEnvelope<{ accessToken: string }>, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth", "Session", "Profile", "ProfileStats"],
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        dispatch(authCheckStarted());
        try {
          await queryFulfilled;
        } catch {
          dispatch(sessionCleared());
        }
      },
    }),

    googleAuth: builder.mutation<ApiEnvelope<{ accessToken: string }>, GoogleAuthRequest>({
      query: (body) => ({ url: "/auth/google", method: "POST", body }),
      invalidatesTags: ["Auth", "Session", "Profile", "ProfileStats"],
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        dispatch(authCheckStarted());
        try {
          await queryFulfilled;
        } catch {
          dispatch(sessionCleared());
        }
      },
    }),

    getMe: builder.query<ApiEnvelope<AuthUser>, void>({
      query: () => ({ url: "/auth/me", method: "GET", cache: "no-store" }),
      providesTags: [{ type: "Auth", id: "CURRENT" }],
      keepUnusedDataFor: 0,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(authCheckStarted());

        try {
          const { data } = await queryFulfilled;
          dispatch(sessionReceived(data.data));
        } catch (error) {
          if (hasAuthStatus(error, 401) || hasAuthStatus(error, 403)) {
            dispatch(sessionCleared());
          } else {
            dispatch(authCheckFailed());
          }
        }
      },
    }),

    refresh: builder.mutation<ApiEnvelope<{ accessToken: string }>, void>({
      query: () => ({ url: "/auth/refresh", method: "POST", cache: "no-store" }),
    }),

    logout: builder.mutation<MessageEnvelope, void>({
      query: () => ({ url: "/auth/logout", method: "POST", cache: "no-store" }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(sessionCleared());
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),

    logoutAll: builder.mutation<MessageEnvelope, void>({
      query: () => ({ url: "/auth/logout-all", method: "POST", cache: "no-store" }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(sessionCleared());
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),

    forgotPassword: builder.mutation<MessageEnvelope, ForgotPasswordRequest>({
      query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
    }),

    resetPassword: builder.mutation<MessageEnvelope, ResetPasswordRequest>({
      query: (body) => ({ url: "/auth/reset-password", method: "POST", body }),
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(sessionCleared());
          dispatch(baseApi.util.resetApiState());
        } catch {
          // RTK Query exposes the mutation error to the page.
        }
      },
    }),

    changePassword: builder.mutation<MessageEnvelope, ChangePasswordRequest>({
      query: (body) => ({ url: "/auth/change-password", method: "POST", body }),
      invalidatesTags: ["Auth", "Session"],
    }),

    getSessions: builder.query<ApiEnvelope<{ sessions: AuthSession[] }>, void>({
      query: () => ({ url: "/auth/sessions", method: "GET", cache: "no-store" }),
      providesTags: (result) => [
        { type: "Session", id: "LIST" },
        ...(result?.data.sessions.map((session) => ({
          type: "Session" as const,
          id: session.id,
        })) ?? []),
      ],
    }),
  }),
  overrideExisting: false,
});

function hasAuthStatus(error: unknown, status: number): boolean {
  if (!error || typeof error !== "object" || !("error" in error)) return false;
  const queryError = (error as { error?: { status?: unknown } }).error;
  return queryError?.status === status;
}

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useGoogleAuthMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useRefreshMutation,
  useLogoutMutation,
  useLogoutAllMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetSessionsQuery,
} = authApi;
