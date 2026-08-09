import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope, MessageEnvelope } from "@/src/lib/api/api-types";
import type {
  ServicePageDto,
  ServicePageListEnvelope,
  ServicePageQuery,
} from "./service-page-types";

export const servicePageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublishedServicePages: builder.query<ServicePageListEnvelope, ServicePageQuery | void>({
      query: (params) => ({ url: "/service-pages", params: params || undefined }),
      providesTags: [{ type: "ServicePage", id: "PUBLIC" }],
    }),
    getPublishedServicePage: builder.query<ApiEnvelope<ServicePageDto>, string>({
      query: (slug) => `/service-pages/${encodeURIComponent(slug)}`,
      providesTags: (_result, _error, slug) => [{ type: "ServicePage", id: `slug:${slug}` }],
    }),
    getAdminServicePages: builder.query<ServicePageListEnvelope, ServicePageQuery | void>({
      query: (params) => ({ url: "/service-pages/admin/list/all", params: params || undefined }),
      providesTags: (result) => [
        { type: "ServicePage", id: "LIST" },
        ...(result?.data.map((item) => ({
          type: "ServicePage" as const,
          id: item.id ?? item._id,
        })) ?? []),
      ],
    }),
    getAdminServicePage: builder.query<ApiEnvelope<ServicePageDto>, string>({
      query: (id) => `/service-pages/admin/${id}`,
      providesTags: (_result, _error, id) => [{ type: "ServicePage", id }],
    }),
    createServicePage: builder.mutation<ApiEnvelope<ServicePageDto>, FormData>({
      query: (body) => ({ url: "/service-pages/admin", method: "POST", body }),
      invalidatesTags: [
        { type: "ServicePage", id: "LIST" },
        { type: "ServicePage", id: "PUBLIC" },
      ],
    }),
    updateServicePage: builder.mutation<ApiEnvelope<ServicePageDto>, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ url: `/service-pages/admin/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ServicePage", id },
        { type: "ServicePage", id: "LIST" },
        { type: "ServicePage", id: "PUBLIC" },
      ],
    }),
    deleteServicePage: builder.mutation<MessageEnvelope, string>({
      query: (id) => ({ url: `/service-pages/admin/${id}`, method: "DELETE" }),
      invalidatesTags: [
        { type: "ServicePage", id: "LIST" },
        { type: "ServicePage", id: "PUBLIC" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPublishedServicePagesQuery,
  useGetPublishedServicePageQuery,
  useGetAdminServicePagesQuery,
  useLazyGetAdminServicePageQuery,
  useCreateServicePageMutation,
  useUpdateServicePageMutation,
  useDeleteServicePageMutation,
} = servicePageApi;
