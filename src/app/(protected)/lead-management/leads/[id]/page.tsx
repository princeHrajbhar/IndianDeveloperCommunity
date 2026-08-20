import { LeadDetailWorkspace } from "@/src/components/lead-management/lead-detail-workspace";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <LeadDetailWorkspace id={id}/>}
