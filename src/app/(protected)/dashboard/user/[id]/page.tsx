import { UserAdminDetail } from "@/src/components/admin/users-panel";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UserAdminDetail userId={id} />;
}
