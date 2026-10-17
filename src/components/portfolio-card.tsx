import Image from "next/image";
import Link from "next/link";
import { CustomCursorElement } from "./custom-cursor-element";
import { ScrollView } from "./scroll-view";
import type { PortfolioItem } from "@/content/portfolio";

function PortfolioCardBody({ card }: { card: PortfolioItem }) {
  return (
    <>
      <div className="aspect-video overflow-hidden">
        <Image
          className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          height={480}
          width={720}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={card.img}
          alt={card.name}
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 border-t pt-4">
        <div>
          <h3 className="text-lg font-medium">{card.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {card.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default function PortfolioCard({ card }: { card: PortfolioItem }) {
  return (
    <CustomCursorElement
      cursor={
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-950">
          View
        </span>
      }
    >
      <ScrollView>
        {card.slug ? (
          <Link href={`/projects/${card.slug}`} className="group block">
            <PortfolioCardBody card={card} />
          </Link>
        ) : (
          <a
            href={card.url}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <PortfolioCardBody card={card} />
          </a>
        )}
      </ScrollView>
    </CustomCursorElement>
  );
}
