import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope, MessageEnvelope } from "@/src/lib/api/api-types";
import type { FileVisibility, ManagedFileDto, ManagedFilePagination, ManagedFileQuery } from "./file-types";

interface FileListEnvelope extends ApiEnvelope<ManagedFileDto[]> {
  pagination: ManagedFilePagination;
}

export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStorageProviders: builder.query<ApiEnvelope<string[]>, void>({
      query: () => "/files/providers",
      providesTags: [{ type: "File", id: "PROVIDERS" }],
    }),
    getManagedFiles: builder.query<FileListEnvelope, ManagedFileQuery | void>({
      query: (params) => ({ url: "/files/admin", params: params || undefined }),
      providesTags: (result) => [
        { type: "File", id: "LIST" },
        ...(result?.data.map((file) => ({ type: "File" as const, id: file.id ?? file._id })) ?? []),
      ],
    }),
    uploadManagedFile: builder.mutation<ApiEnvelope<ManagedFileDto>, FormData>({
      query: (body) => ({ url: "/files/admin", method: "POST", body }),
      invalidatesTags: [{ type: "File", id: "LIST" }],
    }),
    updateManagedFileSeo: builder.mutation<ApiEnvelope<ManagedFileDto>, { id: string; label?: string; title?: string; description?: string; altText?: string; caption?: string }>({
      query: ({ id, ...body }) => ({ url: `/files/admin/${id}/seo`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "File", id }, { type: "File", id: "LIST" }],
    }),
    migrateManagedFile: builder.mutation<ApiEnvelope<ManagedFileDto>, { id: string; targetProvider: string; visibility?: FileVisibility; deleteSourceAfterSuccess?: boolean }>({
      query: ({ id, ...body }) => ({ url: `/files/admin/${id}/migrate`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "File", id }, { type: "File", id: "LIST" }],
    }),
    deleteManagedFile: builder.mutation<MessageEnvelope, string>({
      query: (id) => ({ url: `/files/admin/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [{ type: "File", id }, { type: "File", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStorageProvidersQuery,
  useGetManagedFilesQuery,
  useUploadManagedFileMutation,
  useUpdateManagedFileSeoMutation,
  useMigrateManagedFileMutation,
  useDeleteManagedFileMutation,
} = fileApi;
