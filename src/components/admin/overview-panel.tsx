"use client";

import Link from "next/link";
import { ArrowUpRight, FolderKanban, HeartHandshake, Target, UserRoundSearch, Users } from "lucide-react";
import { useGetLeadStatisticsQuery } from "@/src/lib/features/leads/lead-api";
import { useGetUsersQuery } from "@/src/lib/features/users/user-api";
import { Metric, Panel, PanelTitle, StatusBadge } from "./admin-ui";

export function OverviewPanel() {
  const leads = useGetLeadStatisticsQuery();
  const users = useGetUsersQuery({ page: 1, limit: 1 });
  const leadStats = leads.data?.data;

  return <div className="space-y-6">
    <div className="grid gap-4 lg:grid-cols-3">
      <WorkspaceLink href="/hr-management" title="HR Management" description="Hiring, employee lifecycle, departments, attendance, leave, payroll, documents and HR communication." icon={<HeartHandshake className="h-6 w-6"/>}/>
      <WorkspaceLink href="/lead-management" title="Lead Dashboard" description="Lead pipeline, ownership, qualification, follow-ups, communication, opportunity scoring and conversion analytics." icon={<UserRoundSearch className="h-6 w-6"/>}/>
      <WorkspaceLink href="/product-management" title="Product Management" description="Planning, backlog, sprints, board, releases, client delivery, reports and team workflows." icon={<FolderKanban className="h-6 w-6"/>}/>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric label="Total leads" value={leadStats?.total ?? "—"} detail={`${leadStats?.newToday ?? 0} new today`} />
      <Metric label="Unassigned leads" value={leadStats?.unassigned ?? "—"} detail="Needs ownership" />
      <Metric label="Overdue follow-ups" value={leadStats?.overdueFollowUps ?? "—"} detail="Sales actions due" />
      <Metric label="Users" value={users.data?.pagination.total ?? "—"} detail="Registered accounts" />
    </div>

    <div className="grid gap-6 xl:grid-cols-2">
      <Panel><PanelTitle eyebrow="Lead dashboard" title="Sales pipeline signals" /><div className="space-y-3"><Signal label="New leads today" value={leadStats?.newToday ?? 0} status={(leadStats?.newToday ?? 0) > 0 ? "Active" : "Quiet"} /><Signal label="Unassigned leads" value={leadStats?.unassigned ?? 0} status={(leadStats?.unassigned ?? 0) > 0 ? "Needs review" : "Clear"} /><Signal label="Overdue follow-ups" value={leadStats?.overdueFollowUps ?? 0} status={(leadStats?.overdueFollowUps ?? 0) > 0 ? "Overdue" : "Clear"} /><div className="pt-2"><Link href="/lead-management" className="qf-primary-button inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black"><Target className="h-4 w-4"/>Open full Lead Dashboard</Link></div></div></Panel>
      <Panel><PanelTitle eyebrow="Administration" title="Workspace separation" /><div className="space-y-4"><div className="qf-surface-muted rounded-2xl border p-4"><div className="flex items-center gap-3"><span className="qf-status-info grid h-10 w-10 place-items-center rounded-xl border"><HeartHandshake className="h-5 w-5"/></span><div><p className="qf-text font-black">HR work belongs in HRMS</p><p className="qf-muted mt-1 text-xs leading-5">Jobs, applications, interviews, employees, HR documents and HR mail are managed from HR Management.</p></div></div></div><div className="qf-surface-muted rounded-2xl border p-4"><div className="flex items-center gap-3"><span className="qf-status-info grid h-10 w-10 place-items-center rounded-xl border"><Users className="h-5 w-5"/></span><div><p className="qf-text font-black">General administration stays focused</p><p className="qf-muted mt-1 text-xs leading-5">Use this dashboard for platform users, access, content, files, Lead Dashboard entry points and system administration.</p></div></div></div></div></Panel>
    </div>
  </div>;
}

function WorkspaceLink({href,title,description,icon}:{href:string;title:string;description:string;icon:React.ReactNode}) {return <Link href={href} className="qf-surface qf-shadow qf-border group flex items-center justify-between gap-5 rounded-2xl border p-5 transition hover:border-blue-300"><div className="flex items-center gap-4"><span className="qf-status-info grid h-12 w-12 place-items-center rounded-xl border">{icon}</span><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-blue-600">Dedicated workspace</p><h2 className="qf-text mt-1 text-lg font-black">{title}</h2><p className="qf-muted mt-1 text-xs leading-5">{description}</p></div></div><ArrowUpRight className="h-5 w-5 text-blue-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></Link>}

function Signal({ label, value, status }: { label: string; value: number; status: string }) {
  return <div className="qf-surface-muted qf-border flex items-center justify-between gap-4 rounded-2xl border px-4 py-3"><div><p className="qf-text text-sm font-bold">{label}</p><p className="qf-muted mt-1 text-xs">Current value: {value}</p></div><StatusBadge value={status} /></div>;
}
