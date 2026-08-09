import { LeadAdminDetail } from "@/src/components/admin/leads-panel";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LeadAdminDetail leadId={id} />;
}
