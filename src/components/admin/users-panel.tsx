"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { downloadAdminFile } from "@/src/lib/download";
import { useGetAssignableRolesQuery } from "@/src/lib/features/access/role-api";
import {
  useGetUserEmailPreferenceQuery,
  useSetUserEmailPreferenceMutation,
} from "@/src/lib/features/email-management/email-api";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useGetUserSessionsQuery,
  useGetUsersQuery,
  useSetUserVerificationMutation,
  useRevokeAllUserSessionsMutation,
  useRevokeUserSessionMutation,
  useUnlockUserMutation,
  useUpdateUserMutation,
} from "@/src/lib/features/users/user-api";
import type { AdminSession, AdminUser, UserRole } from "@/src/lib/features/users/user-types";
import {
  Button,
  Empty,
  ErrorNotice,
  Field,
  LoadingRows,
  Panel,
  PanelTitle,
  Pagination,
  StatusBadge,
  SuccessNotice,
  formatDate,
  inputClass,
} from "./admin-ui";
import { AdminProfileWorkspace } from "./admin-profile-workspace";

export function UsersPanel({ basePath = "/dashboard/user" }: { basePath?: string } = {}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const assignableRoles = useGetAssignableRolesQuery();
  const roleOptions = assignableRoles.data?.data ?? [];
  const list = useGetUsersQuery({ page, limit: 20, ...(search.trim() ? { search: search.trim() } : {}), ...(role ? { role } : {}) });
  const users = list.data?.data ?? [];

  return (
    <section>
      <PageHeading
        eyebrow="Access management"
        title="Users and profiles"
        description="Manage accounts on dedicated routes and administer the complete profile attached to each user."
        action={<><Button secondary disabled={exporting} onClick={async () => {
          setExportError(""); setExporting(true);
          try { await downloadAdminFile("/user/export", "quantumfinix-users.xlsx", { ...(search.trim() ? { search: search.trim() } : {}), ...(role ? { role } : {}) }); }
          catch (error) { setExportError(getApiErrorMessage(error)); }
          finally { setExporting(false); }
        }}>{exporting ? "Exporting…" : "Export Excel"}</Button><Link href={`${basePath}/add`} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950">Create user</Link></>}
      />
      {exportError ? <div className="mb-4"><ErrorNotice message={exportError} /></div> : null}
      <Panel>
        <PanelTitle eyebrow="Accounts" title="Registered users" />
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_200px_auto]">
          <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search by email" className={inputClass} />
          <select value={role} onChange={(event) => { setRole(event.target.value); setPage(1); }} className={inputClass}><option value="">All roles</option>{roleOptions.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
          <Button secondary onClick={() => { setSearch(""); setRole(""); }}>Clear</Button>
        </div>
        {list.isLoading ? <LoadingRows /> : list.error ? <ErrorNotice message={getApiErrorMessage(list.error)} /> : users.length ? (
          <div className="overflow-x-auto"><table className="w-full min-w-[920px] text-left text-sm"><thead className="text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="pb-3">Email</th><th className="pb-3">Role</th><th className="pb-3">Verification</th><th className="pb-3">Lock</th><th className="pb-3">Created</th><th className="pb-3 text-right">Action</th></tr></thead><tbody className="divide-y divide-white/8">{users.map((user) => <tr key={idOf(user)}><td className="py-4"><Link href={`${basePath}/${idOf(user)}`} className="font-bold hover:text-cyan-300">{user.email}</Link></td><td className="py-4"><StatusBadge value={user.role} /></td><td className="py-4"><StatusBadge value={user.isVerified ? "Verified" : "Unverified"} /></td><td className="py-4"><StatusBadge value={user.lockedUntil && new Date(user.lockedUntil) > new Date() ? "Locked" : "Open"} /></td><td className="py-4 text-xs text-slate-500">{formatDate(user.createdAt)}</td><td className="py-4 text-right"><Link href={`${basePath}/${idOf(user)}`} className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2.5 text-xs font-bold text-cyan-200">Manage</Link></td></tr>)}</tbody></table></div>
        ) : <Empty title="No users found" description="Registered and administrator-created accounts will appear here." />}
        <Pagination page={page} totalPages={list.data?.pagination.pages ?? 1} onPageChange={setPage} />
      </Panel>
    </section>
  );
}

export function UserCreatePage({ basePath = "/dashboard/user" }: { basePath?: string } = {}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const assignableRoles = useGetAssignableRolesQuery();
  const roleOptions = assignableRoles.data?.data ?? [];
  const [error, setError] = useState("");
  const [createUser, state] = useCreateUserMutation();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    try {
      const response = await createUser({ email: email.trim().toLowerCase(), password, role, isVerified: true }).unwrap();
      const emailQueued = response.data.onboardingEmailQueued !== false;
      router.replace(`${basePath}/${idOf(response.data)}?created=1&emailQueued=${emailQueued ? "1" : "0"}`);
    } catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  return <section><PageHeading eyebrow="Account creation" title="Create user" description="The account is verified immediately. The user receives a secure one-time password-setup link; the administrative password is never emailed." action={<Link href={basePath} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold">Cancel</Link>} />{error ? <ErrorNotice message={error} /> : null}<Panel><form onSubmit={submit} className="grid gap-5 md:grid-cols-2"><Field label="Email"><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} /></Field><Field label="Initial password (not emailed)"><input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} /></Field><Field label="Role"><select value={role} onChange={(event) => setRole(event.target.value)} className={inputClass}>{roleOptions.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></Field><div className="flex items-end"><Button type="submit" disabled={state.isLoading}>{state.isLoading ? "Creating…" : "Create verified account"}</Button></div></form></Panel></section>;
}

export function UserAdminDetail({ userId, basePath = "/dashboard/user" }: { userId: string; basePath?: string }) {
  const router = useRouter();
  const query = useGetUserByIdQuery(userId);
  const sessions = useGetUserSessionsQuery(userId);
  const emailPreference = useGetUserEmailPreferenceQuery(userId);
  const user = query.data?.data;
  const [role, setRole] = useState<UserRole>("user");
  const assignableRoles = useGetAssignableRolesQuery();
  const roleOptions = assignableRoles.data?.data ?? [];
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [initializedId, setInitializedId] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [updateUser, updateState] = useUpdateUserMutation();
  const [verifyUser, verifyState] = useSetUserVerificationMutation();
  const [unlockUser, unlockState] = useUnlockUserMutation();
  const [deleteUser, deleteState] = useDeleteUserMutation();
  const [revokeSession, revokeSessionState] = useRevokeUserSessionMutation();
  const [revokeAllSessions, revokeAllSessionsState] = useRevokeAllUserSessionsMutation();
  const [setEmailPreference, emailPreferenceState] = useSetUserEmailPreferenceMutation();

  useEffect(() => {
    if (!user || initializedId === idOf(user)) return;
    setInitializedId(idOf(user)); setRole(user.role || "user"); setEmail(user.email ?? "");
  }, [initializedId, user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("created") !== "1") return;
    setNotice(params.get("emailQueued") === "0"
      ? "User created, but the onboarding email could not be queued. Check the email worker."
      : "User created and the password-setup email was queued. If it is not in the inbox, check the spam or junk folder.");
  }, []);

  async function save() {
    if (!user) return; setError(""); setNotice("");
    try {
      const response = await updateUser({ id: userId, body: { email: email.trim().toLowerCase(), role, ...(newPassword ? { password: newPassword } : {}) } }).unwrap();
      setNewPassword(""); setNotice(response.message || "User account updated. Security-sensitive changes invalidate active sessions.");
    } catch (caught) { setError(getApiErrorMessage(caught)); }
  }
  async function verify() { if (!user) return; setError(""); try { await verifyUser({ id: userId, isVerified: !user.isVerified }).unwrap(); setNotice("Verification state updated."); } catch (caught) { setError(getApiErrorMessage(caught)); } }
  async function unlock() { setError(""); try { await unlockUser(userId).unwrap(); setNotice("Account unlocked."); } catch (caught) { setError(getApiErrorMessage(caught)); } }
  async function remove() { if (!user || !window.confirm(`Delete ${user.email} and dependent profile/application data?`)) return; setError(""); try { await deleteUser(userId).unwrap(); router.replace(basePath); } catch (caught) { setError(getApiErrorMessage(caught)); } }
  async function toggleEmailCommunication() {
    if (!user) return;
    const currentlyBlocked = Boolean(emailPreference.data?.data.blocked);
    setError(""); setNotice("");
    try {
      await setEmailPreference({ id: userId, blocked: !currentlyBlocked, reason: currentlyBlocked ? undefined : "Blocked by administrator from the user account page" }).unwrap();
      setNotice(currentlyBlocked ? "Email communication unblocked for this user." : "Email communication blocked. No queued or future email will be sent to this address.");
    } catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  async function revokeOne(sessionId: string) { setError(""); setNotice(""); try { await revokeSession({ userId, sessionId }).unwrap(); setNotice("Session revoked."); } catch (caught) { setError(getApiErrorMessage(caught)); } }
  async function revokeAll() { if (!window.confirm("Sign this user out from every device?")) return; setError(""); setNotice(""); try { const response = await revokeAllSessions(userId).unwrap(); setNotice(`${response.data.revokedCount} session(s) revoked.`); } catch (caught) { setError(getApiErrorMessage(caught)); } }

  if (query.isLoading) return <LoadingRows count={8} />;
  if (query.error || !user) return <ErrorNotice message={getApiErrorMessage(query.error ?? "User not found")} />;
  const busy = updateState.isLoading || verifyState.isLoading || unlockState.isLoading || deleteState.isLoading || revokeSessionState.isLoading || revokeAllSessionsState.isLoading || emailPreferenceState.isLoading;

  return <section><PageHeading eyebrow="Account record" title={user.email} description={`Created ${formatDate(user.createdAt)} · ${user.role || "user"}`} action={<Link href={basePath} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold">Back</Link>} />{error ? <ErrorNotice message={error} /> : null}{notice ? <SuccessNotice message={notice} /> : null}<div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]"><aside><Panel><PanelTitle eyebrow="Security" title="Account controls" /><div className="space-y-4"><Field label="Email"><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} /></Field><Field label="Role"><select value={role} onChange={(event) => setRole(event.target.value)} className={inputClass}>{roleOptions.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></Field><Field label="New password (optional)"><input type="password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={inputClass} /></Field><div className="flex flex-wrap gap-2"><StatusBadge value={user.isVerified ? "Verified" : "Unverified"} /><StatusBadge value={user.lockedUntil && new Date(user.lockedUntil) > new Date() ? "Locked" : "Open"} /><StatusBadge value={emailPreference.data?.data.blocked ? "Email blocked" : "Email allowed"} /></div><Button disabled={busy} onClick={() => void save()}>Save account</Button><Button secondary disabled={busy || emailPreference.isLoading} onClick={() => void toggleEmailCommunication()}>{emailPreference.data?.data.blocked ? "Unblock email communication" : "Block email communication"}</Button><Button secondary disabled={busy} onClick={() => void verify()}>{user.isVerified ? "Mark unverified" : "Verify account"}</Button>{user.lockedUntil ? <Button secondary disabled={busy} onClick={() => void unlock()}>Unlock account</Button> : null}<Button danger disabled={busy} onClick={() => void remove()}>Delete user</Button></div></Panel><UserSessionsPanel sessions={sessions.data?.data ?? []} loading={sessions.isLoading} error={sessions.error} busy={busy} onRevoke={revokeOne} onRevokeAll={revokeAll} /></aside><AdminProfileWorkspace userId={userId} email={user.email} role={user.role || "user"} onClose={() => router.push(basePath)} /></div></section>;
}

function UserSessionsPanel({ sessions, loading, error, busy, onRevoke, onRevokeAll }: { sessions: AdminSession[]; loading: boolean; error: unknown; busy: boolean; onRevoke: (sessionId: string) => Promise<void>; onRevokeAll: () => Promise<void> }) {
  return <Panel className="mt-6"><PanelTitle eyebrow="Authentication" title="Active sessions" action={sessions.length ? <Button danger disabled={busy} onClick={() => void onRevokeAll()}>Revoke all</Button> : undefined} />{loading ? <LoadingRows count={3} /> : error ? <ErrorNotice message={getApiErrorMessage(error)} /> : sessions.length ? <div className="space-y-3">{sessions.map((session) => <div key={session.id ?? session._id} className="rounded-2xl border border-white/8 bg-black/20 p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="flex flex-wrap gap-2"><StatusBadge value={session.expired ? "Expired" : "Active"} /><span className="text-xs text-slate-500">{session.ip || "IP unavailable"}</span></div><p className="mt-3 break-words text-xs leading-5 text-slate-400">{session.userAgent || "Unknown device"}</p><p className="mt-2 text-[11px] text-slate-600">Last used {formatDate(session.lastUsedAt)} · expires {formatDate(session.expiresAt)}</p></div><Button danger disabled={busy} onClick={() => void onRevoke(session.id ?? session._id)}>Revoke</Button></div></div>)}</div> : <Empty title="No active sessions" description="This account is currently signed out everywhere." />}</Panel>;
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) { return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{description}</p></div>{action}</div>; }
function idOf(user: AdminUser) { return user.id ?? user._id; }
