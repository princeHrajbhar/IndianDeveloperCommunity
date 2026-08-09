"use client";

import { useState, type FormEvent } from "react";
import { Ban, LockKeyhole, ShieldAlert, Trash2 } from "lucide-react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useCreateIpBlockMutation, useDeleteIpBlockMutation, useGetIpBlocksQuery, useUpdateIpBlockMutation } from "@/src/lib/features/security/security-api";

const inputClass = "w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40";

export default function SecurityPage() {
  const query = useGetIpBlocksQuery();
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [createBlock, createState] = useCreateIpBlockMutation();
  const [updateBlock, updateState] = useUpdateIpBlockMutation();
  const [deleteBlock, deleteState] = useDeleteIpBlockMutation();
  const busy = createState.isLoading || updateState.isLoading || deleteState.isLoading;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    try {
      await createBlock({ address: address.trim(), reason: reason.trim(), ...(expiresAt ? { expiresAt: new Date(expiresAt).toISOString() } : {}) }).unwrap();
      setAddress(""); setReason(""); setExpiresAt(""); setNotice("IP address added to the deny list.");
    } catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  async function toggle(id: string, enabled: boolean) {
    setError(""); try { await updateBlock({ id, body: { enabled } }).unwrap(); }
    catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  async function remove(id: string, addressValue: string) {
    if (!window.confirm(`Remove ${addressValue} from the IP block list?`)) return;
    setError(""); try { await deleteBlock(id).unwrap(); }
    catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  const blocks = query.data?.data ?? [];
  return <section>
    <div className="mb-8"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Platform protection</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Security controls</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Manage explicit IP deny rules. Global, authentication, public-write, upload and interaction rate limits remain enforced automatically.</p></div>
    {query.error || error ? <Notice tone="error">{error || getApiErrorMessage(query.error)}</Notice> : null}{notice ? <Notice tone="success">{notice}</Notice> : null}
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <form onSubmit={submit} className="self-start rounded-3xl border border-white/10 bg-white/[0.035] p-6 xl:sticky xl:top-4"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-300/10 text-rose-200"><Ban size={20} /></span><div><p className="text-lg font-black">Block an IP address</p><p className="text-xs text-slate-500">Exact IPv4 or IPv6 address</p></div></div><div className="mt-6 space-y-5"><label className="block text-sm font-bold text-slate-300">IP address<input required value={address} onChange={(event) => setAddress(event.target.value)} placeholder="203.0.113.42" className={`${inputClass} mt-2`} /></label><label className="block text-sm font-bold text-slate-300">Reason<textarea required minLength={3} maxLength={500} rows={4} value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Abusive traffic, credential stuffing, scraping…" className={`${inputClass} mt-2 resize-none`} /></label><label className="block text-sm font-bold text-slate-300">Expiry (optional)<input type="datetime-local" value={expiresAt} onChange={(event) => setExpiresAt(event.target.value)} className={`${inputClass} mt-2`} /></label><button type="submit" disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-300 px-5 py-3 text-sm font-black text-slate-950 disabled:opacity-50"><LockKeyhole size={17} /> {createState.isLoading ? "Blocking…" : "Block IP address"}</button></div></form>
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7"><div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5"><div><p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">Deny list</p><h2 className="mt-2 text-2xl font-black">Blocked addresses</h2></div><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-slate-400">{blocks.length} records</span></div>{query.isLoading ? <p className="py-10 text-center text-sm text-slate-500">Loading security rules…</p> : blocks.length ? <div className="mt-5 space-y-3">{blocks.map((block) => { const id = block.id ?? block._id; return <article key={id} className="rounded-2xl border border-white/8 bg-black/20 p-4"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><ShieldAlert size={16} className={block.enabled ? "text-rose-300" : "text-slate-600"} /><code className="break-all text-sm font-black text-slate-100">{block.address}</code><span className={`rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wider ${block.enabled ? "bg-rose-300/10 text-rose-200" : "bg-white/5 text-slate-500"}`}>{block.enabled ? "Blocked" : "Disabled"}</span></div><p className="mt-3 text-sm leading-6 text-slate-400">{block.reason}</p><p className="mt-2 text-xs text-slate-600">Added {new Date(block.createdAt).toLocaleString()}{block.expiresAt ? ` · Expires ${new Date(block.expiresAt).toLocaleString()}` : " · No expiry"}</p></div><div className="flex shrink-0 gap-2"><button type="button" disabled={busy} onClick={() => void toggle(id, !block.enabled)} className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-300">{block.enabled ? "Disable" : "Enable"}</button><button type="button" disabled={busy} onClick={() => void remove(id, block.address)} className="grid h-9 w-9 place-items-center rounded-xl border border-rose-300/15 text-rose-300" aria-label={`Remove ${block.address}`}><Trash2 size={15} /></button></div></div></article>; })}</div> : <div className="py-14 text-center"><ShieldAlert className="mx-auto text-slate-700" size={34} /><p className="mt-4 font-black">No blocked addresses</p><p className="mt-2 text-sm text-slate-600">Explicit deny rules will appear here.</p></div>}</div>
    </div>
  </section>;
}

function Notice({ children, tone }: { children: React.ReactNode; tone: "error" | "success" }) { return <p className={`mb-5 rounded-2xl border p-4 text-sm ${tone === "error" ? "border-rose-300/20 bg-rose-300/[0.07] text-rose-100" : "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-100"}`}>{children}</p>; }
