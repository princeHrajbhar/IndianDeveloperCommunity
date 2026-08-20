import { Suspense } from "react";
import { LeadListWorkspace } from "@/src/components/lead-management/lead-list-workspace";
export default function Page(){return <Suspense fallback={<div className="qf-muted p-8 text-center">Loading lead pipeline…</div>}><LeadListWorkspace/></Suspense>}
