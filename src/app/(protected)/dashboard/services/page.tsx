"use client";

import Link from "next/link";
import {
  Code2,
  ExternalLink,
  FileCode2,
  FileUp,
  LoaderCircle,
  PencilLine,
  Plus,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useCreateServicePageMutation,
  useDeleteServicePageMutation,
  useGetAdminServicePagesQuery,
  useLazyGetAdminServicePageQuery,
  useUpdateServicePageMutation,
} from "@/src/lib/features/service-pages/service-page-api";
import type {
  ServicePageDto,
  ServicePageStatus,
} from "@/src/lib/features/service-pages/service-page-types";

const EMPTY_HTML = "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Service page</title>\n</head>\n<body>\n\n</body>\n</html>";

export default function ServicePagesAdminPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ServicePageStatus | "">("");
  const [editing, setEditing] = useState<ServicePageDto | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [html, setHtml] = useState(EMPTY_HTML);
  const [sourceFilename, setSourceFilename] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const pages = useGetAdminServicePagesQuery({
    page: 1,
    limit: 100,
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(status ? { status } : {}),
  });
  const [loadPage, loadState] = useLazyGetAdminServicePageQuery();
  const [createPage, createState] = useCreateServicePageMutation();
  const [updatePage, updateState] = useUpdateServicePageMutation();
  const [deletePage, deleteState] = useDeleteServicePageMutation();
  const items = useMemo(() => pages.data?.data ?? [], [pages.data]);
  const busy = createState.isLoading || updateState.isLoading || deleteState.isLoading || loadState.isFetching;

  function startCreate() {
    setEditing(null);
    setHtml(EMPTY_HTML);
    setSourceFilename("");
    if (fileRef.current) fileRef.current.value = "";
    setError("");
    setNotice("");
    setShowEditor(true);
    requestAnimationFrame(() => document.getElementById("service-page-editor")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function startEdit(id: string) {
    setError("");
    setNotice("");
    try {
      const result = await loadPage(id).unwrap();
      setEditing(result.data);
      setHtml(result.data.fullHtml || "");
      setSourceFilename(result.data.sourceFilename || "");
      if (fileRef.current) fileRef.current.value = "";
      setShowEditor(true);
      requestAnimationFrame(() => document.getElementById("service-page-editor")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  async function readSourceFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/\.(?:html?|zip)$/i.test(file.name)) {
      setError("Choose a complete .html/.htm document or a .zip static export.");
      event.target.value = "";
      return;
    }
    setSourceFilename(file.name);
    setError("");
    if (/\.zip$/i.test(file.name)) {
      setHtml("");
      return;
    }
    try {
      setHtml(await file.text());
    } catch {
      setError("The selected HTML file could not be read.");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    const upload = fileRef.current?.files?.[0];
    const isZipUpload = Boolean(upload && /\.zip$/i.test(upload.name));
    const keepsExistingBundle = Boolean(editing?.renderMode === "static-bundle" && !upload && !html.trim());
    if (!isZipUpload && !keepsExistingBundle && (!/<html[\s>]/i.test(html) || !/<body[\s>]/i.test(html))) {
      setError("Paste/upload a complete HTML document, or choose a ZIP from a static React/Next export.");
      return;
    }
    const body = new FormData(event.currentTarget);
    body.delete("source");
    if (upload) body.set("source", upload);
    if (isZipUpload || keepsExistingBundle) body.delete("fullHtml");
    else body.set("fullHtml", html);
    try {
      if (editing) {
        const result = await updatePage({ id: editing.id ?? editing._id, body }).unwrap();
        setEditing(result.data);
        setNotice("Service page updated without changing its uploaded layout.");
      } else {
        const result = await createPage(body).unwrap();
        setEditing(result.data);
        setNotice(result.data.status === "published" ? "Service page created, published and added to the Services menu." : "Service page created as a draft. Publish it to add it to the Services menu.");
      }
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  async function remove(item: ServicePageDto) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    try {
      await deletePage(item.id ?? item._id).unwrap();
      if ((editing?.id ?? editing?._id) === (item.id ?? item._id)) {
        setEditing(null);
        setShowEditor(false);
      }
      setNotice("Service page deleted.");
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  return (
    <section className="space-y-7">
      <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Exact-layout publishing</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Dynamic service pages</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Upload a complete HTML document or a ZIP from a static React/Next export. Public pages render in isolation, so QuantumFinix styles do not alter the supplied layout.
          </p>
        </div>
        <button type="button" onClick={startCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950">
          <Plus size={18} /> New service page
        </button>
      </header>

      {error ? <Message tone="error" onClose={() => setError("")}>{error}</Message> : null}
      {notice ? <Message tone="success" onClose={() => setNotice("")}>{notice}</Message> : null}

      <div className="grid min-h-0 gap-7 xl:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="min-h-0 xl:sticky xl:top-0 xl:max-h-[calc(100vh-136px)]">
          <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#07101f]/90">
            <div className="shrink-0 space-y-3 border-b border-white/10 p-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title or URL" className={`${inputClass} pl-10`} />
              </div>
              <select value={status} onChange={(event) => setStatus(event.target.value as ServicePageStatus | "")} className={inputClass}>
                <option value="">All statuses</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3">
              {pages.isLoading ? <div className="grid h-40 place-items-center"><LoaderCircle className="animate-spin text-cyan-300" /></div> : null}
              {!pages.isLoading && !items.length ? <div className="p-8 text-center text-sm text-slate-500">No service pages found.</div> : null}
              <div className="space-y-2">
                {items.map((item) => {
                  const selected = (editing?.id ?? editing?._id) === (item.id ?? item._id);
                  return (
                    <article key={item.id ?? item._id} className={`rounded-2xl border p-4 transition ${selected ? "border-cyan-300/40 bg-cyan-300/[0.07]" : "border-white/8 bg-white/[0.025] hover:border-white/15"}`}>
                      <button type="button" onClick={() => void startEdit(item.id ?? item._id)} className="block w-full text-left">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-black text-slate-100">{item.title}</p>
                            <p className="mt-1 truncate text-xs text-slate-500">/services/{item.slug}</p>
                          </div>
                          <StatusPill status={item.status} />
                        </div>
                        <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">{item.description || item.sourceFilename || (item.renderMode === "static-bundle" ? "Static export bundle" : "Static HTML service experience")}</p>
                      </button>
                      <div className="mt-4 flex items-center gap-2 border-t border-white/8 pt-3">
                        <button type="button" onClick={() => void startEdit(item.id ?? item._id)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-bold text-slate-300"><PencilLine size={13} /> Edit</button>
                        {item.status === "published" ? <Link href={`/services/${item.slug}`} target="_blank" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-bold text-slate-300"><ExternalLink size={13} /> View</Link> : null}
                        <button type="button" disabled={busy} onClick={() => void remove(item)} className="ml-auto rounded-lg border border-rose-300/15 p-1.5 text-rose-200"><Trash2 size={14} /></button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <div id="service-page-editor" className="min-w-0 scroll-mt-4">
          {showEditor ? (
            <form key={editing?.id ?? editing?._id ?? "new"} onSubmit={submit} className="overflow-hidden rounded-3xl border border-white/10 bg-[#07101f]/90 shadow-2xl">
              <div className="flex flex-col justify-between gap-3 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-cyan-300">{editing ? "Edit imported page" : "Create imported page"}</p>
                  <h2 className="mt-1 text-xl font-black">{editing?.title || "Untitled service page"}</h2>
                </div>
                <button type="button" onClick={() => setShowEditor(false)} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-400"><X size={15} /> Close editor</button>
              </div>

              <div className="grid gap-6 p-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Page title" required><input name="title" required defaultValue={editing?.title || ""} className={inputClass} /></Field>
                    <Field label="Meaningful URL slug"><input name="slug" defaultValue={editing?.slug || ""} placeholder="ai-consulting-services" className={inputClass} /></Field>
                    <Field label="Status"><select name="status" defaultValue={editing?.status || "published"} className={inputClass}><option value="draft">Draft</option><option value="published">Published</option></select></Field>
                    <Field label="Source filename"><input value={sourceFilename} onChange={(event) => setSourceFilename(event.target.value)} readOnly className={`${inputClass} text-slate-500`} placeholder="No HTML file selected" /></Field>
                  </div>
                  <Field label="Internal description"><textarea name="description" defaultValue={editing?.description || ""} rows={3} className={inputClass} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="SEO title"><input name="seoTitle" defaultValue={editing?.seoTitle || ""} maxLength={70} className={inputClass} /></Field>
                    <Field label="SEO description"><textarea name="seoDescription" defaultValue={editing?.seoDescription || ""} maxLength={180} rows={3} className={inputClass} /></Field>
                  </div>
                  <Field label={editing?.renderMode === "static-bundle" && !html ? "HTML source (upload a replacement to change the bundle)" : "Complete HTML document"}>
                    <textarea value={html} onChange={(event) => setHtml(event.target.value)} spellCheck={false} rows={26} className={`${inputClass} min-h-[620px] resize-y font-mono text-xs leading-5`} />
                  </Field>
                </div>

                <aside className="space-y-4 self-start 2xl:sticky 2xl:top-0">
                  <label className="block rounded-2xl border border-dashed border-cyan-300/25 bg-cyan-300/[0.04] p-5">
                    <span className="flex items-center gap-2 font-black"><FileUp size={18} className="text-cyan-300" /> Upload HTML or static ZIP</span>
                    <p className="mt-2 text-xs leading-5 text-slate-500">Choose a complete `.html`/`.htm` document, or upload a `.zip` containing an exported `index.html` plus its CSS, JavaScript, fonts, images, and other assets.</p>
                    <input ref={fileRef} name="source" type="file" accept=".html,.htm,.zip,text/html,application/xhtml+xml,application/zip" onChange={readSourceFile} className="mt-4 block w-full text-xs text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-300 file:px-3 file:py-2 file:font-bold file:text-slate-950" />
                  </label>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="flex items-center gap-2 font-black"><Code2 size={17} className="text-cyan-300" /> Exact-render contract</p>
                    <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-500">
                      <li>• Single-file pages can be pasted or uploaded as complete HTML.</li>
                      <li>• Multi-file pages should be uploaded as a ZIP with `index.html`.</li>
                      <li>• React/Next source must first be built as a static export; raw source is not executable.</li>
                      <li>• Preview the published URL before replacing an existing service route.</li>
                    </ul>
                  </div>

                  {editing?.status === "published" ? <Link href={`/services/${editing.slug}`} target="_blank" className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-black text-white"><ExternalLink size={17} /> Open public page</Link> : null}
                  <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 disabled:opacity-50">
                    {busy ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
                    {editing ? "Save service page" : "Create service page"}
                  </button>
                </aside>
              </div>
            </form>
          ) : (
            <div className="grid min-h-[560px] place-items-center rounded-3xl border border-dashed border-white/10 bg-[#07101f]/50 p-10 text-center">
              <div className="max-w-md">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-cyan-300/[0.08] text-cyan-300"><FileCode2 size={30} /></span>
                <h2 className="mt-5 text-2xl font-black">Select or create a service page</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">The editor keeps page management separate from the supplied visual document, preventing dashboard CSS from changing the public result.</p>
                <button type="button" onClick={startCreate} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950"><Plus size={17} /> Create page</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const inputClass = "w-full rounded-xl border border-white/10 bg-[#030712] px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-300/40";

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">{label}{required ? " *" : ""}</span>{children}</label>;
}

function StatusPill({ status }: { status: ServicePageStatus }) {
  return <span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wider ${status === "published" ? "bg-emerald-300/10 text-emerald-200" : "bg-amber-300/10 text-amber-200"}`}>{status}</span>;
}

function Message({ tone, onClose, children }: { tone: "error" | "success"; onClose: () => void; children: ReactNode }) {
  return <div className={`flex items-start justify-between gap-4 rounded-2xl border p-4 text-sm ${tone === "error" ? "border-rose-300/20 bg-rose-300/[0.07] text-rose-100" : "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-100"}`}><span>{children}</span><button type="button" onClick={onClose} aria-label="Dismiss"><X size={16} /></button></div>;
}
