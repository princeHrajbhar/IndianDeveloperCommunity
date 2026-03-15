import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Dark Theme Website",
  description: "A responsive website with dark theme",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
      translate="no" // ✅ Prevent browser translation
    >
      <head>
        {/* ✅ Prevent Google Translate from modifying DOM */}
        <meta name="google" content="notranslate" />
      </head>

      <body className="dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
