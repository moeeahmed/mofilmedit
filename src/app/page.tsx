import AboutUsSection from "@/components/sections/home/about-section";
import HeroSection from "@/components/sections/home/hero-section";
import PortfolioSection from "@/components/sections/home/portfolio-section";
import ServicesSection from "@/components/sections/home/services";
import PhotographyCarouselSection from "@/components/sections/home/photography-carousel";
import FooterSection from "@/components/footer";
import ContactSection from "@/components/contact";
import WorkedWith from "@/components/worked-with";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <PhotographyCarouselSection />
      {/* <AboutUsSection /> */}
      <WorkedWith />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
