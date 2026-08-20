"use client";

import Link from "next/link";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useGetWorkspaceQuery,
  useMarkAllWorkspaceNotificationsReadMutation,
  useMarkWorkspaceNotificationReadMutation,
} from "@/src/lib/features/workspace/workspace-api";
import { EmptyState, PageHeading, Panel, PanelHeader, SecondaryButton, StatusBadge } from "./profile-ui";

export function ProfileNotificationsWorkspace() {
  const query = useGetWorkspaceQuery(undefined, { refetchOnMountOrArgChange: true });
  const [markRead, markReadState] = useMarkWorkspaceNotificationReadMutation();
  const [markAll, markAllState] = useMarkAllWorkspaceNotificationsReadMutation();
  const notifications = query.data?.data.notifications ?? [];
  const unread = notifications.filter((notification) => !notification.readAt).length;

  return (
    <>
      <PageHeading
        eyebrow="Account activity"
        title="Your"
        accent="notifications."
        description="HR announcements, leave decisions, assigned work and other account alerts in one inbox."
        action={unread ? <SecondaryButton type="button" disabled={markAllState.isLoading} onClick={() => markAll()}>{markAllState.isLoading ? "Updating..." : `Mark all read (${unread})`}</SecondaryButton> : undefined}
      />

      <Panel>
        <PanelHeader title="Notification inbox" description={`${notifications.length} recent notification(s) · ${unread} unread`} />
        {query.isLoading ? <Loading /> : query.error ? (
          <div className="m-5 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-200">{getApiErrorMessage(query.error)}</div>
        ) : notifications.length ? (
          <div className="divide-y divide-white/[0.07]">
            {notifications.map((notification) => {
              const content = (
                <div className="flex items-start justify-between gap-4 p-5 sm:px-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-white">{notification.title}</p>
                      {notification.type?.startsWith("hr-") ? <StatusBadge tone="cyan">HR</StatusBadge> : null}
                      {!notification.readAt ? <StatusBadge tone="amber">New</StatusBadge> : null}
                    </div>
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-400">{notification.message}</p>
                    <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-600">{formatDate(notification.createdAt)}</p>
                  </div>
                  {!notification.readAt ? (
                    <SecondaryButton
                      type="button"
                      disabled={markReadState.isLoading}
                      onClick={(event) => { event.preventDefault(); event.stopPropagation(); markRead(notification._id); }}
                    >
                      Mark read
                    </SecondaryButton>
                  ) : null}
                </div>
              );
              return notification.deepLink ? <Link key={notification._id} href={notification.deepLink} className="block transition hover:bg-white/[0.025]">{content}</Link> : <div key={notification._id}>{content}</div>;
            })}
          </div>
        ) : <EmptyState title="No notifications" description="New HR, work and account notifications will appear here." />}
      </Panel>
    </>
  );
}

function Loading() {
  return <div className="space-y-3 p-6">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-24 animate-pulse rounded-xl bg-white/[0.04]" />)}</div>;
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}
