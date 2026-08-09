import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Custom software development',
  description: 'Design and build secure, scalable custom software around real users, workflows, integrations and business goals.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
