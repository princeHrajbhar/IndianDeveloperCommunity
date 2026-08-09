import { DynamicServiceAlias } from "@/src/components/services/dynamic-service-override";

export default function ServiceAliasPage() {
  return <DynamicServiceAlias slug="generative-ai-solutions" fallbackHref="/services/generative-ai-development" />;
}
