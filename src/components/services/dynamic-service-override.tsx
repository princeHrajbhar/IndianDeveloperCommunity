"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { API_URL } from "@/src/lib/env";
import { useGetPublishedServicePageQuery } from "@/src/lib/features/service-pages/service-page-api";
import type { ServicePageDto } from "@/src/lib/features/service-pages/service-page-types";

export function isRenderableServicePage(page?: ServicePageDto): page is ServicePageDto {
  return Boolean(
    page &&
      ((page.renderMode === "static-bundle" && page.bundleId) ||
        (page.renderMode !== "static-bundle" && page.fullHtml)),
  );
}

export function ExactServiceDocument({ page }: { page: ServicePageDto }) {
  const bundleUrl =
    page.renderMode === "static-bundle" && page.bundleId
      ? `${API_URL}/service-pages/content/${encodeURIComponent(page.bundleId)}/`
      : undefined;

  const sharedProps = {
    title: page.title,
    sandbox:
      "allow-downloads allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts",
    className: "fixed inset-0 z-[9999] block h-[100dvh] w-full border-0 bg-white",
  } as const;

  if (bundleUrl) {
    return <iframe {...sharedProps} src={bundleUrl} />;
  }

  return <iframe {...sharedProps} srcDoc={page.fullHtml ?? ""} />;
}

export function DynamicServiceOverride({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const query = useGetPublishedServicePageQuery(slug);
  const dynamicPage = query.data?.data;

  if (isRenderableServicePage(dynamicPage)) {
    return <ExactServiceDocument page={dynamicPage} />;
  }

  return <>{children}</>;
}

export function DynamicServiceAlias({
  slug,
  fallbackHref,
}: {
  slug: string;
  fallbackHref: string;
}) {
  const router = useRouter();
  const query = useGetPublishedServicePageQuery(slug);
  const dynamicPage = query.data?.data;
  const isRenderable = isRenderableServicePage(dynamicPage);

  useEffect(() => {
    if (!query.isLoading && !query.isFetching && !isRenderable) {
      router.replace(fallbackHref);
    }
  }, [fallbackHref, isRenderable, query.isFetching, query.isLoading, router]);

  if (isRenderable && dynamicPage) {
    return <ExactServiceDocument page={dynamicPage} />;
  }

  return (
    <main className="fixed inset-0 z-[9999] grid min-h-[100dvh] place-items-center bg-[#030712] text-white">
      <div className="text-center">
        <LoaderCircle className="mx-auto animate-spin text-cyan-300" size={32} />
        <p className="mt-4 text-sm text-slate-500">Opening service page…</p>
      </div>
    </main>
  );
}
