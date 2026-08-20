"use client";

import { useMemo, useState, type FormEvent } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useBulkIssueDocumentsMutation,
  useCreateDocumentTemplateMutation,
  useDeleteDocumentTemplateMutation,
  useGetDocumentTemplatesQuery,
  useGetIssuedDocumentQuery,
  useGetIssuedDocumentsQuery,
  useIssueDocumentMutation,
  usePreviewDocumentTemplateMutation,
  useRevokeIssuedDocumentMutation,
  useUpdateDocumentTemplateMutation,
} from "@/src/lib/features/documents/document-api";
import type {
  AcknowledgementConfig,
  AcknowledgementField,
  AcknowledgementFieldType,
  DocumentTemplate,
  DocumentTemplateStatus,
} from "@/src/lib/features/documents/document-types";
import { useGetUsersQuery } from "@/src/lib/features/users/user-api";
import {
  Button,
  Empty,
  ErrorNotice,
  Field,
  LoadingRows,
  Panel,
  PanelTitle,
  StatusBadge,
  SuccessNotice,
  formatDate,
  inputClass,
  textareaClass,
} from "./admin-ui";

type Tab = "templates" | "issue" | "issued";

const SAMPLE_HTML = `<div class="document-shell">
  <p class="eyebrow">{{organization.name}}</p>
  <h1>Offer Letter</h1>
  <p>Dear <strong>{{user.fullName}}</strong>,</p>
  <p>We are pleased to offer you the position of <strong>{{position}}</strong>.</p>
  <p>Your joining date will be <strong>{{joiningDate}}</strong>.</p>
  <p>Document number: {{document.number}}</p>
  <p>Issued on {{document.issueDate}}</p>
</div>`;

const SAMPLE_CSS = `.document-shell { max-width: 760px; margin: 0 auto; padding: 56px; font-family: Arial, sans-serif; color: #14213d; line-height: 1.7; }
.eyebrow { text-transform: uppercase; letter-spacing: .16em; color: #0891b2; font-weight: 700; }
h1 { font-size: 40px; margin: 10px 0 28px; }`;

const EMPTY_ACK: AcknowledgementConfig = {
  enabled: false,
  title: "Document acknowledgement",
  instructions: "Review the document and confirm your acceptance.",
  fields: [],
  allowMessage: true,
  allowSignedDocument: true,
  requireSignedDocument: false,
};

interface TemplateFormState {
  id?: string;
  name: string;
  category: string;
  description: string;
  emailSubject: string;
  contentHtml: string;
  stylesCss: string;
  status: DocumentTemplateStatus;
  acknowledgement: AcknowledgementConfig;
}

const EMPTY_TEMPLATE: TemplateFormState = {
  name: "Offer Letter",
  category: "offer-letter",
  description: "Customizable employment offer letter.",
  emailSubject: "Your {{organization.name}} offer letter",
  contentHtml: SAMPLE_HTML,
  stylesCss: SAMPLE_CSS,
  status: "draft",
  acknowledgement: EMPTY_ACK,
};

export function DocumentsPanel({ recipientUserIds, scopeLabel }: { recipientUserIds?: string[]; scopeLabel?: string } = {}) {
  const [tab, setTab] = useState<Tab>("templates");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function feedback(message: string, failed = false) {
    if (failed) {
      setNotice("");
      setError(message);
    } else {
      setError("");
      setNotice(message);
    }
  }

  return (
    <section>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-300">Document operations</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Document generation</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Design reusable certificates, offer letters, joining letters and custom documents; issue them individually or in bulk; and collect configurable acknowledgements.{scopeLabel ? ` Current scope: ${scopeLabel}.` : ""}
          </p>
        </div>
        <div className="flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
          {(["templates", "issue", "issued"] as Tab[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-xl px-4 py-2 text-xs font-black capitalize transition ${tab === item ? "bg-cyan-300 text-slate-950" : "text-slate-400 hover:text-white"}`}
            >
              {item === "issue" ? "Issue documents" : item}
            </button>
          ))}
        </div>
      </div>

      {error ? <div className="mb-5"><ErrorNotice message={error} /></div> : null}
      {notice ? <div className="mb-5"><SuccessNotice message={notice} /></div> : null}

      {tab === "templates" ? <TemplateWorkspace onFeedback={feedback} /> : null}
      {tab === "issue" ? <IssueWorkspace onFeedback={feedback} recipientUserIds={recipientUserIds} scopeLabel={scopeLabel} /> : null}
      {tab === "issued" ? <IssuedWorkspace onFeedback={feedback} recipientUserIds={recipientUserIds} scopeLabel={scopeLabel} /> : null}
    </section>
  );
}

function TemplateWorkspace({ onFeedback }: { onFeedback: (message: string, failed?: boolean) => void }) {
  const templatesQuery = useGetDocumentTemplatesQuery({ page: 1, limit: 100 });
  const [form, setForm] = useState<TemplateFormState>(EMPTY_TEMPLATE);
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewCss, setPreviewCss] = useState("");
  const [createTemplate, createState] = useCreateDocumentTemplateMutation();
  const [updateTemplate, updateState] = useUpdateDocumentTemplateMutation();
  const [deleteTemplate, deleteState] = useDeleteDocumentTemplateMutation();
  const [previewTemplate, previewState] = usePreviewDocumentTemplateMutation();
  const templates = templatesQuery.data?.data ?? [];
  const busy = createState.isLoading || updateState.isLoading || deleteState.isLoading || previewState.isLoading;

  function loadTemplate(template: DocumentTemplate) {
    setForm({
      id: idOf(template),
      name: template.name,
      category: template.category,
      description: template.description ?? "",
      emailSubject: template.emailSubject ?? "",
      contentHtml: template.contentHtml,
      stylesCss: template.stylesCss ?? "",
      status: template.status,
      acknowledgement: template.acknowledgement ?? EMPTY_ACK,
    });
    setPreviewHtml("");
  }

  function reset() {
    setForm({ ...EMPTY_TEMPLATE, acknowledgement: { ...EMPTY_ACK, fields: [] } });
    setPreviewHtml("");
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const body = {
        name: form.name.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        emailSubject: form.emailSubject.trim(),
        contentHtml: form.contentHtml,
        stylesCss: form.stylesCss,
        status: form.status,
        acknowledgement: form.acknowledgement,
      };
      const response = form.id
        ? await updateTemplate({ id: form.id, body }).unwrap()
        : await createTemplate(body).unwrap();
      loadTemplate(response.data);
      onFeedback(form.id ? "Template updated." : "Template created.");
    } catch (caught) {
      onFeedback(getApiErrorMessage(caught), true);
    }
  }

  async function preview() {
    try {
      if (!form.id) {
        setPreviewHtml(replacePreviewVariables(form.contentHtml));
        setPreviewCss(form.stylesCss);
        return;
      }
      const response = await previewTemplate({
        id: form.id,
        variables: { position: "Senior Engineer", joiningDate: "1 September 2026" },
      }).unwrap();
      setPreviewHtml(response.data.renderedHtml);
      setPreviewCss(response.data.stylesCss);
    } catch (caught) {
      onFeedback(getApiErrorMessage(caught), true);
    }
  }

  async function remove() {
    if (!form.id || !window.confirm("Delete this template? Templates already used for issued documents will be archived instead.")) return;
    try {
      const response = await deleteTemplate(form.id).unwrap();
      onFeedback(response.data.archived ? "Template archived because issued documents reference it." : "Template deleted.");
      reset();
    } catch (caught) {
      onFeedback(getApiErrorMessage(caught), true);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[330px_minmax(0,1fr)]">
      <Panel>
        <PanelTitle
          eyebrow="Library"
          title="Templates"
          action={<Button secondary onClick={reset}>New</Button>}
        />
        {templatesQuery.isLoading ? <LoadingRows /> : templatesQuery.error ? <ErrorNotice message={getApiErrorMessage(templatesQuery.error)} /> : templates.length ? (
          <div className="space-y-2">
            {templates.map((template) => (
              <button
                key={idOf(template)}
                type="button"
                onClick={() => loadTemplate(template)}
                className={`w-full rounded-2xl border p-4 text-left transition ${form.id === idOf(template) ? "border-cyan-300/30 bg-cyan-300/[0.07]" : "border-white/8 bg-black/15 hover:border-white/15"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-black">{template.name}</p>
                    <p className="mt-1 truncate text-xs text-slate-500">{template.category}</p>
                  </div>
                  <StatusBadge value={template.status} />
                </div>
              </button>
            ))}
          </div>
        ) : <Empty title="No templates" description="Create a reusable document template." />}
      </Panel>

      <div className="space-y-6">
        <Panel>
          <PanelTitle eyebrow="Designer" title={form.id ? "Edit template" : "Create template"} />
          <form onSubmit={save} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Template name"><input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className={inputClass} /></Field>
              <Field label="Category"><input required value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className={inputClass} placeholder="certificate, offer-letter, joining-letter" /></Field>
              <Field label="Status"><select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as DocumentTemplateStatus }))} className={inputClass}><option value="draft">Draft</option><option value="active">Active</option><option value="archived">Archived</option></select></Field>
              <Field label="Email subject"><input value={form.emailSubject} onChange={(event) => setForm((current) => ({ ...current, emailSubject: event.target.value }))} className={inputClass} /></Field>
            </div>
            <Field label="Description"><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className={textareaClass} /></Field>
            <Field label="Document HTML"><textarea required value={form.contentHtml} onChange={(event) => setForm((current) => ({ ...current, contentHtml: event.target.value }))} className={`${textareaClass} min-h-80 font-mono text-xs`} /></Field>
            <Field label="Document CSS"><textarea value={form.stylesCss} onChange={(event) => setForm((current) => ({ ...current, stylesCss: event.target.value }))} className={`${textareaClass} min-h-48 font-mono text-xs`} /></Field>
            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4 text-xs leading-6 text-slate-400">
              Merge fields: <code>{"{{user.fullName}}"}</code>, <code>{"{{user.email}}"}</code>, <code>{"{{user.headline}}"}</code>, <code>{"{{document.number}}"}</code>, <code>{"{{document.issueDate}}"}</code>, <code>{"{{organization.name}}"}</code>, plus any custom variable entered during issuance.
            </div>
            <AcknowledgementDesigner value={form.acknowledgement} onChange={(acknowledgement) => setForm((current) => ({ ...current, acknowledgement }))} />
            <div className="flex flex-wrap justify-end gap-3">
              {form.id ? <Button danger disabled={busy} onClick={remove}>Delete / archive</Button> : null}
              <Button secondary disabled={busy} onClick={preview}>{previewState.isLoading ? "Rendering…" : "Preview"}</Button>
              <Button type="submit" disabled={busy}>{createState.isLoading || updateState.isLoading ? "Saving…" : "Save template"}</Button>
            </div>
          </form>
        </Panel>
        {previewHtml ? <DocumentPreview html={previewHtml} css={previewCss} /> : null}
      </div>
    </div>
  );
}

function AcknowledgementDesigner({ value, onChange }: { value: AcknowledgementConfig; onChange: (value: AcknowledgementConfig) => void }) {
  function patch(patchValue: Partial<AcknowledgementConfig>) {
    onChange({ ...value, ...patchValue });
  }
  function addField() {
    const index = value.fields.length + 1;
    patch({ fields: [...value.fields, { key: `field${index}`, label: `Field ${index}`, type: "text", required: false }] });
  }
  function updateField(index: number, fieldPatch: Partial<AcknowledgementField>) {
    patch({ fields: value.fields.map((field, fieldIndex) => fieldIndex === index ? { ...field, ...fieldPatch } : field) });
  }
  function removeField(index: number) {
    patch({ fields: value.fields.filter((_field, fieldIndex) => fieldIndex !== index) });
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
      <label className="flex items-center gap-3 text-sm font-black"><input type="checkbox" checked={value.enabled} onChange={(event) => patch({ enabled: event.target.checked })} /> Request user acknowledgement</label>
      {value.enabled ? (
        <div className="mt-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Acknowledgement title"><input value={value.title} onChange={(event) => patch({ title: event.target.value })} className={inputClass} /></Field>
            <Field label="Instructions"><input value={value.instructions ?? ""} onChange={(event) => patch({ instructions: event.target.value })} className={inputClass} /></Field>
          </div>
          <div className="flex flex-wrap gap-5 text-xs text-slate-300">
            <label className="flex items-center gap-2"><input type="checkbox" checked={value.allowMessage} onChange={(event) => patch({ allowMessage: event.target.checked })} /> Allow return message</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={value.allowSignedDocument} onChange={(event) => patch({ allowSignedDocument: event.target.checked, ...(event.target.checked ? {} : { requireSignedDocument: false }) })} /> Allow signed document</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={value.requireSignedDocument} onChange={(event) => patch({ requireSignedDocument: event.target.checked, ...(event.target.checked ? { allowSignedDocument: true } : {}) })} /> Require signed document</label>
          </div>
          <div className="space-y-3">
            {value.fields.map((field, index) => (
              <div key={`${field.key}-${index}`} className="grid gap-3 rounded-2xl border border-white/8 p-4 md:grid-cols-[1fr_1fr_170px_auto_auto]">
                <input value={field.key} onChange={(event) => updateField(index, { key: event.target.value })} className={inputClass} placeholder="fieldKey" />
                <input value={field.label} onChange={(event) => updateField(index, { label: event.target.value })} className={inputClass} placeholder="Label" />
                <select value={field.type} onChange={(event) => updateField(index, { type: event.target.value as AcknowledgementFieldType })} className={inputClass}><option value="text">Text</option><option value="textarea">Textarea</option><option value="date">Date</option><option value="checkbox">Checkbox</option><option value="select">Select</option><option value="signature-name">Signature name</option></select>
                <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={field.required} onChange={(event) => updateField(index, { required: event.target.checked })} /> Required</label>
                <Button danger onClick={() => removeField(index)}>Remove</Button>
                {field.type === "select" ? <input value={(field.options ?? []).join(", ")} onChange={(event) => updateField(index, { options: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} className={`${inputClass} md:col-span-5`} placeholder="Options separated by commas" /> : null}
              </div>
            ))}
            <Button secondary onClick={addField}>Add acknowledgement field</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function IssueWorkspace({ onFeedback, recipientUserIds, scopeLabel }: { onFeedback: (message: string, failed?: boolean) => void; recipientUserIds?: string[]; scopeLabel?: string }) {
  const templatesQuery = useGetDocumentTemplatesQuery({ page: 1, limit: 100, status: "active" });
  const usersQuery = useGetUsersQuery({ page: 1, limit: 100 });
  const [templateId, setTemplateId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [variablesText, setVariablesText] = useState('{\n  "position": "Senior Engineer",\n  "joiningDate": "1 September 2026"\n}');
  const [sendEmail, setSendEmail] = useState(true);
  const [acknowledgementEnabled, setAcknowledgementEnabled] = useState(true);
  const [issue, issueState] = useIssueDocumentMutation();
  const [bulkIssue, bulkState] = useBulkIssueDocumentsMutation();
  const templates = templatesQuery.data?.data ?? [];
  const users = usersQuery.data?.data ?? [];
  const visibleUsers = useMemo(() => {
    const allowed = recipientUserIds !== undefined ? new Set(recipientUserIds) : null;
    const scoped = allowed ? users.filter((user) => allowed.has(idOf(user))) : users;
    const search = userSearch.trim().toLowerCase();
    return search ? scoped.filter((user) => String(user.email ?? "").toLowerCase().includes(search)) : scoped;
  }, [recipientUserIds, userSearch, users]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!templateId || selectedUsers.length === 0) {
      onFeedback("Select a template and at least one recipient.", true);
      return;
    }
    let variables: Record<string, string | number | boolean | null>;
    try {
      variables = variablesText.trim() ? JSON.parse(variablesText) : {};
    } catch {
      onFeedback("Custom variables must be valid JSON.", true);
      return;
    }
    try {
      if (selectedUsers.length === 1) {
        const response = await issue({ templateId, recipientUserId: selectedUsers[0], variables, sendEmail, acknowledgementEnabled }).unwrap();
        onFeedback(response.message || (response.emailQueued === false && sendEmail ? "Document issued, but email could not be queued." : sendEmail ? "Document issued and email queued. If it is not in the inbox, check the spam or junk folder." : "Document issued successfully."));
      } else {
        const response = await bulkIssue({ templateId, recipientUserIds: selectedUsers, variables, sendEmail, acknowledgementEnabled }).unwrap();
        onFeedback(response.message || `Bulk batch ${response.data.batchId}: ${response.data.issued} issued, ${response.data.failed} failed.${sendEmail ? " If messages are not in recipients’ inboxes, ask them to check spam or junk folders." : ""}`);
      }
      setSelectedUsers([]);
    } catch (caught) {
      onFeedback(getApiErrorMessage(caught), true);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <Panel>
        <PanelTitle eyebrow={scopeLabel ? "Department recipients" : "Recipients"} title={scopeLabel ? `Issue within ${scopeLabel}` : "Individual or bulk issue"} />
        <Field label="Active template"><select required value={templateId} onChange={(event) => setTemplateId(event.target.value)} className={inputClass}><option value="">Select template</option>{templates.map((template) => <option key={idOf(template)} value={idOf(template)}>{template.name}</option>)}</select></Field>
        <div className="mt-5"><Field label="Find users"><input value={userSearch} onChange={(event) => setUserSearch(event.target.value)} className={inputClass} placeholder="Search email" /></Field></div>
        <div className="mt-4 max-h-[480px] space-y-2 overflow-y-auto pr-1">
          {usersQuery.isLoading ? <LoadingRows /> : visibleUsers.map((user) => {
            const id = idOf(user);
            const checked = selectedUsers.includes(id);
            return <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${checked ? "border-cyan-300/30 bg-cyan-300/[0.07]" : "border-white/8"}`}><input type="checkbox" checked={checked} onChange={() => setSelectedUsers((current) => checked ? current.filter((value) => value !== id) : [...current, id])} /><span className="min-w-0 flex-1 truncate text-sm">{user.email}</span><StatusBadge value={user.role ?? "user"} /></label>;
          })}
        </div>
        <p className="mt-4 text-xs text-slate-500">{selectedUsers.length} recipient(s) selected. More than one recipient automatically uses bulk issuance.</p>
      </Panel>
      <Panel>
        <PanelTitle eyebrow="Delivery" title="Issue configuration" />
        <Field label="Custom merge variables (JSON)"><textarea value={variablesText} onChange={(event) => setVariablesText(event.target.value)} className={`${textareaClass} min-h-64 font-mono text-xs`} /></Field>
        <div className="mt-5 space-y-3 rounded-2xl border border-white/8 p-4 text-sm">
          <label className="flex items-center gap-3"><input type="checkbox" checked={sendEmail} onChange={(event) => setSendEmail(event.target.checked)} /> Send email notification to each recipient</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={acknowledgementEnabled} onChange={(event) => setAcknowledgementEnabled(event.target.checked)} /> Request acknowledgement using the template’s form</label>
        </div>
        <div className="mt-6 flex justify-end"><Button type="submit" disabled={issueState.isLoading || bulkState.isLoading}>{issueState.isLoading || bulkState.isLoading ? "Issuing…" : selectedUsers.length > 1 ? `Issue ${selectedUsers.length} documents` : "Issue document"}</Button></div>
      </Panel>
    </form>
  );
}

function IssuedWorkspace({ onFeedback, recipientUserIds, scopeLabel }: { onFeedback: (message: string, failed?: boolean) => void; recipientUserIds?: string[]; scopeLabel?: string }) {
  const issuesQuery = useGetIssuedDocumentsQuery({ page: 1, limit: 100 });
  const [selectedId, setSelectedId] = useState("");
  const detailQuery = useGetIssuedDocumentQuery(selectedId || "", { skip: !selectedId });
  const [revoke, revokeState] = useRevokeIssuedDocumentMutation();
  const allIssues = issuesQuery.data?.data ?? [];
  const allowed = recipientUserIds !== undefined ? new Set(recipientUserIds) : null;
  const issues = allowed ? allIssues.filter((issue) => allowed.has(issue.recipientUserId)) : allIssues;
  const detail = detailQuery.data?.data;

  async function revokeSelected() {
    if (!selectedId) return;
    const reason = window.prompt("Reason for revocation:");
    if (!reason?.trim()) return;
    try {
      await revoke({ id: selectedId, reason: reason.trim() }).unwrap();
      onFeedback("Issued document revoked.");
    } catch (caught) {
      onFeedback(getApiErrorMessage(caught), true);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(500px,1.15fr)]">
      <Panel>
        <PanelTitle eyebrow="Audit trail" title={scopeLabel ? `${scopeLabel} issued documents` : "Issued documents"} />
        {issuesQuery.isLoading ? <LoadingRows /> : issues.length ? <div className="space-y-2">{issues.map((issue) => <button key={idOf(issue)} type="button" onClick={() => setSelectedId(idOf(issue))} className={`w-full rounded-2xl border p-4 text-left ${selectedId === idOf(issue) ? "border-cyan-300/30 bg-cyan-300/[0.06]" : "border-white/8"}`}><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="truncate font-black">{issue.templateName}</p><p className="mt-1 truncate text-xs text-slate-400">{issue.recipientName} · {issue.recipientEmail}</p><p className="mt-2 text-[10px] text-slate-600">{issue.documentNumber} · {formatDate(issue.issuedAt)}</p></div><StatusBadge value={issue.status} /></div></button>)}</div> : <Empty title="No issued documents" description="Issued documents will appear here." />}
      </Panel>
      <div className="space-y-6">
        {!selectedId ? <Panel><Empty title="Select a document" description="Choose an issued document to inspect its snapshot and acknowledgement." /></Panel> : detailQuery.isLoading ? <LoadingRows count={6} /> : detailQuery.error || !detail ? <ErrorNotice message={getApiErrorMessage(detailQuery.error ?? "Document not found")} /> : (
          <>
            <Panel>
              <PanelTitle eyebrow={detail.documentNumber} title={detail.templateName} action={<StatusBadge value={detail.status} />} />
              <div className="grid gap-3 text-sm sm:grid-cols-2"><Info label="Recipient" value={`${detail.recipientName} (${detail.recipientEmail})`} /><Info label="Issued" value={formatDate(detail.issuedAt)} /><Info label="Batch" value={detail.batchId || "Individual"} /><Info label="Email" value={detail.emailQueuedAt ? `Queued ${formatDate(detail.emailQueuedAt)}` : detail.emailNotificationRequested ? "Requested but not queued" : "Not requested"} /></div>
              {detail.acknowledgementSubmission ? <div className="mt-5 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] p-4 text-sm"><p className="font-black text-emerald-200">Acknowledged {formatDate(detail.acknowledgementSubmission.submittedAt)}</p><pre className="mt-3 overflow-auto whitespace-pre-wrap text-xs text-slate-400">{JSON.stringify(detail.acknowledgementSubmission.values, null, 2)}</pre>{detail.acknowledgementSubmission.message ? <p className="mt-3 text-slate-300">{detail.acknowledgementSubmission.message}</p> : null}{detail.acknowledgementSubmission.signedDocument?.url ? <a href={detail.acknowledgementSubmission.signedDocument.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-cyan-200 underline">Open returned signed document</a> : null}</div> : detail.acknowledgement.enabled ? <p className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-3 text-xs text-amber-200">Awaiting user acknowledgement.</p> : null}
              {detail.status !== "revoked" ? <div className="mt-5 flex justify-end"><Button danger disabled={revokeState.isLoading} onClick={revokeSelected}>Revoke</Button></div> : detail.revokeReason ? <p className="mt-5 text-sm text-rose-200">Revoked: {detail.revokeReason}</p> : null}
            </Panel>
            <DocumentPreview html={detail.renderedHtml ?? ""} css={detail.stylesCss ?? ""} filename={`${detail.documentNumber}-${detail.templateName}`} />
          </>
        )}
      </div>
    </div>
  );
}

function DocumentPreview({ html, css, filename = "quantum-finix-document" }: { html: string; css: string; filename?: string }) {
  const source = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:white}${css}</style></head><body>${html}</body></html>`;
  return (
    <Panel>
      <PanelTitle
        eyebrow="Safe preview"
        title="Rendered document"
        action={(
          <div className="flex flex-wrap gap-2">
            <Button secondary onClick={() => printRenderedDocument(source)}>Print / PDF</Button>
            <Button secondary onClick={() => downloadRenderedDocument(source, filename)}>Download</Button>
          </div>
        )}
      />
      <iframe title="Document preview" sandbox="" srcDoc={source} className="h-[720px] w-full rounded-2xl border border-white/10 bg-white" />
    </Panel>
  );
}

function printRenderedDocument(source: string) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.width = "1px";
  iframe.style.height = "1px";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  iframe.srcdoc = source;
  document.body.appendChild(iframe);
  iframe.onload = () => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    window.setTimeout(() => iframe.remove(), 1500);
  };
}

function downloadRenderedDocument(source: string, filename: string) {
  const blob = new Blob([source], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${filename.replace(/[^a-z0-9._-]+/gi, "-") || "quantum-finix-document"}.html`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-white/8 p-3"><p className="text-[10px] uppercase tracking-wider text-slate-600">{label}</p><p className="mt-1 break-words text-slate-300">{value}</p></div>;
}

function idOf(value: { id?: string; _id?: string }) {
  return value.id ?? value._id ?? "";
}

function replacePreviewVariables(html: string) {
  const values: Record<string, string> = {
    "organization.name": "QuantumFinix",
    "user.fullName": "Sample User",
    "user.email": "sample@example.com",
    "user.headline": "Senior Engineer",
    "document.number": "PREVIEW-2026-0001",
    "document.issueDate": "2 August 2026",
    position: "Senior Engineer",
    joiningDate: "1 September 2026",
  };
  return html.replace(/{{\s*([A-Za-z0-9_.-]+)\s*}}/g, (_match, key: string) => values[key] ?? "");
}
