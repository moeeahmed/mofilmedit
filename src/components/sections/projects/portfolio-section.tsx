import PortfolioCard from "@/components/portfolio-card";
import { ScrollView } from "@/components/scroll-view";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";

export default function PortfolioSection() {
  return (
    <section className="py-32 md:py-48" id="portfolio">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="max-w-2xl border-b pb-12">
          <ScrollView>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Full portfolio
            </p>
          </ScrollView>
          <ScrollView delay={0.1}>
            <h1 className="mt-4 text-4xl font-medium md:text-5xl">
              Projects that speak for themselves.
            </h1>
          </ScrollView>
          <ScrollView delay={0.15}>
            <p className="mt-6 text-muted-foreground">
              Explore the range of work I&apos;ve done, capturing moments,
              brands, and ideas that connect with audiences and deliver
              results.
            </p>
          </ScrollView>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {PORTFOLIO_CONTENT.map((item, index) => (
            <PortfolioCard key={index} card={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
