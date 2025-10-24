import AboutUsSection from "@/components/sections/home/about-section";
import HeroSection from "@/components/sections/home/hero-section";
import PortfolioSection from "@/components/sections/projects/portfolio-section";
import ServicesSection from "@/components/sections/home/services";
import FooterSection from "@/components/footer";
import ContactSection from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioSection />
      <FooterSection />
    </main>
  );
}
