import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope, MessageEnvelope } from "@/src/lib/api/api-types";
import type { AccessRole, AssignableRole, RoleInput, RoleListEnvelope } from "./role-types";

export const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<RoleListEnvelope, void>({
      query: () => "/roles",
      providesTags: [{ type: "Role", id: "LIST" }],
    }),
    getAssignableRoles: builder.query<ApiEnvelope<AssignableRole[]>, void>({
      query: () => "/roles/assignable",
      providesTags: [{ type: "Role", id: "ASSIGNABLE" }],
    }),
    createRole: builder.mutation<ApiEnvelope<AccessRole>, Omit<RoleInput, "isAssignable">>({
      query: (body) => ({ url: "/roles", method: "POST", body }),
      invalidatesTags: [{ type: "Role", id: "LIST" }, { type: "Role", id: "ASSIGNABLE" }],
    }),
    updateRole: builder.mutation<ApiEnvelope<AccessRole>, { id: string; body: Partial<RoleInput> }>({
      query: ({ id, body }) => ({ url: `/roles/${id}`, method: "PATCH", body }),
      invalidatesTags: [{ type: "Role", id: "LIST" }, { type: "Role", id: "ASSIGNABLE" }, "Auth"],
    }),
    deleteRole: builder.mutation<MessageEnvelope, string>({
      query: (id) => ({ url: `/roles/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Role", id: "LIST" }, { type: "Role", id: "ASSIGNABLE" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRolesQuery,
  useGetAssignableRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
