"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CalendarRange, Eye, EyeOff, GripVertical, Milestone as MilestoneIcon, Plus, Rocket, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
import { useCreatePMMilestoneMutation, useDeletePMMilestoneMutation, useGetPMTimelineQuery, useUpdatePMMilestoneMutation, useUpdatePMTaskMutation } from "@/src/lib/features/product-management/product-management-api";
import type { PMTask } from "@/src/lib/features/product-management/product-management-types";
import { AsyncUserPicker, Card, Empty, Field, PageHeader, Progress, StatusBadge, inputClass, primaryButton, shortDate } from "./pm-ui";

const DAY = 86_400_000;

export function PMTimelinePage({ projectId }: { projectId: string }) {
  const meQ = useGetMeQuery();
  const q = useGetPMTimelineQuery(projectId);
  const [create] = useCreatePMMilestoneMutation();
  const [updateMilestone] = useUpdatePMMilestoneMutation();
  const [deleteMilestone] = useDeletePMMilestoneMutation();
  const [updateTask] = useUpdatePMTaskMutation();
  const [name, setName] = useState("");
  const [due, setDue] = useState("");
  const [start, setStart] = useState("");
  const [owner, setOwner] = useState("");
  const [clientVisible, setClientVisible] = useState(false);
  const d = q.data?.data;
  const me = meQ.data?.data;
  const isClient = me?.role === "client-viewer";
  const canManage = me?.role === "super-admin" || me?.role === "product-admin" || me?.permissions?.includes("product-management.projects.manage");

  const taskMap = useMemo(() => new Map((d?.tasks ?? []).map(t => [t._id, t])), [d?.tasks]);
  const conflicts = useMemo(() => (d?.tasks ?? []).filter(task => {
    if (task.startDate && task.dueDate && new Date(task.startDate) > new Date(task.dueDate)) return true;
    if (!task.startDate) return false;
    return (task.dependencies ?? []).some(dep => {
      const id = typeof dep === "string" ? dep : dep._id;
      const predecessor = taskMap.get(id);
      return Boolean(predecessor?.dueDate && new Date(predecessor.dueDate) > new Date(task.startDate!));
    });
  }), [d?.tasks, taskMap]);

  const laneDays = useMemo(() => {
    const dated = (d?.tasks ?? []).flatMap(t => [t.startDate, t.dueDate]).filter(Boolean).map(x => new Date(x as string).valueOf()).filter(Number.isFinite);
    const earliest = dated.length ? Math.min(...dated) : Date.now();
    const base = new Date(Math.min(earliest, Date.now()));
    base.setHours(0, 0, 0, 0);
    return Array.from({ length: 14 }, (_, i) => new Date(base.valueOf() + i * DAY));
  }, [d?.tasks]);

  async function run(fn: () => Promise<unknown>, msg: string) {
    try { await fn(); toast.success(msg); } catch (e) { toast.error(getApiErrorMessage(e)); }
  }

  async function reschedule(task: PMTask, day: Date) {
    if (!canManage) return;
    const oldStart = task.startDate ? new Date(task.startDate) : null;
    const oldDue = task.dueDate ? new Date(task.dueDate) : null;
    const duration = oldStart && oldDue ? Math.max(0, Math.round((oldDue.valueOf() - oldStart.valueOf()) / DAY)) : 0;
    const startDate = isoDate(day);
    const dueDate = isoDate(new Date(day.valueOf() + duration * DAY));
    await run(() => updateTask({ id: task._id, body: { startDate, dueDate } }).unwrap(), `${task.key} rescheduled`);
  }

  return <>
    <PageHeader eyebrow="Project / Planning" title="Timeline & Roadmap" description={isClient ? "Published client roadmap milestones and approved release targets." : "Epics, stories, milestones and releases on one scheduling view with dependencies, progress, drag-to-reschedule and conflict signals."}/>
    {!isClient && <Card className="mb-5 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4"><div><h2 className="font-black">Drag-to-reschedule lane</h2><p className="mt-1 text-xs text-slate-500">Drag an Epic/Story chip onto a date. Existing duration is preserved.</p></div>{conflicts.length>0&&<span className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-black text-rose-600"><AlertTriangle className="h-3 w-3"/>{conflicts.length} dependency/date conflicts</span>}</div>
      <div className="overflow-x-auto p-4"><div className="grid min-w-[980px] grid-cols-[repeat(14,minmax(0,1fr))] gap-2">{laneDays.map(day=><div key={day.toISOString()} onDragOver={e=>canManage&&e.preventDefault()} onDrop={e=>{e.preventDefault();const id=e.dataTransfer.getData("text/task-id");const task=taskMap.get(id);if(task)void reschedule(task,day)}} className="min-h-28 rounded-xl border border-slate-200 bg-slate-50/60 p-2"><div className="mb-2 text-center text-[10px] font-black text-slate-500">{day.toLocaleDateString(undefined,{weekday:"short",day:"numeric"})}</div><div className="space-y-1">{(d?.tasks??[]).filter(t=>t.startDate?.slice(0,10)===isoDate(day)).slice(0,4).map(t=><div key={t._id} draggable={canManage} onDragStart={e=>e.dataTransfer.setData("text/task-id",t._id)} className="cursor-grab rounded-lg bg-blue-600 px-2 py-1.5 text-[9px] font-black text-white shadow-sm"><GripVertical className="mr-1 inline h-3 w-3"/>{t.key}</div>)}</div></div>)}</div></div>
    </Card>}
    <div className={`grid gap-5 ${isClient ? "xl:grid-cols-[1fr_380px]" : "xl:grid-cols-[1fr_340px]"}`}>
      <Card><div className="border-b border-slate-100 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="font-black">Roadmap schedule</h2><p className="mt-1 text-xs text-slate-500">{isClient ? "Only published roadmap items are shown." : "Date editing and dependency checks stay project-scoped and permission protected."}</p></div>{!isClient&&conflicts.length>0&&<span className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-black text-rose-600"><AlertTriangle className="h-3 w-3"/>{conflicts.length} conflicts</span>}</div></div>
        {isClient ? <div className="divide-y divide-slate-100">{(d?.milestones??[]).map(m=><div key={m._id} className="flex items-center gap-3 p-4"><span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-700"><MilestoneIcon className="h-4 w-4"/></span><span className="min-w-0 flex-1"><b className="block truncate text-sm">{m.name}</b><span className="text-[10px] text-slate-400">{shortDate(m.startDate)} → {shortDate(m.dueDate)}</span></span><StatusBadge value={m.status}/></div>)}{!(d?.milestones??[]).length&&<Empty title="No published roadmap milestones"/>}</div> : <div className="divide-y divide-slate-100">{(d?.tasks??[]).filter(t=>["Epic","Story"].includes(t.type)||t.startDate||t.dueDate).map(t=><RoadTask key={t._id} task={t} editable={Boolean(canManage)} conflict={conflicts.some(c=>c._id===t._id)} onUpdate={(body)=>run(()=>updateTask({id:t._id,body}).unwrap(),"Schedule updated")}/>)}{!(d?.tasks??[]).length&&<Empty title="No scheduled work"/>}</div>}
      </Card>
      <div className="space-y-5">
        {canManage&&<Card className="p-4"><h3 className="font-black">Add milestone</h3><div className="mt-3 space-y-3"><Field label="Name"><input className={inputClass} value={name} onChange={e=>setName(e.target.value)}/></Field><div className="grid grid-cols-2 gap-2"><Field label="Start"><input type="date" className={inputClass} value={start} onChange={e=>setStart(e.target.value)}/></Field><Field label="Due" required><input type="date" className={inputClass} value={due} onChange={e=>setDue(e.target.value)}/></Field></div><Field label="Owner"><AsyncUserPicker projectId={projectId} value={owner} onChange={setOwner} label="Milestone owner"/></Field><label className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-bold text-slate-600"><input type="checkbox" checked={clientVisible} onChange={e=>setClientVisible(e.target.checked)}/>{clientVisible?<Eye className="h-4 w-4 text-emerald-600"/>:<EyeOff className="h-4 w-4 text-slate-400"/>}Publish to client roadmap</label><button disabled={!name||!due} className={primaryButton} onClick={()=>void run(async()=>{await create({projectId,name,startDate:start||undefined,dueDate:due,owner:owner||undefined,clientVisible}).unwrap();setName("");setDue("");setStart("");setOwner("");setClientVisible(false)},"Milestone created")}><Plus className="h-4 w-4"/>Add milestone</button></div></Card>}
        <Card><div className="border-b border-slate-100 p-4"><h3 className="font-black">Milestones</h3></div><div className="divide-y divide-slate-100">{(d?.milestones??[]).map(m=><div key={m._id} className="p-4"><div className="flex items-start gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-700"><MilestoneIcon className="h-4 w-4"/></span><div className="min-w-0 flex-1"><b className="block truncate text-sm">{m.name}</b><span className="text-[10px] text-slate-400">{shortDate(m.startDate)} → {shortDate(m.dueDate)}</span>{!isClient&&<span className={`ml-2 rounded-full px-2 py-0.5 text-[9px] font-black ${m.clientVisible?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-500"}`}>{m.clientVisible?"Published":"Internal"}</span>}</div>{canManage&&<button className="text-rose-500" onClick={()=>void run(()=>deleteMilestone(m._id).unwrap(),"Milestone removed")}><Trash2 className="h-4 w-4"/></button>}</div>{canManage&&<div className="mt-2 grid grid-cols-[1fr_auto] gap-2"><select className={`${inputClass} h-9`} value={m.status} onChange={e=>void run(()=>updateMilestone({id:m._id,body:{status:e.target.value}}).unwrap(),"Milestone updated")}><option value="planned">Planned</option><option value="in-progress">In progress</option><option value="at-risk">At risk</option><option value="completed">Completed</option></select><button className="rounded-xl border border-slate-200 px-3 text-xs font-black text-slate-600" onClick={()=>void run(()=>updateMilestone({id:m._id,body:{clientVisible:!m.clientVisible}}).unwrap(),m.clientVisible?"Milestone hidden from client":"Milestone published to client")}>{m.clientVisible?<EyeOff className="h-4 w-4"/>:<Eye className="h-4 w-4"/>}</button></div>}</div>)}{!(d?.milestones??[]).length&&<Empty title="No milestones"/>}</div></Card>
        <Card><div className="border-b border-slate-100 p-4"><h3 className="font-black">Releases</h3></div><div className="divide-y divide-slate-100">{(d?.releases??[]).map(r=><div key={r._id} className="flex items-center gap-3 p-4"><span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-700"><Rocket className="h-4 w-4"/></span><span className="min-w-0 flex-1"><b className="block truncate text-xs">{r.name}</b><span className="text-[10px] text-slate-400">{shortDate(r.targetDate)}</span></span><StatusBadge value={r.status}/></div>)}{!(d?.releases??[]).length&&<Empty title="No releases"/>}</div></Card>
      </div>
    </div>
  </>;
}

function RoadTask({task,onUpdate,editable,conflict}:{task:PMTask;onUpdate:(body:Record<string,unknown>)=>Promise<void>;editable:boolean;conflict:boolean}){
  const complete=task.status==="Done"?100:task.percentComplete;
  return <div className={`grid gap-3 px-4 py-3 md:grid-cols-[1fr_150px_150px_180px] md:items-center ${conflict?"bg-rose-50/50":""}`}><div><div className="flex items-center gap-2"><span className={`grid h-8 w-8 place-items-center rounded-lg ${conflict?"bg-rose-100 text-rose-700":"bg-blue-50 text-blue-700"}`}><CalendarRange className="h-4 w-4"/></span><span><b className="block text-xs">{task.key} · {task.title}</b><span className="text-[10px] text-slate-400">{task.type} · {task.storyPoints} pts · {(task.dependencies??[]).length} dependencies{conflict?" · scheduling conflict":""}</span></span></div><div className="mt-2"><Progress value={complete}/></div></div><input disabled={!editable} type="date" className={`${inputClass} h-9 disabled:bg-slate-50`} value={task.startDate?.slice(0,10)??""} onChange={e=>void onUpdate({startDate:e.target.value||null})}/><input disabled={!editable} type="date" className={`${inputClass} h-9 disabled:bg-slate-50`} value={task.dueDate?.slice(0,10)??""} onChange={e=>void onUpdate({dueDate:e.target.value||null})}/><div className="flex items-center justify-between gap-2"><StatusBadge value={task.status}/><span className="text-[10px] font-black text-slate-400">{complete}%</span></div></div>;
}

function isoDate(date:Date){return date.toISOString().slice(0,10)}
