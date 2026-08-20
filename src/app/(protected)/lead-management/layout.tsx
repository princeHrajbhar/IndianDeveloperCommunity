import type { ReactNode } from "react";
import { LeadManagementShell } from "@/src/components/lead-management/lead-management-shell";
export default function Layout({ children }: { children: ReactNode }) { return <LeadManagementShell>{children}</LeadManagementShell>; }
