"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Gauge, Play, Plus, Search, TimerReset, UserRoundCog, X } from "lucide-react";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
import { useBulkPMTasksMutation, useCompletePMSprintMutation, useCreatePMSprintMutation, useGetPMSprintSummaryQuery, useGetPMSprintsQuery, useGetPMTasksQuery, useStartPMSprintMutation, useUpdatePMSprintMutation } from "@/src/lib/features/product-management/product-management-api";
import type { PMSprint } from "@/src/lib/features/product-management/product-management-types";
import { Card, CardHeader, Empty, Field, PageHeader, Pagination, Progress, StatusBadge, inputClass, primaryButton, secondaryButton, shortDate, userLabel } from "./pm-ui";

export function PMSprintsPage({projectId}:{projectId:string}){
  const me=useGetMeQuery().data?.data;const canManage=!!me&&(me.role==="super-admin"||me.role==="product-admin"||(me.permissions??[]).includes("product-management.sprints.manage"));
  const q=useGetPMSprintsQuery(projectId);
  const [create]=useCreatePMSprintMutation();
  const [update]=useUpdatePMSprintMutation();
  const [start]=useStartPMSprintMutation();
  const [complete]=useCompletePMSprintMutation();
  const [show,setShow]=useState(false);
  const [name,setName]=useState("");
  const [goal,setGoal]=useState("");
  const [capacity,setCapacity]=useState("40");
  const [startDate,setStartDate]=useState("");
  const [endDate,setEndDate]=useState("");
  const sprints=q.data?.data??[];

  async function run(fn:()=>Promise<unknown>,message:string){try{await fn();toast.success(message)}catch(e){toast.error(getApiErrorMessage(e))}}
  async function createSprint(){await run(async()=>{await create({projectId,name,goal:goal||undefined,capacity:+capacity||undefined,startDate:startDate||undefined,endDate:endDate||undefined}).unwrap();setShow(false);setName("");setGoal("");setStartDate("");setEndDate("")},"Sprint created")}

  return <>
    <PageHeader eyebrow="Project / Scrum" title="Sprint Management" description="Plan capacity and scope, start a sprint, monitor committed/completed/remaining work and team workload, then complete it with controlled carry-over to backlog or the next sprint." actions={canManage?<button className={primaryButton} onClick={()=>setShow(v=>!v)}><Plus className="h-4 w-4"/>Create sprint</button>:undefined}/>
    {canManage&&show&&<Card className="mb-5 p-5"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"><Field label="Sprint name" required><input className={inputClass} value={name} onChange={e=>setName(e.target.value)} placeholder="Sprint 24"/></Field><Field label="Capacity (points)"><input type="number" min="0" className={inputClass} value={capacity} onChange={e=>setCapacity(e.target.value)}/></Field><Field label="Start"><input type="date" className={inputClass} value={startDate} onChange={e=>setStartDate(e.target.value)}/></Field><Field label="End"><input type="date" className={inputClass} value={endDate} onChange={e=>setEndDate(e.target.value)}/></Field><div className="md:col-span-2 xl:col-span-4"><Field label="Sprint goal"><input className={inputClass} value={goal} onChange={e=>setGoal(e.target.value)} placeholder="What outcome should the team achieve?"/></Field></div><div className="flex items-end"><button disabled={!name.trim()} className={primaryButton} onClick={()=>void createSprint()}>Create sprint</button></div></div></Card>}
    <div className="grid gap-5 xl:grid-cols-2">{sprints.map(s=><SprintCard key={s._id} projectId={projectId} sprint={s} allSprints={sprints} canManage={canManage} onStart={()=>run(()=>start(s._id).unwrap(),"Sprint started")} onComplete={destination=>run(()=>complete({id:s._id,destinationSprintId:destination||undefined}).unwrap(),"Sprint completed")} onUpdate={body=>run(()=>update({id:s._id,body}).unwrap(),"Sprint updated")}/>)}</div>
    {!sprints.length&&<Card><Empty title="No sprints" description="Create a sprint and add backlog items to start Scrum planning."/></Card>}
  </>;
}

function SprintCard({projectId,sprint,allSprints,canManage,onStart,onComplete,onUpdate}:{projectId:string;sprint:PMSprint;allSprints:PMSprint[];canManage:boolean;onStart:()=>Promise<void>;onComplete:(destination:string)=>Promise<void>;onUpdate:(body:Record<string,unknown>)=>Promise<void>}){
  const [page,setPage]=useState(1);
  const [destination,setDestination]=useState("");
  const [scopeOpen,setScopeOpen]=useState(false);
  const tasksQ=useGetPMTasksQuery({projectId,sprintId:sprint._id,archived:false,page,limit:30,sort:"rank",order:"asc"});
  const summaryQ=useGetPMSprintSummaryQuery(sprint._id);
  const [bulk,bState]=useBulkPMTasksMutation();
  const tasks=tasksQ.data?.data??[],pg=tasksQ.data?.pagination,summary=summaryQ.data?.data.summary,workload=summaryQ.data?.data.workload??[];
  const pct=summary?.committedPoints?Math.round((summary.deliveredPoints/summary.committedPoints)*100):0;
  useEffect(()=>setPage(1),[sprint._id]);

  async function remove(id:string){try{await bulk({taskIds:[id],updates:{sprintId:null}}).unwrap();toast.success("Work item moved to backlog")}catch(e){toast.error(getApiErrorMessage(e))}}
  return <Card>
    <CardHeader title={sprint.name} description={sprint.goal||"No sprint goal"} action={<StatusBadge value={sprint.status}/>}/>
    <div className="p-5">
      <div className="mb-2 flex justify-between text-xs font-bold text-slate-500"><span>{summary?.deliveredPoints??sprint.deliveredPoints??0}/{summary?.committedPoints??sprint.committedPoints??0} points delivered</span><span>{pct}%</span></div><Progress value={pct}/>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5 text-center"><Mini label="Items" value={summary?.total??0}/><Mini label="Done" value={summary?.done??0}/><Mini label="Remaining" value={summary?.remainingPoints??0}/><Mini label="Capacity" value={summary?.capacity??sprint.capacity??0}/><Mini label="Carryover" value={sprint.carryoverPoints??0}/></div>
      <div className="mt-4 flex flex-wrap gap-3 text-[10px] font-bold text-slate-400"><span>{shortDate(sprint.startDate)} → {shortDate(sprint.endDate)}</span><span>Utilization: {summary?.utilizationPct??0}%</span><span>Blocked: {summary?.blocked??0}</span></div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-100"><div className="flex items-center justify-between bg-slate-50 px-3 py-2"><b className="text-[10px] uppercase tracking-wide text-slate-500">Sprint scope</b><span className="text-[10px] font-bold text-slate-400">Server-paged</span></div><div className="divide-y divide-slate-100">{tasks.map(t=><div key={t._id} className="flex items-center justify-between gap-2 px-3 py-2 text-xs"><span className="min-w-0 flex-1 truncate"><b>{t.key}</b> · {t.title}</span><span className="text-[10px] text-slate-400">{t.storyPoints} pts</span>{canManage&&sprint.status!=="completed"&&<button disabled={bState.isLoading} className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Move to backlog" onClick={()=>void remove(t._id)}><X className="h-3.5 w-3.5"/></button>}</div>)}</div>{!tasks.length&&<div className="p-5 text-center text-xs text-slate-400">No work in this sprint.</div>}{pg&&pg.totalPages>1&&<div className="border-t border-slate-100 p-2"><Pagination page={pg.page} totalPages={pg.totalPages} onPage={setPage}/></div>}</div>

      {!!workload.length&&<div className="mt-4"><div className="mb-2 flex items-center gap-2 text-xs font-black text-slate-700"><UserRoundCog className="h-4 w-4 text-indigo-500"/>Team workload</div><div className="grid gap-2 sm:grid-cols-2">{workload.slice(0,8).map((w,i)=><div key={w._id??`unassigned-${i}`} className="rounded-xl bg-indigo-50/60 p-3"><div className="flex items-center justify-between gap-2"><b className="truncate text-[11px] text-indigo-900">{w.assignee?userLabel(w.assignee):"Unassigned"}</b><span className="text-[10px] font-black text-indigo-600">{w.points} pts</span></div><div className="mt-1 text-[9px] font-bold text-indigo-500">{w.items} items · {w.done} done · {w.overdue} overdue</div></div>)}</div></div>}

      {canManage&&sprint.status!=="completed"&&<button className="mt-4 flex items-center gap-2 text-xs font-black text-blue-600" onClick={()=>setScopeOpen(v=>!v)}>{scopeOpen?<ChevronUp className="h-4 w-4"/>:<ChevronDown className="h-4 w-4"/>}Add backlog work</button>}
      {canManage&&scopeOpen&&sprint.status!=="completed"&&<ScopePicker projectId={projectId} sprintId={sprint._id}/>} 

      {canManage&&sprint.status==="planned"&&<div className="mt-4 flex flex-wrap gap-2"><button className={primaryButton} onClick={()=>void onStart()}><Play className="h-4 w-4"/>Start sprint</button><button className={secondaryButton} onClick={()=>{const raw=prompt("Capacity",String(sprint.capacity??40));if(raw!==null)void onUpdate({capacity:Number(raw)||0})}}><Gauge className="h-4 w-4"/>Edit capacity</button></div>}
      {canManage&&sprint.status==="active"&&<div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3"><p className="text-xs font-black text-amber-800">Complete sprint</p><p className="mt-1 text-[10px] leading-5 text-amber-700">Choose where unfinished work should go. Leaving this blank moves it to the backlog.</p><div className="mt-2 flex flex-wrap gap-2"><select className={`${inputClass} max-w-64`} value={destination} onChange={e=>setDestination(e.target.value)}><option value="">Move unfinished to backlog</option>{allSprints.filter(s=>s._id!==sprint._id&&s.status==="planned").map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select><button className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-black text-white" onClick={()=>void onComplete(destination)}><CheckCircle2 className="h-4 w-4"/>Complete sprint</button></div></div>}
      {sprint.status==="completed"&&<div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-black text-emerald-700"><TimerReset className="h-4 w-4"/>Completed {shortDate(sprint.completedAt)} · committed {sprint.committedPoints??0} · delivered {sprint.deliveredPoints??0} · carry-over {sprint.carryoverPoints??0}</div>}
    </div>
  </Card>;
}

function ScopePicker({projectId,sprintId}:{projectId:string;sprintId:string}){
  const [search,setSearch]=useState(""),[debounced,setDebounced]=useState(""),[page,setPage]=useState(1),[selected,setSelected]=useState<string[]>([]);
  const [bulk,state]=useBulkPMTasksMutation();
  useEffect(()=>{const id=setTimeout(()=>{setDebounced(search.trim());setPage(1)},220);return()=>clearTimeout(id)},[search]);
  const q=useGetPMTasksQuery({projectId,sprintState:"backlog",search:debounced||undefined,archived:false,page,limit:20,sort:"rank",order:"asc"});
  const rows=q.data?.data??[],pg=q.data?.pagination;
  const allSelected=rows.length>0&&rows.every(t=>selected.includes(t._id));
  async function add(){if(!selected.length)return;try{await bulk({taskIds:selected,updates:{sprintId}}).unwrap();setSelected([]);toast.success("Work added to sprint")}catch(e){toast.error(getApiErrorMessage(e))}}
  return <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/40 p-3"><div className="flex flex-col gap-2 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input className={`${inputClass} pl-9`} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search backlog by key, title or description"/></div><button className={primaryButton} disabled={!selected.length||state.isLoading} onClick={()=>void add()}>Add {selected.length||"selected"}</button></div><label className="mt-3 flex items-center gap-2 text-[10px] font-black text-slate-500"><input type="checkbox" checked={allSelected} onChange={()=>setSelected(allSelected?selected.filter(id=>!rows.some(r=>r._id===id)):[...new Set([...selected,...rows.map(r=>r._id)])])}/>Select visible results</label><div className="mt-2 divide-y divide-blue-100">{rows.map(t=><label key={t._id} className="flex cursor-pointer items-center gap-2 py-2 text-xs"><input type="checkbox" checked={selected.includes(t._id)} onChange={()=>setSelected(v=>v.includes(t._id)?v.filter(x=>x!==t._id):[...v,t._id])}/><span className="min-w-0 flex-1 truncate"><b>{t.key}</b> · {t.title}</span><span className="text-[10px] font-black text-slate-400">{t.storyPoints} pts</span></label>)}</div>{!rows.length&&<p className="py-4 text-center text-[11px] text-slate-400">No matching backlog work.</p>}{pg&&pg.totalPages>1&&<Pagination page={pg.page} totalPages={pg.totalPages} onPage={setPage}/>}</div>;
}

function Mini({label,value}:{label:string;value:number}){return <div className="rounded-xl bg-slate-50 p-3"><b className="block text-lg">{value}</b><span className="text-[9px] font-black uppercase text-slate-400">{label}</span></div>}
