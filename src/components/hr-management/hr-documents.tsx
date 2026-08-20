"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Building2, FileText, Users } from "lucide-react";
import { DocumentsPanel } from "@/src/components/admin/documents-panel";
import { useGetHREmployeesQuery } from "@/src/lib/features/hr-management/hr-management-api";
import { Card, HRPageTitle } from "./hr-ui";

export function HRDocumentsWorkspace() {
  const searchParams = useSearchParams();
  const department = searchParams.get("department")?.trim() || "";
  const employees = useGetHREmployeesQuery(department ? { page: 1, limit: 200, department } : { page: 1, limit: 200 });
  const scopedEmployees = employees.data?.data ?? [];
  const recipientUserIds = department
    ? scopedEmployees.map((employee) => employee.userId).filter((value): value is string => Boolean(value))
    : undefined;

  return (
    <>
      <HRPageTitle
        eyebrow="HR Documents"
        title="Create, issue and audit"
        accent="employee documents."
        description="The complete document manager now lives inside HRMS. Build templates, issue single or bulk letters, notify recipients, collect acknowledgements, print, download and audit issued documents without returning to the general Admin dashboard."
        actions={department ? (
          <Link href="/hr-management/documents" className="qf-secondary-button inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-black">
            <Users className="h-4 w-4" /> All departments
          </Link>
        ) : undefined}
      />

      {department ? (
        <Card className="mb-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="qf-status-info grid h-10 w-10 place-items-center rounded-xl border"><Building2 className="h-5 w-5" /></span>
            <div>
              <p className="text-xs font-black uppercase tracking-[.14em] text-[var(--qf-primary-text)]">Department scope</p>
              <p className="qf-text mt-1 text-sm font-black">{department} · {scopedEmployees.length} employee record(s)</p>
            </div>
          </div>
          <Link href={`/hr-management/departments?department=${encodeURIComponent(department)}`} className="qf-secondary-button inline-flex h-10 items-center gap-2 rounded-xl px-3 text-xs font-black">
            <FileText className="h-4 w-4" /> Department workspace
          </Link>
        </Card>
      ) : null}

      <DocumentsPanel key={department || "all-departments"} recipientUserIds={recipientUserIds} scopeLabel={department || undefined} />
    </>
  );
}
