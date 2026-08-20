"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import {
  Check,
  CheckCheck,
  Copy,
  Edit3,
  LogOut,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Trash2,
  UserMinus,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { API_URL } from "@/src/lib/env";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
import {
  useCreatePMConversationMutation,
  useGetPMConversationsQuery,
  useGetPMMessagesQuery,
  useLazyGetPMMessagesQuery,
  useLazySearchPMMessagesQuery,
  useLeavePMConversationMutation,
  useReadPMConversationMutation,
  useSendPMMessageMutation,
  useUpdatePMConversationMutation,
} from "@/src/lib/features/product-management/product-management-api";
import type {
  PMConversation,
  PMMessage,
  PMUser,
} from "@/src/lib/features/product-management/product-management-types";
import { AsyncUserPicker, Empty, inputClass, userLabel } from "./pm-ui";

export function PMChatPage() {
  const me = useGetMeQuery().data?.data;
  const conversations = useGetPMConversationsQuery();
  const rows = conversations.data?.data ?? [];
  const [activeId, setActiveId] = useState("");
  const [search, setSearch] = useState("");
  const [searchMessages, messageSearch] = useLazySearchPMMessagesQuery();
  const [newChat, setNewChat] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [online, setOnline] = useState<Set<string>>(new Set());
  const socket = useRef<Socket | null>(null);
  const active = rows.find((c) => c._id === activeId) || rows[0];

  useEffect(() => {
    if (!activeId && rows[0]) setActiveId(rows[0]._id);
  }, [rows, activeId]);

  useEffect(() => {
    const query = search.trim();
    if (query.length < 2) return;
    const timer = setTimeout(() => {
      void searchMessages({ query, page: 1, limit: 20 });
    }, 250);
    return () => clearTimeout(timer);
  }, [search, searchMessages]);

  useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_SOCKET_URL?.trim() ||
      (API_URL.startsWith("http")
        ? API_URL.replace(/\/api\/?$/, "")
        : window.location.origin);
    const s = io(`${base}/product-management`, {
      path: "/socket.io",
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    socket.current = s;
    const refresh = () => void conversations.refetch();
    const presence = (p: { userId: string; online: boolean }) =>
      setOnline((prev) => {
        const next = new Set(prev);
        p.online ? next.add(p.userId) : next.delete(p.userId);
        return next;
      });
    s.on("conversation:updated", refresh);
    s.on("unread:update", refresh);
    s.on("presence:update", presence);
    return () => {
      s.off();
      s.disconnect();
      socket.current = null;
    };
  }, []);

  useEffect(() => {
    const s = socket.current;
    if (!s || !active?._id) return;
    const id = active._id;
    s.emit("conversation:join", { conversationId: id });
    const typing = (p: {
      conversationId: string;
      userId: string;
      typing: boolean;
    }) => {
      if (p.conversationId !== id) return;
      setTypingUsers((prev) => {
        const next = new Set(prev);
        p.typing ? next.add(p.userId) : next.delete(p.userId);
        return next;
      });
    };
    s.on("typing:update", typing);
    return () => {
      s.emit("conversation:leave", { conversationId: id });
      s.off("typing:update", typing);
      setTypingUsers(new Set());
    };
  }, [active?._id]);

  const filtered = rows.filter((c) => {
    const q = search.toLowerCase();
    return (
      conversationName(c, me?.userId).toLowerCase().includes(q) ||
      ((c.lastMessageId ?? c.lastMessage)?.text || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="-m-4 h-[calc(100vh-80px)] min-h-[620px] overflow-hidden border-t border-slate-200 bg-white md:-m-6 xl:-m-8">
      <div className="grid h-full md:grid-cols-[320px_1fr]">
        <aside
          className={`${active ? "hidden md:flex" : "flex"} min-h-0 flex-col border-r border-slate-200 bg-white`}
        >
          <div className="border-b border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-black">Chat</h1>
                <p className="text-[10px] font-bold text-slate-400">
                  Text only · realtime
                </p>
              </div>
              <button
                onClick={() => setNewChat(true)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${inputClass} pl-9`}
                placeholder="Search conversations…"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {filtered.map((c) => {
              const latest=c.lastMessageId??c.lastMessage;
              const unread=c.unreadCount??c.unread??0;
              return <button
                key={c._id}
                onClick={() => setActiveId(c._id)}
                className={`mb-1 flex w-full gap-3 rounded-xl p-3 text-left transition ${
                  c._id === active?._id ? "bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                <Avatar conversation={c} me={me?.userId} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <b className="truncate text-sm">
                      {conversationName(c, me?.userId)}
                    </b>
                    {unread > 0 && (
                      <span className="ml-auto rounded-full bg-blue-600 px-1.5 py-0.5 text-[9px] font-black text-white">
                        {unread > 99 ? "99+" : unread}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-400">
                    {latest?.text || "No messages yet"}
                  </p>
                </div>
              </button>
            })}
            {search.trim().length >= 2 && (messageSearch.data?.data?.length || messageSearch.isFetching) ? (
              <div className="mt-3 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between px-2 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                    Message matches
                  </span>
                  {messageSearch.data?.pagination && (
                    <span className="text-[9px] font-bold text-slate-400">
                      {messageSearch.data.pagination.total} found
                    </span>
                  )}
                </div>
                {messageSearch.isFetching && (
                  <p className="px-2 py-3 text-xs font-bold text-slate-400">Searching messages…</p>
                )}
                {(messageSearch.data?.data ?? []).map((message) => {
                  const conversation = rows.find((row) => row._id === message.conversationId);
                  if (!conversation) return null;
                  return (
                    <button
                      key={message._id}
                      onClick={() => setActiveId(message.conversationId)}
                      className="mb-1 w-full rounded-xl border border-transparent p-3 text-left hover:border-blue-100 hover:bg-blue-50/60"
                    >
                      <div className="flex items-center gap-2">
                        <b className="min-w-0 flex-1 truncate text-[11px] text-slate-700">
                          {conversationName(conversation, me?.userId)}
                        </b>
                        <span className="text-[9px] font-bold text-slate-400">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] text-slate-500">
                        <span className="font-black text-blue-600">
                          {message.senderId?.name || message.senderId?.email || "Member"}:
                        </span>{" "}
                        {message.text}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : null}
            {!filtered.length && !messageSearch.data?.data?.length && (
              <Empty
                title="No conversations"
                description="Start a direct message or create a group."
              />
            )}
          </div>
        </aside>

        <main
          className={`${active ? "flex" : "hidden md:flex"} min-h-0 flex-col bg-[#f8fafc]`}
        >
          {active ? (
            <Conversation
              active={active}
              me={me?.userId || ""}
              socket={socket}
              typingUsers={typingUsers}
              online={online}
              onBack={() => setActiveId("")}
            />
          ) : (
            <div className="grid h-full place-items-center">
              <Empty
                title="Choose a conversation"
                description="Product Management chat supports text, emoji, reply, edit, delete and copy—no media/file sending."
              />
            </div>
          )}
        </main>
      </div>

      {newChat && (
        <NewConversation
          onClose={() => setNewChat(false)}
          onCreated={(id) => {
            setNewChat(false);
            setActiveId(id);
            void conversations.refetch();
          }}
        />
      )}
    </div>
  );
}

type ConversationProps = {
  active: PMConversation;
  me: string;
  socket: { current: Socket | null };
  typingUsers: Set<string>;
  online: Set<string>;
  onBack: () => void;
};

function Conversation({
  active,
  me,
  socket,
  typingUsers,
  online,
  onBack,
}: ConversationProps) {
  const q = useGetPMMessagesQuery({ conversationId: active._id, page: 1, limit: 50 });
  const [loadOlder, olderRequest] = useLazyGetPMMessagesQuery();
  const [restSend] = useSendPMMessageMutation();
  const [read] = useReadPMConversationMutation();
  const [text, setText] = useState("");
  const [reply, setReply] = useState<PMMessage | null>(null);
  const [editing, setEditing] = useState<PMMessage | null>(null);
  const [menu, setMenu] = useState("");
  const [details, setDetails] = useState(false);
  const [delivered, setDelivered] = useState<Set<string>>(new Set());
  const [older, setOlder] = useState<PMMessage[]>([]);
  const [nextPage, setNextPage] = useState(2);
  const end = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOlder([]);
    setNextPage(2);
    setReply(null);
    setEditing(null);
    setMenu("");
  }, [active._id]);

  useEffect(() => {
    const s = socket.current;
    if (!s) return;
    const refresh = (p: any) => {
      if (
        String(p?.conversationId || p?._id || "") === active._id ||
        String(p?.data?.conversationId || "") === active._id
      ) {
        void q.refetch();
      }
    };
    const delivery = (p: {
      conversationId?: string;
      messageId?: string;
      deliveredTo?: string[];
    }) => {
      if (
        p.conversationId === active._id &&
        p.messageId &&
        p.deliveredTo?.length
      ) {
        setDelivered((prev) => new Set(prev).add(p.messageId!));
      }
    };
    s.on("message:new", refresh);
    s.on("message:updated", refresh);
    s.on("message:deleted", refresh);
    s.on("message:read", refresh);
    s.on("message:delivered", delivery);
    return () => {
      s.off("message:new", refresh);
      s.off("message:updated", refresh);
      s.off("message:deleted", refresh);
      s.off("message:read", refresh);
      s.off("message:delivered", delivery);
    };
  }, [active._id]);

  const current = q.data?.data ?? [];
  const messages = useMemo(() => {
    const map = new Map<string, PMMessage>();
    for (const row of [...older, ...current]) map.set(row._id, row);
    return [...map.values()].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [older, current]);
  const totalPages = q.data?.pagination.totalPages ?? 1;
  const canLoadOlder = nextPage <= totalPages;

  useEffect(() => {
    if (!messages.length) return;
    const last = messages[messages.length - 1];
    void read({ conversationId: active._id, messageId: last._id });
    socket.current?.emit("message:read", {
      conversationId: active._id,
      messageId: last._id,
    });
    const timer = setTimeout(
      () => end.current?.scrollIntoView({ behavior: "smooth" }),
      30,
    );
    return () => clearTimeout(timer);
  }, [current.length, active._id]);

  async function loadMoreHistory() {
    if (!canLoadOlder || olderRequest.isFetching) return;
    const result = await loadOlder({
      conversationId: active._id,
      page: nextPage,
      limit: 50,
    }).unwrap();
    setOlder((prev) => [...result.data, ...prev]);
    setNextPage((page) => page + 1);
  }

  async function send() {
    const value = text.trim();
    if (!value) return;
    if (editing) {
      socket.current?.emit(
        "message:edit",
        { messageId: editing._id, text: value },
        (ack: any) => {
          if (ack?.ok) {
            setText("");
            setEditing(null);
            void q.refetch();
          }
        },
      );
      return;
    }
    const payload = {
      conversationId: active._id,
      text: value,
      replyTo: reply?._id,
    };
    if (socket.current?.connected) {
      socket.current.emit("message:send", payload, (ack: any) => {
        if (ack?.ok) {
          setText("");
          setReply(null);
          void q.refetch();
        }
      });
    } else {
      await restSend(payload).unwrap();
      setText("");
      setReply(null);
    }
  }

  function typing(value: string) {
    setText(value);
    socket.current?.emit(value ? "typing:start" : "typing:stop", {
      conversationId: active._id,
    });
  }

  const otherMember = active.members.find(
    (m) => (m.userId as PMUser)?._id !== me,
  );
  const other = otherMember?.userId as PMUser | undefined;
  const onlineNow = other ? online.has(other._id) || Boolean(otherMember?.presence?.online) : false;
  const lastSeen = otherMember?.presence?.lastSeenAt
    ? new Date(otherMember.presence.lastSeenAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
    : undefined;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4">
        <button onClick={onBack} className="md:hidden">
          <X className="h-5 w-5" />
        </button>
        <Avatar conversation={active} me={me} />
        <div className="min-w-0 flex-1">
          <b className="block truncate text-sm">{conversationName(active, me)}</b>
          <span className="text-[10px] font-bold text-slate-400">
            {typingUsers.size
              ? `${typingUsers.size} typing…`
              : active.type === "direct"
                ? onlineNow
                  ? "Online"
                  : lastSeen
                    ? `Last seen ${lastSeen}`
                    : "Offline"
                : `${active.members.length} members`}
          </span>
        </div>
        {active.type === "group" && (
          <button
            onClick={() => setDetails(true)}
            className="rounded-lg bg-violet-50 px-2.5 py-1 text-[10px] font-black text-violet-700 hover:bg-violet-100"
          >
            <Users className="mr-1 inline h-3 w-3" />
            Group details
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mx-auto max-w-4xl space-y-2">
          {canLoadOlder && (
            <div className="pb-3 text-center">
              <button
                onClick={() => void loadMoreHistory()}
                disabled={olderRequest.isFetching}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[10px] font-black text-slate-600 disabled:opacity-50"
              >
                {olderRequest.isFetching ? "Loading…" : "Load older messages"}
              </button>
            </div>
          )}
          {messages.map((message,index) => {
            const mine = (message.senderId as PMUser)?._id === me;
            const day = new Date(message.createdAt).toDateString();
            const previousDay = index > 0 ? new Date(messages[index-1].createdAt).toDateString() : undefined;
            const showDay = day !== previousDay;
            return (
              <Fragment key={message._id}>
                {showDay && (
                  <div className="py-3 text-center">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[9px] font-black uppercase tracking-wide text-slate-400">
                      {new Date(message.createdAt).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", year: new Date(message.createdAt).getFullYear() !== new Date().getFullYear() ? "numeric" : undefined })}
                    </span>
                  </div>
                )}
              <div
                className={`group flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    mine
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  {!mine && (
                    <span className="mb-1 block text-[9px] font-black uppercase text-violet-600">
                      {userLabel(message.senderId as PMUser)}
                    </span>
                  )}
                  {message.replyTo && typeof message.replyTo === "object" && (
                    <div className={`mb-2 rounded-lg border-l-2 px-2.5 py-1.5 text-[10px] ${mine ? "border-blue-200 bg-blue-500/30 text-blue-50" : "border-violet-300 bg-violet-50 text-slate-500"}`}>
                      <span className="block font-black">Reply</span>
                      <span className="line-clamp-2">{message.replyTo.text}</span>
                    </div>
                  )}
                  <p
                    className={`whitespace-pre-wrap leading-6 ${
                      message.deletedAt ? "italic opacity-60" : ""
                    }`}
                  >
                    {message.text}
                  </p>
                  <div
                    className={`mt-1 flex items-center justify-end gap-1 text-[9px] ${
                      mine ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {message.editedAt && <span>edited · </span>}
                    <span>
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {mine && (
                      <MessageReceipt
                        message={message}
                        conversation={active}
                        me={me}
                        delivered={delivered.has(message._id)}
                      />
                    )}
                  </div>
                  {!message.deletedAt && (
                    <button
                      onClick={() => setMenu(menu === message._id ? "" : message._id)}
                      className={`absolute top-1 ${
                        mine ? "-left-8" : "-right-8"
                      } hidden rounded-lg p-1.5 text-slate-400 hover:bg-white group-hover:block`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  )}
                  {menu === message._id && (
                    <div
                      className={`absolute top-8 z-20 w-36 rounded-xl border border-slate-200 bg-white p-1 text-slate-700 shadow-lg ${
                        mine ? "right-full mr-1" : "left-full ml-1"
                      }`}
                    >
                      <Action
                        icon={Copy}
                        label="Copy"
                        onClick={() => {
                          void navigator.clipboard.writeText(message.text);
                          setMenu("");
                        }}
                      />
                      <Action
                        icon={MessageCircle}
                        label="Reply"
                        onClick={() => {
                          setReply(message);
                          setMenu("");
                        }}
                      />
                      {mine && (
                        <Action
                          icon={Edit3}
                          label="Edit"
                          onClick={() => {
                            setEditing(message);
                            setText(message.text);
                            setMenu("");
                          }}
                        />
                      )}
                      {mine && (
                        <Action
                          icon={Trash2}
                          label="Delete"
                          danger
                          onClick={() => {
                            socket.current?.emit(
                              "message:delete",
                              { messageId: message._id },
                              () => void q.refetch(),
                            );
                            setMenu("");
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              </Fragment>
            );
          })}
          <div ref={end} />
        </div>
      </div>

      {(reply || editing) && (
        <div className="border-t border-slate-200 bg-white px-4 py-2">
          <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-xl bg-slate-50 px-3 py-2 text-xs">
            <span className="font-black text-blue-600">
              {editing ? "Editing" : "Replying"}
            </span>
            <span className="min-w-0 flex-1 truncate text-slate-500">
              {(editing || reply)?.text}
            </span>
            <button
              onClick={() => {
                setReply(null);
                setEditing(null);
                if (editing) setText("");
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <footer className="shrink-0 border-t border-slate-200 bg-white p-4">
        <div className="mx-auto flex max-w-4xl items-end gap-2">
          <textarea
            rows={1}
            value={text}
            onChange={(e) => typing(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder="Write a message…"
            className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
          <button
            onClick={() => void send()}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-white"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-4xl text-[9px] font-bold text-slate-400">
          Text-only communication · no uploads, media, camera, voice notes or documents.
        </p>
      </footer>

      {details && (
        <GroupDetails
          conversation={active}
          me={me}
          onClose={() => setDetails(false)}
          onLeft={() => {
            setDetails(false);
            onBack();
          }}
        />
      )}
    </>
  );
}

function GroupDetails({
  conversation,
  me,
  onClose,
  onLeft,
}: {
  conversation: PMConversation;
  me: string;
  onClose: () => void;
  onLeft: () => void;
}) {
  const [update, { isLoading }] = useUpdatePMConversationMutation();
  const [leave] = useLeavePMConversationMutation();
  const [name, setName] = useState(conversation.name || "");
  const [picked, setPicked] = useState<PMUser[]>([]);
  const [error, setError] = useState("");
  const mine = conversation.members.find(
    (member) => memberId(member.userId) === me,
  );
  const admin = mine?.role === "admin";

  async function mutate(body: Record<string, unknown>) {
    setError("");
    try {
      await update({ id: conversation._id, body }).unwrap();
      setPicked([]);
    } catch (e: any) {
      setError(e?.data?.message || "Could not update group");
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-slate-950/35">
      <button className="absolute inset-0" onClick={onClose} />
      <aside className="relative h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-black">Group details</h2>
            <p className="mt-1 text-xs text-slate-400">
              {conversation.members.length} members · membership checked server-side
            </p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-slate-200 p-2">
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-bold text-rose-700">
            {error}
          </p>
        )}

        {admin && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase text-slate-400">
                Group name
              </label>
              <div className="flex gap-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
                <button
                  disabled={isLoading || !name.trim()}
                  onClick={() => void mutate({ name: name.trim() })}
                  className="rounded-xl bg-violet-600 px-4 text-xs font-black text-white disabled:opacity-40"
                >
                  Rename
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase text-slate-400">
                Add members
              </label>
              <AsyncUserPicker
                multiple
                values={picked}
                onValuesChange={setPicked}
                label="Search eligible people"
              />
              <button
                disabled={!picked.length || isLoading}
                onClick={() => void mutate({ addMembers: picked.map((u) => u._id) })}
                className="mt-2 inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-black text-white disabled:opacity-40"
              >
                <UserPlus className="h-4 w-4" />
                Add selected
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 border-t border-slate-100 pt-4">
          <h3 className="mb-2 text-[10px] font-black uppercase tracking-wide text-slate-400">
            Members
          </h3>
          <div className="space-y-1">
            {conversation.members.map((member) => {
              const uid = memberId(member.userId);
              const user =
                typeof member.userId === "string" ? undefined : member.userId;
              const self = uid === me;
              return (
                <div
                  key={uid}
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-[10px] font-black text-indigo-700">
                    {user ? (user.name || user.email).slice(0, 2).toUpperCase() : "U"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <b className="block truncate text-xs">
                      {user ? userLabel(user) : `User …${uid.slice(-6)}`}
                      {self ? " (you)" : ""}
                    </b>
                    <span className="text-[9px] font-black uppercase text-slate-400">
                      {member.role}
                    </span>
                  </div>
                  {admin && !self && (
                    <div className="flex gap-1">
                      {member.role === "admin" ? (
                        <button
                          title="Demote admin"
                          onClick={() => void mutate({ demoteMembers: [uid] })}
                          className="rounded-lg border border-slate-200 p-2 text-slate-500"
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <button
                          title="Promote admin"
                          onClick={() => void mutate({ promoteMembers: [uid] })}
                          className="rounded-lg border border-violet-200 bg-violet-50 p-2 text-violet-700"
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        title="Remove member"
                        onClick={() => void mutate({ removeMembers: [uid] })}
                        className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-600"
                      >
                        <UserMinus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={async () => {
            if (!confirm("Leave this group?")) return;
            try {
              await leave(conversation._id).unwrap();
              onLeft();
            } catch (e: any) {
              setError(e?.data?.message || "Could not leave group");
            }
          }}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 text-xs font-black text-rose-700"
        >
          <LogOut className="h-4 w-4" />
          Leave group
        </button>
      </aside>
    </div>
  );
}

function MessageReceipt({
  message,
  conversation,
  me,
  delivered,
}: {
  message: PMMessage;
  conversation: PMConversation;
  me: string;
  delivered: boolean;
}) {
  const created = new Date(message.createdAt).getTime();
  const read = conversation.members.some((member) => {
    const id = memberId(member.userId);
    return (
      id !== me &&
      member.lastReadAt &&
      new Date(member.lastReadAt).getTime() >= created
    );
  });
  if (read)
    return (
      <span title="Read" className="inline-flex items-center gap-0.5">
        <CheckCheck className="h-3 w-3" />
        <span>Read</span>
      </span>
    );
  if (delivered)
    return (
      <span title="Delivered" className="inline-flex items-center gap-0.5">
        <CheckCheck className="h-3 w-3" />
        <span>Delivered</span>
      </span>
    );
  return (
    <span title="Sent" className="inline-flex items-center gap-0.5">
      <Check className="h-3 w-3" />
      <span>Sent</span>
    </span>
  );
}

function NewConversation({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (id: string) => void;
}) {
  const [create, { isLoading }] = useCreatePMConversationMutation();
  const [type, setType] = useState<"direct" | "group">("direct");
  const [name, setName] = useState("");
  const [users, setUsers] = useState<PMUser[]>([]);
  const [error, setError] = useState("");

  async function submit() {
    if (type === "direct" && users.length !== 1) {
      setError("Choose exactly one person for a direct message.");
      return;
    }
    if (type === "group" && (!name.trim() || !users.length)) {
      setError("Group name and members are required.");
      return;
    }
    try {
      const result = await create({
        type,
        name: type === "group" ? name : undefined,
        memberIds: users.map((u) => u._id),
      }).unwrap();
      onCreated(result.data._id);
    } catch (e: any) {
      setError(e?.data?.message || "Could not create conversation");
    }
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/35 p-4">
      <button className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black">New conversation</h2>
            <p className="text-xs text-slate-400">
              Direct message or permission-controlled group
            </p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-slate-200 p-2">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mb-4 flex rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => {
              setType("direct");
              setUsers(users.slice(0, 1));
            }}
            className={`flex-1 rounded-lg py-2 text-xs font-black ${
              type === "direct"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Direct
          </button>
          <button
            onClick={() => setType("group")}
            className={`flex-1 rounded-lg py-2 text-xs font-black ${
              type === "group"
                ? "bg-white text-violet-700 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Group
          </button>
        </div>
        {type === "group" && (
          <input
            className={`${inputClass} mb-4`}
            placeholder="Group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        {type === "group" ? (
          <AsyncUserPicker
            label="Add group members"
            multiple
            values={users}
            onValuesChange={setUsers}
          />
        ) : (
          <AsyncUserPicker
            label="Find person by name or email"
            value={users[0]?._id}
            onChange={(_, user) => setUsers(user ? [user] : [])}
          />
        )}
        {error && <p className="mt-3 text-xs font-bold text-rose-600">{error}</p>}
        <button
          disabled={isLoading}
          onClick={() => void submit()}
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Create conversation
        </button>
      </div>
    </div>
  );
}

function Action({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: any;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold ${
        danger ? "text-rose-600 hover:bg-rose-50" : "hover:bg-slate-50"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function Avatar({ conversation, me }: { conversation: PMConversation; me?: string }) {
  const name = conversationName(conversation, me);
  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-black ${
        conversation.type === "group"
          ? "bg-violet-100 text-violet-700"
          : "bg-sky-100 text-sky-700"
      }`}
    >
      {conversation.type === "group" ? (
        <Users className="h-4 w-4" />
      ) : (
        name.slice(0, 2).toUpperCase()
      )}
    </span>
  );
}

function conversationName(c: PMConversation, me?: string) {
  if (c.type === "group") return c.name || "Group";
  const other = c.members?.find(
    (m) => typeof m.userId === "object" && m.userId._id !== me,
  )?.userId as PMUser | undefined;
  return other ? userLabel(other) : "Direct message";
}

function memberId(user: string | PMUser) {
  return typeof user === "string" ? user : user._id;
}
