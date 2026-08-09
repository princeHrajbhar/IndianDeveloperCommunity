import { ProfileApplicationEdit } from "@/src/components/profile/profile-application-workspace";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProfileApplicationEdit applicationId={id} />;
}
