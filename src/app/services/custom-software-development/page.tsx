import StaticServicePage from "./static-page";
import { DynamicServiceOverride } from "@/src/components/services/dynamic-service-override";

export { metadata } from "./static-page";

export default function ServicePage(props: Parameters<typeof StaticServicePage>[0]) {
  return (
    <DynamicServiceOverride slug="custom-software-development">
      <StaticServicePage {...props} />
    </DynamicServiceOverride>
  );
}
