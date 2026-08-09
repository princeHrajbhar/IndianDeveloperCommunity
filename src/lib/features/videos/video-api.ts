import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope, MessageEnvelope } from "@/src/lib/api/api-types";
import type { VideoComment, VideoCommentListEnvelope, VideoDto, VideoInteraction, VideoListEnvelope, VideoQuery } from "./video-types";

export const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query<VideoListEnvelope, VideoQuery | void>({
      query: (params) => ({ url: "/videos", params: params || undefined }),
      providesTags: [{ type: "Video", id: "PUBLIC" }],
    }),
    getVideoBySlug: builder.query<ApiEnvelope<VideoDto>, string>({
      query: (slug) => `/videos/${encodeURIComponent(slug)}`,
      providesTags: (_result, _error, slug) => [{ type: "Video", id: slug }],
    }),
    getVideoComments: builder.query<VideoCommentListEnvelope, { slug: string; page?: number; limit?: number }>({
      query: ({ slug, ...params }) => ({ url: `/videos/${encodeURIComponent(slug)}/comments`, params }),
      providesTags: (_result, _error, { slug }) => [{ type: "Video", id: `comments:${slug}` }],
    }),
    getVideoInteraction: builder.query<ApiEnvelope<VideoInteraction>, string>({
      query: (slug) => `/videos/${encodeURIComponent(slug)}/interaction`,
      providesTags: (_result, _error, slug) => [{ type: "Video", id: `interaction:${slug}` }],
    }),
    recordVideoEngagement: builder.mutation<ApiEnvelope<VideoDto["analytics"]>, { slug: string; event: "view" | "watch" | "share"; watchSeconds?: number; completed?: boolean }>({
      query: ({ slug, ...body }) => ({ url: `/videos/${encodeURIComponent(slug)}/engagement`, method: "POST", body }),
      invalidatesTags: (_result, _error, { slug }) => [{ type: "Video", id: slug }, { type: "Video", id: "PUBLIC" }],
    }),
    likeVideo: builder.mutation<ApiEnvelope<VideoInteraction>, string>({
      query: (slug) => ({ url: `/videos/${encodeURIComponent(slug)}/like`, method: "POST" }),
      invalidatesTags: (_result, _error, slug) => [{ type: "Video", id: slug }, { type: "Video", id: `interaction:${slug}` }, { type: "Video", id: "PUBLIC" }],
    }),
    unlikeVideo: builder.mutation<ApiEnvelope<VideoInteraction>, string>({
      query: (slug) => ({ url: `/videos/${encodeURIComponent(slug)}/like`, method: "DELETE" }),
      invalidatesTags: (_result, _error, slug) => [{ type: "Video", id: slug }, { type: "Video", id: `interaction:${slug}` }, { type: "Video", id: "PUBLIC" }],
    }),
    addVideoComment: builder.mutation<ApiEnvelope<VideoComment>, { slug: string; content: string }>({
      query: ({ slug, content }) => ({ url: `/videos/${encodeURIComponent(slug)}/comments`, method: "POST", body: { content } }),
      invalidatesTags: (_result, _error, { slug }) => [{ type: "Video", id: slug }, { type: "Video", id: `comments:${slug}` }, { type: "Video", id: "PUBLIC" }],
    }),
    deleteVideoComment: builder.mutation<MessageEnvelope, { slug: string; commentId: string }>({
      query: ({ slug, commentId }) => ({ url: `/videos/${encodeURIComponent(slug)}/comments/${commentId}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, { slug }) => [{ type: "Video", id: slug }, { type: "Video", id: `comments:${slug}` }],
    }),
    getAdminVideos: builder.query<VideoListEnvelope, VideoQuery | void>({
      query: (params) => ({ url: "/videos/admin/list/all", params: params || undefined }),
      providesTags: (result) => [{ type: "Video", id: "LIST" }, ...(result?.data.map((video) => ({ type: "Video" as const, id: video.id ?? video._id })) ?? [])],
    }),
    createVideo: builder.mutation<ApiEnvelope<VideoDto>, FormData>({
      query: (body) => ({ url: "/videos/admin", method: "POST", body }),
      invalidatesTags: [{ type: "Video", id: "LIST" }, { type: "Video", id: "PUBLIC" }],
    }),
    updateVideo: builder.mutation<ApiEnvelope<VideoDto>, { id: string; body: Partial<VideoDto> | FormData }>({
      query: ({ id, body }) => ({ url: `/videos/admin/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Video", id }, { type: "Video", id: "LIST" }, { type: "Video", id: "PUBLIC" }],
    }),
    deleteVideo: builder.mutation<MessageEnvelope, string>({
      query: (id) => ({ url: `/videos/admin/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Video", id: "LIST" }, { type: "Video", id: "PUBLIC" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetVideosQuery, useGetVideoBySlugQuery, useGetVideoCommentsQuery, useGetVideoInteractionQuery,
  useRecordVideoEngagementMutation, useLikeVideoMutation, useUnlikeVideoMutation, useAddVideoCommentMutation,
  useDeleteVideoCommentMutation, useGetAdminVideosQuery, useCreateVideoMutation, useUpdateVideoMutation, useDeleteVideoMutation,
} = videoApi;
