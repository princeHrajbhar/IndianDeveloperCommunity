"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { ProfileHROperationsPanel } from "./profile-hr-operations-panel";
import {
  useCreateMyHRLeaveMutation,
  useGetMyHRSummaryQuery,
  useHrCheckInMutation,
  useHrCheckOutMutation,
} from "@/src/lib/features/hr-management/hr-management-api";
import type { HROnboarding } from "@/src/lib/features/hr-management/hr-management-types";
import {
  EmptyState,
  Field,
  PageHeading,
  Panel,
  PanelHeader,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  inputClass,
  textareaClass,
} from "./profile-ui";

export function ProfileHRWorkspace() {
  const summaryQuery = useGetMyHRSummaryQuery();
  const [checkIn, checkInState] = useHrCheckInMutation();
  const [checkOut, checkOutState] = useHrCheckOutMutation();
  const [createLeave, leaveState] = useCreateMyHRLeaveMutation();
  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [startDate, setStartDate] = useState(isoToday());
  const [endDate, setEndDate] = useState(isoToday());
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const data = summaryQuery.data?.data;
  const onboardingProgress = useMemo(() => progress(data?.onboarding ?? null), [data?.onboarding]);

  async function runAttendance(action: "in" | "out") {
    setError("");
    setFeedback("");
    try {
      if (action === "in") await checkIn().unwrap();
      else await checkOut().unwrap();
      setFeedback(action === "in" ? "Checked in successfully." : "Checked out successfully.");
      await summaryQuery.refetch();
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  async function submitLeave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFeedback("");
    const days = inclusiveDays(startDate, endDate);
    if (days <= 0) {
      setError("End date must be on or after start date.");
      return;
    }
    try {
      await createLeave({ leaveType, startDate, endDate, days, reason }).unwrap();
      setReason("");
      setFeedback("Leave request submitted to HR.");
      await summaryQuery.refetch();
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  if (summaryQuery.isLoading) return <Loading />;
  if (summaryQuery.error || !data) {
    const message = getApiErrorMessage(summaryQuery.error ?? "Employee profile not found");
    return (
      <>
        <PageHeading eyebrow="Employee self-service" title="My" accent="HR." description="Attendance, leave, onboarding and HR communication in one place." />
        <Panel>
          <EmptyState
            title="HR profile not linked yet"
            description={`${message}. Ask HR to create or link your employee record using the same account email.`}
            action={<Link href="/profile/support" className="inline-flex h-11 items-center rounded-xl bg-cyan-300 px-5 text-sm font-bold text-slate-950">Contact support</Link>}
          />
        </Panel>
      </>
    );
  }

  const employee = data.employee;
  const today = data.today;
  const busy = checkInState.isLoading || checkOutState.isLoading;

  return (
    <>
      <PageHeading
        eyebrow="Employee self-service"
        title="My"
        accent="HR."
        description="Manage attendance, leave, onboarding tasks, HR announcements and issued documents from your employee workspace."
        action={<Link href="/profile/documents"><SecondaryButton type="button">My documents</SecondaryButton></Link>}
      />

      {error ? <div className="mb-5 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-200">{error}</div> : null}
      {feedback ? <div className="mb-5 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] px-4 py-3 text-sm text-emerald-100">{feedback}</div> : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Employee" value={employee.employeeCode} note={`${employee.department} · ${employee.designation}`} />
        <Metric label="Present this month" value={String(data.month.present)} note={`${Math.round(data.month.workMinutes / 60)} logged hours`} />
        <Metric label="Pending leave" value={String(data.pendingLeaves.length)} note="Awaiting HR action" />
        <Metric label="Onboarding" value={`${onboardingProgress}%`} note={data.onboarding?.status ?? "Not started"} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Today’s attendance" description={formatDate(new Date().toISOString())} action={<StatusBadge tone={today?.checkIn ? "emerald" : "amber"}>{today?.status ?? "Not marked"}</StatusBadge>} />
            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
              <Info label="Check in" value={today?.checkIn ? formatTime(today.checkIn) : "Not checked in"} />
              <Info label="Check out" value={today?.checkOut ? formatTime(today.checkOut) : "Not checked out"} />
            </div>
            <div className="flex flex-wrap justify-end gap-3 border-t border-white/[0.07] p-5 sm:p-6">
              <SecondaryButton type="button" disabled={busy || Boolean(today?.checkIn)} onClick={() => runAttendance("in")}>Check in</SecondaryButton>
              <PrimaryButton type="button" disabled={busy || !today?.checkIn || Boolean(today?.checkOut)} onClick={() => runAttendance("out")}>Check out</PrimaryButton>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Request leave" description="Send a leave request directly to the HR approval queue." />
            <form onSubmit={submitLeave} className="grid gap-5 p-5 md:grid-cols-2 sm:p-6">
              <Field label="Leave type">
                <select className={inputClass} value={leaveType} onChange={(event) => setLeaveType(event.target.value)}>
                  {['Casual Leave','Sick Leave','Earned Leave','Comp Off','Work From Home','Unpaid Leave','Maternity Leave','Paternity Leave','Bereavement Leave'].map((value) => <option key={value}>{value}</option>)}
                </select>
              </Field>
              <div />
              <Field label="Start date"><input className={inputClass} type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required /></Field>
              <Field label="End date"><input className={inputClass} type="date" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)} required /></Field>
              <div className="md:col-span-2"><Field label="Reason"><textarea className={textareaClass} value={reason} onChange={(event) => setReason(event.target.value)} maxLength={5000} required placeholder="Reason for leave..." /></Field></div>
              <div className="md:col-span-2 flex justify-end"><PrimaryButton type="submit" disabled={leaveState.isLoading}>{leaveState.isLoading ? "Submitting..." : "Submit leave request"}</PrimaryButton></div>
            </form>
          </Panel>

          <Panel>
            <PanelHeader title="Onboarding / employee lifecycle" description={`${onboardingProgress}% complete`} />
            {data.onboarding?.tasks?.length ? (
              <div className="divide-y divide-white/[0.07]">
                {data.onboarding.tasks.map((task, index) => (
                  <div key={task._id ?? `${task.title}-${index}`} className="flex items-start justify-between gap-4 p-5 sm:px-6">
                    <div><p className="font-semibold text-white">{task.title}</p><p className="mt-1 text-xs text-slate-500">{task.owner || "HR"}{task.dueDate ? ` · due ${formatDate(task.dueDate)}` : ""}</p></div>
                    <StatusBadge tone={task.status === "completed" ? "emerald" : task.status === "blocked" ? "rose" : "amber"}>{task.status}</StatusBadge>
                  </div>
                ))}
              </div>
            ) : <EmptyState title="No lifecycle tasks" description="HR onboarding tasks will appear here when assigned." />}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Pending leave requests" description="Latest requests waiting for review" />
            {data.pendingLeaves.length ? <div className="divide-y divide-white/[0.07]">{data.pendingLeaves.map((leave) => <div key={leave.id ?? leave._id} className="p-5 sm:px-6"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-white">{leave.leaveType}</p><p className="mt-1 text-xs text-slate-500">{formatDate(leave.startDate)} – {formatDate(leave.endDate)} · {leave.days} day(s)</p></div><StatusBadge tone="amber">{leave.status}</StatusBadge></div></div>)}</div> : <EmptyState title="No pending leave" description="Your submitted requests waiting for approval will appear here." />}
          </Panel>

          <Panel>
            <PanelHeader title="HR announcements" description="Company communication published by HR" />
            {data.announcements.length ? <div className="divide-y divide-white/[0.07]">{data.announcements.map((announcement) => <div key={announcement.id ?? announcement._id} className="p-5 sm:px-6"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-white">{announcement.title}</p><p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-400">{announcement.message}</p><p className="mt-3 text-[10px] uppercase tracking-wider text-slate-600">{formatDate(announcement.publishedAt)}</p></div><StatusBadge tone={announcement.priority === "urgent" ? "rose" : announcement.priority === "important" ? "amber" : "cyan"}>{announcement.priority}</StatusBadge></div></div>)}</div> : <EmptyState title="No announcements" description="New HR notices and company updates will appear here." />}
          </Panel>

          <Panel>
            <PanelHeader title="Recent issued documents" description="Offer, appointment, payroll and HR letters" />
            {data.documents.length ? <div className="divide-y divide-white/[0.07]">{data.documents.slice(0, 6).map((document) => <Link key={document.id ?? document._id} href={`/profile/documents?document=${document.id ?? document._id}`} className="block p-5 transition hover:bg-white/[0.025] sm:px-6"><p className="font-semibold text-white">{document.templateName}</p><p className="mt-1 text-xs text-slate-500">{document.documentNumber} · {formatDate(document.issuedAt)}</p></Link>)}</div> : <EmptyState title="No documents" description="Issued HR documents will appear here." />}
          </Panel>
        </div>
      </div>
      <ProfileHROperationsPanel />
    </>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <Panel className="p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p><p className="mt-3 text-3xl font-black tracking-tight text-white">{value}</p><p className="mt-2 truncate text-xs text-slate-500">{note}</p></Panel>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-white/[0.08] p-4"><p className="text-[10px] uppercase tracking-wider text-slate-600">{label}</p><p className="mt-2 text-sm font-semibold text-slate-200">{value}</p></div>;
}

function Loading() {
  return <div className="grid gap-5 md:grid-cols-2">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-36 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />)}</div>;
}

function progress(onboarding: HROnboarding | null) {
  const tasks = onboarding?.tasks ?? [];
  if (!tasks.length) return onboarding?.status === "completed" ? 100 : 0;
  return Math.round((tasks.filter((task) => task.status === "completed").length / tasks.length) * 100);
}

function isoToday() {
  const now = new Date();
  const shifted = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return shifted.toISOString().slice(0, 10);
}

function inclusiveDays(from: string, to: string) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return 0;
  return Math.floor((end.getTime() - start.getTime()) / 86_400_000) + 1;
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function formatTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}
