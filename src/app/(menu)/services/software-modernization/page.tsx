import { DynamicServiceAlias } from "@/src/components/services/dynamic-service-override";

export default function ServiceAliasPage() {
  return <DynamicServiceAlias slug="software-modernization" fallbackHref="/services/custom-software-development" />;
}
