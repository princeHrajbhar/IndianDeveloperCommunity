import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Cloud and DevOps services',
  description: 'Improve cloud infrastructure, deployment automation, observability, reliability and secure software delivery.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
