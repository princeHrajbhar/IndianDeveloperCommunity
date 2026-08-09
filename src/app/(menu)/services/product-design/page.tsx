import { DynamicServiceAlias } from "@/src/components/services/dynamic-service-override";

export default function ServiceAliasPage() {
  return <DynamicServiceAlias slug="product-design" fallbackHref="/services/custom-software-development" />;
}
