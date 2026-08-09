"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { downloadAdminFile } from "@/src/lib/download";
import {
  useAddLeadNoteMutation,
  useCreateAdminLeadMutation,
  useDeleteLeadMutation,
  useGetLeadByIdQuery,
  useGetLeadsQuery,
  useGetLeadStatisticsQuery,
  useUpdateLeadMutation,
} from "@/src/lib/features/leads/lead-api";
import type {
  ContactPreference,
  CreateAdminLeadInput,
  Lead,
  LeadPriority,
  LeadSource,
  LeadStatus,
} from "@/src/lib/features/leads/lead-types";
import { useGetUsersQuery } from "@/src/lib/features/users/user-api";
import {
  Button,
  Empty,
  ErrorNotice,
  Field,
  LoadingRows,
  Metric,
  Panel,
  PanelTitle,
  Pagination,
  StatusBadge,
  SuccessNotice,
  formatDate,
  inputClass,
  textareaClass,
} from "./admin-ui";

const statuses: Array<LeadStatus | ""> = ["", "New", "Contacted", "Qualified", "Proposal Sent", "Converted", "Lost", "Spam"];
const priorities: LeadPriority[] = ["Low", "Medium", "High", "Urgent"];
const sources: LeadSource[] = ["Website Form", "Contact Page", "Landing Page", "Referral", "Social Media", "Campaign", "Manual", "Other"];
const contactPreferences: ContactPreference[] = ["Any", "Email", "Phone", "WhatsApp"];

export function LeadsPanel() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "">("");
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const list = useGetLeadsQuery({ page, limit: 15, ...(search.trim() ? { search: search.trim() } : {}), ...(status ? { status } : {}) });
  const statistics = useGetLeadStatisticsQuery();
  const stats = statistics.data?.data;

  return (
    <section>
      <PageHeading
        eyebrow="Business development"
        title="Lead workspace"
        description="Every lead has its own route, atomic update form, notes, follow-up date, assignment and status history."
        action={<><Button secondary disabled={exporting} onClick={async () => {
          setExportError(""); setExporting(true);
          try { await downloadAdminFile("/lead/admin/export", "quantumfinix-leads.xlsx", { ...(search.trim() ? { search: search.trim() } : {}), ...(status ? { status } : {}) }); }
          catch (error) { setExportError(getApiErrorMessage(error)); }
          finally { setExporting(false); }
        }}>{exporting ? "Exporting…" : "Export Excel"}</Button><Link href="/dashboard/lead/add" className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950">Create lead</Link></>}
      />
      {exportError ? <div className="mb-4"><ErrorNotice message={exportError} /></div> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total leads" value={stats?.total ?? "—"} />
        <Metric label="New today" value={stats?.newToday ?? "—"} />
        <Metric label="Unassigned" value={stats?.unassigned ?? "—"} />
        <Metric label="Overdue follow-ups" value={stats?.overdueFollowUps ?? "—"} />
      </div>
      <div className="mt-6">
        <Panel>
          <PanelTitle eyebrow="Enquiries" title="Lead pipeline" />
          <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search name, email, phone or purpose" className={inputClass} />
            <select value={status} onChange={(event) => { setStatus(event.target.value as LeadStatus | ""); setPage(1); }} className={inputClass}>{statuses.map((item) => <option key={item || "all"} value={item}>{item || "All statuses"}</option>)}</select>
            <Button secondary onClick={() => { setSearch(""); setStatus(""); setPage(1); }}>Clear</Button>
          </div>
          {list.isLoading ? <LoadingRows /> : list.error ? <ErrorNotice message={getApiErrorMessage(list.error)} /> : list.data?.data.length ? (
            <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="pb-3">Lead</th><th className="pb-3">Purpose</th><th className="pb-3">Source</th><th className="pb-3">Priority</th><th className="pb-3">Status</th><th className="pb-3 text-right">Action</th></tr></thead><tbody className="divide-y divide-white/8">{list.data.data.map((lead) => <tr key={lead.id ?? lead._id}><td className="py-4"><Link href={`/dashboard/lead/${lead.id ?? lead._id}`} className="font-bold hover:text-cyan-300">{lead.name}</Link><p className="mt-1 text-xs text-slate-500">{lead.email} · {lead.phone}</p></td><td className="max-w-xs py-4"><p className="line-clamp-2 text-slate-400">{lead.purpose}</p></td><td className="py-4 text-slate-400">{lead.source}</td><td className="py-4"><StatusBadge value={lead.priority} /></td><td className="py-4"><StatusBadge value={lead.status} /></td><td className="py-4 text-right"><Link href={`/dashboard/lead/${lead.id ?? lead._id}`} className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2.5 text-xs font-bold text-cyan-200">Manage</Link></td></tr>)}</tbody></table></div>
          ) : <Empty title="No leads found" description="New contact, consultation and administrator-created leads will appear here." />}
          <Pagination page={page} totalPages={list.data?.pagination.totalPages ?? 1} onPageChange={setPage} />
        </Panel>
      </div>
    </section>
  );
}

export function LeadCreatePage() {
  const router = useRouter();
  const users = useGetUsersQuery({ page: 1, limit: 100 });
  const [createLead, state] = useCreateAdminLeadMutation();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", purpose: "", location: "", contactPreference: "Any" as ContactPreference,
    status: "New" as LeadStatus, priority: "Medium" as LeadPriority, source: "Manual" as LeadSource,
    assignedTo: "", tags: "", internalSummary: "", nextFollowUpAt: "",
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const body: CreateAdminLeadInput = {
      name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim().toLowerCase(), purpose: form.purpose.trim(),
      pageUrl: typeof window === "undefined" ? "http://localhost/dashboard/lead/add" : window.location.href,
      pagePath: "/dashboard/lead/add", location: form.location.trim(), contactPreference: form.contactPreference,
      status: form.status, priority: form.priority, source: form.source,
      ...(form.assignedTo ? { assignedTo: form.assignedTo } : {}),
      ...(form.tags.trim() ? { tags: form.tags.split(",").map((item) => item.trim()).filter(Boolean) } : {}),
      ...(form.internalSummary.trim() ? { internalSummary: form.internalSummary.trim() } : {}),
      ...(form.nextFollowUpAt ? { nextFollowUpAt: new Date(form.nextFollowUpAt).toISOString() } : {}),
    };
    try {
      const response = await createLead(body).unwrap();
      router.replace(`/dashboard/lead/${response.data.id ?? response.data._id}`);
    } catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  return <section><PageHeading eyebrow="Manual entry" title="Create lead" description="Add a lead directly to the same pipeline used by public enquiry forms." action={<Link href="/dashboard/lead" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold">Cancel</Link>} />{error ? <ErrorNotice message={error} /> : null}<Panel><form onSubmit={submit} className="space-y-6"><div className="grid gap-4 md:grid-cols-2"><Text label="Name" value={form.name} set={(value) => setForm({ ...form, name: value })} required /><Text label="Email" value={form.email} set={(value) => setForm({ ...form, email: value })} type="email" required /><Text label="Phone" value={form.phone} set={(value) => setForm({ ...form, phone: value })} required /><Text label="Location" value={form.location} set={(value) => setForm({ ...form, location: value })} required /><Select label="Contact preference" value={form.contactPreference} values={contactPreferences} set={(value) => setForm({ ...form, contactPreference: value as ContactPreference })} /><Select label="Source" value={form.source} values={sources} set={(value) => setForm({ ...form, source: value as LeadSource })} /><Select label="Status" value={form.status} values={statuses.filter(Boolean) as LeadStatus[]} set={(value) => setForm({ ...form, status: value as LeadStatus })} /><Select label="Priority" value={form.priority} values={priorities} set={(value) => setForm({ ...form, priority: value as LeadPriority })} /><Field label="Assigned owner"><select value={form.assignedTo} onChange={(event) => setForm({ ...form, assignedTo: event.target.value })} className={inputClass}><option value="">Unassigned</option>{users.data?.data.map((user) => <option key={user.id ?? user._id} value={user.id ?? user._id}>{user.email}</option>)}</select></Field><Text label="Next follow-up" value={form.nextFollowUpAt} set={(value) => setForm({ ...form, nextFollowUpAt: value })} type="datetime-local" /><Text label="Tags (comma separated)" value={form.tags} set={(value) => setForm({ ...form, tags: value })} /><div className="md:col-span-2"><Area label="Purpose" value={form.purpose} set={(value) => setForm({ ...form, purpose: value })} required /><div className="mt-4"><Area label="Internal summary" value={form.internalSummary} set={(value) => setForm({ ...form, internalSummary: value })} /></div></div></div><Button type="submit" disabled={state.isLoading}>{state.isLoading ? "Creating…" : "Create lead"}</Button></form></Panel></section>;
}

export function LeadAdminDetail({ leadId }: { leadId: string }) {
  const router = useRouter();
  const detail = useGetLeadByIdQuery(leadId);
  const users = useGetUsersQuery({ page: 1, limit: 100 });
  const [updateLead, updateState] = useUpdateLeadMutation();
  const [addNote, noteState] = useAddLeadNoteMutation();
  const [deleteLead, deleteState] = useDeleteLeadMutation();
  const [notice, setNotice] = useState("");
  const [localError, setLocalError] = useState("");
  const [note, setNote] = useState("");
  const [initializedId, setInitializedId] = useState("");
  const [form, setForm] = useState({ status: "New" as LeadStatus, priority: "Medium" as LeadPriority, source: "Manual" as LeadSource, assignedTo: "", followUp: "", lostReason: "", summary: "", tags: "" });
  const selected = detail.data?.data;

  useEffect(() => {
    if (!selected || initializedId === (selected.id ?? selected._id)) return;
    setInitializedId(selected.id ?? selected._id);
    setForm({ status: selected.status, priority: selected.priority, source: selected.source, assignedTo: userId(selected.assignedTo), followUp: localDateTime(selected.nextFollowUpAt), lostReason: selected.lostReason ?? "", summary: selected.internalSummary ?? "", tags: selected.tags.join(", ") });
  }, [initializedId, selected]);

  async function saveLead() {
    setLocalError(""); setNotice("");
    try {
      await updateLead({ id: leadId, body: {
        status: form.status, priority: form.priority, source: form.source, assignedTo: form.assignedTo || null,
        tags: form.tags.split(",").map((item) => item.trim()).filter(Boolean), internalSummary: form.summary.trim() || null,
        nextFollowUpAt: form.followUp ? new Date(form.followUp).toISOString() : null,
        lostReason: form.status === "Lost" ? form.lostReason.trim() : null,
      } }).unwrap();
      setNotice("Lead updated successfully.");
    } catch (caught) { setLocalError(getApiErrorMessage(caught)); }
  }
  async function saveNote() { if (!note.trim()) return; setLocalError(""); try { await addNote({ id: leadId, text: note.trim() }).unwrap(); setNote(""); setNotice("Note added."); } catch (caught) { setLocalError(getApiErrorMessage(caught)); } }
  async function remove() { if (!window.confirm("Delete this lead permanently?")) return; try { await deleteLead(leadId).unwrap(); router.replace("/dashboard/lead"); } catch (caught) { setLocalError(getApiErrorMessage(caught)); } }

  if (detail.isLoading) return <LoadingRows count={8} />;
  if (detail.error || !selected) return <ErrorNotice message={getApiErrorMessage(detail.error ?? "Lead unavailable")} />;
  const busy = updateState.isLoading || noteState.isLoading || deleteState.isLoading;

  return <section><PageHeading eyebrow="Lead record" title={selected.name} description={`${selected.email} · ${selected.phone}`} action={<Link href="/dashboard/lead" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold">Back</Link>} />{localError ? <ErrorNotice message={localError} /> : null}{notice ? <SuccessNotice message={notice} /> : null}<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]"><div className="space-y-6"><Panel><div className="grid gap-3 sm:grid-cols-2"><Info label="Email" value={selected.email} /><Info label="Phone" value={selected.phone} /><Info label="Location" value={selected.location} /><Info label="Contact preference" value={selected.contactPreference} /><Info label="Page" value={selected.pagePath} /><Info label="Created" value={formatDate(selected.createdAt)} /></div><div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-5"><p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Purpose</p><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">{selected.purpose}</p></div></Panel><Panel><PanelTitle eyebrow="History" title="Internal notes" /><div className="space-y-3">{selected.notes?.length ? selected.notes.map((item, index) => <div key={item._id ?? index} className="rounded-2xl border border-white/8 bg-black/20 p-4"><p className="text-sm leading-6 text-slate-300">{item.text}</p><p className="mt-2 text-xs text-slate-600">{formatDate(item.createdAt)}</p></div>) : <p className="text-sm text-slate-500">No notes yet.</p>}</div><div className="mt-4 flex gap-3"><textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add an internal note" className={textareaClass} /><Button disabled={busy || !note.trim()} onClick={() => void saveNote()}>Add note</Button></div></Panel></div><aside><Panel><PanelTitle eyebrow="Pipeline" title="Manage lead" /><div className="space-y-4"><Select label="Status" value={form.status} values={statuses.filter(Boolean) as LeadStatus[]} set={(value) => setForm({ ...form, status: value as LeadStatus })} /><Select label="Priority" value={form.priority} values={priorities} set={(value) => setForm({ ...form, priority: value as LeadPriority })} /><Select label="Source" value={form.source} values={sources} set={(value) => setForm({ ...form, source: value as LeadSource })} /><Field label="Assigned owner"><select value={form.assignedTo} onChange={(event) => setForm({ ...form, assignedTo: event.target.value })} className={inputClass}><option value="">Unassigned</option>{users.data?.data.map((user) => <option key={user.id ?? user._id} value={user.id ?? user._id}>{user.email}</option>)}</select></Field><Text label="Next follow-up" value={form.followUp} set={(value) => setForm({ ...form, followUp: value })} type="datetime-local" />{form.status === "Lost" ? <Area label="Lost reason" value={form.lostReason} set={(value) => setForm({ ...form, lostReason: value })} required /> : null}<Text label="Tags" value={form.tags} set={(value) => setForm({ ...form, tags: value })} /><Area label="Internal summary" value={form.summary} set={(value) => setForm({ ...form, summary: value })} /><Button disabled={busy} onClick={() => void saveLead()}>{updateState.isLoading ? "Saving…" : "Save lead"}</Button><Button danger disabled={busy} onClick={() => void remove()}>Delete lead</Button></div></Panel></aside></div></section>;
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) { return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{description}</p></div>{action}</div>; }
function Info({ label, value }: { label: string; value?: string }) { return <div className="rounded-2xl border border-white/8 bg-black/20 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 break-all text-sm font-semibold text-slate-200">{value || "—"}</p></div>; }
function userId(value: Lead["assignedTo"]): string { if (!value) return ""; if (typeof value === "string") return value; return value.id ?? value._id ?? ""; }
function localDateTime(value?: string): string { return value ? new Date(value).toISOString().slice(0, 16) : ""; }
function Text({ label, value, set, required, type = "text" }: { label: string; value: string; set: (value: string) => void; required?: boolean; type?: string }) { return <Field label={label}><input required={required} type={type} value={value} onChange={(event) => set(event.target.value)} className={inputClass} /></Field>; }
function Area({ label, value, set, required }: { label: string; value: string; set: (value: string) => void; required?: boolean }) { return <Field label={label}><textarea required={required} rows={4} value={value} onChange={(event) => set(event.target.value)} className={textareaClass} /></Field>; }
function Select({ label, value, values, set }: { label: string; value: string; values: readonly string[]; set: (value: string) => void }) { return <Field label={label}><select value={value} onChange={(event) => set(event.target.value)} className={inputClass}>{values.map((item) => <option key={item}>{item}</option>)}</select></Field>; }
