"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { KeyRound, Plus, Save, ShieldCheck, Trash2, Users } from "lucide-react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useGetRolesQuery,
  useUpdateRoleMutation,
} from "@/src/lib/features/access/role-api";
import type { AccessRole } from "@/src/lib/features/access/role-types";

const inputClass = "qf-input w-full rounded-xl px-4 py-3 text-sm transition";

export default function RolesPage() {
  const query = useGetRolesQuery();
  const roles = query.data?.data ?? [];
  const permissions = query.data?.permissions ?? [];
  const [selectedId, setSelectedId] = useState<string>("");
  const [creating, setCreating] = useState(false);
  const selected = roles.find((role) => (role.id ?? role._id) === selectedId);

  useEffect(() => {
    if (!creating && !selectedId && roles.length) setSelectedId(roles[0].id ?? roles[0]._id);
  }, [creating, roles, selectedId]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof permissions>();
    permissions.forEach((permission) => map.set(permission.module, [...(map.get(permission.module) ?? []), permission]));
    return [...map.entries()];
  }, [permissions]);

  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Access control</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Roles and permissions</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Review built-in access roles and create narrowly scoped custom roles using least-privilege permissions for each team.</p>
        </div>
        <button type="button" onClick={() => { setCreating(true); setSelectedId(""); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950"><Plus size={17} /> New role</button>
      </div>

      {query.error ? <Notice tone="error">{getApiErrorMessage(query.error)}</Notice> : null}
      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="self-start rounded-3xl border border-white/10 bg-white/[0.035] p-4 xl:sticky xl:top-4">
          <div className="mb-3 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-widest text-slate-500"><ShieldCheck size={15} /> Available roles</div>
          <div className="space-y-2">
            {query.isLoading ? <p className="p-4 text-sm text-slate-500">Loading roles…</p> : roles.map((role) => {
              const id = role.id ?? role._id;
              const active = !creating && id === selectedId;
              return <button key={id} type="button" onClick={() => { setCreating(false); setSelectedId(id); }} className={`w-full rounded-2xl border p-4 text-left transition ${active ? "border-cyan-300/30 bg-cyan-300/[0.08]" : "border-white/8 bg-black/20 hover:border-white/15"}`}>
                <div className="flex items-start justify-between gap-3"><div><p className="font-black text-slate-100">{role.name}</p><p className="mt-1 text-xs text-slate-600">{role.slug}</p></div>{role.isSystem ? <span className="rounded-full bg-blue-300/10 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-blue-200">System</span> : null}</div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span className="inline-flex items-center gap-1"><KeyRound size={13} /> {role.permissions.length} permissions</span><span className="inline-flex items-center gap-1"><Users size={13} /> {role.userCount}</span></div>
              </button>;
            })}
          </div>
        </aside>

        <RoleEditor
          key={creating ? "new" : selectedId}
          role={creating ? undefined : selected}
          groupedPermissions={grouped}
          onCreated={(role) => { setCreating(false); setSelectedId(role.id ?? role._id); }}
          onDeleted={() => { setSelectedId(""); setCreating(false); }}
        />
      </div>
    </section>
  );
}

function RoleEditor({ role, groupedPermissions, onCreated, onDeleted }: { role?: AccessRole; groupedPermissions: Array<[string, Array<{ key: string; label: string; module: string }>] >; onCreated: (role: AccessRole) => void; onDeleted: () => void }) {
  const [name, setName] = useState(role?.name ?? "");
  const [slug, setSlug] = useState(role?.slug ?? "");
  const [description, setDescription] = useState(role?.description ?? "");
  const [isAssignable, setIsAssignable] = useState(role?.isAssignable ?? true);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role?.permissions ?? []);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [createRole, createState] = useCreateRoleMutation();
  const [updateRole, updateState] = useUpdateRoleMutation();
  const [deleteRole, deleteState] = useDeleteRoleMutation();
  const busy = createState.isLoading || updateState.isLoading || deleteState.isLoading;

  function toggle(permission: string) {
    if (role?.isSystem) return;
    setSelectedPermissions((current) => current.includes(permission) ? current.filter((item) => item !== permission) : [...current, permission]);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    try {
      if (role) {
        const body = role.isSystem
          ? { description, isAssignable }
          : { name, slug, description, permissions: selectedPermissions, isAssignable };
        await updateRole({ id: role.id ?? role._id, body }).unwrap();
        setNotice("Role settings saved.");
      } else {
        const response = await createRole({ name, slug: slug || undefined, description, permissions: selectedPermissions }).unwrap();
        onCreated(response.data);
      }
    } catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  async function remove() {
    if (!role || role.isSystem || !window.confirm(`Delete the ${role.name} role?`)) return;
    setError("");
    try { await deleteRole(role.id ?? role._id).unwrap(); onDeleted(); }
    catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  return <form onSubmit={save} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7">
    <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start">
      <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">{role ? "Role configuration" : "Custom role"}</p><h2 className="mt-2 text-2xl font-black">{role?.name ?? "Create a role"}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{role?.isSystem ? "System role identity and permission grants are protected. Assignability and description can still be managed." : "Use least privilege: grant only the modules this team needs."}</p></div>
      {role && !role.isSystem ? <button type="button" onClick={() => void remove()} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-2.5 text-sm font-bold text-rose-200"><Trash2 size={16} /> Delete</button> : null}
    </div>
    {error ? <Notice tone="error">{error}</Notice> : null}{notice ? <Notice tone="success">{notice}</Notice> : null}
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      <label className="text-sm font-bold text-slate-300">Role name<input value={name} onChange={(event) => setName(event.target.value)} disabled={role?.isSystem} required className={`${inputClass} mt-2 disabled:opacity-50`} /></label>
      <label className="text-sm font-bold text-slate-300">Role slug<input value={slug} onChange={(event) => setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} disabled={role?.isSystem} placeholder="social-media-manager" className={`${inputClass} mt-2 disabled:opacity-50`} /></label>
      <label className="text-sm font-bold text-slate-300 md:col-span-2">Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} maxLength={500} className={`${inputClass} mt-2 resize-none`} /></label>
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-slate-300 md:col-span-2"><input type="checkbox" checked={isAssignable} onChange={(event) => setIsAssignable(event.target.checked)} className="h-4 w-4 accent-cyan-300" /> Super Admins may assign this role to users</label>
    </div>
    <div className="mt-8"><div className="mb-4"><p className="text-lg font-black">Module access</p><p className="mt-1 text-sm text-slate-500">Permissions are enforced on backend routes and hidden from the dashboard navigation.</p></div><div className="grid gap-5 lg:grid-cols-2">{groupedPermissions.map(([module, items]) => <fieldset key={module} className="rounded-2xl border border-white/8 bg-black/20 p-4"><legend className="px-2 text-xs font-black uppercase tracking-widest text-cyan-300">{module}</legend><div className="mt-2 space-y-2">{items.map((permission) => <label key={permission.key} className="flex cursor-pointer items-start gap-3 rounded-xl p-3 transition hover:bg-white/[0.04]"><input type="checkbox" checked={selectedPermissions.includes(permission.key)} onChange={() => toggle(permission.key)} disabled={role?.isSystem} className="mt-0.5 h-4 w-4 accent-cyan-300 disabled:opacity-50" /><span><span className="block text-sm font-bold text-slate-200">{permission.label}</span><span className="mt-1 block text-[11px] text-slate-600">{permission.key}</span></span></label>)}</div></fieldset>)}</div></div>
    <div className="sticky bottom-0 mt-8 flex justify-end border-t border-white/10 bg-[#07101f]/95 pt-5 backdrop-blur"><button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 disabled:opacity-50"><Save size={17} /> {busy ? "Saving…" : role ? "Save role" : "Create role"}</button></div>
  </form>;
}

function Notice({ children, tone }: { children: React.ReactNode; tone: "error" | "success" }) { return <p className={`mt-5 rounded-2xl border p-4 text-sm ${tone === "error" ? "border-rose-300/20 bg-rose-300/[0.07] text-rose-100" : "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-100"}`}>{children}</p>; }
