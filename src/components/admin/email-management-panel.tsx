"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useBlockEmailMutation,
  useCreateEmailCampaignMutation,
  useCreateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  useGetEmailCampaignsQuery,
  useGetEmailSuppressionsQuery,
  useGetEmailTemplatesQuery,
  usePreviewEmailAudienceMutation,
  useUnblockEmailMutation,
  useUpdateEmailTemplateMutation,
} from "@/src/lib/features/email-management/email-api";
import type {
  AudienceRequest,
  EmailAudience,
  EmailTemplateRecord,
} from "@/src/lib/features/email-management/email-types";
import {
  Button,
  Empty,
  ErrorNotice,
  Field,
  LoadingRows,
  Pagination,
  Panel,
  PanelTitle,
  StatusBadge,
  SuccessNotice,
  formatDate,
  inputClass,
  textareaClass,
} from "./admin-ui";

const applicationStatuses = ["Applied", "Reviewing", "Shortlisted", "Interview Scheduled", "Interviewed", "Offered", "Hired", "Rejected", "Withdrawn"];
const leadStatuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Converted", "Lost", "Spam"];
const leadSources = ["Website Form", "Contact Page", "Landing Page", "Referral", "Social Media", "Campaign", "Manual", "Other"];
const leadPriorities = ["Low", "Medium", "High", "Urgent"];

export function EmailManagementPanel() {
  return (
    <section>
      <header className="mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Communication</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">Bulk email</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          Queue filtered or selective email campaigns, manage reusable templates, and block addresses from every transactional and bulk message.
        </p>
      </header>
      <div className="space-y-6">
        <CampaignComposer />
        <div className="grid gap-6 xl:grid-cols-2">
          <TemplateManager />
          <SuppressionManager />
        </div>
        <CampaignHistory />
      </div>
    </section>
  );
}

function CampaignComposer() {
  const templatesQuery = useGetEmailTemplatesQuery();
  const templates = useMemo(
    () => [...(templatesQuery.data?.data.builtIn ?? []), ...(templatesQuery.data?.data.custom ?? [])],
    [templatesQuery.data],
  );
  const [audience, setAudience] = useState<EmailAudience>("users");
  const [campaignName, setCampaignName] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [verified, setVerified] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [jobId, setJobId] = useState("");
  const [manualEmails, setManualEmails] = useState("");
  const [selectiveOnly, setSelectiveOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [previewAudience, previewState] = usePreviewEmailAudienceMutation();
  const [createCampaign, createState] = useCreateEmailCampaignMutation();
  const preview = previewState.data?.data;

  useEffect(() => {
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;
    setSubject(template.subject);
    setHtml(template.html);
    setCampaignName((current) => current || template.name);
  }, [templateId, templates]);

  useEffect(() => {
    setSelectedIds(new Set());
    previewState.reset();
  }, [audience]); // eslint-disable-line react-hooks/exhaustive-deps

  function requestBody(includeSelectedRecipients = true): AudienceRequest {
    const filters = {
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(role ? { role } : {}),
      ...(verified ? { isVerified: verified === "true" } : {}),
      ...(status ? { status } : {}),
      ...(source ? { source } : {}),
      ...(priority ? { priority } : {}),
      ...(jobId.trim() ? { jobId: jobId.trim() } : {}),
    };
    return {
      audience,
      filters,
      ...(audience === "manual" ? { selectedEmails: parseEmails(manualEmails) } : {}),
      ...(includeSelectedRecipients && selectiveOnly && selectedIds.size ? { selectedIds: [...selectedIds] } : {}),
    };
  }

  async function previewRecipients() {
    setError(""); setNotice("");
    setSelectedIds(new Set());
    try {
      await previewAudience(requestBody(false)).unwrap();
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    if (selectiveOnly && audience !== "manual" && selectedIds.size === 0) {
      setError("Select at least one previewed recipient or turn off selective sending.");
      return;
    }
    try {
      const response = await createCampaign({
        ...requestBody(),
        name: campaignName.trim(),
        ...(templateId ? { templateId } : {}),
        subject: subject.trim(),
        html: html.trim(),
        ...(replyTo.trim() ? { replyTo: replyTo.trim().toLowerCase() } : {}),
      }).unwrap();
      setNotice(response.message || "Campaign queued. Ask recipients to check spam or junk if the message is not in their inbox.");
      setSelectedIds(new Set());
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  return (
    <Panel>
      <PanelTitle eyebrow="Worker queue" title="Compose campaign" />
      {error ? <div className="mb-4"><ErrorNotice message={error} /></div> : null}
      {notice ? <div className="mb-4"><SuccessNotice message={notice} /></div> : null}
      <form onSubmit={submit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Campaign name"><input required value={campaignName} onChange={(event) => setCampaignName(event.target.value)} className={inputClass} placeholder="August hiring update" /></Field>
          <Field label="Audience"><select value={audience} onChange={(event) => setAudience(event.target.value as EmailAudience)} className={inputClass}><option value="users">Users</option><option value="leads">Leads</option><option value="applications">Applications</option><option value="manual">Manual emails</option></select></Field>
          <Field label="Template"><select value={templateId} onChange={(event) => setTemplateId(event.target.value)} className={inputClass}><option value="">Custom message</option>{templates.map((template) => <option key={template.id} value={template.id}>{template.name}{template.builtIn ? " · built in" : ""}</option>)}</select></Field>
          <Field label="Reply-to (optional)"><input type="email" value={replyTo} onChange={(event) => setReplyTo(event.target.value)} className={inputClass} /></Field>
        </div>

        <AudienceFilters
          audience={audience}
          search={search} setSearch={setSearch}
          role={role} setRole={setRole}
          verified={verified} setVerified={setVerified}
          status={status} setStatus={setStatus}
          source={source} setSource={setSource}
          priority={priority} setPriority={setPriority}
          jobId={jobId} setJobId={setJobId}
          manualEmails={manualEmails} setManualEmails={setManualEmails}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <Field label="Subject" hint="Variables: {{name}}, {{email}}, {{role}}, {{status}}, {{jobTitle}}"><input required value={subject} onChange={(event) => setSubject(event.target.value)} className={inputClass} /></Field>
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
            <input type="checkbox" checked={selectiveOnly} onChange={(event) => setSelectiveOnly(event.target.checked)} className="h-4 w-4 accent-cyan-300" disabled={audience === "manual"} />
            Send only to recipients selected in the preview
          </label>
        </div>
        <Field label="Email content (safe HTML supported)" hint="Use paragraphs, headings, lists, links, and the variables shown above. Scripts and embedded forms are blocked."><textarea required value={html} onChange={(event) => setHtml(event.target.value)} className={`${textareaClass} min-h-56 font-mono text-xs`} /></Field>

        <div className="flex flex-wrap gap-3">
          <Button secondary disabled={previewState.isLoading} onClick={() => void previewRecipients()}>{previewState.isLoading ? "Checking…" : "Preview recipients"}</Button>
          <Button type="submit" disabled={createState.isLoading}>{createState.isLoading ? "Queueing…" : "Queue campaign"}</Button>
        </div>
      </form>

      {preview ? (
        <div className="mt-6 border-t border-white/10 pt-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <StatusBadge value={`${preview.available} available`} />
            <StatusBadge value={`${preview.blocked} blocked`} />
            <span className="text-xs text-slate-500">{preview.total} matching recipient(s){preview.truncated ? " · first 100 shown" : ""}</span>
          </div>
          {preview.recipients.length ? <div className="max-h-80 overflow-y-auto rounded-2xl border border-white/10"><table className="w-full min-w-[620px] text-left text-sm"><thead className="sticky top-0 bg-[#07101f] text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="p-3">Select</th><th className="p-3">Recipient</th><th className="p-3">Source</th><th className="p-3">Communication</th></tr></thead><tbody className="divide-y divide-white/8">{preview.recipients.map((recipient) => <tr key={`${recipient.source}-${recipient.id || recipient.email}`}><td className="p-3"><input type="checkbox" disabled={recipient.blocked || !recipient.id} checked={Boolean(recipient.id && selectedIds.has(recipient.id))} onChange={() => recipient.id && setSelectedIds((current) => toggleSet(current, recipient.id!))} className="h-4 w-4 accent-cyan-300" /></td><td className="p-3"><p className="font-bold">{recipient.name}</p><p className="mt-1 text-xs text-slate-500">{recipient.email}</p></td><td className="p-3 text-slate-400">{recipient.source}</td><td className="p-3"><StatusBadge value={recipient.blocked ? "Blocked" : "Allowed"} /></td></tr>)}</tbody></table></div> : <Empty title="No recipients" description="Change the audience filters and preview again." />}
        </div>
      ) : null}
    </Panel>
  );
}

function AudienceFilters(props: {
  audience: EmailAudience;
  search: string; setSearch: (value: string) => void;
  role: string; setRole: (value: string) => void;
  verified: string; setVerified: (value: string) => void;
  status: string; setStatus: (value: string) => void;
  source: string; setSource: (value: string) => void;
  priority: string; setPriority: (value: string) => void;
  jobId: string; setJobId: (value: string) => void;
  manualEmails: string; setManualEmails: (value: string) => void;
}) {
  if (props.audience === "manual") return <Field label="Recipient emails" hint="Separate email addresses with commas, spaces, or new lines."><textarea required value={props.manualEmails} onChange={(event) => props.setManualEmails(event.target.value)} className={textareaClass} /></Field>;
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <Field label="Search"><input value={props.search} onChange={(event) => props.setSearch(event.target.value)} className={inputClass} placeholder="Name or email" /></Field>
    {props.audience === "users" ? <><Field label="Role"><input value={props.role} onChange={(event) => props.setRole(event.target.value)} className={inputClass} placeholder="user, admin…" /></Field><Field label="Verification"><select value={props.verified} onChange={(event) => props.setVerified(event.target.value)} className={inputClass}><option value="">Any</option><option value="true">Verified</option><option value="false">Unverified</option></select></Field></> : null}
    {props.audience === "leads" ? <><Field label="Status"><select value={props.status} onChange={(event) => props.setStatus(event.target.value)} className={inputClass}><option value="">Any</option>{leadStatuses.map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Source"><select value={props.source} onChange={(event) => props.setSource(event.target.value)} className={inputClass}><option value="">Any</option>{leadSources.map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Priority"><select value={props.priority} onChange={(event) => props.setPriority(event.target.value)} className={inputClass}><option value="">Any</option>{leadPriorities.map((item) => <option key={item}>{item}</option>)}</select></Field></> : null}
    {props.audience === "applications" ? <><Field label="Application status"><select value={props.status} onChange={(event) => props.setStatus(event.target.value)} className={inputClass}><option value="">Any</option>{applicationStatuses.map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Job ID (optional)"><input value={props.jobId} onChange={(event) => props.setJobId(event.target.value)} className={inputClass} /></Field></> : null}
  </div>;
}

function TemplateManager() {
  const query = useGetEmailTemplatesQuery();
  const [createTemplate, createState] = useCreateEmailTemplateMutation();
  const [updateTemplate, updateState] = useUpdateEmailTemplateMutation();
  const [deleteTemplate, deleteState] = useDeleteEmailTemplateMutation();
  const [editingId, setEditingId] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function resetForm() {
    setEditingId("");
    setName("");
    setSubject("");
    setHtml("");
  }

  function edit(template: EmailTemplateRecord) {
    setEditingId(template.id);
    setName(template.name);
    setSubject(template.subject);
    setHtml(template.html);
    setError("");
    setNotice("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      if (editingId) {
        await updateTemplate({ id: editingId, body: { name, subject, html } }).unwrap();
        setNotice("Template updated.");
      } else {
        await createTemplate({ name, subject, html }).unwrap();
        setNotice("Template saved.");
      }
      resetForm();
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  async function remove(template: EmailTemplateRecord) {
    if (!window.confirm(`Delete template “${template.name}”?`)) return;
    setError("");
    try {
      await deleteTemplate(template.id).unwrap();
      if (editingId === template.id) resetForm();
      setNotice("Template deleted.");
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  const custom = query.data?.data.custom ?? [];
  const saving = createState.isLoading || updateState.isLoading;

  return (
    <Panel>
      <PanelTitle eyebrow="Reusable content" title="Custom templates" />
      {error ? <ErrorNotice message={error} /> : null}
      {notice ? <div className="mt-3"><SuccessNotice message={notice} /></div> : null}
      <form onSubmit={submit} className="mt-5 space-y-4">
        <Field label="Template name"><input required value={name} onChange={(event) => setName(event.target.value)} className={inputClass} /></Field>
        <Field label="Default subject"><input required value={subject} onChange={(event) => setSubject(event.target.value)} className={inputClass} /></Field>
        <Field label="HTML content"><textarea required value={html} onChange={(event) => setHtml(event.target.value)} className={`${textareaClass} min-h-36 font-mono text-xs`} /></Field>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : editingId ? "Update template" : "Save template"}</Button>
          {editingId ? <Button secondary onClick={resetForm}>Cancel edit</Button> : null}
        </div>
      </form>
      <div className="mt-6 space-y-3">
        {query.isLoading ? <LoadingRows count={2} /> : custom.length ? custom.map((template) => (
          <div key={template.id} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="min-w-0"><p className="font-bold">{template.name}</p><p className="mt-1 truncate text-xs text-slate-500">{template.subject}</p></div>
            <div className="flex gap-2"><Button secondary onClick={() => edit(template)}>Edit</Button><Button danger disabled={deleteState.isLoading} onClick={() => void remove(template)}>Delete</Button></div>
          </div>
        )) : <p className="text-sm text-slate-500">Built-in templates are always available. Save custom versions here.</p>}
      </div>
    </Panel>
  );
}

function SuppressionManager() {
  const [page, setPage] = useState(1); const [search, setSearch] = useState("");
  const query = useGetEmailSuppressionsQuery({ page, limit: 10, ...(search.trim() ? { search: search.trim() } : {}) });
  const [blockEmail, blockState] = useBlockEmailMutation(); const [unblockEmail, unblockState] = useUnblockEmailMutation();
  const [email, setEmail] = useState(""); const [reason, setReason] = useState(""); const [error, setError] = useState(""); const [notice, setNotice] = useState("");
  async function block(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setError(""); setNotice(""); try { await blockEmail({ email: email.trim().toLowerCase(), ...(reason.trim() ? { reason: reason.trim() } : {}) }).unwrap(); setEmail(""); setReason(""); setNotice("Address blocked. Queued and future messages will be suppressed."); } catch (caught) { setError(getApiErrorMessage(caught)); } }
  async function unblock(target: string) { setError(""); try { await unblockEmail({ email: target }).unwrap(); setNotice(`${target} unblocked.`); } catch (caught) { setError(getApiErrorMessage(caught)); } }
  return <Panel><PanelTitle eyebrow="Do not contact" title="Blocked emails" />{error ? <ErrorNotice message={error} /> : null}{notice ? <div className="mt-3"><SuccessNotice message={notice} /></div> : null}<form onSubmit={block} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} placeholder="email@example.com" /><input value={reason} onChange={(event) => setReason(event.target.value)} className={inputClass} placeholder="Reason (optional)" /><Button type="submit" danger disabled={blockState.isLoading}>Block</Button></form><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} className={`${inputClass} mt-5`} placeholder="Search blocked addresses" /><div className="mt-4 space-y-3">{query.isLoading ? <LoadingRows count={3} /> : query.data?.data.length ? query.data.data.map((item) => <div key={item.id} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"><div><p className="font-bold">{item.email}</p><p className="mt-1 text-xs text-slate-500">{item.reason || "No reason recorded"} · {formatDate(item.createdAt)}</p></div><Button secondary disabled={unblockState.isLoading} onClick={() => void unblock(item.email)}>Unblock</Button></div>) : <Empty title="No blocked emails" description="Blocked addresses will appear here." />}</div><Pagination page={page} totalPages={query.data?.pagination.totalPages ?? 1} onPageChange={setPage} /></Panel>;
}

function CampaignHistory() {
  const [page, setPage] = useState(1);
  const query = useGetEmailCampaignsQuery({ page, limit: 10 }, { pollingInterval: 15_000 });
  return <Panel><PanelTitle eyebrow="Delivery progress" title="Campaign history" action={<Button secondary onClick={() => void query.refetch()}>Refresh</Button>} />{query.isLoading ? <LoadingRows /> : query.error ? <ErrorNotice message={getApiErrorMessage(query.error)} /> : query.data?.data.length ? <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="pb-3">Campaign</th><th className="pb-3">Audience</th><th className="pb-3">Queued</th><th className="pb-3">Sent</th><th className="pb-3">Skipped</th><th className="pb-3">Failed</th><th className="pb-3">Status</th></tr></thead><tbody className="divide-y divide-white/8">{query.data.data.map((campaign) => <tr key={campaign.id}><td className="py-4"><p className="font-bold">{campaign.name}</p><p className="mt-1 max-w-xs truncate text-xs text-slate-500">{campaign.subject} · {formatDate(campaign.createdAt)}</p></td><td className="py-4 text-slate-400">{campaign.audience}</td><td className="py-4">{campaign.queuedCount}/{campaign.requestedCount}</td><td className="py-4">{campaign.sentCount}</td><td className="py-4">{campaign.skippedCount}</td><td className="py-4">{campaign.failedCount}</td><td className="py-4"><StatusBadge value={campaign.status} /></td></tr>)}</tbody></table></div> : <Empty title="No campaigns yet" description="Queued bulk emails will appear here." />}<Pagination page={page} totalPages={query.data?.pagination.totalPages ?? 1} onPageChange={setPage} /></Panel>;
}

function parseEmails(value: string): string[] {
  return [...new Set(value.split(/[\s,;]+/).map((item) => item.trim().toLowerCase()).filter(Boolean))];
}

function toggleSet(current: Set<string>, value: string): Set<string> {
  const next = new Set(current);
  if (next.has(value)) next.delete(value); else next.add(value);
  return next;
}
