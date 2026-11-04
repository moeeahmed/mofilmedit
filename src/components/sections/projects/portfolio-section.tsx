"use client";

import { useState } from "react";
import PortfolioCard from "@/components/portfolio-card";
import { ScrollView } from "@/components/scroll-view";
import {
  PORTFOLIO_CONTENT,
  PORTFOLIO_CATEGORIES,
  type PortfolioCategory,
} from "@/content/portfolio";
import { cn } from "@/lib/utils";

const FILTERS = ["All", ...PORTFOLIO_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

export default function PortfolioSection() {
  const [filter, setFilter] = useState<Filter>("All");

  const items =
    filter === "All"
      ? PORTFOLIO_CONTENT
      : PORTFOLIO_CONTENT.filter(
          (item) => item.category === (filter as PortfolioCategory)
        );

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

        <div className="mt-10 flex flex-wrap gap-3">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors",
                filter === option
                  ? "border-foreground bg-foreground text-background"
                  : "border-input text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {items.map((item, index) => (
            <PortfolioCard key={`${filter}-${index}`} card={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
