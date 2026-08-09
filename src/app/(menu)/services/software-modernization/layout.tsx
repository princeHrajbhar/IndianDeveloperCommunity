import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Software modernization',
  description: 'Modernize legacy software, architecture, interfaces and delivery practices without losing essential business capability.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
