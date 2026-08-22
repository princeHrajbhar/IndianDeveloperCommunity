"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CalendarClock, Mail, UserRoundCheck } from "lucide-react";
import { downloadAdminFile } from "@/src/lib/download";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useGetDocumentTemplatesQuery } from "@/src/lib/features/documents/document-api";
import {
  useBulkExternalStatusMutation,
  useCreateExternalApplicationMutation,
  useImportExternalApplicationsMutation,
  useListExternalApplicationsQuery,
  useReleaseExternalDocumentsMutation,
} from "@/src/lib/features/external-applications/external-application-api";
import type { ExternalSource } from "@/src/lib/features/external-applications/external-application-types";
import type { ApplicationStatus } from "@/src/lib/features/job-applications/job-application-types";
import { Button, Empty, ErrorNotice, Field, LoadingRows, Panel, PanelTitle, Pagination, StatusBadge, SuccessNotice, formatDate, inputClass } from "./admin-ui";

const statuses: ApplicationStatus[] = ["Applied", "Reviewing", "Shortlisted", "Interview Scheduled", "Interviewed", "Offered", "Hired", "Rejected", "Withdrawn"];

export function ExternalApplicationsPanel() {
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [source, setSource] = useState<Exclude<ExternalSource, "Manual">>("CSV");
  const [sheetUrl, setSheetUrl] = useState("");
  const [sourceLabel, setSourceLabel] = useState("");
  const [manualRows, setManualRows] = useState([{ key: "Name", value: "" }, { key: "Email", value: "" }]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<ApplicationStatus>("Reviewing");
  const [rowStatuses, setRowStatuses] = useState<Record<string, ApplicationStatus>>({});
  const [templateId, setTemplateId] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  const list = useListExternalApplicationsQuery({ page, limit: 25, ...(search.trim() ? { search: search.trim() } : {}), ...(status ? { status } : {}), ...(fromDate ? { fromDate } : {}), ...(toDate ? { toDate } : {}) });
  const templates = useGetDocumentTemplatesQuery({ page: 1, limit: 100, status: "active" });
  const [createManual, manualState] = useCreateExternalApplicationMutation();
  const [doImport, importState] = useImportExternalApplicationsMutation();
  const [doBulk, bulkState] = useBulkExternalStatusMutation();
  const [release, releaseState] = useReleaseExternalDocumentsMutation();
  const items = list.data?.data ?? [];
  const columns = list.data?.columns ?? [];
  const all = items.length > 0 && items.every((item) => selected.includes(item.id));
  const busy = manualState.isLoading || importState.isLoading || bulkState.isLoading || releaseState.isLoading || exporting;

  async function manual(event: FormEvent) {
    event.preventDefault();
    setError("");
    const fields = Object.fromEntries(manualRows.filter((row) => row.key.trim()).map((row) => [row.key.trim(), row.value]));
    try {
      await createManual({ fields, ...(sourceLabel.trim() ? { sourceLabel: sourceLabel.trim() } : {}) }).unwrap();
      setNotice("Manual external application added.");
      setManualRows([{ key: "Name", value: "" }, { key: "Email", value: "" }]);
    } catch (cause) { setError(getApiErrorMessage(cause)); }
  }

  async function importRows() {
    setError("");
    try {
      const result = await doImport({ source, ...((source === "CSV" || source === "Excel") && fileInput ? { file: fileInput } : {}), ...((source === "Google Sheet" || source === "Google Form") ? { sheetUrl } : {}), ...(sourceLabel.trim() ? { sourceLabel: sourceLabel.trim() } : {}) }).unwrap();
      setNotice(`${result.data.imported} rows imported. Arbitrary columns were preserved.`);
    } catch (cause) { setError(getApiErrorMessage(cause)); }
  }

  async function changeStatus(ids: string[], nextStatus: ApplicationStatus) {
    if (!ids.length) return;
    setError("");
    try {
      const result = await doBulk({ ids, status: nextStatus }).unwrap();
      const delivery = result.data.email;
      const emailSummary = delivery
        ? ` Email: ${delivery.sent} sent, ${delivery.skipped} blocked, ${delivery.failed} failed${delivery.noEmail ? `, ${delivery.noEmail} without email` : ""}.`
        : "";
      setNotice(`${result.data.updated} external application${result.data.updated === 1 ? "" : "s"} updated to ${nextStatus}.${emailSummary}`);
      setSelected([]);
      setRowStatuses((current) => {
        const next = { ...current };
        ids.forEach((id) => delete next[id]);
        return next;
      });
    } catch (cause) { setError(getApiErrorMessage(cause)); }
  }

  async function releaseDocs() {
    if (!selected.length || !templateId) return;
    try {
      const result = await release({ applicationIds: selected, templateId, sendEmail: true }).unwrap();
      setNotice(`${result.data.released} documents released; ${result.data.failed} release failures${result.data.emailFailed ? `; ${result.data.emailFailed} email delivery failures (documents remain released)` : ""}. External-application emails include the QuantumFinix profile-completion reminder.`);
      setSelected([]);
    } catch (cause) { setError(getApiErrorMessage(cause)); }
  }

  async function exportRows() {
    setExporting(true);
    try { await downloadAdminFile("/external-applications/export", "external-applications.xlsx", { ...(search.trim() ? { search: search.trim() } : {}), ...(status ? { status } : {}), ...(fromDate ? { fromDate } : {}), ...(toDate ? { toDate } : {}) }); }
    catch (cause) { setError(getApiErrorMessage(cause)); }
    finally { setExporting(false); }
  }

  return <section className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Talent intake</p>
        <h1 className="qf-text mt-2 text-3xl font-black">External applications</h1>
        <p className="qf-muted mt-2 max-w-3xl text-sm leading-6">External candidates remain independent from the internal application workflow. HR can move them directly to any status, communicate by email, and schedule interviews without requiring an existing QuantumFinix account.</p>
      </div>
      <Button secondary disabled={busy} onClick={() => void exportRows()}>{exporting ? "Exporting…" : "Export Excel"}</Button>
    </div>
    {error ? <ErrorNotice message={error} /> : null}{notice ? <SuccessNotice message={notice} /> : null}

    <div className="qf-status-info flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm">
      <UserRoundCheck className="mt-0.5 h-5 w-5 shrink-0" />
      <p><strong>No pipeline transition restriction:</strong> any external application can move directly to any valid status. Status changes are saved even if email delivery is blocked or temporarily fails. Every external-applicant email reminds the candidate to complete their QuantumFinix profile for further updates.</p>
    </div>

    <div className="grid gap-6 xl:grid-cols-2">
      <Panel>
        <PanelTitle eyebrow="Import" title="CSV, Excel, Google Sheet or Google Form" />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Source"><select value={source} onChange={(event) => setSource(event.target.value as Exclude<ExternalSource, "Manual">)} className={inputClass}><option>CSV</option><option>Excel</option><option>Google Sheet</option><option>Google Form</option></select></Field>
          <Field label="Source label"><input value={sourceLabel} onChange={(event) => setSourceLabel(event.target.value)} className={inputClass} placeholder="Campaign / form name" /></Field>
          {source === "CSV" || source === "Excel" ? <Field label="File"><input type="file" accept=".csv,.xlsx" onChange={(event) => setFileInput(event.target.files?.[0] ?? null)} className={inputClass} /></Field> : <div className="md:col-span-2"><Field label={source === "Google Form" ? "Linked response Google Sheet URL" : "Google Sheet URL"}><input value={sheetUrl} onChange={(event) => setSheetUrl(event.target.value)} className={inputClass} placeholder="Paste a public/shared Google Sheet URL" /></Field></div>}
          <div className="md:col-span-2"><Button disabled={busy || ((source === "CSV" || source === "Excel") ? !fileInput : !sheetUrl)} onClick={() => void importRows()}>Import applications</Button></div>
        </div>
      </Panel>
      <Panel>
        <PanelTitle eyebrow="Manual" title="Add arbitrary fields" />
        <form onSubmit={manual} className="space-y-3">
          {manualRows.map((row, index) => <div key={index} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-2"><input value={row.key} onChange={(event) => setManualRows((rows) => rows.map((entry, position) => position === index ? { ...entry, key: event.target.value } : entry))} className={inputClass} placeholder="Column name" /><input value={row.value} onChange={(event) => setManualRows((rows) => rows.map((entry, position) => position === index ? { ...entry, value: event.target.value } : entry))} className={inputClass} placeholder="Value" /><Button type="button" secondary onClick={() => setManualRows((rows) => rows.filter((_, position) => position !== index))}>×</Button></div>)}
          <div className="flex flex-wrap gap-2"><Button type="button" secondary onClick={() => setManualRows((rows) => [...rows, { key: "", value: "" }])}>Add field</Button><Button type="submit" disabled={busy}>Save manual entry</Button></div>
        </form>
      </Panel>
    </div>

    <Panel>
      <PanelTitle eyebrow="Pipeline" title="Imported application records" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} className={inputClass} placeholder="Search any imported field" /><select value={status} onChange={(event) => { setStatus(event.target.value as ApplicationStatus | ""); setPage(1); }} className={inputClass}><option value="">All statuses</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select><input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} className={inputClass} /><input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} className={inputClass} /><Button secondary onClick={() => { setSearch(""); setStatus(""); setFromDate(""); setToDate(""); }}>Clear</Button></div>

      <div className="qf-surface-muted my-4 grid gap-3 rounded-2xl border p-4 sm:grid-cols-2 xl:grid-cols-[auto_220px_auto_minmax(220px,1fr)_auto]">
        <span className="qf-text self-center text-sm font-bold">{selected.length} selected</span>
        <select value={bulkStatus} onChange={(event) => setBulkStatus(event.target.value as ApplicationStatus)} className={inputClass}>{statuses.map((item) => <option key={item}>{item}</option>)}</select>
        <Button disabled={!selected.length || busy} onClick={() => void changeStatus(selected, bulkStatus)}>Change status + email</Button>
        <select value={templateId} onChange={(event) => setTemplateId(event.target.value)} className={inputClass}><option value="">Choose document template</option>{templates.data?.data.map((template) => <option key={template.id ?? template._id} value={template.id ?? template._id}>{template.name}</option>)}</select>
        <Button secondary disabled={!selected.length || !templateId || busy} onClick={() => void releaseDocs()}>Bulk release</Button>
      </div>

      {list.isLoading ? <LoadingRows /> : list.error ? <ErrorNotice message={getApiErrorMessage(list.error)} /> : items.length ? <div className="overflow-x-auto rounded-xl border qf-border"><table className="w-full min-w-[1120px] text-left text-sm"><thead className="qf-surface-muted text-[10px] uppercase tracking-wider qf-muted"><tr><th className="p-3"><input type="checkbox" aria-label="Select all visible" checked={all} onChange={() => setSelected(all ? [] : items.map((item) => item.id))} /></th><th className="p-3">Status & tracking</th><th className="p-3">Source</th><th className="p-3">Imported</th><th className="p-3">Communication</th>{columns.map((column) => <th key={column} className="p-3">{column}</th>)}</tr></thead><tbody className="qf-border divide-y">{items.map((item) => {
        const selectedStatus = rowStatuses[item.id] ?? item.status;
        const lastChange = item.statusHistory?.[item.statusHistory.length - 1];
        return <tr key={item.id} className="align-top">
          <td className="p-3"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => setSelected((current) => current.includes(item.id) ? current.filter((value) => value !== item.id) : [...current, item.id])} /></td>
          <td className="p-3"><div className="min-w-[230px]"><StatusBadge value={item.status} /><div className="mt-2 flex gap-2"><select aria-label={`Status for ${item.name || item.email || item.id}`} value={selectedStatus} onChange={(event) => setRowStatuses((current) => ({ ...current, [item.id]: event.target.value as ApplicationStatus }))} className={`${inputClass} h-9 min-w-0 py-0 text-xs`}>{statuses.map((value) => <option key={value}>{value}</option>)}</select><Button className="min-h-9 shrink-0 px-3 py-1 text-xs" disabled={busy || selectedStatus === item.status} onClick={() => void changeStatus([item.id], selectedStatus)}>Update</Button></div>{lastChange ? <><p className="qf-muted mt-2 text-[10px]">Last changed {formatDate(lastChange.changedAt)}</p><details className="mt-2"><summary className="qf-text-secondary cursor-pointer text-[10px] font-bold">Status history ({item.statusHistory?.length ?? 0})</summary><div className="qf-surface-muted mt-2 max-h-36 space-y-1 overflow-y-auto rounded-lg border p-2">{[...(item.statusHistory ?? [])].reverse().map((entry, historyIndex) => <p key={`${entry.changedAt}-${historyIndex}`} className="qf-muted text-[10px]"><span className="qf-text-secondary font-bold">{entry.fromStatus} → {entry.toStatus}</span> · {formatDate(entry.changedAt)}</p>)}</div></details></> : <p className="qf-muted mt-2 text-[10px]">No status changes yet</p>}</div></td>
          <td className="qf-text-secondary p-3 text-xs">{item.source}{item.sourceLabel ? <span className="qf-muted mt-1 block">{item.sourceLabel}</span> : null}</td>
          <td className="qf-muted p-3 text-xs">{formatDate(item.importedAt)}</td>
          <td className="p-3"><div className="flex min-w-[210px] flex-wrap gap-2">{item.email ? <><Link href={`/hr-management/communication?tab=direct-email&recipientEmail=${encodeURIComponent(item.email)}&recipientName=${encodeURIComponent(item.name || "")}&source=external-application`} className="qf-secondary-button inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-black"><Mail className="h-3.5 w-3.5" />Email</Link><Link href={`/hr-management/scheduling?recipientEmail=${encodeURIComponent(item.email)}&recipientName=${encodeURIComponent(item.name || "")}&externalApplicationId=${encodeURIComponent(item.id)}`} className="qf-primary-button inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-black"><CalendarClock className="h-3.5 w-3.5" />Schedule</Link></> : <span className="qf-muted text-xs">No email available</span>}</div></td>
          {columns.map((column) => <td key={column} className="qf-text-secondary max-w-[260px] truncate p-3">{item.fields[column] ?? ""}</td>)}
        </tr>;
      })}</tbody></table></div> : <Empty title="No external applications" description="Import a file, linked Google Sheet/Form response sheet, or add a manual record." />}
      <Pagination page={page} totalPages={list.data?.pagination.totalPages ?? 1} onPageChange={setPage} />
    </Panel>
  </section>;
}
