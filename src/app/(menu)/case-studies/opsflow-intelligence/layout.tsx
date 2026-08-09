import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'OpsFlow Intelligence case study',
  description: 'Explore an operations intelligence workflow created to improve visibility, automation and business decision support.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
