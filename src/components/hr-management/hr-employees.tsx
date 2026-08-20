"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { Building2, Download, Pencil, Plus, Search, X } from "lucide-react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useCreateHREmployeeMutation,
  useDeleteHREmployeeMutation,
  useGetHREmployeesQuery,
  useGetHRShiftsQuery,
  useUpdateHREmployeeMutation,
} from "@/src/lib/features/hr-management/hr-management-api";
import type { HREmployee } from "@/src/lib/features/hr-management/hr-management-types";
import {
  Badge,
  Card,
  CardHeader,
  ColorButton,
  Empty,
  ErrorBox,
  Field,
  HRPageTitle,
  PrimaryButton,
  SecondaryButton,
  fmtDate,
  idOf,
  input,
  personName,
} from "./hr-ui";

const initial = {
  employeeCode: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  employmentType: "full-time",
  status: "onboarding",
  joiningDate: new Date().toISOString().slice(0, 10),
  workLocation: "",
  shiftId: "",
  managerEmployeeId: "",
  skills: "",
};

type AssignmentDraft = {
  department: string;
  designation: string;
  workLocation: string;
  shiftId: string;
  managerEmployeeId: string;
};

function refId(value: HREmployee["managerEmployeeId"] | HREmployee["shiftId"]) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.id ?? value._id ?? "";
}

export function HREmployeesWorkspace() {
  const searchParams = useSearchParams();
  const department = searchParams.get("department")?.trim() || "";
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...initial, department });
  const [editing, setEditing] = useState<HREmployee | null>(null);
  const [assignment, setAssignment] = useState<AssignmentDraft | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const q = useGetHREmployeesQuery({
    page: 1,
    limit: 200,
    search: search || undefined,
    status: status || undefined,
    department: department || undefined,
  });
  const allEmployees = useGetHREmployeesQuery({ page: 1, limit: 200 });
  const shifts = useGetHRShiftsQuery();
  const [create, createState] = useCreateHREmployeeMutation();
  const [update, updateState] = useUpdateHREmployeeMutation();
  const [deactivate] = useDeleteHREmployeeMutation();

  const employees = q.data?.data ?? [];
  const allPeople = allEmployees.data?.data ?? employees;
  const managers = useMemo(
    () => allPeople.filter((employee) => ["active", "probation"].includes(employee.status)),
    [allPeople],
  );
  const departments = useMemo(
    () => [...new Set(allPeople.map((employee) => employee.department).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [allPeople],
  );

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setFeedback("");
    try {
      await create({
        ...form,
        shiftId: form.shiftId || undefined,
        managerEmployeeId: form.managerEmployeeId || undefined,
        skills: form.skills.split(",").map((value) => value.trim()).filter(Boolean),
        tags: [],
      }).unwrap();
      setFeedback("Employee record created and onboarding checklist initialized.");
      setForm({ ...initial, department });
      setShowForm(false);
    } catch (x) {
      setError(getApiErrorMessage(x));
    }
  }

  async function setEmployeeStatus(employee: HREmployee, next: string) {
    setError("");
    try {
      await update({
        id: idOf(employee),
        body: { status: next, ...(next === "exited" ? { exitDate: new Date().toISOString() } : {}) },
      }).unwrap();
      setFeedback(`Employee status changed to ${next}.`);
    } catch (x) {
      setError(getApiErrorMessage(x));
    }
  }

  function beginAssignmentEdit(employee: HREmployee) {
    setEditing(employee);
    setAssignment({
      department: employee.department ?? "",
      designation: employee.designation ?? "",
      workLocation: employee.workLocation ?? "",
      shiftId: refId(employee.shiftId),
      managerEmployeeId: refId(employee.managerEmployeeId),
    });
  }

  async function saveAssignment(e: FormEvent) {
    e.preventDefault();
    if (!editing || !assignment) return;
    setError("");
    try {
      await update({
        id: idOf(editing),
        body: {
          department: assignment.department.trim(),
          designation: assignment.designation.trim(),
          workLocation: assignment.workLocation.trim(),
          shiftId: assignment.shiftId || null,
          managerEmployeeId: assignment.managerEmployeeId || null,
        },
      }).unwrap();
      setFeedback(`${editing.firstName} ${editing.lastName}'s department assignment and work profile were updated.`);
      setEditing(null);
      setAssignment(null);
    } catch (x) {
      setError(getApiErrorMessage(x));
    }
  }

  async function remove(employee: HREmployee) {
    if (!window.confirm(`Deactivate ${employee.firstName} ${employee.lastName}?`)) return;
    setError("");
    try {
      await deactivate(idOf(employee)).unwrap();
      setFeedback("Employee deactivated.");
    } catch (x) {
      setError(getApiErrorMessage(x));
    }
  }

  function exportCsv() {
    const rows = [
      ["Employee Code", "Name", "Email", "Department", "Designation", "Employment Type", "Status", "Joining Date"],
      ...employees.map((employee) => [
        employee.employeeCode,
        `${employee.firstName} ${employee.lastName}`,
        employee.email,
        employee.department,
        employee.designation,
        employee.employmentType,
        employee.status,
        employee.joiningDate,
      ]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    anchor.download = `quantum-finix-employees-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  }

  return (
    <>
      <HRPageTitle
        eyebrow="Employee Management"
        title="Employee master and"
        accent="lifecycle records."
        description="Maintain the central employee directory, department assignment, designation, reporting manager, shift, employment type, work location and employee status. Department changes immediately flow into department dashboards, documents and communication scope."
        actions={(
          <>
            <SecondaryButton onClick={exportCsv}><Download className="h-4 w-4" />Export CSV</SecondaryButton>
            <ColorButton onClick={() => setShowForm((value) => !value)}><Plus className="h-4 w-4" />Add employee</ColorButton>
          </>
        )}
      />

      {department ? (
        <div className="qf-status-info mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-bold">
          <span>Department scope: {department}</span>
          <Link href="/hr-management/employees" className="underline underline-offset-4">Show all employees</Link>
        </div>
      ) : null}
      {error ? <div className="mb-5"><ErrorBox message={error} /></div> : null}
      {feedback ? <div className="qf-status-success mb-5 rounded-xl border px-4 py-3 text-sm font-semibold">{feedback}</div> : null}

      {showForm ? (
        <Card className="mb-6">
          <CardHeader title="New employee" description="Create the HR employee record. If the email already belongs to a platform user, the account is linked automatically." />
          <form onSubmit={submit} className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
            <Field label="Employee code"><input required value={form.employeeCode} onChange={(e) => setForm({ ...form, employeeCode: e.target.value })} className={input} placeholder="QF-001" /></Field>
            <Field label="First name"><input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={input} /></Field>
            <Field label="Last name"><input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={input} /></Field>
            <Field label="Email"><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} /></Field>
            <Field label="Phone"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} /></Field>
            <Field label="Department"><input required list="qf-departments" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={input} placeholder="Engineering" /></Field>
            <Field label="Designation"><input required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className={input} placeholder="Software Engineer" /></Field>
            <Field label="Joining date"><input required type="date" value={form.joiningDate} onChange={(e) => setForm({ ...form, joiningDate: e.target.value })} className={input} /></Field>
            <Field label="Employment type"><select value={form.employmentType} onChange={(e) => setForm({ ...form, employmentType: e.target.value })} className={input}><option value="full-time">Full-time</option><option value="part-time">Part-time</option><option value="contract">Contract</option><option value="intern">Intern</option><option value="consultant">Consultant</option></select></Field>
            <Field label="Initial status"><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={input}><option value="onboarding">Onboarding</option><option value="active">Active</option><option value="probation">Probation</option></select></Field>
            <Field label="Work location"><input value={form.workLocation} onChange={(e) => setForm({ ...form, workLocation: e.target.value })} className={input} placeholder="Bengaluru / Remote" /></Field>
            <Field label="Shift"><select value={form.shiftId} onChange={(e) => setForm({ ...form, shiftId: e.target.value })} className={input}><option value="">Unassigned</option>{shifts.data?.data.map((shift) => <option key={idOf(shift)} value={idOf(shift)}>{shift.name} ({shift.startTime}-{shift.endTime})</option>)}</select></Field>
            <Field label="Reporting manager"><select value={form.managerEmployeeId} onChange={(e) => setForm({ ...form, managerEmployeeId: e.target.value })} className={input}><option value="">No manager</option>{managers.map((manager) => <option key={idOf(manager)} value={idOf(manager)}>{manager.employeeCode} · {manager.firstName} {manager.lastName}</option>)}</select></Field>
            <Field label="Skills" hint="Comma-separated"><input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className={input} placeholder="React, Node.js, MongoDB" /></Field>
            <div className="flex items-end justify-end gap-2 md:col-span-2 xl:col-span-2"><SecondaryButton type="button" onClick={() => setShowForm(false)}>Cancel</SecondaryButton><PrimaryButton type="submit" disabled={createState.isLoading}>{createState.isLoading ? "Creating…" : "Create employee"}</PrimaryButton></div>
          </form>
        </Card>
      ) : null}

      {editing && assignment ? (
        <Card className="mb-6">
          <CardHeader
            title={`Work profile · ${editing.firstName} ${editing.lastName}`}
            description="Change the department, role, location, shift or reporting line. Department changes automatically re-scope the employee in Department Dashboards."
            action={<button type="button" onClick={() => { setEditing(null); setAssignment(null); }} className="qf-icon-button grid h-9 w-9 place-items-center rounded-lg" aria-label="Close work profile editor"><X className="h-4 w-4" /></button>}
          />
          <form onSubmit={saveAssignment} className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-5">
            <Field label="Department"><input required list="qf-departments" value={assignment.department} onChange={(e) => setAssignment({ ...assignment, department: e.target.value })} className={input} /></Field>
            <Field label="Designation"><input required value={assignment.designation} onChange={(e) => setAssignment({ ...assignment, designation: e.target.value })} className={input} /></Field>
            <Field label="Work location"><input value={assignment.workLocation} onChange={(e) => setAssignment({ ...assignment, workLocation: e.target.value })} className={input} /></Field>
            <Field label="Shift"><select value={assignment.shiftId} onChange={(e) => setAssignment({ ...assignment, shiftId: e.target.value })} className={input}><option value="">Unassigned</option>{shifts.data?.data.map((shift) => <option key={idOf(shift)} value={idOf(shift)}>{shift.name}</option>)}</select></Field>
            <Field label="Reporting manager"><select value={assignment.managerEmployeeId} onChange={(e) => setAssignment({ ...assignment, managerEmployeeId: e.target.value })} className={input}><option value="">No manager</option>{managers.filter((manager) => idOf(manager) !== idOf(editing)).map((manager) => <option key={idOf(manager)} value={idOf(manager)}>{manager.employeeCode} · {manager.firstName} {manager.lastName}</option>)}</select></Field>
            <div className="flex justify-end gap-2 md:col-span-2 xl:col-span-5"><SecondaryButton type="button" onClick={() => { setEditing(null); setAssignment(null); }}>Cancel</SecondaryButton><PrimaryButton type="submit" disabled={updateState.isLoading}>{updateState.isLoading ? "Saving…" : "Save work profile"}</PrimaryButton></div>
          </form>
        </Card>
      ) : null}

      <datalist id="qf-departments">{departments.map((name) => <option key={name} value={name} />)}</datalist>

      <Card>
        <CardHeader
          title="Employee directory"
          description={`${q.data?.pagination.total ?? 0} employee record(s)`}
          action={(
            <div className="flex flex-wrap gap-2">
              <div className="relative"><Search className="qf-muted absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" /><input value={search} onChange={(e) => setSearch(e.target.value)} className={`${input} w-56 pl-9`} placeholder="Search people…" /></div>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${input} w-36`}><option value="">All status</option><option value="onboarding">Onboarding</option><option value="active">Active</option><option value="probation">Probation</option><option value="leave">Leave</option><option value="notice">Notice</option><option value="exited">Exited</option><option value="inactive">Inactive</option></select>
            </div>
          )}
        />
        {q.isLoading ? <div className="qf-muted p-8 text-sm">Loading employees…</div> : q.error ? <div className="p-5"><ErrorBox message={getApiErrorMessage(q.error)} /></div> : employees.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] text-left text-sm">
              <thead className="qf-surface-muted qf-muted text-[10px] font-black uppercase tracking-wider"><tr><th className="px-5 py-3">Employee</th><th className="px-4 py-3">Department / Role</th><th className="px-4 py-3">Employment</th><th className="px-4 py-3">Manager</th><th className="px-4 py-3">Joined</th><th className="px-4 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead>
              <tbody className="qf-border divide-y">
                {employees.map((employee) => (
                  <tr key={idOf(employee)} className="transition hover:bg-[var(--qf-surface-muted)]">
                    <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--qf-primary)] text-xs font-black text-white">{employee.firstName[0]}{employee.lastName[0]}</span><div><b className="qf-text">{employee.firstName} {employee.lastName}</b><p className="qf-muted mt-0.5 text-xs">{employee.employeeCode} · {employee.email}</p></div></div></td>
                    <td className="px-4 py-4"><b className="qf-text-secondary text-xs">{employee.department}</b><p className="qf-muted mt-1 text-xs">{employee.designation}</p></td>
                    <td className="qf-muted px-4 py-4 text-xs">{employee.employmentType}<p className="mt-1">{employee.workLocation || "—"}</p></td>
                    <td className="qf-muted px-4 py-4 text-xs">{personName(employee.managerEmployeeId)}</td>
                    <td className="qf-muted px-4 py-4 text-xs">{fmtDate(employee.joiningDate)}</td>
                    <td className="px-4 py-4"><Badge tone={employee.status === "active" ? "green" : employee.status === "onboarding" ? "violet" : employee.status === "probation" ? "amber" : employee.status === "exited" || employee.status === "inactive" ? "rose" : "blue"}>{employee.status}</Badge></td>
                    <td className="px-5 py-4"><div className="flex justify-end gap-2"><button type="button" onClick={() => beginAssignmentEdit(employee)} className="qf-secondary-button inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-black"><Pencil className="h-3.5 w-3.5" />Work profile</button><select aria-label={`Status for ${employee.firstName} ${employee.lastName}`} value={employee.status} onChange={(event) => void setEmployeeStatus(employee, event.target.value)} className={`${input} h-9 w-32 py-0 text-xs font-bold`}><option value="onboarding">Onboarding</option><option value="active">Active</option><option value="probation">Probation</option><option value="leave">Leave</option><option value="notice">Notice</option><option value="exited">Exited</option></select><SecondaryButton onClick={() => void remove(employee)}>Deactivate</SecondaryButton></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <Empty title="No employees found" description="Create the first employee or change your search filters." />}
      </Card>

      {department ? (
        <div className="qf-muted mt-4 flex items-center gap-2 text-xs"><Building2 className="h-4 w-4" />Moving an employee to another department removes them from this scoped list after the update and adds them to the destination department dashboard.</div>
      ) : null}
    </>
  );
}
