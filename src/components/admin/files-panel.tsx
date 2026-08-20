"use client";

import { useRef, useState, type FormEvent } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useDeleteManagedFileMutation,
  useGetManagedFilesQuery,
  useGetStorageProvidersQuery,
  useMigrateManagedFileMutation,
  useUpdateManagedFileSeoMutation,
  useUploadManagedFileMutation,
} from "@/src/lib/features/files/file-api";
import type { FileVisibility, ManagedFileDto } from "@/src/lib/features/files/file-types";
import { Button, Empty, ErrorNotice, Field, LoadingRows, Panel, PanelTitle, StatusBadge, SuccessNotice, formatDate, inputClass } from "./admin-ui";

const emptySeo = { label: "", title: "", description: "", altText: "", caption: "" };

export function FilesPanel() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  const [category, setCategory] = useState("media");
  const [ownerId, setOwnerId] = useState("");
  const [uploadProvider, setUploadProvider] = useState("");
  const [visibility, setVisibility] = useState<FileVisibility>("public");
  const [seo, setSeo] = useState(emptySeo);
  const [editing, setEditing] = useState<ManagedFileDto | null>(null);
  const [editSeo, setEditSeo] = useState(emptySeo);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const providers = useGetStorageProvidersQuery();
  const files = useGetManagedFilesQuery({ page, limit: 20, ...(search.trim() ? { search: search.trim() } : {}), ...(providerFilter ? { provider: providerFilter } : {}) });
  const [upload, uploadState] = useUploadManagedFileMutation();
  const [updateSeo, updateSeoState] = useUpdateManagedFileSeoMutation();
  const [migrate, migrateState] = useMigrateManagedFileMutation();
  const [remove, removeState] = useDeleteManagedFileMutation();
  const busy = uploadState.isLoading || updateSeoState.isLoading || migrateState.isLoading || removeState.isLoading;

  function setSeoField(field: keyof typeof emptySeo, value: string) {
    setSeo((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    const selected = fileInput.current?.files?.[0];
    if (!selected) { setError("Select a file to upload."); return; }
    const body = new FormData();
    body.append("file", selected);
    body.append("category", category.trim() || "media");
    body.append("visibility", visibility);
    if (ownerId.trim()) body.append("ownerId", ownerId.trim());
    if (uploadProvider) body.append("provider", uploadProvider);
    Object.entries(seo as Record<string, string>).forEach(([key, value]) => { if (value.trim()) body.append(key, value.trim()); });
    try {
      await upload(body).unwrap();
      if (fileInput.current) fileInput.current.value = "";
      setSeo(emptySeo); setNotice("File uploaded with SEO metadata and a meaningful permanent URL.");
    } catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  function beginEdit(file: ManagedFileDto) {
    setEditing(file);
    setEditSeo({
      label: file.label || "",
      title: file.asset.title || "",
      description: file.asset.description || "",
      altText: file.asset.altText || "",
      caption: file.asset.caption || "",
    });
  }

  async function saveSeo() {
    if (!editing) return;
    setError(""); setNotice("");
    try {
      await updateSeo({ id: idOf(editing), ...editSeo }).unwrap();
      setEditing(null); setNotice("File SEO metadata updated successfully.");
    } catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  async function migrateFile(file: ManagedFileDto, targetProvider: string) {
    if (!targetProvider || targetProvider === file.asset.provider) return;
    setError(""); setNotice("");
    try { await migrate({ id: idOf(file), targetProvider, visibility: file.asset.visibility, deleteSourceAfterSuccess: true }).unwrap(); setNotice(`File migrated to ${targetProvider}.`); }
    catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  async function deleteFile(file: ManagedFileDto) {
    if (!window.confirm(`Delete ${file.asset.originalName} from storage and the database?`)) return;
    setError(""); setNotice("");
    try { await remove(idOf(file)).unwrap(); setNotice("File deleted successfully."); }
    catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  return <section className="space-y-6">
    <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Asset operations</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">SEO-ready file management</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Upload and manage assets with descriptive URLs, titles, alt text, captions, and image descriptions.</p></div>
    {error ? <ErrorNotice message={error} /> : null}{notice ? <SuccessNotice message={notice} /> : null}

    <Panel><PanelTitle eyebrow="Upload" title="Register an optimized asset" /><form onSubmit={submit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Field label="File"><input ref={fileInput} required type="file" className={`${inputClass} py-2`} /></Field>
      <Field label="Category"><input required value={category} onChange={(event) => setCategory(event.target.value)} className={inputClass} placeholder="blog, course, media…" /></Field>
      <Field label="Visibility"><select value={visibility} onChange={(event) => setVisibility(event.target.value as FileVisibility)} className={inputClass}><option value="public">Public</option><option value="private">Private</option></select></Field>
      <Field label="SEO title"><input value={seo.title} onChange={(event) => setSeoField("title", event.target.value)} className={inputClass} placeholder="AI automation consulting guide" /></Field>
      <Field label="Alt text"><input value={seo.altText} onChange={(event) => setSeoField("altText", event.target.value)} className={inputClass} placeholder="Describe what the image shows" /></Field>
      <Field label="Caption"><input value={seo.caption} onChange={(event) => setSeoField("caption", event.target.value)} className={inputClass} placeholder="Visible supporting caption" /></Field>
      <Field label="Display label"><input value={seo.label} onChange={(event) => setSeoField("label", event.target.value)} className={inputClass} placeholder="Human-readable library label" /></Field>
      <Field label="Owner user ID (optional)"><input value={ownerId} onChange={(event) => setOwnerId(event.target.value)} className={inputClass} placeholder="Defaults to current admin" /></Field>
      <Field label="Provider"><select value={uploadProvider} onChange={(event) => setUploadProvider(event.target.value)} className={inputClass}><option value="">Configured default</option>{providers.data?.data.map((provider) => <option key={provider} value={provider}>{provider}</option>)}</select></Field>
      <div className="md:col-span-2 xl:col-span-3"><Field label="Image / file description"><textarea value={seo.description} onChange={(event) => setSeoField("description", event.target.value)} className={`${inputClass} min-h-24`} placeholder="Explain the asset context and purpose for search, accessibility, and content reuse." /></Field></div>
      <div className="md:col-span-2 xl:col-span-3"><Button type="submit" disabled={busy}>{uploadState.isLoading ? "Uploading…" : "Upload SEO-ready file"}</Button></div>
    </form></Panel>

    {editing ? <Panel><PanelTitle eyebrow="Metadata" title={`Edit ${editing.label || editing.asset.originalName}`} /><div className="grid gap-4 md:grid-cols-2">
      {(["label", "title", "altText", "caption"] as const).map((field) => <Field key={field} label={field === "altText" ? "Alt text" : field[0].toUpperCase() + field.slice(1)}><input value={editSeo[field]} onChange={(event) => setEditSeo((current) => ({ ...current, [field]: event.target.value }))} className={inputClass} /></Field>)}
      <div className="md:col-span-2"><Field label="Description"><textarea value={editSeo.description} onChange={(event) => setEditSeo((current) => ({ ...current, description: event.target.value }))} className={`${inputClass} min-h-24`} /></Field></div>
      <div className="flex gap-3 md:col-span-2"><Button disabled={busy} onClick={() => void saveSeo()}>Save metadata</Button><Button secondary onClick={() => setEditing(null)}>Cancel</Button></div>
    </div></Panel> : null}

    <Panel><PanelTitle eyebrow="Registry" title="Managed assets" /><div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px_auto]"><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} className={inputClass} placeholder="Search label, filename, or storage key" /><select value={providerFilter} onChange={(event) => { setProviderFilter(event.target.value); setPage(1); }} className={inputClass}><option value="">All providers</option>{providers.data?.data.map((provider) => <option key={provider} value={provider}>{provider}</option>)}</select><Button secondary onClick={() => { setSearch(""); setProviderFilter(""); }}>Clear</Button></div>
      {files.isLoading ? <LoadingRows /> : files.error ? <ErrorNotice message={getApiErrorMessage(files.error)} /> : files.data?.data.length ? <div className="overflow-x-auto"><table className="w-full min-w-[1380px] text-left text-sm"><thead className="text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="pb-3">Preview</th><th className="pb-3">File</th><th className="pb-3">SEO metadata</th><th className="pb-3">Category</th><th className="pb-3">Provider</th><th className="pb-3">Size</th><th className="pb-3">Created</th><th className="pb-3">Migrate</th><th className="pb-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-white/8">{files.data.data.map((file) => <tr key={idOf(file)}><td className="py-4">{file.asset.url && file.asset.mimeType?.startsWith("image/") ? <img src={file.asset.url} alt={file.asset.altText || file.asset.originalName} className="h-12 w-16 rounded-lg border border-white/10 object-cover" /> : <div className="grid h-12 w-16 place-items-center rounded-lg border border-white/10 bg-black/20 text-[10px] text-slate-600">FILE</div>}</td><td className="py-4"><p className="font-bold">{file.label || file.asset.originalName}</p><p className="mt-1 max-w-xs truncate text-xs text-slate-500">{file.asset.storageKey}</p></td><td className="py-4"><p className="max-w-xs truncate text-xs font-bold text-slate-300">{file.asset.title || "No title"}</p><p className="mt-1 max-w-xs truncate text-xs text-slate-500">{file.asset.altText || "No alt text"}</p></td><td className="py-4"><StatusBadge value={file.category} /></td><td className="py-4"><StatusBadge value={file.asset.provider} /></td><td className="py-4 text-xs text-slate-400">{formatBytes(file.asset.size)}</td><td className="py-4 text-xs text-slate-500">{formatDate(file.createdAt)}</td><td className="py-4"><select aria-label={`Migrate ${file.asset.originalName}`} value={file.asset.provider} disabled={busy || (providers.data?.data.length ?? 0) < 2} onChange={(event) => void migrateFile(file, event.target.value)} className={`${inputClass} min-w-36`}>{providers.data?.data.map((provider) => <option key={provider} value={provider}>{provider}</option>)}</select></td><td className="py-4"><div className="flex justify-end gap-2"><Button secondary disabled={busy} onClick={() => beginEdit(file)}>SEO</Button>{file.asset.url ? <Button secondary onClick={() => { void navigator.clipboard.writeText(file.asset.url!); setNotice("File URL copied."); }}>Copy URL</Button> : null}{file.asset.url ? <a href={file.asset.url} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-xl border border-white/10 px-4 py-2 text-sm font-black">Open</a> : null}<Button danger disabled={busy} onClick={() => void deleteFile(file)}>Delete</Button></div></td></tr>)}</tbody></table></div> : <Empty title="No managed files" description="Uploaded assets will appear here with permanent storage identity and SEO metadata." />}
      <div className="mt-5 flex justify-end gap-3"><Button secondary disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</Button><Button secondary disabled={page >= (files.data?.pagination.totalPages ?? 1)} onClick={() => setPage((value) => value + 1)}>Next</Button></div>
    </Panel>
  </section>;
}

function idOf(file: ManagedFileDto): string { return file.id ?? file._id; }
function formatBytes(value: number): string { if (value < 1024) return `${value} B`; if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`; return `${(value / 1024 / 1024).toFixed(1)} MB`; }
