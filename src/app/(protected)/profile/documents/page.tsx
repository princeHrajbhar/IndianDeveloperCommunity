import { Suspense } from "react";
import { ProfileDocumentsWorkspace } from "@/src/components/profile/profile-documents-workspace";

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />}>
      <ProfileDocumentsWorkspace />
    </Suspense>
  );
}
