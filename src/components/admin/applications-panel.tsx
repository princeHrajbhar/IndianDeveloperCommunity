"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { downloadAdminFile } from "@/src/lib/download";
import {
  useAdminDeleteJobApplicationMutation,
  useAdminGetJobApplicationQuery,
  useAdminListJobApplicationsQuery,
  useAdminUpdateJobApplicationStatusMutation,
} from "@/src/lib/features/job-applications/job-application-api";
import type {
  ApplicationStatus,
  JobApplication,
  JobReference,
} from "@/src/lib/features/job-applications/job-application-types";
import {
  Button,
  Empty,
  ErrorNotice,
  Field,
  LoadingRows,
  Panel,
  PanelTitle,
  Pagination,
  StatusBadge,
  SuccessNotice,
  formatDate,
  inputClass,
  textareaClass,
} from "./admin-ui";

const statuses: Array<ApplicationStatus | ""> = [
  "",
  "Applied",
  "Reviewing",
  "Shortlisted",
  "Interview Scheduled",
  "Interviewed",
  "Offered",
  "Hired",
  "Rejected",
  "Withdrawn",
];

export function ApplicationsPanel() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<ApplicationStatus | "">("");
  const [email, setEmail] = useState("");
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const list = useAdminListJobApplicationsQuery({
    page,
    limit: 15,
    ...(status ? { status } : {}),
    ...(email.trim() ? { email: email.trim() } : {}),
  });
  const applications = list.data?.data ?? [];

  return (
    <section>
      <PageHeading
        eyebrow="Candidate pipeline"
        title="Applications"
        description="Review each candidate on a dedicated route with fresh signed document links."
        action={<Button secondary disabled={exporting} onClick={async () => {
          setExportError(""); setExporting(true);
          try { await downloadAdminFile("/job-applications/admin/export", "quantumfinix-applications.xlsx", { ...(status ? { status } : {}), ...(email.trim() ? { email: email.trim() } : {}) }); }
          catch (error) { setExportError(getApiErrorMessage(error)); }
          finally { setExporting(false); }
        }}>{exporting ? "Exporting…" : "Export Excel"}</Button>}
      />
      {exportError ? <div className="mb-4"><ErrorNotice message={exportError} /></div> : null}
      <Panel>
        <PanelTitle eyebrow="Pipeline" title="Candidate applications" />
        <div className="mb-5 grid gap-3 md:grid-cols-[220px_1fr_auto]">
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as ApplicationStatus | "");
              setPage(1);
            }}
            className={inputClass}
          >
            {statuses.map((item) => (
              <option key={item || "all"} value={item}>{item || "All statuses"}</option>
            ))}
          </select>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Filter by exact candidate email"
            className={inputClass}
          />
          <Button secondary onClick={() => { setEmail(""); setStatus(""); setPage(1); }}>Clear</Button>
        </div>
        {list.isLoading ? (
          <LoadingRows />
        ) : list.error ? (
          <ErrorNotice message={getApiErrorMessage(list.error)} />
        ) : applications.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="text-[10px] uppercase tracking-wider text-slate-500">
                <tr><th className="pb-3">Candidate</th><th className="pb-3">Job</th><th className="pb-3">Applied</th><th className="pb-3">Status</th><th className="pb-3 text-right">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="py-4"><p className="font-bold">{application.personalInfo.firstName} {application.personalInfo.lastName}</p><p className="mt-1 text-xs text-slate-500">{application.personalInfo.email}</p></td>
                    <td className="py-4 text-slate-300">{jobLabel(application.jobId)}</td>
                    <td className="py-4 text-xs text-slate-500">{formatDate(application.appliedAt)}</td>
                    <td className="py-4"><StatusBadge value={application.status} /></td>
                    <td className="py-4 text-right"><Link href={`/dashboard/application/${application.id}`} className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2.5 text-xs font-bold text-cyan-200">Review</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty title="No applications found" description="Applications matching the selected filters will appear here." />
        )}
<Pagination page={page} totalPages={list.data?.pagination.totalPages ?? 1} onPageChange={setPage} />
      </Panel>
    </section>
  );
}

export function ApplicationAdminDetail({ applicationId }: { applicationId: string }) {
  const router = useRouter();
  const detail = useAdminGetJobApplicationQuery(applicationId, {
    refetchOnMountOrArgChange: true,
  });
  const selected = detail.data?.data;
  const [nextStatus, setNextStatus] = useState<ApplicationStatus>("Reviewing");
  const [notes, setNotes] = useState("");
  const [initializedId, setInitializedId] = useState("");
  const [notice, setNotice] = useState("");
  const [localError, setLocalError] = useState("");
  const [updateStatus, updateState] = useAdminUpdateJobApplicationStatusMutation();
  const [removeApplication, removeState] = useAdminDeleteJobApplicationMutation();

  useEffect(() => {
    if (!selected || initializedId === selected.id) return;
    setInitializedId(selected.id);
    setNextStatus(selected.status);
    setNotes(selected.recruiterNotes ?? "");
  }, [initializedId, selected]);

  async function saveStatus() {
    setLocalError(""); setNotice("");
    try {
      const response = await updateStatus({
        id: applicationId,
        status: nextStatus,
        ...(notes.trim() ? { recruiterNotes: notes.trim() } : {}),
      }).unwrap();
      setNotice(
        response.message || (response.meta?.notificationEmailQueued
          ? "Application status updated and candidate notification queued. If it is not in the inbox, ask the candidate to check the spam or junk folder."
          : "Application status updated. The email worker did not accept the notification; inspect Queue management."),
      );
    } catch (error) {
      setLocalError(getApiErrorMessage(error));
    }
  }

  async function remove() {
    if (!window.confirm("Delete this application and all stored documents?")) return;
    setLocalError("");
    try {
      await removeApplication(applicationId).unwrap();
      router.replace("/dashboard/application");
    } catch (error) {
      setLocalError(getApiErrorMessage(error));
    }
  }

  if (detail.isLoading) return <LoadingRows count={8} />;
  if (detail.error || !selected) return <ErrorNotice message={getApiErrorMessage(detail.error ?? "Application unavailable")} />;

  return (
    <section>
      <PageHeading
        eyebrow="Candidate record"
        title={`${selected.personalInfo.firstName} ${selected.personalInfo.lastName}`}
        description={`${jobLabel(selected.jobId)} · Applied ${formatDate(selected.appliedAt)}`}
        action={<div className="flex gap-2"><Button secondary onClick={() => void detail.refetch()}>Refresh links</Button><Link href="/dashboard/application" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold">Back</Link></div>}
      />
      {localError ? <ErrorNotice message={localError} /> : null}
      {notice ? <SuccessNotice message={notice} /> : null}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Panel>
          <InfoGrid application={selected} />
          <Collection title="Education" items={selected.education.map((item) => `${item.degree} · ${item.schoolOrUniversity} · ${item.startDate.slice(0, 10)} to ${item.endDate.slice(0, 10)}`)} />
          <Collection title="Experience" items={selected.experience.map((item) => `${item.role} at ${item.companyName} · ${item.responsibilities}`)} />
          <Collection title="Screening answers" items={(selected.screeningAnswers ?? []).map((item) => `${item.question}: ${Array.isArray(item.answer) ? item.answer.join(", ") : item.answer}`)} />
          <Collection title="Links" items={Object.entries(selected.socialLinks ?? {}).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`)} />
          <div className="mt-6 flex flex-wrap gap-3">
            {selected.documents?.resume ? <a target="_blank" rel="noreferrer" href={selected.documents.resume.url} className="rounded-xl border border-cyan-300/20 px-4 py-2 text-sm font-bold text-cyan-200">Open resume</a> : null}
            {selected.documents?.photo ? <a target="_blank" rel="noreferrer" href={selected.documents.photo.url} className="rounded-xl border border-cyan-300/20 px-4 py-2 text-sm font-bold text-cyan-200">Open photo</a> : null}
            {selected.documents?.coverLetter ? <a target="_blank" rel="noreferrer" href={selected.documents.coverLetter.url} className="rounded-xl border border-cyan-300/20 px-4 py-2 text-sm font-bold text-cyan-200">Open cover letter</a> : null}
          </div>
        </Panel>
        <aside className="space-y-6">
          <Panel>
            <PanelTitle eyebrow="Decision" title="Application status" />
            <Field label="New status"><select value={nextStatus} onChange={(event) => setNextStatus(event.target.value as ApplicationStatus)} className={inputClass}>{statuses.filter(Boolean).map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
            <div className="mt-4"><Field label="Recruiter notes"><textarea rows={9} value={notes} onChange={(event) => setNotes(event.target.value)} className={textareaClass} /></Field></div>
            <div className="mt-5 grid gap-3"><Button disabled={updateState.isLoading} onClick={() => void saveStatus()}>{updateState.isLoading ? "Updating…" : "Update status"}</Button><Button danger disabled={removeState.isLoading} onClick={() => void remove()}>Delete application</Button></div>
          </Panel>
          <Panel><PanelTitle eyebrow="Current state" title="Pipeline status" /><StatusBadge value={selected.status} /><p className="mt-4 text-xs leading-5 text-slate-500">Application ID: {selected.id}</p></Panel>
        </aside>
      </div>
    </section>
  );
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) { return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{description}</p></div>{action}</div>; }
function jobLabel(job: JobReference): string { return typeof job === "string" ? job : job.title || job.id || job._id || "Job"; }
function InfoGrid({ application }: { application: JobApplication }) { const fields = [["Email", application.personalInfo.email], ["Phone", application.personalInfo.phoneNumber], ["Gender", application.personalInfo.gender], ["Date of birth", application.personalInfo.dateOfBirth?.slice(0, 10)], ["Location", application.personalInfo.currentLocation], ["Application ID", application.id]]; return <div className="grid gap-3 sm:grid-cols-2">{fields.map(([label, value]) => <div key={label} className="rounded-2xl border border-white/8 bg-black/20 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 break-all text-sm font-semibold text-slate-200">{value || "—"}</p></div>)}</div>; }
function Collection({ title, items }: { title: string; items: string[] }) { return <div className="mt-6"><h3 className="text-sm font-black uppercase tracking-wider text-cyan-300">{title}</h3>{items.length ? <ul className="mt-3 space-y-2">{items.map((item, index) => <li key={`${title}-${index}`} className="rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-300">{item}</li>)}</ul> : <p className="mt-2 text-sm text-slate-500">No data provided.</p>}</div>; }