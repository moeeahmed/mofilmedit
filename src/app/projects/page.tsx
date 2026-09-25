import type { Metadata } from "next";
import PortfolioSection from "@/components/sections/projects/portfolio-section";
import FooterSection from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio - Sports, Event & Brand Films",
  description:
    "Browse mofilmedit's portfolio of cinematic videography: sports and event coverage, brand films, and social content.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Portfolio - Sports, Event & Brand Films | mofilmedit",
    description:
      "Browse mofilmedit's portfolio of cinematic videography: sports and event coverage, brand films, and social content.",
    url: "/projects",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "mofilmedit portfolio",
  url: `${SITE_URL}/projects`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PORTFOLIO_CONTENT.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
        image: item.img,
        url: item.url,
        creator: { "@id": `${SITE_URL}/#business` },
      },
    })),
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <JsonLd data={structuredData} />
      <PortfolioSection />
      <FooterSection />
    </main>
  );
}
