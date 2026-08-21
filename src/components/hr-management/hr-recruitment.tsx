"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { BriefcaseBusiness, CalendarClock, CheckCircle2, ClipboardList, FileUser, Save, Trash2, Video, XCircle } from "lucide-react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useAdminListJobApplicationsQuery } from "@/src/lib/features/job-applications/job-application-api";
import type { JobApplication, JobReference } from "@/src/lib/features/job-applications/job-application-types";
import { useGetHROverviewQuery } from "@/src/lib/features/hr-management/hr-management-api";
import {
  useCreateHRInterviewMutation,
  useCreateHRInterviewTemplateMutation,
  useDeleteHRInterviewTemplateMutation,
  useGetHRInterviewsQuery,
  useGetHRInterviewTemplatesQuery,
  useUpdateHRInterviewMutation,
} from "@/src/lib/features/hr-management/hr-recruitment-api";
import type { HRInterview, HRInterviewMode, HRInterviewRecommendation, HRScheduleTemplate } from "@/src/lib/features/hr-management/hr-recruitment-types";
import { useGetUsersQuery } from "@/src/lib/features/users/user-api";
import { Badge, Card, CardHeader, ColorButton, Empty, ErrorBox, Field, HRPageTitle, Metric, PrimaryButton, SecondaryButton, input, textarea } from "./hr-ui";

const isoDate = (date: Date) => date.toISOString().slice(0, 10);
const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return isoDate(d); };
const twoWeeks = () => { const d = new Date(); d.setDate(d.getDate() + 14); return isoDate(d); };
const weekdaysDefault = [1, 2, 3, 4, 5];

function initialSchedule(applicationId = "") {
  return {
    applicationId,
    roundName: "HR Screening",
    schedulingMode: "candidate-choice" as "admin-fixed" | "candidate-choice",
    scheduledAt: "",
    durationMinutes: 45,
    mode: "video" as HRInterviewMode,
    location: "",
    meetingUrl: "",
    interviewerIds: [] as string[],
    sendEmail: true,
    templateId: "",
    timezone: "Asia/Kolkata",
    windowStart: tomorrow(),
    windowEnd: twoWeeks(),
    dailyStart: "10:00",
    dailyEnd: "18:00",
    slotIntervalMinutes: 30,
    allowedWeekdays: weekdaysDefault,
    specificSlotsText: "",
  };
}

const initialTemplate = {
  name: "",
  description: "",
  timezone: "Asia/Kolkata",
  durationMinutes: 45,
  mode: "video" as HRInterviewMode,
  location: "",
  meetingUrl: "",
  windowDays: 14,
  dailyStart: "10:00",
  dailyEnd: "18:00",
  slotIntervalMinutes: 30,
  allowedWeekdays: weekdaysDefault,
  interviewerIds: [] as string[],
  active: true,
};

function jobTitle(job: JobReference): string { return typeof job === "string" ? "Job opening" : job.title || "Job opening"; }
function candidateName(application: JobApplication): string { return `${application.personalInfo.firstName} ${application.personalInfo.lastName}`.trim(); }
function formatDateTime(value?: string): string { if (!value) return "Candidate has not chosen a slot"; const d = new Date(value); return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); }
function tone(status: HRInterview["status"]): "blue" | "green" | "rose" | "amber" { if (status === "completed") return "green"; if (status === "cancelled" || status === "no-show") return "rose"; if (status === "awaiting-candidate") return "amber"; return "blue"; }
function idOfUser(value: string | { id?: string; _id?: string }) { return typeof value === "string" ? value : value.id || value._id || ""; }

export function HRInterviewsWorkspace() {
  const params = useSearchParams();
  const requestedApplication = params.get("applicationId") || "";
  const overview = useGetHROverviewQuery();
  const applications = useAdminListJobApplicationsQuery({ page: 1, limit: 100, sortBy: "updatedAt", sortOrder: "desc" });
  const interviews = useGetHRInterviewsQuery({ page: 1, limit: 150 });
  const templates = useGetHRInterviewTemplatesQuery();
  const users = useGetUsersQuery({ page: 1, limit: 200 });
  const [createInterview, createState] = useCreateHRInterviewMutation();
  const [updateInterview, updateState] = useUpdateHRInterviewMutation();
  const [createTemplate, templateState] = useCreateHRInterviewTemplateMutation();
  const [deleteTemplate] = useDeleteHRInterviewTemplateMutation();
  const [showScheduler, setShowScheduler] = useState(Boolean(requestedApplication));
  const [showTemplates, setShowTemplates] = useState(false);
  const [schedule, setSchedule] = useState(() => initialSchedule(requestedApplication));
  const [templateForm, setTemplateForm] = useState(initialTemplate);
  const [selectedInterview, setSelectedInterview] = useState<HRInterview | null>(null);
  const [scorecard, setScorecard] = useState({ score: 4, recommendation: "hire" as HRInterviewRecommendation, strengths: "", concerns: "", feedback: "" });
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const metrics = overview.data?.data.metrics;
  const rows = interviews.data?.data ?? [];
  const applicationRows = applications.data?.data ?? [];
  const availableApplications = useMemo(() => applicationRows.filter((item) => !["Hired", "Rejected", "Withdrawn"].includes(item.status)), [applicationRows]);
  const awaiting = rows.filter((item) => item.status === "awaiting-candidate");
  const scheduled = rows.filter((item) => item.status === "scheduled");
  const interviewed = rows.filter((item) => item.status === "completed");
  const closed = rows.filter((item) => item.status === "cancelled" || item.status === "no-show");
  const staff = users.data?.data ?? [];

  function applyTemplate(template: HRScheduleTemplate) {
    const end = new Date(); end.setDate(end.getDate() + template.windowDays);
    setSchedule((current) => ({
      ...current,
      templateId: template.id,
      timezone: template.timezone,
      durationMinutes: template.durationMinutes,
      mode: template.mode,
      location: template.location || "",
      meetingUrl: template.meetingUrl || "",
      windowStart: tomorrow(),
      windowEnd: isoDate(end),
      dailyStart: template.dailyStart,
      dailyEnd: template.dailyEnd,
      slotIntervalMinutes: template.slotIntervalMinutes,
      allowedWeekdays: template.allowedWeekdays,
      interviewerIds: template.interviewerIds.map(idOfUser).filter(Boolean),
    }));
  }

  async function submitSchedule(event: FormEvent) {
    event.preventDefault(); setError(""); setFeedback("");
    try {
      const specificSlots = schedule.specificSlotsText.split(/[\n,]+/).map((value) => value.trim()).filter(Boolean).map((value) => new Date(value).toISOString());
      await createInterview({
        applicationId: schedule.applicationId,
        roundName: schedule.roundName,
        schedulingMode: schedule.schedulingMode,
        ...(schedule.schedulingMode === "admin-fixed" ? { scheduledAt: new Date(schedule.scheduledAt).toISOString() } : {
          availability: {
            timezone: schedule.timezone,
            windowStart: new Date(`${schedule.windowStart}T00:00:00`).toISOString(),
            windowEnd: new Date(`${schedule.windowEnd}T23:59:59`).toISOString(),
            dailyStart: schedule.dailyStart,
            dailyEnd: schedule.dailyEnd,
            slotIntervalMinutes: schedule.slotIntervalMinutes,
            allowedWeekdays: schedule.allowedWeekdays,
            specificSlots,
            ...(schedule.templateId ? { templateId: schedule.templateId } : {}),
          },
        }),
        durationMinutes: schedule.durationMinutes,
        mode: schedule.mode,
        location: schedule.location || undefined,
        meetingUrl: schedule.meetingUrl || undefined,
        interviewerIds: schedule.interviewerIds,
        sendEmail: schedule.sendEmail,
      }).unwrap();
      setSchedule(initialSchedule()); setShowScheduler(false);
      setFeedback(schedule.schedulingMode === "candidate-choice" ? "Candidate scheduling request sent. The candidate can now choose an available slot from My Profile → Applications." : "Interview scheduled and the candidate was notified.");
    } catch (cause) { setError(getApiErrorMessage(cause)); }
  }

  async function saveTemplate(event: FormEvent) {
    event.preventDefault(); setError("");
    try {
      await createTemplate({ ...templateForm, location: templateForm.location || undefined, meetingUrl: templateForm.meetingUrl || undefined, description: templateForm.description || undefined }).unwrap();
      setTemplateForm(initialTemplate); setFeedback("Interview availability template saved for reuse by HR.");
    } catch (cause) { setError(getApiErrorMessage(cause)); }
  }

  async function changeStatus(interview: HRInterview, status: "cancelled" | "no-show") {
    setError(""); try { await updateInterview({ id: interview.id, body: { status } }).unwrap(); setFeedback(status === "cancelled" ? "Interview cancelled." : "Candidate marked as no-show."); } catch (cause) { setError(getApiErrorMessage(cause)); }
  }

  function openScorecard(interview: HRInterview) {
    setSelectedInterview(interview);
    setScorecard({ score: interview.score ?? 4, recommendation: interview.recommendation ?? "hire", strengths: interview.strengths ?? "", concerns: interview.concerns ?? "", feedback: interview.feedback ?? "" });
  }

  async function saveScorecard(event: FormEvent) {
    event.preventDefault(); if (!selectedInterview) return; setError("");
    try { await updateInterview({ id: selectedInterview.id, body: { status: "completed", ...scorecard } }).unwrap(); setSelectedInterview(null); setFeedback("Interview scorecard saved. The candidate moved to the Interviewed list and the application status is Interviewed."); } catch (cause) { setError(getApiErrorMessage(cause)); }
  }

  return <>
    <HRPageTitle eyebrow="Talent Operations · Interviews" title="Custom interview scheduling with" accent="candidate self-booking." description="Define interviewer availability, restrict date ranges and time windows, reuse scheduling templates, let candidates choose available slots, send branded meeting details, and manage scorecards from one interview workspace." actions={<div className="flex flex-wrap gap-2"><SecondaryButton type="button" onClick={() => setShowTemplates((v) => !v)}><Save className="h-4 w-4"/>Availability templates</SecondaryButton><ColorButton type="button" onClick={() => setShowScheduler((v) => !v)}><CalendarClock className="h-4 w-4"/>Schedule interview</ColorButton></div>} />
    {error ? <div className="mb-5"><ErrorBox message={error}/></div> : null}
    {feedback ? <div className="qf-status-success mb-5 rounded-xl border px-4 py-3 text-sm font-semibold">{feedback}</div> : null}

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric label="Active applications" value={metrics?.applications ?? "—"} helper="Candidates in the hiring pipeline" icon={<FileUser className="h-5 w-5"/>} gradient="from-blue-500 to-cyan-500"/>
      <Metric label="Awaiting candidate" value={awaiting.length} helper="Self-scheduling invitations" icon={<CalendarClock className="h-5 w-5"/>} gradient="from-amber-500 to-orange-500"/>
      <Metric label="Scheduled" value={scheduled.length} helper="Confirmed interview slots" icon={<BriefcaseBusiness className="h-5 w-5"/>} gradient="from-violet-500 to-fuchsia-500"/>
      <Metric label="Interviewed" value={interviewed.length} helper="Completed scorecards" icon={<ClipboardList className="h-5 w-5"/>} gradient="from-emerald-500 to-teal-500"/>
    </div>

    {showTemplates ? <Card className="mt-6"><CardHeader title="Reusable interviewer availability templates" description="Create standard timetables for HR screening, technical rounds, manager interviews or custom meetings. Apply a template when creating any candidate scheduling request."/>
      <div className="grid gap-6 p-5 xl:grid-cols-[1.15fr_.85fr]">
        <form onSubmit={saveTemplate} className="grid gap-4 md:grid-cols-2">
          <Field label="Template name"><input required value={templateForm.name} onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })} className={input} placeholder="Engineering interview availability"/></Field>
          <Field label="Timezone"><input required value={templateForm.timezone} onChange={(e) => setTemplateForm({ ...templateForm, timezone: e.target.value })} className={input}/></Field>
          <Field label="Default window (days)"><input type="number" min={1} max={120} value={templateForm.windowDays} onChange={(e) => setTemplateForm({ ...templateForm, windowDays: Number(e.target.value) })} className={input}/></Field>
          <Field label="Interview duration"><input type="number" min={10} max={480} value={templateForm.durationMinutes} onChange={(e) => setTemplateForm({ ...templateForm, durationMinutes: Number(e.target.value) })} className={input}/></Field>
          <Field label="Daily from"><input type="time" value={templateForm.dailyStart} onChange={(e) => setTemplateForm({ ...templateForm, dailyStart: e.target.value })} className={input}/></Field>
          <Field label="Daily to"><input type="time" value={templateForm.dailyEnd} onChange={(e) => setTemplateForm({ ...templateForm, dailyEnd: e.target.value })} className={input}/></Field>
          <Field label="Slot interval"><input type="number" min={5} max={480} value={templateForm.slotIntervalMinutes} onChange={(e) => setTemplateForm({ ...templateForm, slotIntervalMinutes: Number(e.target.value) })} className={input}/></Field>
          <Field label="Mode"><select value={templateForm.mode} onChange={(e) => setTemplateForm({ ...templateForm, mode: e.target.value as HRInterviewMode })} className={input}><option value="video">Video</option><option value="phone">Phone</option><option value="in-person">In person</option></select></Field>
          <Field label="Meeting link"><input value={templateForm.meetingUrl} onChange={(e) => setTemplateForm({ ...templateForm, meetingUrl: e.target.value })} className={input} placeholder="https://meet.google.com/…"/></Field>
          <Field label="Location"><input value={templateForm.location} onChange={(e) => setTemplateForm({ ...templateForm, location: e.target.value })} className={input}/></Field>
          <div className="md:col-span-2"><WeekdayPicker value={templateForm.allowedWeekdays} set={(value) => setTemplateForm({ ...templateForm, allowedWeekdays: value })}/></div>
          <div className="md:col-span-2"><StaffPicker staff={staff} value={templateForm.interviewerIds} set={(value) => setTemplateForm({ ...templateForm, interviewerIds: value })}/></div>
          <div className="md:col-span-2"><Field label="Description"><textarea value={templateForm.description} onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })} className={textarea}/></Field></div>
          <div className="md:col-span-2"><PrimaryButton type="submit" disabled={templateState.isLoading}>{templateState.isLoading ? "Saving…" : "Save availability template"}</PrimaryButton></div>
        </form>
        <div className="space-y-3">{templates.data?.data.length ? templates.data.data.map((t) => <div key={t.id} className="qf-surface-muted rounded-2xl border p-4"><div className="flex items-start justify-between gap-3"><div><b className="qf-text text-sm">{t.name}</b><p className="qf-muted mt-1 text-xs">{t.dailyStart}-{t.dailyEnd} · {t.durationMinutes} min · {t.windowDays} days · {t.timezone}</p><p className="qf-muted mt-2 text-xs leading-5">{t.description || `${t.mode} interview availability`}</p></div><button type="button" onClick={() => void deleteTemplate(t.id)} className="qf-danger-button rounded-lg border p-2" aria-label={`Delete ${t.name}`}><Trash2 className="h-4 w-4"/></button></div><button type="button" onClick={() => { applyTemplate(t); setShowScheduler(true); }} className="qf-secondary-button mt-3 rounded-xl px-3 py-2 text-xs font-black">Use this template</button></div>) : <Empty title="No scheduling templates" description="Save an interviewer timetable once and reuse it for future candidates."/>}</div>
      </div>
    </Card> : null}

    {showScheduler ? <Card className="mt-6"><CardHeader title="Custom interview / meeting scheduler" description="Choose a fixed time or let the candidate select from an HR-controlled availability window. Meeting details become visible in the candidate profile and are emailed after confirmation."/>
      <form onSubmit={submitSchedule} className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Candidate / application"><select required value={schedule.applicationId} onChange={(e) => setSchedule({ ...schedule, applicationId: e.target.value })} className={input}><option value="">Select candidate</option>{availableApplications.map((a) => <option key={a.id} value={a.id}>{candidateName(a)} · {jobTitle(a.jobId)} · {a.status}</option>)}</select></Field>
        <Field label="Interview round"><input required value={schedule.roundName} onChange={(e) => setSchedule({ ...schedule, roundName: e.target.value })} className={input}/></Field>
        <Field label="Scheduling method"><select value={schedule.schedulingMode} onChange={(e) => setSchedule({ ...schedule, schedulingMode: e.target.value as "admin-fixed" | "candidate-choice" })} className={input}><option value="candidate-choice">Candidate chooses available slot</option><option value="admin-fixed">HR sets exact time</option></select></Field>
        <Field label="Availability template"><select value={schedule.templateId} onChange={(e) => { const t = templates.data?.data.find((x) => x.id === e.target.value); if (t) applyTemplate(t); else setSchedule({ ...schedule, templateId: "" }); }} className={input}><option value="">Custom availability</option>{templates.data?.data.filter((t) => t.active).map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></Field>
        {schedule.schedulingMode === "admin-fixed" ? <Field label="Exact date & time"><input required type="datetime-local" value={schedule.scheduledAt} onChange={(e) => setSchedule({ ...schedule, scheduledAt: e.target.value })} className={input}/></Field> : <>
          <Field label="Available from"><input required type="date" value={schedule.windowStart} onChange={(e) => setSchedule({ ...schedule, windowStart: e.target.value })} className={input}/></Field>
          <Field label="Available to"><input required type="date" value={schedule.windowEnd} onChange={(e) => setSchedule({ ...schedule, windowEnd: e.target.value })} className={input}/></Field>
          <Field label="Daily from"><input required type="time" value={schedule.dailyStart} onChange={(e) => setSchedule({ ...schedule, dailyStart: e.target.value })} className={input}/></Field>
          <Field label="Daily to"><input required type="time" value={schedule.dailyEnd} onChange={(e) => setSchedule({ ...schedule, dailyEnd: e.target.value })} className={input}/></Field>
          <Field label="Slot interval (minutes)"><input type="number" min={5} max={480} value={schedule.slotIntervalMinutes} onChange={(e) => setSchedule({ ...schedule, slotIntervalMinutes: Number(e.target.value) })} className={input}/></Field>
          <Field label="Timezone"><input required value={schedule.timezone} onChange={(e) => setSchedule({ ...schedule, timezone: e.target.value })} className={input}/></Field>
          <div className="md:col-span-2 xl:col-span-2"><WeekdayPicker value={schedule.allowedWeekdays} set={(value) => setSchedule({ ...schedule, allowedWeekdays: value })}/></div>
          <div className="md:col-span-2 xl:col-span-4"><Field label="Specific slots (optional)" hint="Enter one local date/time per line. When provided, candidates can choose only these exact slots."><textarea value={schedule.specificSlotsText} onChange={(e) => setSchedule({ ...schedule, specificSlotsText: e.target.value })} className={textarea} placeholder={"2026-08-25T11:00\n2026-08-25T15:30"}/></Field></div>
        </>}
        <Field label="Duration (minutes)"><input required type="number" min={10} max={480} value={schedule.durationMinutes} onChange={(e) => setSchedule({ ...schedule, durationMinutes: Number(e.target.value) })} className={input}/></Field>
        <Field label="Mode"><select value={schedule.mode} onChange={(e) => setSchedule({ ...schedule, mode: e.target.value as HRInterviewMode })} className={input}><option value="video">Video</option><option value="phone">Phone</option><option value="in-person">In person</option></select></Field>
        <Field label="Meeting link" hint="Visible and emailed after the candidate confirms a slot."><input value={schedule.meetingUrl} onChange={(e) => setSchedule({ ...schedule, meetingUrl: e.target.value })} className={input} placeholder="https://meet.google.com/…"/></Field>
        <Field label="Location / room"><input value={schedule.location} onChange={(e) => setSchedule({ ...schedule, location: e.target.value })} className={input}/></Field>
        <div className="md:col-span-2 xl:col-span-4"><StaffPicker staff={staff} value={schedule.interviewerIds} set={(value) => setSchedule({ ...schedule, interviewerIds: value })}/></div>
        <label className="qf-status-info md:col-span-2 xl:col-span-3 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold"><input type="checkbox" checked={schedule.sendEmail} onChange={(e) => setSchedule({ ...schedule, sendEmail: e.target.checked })}/>Send branded QuantumFinix scheduling email</label>
        <div className="flex justify-end gap-2"><SecondaryButton type="button" onClick={() => setShowScheduler(false)}>Cancel</SecondaryButton><PrimaryButton type="submit" disabled={createState.isLoading}>{createState.isLoading ? "Saving…" : schedule.schedulingMode === "candidate-choice" ? "Send scheduling request" : "Schedule interview"}</PrimaryButton></div>
      </form>
    </Card> : null}

    <InterviewSection title="Waiting for candidate to choose" description="Candidates remain here until they select one of the HR-approved slots. Once chosen, they automatically move to Scheduled Interviews." rows={awaiting} updateState={updateState.isLoading} openScorecard={openScorecard} changeStatus={changeStatus}/>
    <InterviewSection title="Scheduled interviews" description="Confirmed candidate availability. Meeting links are visible to HR and to the candidate in My Profile → Applications and are also sent by email." rows={scheduled} updateState={updateState.isLoading} openScorecard={openScorecard} changeStatus={changeStatus}/>
    <InterviewSection title="Interviewed" description="Completed interviews are removed from the active scheduling list and retained here for further hiring management and scorecards." rows={interviewed} updateState={updateState.isLoading} openScorecard={openScorecard} changeStatus={changeStatus}/>
    {closed.length ? <InterviewSection title="Cancelled / no-show" description="Closed interview attempts retained for audit history." rows={closed} updateState={updateState.isLoading} openScorecard={openScorecard} changeStatus={changeStatus}/> : null}

    {selectedInterview ? <Card className="mt-6 border-emerald-200"><CardHeader title={`Interview scorecard · ${selectedInterview.candidateName}`} description={`${selectedInterview.roundName} · ${formatDateTime(selectedInterview.scheduledAt)}. Completing this scorecard moves the application to Interviewed.`}/><form onSubmit={saveScorecard} className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4"><Field label="Overall score (0–5)"><input type="number" min={0} max={5} step={0.5} required value={scorecard.score} onChange={(e) => setScorecard({ ...scorecard, score: Number(e.target.value) })} className={input}/></Field><Field label="Recommendation"><select value={scorecard.recommendation} onChange={(e) => setScorecard({ ...scorecard, recommendation: e.target.value as HRInterviewRecommendation })} className={input}><option value="strong-hire">Strong hire</option><option value="hire">Hire</option><option value="hold">Hold / another round</option><option value="no-hire">No hire</option></select></Field><div className="md:col-span-2"/><Field label="Strengths"><textarea value={scorecard.strengths} onChange={(e) => setScorecard({ ...scorecard, strengths: e.target.value })} className={textarea}/></Field><Field label="Concerns / risks"><textarea value={scorecard.concerns} onChange={(e) => setScorecard({ ...scorecard, concerns: e.target.value })} className={textarea}/></Field><div className="md:col-span-2"><Field label="Detailed interview feedback"><textarea value={scorecard.feedback} onChange={(e) => setScorecard({ ...scorecard, feedback: e.target.value })} className={textarea}/></Field></div><div className="flex justify-end gap-2 md:col-span-2 xl:col-span-4"><SecondaryButton type="button" onClick={() => setSelectedInterview(null)}>Cancel</SecondaryButton><ColorButton type="submit" disabled={updateState.isLoading}>{updateState.isLoading ? "Saving…" : "Complete & save scorecard"}</ColorButton></div></form></Card> : null}
  </>;
}

function InterviewSection({ title, description, rows, updateState, openScorecard, changeStatus }: { title: string; description: string; rows: HRInterview[]; updateState: boolean; openScorecard: (row: HRInterview) => void; changeStatus: (row: HRInterview, status: "cancelled" | "no-show") => Promise<void> }) {
  return <Card className="mt-6"><CardHeader title={title} description={description} action={<Badge tone="violet">{rows.length}</Badge>}/>{rows.length ? <div className="overflow-x-auto"><table className="w-full min-w-[1060px] text-left text-sm"><thead className="qf-surface-muted text-[10px] font-black uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3">Candidate</th><th className="px-4 py-3">Round</th><th className="px-4 py-3">Schedule</th><th className="px-4 py-3">Mode / meeting</th><th className="px-4 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="qf-border divide-y">{rows.map((row) => <tr key={row.id} className="align-top"><td className="px-5 py-4"><b className="qf-text">{row.candidateName}</b><p className="qf-muted mt-1 text-xs">{row.candidateEmail}</p><p className="mt-1 text-[10px] font-bold text-blue-600">{jobTitle(row.jobId)}</p></td><td className="px-4 py-4"><b className="qf-text text-xs">{row.roundName}</b><p className="qf-muted mt-1 text-[10px]">{row.durationMinutes} minutes</p>{row.schedulingMode === "candidate-choice" ? <p className="mt-1 text-[10px] font-bold text-amber-600">Candidate self-scheduling</p> : null}</td><td className="px-4 py-4 text-xs font-semibold qf-text-secondary">{formatDateTime(row.scheduledAt)}{row.status === "awaiting-candidate" && row.availableSlots ? <p className="qf-muted mt-1 text-[10px]">{row.availableSlots.length} currently available slot(s)</p> : null}</td><td className="px-4 py-4"><span className="inline-flex items-center gap-1.5 text-xs font-bold qf-text-secondary">{row.mode === "video" ? <Video className="h-3.5 w-3.5 text-blue-500"/> : null}{row.mode}</span>{row.meetingUrl ? <a href={row.meetingUrl} target="_blank" rel="noreferrer" className="mt-1 block max-w-48 truncate text-[10px] font-bold text-blue-600">Open meeting link</a> : <p className="qf-muted mt-1 text-[10px]">No meeting link yet</p>}</td><td className="px-4 py-4"><Badge tone={tone(row.status)}>{row.status}</Badge>{row.status === "completed" ? <p className="mt-2 text-[10px] font-black uppercase text-emerald-600">{row.score ?? "—"}/5 · {row.recommendation?.replace("-", " ") ?? "recorded"}</p> : null}</td><td className="px-5 py-4"><div className="flex justify-end gap-2">{row.status === "scheduled" ? <><SecondaryButton type="button" onClick={() => openScorecard(row)}><CheckCircle2 className="h-3.5 w-3.5"/>Complete</SecondaryButton><button type="button" disabled={updateState} onClick={() => void changeStatus(row, "no-show")} className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-[10px] font-black text-amber-700">No-show</button></> : null}{row.status !== "completed" && row.status !== "cancelled" ? <button type="button" disabled={updateState} onClick={() => void changeStatus(row, "cancelled")} className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-2 text-[10px] font-black text-rose-700"><XCircle className="h-3.5 w-3.5"/></button> : null}</div></td></tr>)}</tbody></table></div> : <Empty title={`No ${title.toLowerCase()}`} description="Records will move here automatically as interview scheduling progresses."/>}</Card>;
}

function WeekdayPicker({ value, set }: { value: number[]; set: (value: number[]) => void }) {
  const days = [[1, "Mon"], [2, "Tue"], [3, "Wed"], [4, "Thu"], [5, "Fri"], [6, "Sat"], [0, "Sun"]] as const;
  return <Field label="Allowed weekdays"><div className="flex flex-wrap gap-2">{days.map(([id, label]) => <label key={id} className={`cursor-pointer rounded-xl border px-3 py-2 text-xs font-black ${value.includes(id) ? "qf-status-info" : "qf-surface-muted qf-muted"}`}><input className="sr-only" type="checkbox" checked={value.includes(id)} onChange={() => set(value.includes(id) ? value.filter((x) => x !== id) : [...value, id])}/>{label}</label>)}</div></Field>;
}

function StaffPicker({ staff, value, set }: { staff: Array<{ id?: string; _id: string; email: string; role: string }>; value: string[]; set: (value: string[]) => void }) {
  return <Field label="Interviewers / availability owners" hint="Selected interviewers are checked for scheduling conflicts before a candidate can confirm a slot."><div className="qf-surface-muted max-h-40 overflow-y-auto rounded-xl border p-3">{staff.length ? <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">{staff.map((user) => { const id = user.id || user._id; return <label key={id} className="flex items-center gap-2 text-xs qf-text-secondary"><input type="checkbox" checked={value.includes(id)} onChange={() => set(value.includes(id) ? value.filter((x) => x !== id) : [...value, id])}/><span className="truncate">{user.email} · {user.role}</span></label>; })}</div> : <p className="qf-muted text-xs">No user directory access is available. You can still schedule without assigning a specific interviewer.</p>}</div></Field>;
}
