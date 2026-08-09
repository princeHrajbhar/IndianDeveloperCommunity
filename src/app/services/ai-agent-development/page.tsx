import { DynamicServiceAlias } from "@/src/components/services/dynamic-service-override";

export default function ServiceAliasPage() {
  return <DynamicServiceAlias slug="ai-agent-development" fallbackHref="/services/ai-software-development#services" />;
}
