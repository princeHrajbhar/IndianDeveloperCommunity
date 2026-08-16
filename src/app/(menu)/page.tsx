
import type { Metadata } from "next";

import BuyBuildGrow from "@/src/components/home/BuyBuildGrow";
import ClientFAQSection from "@/src/components/home/ClientFAQSection";
import CustomSolutionsBuildStudio from "@/src/components/home/CustomSolutionsBuildStudio";
import DigitalMarketingGrowthSystem from "@/src/components/home/DigitalMarketingGrowthSystem";
import FeaturedSolutions from "@/src/components/home/FeaturedSolutions";
import FinalCTAThreePaths from "@/src/components/home/FinalCTAThreePaths";
import Hero from "@/src/components/home/Hero";
import HowWeWorkProjectRunway from "@/src/components/home/HowWeWorkProjectRunway";
import ProofCaseStudiesEvidenceBoard from "@/src/components/home/ProofCaseStudiesEvidenceBoard";
import SEOContentHub from "@/src/components/home/SEOContentHub";

export const metadata: Metadata = {
  title:
    "QuantumFinix | AI Software Development, Custom Software, Automation & Digital Marketing",

  description:
    "QuantumFinix builds AI software, custom software, business automation, API integrations and ready-made solutions, with digital marketing services including SEO, PPC, social media, email, content and CRO.",

  alternates: {
    canonical: "https://quantumfinix.com/",
  },

  openGraph: {
    type: "website",
    url: "https://quantumfinix.com/",
    siteName: "QuantumFinix",
    title:
      "QuantumFinix | AI Software, Custom Development, Automation & Digital Growth",
    description:
      "AI software development, custom software, automation, integrations, ready-made solutions and digital marketing built around real business problems.",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "QuantumFinix | AI Software, Custom Development, Automation & Digital Growth",
    description:
      "AI software development, custom software, automation, integrations, ready-made solutions and digital marketing built around real business problems.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main>
      <Hero />

      <BuyBuildGrow />

      <FeaturedSolutions />

      <CustomSolutionsBuildStudio />

      <DigitalMarketingGrowthSystem />

      <ProofCaseStudiesEvidenceBoard />

      <HowWeWorkProjectRunway />

      <FinalCTAThreePaths />

      <ClientFAQSection />

      {/* Large crawlable SEO content near the bottom */}
      <SEOContentHub />
    </main>
  );
}