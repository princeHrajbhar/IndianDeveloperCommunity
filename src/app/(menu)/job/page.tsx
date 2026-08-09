import type { Metadata } from "next";
import { CareersPage } from "@/src/components/careers/careers-page";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore open roles at QuantumFinix.",
};

export default function Page() {
  return <CareersPage />;
}
