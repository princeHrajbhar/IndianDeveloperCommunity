"use client";

import { useEffect, useMemo, useState } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useCleanQueueMutation,
  useGetQueueJobsQuery,
  useGetQueuesQuery,
  usePauseQueueMutation,
  useRemoveQueueJobMutation,
  useResumeQueueMutation,
  useRetryQueueJobMutation,
} from "@/src/lib/features/system/system-api";
import type { QueueJob, QueueJobState } from "@/src/lib/features/system/system-types";
import { Button, Empty, ErrorNotice, LoadingRows, Metric, Panel, PanelTitle, StatusBadge, SuccessNotice, formatDate, inputClass } from "./admin-ui";

const states: QueueJobState[] = ["failed", "waiting", "active", "delayed", "completed", "paused", "prioritized", "waiting-children"];

export function QueuePanel() {
  const queues = useGetQueuesQuery(undefined, { pollingInterval: 15_000 });
  const [queueName, setQueueName] = useState("");
  const [state, setState] = useState<QueueJobState>("failed");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!queueName && queues.data?.data[0]?.name) setQueueName(queues.data.data[0].name);
  }, [queueName, queues.data]);

  const queue = useMemo(() => queues.data?.data.find((item) => item.name === queueName), [queueName, queues.data]);
  const jobs = useGetQueueJobsQuery(
    { queueName, state, page, limit: 20 },
    { skip: !queueName, pollingInterval: state === "active" || state === "waiting" ? 10_000 : 0 },
  );
  const [pause, pauseState] = usePauseQueueMutation();
  const [resume, resumeState] = useResumeQueueMutation();
  const [retry, retryState] = useRetryQueueJobMutation();
  const [remove, removeState] = useRemoveQueueJobMutation();
  const [clean, cleanState] = useCleanQueueMutation();
  const busy = pauseState.isLoading || resumeState.isLoading || retryState.isLoading || removeState.isLoading || cleanState.isLoading;

  async function action(operation: () => Promise<unknown>, success: string) {
    setLocalError(""); setNotice("");
    try { await operation(); setNotice(success); await queues.refetch(); await jobs.refetch(); }
    catch (error) { setLocalError(getApiErrorMessage(error)); }
  }

  if (queues.isLoading) return <LoadingRows count={8} />;
  if (queues.error) return <ErrorNotice message={getApiErrorMessage(queues.error)} />;

  return <div className="space-y-6">
    {localError ? <ErrorNotice message={localError} /> : null}{notice ? <SuccessNotice message={notice} /> : null}
    <Panel>
      <PanelTitle eyebrow="Queue registry" title="Background job processing" />
      <div className="grid gap-3 md:grid-cols-[minmax(260px,420px)_1fr]">
        <select value={queueName} onChange={(event) => { setQueueName(event.target.value); setPage(1); }} className={inputClass}>
          {queues.data?.data.map((item) => <option key={item.name} value={item.name}>{item.displayName} ({item.name})</option>)}
        </select>
        <p className="self-center text-sm text-slate-500">{queue?.description || "Registered BullMQ queue. New queue types can be added through the backend registry."}</p>
      </div>
    </Panel>
    {queue ? <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><Metric label="Waiting" value={queue.counts.waiting ?? 0} /><Metric label="Active" value={queue.counts.active ?? 0} /><Metric label="Delayed" value={queue.counts.delayed ?? 0} /><Metric label="Failed" value={queue.counts.failed ?? 0} /><Metric label="Completed retained" value={queue.counts.completed ?? 0} /></div>
      <Panel><PanelTitle eyebrow={queue.kind} title={queue.displayName} action={<div className="flex flex-wrap gap-2"><StatusBadge value={queue.paused ? "Paused" : "Running"} />{queue.paused ? <Button disabled={busy} onClick={() => void action(() => resume(queue.name).unwrap(), "Queue resumed.")}>Resume</Button> : <Button secondary disabled={busy} onClick={() => void action(() => pause(queue.name).unwrap(), "Queue paused. Active jobs will finish.")}>Pause</Button>}</div>} />
        <div className="mb-5 flex flex-wrap gap-3"><select value={state} onChange={(event) => { setState(event.target.value as QueueJobState); setPage(1); }} className={`${inputClass} max-w-xs`}>{states.map((item) => <option key={item}>{item}</option>)}</select><Button secondary onClick={() => { void queues.refetch(); void jobs.refetch(); }}>Refresh</Button>{["completed", "failed", "delayed", "paused", "prioritized"].includes(state) ? <Button danger disabled={busy} onClick={() => { if (window.confirm(`Remove retained ${state} jobs older than one second?`)) void action(() => clean({ queueName: queue.name, state, graceMs: 1000, limit: 1000 }).unwrap(), `${state} jobs cleaned.`); }}>Clean state</Button> : null}</div>
        {jobs.isLoading ? <LoadingRows /> : jobs.error ? <ErrorNotice message={getApiErrorMessage(jobs.error)} /> : jobs.data?.data.length ? <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left text-sm"><thead className="text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="pb-3">Job</th><th className="pb-3">Payload</th><th className="pb-3">Attempts</th><th className="pb-3">Created</th><th className="pb-3">Failure</th><th className="pb-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-white/8">{jobs.data.data.map((job) => <QueueJobRow key={job.id || `${job.name}-${job.timestamp}`} job={job} queueName={queue.name} state={state} busy={busy} action={action} retry={retry} remove={remove} />)}</tbody></table></div> : <Empty title={`No ${state} jobs`} description="The selected queue state is currently empty." />}
        <div className="mt-5 flex justify-end gap-3"><Button secondary disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</Button><Button secondary disabled={(jobs.data?.data.length ?? 0) < 20} onClick={() => setPage((value) => value + 1)}>Next</Button></div>
      </Panel>
    </> : <Empty title="No queues registered" description="Register a queue in the backend queue registry to manage it here." />}
    <Panel><PanelTitle eyebrow="Scalable architecture" title="Adding another worker" /><div className="grid gap-3 md:grid-cols-3"><Instruction number="1" text="Create the BullMQ queue and processor for any workload, such as imports, reports, media, or notifications." /><Instruction number="2" text="Register it once in queue-manager/queue.instance.ts with a descriptor and optional payload presenter." /><Instruction number="3" text="The same admin controls, metrics, retries, cleanup, and job list work without another queue-specific UI." /></div></Panel>
  </div>;
}

function QueueJobRow({ job, queueName, state, busy, action, retry, remove }: { job: QueueJob; queueName: string; state: QueueJobState; busy: boolean; action: (operation: () => Promise<unknown>, success: string) => Promise<void>; retry: ReturnType<typeof useRetryQueueJobMutation>[0]; remove: ReturnType<typeof useRemoveQueueJobMutation>[0] }) {
  const summary = job.to ? `${job.to}${job.subject ? ` · ${job.subject}` : ""}` : compactPayload(job.data);
  return <tr><td className="py-4"><p className="font-bold">{job.name}</p><p className="mt-1 text-xs text-slate-500">{job.id || "No job ID"}</p></td><td className="max-w-md py-4 text-xs leading-5 text-slate-400">{summary}</td><td className="py-4"><StatusBadge value={`${job.attemptsMade}/${job.attempts ?? "?"}`} /></td><td className="py-4 text-xs text-slate-500">{formatDate(job.timestamp)}</td><td className="max-w-xs py-4 text-xs text-rose-200">{job.failedReason || "—"}</td><td className="py-4"><div className="flex justify-end gap-2">{state === "failed" && job.id ? <Button disabled={busy} onClick={() => void action(() => retry({ queueName, id: job.id! }).unwrap(), "Job queued for retry.")}>Retry</Button> : null}{job.id && state !== "active" ? <Button danger disabled={busy} onClick={() => void action(() => remove({ queueName, id: job.id! }).unwrap(), "Job removed.")}>Remove</Button> : null}</div></td></tr>;
}

function compactPayload(data?: Record<string, unknown>): string {
  if (!data) return "No payload";
  try { const value = JSON.stringify(data); return value.length > 220 ? `${value.slice(0, 220)}…` : value; }
  catch { return "Payload unavailable"; }
}
function Instruction({ number, text }: { number: string; text: string }) { return <div className="rounded-2xl border border-white/8 bg-black/20 p-5"><span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-300 font-black text-slate-950">{number}</span><p className="mt-4 text-sm leading-6 text-slate-300">{text}</p></div>; }
