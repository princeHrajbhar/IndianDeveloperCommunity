import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI knowledge assistant case study',
  description: 'See how a governed AI knowledge assistant can retrieve trusted information and support operational teams.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
