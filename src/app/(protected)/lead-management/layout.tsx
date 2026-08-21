import { Suspense, type ReactNode } from "react";
import { LeadManagementShell } from "@/src/components/lead-management/lead-management-shell";

function LeadManagementFallback() {
  return (
    <div className="qf-app-shell grid min-h-screen place-items-center text-sm">
      Loading Lead Management…
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LeadManagementFallback />}>
      <LeadManagementShell>{children}</LeadManagementShell>
    </Suspense>
  );
}