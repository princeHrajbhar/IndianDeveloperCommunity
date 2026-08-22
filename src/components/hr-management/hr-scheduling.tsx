"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarClock, Copy, Link2, Plus, Trash2, UserRoundSearch, Video } from "lucide-react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
import { useCancelHRScheduleMutation, useCreateHRScheduleMutation, useGetHRScheduleOrganizersQuery, useGetHRSchedulesQuery, useSearchHRScheduleDirectoryQuery } from "@/src/lib/features/hr-scheduling/hr-scheduling-api";
import type { HRDirectoryRecipient, HRScheduleKind, HRScheduleMode, HRScheduleOrganizer, HRScheduleTimeRange } from "@/src/lib/features/hr-scheduling/hr-scheduling-types";
import { Badge, Card, CardHeader, ColorButton, Empty, ErrorBox, Field, HRPageTitle, PrimaryButton, SecondaryButton, input, textarea } from "./hr-ui";

const dateInputValue = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const futureDate = (days: number) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + days); return dateInputValue(d); };
const defaultRanges: HRScheduleTimeRange[] = [{ start: "09:30", end: "12:00" }, { start: "14:00", end: "17:30" }];
const defaultWeekdays = [1, 2, 3, 4, 5];

export function HRSchedulingWorkspace() {
  const params = useSearchParams();
  const presetEmail = params.get("recipientEmail") || "";
  const presetName = params.get("recipientName") || "";
  const presetExternalId = params.get("externalApplicationId") || "";
  const me = useGetMeQuery();
  const currentUserId = me.data?.data?.userId || "";
  const organizers = useGetHRScheduleOrganizersQuery();
  const schedules = useGetHRSchedulesQuery({ page: 1, limit: 100 });
  const [create, createState] = useCreateHRScheduleMutation();
  const [cancel, cancelState] = useCancelHRScheduleMutation();
  const [search, setSearch] = useState(presetEmail || presetName);
  const directory = useSearchHRScheduleDirectoryQuery(search.trim(), { skip: search.trim().length < 2 });
  const [showForm, setShowForm] = useState(Boolean(presetEmail));
  const [kind, setKind] = useState<HRScheduleKind>("interview");
  const [recipientName, setRecipientName] = useState(presetName);
  const [recipientEmail, setRecipientEmail] = useState(presetEmail);
  const [linkedUserId, setLinkedUserId] = useState("");
  const [externalApplicationId, setExternalApplicationId] = useState(presetExternalId);
  const [subject, setSubject] = useState("Choose a convenient time with QuantumFinix");
  const [body, setBody] = useState("We would like to schedule a conversation with you. Please choose any available time that works for you from the approved options below.");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [windowStart, setWindowStart] = useState(futureDate(1));
  const [windowEnd, setWindowEnd] = useState(futureDate(7));
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [slotIntervalMinutes, setSlotIntervalMinutes] = useState(30);
  const [allowedWeekdays, setAllowedWeekdays] = useState(defaultWeekdays);
  const [timeRanges, setTimeRanges] = useState<HRScheduleTimeRange[]>(defaultRanges);
  const [mode, setMode] = useState<HRScheduleMode>("video");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [location, setLocation] = useState("");
  const [organizerIds, setOrganizerIds] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [createdLink, setCreatedLink] = useState("");
  const [error, setError] = useState("");

  const rows = schedules.data?.data ?? [];
  const staff = organizers.data?.data ?? [];

  useEffect(() => {
    if (!currentUserId || organizerIds.length || organizers.isLoading) return;
    if (staff.some((member) => member.id === currentUserId)) setOrganizerIds([currentUserId]);
  }, [currentUserId, organizerIds.length, organizers.isLoading, staff]);

  const upcoming = rows.filter((row) => row.status !== "cancelled");
  const directoryRows = directory.data?.data ?? [];

  function selectRecipient(row: HRDirectoryRecipient) {
    setRecipientEmail(row.email); setRecipientName(row.name); setSearch(`${row.name} · ${row.email}`);
    setLinkedUserId(row.source === "user" ? row.id : "");
    setExternalApplicationId(row.source === "external-application" ? row.id : presetExternalId);
  }

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(""); setNotice(""); setCreatedLink("");
    if (!timeRanges.length) { setError("Add at least one time window."); return; }
    try {
      const result = await create({
        kind, recipientName: recipientName.trim() || undefined, recipientEmail: recipientEmail.trim().toLowerCase(),
        linkedUserId: linkedUserId || undefined, externalApplicationId: externalApplicationId || undefined,
        subject: subject.trim(), bodyHtml: textToEmailHtml(body), timezone,
        windowStart: new Date(`${windowStart}T00:00:00.000Z`).toISOString(), windowEnd: new Date(`${windowEnd}T00:00:00.000Z`).toISOString(),
        durationMinutes, slotIntervalMinutes, allowedWeekdays, timeRanges,
        mode, meetingUrl: meetingUrl.trim() || undefined, location: location.trim() || undefined,
        organizerIds, sendEmail: true,
      }).unwrap();
      const delivery = result.data.emailDelivery;
      if (delivery?.sent) {
        setNotice(`${kind === "interview" ? "Interview" : "Meeting"} invitation sent to ${recipientEmail}. The booking link is unique and conflict-aware.`);
      } else if (delivery?.skipped) {
        setNotice(`The schedule was created, but email delivery is blocked for ${recipientEmail}. Share the unique booking link below another way.`);
      } else {
        setNotice(`The schedule was created, but the email provider did not confirm delivery. Share the unique booking link below another way.`);
      }
      setShowForm(false);
      if (!presetEmail) { setRecipientName(""); setRecipientEmail(""); setSearch(""); setLinkedUserId(""); setExternalApplicationId(""); }
      setCreatedLink(result.data.bookingUrl || "");
    } catch (cause) { setError(getApiErrorMessage(cause)); }
  }

  return <>
    <HRPageTitle eyebrow="HR Scheduling" title="Interview and meeting scheduling" accent="for anyone." description="Invite an existing database contact or any email address, offer a controlled date range with multiple time windows, prevent booking conflicts, and send a branded QuantumFinix booking link." actions={<ColorButton type="button" onClick={() => setShowForm((v) => !v)}><CalendarClock className="h-4 w-4" />New schedule</ColorButton>} />
    {error ? <div className="mb-5"><ErrorBox message={error} /></div> : null}
    {notice ? <div className="qf-status-success mb-3 rounded-xl border px-4 py-3 text-sm font-semibold">{notice}</div> : null}
    {createdLink ? <div className="qf-surface mb-5 flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center"><input readOnly value={createdLink} className={`${input} min-w-0 flex-1`} aria-label="New booking link" /><SecondaryButton type="button" onClick={() => { if (navigator.clipboard) void navigator.clipboard.writeText(createdLink).then(() => setNotice("Booking link copied.")).catch(() => setNotice("Copy the booking link from the field below.")); }}><Copy className="h-4 w-4" />Copy link</SecondaryButton></div> : null}

    {showForm ? <Card className="mb-6"><CardHeader title="Create interview or meeting invitation" description="The recipient receives a branded email and chooses only from currently available slots. Selected organizer calendars and the recipient email are conflict-locked." />
      <form onSubmit={submit} className="grid gap-4 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Type"><select value={kind} onChange={(e) => setKind(e.target.value as HRScheduleKind)} className={input}><option value="interview">Interview</option><option value="meeting">Meeting</option></select></Field>
        <div className="relative md:col-span-2"><Field label="Find existing email" hint="Search users, leads, internal applications and external applications."><input value={search} onChange={(e) => setSearch(e.target.value)} className={input} placeholder="Type name or email…" /></Field>{search.trim().length >= 2 && directoryRows.length ? <div className="qf-surface qf-shadow absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border p-1">{directoryRows.map((row) => <button key={`${row.source}-${row.id}`} type="button" onClick={() => selectRecipient(row)} className="qf-text-secondary flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs hover:bg-[var(--qf-surface-muted)]"><UserRoundSearch className="h-4 w-4 shrink-0 text-blue-600" /><span className="min-w-0"><b className="qf-text block truncate">{row.name}</b><span className="qf-muted block truncate">{row.email} · {row.source}{row.role ? ` · ${row.role}` : ""}</span></span></button>)}</div> : null}</div>
        <Field label="Recipient email"><input required type="email" value={recipientEmail} onChange={(e) => { setRecipientEmail(e.target.value); setLinkedUserId(""); }} className={input} placeholder="person@example.com" /></Field>
        <Field label="Recipient name"><input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className={input} placeholder="Optional" /></Field>
        <div className="md:col-span-2 xl:col-span-3"><Field label="Email subject"><input required value={subject} onChange={(e) => setSubject(e.target.value)} className={input} /></Field></div>
        <div className="md:col-span-2 xl:col-span-4"><Field label="Message body" hint="Plain text is automatically formatted inside the branded QuantumFinix email layout with the logo and booking button."><textarea required value={body} onChange={(e) => setBody(e.target.value)} className={textarea} /></Field></div>

        <Field label="Available from"><input required type="date" min={dateInputValue(new Date())} value={windowStart} onChange={(e) => setWindowStart(e.target.value)} className={input} /></Field>
        <Field label="Available to"><input required type="date" min={windowStart} value={windowEnd} onChange={(e) => setWindowEnd(e.target.value)} className={input} /></Field>
        <Field label="Duration"><input required type="number" min={10} max={480} value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} className={input} /></Field>
        <Field label="Slot step"><input required type="number" min={5} max={480} value={slotIntervalMinutes} onChange={(e) => setSlotIntervalMinutes(Number(e.target.value))} className={input} /></Field>
        <div className="md:col-span-2 xl:col-span-4"><WeekdayPicker value={allowedWeekdays} set={setAllowedWeekdays} /></div>
        <div className="md:col-span-2 xl:col-span-4"><TimeRangeEditor value={timeRanges} set={setTimeRanges} /></div>

        <Field label="Timezone"><input required value={timezone} onChange={(e) => setTimezone(e.target.value)} className={input} /></Field>
        <Field label="Mode"><select value={mode} onChange={(e) => setMode(e.target.value as HRScheduleMode)} className={input}><option value="video">Video</option><option value="phone">Phone</option><option value="in-person">In person</option></select></Field>
        <Field label="Meeting link"><input value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} className={input} placeholder="https://meet.google.com/…" /></Field>
        <Field label="Location / room"><input value={location} onChange={(e) => setLocation(e.target.value)} className={input} /></Field>
        <div className="md:col-span-2 xl:col-span-4"><OrganizerPicker staff={staff} value={organizerIds} set={setOrganizerIds} currentUserId={currentUserId} /></div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end md:col-span-2 xl:col-span-4"><SecondaryButton type="button" onClick={() => setShowForm(false)}>Cancel</SecondaryButton><PrimaryButton type="submit" disabled={createState.isLoading}>{createState.isLoading ? "Sending…" : "Create & send booking invitation"}</PrimaryButton></div>
      </form>
    </Card> : null}

    <Card><CardHeader title="Scheduling activity" description="Open invitations and confirmed meetings/interviews. Conflicting slots are automatically removed before the recipient books." action={<Badge tone="blue">{upcoming.length} active</Badge>} />
      {schedules.isLoading ? <p className="qf-muted p-6 text-sm">Loading scheduling activity…</p> : rows.length ? <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-2 2xl:grid-cols-3">{rows.map((row) => <div key={row.id} className="qf-surface-muted rounded-2xl border p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-[10px] font-black uppercase tracking-[.14em] text-blue-600">{row.kind}</p><h3 className="qf-text mt-1 truncate text-sm font-black">{row.subject}</h3><p className="qf-muted mt-1 truncate text-xs">{row.recipientName || row.recipientEmail} · {row.recipientEmail}</p></div><Badge tone={row.status === "scheduled" ? "green" : row.status === "cancelled" ? "rose" : "amber"}>{row.status}</Badge></div><div className="mt-4 grid grid-cols-2 gap-2 text-xs"><Info icon={<CalendarClock className="h-3.5 w-3.5" />} label={row.scheduledAt ? formatDateTime(row.scheduledAt) : `${row.availableSlots?.length ?? 0} available slots`} /><Info icon={<Video className="h-3.5 w-3.5" />} label={`${row.mode} · ${row.durationMinutes} min`} /></div>{row.meetingUrl ? <a href={row.meetingUrl} target="_blank" rel="noreferrer" className="qf-secondary-button mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-black"><Link2 className="h-3.5 w-3.5" />Open meeting</a> : null}{row.status !== "cancelled" ? <button disabled={cancelState.isLoading} type="button" onClick={() => void cancel(row.id)} className="qf-danger-button mt-3 ml-2 rounded-lg border px-3 py-2 text-xs font-black">Cancel</button> : null}</div>)}</div> : <Empty title="No scheduling invitations" description="Create an interview or meeting invitation for any internal or external recipient." />}
    </Card>
  </>;
}

function TimeRangeEditor({ value, set }: { value: HRScheduleTimeRange[]; set: (value: HRScheduleTimeRange[]) => void }) {
  return <Field label="Daily time windows" hint="Add multiple windows such as 09:30–10:30 and 14:00–16:00. Slots are generated inside each window."><div className="space-y-2">{value.map((range, index) => <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2"><input type="time" required value={range.start} onChange={(e) => set(value.map((r, i) => i === index ? { ...r, start: e.target.value } : r))} className={input} /><input type="time" required value={range.end} onChange={(e) => set(value.map((r, i) => i === index ? { ...r, end: e.target.value } : r))} className={input} /><button type="button" onClick={() => set(value.filter((_, i) => i !== index))} className="qf-danger-button grid h-11 w-11 place-items-center rounded-xl border" aria-label="Remove time window"><Trash2 className="h-4 w-4" /></button></div>)}<button type="button" onClick={() => set([...value, { start: "09:30", end: "10:30" }])} className="qf-secondary-button inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black"><Plus className="h-3.5 w-3.5" />Add time window</button></div></Field>;
}
function WeekdayPicker({ value, set }: { value: number[]; set: (value: number[]) => void }) { const days = [[1,"Mon"],[2,"Tue"],[3,"Wed"],[4,"Thu"],[5,"Fri"],[6,"Sat"],[0,"Sun"]] as const; return <Field label="Available weekdays"><div className="flex flex-wrap gap-2">{days.map(([id,label]) => <label key={id} className={`cursor-pointer rounded-xl border px-3 py-2 text-xs font-black ${value.includes(id) ? "qf-status-info" : "qf-surface-muted qf-muted"}`}><input type="checkbox" className="sr-only" checked={value.includes(id)} onChange={() => set(value.includes(id) ? value.filter((x) => x !== id) : [...value,id])} />{label}</label>)}</div></Field>; }
function OrganizerPicker({ staff, value, set, currentUserId }: { staff: HRScheduleOrganizer[]; value: string[]; set: (value: string[]) => void; currentUserId: string }) { return <Field label="Organizers / conflict owners" hint="A booking blocks the same time for every selected organizer and for the recipient email."><div className="qf-surface-muted max-h-44 overflow-y-auto rounded-xl border p-3">{staff.length ? <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{staff.map((user) => { const id = user.id; return <label key={id} className="qf-text-secondary flex items-center gap-2 text-xs"><input type="checkbox" checked={value.includes(id)} onChange={() => set(value.includes(id) ? value.filter((x) => x !== id) : [...value,id])} /><span className="min-w-0 truncate">{user.name} · {id === currentUserId ? "you" : user.role}<span className="qf-muted block truncate">{user.email}</span></span></label>; })}</div> : <p className="qf-muted text-xs">No active organizational accounts are available. You can still create the invitation without an organizer, or ask an administrator to assign an organizational role to the interviewer.</p>}</div></Field>; }
function Info({ icon, label }: { icon: React.ReactNode; label: string }) { return <div className="qf-surface flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2"><span className="text-blue-600">{icon}</span><span className="qf-text-secondary min-w-0 truncate font-semibold">{label}</span></div>; }
function formatDateTime(value: string) { const d = new Date(value); return Number.isNaN(d.getTime()) ? value : d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); }
function textToEmailHtml(value: string) { return value.split(/\n{2,}/).map((part) => `<p style="margin:0 0 14px">${escapeHtml(part).replace(/\n/g, "<br>")}</p>`).join(""); }
function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] || char)); }
