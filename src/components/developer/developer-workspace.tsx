"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useAcceptDevTaskMutation,
  useAddDevTaskAttachmentsMutation,
  useCreateDevProjectMutation,
  useCreateDevSprintMutation,
  useCreateDevTaskMutation,
  useDeleteDevTaskMutation,
  useGetDevLeaderboardQuery,
  useGetDevMessagesQuery,
  useGetDevNotificationsQuery,
  useGetDevProjectsQuery,
  useGetDevReportQuery,
  useGetDevSprintsQuery,
  useGetDevTasksQuery,
  useMarkDevNotificationReadMutation,
  useRejectDevTaskMutation,
  useRemoveDevTaskAttachmentMutation,
  useSendDevMessageMutation,
  useSubmitDevTaskMutation,
  useUpdateDevProjectMutation,
  useUpdateDevSprintMutation,
  useUpdateDevTaskMutation,
} from "@/src/lib/features/developer/developer-api";
import type {
  DevPriority,
  DevProject,
  DevStatus,
  DevTask,
  DevUser,
} from "@/src/lib/features/developer/developer-types";
import { useGetUsersQuery } from "@/src/lib/features/users/user-api";

const statuses: DevStatus[] = ["Backlog", "To Do", "In Progress", "In Review", "Done", "Rejected"];
const priorities: DevPriority[] = ["Low", "Medium", "High", "Urgent", "Critical"];
const taskTypes = ["Epic", "Story", "Task", "Bug", "Subtask"] as const;
const input = "w-full rounded-xl border border-white/10 bg-[#030712] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-300/40";
const panel = "rounded-2xl border border-white/10 bg-[#07101f]/85 p-5";

export function DeveloperWorkspace() {
  const projects = useGetDevProjectsQuery();
  const users = useGetUsersQuery({ page: 1, limit: 100 });
  const [projectId, setProjectId] = useState("");
  const [tab, setTab] = useState("board");
  const [search, setSearch] = useState("");
  const active = projectId || projects.data?.data[0]?._id || "";
  const activeProject = projects.data?.data.find((p) => p._id === active);

  const tasks = useGetDevTasksQuery(
    { page: 1, limit: 200, ...(active ? { projectId: active } : {}), ...(search.trim() ? { search: search.trim() } : {}) },
    { skip: !active },
  );
  const sprints = useGetDevSprintsQuery(active, { skip: !active });
  const [chatTask, setChatTask] = useState("");
  const messages = useGetDevMessagesQuery(
    { projectId: active, ...(chatTask ? { taskId: chatTask } : {}) },
    { skip: !active || tab !== "chat" },
  );
  const leaderboard = useGetDevLeaderboardQuery(active || undefined, { skip: tab !== "leaderboard" });
  const report = useGetDevReportQuery(active || undefined, { skip: tab !== "reports" });
  const notifications = useGetDevNotificationsQuery();

  const [createProject] = useCreateDevProjectMutation();
  const [updateProject] = useUpdateDevProjectMutation();
  const [createTask] = useCreateDevTaskMutation();
  const [updateTask] = useUpdateDevTaskMutation();
  const [deleteTask] = useDeleteDevTaskMutation();
  const [addTaskAttachments] = useAddDevTaskAttachmentsMutation();
  const [removeTaskAttachment] = useRemoveDevTaskAttachmentMutation();
  const [submitTask] = useSubmitDevTaskMutation();
  const [acceptTask] = useAcceptDevTaskMutation();
  const [rejectTask] = useRejectDevTaskMutation();
  const [createSprint] = useCreateDevSprintMutation();
  const [updateSprint] = useUpdateDevSprintMutation();
  const [sendMessage] = useSendDevMessageMutation();
  const [markNotificationRead] = useMarkDevNotificationReadMutation();

  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [projectForm, setProjectForm] = useState({ key: "", name: "", description: "", lead: "", members: [] as string[] });
  const [projectEdit, setProjectEdit] = useState({ name: "", description: "", lead: "", members: [] as string[] });
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    type: "Task",
    priority: "Medium" as DevPriority,
    assignee: "",
    sprintId: "",
    storyPoints: "0",
    dueDate: "",
    labels: "",
  });
  const [sprintForm, setSprintForm] = useState({ name: "", goal: "", startDate: "", endDate: "" });
  const [chat, setChat] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const rows = tasks.data?.data ?? [];
  const allUsers = users.data?.data ?? [];
  const taskById = useMemo(() => new Map(rows.map((t) => [t._id, t])), [rows]);

  useEffect(() => {
    if (!activeProject) return;
    setProjectEdit({
      name: activeProject.name,
      description: activeProject.description ?? "",
      lead: idOf(activeProject.lead),
      members: activeProject.members.map(idOf).filter(Boolean),
    });
  }, [activeProject]);

  async function run(fn: () => Promise<unknown>, ok: string) {
    setError("");
    setNotice("");
    try {
      await fn();
      setNotice(ok);
    } catch (e) {
      setError(getApiErrorMessage(e));
    }
  }

  async function addProject(e: FormEvent) {
    e.preventDefault();
    await run(async () => {
      const result = await createProject({
        key: projectForm.key.toUpperCase(),
        name: projectForm.name,
        description: projectForm.description || undefined,
        lead: projectForm.lead || undefined,
        members: projectForm.members,
      }).unwrap();
      setProjectId(result.data._id);
      setProjectForm({ key: "", name: "", description: "", lead: "", members: [] });
    }, "Project created.");
  }

  async function saveProject(e: FormEvent) {
    e.preventDefault();
    if (!active) return;
    await run(
      () => updateProject({ id: active, body: { name: projectEdit.name, description: projectEdit.description, lead: projectEdit.lead || undefined, members: projectEdit.members } }).unwrap(),
      "Project updated.",
    );
  }

  async function addTask(e: FormEvent) {
    e.preventDefault();
    if (!active) return;
    await run(async () => {
      await createTask({
        projectId: active,
        title: taskForm.title,
        description: taskForm.description || undefined,
        type: taskForm.type,
        priority: taskForm.priority,
        assignee: taskForm.assignee || undefined,
        sprintId: taskForm.sprintId || undefined,
        storyPoints: Number(taskForm.storyPoints || 0),
        labels: taskForm.labels.split(",").map((x) => x.trim()).filter(Boolean),
        ...(taskForm.dueDate ? { dueDate: new Date(taskForm.dueDate).toISOString() } : {}),
      }).unwrap();
      setTaskForm({ title: "", description: "", type: "Task", priority: "Medium", assignee: "", sprintId: "", storyPoints: "0", dueDate: "", labels: "" });
    }, "Task created.");
  }

  async function addSprint(e: FormEvent) {
    e.preventDefault();
    if (!active) return;
    await run(async () => {
      await createSprint({
        projectId: active,
        name: sprintForm.name,
        goal: sprintForm.goal || undefined,
        ...(sprintForm.startDate ? { startDate: new Date(sprintForm.startDate).toISOString() } : {}),
        ...(sprintForm.endDate ? { endDate: new Date(sprintForm.endDate).toISOString() } : {}),
      }).unwrap();
      setSprintForm({ name: "", goal: "", startDate: "", endDate: "" });
    }, "Sprint created.");
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!active || (!chat.trim() && !files.length)) return;
    await run(async () => {
      await sendMessage({ projectId: active, taskId: chatTask || undefined, text: chat.trim() || undefined, attachments: files }).unwrap();
      setChat("");
      setFiles([]);
    }, "Message sent.");
  }

  function updateOne(task: DevTask, body: Record<string, unknown>) {
    return run(() => updateTask({ id: task._id, body }).unwrap(), `${task.key} updated.`);
  }

  function removeOne(task: DevTask) {
    if (!window.confirm(`Delete ${task.key} permanently?`)) return;
    void run(() => deleteTask(task._id).unwrap(), `${task.key} deleted.`);
  }

  function attachToTask(task: DevTask, selected: File[]) {
    if (!selected.length) return;
    void run(() => addTaskAttachments({ id: task._id, attachments: selected }).unwrap(), `${selected.length} attachment(s) added to ${task.key}.`);
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-300">Isolated developer system</p>
          <h1 className="mt-2 text-3xl font-black">Developer work management</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Projects, backlog, sprints, work-item lifecycle, task files, acceptance points, notifications, chat, KPI reports and leaderboard. Developer work uses notifications instead of email.</p>
        </div>
        <select value={active} onChange={(e) => { setProjectId(e.target.value); setChatTask(""); }} className={`${input} max-w-sm`}>
          <option value="">Choose project</option>
          {projects.data?.data.map((p) => <option key={p._id} value={p._id}>{p.key} · {p.name}</option>)}
        </select>
      </div>

      {error ? <div className="rounded-xl border border-rose-300/20 bg-rose-300/5 p-3 text-sm text-rose-200">{error}</div> : null}
      {notice ? <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/5 p-3 text-sm text-emerald-200">{notice}</div> : null}

      <div className="flex flex-wrap gap-2">
        {["board", "backlog", "sprints", "chat", "reports", "leaderboard", "notifications", "setup"].map((x) => (
          <button key={x} onClick={() => setTab(x)} className={`rounded-xl px-4 py-2 text-sm font-bold capitalize ${tab === x ? "bg-cyan-300 text-slate-950" : "border border-white/10 text-slate-300"}`}>{x}</button>
        ))}
      </div>

      {tab === "setup" ? (
        <div className="grid gap-6 xl:grid-cols-2">
          <form onSubmit={addProject} className={panel}>
            <h2 className="text-xl font-black">Create project</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input required value={projectForm.key} onChange={(e) => setProjectForm({ ...projectForm, key: e.target.value })} className={input} placeholder="KEY" />
              <input required value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} className={input} placeholder="Project name" />
              <select value={projectForm.lead} onChange={(e) => setProjectForm({ ...projectForm, lead: e.target.value })} className={input}>
                <option value="">Current user as lead</option>
                {allUsers.map((u) => <option key={userId(u)} value={userId(u)}>{u.email}</option>)}
              </select>
              <MemberPicker users={allUsers} selected={projectForm.members} onChange={(members) => setProjectForm({ ...projectForm, members })} />
              <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className={`${input} md:col-span-2`} placeholder="Description" />
              <button className="rounded-xl bg-cyan-300 px-4 py-3 font-black text-slate-950">Create project</button>
            </div>
          </form>

          <form onSubmit={saveProject} className={panel}>
            <h2 className="text-xl font-black">Manage active project</h2>
            <p className="mt-1 text-xs text-slate-500">Project lead/creator permissions are enforced by the API.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input required disabled={!active} value={projectEdit.name} onChange={(e) => setProjectEdit({ ...projectEdit, name: e.target.value })} className={input} placeholder="Project name" />
              <select disabled={!active} value={projectEdit.lead} onChange={(e) => setProjectEdit({ ...projectEdit, lead: e.target.value })} className={input}>
                <option value="">Choose lead</option>
                {allUsers.map((u) => <option key={userId(u)} value={userId(u)}>{u.email}</option>)}
              </select>
              <div className="md:col-span-2"><MemberPicker users={allUsers} selected={projectEdit.members} onChange={(members) => setProjectEdit({ ...projectEdit, members })} /></div>
              <textarea disabled={!active} value={projectEdit.description} onChange={(e) => setProjectEdit({ ...projectEdit, description: e.target.value })} className={`${input} md:col-span-2`} placeholder="Description" />
              <button disabled={!active} className="rounded-xl border border-cyan-300/30 px-4 py-3 font-black text-cyan-200 disabled:opacity-40">Save project</button>
            </div>
          </form>

          <form onSubmit={addTask} className={`${panel} xl:col-span-2`}>
            <h2 className="text-xl font-black">Create work item</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <input required value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} className={`${input} xl:col-span-2`} placeholder="Task title" />
              <select value={taskForm.type} onChange={(e) => setTaskForm({ ...taskForm, type: e.target.value })} className={input}>{taskTypes.map((x) => <option key={x}>{x}</option>)}</select>
              <select value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as DevPriority })} className={input}>{priorities.map((x) => <option key={x}>{x}</option>)}</select>
              <select value={taskForm.assignee} onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })} className={input}><option value="">Unassigned</option>{allUsers.map((u) => <option key={userId(u)} value={userId(u)}>{u.email}</option>)}</select>
              <select value={taskForm.sprintId} onChange={(e) => setTaskForm({ ...taskForm, sprintId: e.target.value })} className={input}><option value="">Backlog / no sprint</option>{sprints.data?.data.map((sp) => <option key={sp._id} value={sp._id}>{sp.name}</option>)}</select>
              <input type="number" min="0" max="100" value={taskForm.storyPoints} onChange={(e) => setTaskForm({ ...taskForm, storyPoints: e.target.value })} className={input} placeholder="Story points" />
              <input type="date" value={taskForm.dueDate} onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })} className={input} />
              <input value={taskForm.labels} onChange={(e) => setTaskForm({ ...taskForm, labels: e.target.value })} className={`${input} xl:col-span-2`} placeholder="Labels, comma separated" />
              <textarea value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} className={`${input} md:col-span-2 xl:col-span-4`} placeholder="Description" />
              <button disabled={!active} className="rounded-xl bg-cyan-300 px-4 py-3 font-black text-slate-950 disabled:opacity-40">Create task</button>
            </div>
          </form>
        </div>
      ) : null}

      {tab === "board" || tab === "backlog" ? (
        <div className="space-y-4">
          <input value={search} onChange={(e) => setSearch(e.target.value)} className={`${input} max-w-lg`} placeholder="Search key, title, description or label" />
          {tab === "board" ? (
            <div className="grid gap-4 xl:grid-cols-6">
              {statuses.map((status) => (
                <div key={status} className={`${panel} min-h-52 p-3`}>
                  <div className="mb-3 flex items-center justify-between"><h3 className="text-xs font-black uppercase tracking-wider text-slate-400">{status}</h3><span className="text-xs text-slate-600">{rows.filter((t) => t.status === status).length}</span></div>
                  <div className="space-y-3">
                    {rows.filter((t) => t.status === status).map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        users={allUsers}
                        sprints={sprints.data?.data ?? []}
                        onUpdate={(body) => void updateOne(task, body)}
                        onSubmit={() => void run(() => submitTask(task._id).unwrap(), `${task.key} submitted for review.`)}
                        onAccept={() => void run(() => acceptTask(task._id).unwrap(), `${task.key} accepted and points awarded.`)}
                        onReject={() => { const reason = window.prompt("Reason for rejection"); if (reason) void run(() => rejectTask({ id: task._id, reason }).unwrap(), `${task.key} rejected.`); }}
                        onDelete={() => removeOne(task)}
                        onAttach={(selected) => attachToTask(task, selected)}
                        onRemoveAttachment={(storageKey) => void run(() => removeTaskAttachment({ id: task._id, storageKey }).unwrap(), `Attachment removed from ${task.key}.`)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {rows.filter((t) => !t.sprintId || t.status === "Backlog").map((task) => (
                <TaskRow key={task._id} task={task} sprints={sprints.data?.data ?? []} onUpdate={(body) => void updateOne(task, body)} onDelete={() => removeOne(task)} />
              ))}
            </div>
          )}
        </div>
      ) : null}

      {tab === "sprints" ? (
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <form onSubmit={addSprint} className={panel}>
            <h2 className="text-xl font-black">New sprint</h2>
            <div className="mt-4 space-y-3">
              <input required value={sprintForm.name} onChange={(e) => setSprintForm({ ...sprintForm, name: e.target.value })} className={input} placeholder="Sprint name" />
              <textarea value={sprintForm.goal} onChange={(e) => setSprintForm({ ...sprintForm, goal: e.target.value })} className={input} placeholder="Sprint goal" />
              <input type="date" value={sprintForm.startDate} onChange={(e) => setSprintForm({ ...sprintForm, startDate: e.target.value })} className={input} />
              <input type="date" value={sprintForm.endDate} onChange={(e) => setSprintForm({ ...sprintForm, endDate: e.target.value })} className={input} />
              <button disabled={!active} className="rounded-xl bg-cyan-300 px-4 py-3 font-black text-slate-950 disabled:opacity-40">Create sprint</button>
            </div>
          </form>
          <div className="space-y-3">
            {sprints.data?.data.map((sp) => {
              const sprintTasks = rows.filter((t) => t.sprintId === sp._id);
              return <div key={sp._id} className={panel}><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-black">{sp.name}</h3><p className="mt-1 text-sm text-slate-500">{sp.goal || "No goal"} · {sprintTasks.length} task(s)</p></div><select value={sp.status} onChange={(e) => void run(() => updateSprint({ id: sp._id, body: { status: e.target.value } }).unwrap(), "Sprint status updated.")} className={`${input} max-w-44`}><option>planned</option><option>active</option><option>completed</option></select></div></div>;
            })}
          </div>
        </div>
      ) : null}

      {tab === "chat" ? (
        <div className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-black">Project chat</h2><p className="mt-1 text-xs text-slate-500">Share messages, links and common documents/media. Optionally scope the conversation to a task.</p></div><select value={chatTask} onChange={(e) => setChatTask(e.target.value)} className={`${input} max-w-sm`}><option value="">All project messages</option>{rows.map((t) => <option key={t._id} value={t._id}>{t.key} · {t.title}</option>)}</select></div>
          <div className="mt-4 max-h-[520px] space-y-3 overflow-y-auto">
            {messages.data?.data.map((m) => {
              const linked = m.taskId ? taskById.get(String(m.taskId)) : undefined;
              return <div key={m._id} className="rounded-xl border border-white/8 bg-black/20 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-bold text-cyan-300">{person(m.senderId)}</p>{linked ? <span className="text-[10px] font-bold text-slate-500">{linked.key}</span> : null}</div>{m.text ? <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{m.text}</p> : null}<div className="mt-2 flex flex-wrap gap-2">{m.attachments?.map((a, i) => <a key={`${a.storageKey}-${i}`} href={a.url} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 px-3 py-2 text-xs text-cyan-200">{a.originalName}</a>)}</div></div>;
            })}
          </div>
          <form onSubmit={send} className="mt-4 grid gap-3"><textarea value={chat} onChange={(e) => setChat(e.target.value)} className={input} placeholder="Message, links, task discussion…" /><input multiple type="file" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} className={input} /><p className="text-xs text-slate-500">Up to 10 files, 100 MB each. Images, PDF, Office files, text/data, audio, video and archives are supported.</p><button className="w-fit rounded-xl bg-cyan-300 px-5 py-3 font-black text-slate-950">Send message / files</button></form>
        </div>
      ) : null}

      {tab === "reports" ? (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-4">{[["Total tasks", report.data?.data.total], ["Done", report.data?.data.done], ["Completion %", report.data?.data.completionRate], ["Points", report.data?.data.totalPoints]].map(([label, value]) => <div key={String(label)} className={panel}><p className="text-xs uppercase text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value ?? 0}</p></div>)}</div>
          <div className="grid gap-6 xl:grid-cols-2"><div className={panel}><h3 className="font-black">Status KPI</h3>{report.data?.data.byStatus.map((x) => <Bar key={x._id} label={x._id} value={x.count} max={report.data?.data.total || 1} />)}</div><div className={panel}><h3 className="font-black">User performance</h3><div className="mt-3 space-y-2">{report.data?.data.byAssignee.map((x) => <div key={x.userId} className="rounded-xl border border-white/8 p-3 text-sm"><b>{x.email || x.userId}</b><p className="mt-1 text-slate-500">{x.done}/{x.count} done · {Math.round(x.averageCompletion || 0)}% avg progress · {x.points} points</p></div>)}</div></div></div>
        </div>
      ) : null}

      {tab === "leaderboard" ? (
        <div className={panel}><h2 className="text-xl font-black">Points leaderboard</h2><div className="mt-4 space-y-2">{leaderboard.data?.data.map((x, i) => <div key={x.userId} className="grid grid-cols-[50px_1fr_auto_auto] items-center gap-3 rounded-xl border border-white/8 p-4"><span className="text-xl font-black text-cyan-300">#{i + 1}</span><div><p className="font-bold">{x.email || x.userId}</p><p className="text-xs text-slate-500">{x.completed} accepted tasks</p></div><b>{x.points} pts</b><span className="text-xs text-slate-500">avg SP {Number(x.avgStoryPoints || 0).toFixed(1)}</span></div>)}</div></div>
      ) : null}

      {tab === "notifications" ? (
        <div className={panel}><div className="flex items-center justify-between"><h2 className="text-xl font-black">Developer notifications</h2><span className="text-xs text-slate-500">{notifications.data?.data.filter((n) => !n.readAt).length ?? 0} unread</span></div><div className="mt-4 space-y-2">{notifications.data?.data.map((n) => <button key={n._id} onClick={() => !n.readAt && void run(() => markNotificationRead(n._id).unwrap(), "Notification marked as read.")} className={`w-full rounded-xl border p-4 text-left ${n.readAt ? "border-white/8 opacity-60" : "border-cyan-300/20 bg-cyan-300/5"}`}><div className="flex items-center justify-between gap-3"><p className="font-bold">{n.title}</p><span className="text-[10px] uppercase text-slate-500">{n.readAt ? "read" : "mark read"}</span></div><p className="mt-1 text-sm text-slate-400">{n.message}</p></button>)}</div></div>
      ) : null}
    </section>
  );
}

function TaskCard({ task, users, sprints, onUpdate, onSubmit, onAccept, onReject, onDelete, onAttach, onRemoveAttachment }: {
  task: DevTask;
  users: Array<{ _id: string; id?: string; email: string }>;
  sprints: Array<{ _id: string; name: string }>;
  onUpdate: (body: Record<string, unknown>) => void;
  onSubmit: () => void;
  onAccept: () => void;
  onReject: () => void;
  onDelete: () => void;
  onAttach: (files: File[]) => void;
  onRemoveAttachment: (storageKey: string) => void;
}) {
  return <div className="rounded-xl border border-white/10 bg-black/20 p-3"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-black text-cyan-300">{task.key}</span><span className="text-[10px] text-slate-500">{task.type} · {task.priority}</span></div><p className="mt-2 text-sm font-bold">{task.title}</p>{task.description ? <p className="mt-1 line-clamp-3 text-xs text-slate-500">{task.description}</p> : null}<p className="mt-2 text-xs text-slate-500">{task.percentComplete}% · {task.rewardPoints} possible pts · {task.earnedPoints} earned</p><input type="range" min="0" max="100" value={task.percentComplete} onChange={(e) => onUpdate({ percentComplete: Number(e.target.value) })} className="mt-2 w-full" /><select value={task.status} onChange={(e) => onUpdate({ status: e.target.value })} className={`${input} mt-2 text-xs`}>{statuses.map((x) => <option key={x}>{x}</option>)}</select><select value={idOf(task.assignee)} onChange={(e) => onUpdate({ assignee: e.target.value || null })} className={`${input} mt-2 text-xs`}><option value="">Unassigned</option>{users.map((u) => <option key={userId(u)} value={userId(u)}>{u.email}</option>)}</select><select value={task.sprintId ?? ""} onChange={(e) => onUpdate({ sprintId: e.target.value || null })} className={`${input} mt-2 text-xs`}><option value="">Backlog / no sprint</option>{sprints.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}</select>{task.attachments?.length ? <div className="mt-2 space-y-1">{task.attachments.map((a) => <div key={a.storageKey} className="flex items-center gap-1"><a href={a.url} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-[10px] text-cyan-200">{a.originalName}</a><button type="button" onClick={() => onRemoveAttachment(a.storageKey)} className="text-[10px] text-rose-300">×</button></div>)}</div> : null}<label className="mt-2 block cursor-pointer rounded-lg border border-dashed border-white/10 px-2 py-1 text-center text-[10px] text-slate-400">Attach files<input multiple type="file" className="hidden" onChange={(e) => { onAttach(Array.from(e.target.files ?? [])); e.currentTarget.value = ""; }} /></label><div className="mt-2 flex flex-wrap gap-1"><button onClick={onSubmit} className="rounded-lg border border-white/10 px-2 py-1 text-[10px]">Submit</button>{task.status === "In Review" ? <><button onClick={onAccept} className="rounded-lg border border-emerald-300/20 px-2 py-1 text-[10px] text-emerald-200">Accept</button><button onClick={onReject} className="rounded-lg border border-rose-300/20 px-2 py-1 text-[10px] text-rose-200">Reject</button></> : null}<button onClick={onDelete} className="ml-auto rounded-lg border border-rose-300/20 px-2 py-1 text-[10px] text-rose-200">Delete</button></div></div>;
}

function TaskRow({ task, sprints, onUpdate, onDelete }: { task: DevTask; sprints: Array<{ _id: string; name: string }>; onUpdate: (body: Record<string, unknown>) => void; onDelete: () => void }) {
  return <div className={`${panel} grid gap-3 lg:grid-cols-[120px_1fr_150px_150px_180px_90px_70px] lg:items-center`}><b className="text-cyan-300">{task.key}</b><div><p className="font-bold">{task.title}</p><p className="text-xs text-slate-500">{task.type} · {task.storyPoints} story points</p></div><select value={task.status} onChange={(e) => onUpdate({ status: e.target.value })} className={input}>{statuses.map((x) => <option key={x}>{x}</option>)}</select><select value={task.priority} onChange={(e) => onUpdate({ priority: e.target.value })} className={input}>{priorities.map((x) => <option key={x}>{x}</option>)}</select><select value={task.sprintId ?? ""} onChange={(e) => onUpdate({ sprintId: e.target.value || null })} className={input}><option value="">No sprint</option>{sprints.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}</select><b>{task.rewardPoints} pts</b><button onClick={onDelete} className="text-xs text-rose-300">Delete</button></div>;
}

function MemberPicker({ users, selected, onChange }: { users: Array<{ _id: string; id?: string; email: string }>; selected: string[]; onChange: (ids: string[]) => void }) {
  return <select multiple value={selected} onChange={(e) => onChange(Array.from(e.currentTarget.selectedOptions).map((o) => o.value))} className={`${input} min-h-28`} aria-label="Project members">{users.map((u) => <option key={userId(u)} value={userId(u)}>{u.email}</option>)}</select>;
}

function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  return <div className="mt-4"><div className="mb-1 flex justify-between text-xs"><span>{label}</span><b>{value}</b></div><div className="h-2 rounded bg-white/5"><div className="h-2 rounded bg-cyan-300" style={{ width: `${Math.max(2, Math.min(100, value / max * 100))}%` }} /></div></div>;
}

function person(value: string | DevUser) { return typeof value === "string" ? value : value.email || value.id || value._id || "User"; }
function idOf(value: string | DevUser | undefined) { return !value ? "" : typeof value === "string" ? value : value.id ?? value._id ?? ""; }
function userId(value: { _id: string; id?: string }) { return value.id ?? value._id; }
