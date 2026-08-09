import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope, MessageEnvelope } from "@/src/lib/api/api-types";
import type { CreateIpBlockInput, IpBlock } from "./security-types";

export const securityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIpBlocks: builder.query<ApiEnvelope<IpBlock[]>, void>({
      query: () => "/security/ip-blocks",
      providesTags: [{ type: "Security", id: "IP_BLOCKS" }],
    }),
    createIpBlock: builder.mutation<ApiEnvelope<IpBlock>, CreateIpBlockInput>({
      query: (body) => ({ url: "/security/ip-blocks", method: "POST", body }),
      invalidatesTags: [{ type: "Security", id: "IP_BLOCKS" }],
    }),
    updateIpBlock: builder.mutation<ApiEnvelope<IpBlock>, { id: string; body: Partial<CreateIpBlockInput> }>({
      query: ({ id, body }) => ({ url: `/security/ip-blocks/${id}`, method: "PATCH", body }),
      invalidatesTags: [{ type: "Security", id: "IP_BLOCKS" }],
    }),
    deleteIpBlock: builder.mutation<MessageEnvelope, string>({
      query: (id) => ({ url: `/security/ip-blocks/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Security", id: "IP_BLOCKS" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetIpBlocksQuery, useCreateIpBlockMutation, useUpdateIpBlockMutation, useDeleteIpBlockMutation } = securityApi;
