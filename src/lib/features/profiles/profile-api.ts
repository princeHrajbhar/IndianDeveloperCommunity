import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope, MessageEnvelope } from "@/src/lib/api/api-types";
import type {
  CreateProfileInput,
  EducationInput,
  ExperienceInput,
  Profile,
  ProfileScope,
  ProfileStatsResponse,
  UpdateProfileInput,
} from "./profile-types";

const scopeId = (userId?: string) => userId ?? "SELF";
const profilePath = (userId?: string) =>
  userId ? `/profile/admin/${userId}` : "/profile";

const profileInvalidation = (userId?: string) => [
  { type: "Profile" as const, id: scopeId(userId) },
  { type: "ProfileStats" as const, id: scopeId(userId) },
];

function imageFormData(field: "profilePicture" | "coverPhoto", file: File, altText?: string) {
  const body = new FormData();
  body.set(field, file);
  if (altText?.trim()) body.set("altText", altText.trim());
  return body;
}

function resumeFormData(file: File) {
  const body = new FormData();
  body.set("resume", file);
  return body;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiEnvelope<Profile>, ProfileScope | void>({
      query: (scope) => profilePath(scope?.userId),
      providesTags: (_result, _error, scope) => [
        { type: "Profile", id: scopeId(scope?.userId) },
      ],
    }),

    createProfile: builder.mutation<
      ApiEnvelope<Profile>,
      { body: CreateProfileInput; userId?: string }
    >({
      query: ({ body, userId }) => ({
        url: profilePath(userId),
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    updateProfile: builder.mutation<
      ApiEnvelope<Profile>,
      { body: UpdateProfileInput; userId?: string }
    >({
      query: ({ body, userId }) => ({
        url: profilePath(userId),
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    deleteProfile: builder.mutation<MessageEnvelope, ProfileScope | void>({
      query: (scope) => ({
        url: profilePath(scope?.userId),
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, scope) =>
        profileInvalidation(scope?.userId),
    }),

    getProfileStats: builder.query<
      ApiEnvelope<ProfileStatsResponse>,
      ProfileScope | void
    >({
      query: (scope) => `${profilePath(scope?.userId)}/stats`,
      providesTags: (_result, _error, scope) => [
        { type: "ProfileStats", id: scopeId(scope?.userId) },
      ],
    }),

    uploadProfilePicture: builder.mutation<
      ApiEnvelope<Profile>,
      { file: File; altText?: string; userId?: string }
    >({
      query: ({ file, altText, userId }) => ({
        url: `${profilePath(userId)}/profile-picture`,
        method: "POST",
        body: imageFormData("profilePicture", file, altText),
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    deleteProfilePicture: builder.mutation<
      ApiEnvelope<Profile>,
      ProfileScope | void
    >({
      query: (scope) => ({
        url: `${profilePath(scope?.userId)}/profile-picture`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, scope) =>
        profileInvalidation(scope?.userId),
    }),

    uploadCoverPhoto: builder.mutation<
      ApiEnvelope<Profile>,
      { file: File; altText?: string; userId?: string }
    >({
      query: ({ file, altText, userId }) => ({
        url: `${profilePath(userId)}/cover-photo`,
        method: "POST",
        body: imageFormData("coverPhoto", file, altText),
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    deleteCoverPhoto: builder.mutation<
      ApiEnvelope<Profile>,
      ProfileScope | void
    >({
      query: (scope) => ({
        url: `${profilePath(scope?.userId)}/cover-photo`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, scope) =>
        profileInvalidation(scope?.userId),
    }),

    uploadResume: builder.mutation<
      ApiEnvelope<Profile>,
      { file: File; userId?: string }
    >({
      query: ({ file, userId }) => ({
        url: `${profilePath(userId)}/resume`,
        method: "POST",
        body: resumeFormData(file),
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    deleteResume: builder.mutation<ApiEnvelope<Profile>, ProfileScope | void>({
      query: (scope) => ({
        url: `${profilePath(scope?.userId)}/resume`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, scope) =>
        profileInvalidation(scope?.userId),
    }),

    addEducation: builder.mutation<
      ApiEnvelope<Profile>,
      { body: EducationInput; userId?: string }
    >({
      query: ({ body, userId }) => ({
        url: `${profilePath(userId)}/education`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    updateEducation: builder.mutation<
      ApiEnvelope<Profile>,
      {
        educationId: string;
        body: Partial<EducationInput>;
        userId?: string;
      }
    >({
      query: ({ educationId, body, userId }) => ({
        url: `${profilePath(userId)}/education/${educationId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    deleteEducation: builder.mutation<
      ApiEnvelope<Profile>,
      { educationId: string; userId?: string }
    >({
      query: ({ educationId, userId }) => ({
        url: `${profilePath(userId)}/education/${educationId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    addExperience: builder.mutation<
      ApiEnvelope<Profile>,
      { body: ExperienceInput; userId?: string }
    >({
      query: ({ body, userId }) => ({
        url: `${profilePath(userId)}/experience`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    updateExperience: builder.mutation<
      ApiEnvelope<Profile>,
      {
        experienceId: string;
        body: Partial<ExperienceInput>;
        userId?: string;
      }
    >({
      query: ({ experienceId, body, userId }) => ({
        url: `${profilePath(userId)}/experience/${experienceId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    deleteExperience: builder.mutation<
      ApiEnvelope<Profile>,
      { experienceId: string; userId?: string }
    >({
      query: ({ experienceId, userId }) => ({
        url: `${profilePath(userId)}/experience/${experienceId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    updateSkills: builder.mutation<
      ApiEnvelope<Profile>,
      { skills: string[]; userId?: string }
    >({
      query: ({ skills, userId }) => ({
        url: `${profilePath(userId)}/skills`,
        method: "PATCH",
        body: { skills },
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),

    updateLanguages: builder.mutation<
      ApiEnvelope<Profile>,
      { languages: string[]; userId?: string }
    >({
      query: ({ languages, userId }) => ({
        url: `${profilePath(userId)}/languages`,
        method: "PATCH",
        body: { languages },
      }),
      invalidatesTags: (_result, _error, { userId }) => profileInvalidation(userId),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useGetProfileStatsQuery,
  useUploadProfilePictureMutation,
  useDeleteProfilePictureMutation,
  useUploadCoverPhotoMutation,
  useDeleteCoverPhotoMutation,
  useUploadResumeMutation,
  useDeleteResumeMutation,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useUpdateSkillsMutation,
  useUpdateLanguagesMutation,
} = profileApi;
