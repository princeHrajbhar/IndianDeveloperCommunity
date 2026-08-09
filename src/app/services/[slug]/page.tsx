"use client";

import { useParams } from "next/navigation";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import {
  ExactServiceDocument,
  isRenderableServicePage,
} from "@/src/components/services/dynamic-service-override";
import { useGetPublishedServicePageQuery } from "@/src/lib/features/service-pages/service-page-api";
import { getApiErrorMessage } from "@/src/lib/api/error";

export default function DynamicServicePage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const servicePage = useGetPublishedServicePageQuery(slug, { skip: !slug });
  const page = servicePage.data?.data;

  if (servicePage.isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#030712] text-white">
        <div className="text-center">
          <LoaderCircle className="mx-auto animate-spin text-cyan-300" size={34} />
          <p className="mt-4 text-sm text-slate-400">Loading service experience…</p>
        </div>
      </main>
    );
  }

  if (servicePage.error || !isRenderableServicePage(page)) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#030712] px-6 text-white">
        <div className="max-w-lg rounded-3xl border border-rose-300/20 bg-rose-300/[0.06] p-8 text-center">
          <AlertTriangle className="mx-auto text-rose-200" size={36} />
          <h1 className="mt-4 text-2xl font-black">Service page unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {servicePage.error ? getApiErrorMessage(servicePage.error) : "This service page has not been published."}
          </p>
        </div>
      </main>
    );
  }

  return <ExactServiceDocument page={page} />;
}
