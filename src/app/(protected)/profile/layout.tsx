import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RequireAuth } from "@/src/components/auth/require-auth";
import { ProfileShell } from "@/src/components/profile/profile-shell";

export const metadata: Metadata = {
  title: "Account workspace",
  description: "Manage your QuantumFinix profile, courses, applications, documents and account security.",
  robots: { index: false, follow: false },
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <ProfileShell>{children}</ProfileShell>
    </RequireAuth>
  );
}
