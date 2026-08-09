"use client";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
export default function useAuth() {
  const query = useGetMeQuery();
  return { ...query, user: query.data?.data ?? null };
}
