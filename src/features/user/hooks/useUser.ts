"use client";

import { useGetUserByIdQuery } from "@/src/lib/features/users/user-api";
import type { AdminUser } from "@/src/lib/features/users/user-types";

type CmsUser = AdminUser & { name: string };

export function useUser() {
  return {
    useGetUserById: (id: string, options?: { skip?: boolean }) => {
      const query = useGetUserByIdQuery(id, { skip: options?.skip });
      const account = query.data?.data;
      const name = account?.email?.split("@")[0]?.replace(/[._-]+/g, " ").trim() || "QuantumFinix Admin";

      return {
        ...query,
        data: query.data && account
          ? { ...query.data, data: { ...account, name } as CmsUser }
          : query.data,
      };
    },
  };
}
