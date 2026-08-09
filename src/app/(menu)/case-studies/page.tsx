// app/our-work/page.tsx

import AIPageBackground from "@/src/components/background/AIPageBackground";
import OurWorkPageContent from "@/src/components/case-studies/OurWorkPageContent";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Our Work | QuantumFinix",
  description:
    "Explore representative software, AI, automation and digital product solutions designed around practical business requirements.",
};

export default function OurWorkPage() {
  return (
    <AIPageBackground>
      <OurWorkPageContent />
    </AIPageBackground>
  );
}