import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI software development',
  description: 'Build production AI software with dependable applications, data pipelines, integrations, controls and observability.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
