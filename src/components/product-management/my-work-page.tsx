"use client";

import { useEffect, useMemo, useState } from "react";
import { AlarmClock, CheckCircle2, Clock3, Inbox, Search, Send, ShieldCheck, Target } from "lucide-react";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useCreatePMSavedViewMutation, useGetPMMyWorkQuery, useGetPMProjectsQuery, useGetPMSavedViewsQuery, useGetPMSprintsQuery } from "@/src/lib/features/product-management/product-management-api";
import type { PMTask } from "@/src/lib/features/product-management/product-management-types";
import { Card, Empty, PageHeader, Pagination, PriorityBadge, StatusBadge, inputClass, shortDate } from "./pm-ui";
import { WorkItemDrawer } from "./work-item-drawer";

export function PMMyWorkPage(){
  const [search,setSearch]=useState("");
  const [debounced,setDebounced]=useState("");
  const [projectId,setProject]=useState("");
  const [status,setStatus]=useState("");
  const [priority,setPriority]=useState("");
  const [type,setType]=useState("");
  const [sprintId,setSprint]=useState("");
  const [due,setDue]=useState("");
  const [page,setPage]=useState(1);
  const [task,setTask]=useState<PMTask|undefined>();

  useEffect(()=>{const id=setTimeout(()=>{setDebounced(search.trim());setPage(1)},220);return()=>clearTimeout(id)},[search]);
  useEffect(()=>{setSprint("");setPage(1)},[projectId]);

  const q=useGetPMMyWorkQuery({search:debounced||undefined,projectId:projectId||undefined,status:status||undefined,priority:priority||undefined,type:type||undefined,sprintId:sprintId||undefined,due:due||undefined,page,limit:50});
  const projectsQ=useGetPMProjectsQuery({limit:100});
  const sprintsQ=useGetPMSprintsQuery(projectId,{skip:!projectId});
  const savedQ=useGetPMSavedViewsQuery({scope:"my-work"});
  const [saveView]=useCreatePMSavedViewMutation();
  const rows=q.data?.data??[],pg=q.data?.pagination;
  const now=new Date(),today=now.toISOString().slice(0,10);

  const sections=useMemo(()=>[
    {title:"Assigned to me",icon:Inbox,tone:"indigo",rows},
    {title:"Due today",icon:Clock3,tone:"amber",rows:rows.filter(t=>t.dueDate?.slice(0,10)===today&&t.status!=="Done")},
    {title:"Upcoming",icon:Clock3,tone:"teal",rows:rows.filter(t=>t.dueDate&&new Date(t.dueDate)>now&&t.dueDate.slice(0,10)!==today&&t.status!=="Done")},
    {title:"Overdue",icon:AlarmClock,tone:"rose",rows:rows.filter(t=>t.dueDate&&new Date(t.dueDate)<now&&t.status!=="Done")},
    {title:"In progress",icon:Target,tone:"blue",rows:rows.filter(t=>/progress/i.test(t.status))},
    {title:"Waiting for review",icon:ShieldCheck,tone:"violet",rows:rows.filter(t=>/review|qa/i.test(t.status))},
    {title:"Submitted",icon:Send,tone:"sky",rows:rows.filter(t=>!!t.submittedAt&&!t.acceptedAt)},
    {title:"Recently completed",icon:CheckCircle2,tone:"emerald",rows:rows.filter(t=>t.status==="Done").sort((a,b)=>new Date(b.updatedAt).valueOf()-new Date(a.updatedAt).valueOf()).slice(0,20)},
  ],[rows,today]);

  const filters={search,projectId,status,priority,type,sprintId,due};
  async function save(){const name=prompt("Saved My Work view name");if(!name)return;try{await saveView({scope:"my-work",name,filters,columns:["key","title","status","priority","project","sprint","due"],shared:false}).unwrap();toast.success("View saved")}catch(e){toast.error(getApiErrorMessage(e))}}
  function apply(v:Record<string,unknown>){setSearch(String(v.search??""));setProject(String(v.projectId??""));setStatus(String(v.status??""));setPriority(String(v.priority??""));setType(String(v.type??""));setSprint(String(v.sprintId??""));setDue(String(v.due??""));setPage(1)}

  return <>
    <PageHeader title="My Work" description="Your assigned work only—organized by urgency and review state with server-side project, status, type, priority, sprint and due-date filters. Organizational performance stays on its own permission-gated page."/>
    <Card className="mb-5 p-4">
      <div className="grid gap-3 xl:grid-cols-[1fr_repeat(6,145px)]">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input className={`${inputClass} pl-9`} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search my assigned work"/></div>
        <select className={inputClass} value={projectId} onChange={e=>setProject(e.target.value)}><option value="">All projects</option>{(projectsQ.data?.data??[]).map(p=><option key={p._id} value={p._id}>{p.key} · {p.name}</option>)}</select>
        <select className={inputClass} value={sprintId} disabled={!projectId} onChange={e=>{setSprint(e.target.value);setPage(1)}}><option value="">{projectId?"All sprints":"Choose project first"}</option>{(sprintsQ.data?.data??[]).map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select>
        <select className={inputClass} value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}}><option value="">All statuses</option>{["Backlog","To Do","In Progress","In Review","QA","Blocked","Ready for Release","Done"].map(v=><option key={v}>{v}</option>)}</select>
        <select className={inputClass} value={type} onChange={e=>{setType(e.target.value);setPage(1)}}><option value="">All types</option>{["Epic","Story","Task","Bug","Subtask"].map(v=><option key={v}>{v}</option>)}</select>
        <select className={inputClass} value={priority} onChange={e=>{setPriority(e.target.value);setPage(1)}}><option value="">All priorities</option>{["Low","Medium","High","Urgent","Critical"].map(v=><option key={v}>{v}</option>)}</select>
        <select className={inputClass} value={due} onChange={e=>{setDue(e.target.value);setPage(1)}}><option value="">Any due date</option><option value="today">Due today</option><option value="upcoming">Upcoming</option><option value="overdue">Overdue</option><option value="none">No due date</option></select>
      </div>
      <div className="mt-3 flex flex-wrap gap-2"><button className="text-xs font-black text-blue-600" onClick={()=>void save()}>Save view</button>{(savedQ.data?.data??[]).map(v=><button key={v._id} className="rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700" onClick={()=>apply(v.filters)}>{v.name}</button>)}</div>
    </Card>
    <div className="grid gap-5 xl:grid-cols-2">{sections.filter(s=>s.rows.length).map(s=><WorkSection key={s.title} section={s} onOpen={setTask}/>)}</div>
    {!rows.length&&<Card><Empty title="No assigned work matches the filters"/></Card>}
    {pg&&<Card className="mt-5"><Pagination page={pg.page} totalPages={pg.totalPages} onPage={setPage}/></Card>}
    {task&&<WorkItemDrawer projectId={String(task.projectId)} taskId={task._id} onClose={()=>setTask(undefined)}/>} 
  </>;
}

function WorkSection({section,onOpen}:{section:{title:string;icon:typeof Target;tone:string;rows:PMTask[]};onOpen:(t:PMTask)=>void}){
  const Icon=section.icon;
  const tone:Record<string,string>={indigo:"bg-indigo-50 text-indigo-700",rose:"bg-rose-50 text-rose-700",amber:"bg-amber-50 text-amber-700",blue:"bg-blue-50 text-blue-700",violet:"bg-violet-50 text-violet-700",sky:"bg-sky-50 text-sky-700",emerald:"bg-emerald-50 text-emerald-700",teal:"bg-teal-50 text-teal-700"};
  return <Card><div className="flex items-center justify-between border-b border-slate-100 p-4"><div className="flex items-center gap-2"><span className={`grid h-8 w-8 place-items-center rounded-lg ${tone[section.tone]}`}><Icon className="h-4 w-4"/></span><h2 className="font-black">{section.title}</h2></div><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black text-slate-500">{section.rows.length}</span></div><div className="divide-y divide-slate-100">{section.rows.slice(0,12).map(t=><button key={t._id} onClick={()=>onOpen(t)} className="flex w-full items-center gap-3 p-4 text-left hover:bg-slate-50"><span className="min-w-0 flex-1"><b className="block truncate text-xs">{t.key} · {t.title}</b><span className="mt-1 block text-[10px] text-slate-400">{t.type} · due {shortDate(t.dueDate)}</span></span><PriorityBadge value={t.priority}/><StatusBadge value={t.status}/></button>)}</div></Card>;
}
