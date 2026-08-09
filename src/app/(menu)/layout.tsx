import type { ReactNode } from "react";

import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/home/Navbar";

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-grow flex-col">{children}</main>
      <Footer />
    </>
  );
}
