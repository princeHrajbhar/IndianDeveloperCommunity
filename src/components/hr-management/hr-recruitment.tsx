"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileUser,
  Video,
  XCircle,
} from "lucide-react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useAdminListJobApplicationsQuery } from "@/src/lib/features/job-applications/job-application-api";
import type { JobApplication, JobReference } from "@/src/lib/features/job-applications/job-application-types";
import { useGetHROverviewQuery } from "@/src/lib/features/hr-management/hr-management-api";
import {
  useCreateHRInterviewMutation,
  useGetHRInterviewsQuery,
  useUpdateHRInterviewMutation,
} from "@/src/lib/features/hr-management/hr-recruitment-api";
import type {
  HRInterview,
  HRInterviewMode,
  HRInterviewRecommendation,
} from "@/src/lib/features/hr-management/hr-recruitment-types";
import {
  Badge,
  Card,
  CardHeader,
  ColorButton,
  Empty,
  ErrorBox,
  Field,
  HRPageTitle,
  Metric,
  PrimaryButton,
  SecondaryButton,
  input,
  textarea,
} from "./hr-ui";

const initialSchedule = {
  applicationId: "",
  roundName: "HR Screening",
  scheduledAt: "",
  durationMinutes: 45,
  mode: "video" as HRInterviewMode,
  location: "",
  meetingUrl: "",
  sendEmail: true,
};

function jobTitle(job: JobReference): string {
  if (typeof job === "string") return "Job opening";
  return job.title || "Job opening";
}

function candidateName(application: JobApplication): string {
  return `${application.personalInfo.firstName} ${application.personalInfo.lastName}`.trim();
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function interviewTone(status: HRInterview["status"]): "blue" | "green" | "rose" | "amber" {
  if (status === "completed") return "green";
  if (status === "cancelled" || status === "no-show") return "rose";
  return "blue";
}

export function HRInterviewsWorkspace() {
  const overview = useGetHROverviewQuery();
  const applications = useAdminListJobApplicationsQuery({ page: 1, limit: 100, sortBy: "updatedAt", sortOrder: "desc" });
  const interviews = useGetHRInterviewsQuery({ page: 1, limit: 100 });
  const [createInterview, createState] = useCreateHRInterviewMutation();
  const [updateInterview, updateState] = useUpdateHRInterviewMutation();
  const [showScheduler, setShowScheduler] = useState(false);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedInterview, setSelectedInterview] = useState<HRInterview | null>(null);
  const [scorecard, setScorecard] = useState({
    score: 4,
    recommendation: "hire" as HRInterviewRecommendation,
    strengths: "",
    concerns: "",
    feedback: "",
  });
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const metrics = overview.data?.data.metrics;
  const interviewRows = interviews.data?.data ?? [];
  const applicationRows = applications.data?.data ?? [];
  const availableApplications = useMemo(
    () => applicationRows.filter((item) => !["Hired", "Rejected", "Withdrawn"].includes(item.status)),
    [applicationRows],
  );
  const upcoming = interviewRows.filter((item) => item.status === "scheduled" && new Date(item.scheduledAt).getTime() >= Date.now()).length;
  const completed = interviewRows.filter((item) => item.status === "completed").length;

  async function submitSchedule(event: FormEvent) {
    event.preventDefault();
    setError("");
    setFeedback("");
    try {
      await createInterview({
        ...schedule,
        scheduledAt: new Date(schedule.scheduledAt).toISOString(),
        location: schedule.location || undefined,
        meetingUrl: schedule.meetingUrl || undefined,
        interviewerIds: [],
      }).unwrap();
      setSchedule(initialSchedule);
      setShowScheduler(false);
      setFeedback("Interview scheduled. The application moved to Interview Scheduled and the candidate notification was created.");
    } catch (cause) {
      setError(getApiErrorMessage(cause));
    }
  }

  async function changeStatus(interview: HRInterview, status: "cancelled" | "no-show") {
    setError("");
    setFeedback("");
    try {
      await updateInterview({ id: interview.id, body: { status } }).unwrap();
      setFeedback(status === "cancelled" ? "Interview cancelled." : "Candidate marked as no-show.");
    } catch (cause) {
      setError(getApiErrorMessage(cause));
    }
  }

  function openScorecard(interview: HRInterview) {
    setSelectedInterview(interview);
    setScorecard({
      score: interview.score ?? 4,
      recommendation: interview.recommendation ?? "hire",
      strengths: interview.strengths ?? "",
      concerns: interview.concerns ?? "",
      feedback: interview.feedback ?? "",
    });
  }

  async function saveScorecard(event: FormEvent) {
    event.preventDefault();
    if (!selectedInterview) return;
    setError("");
    setFeedback("");
    try {
      await updateInterview({
        id: selectedInterview.id,
        body: { status: "completed", ...scorecard },
      }).unwrap();
      setSelectedInterview(null);
      setFeedback("Interview scorecard saved and the application moved to Interviewed.");
    } catch (cause) {
      setError(getApiErrorMessage(cause));
    }
  }

  return <>
    <HRPageTitle
      eyebrow="Talent Operations · Interviews"
      title="Structured interviews with"
      accent="clear hiring decisions."
      description="Schedule interview rounds against live applications, notify candidates, capture consistent scorecards and keep hiring decisions synchronized with the application pipeline."
      actions={<SecondaryButton type="button" onClick={() => setShowScheduler((value) => !value)}><CalendarClock className="h-4 w-4"/>Schedule interview</SecondaryButton>}
    />

    {error && <div className="mb-5"><ErrorBox message={error}/></div>}
    {feedback && <div className="qf-status-success mb-5 rounded-xl border px-4 py-3 text-sm font-semibold">{feedback}</div>}

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric label="Published jobs" value={metrics?.openJobs ?? "—"} helper="Open career opportunities" icon={<BriefcaseBusiness className="h-5 w-5"/>} gradient="from-violet-500 to-fuchsia-500"/>
      <Metric label="Active applications" value={metrics?.applications ?? "—"} helper="Candidates still in pipeline" icon={<FileUser className="h-5 w-5"/>} gradient="from-blue-500 to-cyan-500"/>
      <Metric label="Upcoming interviews" value={upcoming} helper="Scheduled candidate rounds" icon={<CalendarClock className="h-5 w-5"/>} gradient="from-cyan-500 to-blue-500"/>
      <Metric label="Completed scorecards" value={completed} helper="Interview decisions captured" icon={<ClipboardList className="h-5 w-5"/>} gradient="from-emerald-500 to-teal-500"/>
    </div>

    {showScheduler && <Card className="mt-6">
      <CardHeader title="Schedule structured interview" description="Scheduling updates the candidate application stage, stores the round in HRMS, creates an in-app notification and can send a branded Quantum Finix email."/>
      <form onSubmit={submitSchedule} className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Candidate / application">
          <select required value={schedule.applicationId} onChange={(event) => setSchedule({ ...schedule, applicationId: event.target.value })} className={input}>
            <option value="">Select candidate</option>
            {availableApplications.map((application) => <option key={application.id} value={application.id}>{candidateName(application)} · {jobTitle(application.jobId)} · {application.status}</option>)}
          </select>
        </Field>
        <Field label="Interview round"><input required value={schedule.roundName} onChange={(event) => setSchedule({ ...schedule, roundName: event.target.value })} className={input} placeholder="Technical Round 1"/></Field>
        <Field label="Date & time"><input required type="datetime-local" value={schedule.scheduledAt} onChange={(event) => setSchedule({ ...schedule, scheduledAt: event.target.value })} className={input}/></Field>
        <Field label="Duration (minutes)"><input required type="number" min={10} max={480} value={schedule.durationMinutes} onChange={(event) => setSchedule({ ...schedule, durationMinutes: Number(event.target.value) })} className={input}/></Field>
        <Field label="Mode"><select value={schedule.mode} onChange={(event) => setSchedule({ ...schedule, mode: event.target.value as HRInterviewMode })} className={input}><option value="video">Video</option><option value="phone">Phone</option><option value="in-person">In person</option></select></Field>
        <Field label="Meeting URL" hint="For video interviews; optional until the link is available."><input value={schedule.meetingUrl} onChange={(event) => setSchedule({ ...schedule, meetingUrl: event.target.value })} className={input} placeholder="https://meet…"/></Field>
        <Field label="Location / room"><input value={schedule.location} onChange={(event) => setSchedule({ ...schedule, location: event.target.value })} className={input} placeholder="HQ · Meeting Room 2"/></Field>
        <Field label="Candidate email notification"><label className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-600"><input type="checkbox" checked={schedule.sendEmail} onChange={(event) => setSchedule({ ...schedule, sendEmail: event.target.checked })}/>Send branded interview email</label></Field>
        <div className="flex justify-end gap-2 md:col-span-2 xl:col-span-4"><SecondaryButton type="button" onClick={() => setShowScheduler(false)}>Cancel</SecondaryButton><PrimaryButton type="submit" disabled={createState.isLoading}>{createState.isLoading ? "Scheduling…" : "Schedule interview"}</PrimaryButton></div>
      </form>
    </Card>}

    <Card className="mt-6">
      <CardHeader title="Interview calendar & scorecards" description="Track interview rounds, meeting details, no-shows/cancellations and structured hiring feedback in one place." action={<Badge tone="violet">{interviewRows.length} rounds</Badge>}/>
      {interviews.isLoading ? <p className="p-6 text-sm text-slate-400">Loading interviews…</p> : interviewRows.length ? <div className="overflow-x-auto"><table className="w-full min-w-[1040px] text-left text-sm"><thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3">Candidate</th><th className="px-4 py-3">Round</th><th className="px-4 py-3">Schedule</th><th className="px-4 py-3">Mode</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Score / decision</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{interviewRows.map((interview) => <tr key={interview.id} className="align-top"><td className="px-5 py-4"><b className="text-slate-800">{interview.candidateName}</b><p className="mt-1 text-xs text-slate-400">{interview.candidateEmail}</p><p className="mt-1 text-[10px] font-bold text-violet-600">{jobTitle(interview.jobId)}</p></td><td className="px-4 py-4"><b className="text-xs text-slate-700">{interview.roundName}</b><p className="mt-1 text-[10px] text-slate-400">{interview.durationMinutes} minutes</p></td><td className="px-4 py-4 text-xs font-semibold text-slate-600">{formatDateTime(interview.scheduledAt)}</td><td className="px-4 py-4"><span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600">{interview.mode === "video" && <Video className="h-3.5 w-3.5 text-blue-500"/>}{interview.mode}</span>{interview.meetingUrl && <a href={interview.meetingUrl} target="_blank" rel="noreferrer" className="mt-1 block max-w-44 truncate text-[10px] font-bold text-blue-600">Open meeting</a>}{interview.location && <p className="mt-1 max-w-48 text-[10px] text-slate-400">{interview.location}</p>}</td><td className="px-4 py-4"><Badge tone={interviewTone(interview.status)}>{interview.status}</Badge></td><td className="px-4 py-4">{interview.status === "completed" ? <><b className="text-xs text-slate-700">{interview.score ?? "—"}/5</b><p className="mt-1 text-[10px] font-black uppercase text-emerald-600">{interview.recommendation?.replace("-", " ") ?? "Recorded"}</p></> : <span className="text-xs text-slate-400">Pending</span>}</td><td className="px-5 py-4"><div className="flex justify-end gap-2">{interview.status === "scheduled" && <><SecondaryButton type="button" onClick={() => openScorecard(interview)}><CheckCircle2 className="h-3.5 w-3.5"/>Complete</SecondaryButton><button type="button" disabled={updateState.isLoading} onClick={() => changeStatus(interview, "no-show")} className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-[10px] font-black text-amber-700">No-show</button><button type="button" disabled={updateState.isLoading} onClick={() => changeStatus(interview, "cancelled")} className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-2 text-[10px] font-black text-rose-700"><XCircle className="h-3.5 w-3.5"/></button></>}</div></td></tr>)}</tbody></table></div> : <Empty title="No interview rounds yet" description="Schedule a candidate interview to start the structured interview calendar and scorecard history."/>}
    </Card>

    {selectedInterview && <Card className="mt-6 border-emerald-200">
      <CardHeader title={`Interview scorecard · ${selectedInterview.candidateName}`} description={`${selectedInterview.roundName} · ${formatDateTime(selectedInterview.scheduledAt)}. Completing this scorecard moves the application to Interviewed.`}/>
      <form onSubmit={saveScorecard} className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Overall score (0–5)"><input type="number" min={0} max={5} step={0.5} required value={scorecard.score} onChange={(event) => setScorecard({ ...scorecard, score: Number(event.target.value) })} className={input}/></Field>
        <Field label="Recommendation"><select value={scorecard.recommendation} onChange={(event) => setScorecard({ ...scorecard, recommendation: event.target.value as HRInterviewRecommendation })} className={input}><option value="strong-hire">Strong hire</option><option value="hire">Hire</option><option value="hold">Hold / another round</option><option value="no-hire">No hire</option></select></Field>
        <div className="md:col-span-2"/>
        <Field label="Strengths"><textarea value={scorecard.strengths} onChange={(event) => setScorecard({ ...scorecard, strengths: event.target.value })} className={textarea} placeholder="Evidence-based strengths and positive signals…"/></Field>
        <Field label="Concerns / risks"><textarea value={scorecard.concerns} onChange={(event) => setScorecard({ ...scorecard, concerns: event.target.value })} className={textarea} placeholder="Gaps, concerns or follow-up areas…"/></Field>
        <div className="md:col-span-2"><Field label="Detailed interview feedback"><textarea value={scorecard.feedback} onChange={(event) => setScorecard({ ...scorecard, feedback: event.target.value })} className={textarea} placeholder="Interview notes, evidence, competency observations and next-step recommendation…"/></Field></div>
        <div className="flex justify-end gap-2 md:col-span-2 xl:col-span-4"><SecondaryButton type="button" onClick={() => setSelectedInterview(null)}>Cancel</SecondaryButton><ColorButton type="submit" disabled={updateState.isLoading}>{updateState.isLoading ? "Saving…" : "Complete & save scorecard"}</ColorButton></div>
      </form>
    </Card>}

  </>;
}
