import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Product design services',
  description: 'Turn complex workflows into clear product experiences through research, UX strategy, interaction design and validation.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
