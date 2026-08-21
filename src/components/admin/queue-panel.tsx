"use client";

import { useMemo, useState } from "react";
import { useGetEmailCampaignsQuery } from "@/src/lib/features/email-management/email-api";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { Button, Empty, ErrorNotice, LoadingRows, Metric, Panel, PanelTitle, StatusBadge, formatDate } from "./admin-ui";

export function QueuePanel() {
  const [page, setPage] = useState(1);
  const query = useGetEmailCampaignsQuery({ page, limit: 20 }, { pollingInterval: 15_000 });
  const rows = query.data?.data ?? [];
  const summary = useMemo(() => rows.reduce((acc, item) => {
    acc.requested += item.requestedCount;
    acc.sent += item.sentCount;
    acc.failed += item.failedCount;
    acc.skipped += item.skippedCount;
    if (item.status === "Processing" || item.status === "Queued") acc.active += 1;
    return acc;
  }, { requested: 0, sent: 0, failed: 0, skipped: 0, active: 0 }), [rows]);

  if (query.isLoading) return <LoadingRows count={8} />;
  if (query.error) return <ErrorNotice message={getApiErrorMessage(query.error)} />;

  return <div className="space-y-6">
    <Panel>
      <PanelTitle eyebrow="Delivery queues" title="Email delivery operations" action={<Button secondary onClick={() => void query.refetch()}>Refresh</Button>} />
      <p className="mb-5 max-w-3xl text-sm leading-6 text-slate-500">This view is backed by the live email campaign service, so it no longer calls the removed <code>/queues</code> API. Processing, delivered, skipped and failed counts come from real campaign records.</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Metric label="Campaigns shown" value={rows.length} />
        <Metric label="Processing" value={summary.active} />
        <Metric label="Recipients" value={summary.requested} />
        <Metric label="Delivered" value={summary.sent} />
        <Metric label="Failed" value={summary.failed} />
      </div>
    </Panel>

    <Panel>
      <PanelTitle eyebrow="Campaign delivery" title="Recent queue activity" />
      {rows.length ? <div className="overflow-x-auto"><table className="w-full min-w-[920px] text-left text-sm"><thead className="text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="pb-3">Campaign</th><th className="pb-3">Audience</th><th className="pb-3">Requested</th><th className="pb-3">Sent</th><th className="pb-3">Skipped</th><th className="pb-3">Failed</th><th className="pb-3">Status</th><th className="pb-3">Created</th></tr></thead><tbody className="divide-y divide-white/8">{rows.map((campaign) => <tr key={campaign.id}><td className="py-4"><p className="font-bold">{campaign.name}</p><p className="mt-1 max-w-xs truncate text-xs text-slate-500">{campaign.subject}</p></td><td className="py-4 text-slate-400">{campaign.audience}</td><td className="py-4">{campaign.requestedCount}</td><td className="py-4">{campaign.sentCount}</td><td className="py-4">{campaign.skippedCount}</td><td className="py-4">{campaign.failedCount}</td><td className="py-4"><StatusBadge value={campaign.status} /></td><td className="py-4 text-xs text-slate-500">{formatDate(campaign.createdAt)}</td></tr>)}</tbody></table></div> : <Empty title="No delivery activity" description="Email campaigns will appear here as soon as they are sent." />}
      <div className="mt-5 flex justify-end gap-3"><Button secondary disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</Button><Button secondary disabled={page >= (query.data?.pagination.totalPages ?? 1)} onClick={() => setPage((value) => value + 1)}>Next</Button></div>
    </Panel>

    <Panel>
      <PanelTitle eyebrow="Delivery architecture" title="Reliable communication status" />
      <div className="grid gap-3 md:grid-cols-3">
        <Instruction number="1" text="Campaign records are created before delivery begins so every send has an auditable status." />
        <Instruction number="2" text="Suppressed addresses are counted as skipped instead of failing the whole campaign." />
        <Instruction number="3" text="Failed deliveries remain visible here and in campaign history for follow-up and provider troubleshooting." />
      </div>
    </Panel>
  </div>;
}

function Instruction({ number, text }: { number: string; text: string }) {
  return <div className="rounded-2xl border border-white/8 bg-black/20 p-5"><span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-300 font-black text-slate-950">{number}</span><p className="mt-4 text-sm leading-6 text-slate-300">{text}</p></div>;
}
