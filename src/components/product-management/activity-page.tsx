"use client";
import { useState } from "react";
import { Activity, ArrowRight, History, UserRound } from "lucide-react";
import { useGetPMActivityQuery } from "@/src/lib/features/product-management/product-management-api";
import type { PMUser } from "@/src/lib/features/product-management/product-management-types";
import { Card, Empty, PageHeader, Pagination, inputClass } from "./pm-ui";

const label=(v:string)=>v.replaceAll("."," · ").replaceAll("-"," ").replace(/\b\w/g,c=>c.toUpperCase());
const who=(actor:string|PMUser)=>typeof actor==="string"?`User …${actor.slice(-6)}`:actor.name||actor.email;
const changed=(oldValue:unknown,newValue:unknown)=>{if(!oldValue&&!newValue)return null;const before=oldValue&&typeof oldValue==="object"?oldValue as Record<string,unknown>:{};const after=newValue&&typeof newValue==="object"?newValue as Record<string,unknown>:{};return [...new Set([...Object.keys(before),...Object.keys(after)])].filter(k=>JSON.stringify(before[k])!==JSON.stringify(after[k])).slice(0,6)};
const entityOptions=['work-item','project','sprint','release','delivery','milestone','team-member','comment','worklog'];
const actionOptions=['project.created','project.updated','project.archived','member.added','member.updated','member.removed','work.created','work.updated','work.transitioned','work.submitted','work.accepted','work.rejected','work.reopened','work.archived','sprint.created','sprint.started','sprint.completed','release.created','release.updated','release.transitioned','release.decision','delivery.created','delivery.updated','delivery.client-decision'];
export function PMActivityPage({projectId}:{projectId:string}){
  const [page,setPage]=useState(1),[entityType,setEntityType]=useState(''),[action,setAction]=useState('');
  const q=useGetPMActivityQuery({projectId,entityType:entityType||undefined,action:action||undefined,page,limit:30});
  const rows=q.data?.data??[],pg=q.data?.pagination;
  return <>
    <PageHeader eyebrow="Governance" title="Activity & Audit Trail" description="Server-generated history for project, membership, assignment, workflow, sprint, release, approval and client-delivery events."/>
    <Card className="mb-4 p-4"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[280px_360px_1fr]"><select className={inputClass} value={entityType} onChange={e=>{setEntityType(e.target.value);setPage(1)}}><option value="">All entity types</option>{entityOptions.map(x=><option key={x} value={x}>{label(x)}</option>)}</select><select className={inputClass} value={action} onChange={e=>{setAction(e.target.value);setPage(1)}}><option value="">All actions</option>{actionOptions.map(x=><option key={x} value={x}>{label(x)}</option>)}</select><div className="flex items-center justify-end text-xs font-semibold text-slate-400">{pg?.total??0} immutable events in this filtered view</div></div></Card>
    <Card>
      {q.isLoading?<div className="p-8 text-sm text-slate-500">Loading audit history…</div>:!rows.length?<Empty title="No matching activity" description="Change the filters or perform a Product Management action; audit records are written by the server."/>:<div className="divide-y divide-slate-100">{rows.map(row=>{const keys=changed(row.oldValue,row.newValue);return <article key={row._id} className="grid gap-3 px-5 py-4 md:grid-cols-[44px_1fr_auto] md:items-start"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-700"><Activity className="h-4 w-4"/></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><b className="text-sm text-slate-900">{label(row.action)}</b><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{label(row.entityType)}</span></div><div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500"><UserRound className="h-3.5 w-3.5"/><span>{who(row.actorId)}</span><span>·</span><span>entity …{String(row.entityId).slice(-6)}</span></div>{keys?.length?<div className="mt-2 flex flex-wrap gap-1.5">{keys.map(k=><span key={k} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600"><span>{k}</span><ArrowRight className="h-3 w-3"/></span>)}</div>:null}</div><time className="text-[11px] font-semibold text-slate-400">{new Date(row.createdAt).toLocaleString()}</time></article>})}</div>}
      {pg&&pg.totalPages>1?<div className="border-t border-slate-100 p-4"><Pagination page={pg.page} totalPages={pg.totalPages} onPage={setPage}/></div>:null}
    </Card>
    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400"><History className="h-4 w-4"/>Audit history is enforced server-side and remains independent of frontend visibility controls.</div>
  </>;
}