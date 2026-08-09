import type { Metadata } from "next";
import type { ReactNode } from "react";

import { GuestGuard } from "@/src/components/auth/guest-guard";

export const metadata: Metadata = {
  title: "Account access",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
