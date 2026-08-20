"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useGetMyDocumentQuery,
  useGetMyDocumentsQuery,
  useSubmitDocumentAcknowledgementMutation,
} from "@/src/lib/features/documents/document-api";
import type {
  AcknowledgementField,
  DocumentIssue,
} from "@/src/lib/features/documents/document-types";
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

export function ProfileDocumentsWorkspace() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("document") ?? "";
  const listQuery = useGetMyDocumentsQuery({ page: 1, limit: 100 });
  const [selectedId, setSelectedId] = useState(requestedId);
  const [search, setSearch] = useState("");
  const detailQuery = useGetMyDocumentQuery(selectedId || "", { skip: !selectedId });
  const issues = listQuery.data?.data ?? [];
  const filteredIssues = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return issues;
    return issues.filter((issue) =>
      [issue.templateName, issue.documentNumber, issue.category, issue.recipientName, issue.recipientEmail]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle)),
    );
  }, [issues, search]);
  const detail = detailQuery.data?.data;

  useEffect(() => {
    if (requestedId) setSelectedId(requestedId);
  }, [requestedId]);

  useEffect(() => {
    if (!selectedId && issues[0]) setSelectedId(idOf(issues[0]));
  }, [issues, selectedId]);

  return (
    <>
      <PageHeading
        eyebrow="Account documents"
        title="Issued"
        accent="documents."
        description="Review certificates, letters and other documents issued to your account. Complete acknowledgements when requested."
      />

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Panel>
          <PanelHeader title="Your documents" description={`${issues.length} document(s) available`} />
          <div className="border-b border-white/[0.07] p-4">
            <label className="block">
              <span className="sr-only">Search issued documents</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, number or category..."
                className={inputClass}
              />
            </label>
          </div>
          {listQuery.isLoading ? <Loading /> : listQuery.error ? <ErrorBox message={getApiErrorMessage(listQuery.error)} /> : filteredIssues.length ? (
            <div className="divide-y divide-white/[0.07]">
              {filteredIssues.map((issue) => {
                const id = idOf(issue);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedId(id)}
                    className={`w-full p-5 text-left transition hover:bg-white/[0.025] ${selectedId === id ? "bg-cyan-300/[0.055]" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-white">{issue.templateName}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">{issue.documentNumber}</p>
                        <p className="mt-2 text-[10px] text-slate-600">Issued {formatDate(issue.issuedAt)}</p>
                      </div>
                      <IssueStatus issue={issue} />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : search.trim() ? <EmptyState title="No matching documents" description="Try another document name, number or category." /> : <EmptyState title="No documents issued" description="Documents issued by an administrator will appear here." />}
        </Panel>

        <div className="space-y-6">
          {!selectedId ? (
            <Panel><EmptyState title="Select a document" description="Choose a document to review its contents." /></Panel>
          ) : detailQuery.isLoading ? <Loading /> : detailQuery.error || !detail ? (
            <Panel><ErrorBox message={getApiErrorMessage(detailQuery.error ?? "Document not found")} /></Panel>
          ) : (
            <DocumentDetail issue={detail} />
          )}
        </div>
      </div>
    </>
  );
}

function DocumentDetail({ issue }: { issue: DocumentIssue }) {
  const source = useMemo(
    () => `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:#fff}${issue.stylesCss ?? ""}</style></head><body>${issue.renderedHtml ?? ""}</body></html>`,
    [issue.renderedHtml, issue.stylesCss],
  );

  return (
    <>
      <Panel>
        <PanelHeader
          title={issue.templateName}
          description={`${issue.documentNumber} · Issued ${formatDate(issue.issuedAt)}`}
          action={<IssueStatus issue={issue} />}
        />
        {issue.status === "revoked" ? (
          <div className="border-b border-rose-300/15 bg-rose-300/[0.05] px-5 py-4 text-sm text-rose-200 sm:px-6">
            This document was revoked{issue.revokeReason ? `: ${issue.revokeReason}` : "."}
          </div>
        ) : null}
        <div className="p-4 sm:p-6">
          <iframe
            title={issue.templateName}
            sandbox=""
            srcDoc={source}
            className="h-[720px] w-full rounded-2xl border border-white/[0.1] bg-white"
          />
          <div className="mt-4 flex flex-wrap justify-end gap-3">
            <SecondaryButton type="button" onClick={() => printDocument(source)}>
              Print / save as PDF
            </SecondaryButton>
            <SecondaryButton type="button" onClick={() => downloadDocument(source, issue)}>
              Download document
            </SecondaryButton>
            <SecondaryButton type="button" onClick={() => shareDocument(source, issue)}>
              Share
            </SecondaryButton>
          </div>
        </div>
      </Panel>

      {issue.acknowledgement.enabled ? <AcknowledgementPanel issue={issue} /> : null}
    </>
  );
}

function AcknowledgementPanel({ issue }: { issue: DocumentIssue }) {
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [message, setMessage] = useState("");
  const [signedDocument, setSignedDocument] = useState<File>();
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [submitAcknowledgement, submitState] = useSubmitDocumentAcknowledgementMutation();
  const submitted = issue.acknowledgementSubmission;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFeedback("");
    try {
      await submitAcknowledgement({
        id: idOf(issue),
        values,
        ...(message.trim() ? { message: message.trim() } : {}),
        ...(signedDocument ? { signedDocument } : {}),
      }).unwrap();
      setFeedback("Your acknowledgement has been submitted.");
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  if (submitted) {
    return (
      <Panel>
        <PanelHeader title="Acknowledgement received" description={`Submitted ${formatDate(submitted.submittedAt)}`} />
        <div className="space-y-4 p-5 sm:p-6">
          <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4 text-sm text-emerald-100">
            Your response has been recorded and is visible to the administrator.
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {Object.entries(submitted.values).map(([key, value]) => (
              <div key={key} className="rounded-xl border border-white/[0.08] p-3">
                <dt className="text-[10px] uppercase tracking-wider text-slate-600">{key}</dt>
                <dd className="mt-1 text-sm text-slate-300">{String(value)}</dd>
              </div>
            ))}
          </dl>
          {submitted.message ? <p className="rounded-xl border border-white/[0.08] p-4 text-sm leading-6 text-slate-300">{submitted.message}</p> : null}
          {submitted.signedDocument?.url ? (
            <a href={submitted.signedDocument.url} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-5 text-sm font-semibold text-cyan-200">
              Open returned signed document
            </a>
          ) : null}
        </div>
      </Panel>
    );
  }

  if (issue.status === "revoked") return null;

  return (
    <Panel>
      <PanelHeader title={issue.acknowledgement.title} description={issue.acknowledgement.instructions || "Please review and respond."} />
      <form onSubmit={submit} className="space-y-5 p-5 sm:p-6">
        {error ? <ErrorBox message={error} /> : null}
        {feedback ? <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] px-4 py-3 text-sm text-emerald-100">{feedback}</div> : null}
        <div className="grid gap-5 md:grid-cols-2">
          {issue.acknowledgement.fields.map((field) => (
            <AcknowledgementFieldControl
              key={field.key}
              field={field}
              value={values[field.key]}
              onChange={(value) => setValues((current) => ({ ...current, [field.key]: value }))}
            />
          ))}
        </div>
        {issue.acknowledgement.allowMessage ? (
          <Field label="Return message">
            <textarea className={textareaClass} maxLength={5000} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Add any confirmation, note or response for the administrator." />
          </Field>
        ) : null}
        {issue.acknowledgement.allowSignedDocument ? (
          <Field label={issue.acknowledgement.requireSignedDocument ? "Signed document (required)" : "Signed document (optional)"} hint="PDF, DOC, DOCX, TXT, JPG, PNG or WebP up to 15 MB.">
            <input
              type="file"
              required={issue.acknowledgement.requireSignedDocument}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp"
              onChange={(event) => setSignedDocument(event.target.files?.[0])}
              className={`${inputClass} py-2`}
            />
          </Field>
        ) : null}
        <div className="flex justify-end"><PrimaryButton type="submit" disabled={submitState.isLoading}>{submitState.isLoading ? "Submitting..." : "Submit acknowledgement"}</PrimaryButton></div>
      </form>
    </Panel>
  );
}

function AcknowledgementFieldControl({
  field,
  value,
  onChange,
}: {
  field: AcknowledgementField;
  value: string | boolean | undefined;
  onChange: (value: string | boolean) => void;
}) {
  if (field.type === "checkbox") {
    return (
      <label className="flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.09] px-4 text-sm text-slate-300">
        <input type="checkbox" required={field.required} checked={value === true} onChange={(event) => onChange(event.target.checked)} />
        {field.label}
      </label>
    );
  }
  if (field.type === "textarea") {
    return <Field label={field.label}><textarea required={field.required} value={typeof value === "string" ? value : ""} onChange={(event) => onChange(event.target.value)} className={textareaClass} placeholder={field.placeholder} /></Field>;
  }
  if (field.type === "select") {
    return <Field label={field.label}><select required={field.required} value={typeof value === "string" ? value : ""} onChange={(event) => onChange(event.target.value)} className={inputClass}><option value="">Select</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select></Field>;
  }
  return <Field label={field.label}><input required={field.required} type={field.type === "date" ? "date" : "text"} value={typeof value === "string" ? value : ""} onChange={(event) => onChange(event.target.value)} className={inputClass} placeholder={field.type === "signature-name" ? "Type your full legal name" : field.placeholder} /></Field>;
}

function IssueStatus({ issue }: { issue: DocumentIssue }) {
  if (issue.status === "revoked") return <StatusBadge tone="rose">Revoked</StatusBadge>;
  if (issue.status === "acknowledged") return <StatusBadge tone="emerald">Acknowledged</StatusBadge>;
  if (issue.acknowledgement.enabled) return <StatusBadge tone="amber">Action required</StatusBadge>;
  return <StatusBadge tone="cyan">Issued</StatusBadge>;
}

function Loading() {
  return <div className="space-y-3 p-6">{Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-16 animate-pulse rounded-xl bg-white/[0.04]" />)}</div>;
}

function ErrorBox({ message }: { message: string }) {
  return <div className="m-5 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-200">{message}</div>;
}

function idOf(value: { id?: string; _id?: string }) {
  return value.id ?? value._id ?? "";
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "recently" : date.toLocaleString();
}

function printDocument(source: string) {
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

function downloadDocument(source: string, issue: DocumentIssue) {
  const blob = new Blob([source], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${safeFilename(issue.documentNumber)}-${safeFilename(issue.templateName)}.html`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function shareDocument(source: string, issue: DocumentIssue) {
  const filename = `${safeFilename(issue.documentNumber)}-${safeFilename(issue.templateName)}.html`;
  const file = new File([source], filename, { type: "text/html;charset=utf-8" });
  const shareData: ShareData = {
    title: `${issue.templateName} · ${issue.documentNumber}`,
    text: `Quantum Finix issued document: ${issue.templateName} (${issue.documentNumber})`,
    files: [file],
  };

  try {
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      await navigator.share(shareData);
      return;
    }
    if (navigator.share) {
      await navigator.share({ title: shareData.title, text: shareData.text });
      return;
    }
    downloadDocument(source, issue);
    window.alert("Sharing is not supported in this browser, so the document was downloaded instead.");
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    window.alert("The document could not be shared. You can still download or print it.");
  }
}

function safeFilename(value: string) {
  return value.replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "") || "document";
}
