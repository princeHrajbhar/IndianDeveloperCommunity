// src/app/layout.tsx

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StoreProvider } from "@/src/components/providers/store-provider";
import { CookieConsent } from "@/src/components/privacy/cookie-consent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.quantumfinix.com"),
  title: {
    default: "QuantumFinix",
    template: "%s | QuantumFinix",
  },
  description:
    "QuantumFinix builds responsible AI products, workflow automation, custom software and research-led digital systems for modern organizations.",
  applicationName: "QuantumFinix",
  icons: { icon: "/icon.png", shortcut: "/favicon.ico", apple: "/apple-icon.png" },
  openGraph: {
    type: "website",
    siteName: "QuantumFinix",
    title: "QuantumFinix",
    description: "Responsible AI, automation, custom software and research-led digital systems.",
  },
  twitter: {
    card: "summary",
    title: "QuantumFinix",
    description: "Responsible AI, automation, custom software and research-led digital systems.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StoreProvider>
          {children}
          <CookieConsent />
        </StoreProvider>
      </body>
    </html>
  );
}
