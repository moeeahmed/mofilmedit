import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_LINKS } from "@/lib/site";
import AboutUsSection from "@/components/sections/home/about-section";
import HeroSection from "@/components/sections/home/hero-section";
import PortfolioSection from "@/components/sections/home/portfolio-section";
import ServicesSection from "@/components/sections/home/services";
import PhotographyCarouselSection from "@/components/sections/home/photography-carousel";
import FooterSection from "@/components/footer";
import ContactSection from "@/components/contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      logo: `${SITE_URL}/apple-touch-icon.png`,
      image: `${SITE_URL}/opengraph-image`,
      email: "contact@mofilmedit.co.uk",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      knowsAbout: [
        "Videography",
        "Video editing",
        "Sports videography",
        "Event videography",
        "Brand films",
      ],
      sameAs: SOCIAL_LINKS,
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <JsonLd data={structuredData} />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      {/* <PhotographyCarouselSection /> */}
      {/* <AboutUsSection /> */}
      {/* <WorkedWith /> */}
      <ContactSection />
      <FooterSection />
    </main>
  );
}
