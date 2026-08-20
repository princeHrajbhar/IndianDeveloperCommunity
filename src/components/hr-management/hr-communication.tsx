"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Bell, Building2, Mail, MailCheck, Megaphone, Plus, Users } from "lucide-react";
import { EmailManagementPanel } from "@/src/components/admin/email-management-panel";
import { QueuePanel } from "@/src/components/admin/queue-panel";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useCreateHRAnnouncementMutation,
  useGetHRAnnouncementsQuery,
  useGetHREmployeesQuery,
} from "@/src/lib/features/hr-management/hr-management-api";
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
  fmtDate,
  idOf,
  input,
  textarea,
} from "./hr-ui";

type Tab = "announcements" | "bulk-email" | "queue";

export function HRCommunicationWorkspace() {
  const searchParams = useSearchParams();
  const department = searchParams.get("department")?.trim() || "";
  const requestedTab = searchParams.get("tab");
  const initialTab: Tab = requestedTab === "queue" || requestedTab === "bulk-email" ? requestedTab : "announcements";
  const [tab, setTab] = useState<Tab>(initialTab);
  useEffect(() => {
    setTab(requestedTab === "queue" || requestedTab === "bulk-email" ? requestedTab : "announcements");
  }, [requestedTab]);
  const employees = useGetHREmployeesQuery(department ? { page: 1, limit: 200, department } : { page: 1, limit: 200 });
  const departmentEmails = useMemo(
    () => department ? (employees.data?.data ?? []).map((employee) => employee.email).filter(Boolean) : [],
    [department, employees.data?.data],
  );

  return (
    <>
      <HRPageTitle
        eyebrow="HR Communication"
        title="Employee communication and"
        accent="mail operations."
        description="Announcements, department communication, reusable bulk-email campaigns, suppression controls and delivery queues are managed directly inside HRMS."
        actions={department ? (
          <Link href="/hr-management/communication" className="qf-secondary-button inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-black">
            <Users className="h-4 w-4" /> All departments
          </Link>
        ) : undefined}
      />

      {department ? (
        <Card className="mb-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="qf-status-info grid h-10 w-10 place-items-center rounded-xl border"><Building2 className="h-5 w-5" /></span>
            <div>
              <p className="text-xs font-black uppercase tracking-[.14em] text-[var(--qf-primary-text)]">Department communication scope</p>
              <p className="qf-text mt-1 text-sm font-black">{department} · {departmentEmails.length} employee email(s)</p>
            </div>
          </div>
          <Link href={`/hr-management/departments?department=${encodeURIComponent(department)}`} className="qf-secondary-button inline-flex h-10 items-center gap-2 rounded-xl px-3 text-xs font-black">
            Department workspace
          </Link>
        </Card>
      ) : null}

      <div className="qf-surface mb-6 flex flex-wrap gap-1 rounded-2xl border p-1.5">
        <TabButton active={tab === "announcements"} onClick={() => setTab("announcements")} icon={<Megaphone className="h-4 w-4" />} label="Announcements" />
        <TabButton active={tab === "bulk-email"} onClick={() => setTab("bulk-email")} icon={<Mail className="h-4 w-4" />} label="Bulk Email" />
        <TabButton active={tab === "queue"} onClick={() => setTab("queue")} icon={<MailCheck className="h-4 w-4" />} label="Delivery Queues" />
      </div>

      {tab === "announcements" ? <AnnouncementWorkspace department={department} /> : null}
      {tab === "bulk-email" ? <EmailManagementPanel initialManualEmails={departmentEmails} scopeLabel={department || undefined} /> : null}
      {tab === "queue" ? <QueuePanel /> : null}
    </>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-xs font-black transition ${active ? "qf-primary-button" : "qf-secondary-button border-transparent"}`}
    >
      {icon}{label}
    </button>
  );
}

function AnnouncementWorkspace({ department }: { department: string }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: department ? "department" : "all",
    department,
    priority: "normal",
    sendEmail: false,
  });
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const q = useGetHRAnnouncementsQuery({ page: 1, limit: 100, ...(department ? { department } : {}) });
  const [create, state] = useCreateHRAnnouncementMutation();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const r = await create({
        title: form.title,
        message: form.message,
        audience: department ? "department" : form.audience,
        department: department || form.department || undefined,
        priority: form.priority,
        channels: form.sendEmail ? ["in-app", "email"] : ["in-app"],
      }).unwrap();
      const mail = r.data.emailResult;
      setFeedback(mail ? `Announcement published. Email: ${mail.sent} sent, ${mail.skipped} skipped, ${mail.failed} failed.` : "Announcement published to the HR workspace.");
      setShow(false);
      setForm((current) => ({ ...current, title: "", message: "" }));
    } catch (x) {
      setError(getApiErrorMessage(x));
    }
  }

  return (
    <>
      <div className="mb-5 flex justify-end"><ColorButton onClick={() => setShow((value) => !value)}><Plus className="h-4 w-4" />New announcement</ColorButton></div>
      {error ? <div className="mb-5"><ErrorBox message={error} /></div> : null}
      {feedback ? <div className="qf-status-success mb-5 rounded-xl border px-4 py-3 text-sm font-semibold">{feedback}</div> : null}

      {show ? (
        <Card className="mb-6">
          <CardHeader title="Publish HR announcement" description={department ? `This announcement is locked to ${department}.` : "Choose an in-app audience and optionally add email delivery."} />
          <form onSubmit={submit} className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
            <Field label="Title"><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={input} /></Field>
            <Field label="Audience">
              <select disabled={Boolean(department)} value={department ? "department" : form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className={input}>
                <option value="all">All HR employees</option><option value="employees">Employees</option><option value="managers">Managers</option><option value="department">Department</option>
              </select>
            </Field>
            <Field label="Department"><input disabled={Boolean(department) || form.audience !== "department"} value={department || form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={input} placeholder="Engineering" /></Field>
            <Field label="Priority"><select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className={input}><option value="normal">Normal</option><option value="important">Important</option><option value="urgent">Urgent</option></select></Field>
            <div className="md:col-span-2 xl:col-span-4"><Field label="Message"><textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={textarea} placeholder="Write the HR update, policy notice, deadline or action required…" /></Field></div>
            <label className="qf-status-info md:col-span-2 xl:col-span-3 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold"><input type="checkbox" checked={form.sendEmail} onChange={(e) => setForm({ ...form, sendEmail: e.target.checked })} />Also send this announcement by email</label>
            <PrimaryButton type="submit" disabled={state.isLoading}>{state.isLoading ? "Publishing…" : "Publish announcement"}</PrimaryButton>
          </form>
        </Card>
      ) : null}

      <Card>
        <CardHeader title={department ? `${department} announcements` : "HR announcement history"} description="Published communication remains available for audit and employee self-service notifications." action={<Badge tone="blue">{q.data?.pagination.total ?? 0} items</Badge>} />
        {q.isLoading ? <p className="qf-muted p-6 text-sm">Loading announcements…</p> : q.data?.data.length ? (
          <div className="qf-border divide-y">
            {q.data.data.map((item) => (
              <div key={idOf(item)} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><Bell className="h-4 w-4 text-[var(--qf-primary-text)]" /><b className="qf-text text-sm">{item.title}</b><Badge tone={item.priority === "urgent" ? "rose" : item.priority === "important" ? "amber" : "slate"}>{item.priority}</Badge></div><p className="qf-muted mt-2 whitespace-pre-wrap text-xs leading-5">{item.message}</p></div>
                <div className="qf-muted shrink-0 text-right text-[10px]"><p>{item.audience}{item.department ? ` · ${item.department}` : ""}</p><p className="mt-1">{fmtDate(item.publishedAt)}</p></div>
              </div>
            ))}
          </div>
        ) : <Empty title="No announcements" description="Published HR announcements will appear here." />}
      </Card>
    </>
  );
}
