import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Custom software development cost',
  description: 'Understand the factors that shape custom software development cost, scope, architecture, delivery and long-term operation.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
