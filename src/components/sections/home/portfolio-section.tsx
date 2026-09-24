import PortfolioCard from "@/components/portfolio-card";
import { ScrollView } from "@/components/scroll-view";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PortfolioSection() {
  return (
    <section className="py-24 md:py-40" id="portfolio">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col gap-4 border-b pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <ScrollView>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Selected work
              </p>
            </ScrollView>
            <ScrollView delay={0.1}>
              <h2 className="mt-4 text-4xl font-medium md:text-5xl">
                My lens, your story.
              </h2>
            </ScrollView>
          </div>
          <ScrollView delay={0.15}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              View all work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollView>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {PORTFOLIO_CONTENT.slice(0, 6).map((item, index) => (
            <PortfolioCard key={index} card={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
