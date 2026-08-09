import { DynamicServiceAlias } from "@/src/components/services/dynamic-service-override";

export default function ServiceAliasPage() {
  return <DynamicServiceAlias slug="team-extension" fallbackHref="/services/ai-consulting" />;
}
