"use client";

import { useAdminListJobApplicationsQuery } from "@/src/lib/features/job-applications/job-application-api";
import { useGetJobStatisticsQuery } from "@/src/lib/features/jobs/job-api";
import { useGetLeadStatisticsQuery } from "@/src/lib/features/leads/lead-api";
import { useGetQueuesQuery } from "@/src/lib/features/system/system-api";
import { useGetUsersQuery } from "@/src/lib/features/users/user-api";
import { Metric, Panel, PanelTitle, StatusBadge } from "./admin-ui";

export function OverviewPanel() {
  const jobs = useGetJobStatisticsQuery();
  const applications = useAdminListJobApplicationsQuery({ page: 1, limit: 1 });
  const leads = useGetLeadStatisticsQuery();
  const users = useGetUsersQuery({ page: 1, limit: 1 });
  const queues = useGetQueuesQuery();

  const jobStats = jobs.data?.data;
  const leadStats = leads.data?.data;
  const queueList = queues.data?.data ?? [];
  const pendingJobs = queueList.reduce((total, queue) => total + (queue.counts.waiting ?? 0) + (queue.counts.delayed ?? 0) + (queue.counts.active ?? 0), 0);
  const failedJobs = queueList.reduce((total, queue) => total + (queue.counts.failed ?? 0), 0);
  const pausedQueues = queueList.filter((queue) => queue.paused).length;

  return <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <Metric label="Jobs" value={jobStats?.totalJobs ?? "—"} detail={`${jobStats?.publishedJobs ?? 0} published`} />
      <Metric label="Applications" value={applications.data?.pagination.total ?? "—"} detail="Candidate records" />
      <Metric label="Leads" value={leadStats?.total ?? "—"} detail={`${leadStats?.newToday ?? 0} new today`} />
      <Metric label="Users" value={users.data?.pagination.total ?? "—"} detail="Registered accounts" />
      <Metric label="Queue jobs" value={pendingJobs} detail={`${failedJobs} failed across ${queueList.length} queue(s)`} />
    </div>

    <div className="grid gap-6 xl:grid-cols-2">
      <Panel><PanelTitle eyebrow="Recruitment" title="Job publishing health" /><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><Metric label="Published" value={jobStats?.publishedJobs ?? 0} /><Metric label="Draft" value={jobStats?.draftJobs ?? 0} /><Metric label="Paused" value={jobStats?.pausedJobs ?? 0} /><Metric label="Closed" value={jobStats?.closedJobs ?? 0} /></div><div className="mt-4 grid grid-cols-2 gap-3"><Metric label="Views" value={jobStats?.totalViews ?? 0} /><Metric label="Applications" value={jobStats?.totalApplications ?? 0} /></div></Panel>
      <Panel><PanelTitle eyebrow="Operations" title="Lead and worker signals" /><div className="space-y-3"><Signal label="Unassigned leads" value={leadStats?.unassigned ?? 0} status={(leadStats?.unassigned ?? 0) > 0 ? "Needs review" : "Clear"} /><Signal label="Overdue follow-ups" value={leadStats?.overdueFollowUps ?? 0} status={(leadStats?.overdueFollowUps ?? 0) > 0 ? "Overdue" : "Clear"} /><Signal label="Pending queue jobs" value={pendingJobs} status={pausedQueues > 0 ? `${pausedQueues} paused` : "Running"} /><Signal label="Failed jobs" value={failedJobs} status={failedJobs > 0 ? "Action required" : "Healthy"} /></div></Panel>
    </div>
  </div>;
}

function Signal({ label, value, status }: { label: string; value: number; status: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 px-4 py-3"><div><p className="text-sm font-bold">{label}</p><p className="mt-1 text-xs text-slate-500">Current value: {value}</p></div><StatusBadge value={status} /></div>;
}
