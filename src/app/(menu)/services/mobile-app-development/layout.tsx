import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Mobile app development',
  description: 'Create reliable mobile applications with thoughtful UX, scalable APIs, secure data and maintainable engineering.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
