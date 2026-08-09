import { DynamicServiceAlias } from "@/src/components/services/dynamic-service-override";

export default function ServiceAliasPage() {
  return <DynamicServiceAlias slug="cloud-devops" fallbackHref="/services/automation-integration" />;
}
