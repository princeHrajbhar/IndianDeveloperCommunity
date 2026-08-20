"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Plus, Search } from "lucide-react";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
import { useGetPMProjectQuery, useGetPMTasksQuery, useTransitionPMTaskMutation } from "@/src/lib/features/product-management/product-management-api";
import type { PMTask, PMUser } from "@/src/lib/features/product-management/product-management-types";
import { AsyncUserPicker, Empty, PageHeader, Pagination, PriorityBadge, StatusBadge, inputClass, primaryButton, shortDate, userLabel } from "./pm-ui";
import { WorkItemDrawer } from "./work-item-drawer";

export function PMBoardPage({projectId}:{projectId:string}){
  const me=useGetMeQuery().data?.data;const canManage=!!me&&(me.role==="super-admin"||me.role==="product-admin"||(me.permissions??[]).includes("product-management.work.manage"));
  const projectQ=useGetPMProjectQuery(projectId);
  const [search,setSearch]=useState("");
  const [assignee,setAssignee]=useState<PMUser|undefined>();
  const [type,setType]=useState("");
  const [priority,setPriority]=useState("");
  const [taskId,setTaskId]=useState("");
  const [newItem,setNewItem]=useState(false);
  const [drag,setDrag]=useState<{id:string;status:string;key:string}|null>(null);
  const [transition]=useTransitionPMTaskMutation();
  const statuses=projectQ.data?.data.workflow?.statuses??["Backlog","To Do","In Progress","In Review","QA","Blocked","Ready for Release","Done"];

  async function drop(status:string){
    if(!canManage||!drag||drag.status===status)return;
    try{await transition({id:drag.id,status}).unwrap();toast.success(`${drag.key} → ${status}`)}catch(e){toast.error(getApiErrorMessage(e))}
    setDrag(null);
  }

  return <>
    <PageHeader eyebrow="Project / Execution" title="Work Board" description="Configurable project workflow columns with server-paged cards and server-validated drag-and-drop transitions." actions={canManage?<button className={primaryButton} onClick={()=>setNewItem(true)}><Plus className="h-4 w-4"/>Work item</button>:undefined}/>
    <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4"><div className="grid gap-3 lg:grid-cols-[1fr_220px_170px_170px]"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input className={`${inputClass} pl-9`} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Filter board by key, title or description"/></div><AsyncUserPicker projectId={projectId} value={assignee?._id} onChange={(_,u)=>setAssignee(u)} label="All assignees"/><select className={inputClass} value={type} onChange={e=>setType(e.target.value)}><option value="">All work types</option>{["Epic","Story","Task","Bug","Subtask"].map(v=><option key={v}>{v}</option>)}</select><select className={inputClass} value={priority} onChange={e=>setPriority(e.target.value)}><option value="">All priorities</option>{["Low","Medium","High","Urgent","Critical"].map(v=><option key={v}>{v}</option>)}</select></div></div>
    <div className="overflow-x-auto pb-4"><div className="flex min-w-max gap-4">{statuses.map(status=><BoardColumn key={status} projectId={projectId} status={status} search={search} assignee={assignee?._id} type={type} priority={priority} onOpen={setTaskId} canManage={canManage} onDrag={task=>setDrag({id:task._id,status:task.status,key:task.key})} onDrop={()=>void drop(status)}/>)}</div></div>
    <WorkItemDrawer projectId={projectId} taskId={taskId||undefined} newItem={newItem} onClose={()=>{setTaskId("");setNewItem(false)}}/>
  </>;
}

function BoardColumn({projectId,status,search,assignee,type,priority,onOpen,canManage,onDrag,onDrop}:{projectId:string;status:string;search:string;assignee?:string;type:string;priority:string;onOpen:(id:string)=>void;canManage:boolean;onDrag:(task:PMTask)=>void;onDrop:()=>void}){
  const [page,setPage]=useState(1);
  useEffect(()=>setPage(1),[search,assignee,type,priority,status]);
  const q=useGetPMTasksQuery({projectId,status,search:search||undefined,assignee:assignee||undefined,type:type||undefined,priority:priority||undefined,archived:false,page,limit:40,sort:"rank",order:"asc"});
  const items=q.data?.data??[],pg=q.data?.pagination;
  return <section onDragOver={e=>{if(canManage)e.preventDefault()}} onDrop={()=>{if(canManage)onDrop()}} className="w-[310px] shrink-0 rounded-2xl border border-slate-200 bg-slate-100/60"><div className="flex items-center justify-between px-4 py-3"><div className="flex items-center gap-2"><StatusBadge value={status}/><span className="text-[10px] font-black text-slate-400">{pg?.total??items.length}</span></div><b className="text-[10px] text-slate-400">{items.reduce((a,t)=>a+t.storyPoints,0)} pts shown</b></div><div className="space-y-2 p-2">{items.map(t=><BoardCard key={t._id} task={t} canManage={canManage} onOpen={()=>onOpen(t._id)} onDrag={()=>onDrag(t)}/>)}{!items.length&&<div className="rounded-xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-[11px] text-slate-400">{q.isLoading?"Loading…":"Drop work here"}</div>}</div>{pg&&pg.totalPages>1&&<div className="border-t border-slate-200 bg-white/70 px-2 py-2"><Pagination page={pg.page} totalPages={pg.totalPages} onPage={setPage}/></div>}</section>;
}

function BoardCard({task,canManage,onOpen,onDrag}:{task:PMTask;canManage:boolean;onOpen:()=>void;onDrag:()=>void}){const overdue=task.dueDate&&new Date(task.dueDate)<new Date()&&!['Done'].includes(task.status);return <article draggable={canManage} onDragStart={()=>{if(canManage)onDrag()}} onClick={onOpen} className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-blue-200 hover:shadow"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-black text-blue-600">{task.key}</span><PriorityBadge value={task.priority}/></div><h3 className="mt-2 line-clamp-2 text-sm font-black leading-5 text-slate-800">{task.title}</h3><div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-slate-400"><span>{task.type} · {task.storyPoints} pts</span><span className="max-w-28 truncate">{userLabel(task.assignee)}</span></div>{(overdue||task.blockedReason)&&<div className={`mt-2 flex items-center gap-1 text-[10px] font-black ${task.blockedReason?'text-rose-600':'text-amber-600'}`}><AlertTriangle className="h-3 w-3"/>{task.blockedReason?'Blocked':`Due ${shortDate(task.dueDate)}`}</div>}</article>}
