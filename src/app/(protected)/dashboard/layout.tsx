import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RequireAdmin } from "@/src/components/auth/require-admin";
import { AdminShell } from "@/src/components/admin/admin-shell";

export const metadata: Metadata = { title: "Dashboard", description: "QuantumFinix protected operations dashboard.", robots: { index: false, follow: false } };

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAdmin>
      <AdminShell>{children}</AdminShell>
    </RequireAdmin>
  );
}
