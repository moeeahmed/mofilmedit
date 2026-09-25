import type { Metadata } from "next";
import PortfolioSection from "@/components/sections/projects/portfolio-section";
import FooterSection from "@/components/footer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse mofilmedit's portfolio of cinematic videography, sports visuals, and brand films.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioSection />
      <FooterSection />
    </main>
  );
}
