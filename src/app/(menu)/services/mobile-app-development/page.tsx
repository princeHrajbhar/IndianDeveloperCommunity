import { DynamicServiceAlias } from "@/src/components/services/dynamic-service-override";

export default function ServiceAliasPage() {
  return <DynamicServiceAlias slug="mobile-app-development" fallbackHref="/services/custom-software-development" />;
}
