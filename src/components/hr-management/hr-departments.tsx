"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Building2, FileText, Mail, ShieldCheck, UserRoundCog, Users } from "lucide-react";
import { useGetHREmployeesQuery } from "@/src/lib/features/hr-management/hr-management-api";
import { Badge, Card, CardHeader, Empty, HRPageTitle } from "./hr-ui";

export function HRDepartmentsWorkspace() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("department")?.trim() || "";
  const employees = useGetHREmployeesQuery({ page: 1, limit: 200 });
  const rows = employees.data?.data ?? [];
  const departments = [...new Set(rows.map((employee) => employee.department).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const scoped = selected ? rows.filter((employee) => employee.department === selected) : [];
  const active = scoped.filter((employee) => ["active", "probation"].includes(employee.status)).length;
  const onboarding = scoped.filter((employee) => employee.status === "onboarding").length;
  const managers = new Set(scoped.map((employee) => typeof employee.managerEmployeeId === "string" ? employee.managerEmployeeId : employee.managerEmployeeId?.id ?? employee.managerEmployeeId?._id).filter(Boolean)).size;

  return (
    <>
      <HRPageTitle
        eyebrow="Department Workspaces"
        title="Department-specific"
        accent="HR dashboards."
        description="Department workspaces are generated from the employee master. Each workspace keeps its people, documents and communication scoped to the selected department so HR teams do not need to move back to the general Admin dashboard."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {departments.map((department) => {
          const departmentEmployees = rows.filter((employee) => employee.department === department);
          return (
            <Link key={department} href={`/hr-management/departments?department=${encodeURIComponent(department)}`} className={`qf-surface qf-shadow rounded-2xl border p-5 transition hover:-translate-y-0.5 ${selected === department ? "ring-2 ring-blue-500/30" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <span className="qf-status-info grid h-11 w-11 place-items-center rounded-xl border"><Building2 className="h-5 w-5" /></span>
                <Badge tone="blue">{departmentEmployees.length} people</Badge>
              </div>
              <h2 className="qf-text mt-4 text-base font-black">{department}</h2>
              <p className="qf-muted mt-2 text-xs leading-5">Open the department dashboard for employee, document and communication actions.</p>
            </Link>
          );
        })}
      </div>

      {!departments.length && !employees.isLoading ? <Card className="mt-6"><Empty title="No departments yet" description="Create employee records with a department to generate department dashboards automatically." /></Card> : null}

      {selected ? (
        <div className="mt-7 space-y-6">
          <Card>
            <CardHeader title={`${selected} dashboard`} description="Department-scoped HR operations and assigned employee snapshot." action={<Badge tone="violet">Department workspace</Badge>} />
            <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
              <Stat label="Assigned employees" value={scoped.length} icon={<Users className="h-5 w-5" />} />
              <Stat label="Active / probation" value={active} icon={<ShieldCheck className="h-5 w-5" />} />
              <Stat label="Onboarding" value={onboarding} icon={<UserRoundCog className="h-5 w-5" />} />
              <Stat label="Reporting lines" value={managers} icon={<Building2 className="h-5 w-5" />} />
            </div>
            <div className="qf-border grid gap-3 border-t p-5 md:grid-cols-3">
              <Link href={`/hr-management/employees?department=${encodeURIComponent(selected)}`} className="qf-secondary-button flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-black"><Users className="h-4 w-4" />Manage department employees</Link>
              <Link href={`/hr-management/documents?department=${encodeURIComponent(selected)}`} className="qf-secondary-button flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-black"><FileText className="h-4 w-4" />Department documents</Link>
              <Link href={`/hr-management/communication?department=${encodeURIComponent(selected)}`} className="qf-primary-button flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-black"><Mail className="h-4 w-4" />Department communication</Link>
            </div>
          </Card>

          <Card>
            <CardHeader title="Assigned employees" description={`Employees whose HR master record is assigned to ${selected}.`} />
            {scoped.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-left text-sm">
                  <thead className="qf-surface-muted qf-muted text-[10px] font-black uppercase tracking-wider"><tr><th className="px-5 py-3">Employee</th><th className="px-4 py-3">Designation</th><th className="px-4 py-3">Employment</th><th className="px-4 py-3">Status</th><th className="px-5 py-3">Account link</th></tr></thead>
                  <tbody className="qf-border divide-y">
                    {scoped.map((employee) => (
                      <tr key={employee.id ?? employee._id}>
                        <td className="px-5 py-4"><b className="qf-text">{employee.firstName} {employee.lastName}</b><p className="qf-muted mt-1 text-xs">{employee.employeeCode} · {employee.email}</p></td>
                        <td className="qf-text-secondary px-4 py-4 text-xs font-semibold">{employee.designation}</td>
                        <td className="qf-muted px-4 py-4 text-xs">{employee.employmentType}</td>
                        <td className="px-4 py-4"><Badge tone={employee.status === "active" ? "green" : employee.status === "onboarding" ? "violet" : "amber"}>{employee.status}</Badge></td>
                        <td className="qf-muted px-5 py-4 text-xs">{employee.userId ? "Linked user" : "Not linked"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <Empty title="No employees assigned" description="Assign employees to this department from Employee Management." />}
          </Card>
        </div>
      ) : null}
    </>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="qf-surface-muted qf-border rounded-2xl border p-4">
      <div className="flex items-center justify-between gap-3"><span className="qf-muted text-xs font-black uppercase tracking-[.12em]">{label}</span><span className="text-[var(--qf-primary-text)]">{icon}</span></div>
      <p className="qf-text mt-3 text-3xl font-black">{value}</p>
    </div>
  );
}
