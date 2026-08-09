import AICaseStudySection from "@/src/components/ai-solutions/AICaseStudySection";
import AIDeliveryProcessSection from "@/src/components/ai-solutions/AIDeliveryProcessSection";
import AIDevelopmentHero from "@/src/components/ai-solutions/AIDevelopmentHero";
import AIFinalCTASection from "@/src/components/ai-solutions/AIFinalCTASection";
import AISecuritySection from "@/src/components/ai-solutions/AISecuritySection";
import AISolutionsSection from "@/src/components/ai-solutions/AISolutionsSection";
import BusinessOutcomesSection from "@/src/components/ai-solutions/BusinessOutcomesSection";
import AIPageBackground from "@/src/components/background/AIPageBackground";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "AI Development and Automation | QuantumFinix",
  description:
    "Secure AI applications and business automation with controlled access, human approval and practical system integration.",
};

export default function AIDevelopmentPage() {
  return (
    <AIPageBackground>
      <AIDevelopmentHero />
<AISolutionsSection />
  <BusinessOutcomesSection />
      <AIDeliveryProcessSection />
         <AISecuritySection />
          <AICaseStudySection />
      <AIFinalCTASection />
      <div id="ai-solutions">
        {/* Next section */}
      </div>
    </AIPageBackground>
  );
}