import { ApplicationAdminDetail } from "@/src/components/admin/applications-panel";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ApplicationAdminDetail applicationId={id} basePath="/hr-management/applications" />;
}
