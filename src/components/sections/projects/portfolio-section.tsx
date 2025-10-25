import PortfolioCard from "@/components/portfolio-card";
import { ScrollView } from "@/components/scroll-view";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";

export default function PortfolioSection() {
  return (
    <section
      className="py-16 md:py-32 bg-gray-50 dark:bg-transparent"
      id="portfolio"
    >
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <ScrollView>
            <h2 className="text-4xl font-medium lg:text-5xl">
              Projects That Speak for Themselves
            </h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p>
              Explore the range of work I’ve done, capturing moments, brands,
              and ideas that connect with audiences and deliver results.
            </p>
          </ScrollView>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {PORTFOLIO_CONTENT.map((item, index) => (
            <div key={index} className={index % 2 === 1 ? "md:mt-20" : ""}>
              <PortfolioCard card={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
