import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Research and development',
  description: 'Turn emerging technology and difficult technical questions into validated prototypes, evidence and delivery plans.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
