import { JobAdminDetail } from "@/src/components/admin/jobs-panel";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <JobAdminDetail jobId={id} basePath="/hr-management/jobs" />;
}
