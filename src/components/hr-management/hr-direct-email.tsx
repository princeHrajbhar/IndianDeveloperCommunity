"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Search, Send, UserRoundCheck } from "lucide-react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useGetEmailTemplatesQuery,
  useSearchEmailRecipientsQuery,
  useSendCustomEmailMutation,
} from "@/src/lib/features/email-management/email-api";
import type { EmailDirectoryRecipient } from "@/src/lib/features/email-management/email-types";
import { Card, CardHeader, ErrorBox, Field, PrimaryButton, input, textarea } from "./hr-ui";

export function HRDirectEmailWorkspace() {
  const searchParams = useSearchParams();
  const presetEmail = searchParams.get("recipientEmail")?.trim() || "";
  const presetName = searchParams.get("recipientName")?.trim() || "";
  const externalPreset = searchParams.get("source") === "external-application";
  const [search, setSearch] = useState("");
  const directory = useSearchEmailRecipientsQuery(search.trim(), { skip: search.trim().length < 2 });
  const templatesQuery = useGetEmailTemplatesQuery();
  const [sendEmail, sendState] = useSendCustomEmailMutation();
  const templates = useMemo(() => [...(templatesQuery.data?.data.builtIn ?? []), ...(templatesQuery.data?.data.custom ?? [])], [templatesQuery.data]);
  const [recipientName, setRecipientName] = useState(presetName);
  const [recipientEmail, setRecipientEmail] = useState(presetEmail);
  const [templateId, setTemplateId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [bodyIsHtml, setBodyIsHtml] = useState(false);
  const [replyTo, setReplyTo] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (presetEmail) setRecipientEmail(presetEmail);
    if (presetName) setRecipientName(presetName);
    if (presetEmail || presetName) setSearch([presetName, presetEmail].filter(Boolean).join(" · "));
  }, [presetEmail, presetName]);

  useEffect(() => {
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;
    setSubject(template.subject);
    setBody(template.html);
    setBodyIsHtml(true);
  }, [templateId, templates]);

  function selectRecipient(row: EmailDirectoryRecipient) {
    setRecipientName(row.name);
    setRecipientEmail(row.email);
    setSearch(`${row.name} · ${row.email}`);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      const result = await sendEmail({
        recipientEmail: recipientEmail.trim().toLowerCase(),
        recipientName: recipientName.trim() || undefined,
        subject: subject.trim(),
        html: bodyIsHtml ? body.trim() : textToEmailHtml(body),
        replyTo: replyTo.trim().toLowerCase() || undefined,
      }).unwrap();
      if (result.data.sent < 1) throw new Error("The email provider did not accept the message. Please review delivery configuration and try again.");
      setNotice(`Branded email sent to ${recipientEmail.trim().toLowerCase()}.${result.data.profileReminderApplied ? " The external-applicant profile reminder was included automatically." : ""}`);
      setSubject("");
      setBody("");
      setTemplateId("");
      setBodyIsHtml(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : getApiErrorMessage(cause));
    }
  }

  const directoryRows = directory.data?.data ?? [];
  return (
    <Card>
      <CardHeader title="Send a custom branded email" description="Search an existing user, lead or applicant, or enter any email address. Every message is delivered inside the responsive QuantumFinix email layout with the configured logo." />
      <form onSubmit={submit} className="grid gap-4 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-4">
        {externalPreset ? <div className="qf-status-info rounded-xl border px-4 py-3 text-sm font-semibold md:col-span-2 xl:col-span-4">This recipient came from External Applications. The server will automatically append the required “complete your QuantumFinix profile for further updates” notice to this email.</div> : null}
        {error ? <div className="md:col-span-2 xl:col-span-4"><ErrorBox message={error} /></div> : null}
        {notice ? <div className="qf-status-success rounded-xl border px-4 py-3 text-sm font-semibold md:col-span-2 xl:col-span-4">{notice}</div> : null}

        <div className="relative md:col-span-2 xl:col-span-2">
          <Field label="Find existing recipient" hint="Search users, leads, internal applications and external applications.">
            <div className="relative"><Search className="qf-muted absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" /><input value={search} onChange={(event) => setSearch(event.target.value)} className={`${input} pl-9`} placeholder="Search name or email…" /></div>
          </Field>
          {search.trim().length >= 2 && directoryRows.length ? <div className="qf-surface qf-shadow absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border p-1">{directoryRows.map((row) => <button key={`${row.source}-${row.id}`} type="button" onClick={() => selectRecipient(row)} className="qf-text-secondary flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs hover:bg-[var(--qf-surface-muted)]"><UserRoundCheck className="h-4 w-4 shrink-0 text-blue-600" /><span className="min-w-0"><b className="qf-text block truncate">{row.name}</b><span className="qf-muted block truncate">{row.email} · {row.source}{row.role ? ` · ${row.role}` : ""}</span></span></button>)}</div> : null}
        </div>
        <Field label="Recipient email"><input required type="email" value={recipientEmail} onChange={(event) => setRecipientEmail(event.target.value)} className={input} placeholder="person@example.com" /></Field>
        <Field label="Recipient name"><input value={recipientName} onChange={(event) => setRecipientName(event.target.value)} className={input} placeholder="Optional" /></Field>

        <Field label="Reusable template"><select value={templateId} onChange={(event) => setTemplateId(event.target.value)} className={input}><option value="">Custom message</option>{templates.map((template) => <option key={template.id} value={template.id}>{template.name}{template.builtIn ? " · built in" : ""}</option>)}</select></Field>
        <div className="md:col-span-1 xl:col-span-2"><Field label="Subject"><input required value={subject} onChange={(event) => setSubject(event.target.value)} className={input} placeholder="Email subject" /></Field></div>
        <Field label="Reply-to"><input type="email" value={replyTo} onChange={(event) => setReplyTo(event.target.value)} className={input} placeholder="Optional" /></Field>

        <div className="md:col-span-2 xl:col-span-4">
          <Field label="Message body" hint={bodyIsHtml ? "Template HTML is editable. Unsafe scripts, embedded forms and JavaScript URLs are rejected by the server." : "Write plain text. Paragraphs and line breaks are converted into email-safe HTML automatically."}>
            <textarea required value={body} onChange={(event) => setBody(event.target.value)} className={`${textarea} min-h-56 ${bodyIsHtml ? "font-mono text-xs" : ""}`} placeholder="Write the message…" />
          </Field>
        </div>
        <label className="qf-surface-muted flex items-center gap-3 rounded-xl border px-4 py-3 text-xs font-bold md:col-span-2 xl:col-span-3"><input type="checkbox" checked={bodyIsHtml} onChange={(event) => setBodyIsHtml(event.target.checked)} />Treat body as safe HTML</label>
        <PrimaryButton type="submit" disabled={sendState.isLoading}><Send className="h-4 w-4" />{sendState.isLoading ? "Sending…" : "Send email"}</PrimaryButton>
        <div className="qf-muted flex items-center gap-2 text-xs md:col-span-2 xl:col-span-4"><Mail className="h-4 w-4" />Logo, spacing, typography, mobile layout and footer styling are applied by the server.</div>
      </form>
    </Card>
  );
}

function textToEmailHtml(value: string) {
  return value.split(/\n{2,}/).filter(Boolean).map((part) => `<p style="margin:0 0 14px">${escapeHtml(part).replace(/\n/g, "<br>")}</p>`).join("");
}
function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] || char)); }
