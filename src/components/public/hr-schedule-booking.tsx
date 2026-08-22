"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { CalendarDays, CheckCircle2, Clock3, Link2, MapPin, RefreshCw, Video } from "lucide-react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useBookPublicHRScheduleMutation, useGetPublicHRScheduleQuery } from "@/src/lib/features/hr-scheduling/hr-scheduling-api";

export function PublicHRScheduleBooking() {
  const params = useParams<{ token: string }>();
  const token = typeof params.token === "string" ? params.token : "";
  const query = useGetPublicHRScheduleQuery(token, { skip: !token, refetchOnMountOrArgChange: true });
  const [book, bookState] = useBookPublicHRScheduleMutation();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const invitation = query.data?.data;
  const grouped = useMemo(() => groupSlots(invitation?.availableSlots ?? [], invitation?.timezone || "Asia/Kolkata"), [invitation?.availableSlots, invitation?.timezone]);
  const dates = Object.keys(grouped);
  const activeDate = selectedDate && grouped[selectedDate] ? selectedDate : dates[0] || "";

  async function confirm() {
    if (!selectedSlot) return;
    setError(""); setNotice("");
    try {
      await book({ token, slot: selectedSlot }).unwrap();
      setNotice("Your time is confirmed.");
      await query.refetch();
    } catch (cause) {
      setError(getApiErrorMessage(cause));
      setSelectedSlot("");
      await query.refetch();
    }
  }

  if (query.isLoading) return <Shell><div className="mx-auto max-w-3xl animate-pulse rounded-3xl border border-white/10 bg-white/[0.03] p-8"><div className="h-6 w-40 rounded bg-white/10" /><div className="mt-5 h-10 w-3/4 rounded bg-white/10" /><div className="mt-8 h-64 rounded-2xl bg-white/5" /></div></Shell>;
  if (query.error || !invitation) return <Shell><StateCard title="Scheduling link unavailable" description={getApiErrorMessage(query.error || "This invitation could not be found.")} /></Shell>;

  if (invitation.status === "scheduled") return <Shell><StateCard success title={`${invitation.kind === "interview" ? "Interview" : "Meeting"} confirmed`} description={invitation.scheduledAt ? `Your selected time is ${formatSlot(invitation.scheduledAt, invitation.timezone)}.` : "Your time has been confirmed."} details={<><div className="mt-5 flex flex-wrap justify-center gap-2"><Pill icon={<Clock3 className="h-4 w-4" />} text={`${invitation.durationMinutes} minutes`} /><Pill icon={<Video className="h-4 w-4" />} text={invitation.mode} />{invitation.location ? <Pill icon={<MapPin className="h-4 w-4" />} text={invitation.location} /> : null}</div>{invitation.meetingUrl ? <a href={invitation.meetingUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950"><Link2 className="h-4 w-4" />Open meeting</a> : null}</>} /></Shell>;
  if (invitation.status === "cancelled") return <Shell><StateCard title="This invitation was cancelled" description="Contact the organizer if you need a new scheduling link." /></Shell>;

  return <Shell>
    <div className="mx-auto max-w-5xl">
      <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#07101f]/90 shadow-2xl shadow-black/30 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">QuantumFinix · {invitation.kind} scheduling</p>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{invitation.subject}</h1>
          <div className="prose prose-invert prose-sm mt-5 max-w-none text-slate-300 [&_a]:text-cyan-300" dangerouslySetInnerHTML={{ __html: invitation.bodyHtml }} />
          <div className="mt-7 space-y-3 text-sm text-slate-300"><Pill icon={<Clock3 className="h-4 w-4" />} text={`${invitation.durationMinutes} minutes`} /><Pill icon={<Video className="h-4 w-4" />} text={invitation.mode} />{invitation.location ? <Pill icon={<MapPin className="h-4 w-4" />} text={invitation.location} /> : null}<Pill icon={<CalendarDays className="h-4 w-4" />} text={invitation.timezone} /></div>
        </aside>

        <section className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.15em] text-cyan-300">Step 1</p><h2 className="mt-1 text-xl font-black">Choose a date</h2></div><button type="button" onClick={() => void query.refetch()} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 hover:border-cyan-300/30"><RefreshCw className="h-3.5 w-3.5" />Refresh availability</button></div>
          {dates.length ? <div className="mt-4 flex snap-x gap-2 overflow-x-auto pb-2">{dates.map((date) => <button key={date} type="button" onClick={() => { setSelectedDate(date); setSelectedSlot(""); }} className={`min-w-[132px] snap-start rounded-2xl border px-4 py-3 text-left transition ${activeDate === date ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/[0.03] text-white hover:border-cyan-300/30"}`}><span className="block text-[10px] font-black uppercase tracking-wider opacity-70">{formatWeekday(date)}</span><span className="mt-1 block text-sm font-black">{formatDateLabel(date)}</span><span className="mt-1 block text-[10px] font-bold opacity-70">{grouped[date].length} slot{grouped[date].length === 1 ? "" : "s"}</span></button>)}</div> : <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-5 text-sm leading-6 text-amber-100">No open time slots remain in this invitation. Ask the organizer to extend the date range.</div>}

          {activeDate ? <><div className="mt-7"><p className="text-xs font-black uppercase tracking-[.15em] text-cyan-300">Step 2</p><h2 className="mt-1 text-xl font-black">Choose a time</h2></div><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{grouped[activeDate].map((slot) => <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} className={`rounded-xl border px-3 py-3 text-sm font-black transition ${selectedSlot === slot ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/[0.03] text-slate-100 hover:border-cyan-300/40"}`}>{formatTime(slot, invitation.timezone)}</button>)}</div></> : null}

          {error ? <div className="mt-5 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-100">{error}</div> : null}
          {notice ? <div className="mt-5 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] px-4 py-3 text-sm text-emerald-100">{notice}</div> : null}
          {selectedSlot ? <div className="mt-7 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.05] p-4 sm:flex sm:items-center sm:justify-between sm:gap-4"><div><p className="text-xs font-bold text-slate-400">Selected time</p><p className="mt-1 font-black">{formatSlot(selectedSlot, invitation.timezone)}</p></div><button disabled={bookState.isLoading} onClick={() => void confirm()} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 disabled:opacity-50 sm:mt-0 sm:w-auto"><CheckCircle2 className="h-4 w-4" />{bookState.isLoading ? "Confirming…" : "Confirm this time"}</button></div> : null}
          <p className="mt-5 text-xs leading-5 text-slate-500">Availability is live. If another person books a conflicting organizer slot before you confirm, that time will be rejected and the list will refresh automatically.</p>
        </section>
      </div>
    </div>
  </Shell>;
}

function Shell({ children }: { children: React.ReactNode }) { return <section className="relative min-h-[72vh] overflow-hidden bg-[#020711] px-4 py-14 text-white sm:px-6 sm:py-20"><div aria-hidden className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" /><div className="relative">{children}</div></section>; }
function StateCard({ title, description, details, success = false }: { title: string; description: string; details?: React.ReactNode; success?: boolean }) { return <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-[#07101f] p-8 text-center sm:p-10">{success ? <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" /> : <CalendarDays className="mx-auto h-12 w-12 text-cyan-300" />}<h1 className="mt-5 text-3xl font-black">{title}</h1><p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>{details}</div>; }
function Pill({ icon, text }: { icon: React.ReactNode; text: string }) { return <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"><span className="text-cyan-300">{icon}</span><span className="min-w-0 truncate font-semibold">{text}</span></div>; }
function groupSlots(slots: string[], timeZone: string) { const rows: Record<string, string[]> = {}; for (const slot of slots) { const key = dateKey(slot, timeZone); (rows[key] ||= []).push(slot); } for (const values of Object.values(rows)) values.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); return Object.fromEntries(Object.entries(rows).sort(([a], [b]) => a.localeCompare(b))); }
function dateKey(value: string, timeZone: string) { const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(value)); const get = (type: string) => parts.find((part) => part.type === type)?.value || ""; return `${get("year")}-${get("month")}-${get("day")}`; }
function formatDateLabel(date: string) { return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short" }); }
function formatWeekday(date: string) { return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-IN", { weekday: "short" }); }
function formatTime(value: string, timeZone: string) { return new Date(value).toLocaleTimeString("en-IN", { timeZone, hour: "numeric", minute: "2-digit" }); }
function formatSlot(value: string, timeZone: string) { return new Date(value).toLocaleString("en-IN", { timeZone, dateStyle: "full", timeStyle: "short" }); }
