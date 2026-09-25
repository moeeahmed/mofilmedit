import Image from "next/image";
import { CustomCursorElement } from "./custom-cursor-element";
import { ScrollView } from "./scroll-view";

export default function PortfolioCard({
  card,
}: {
  card: {
    name: string;
    description: string;
    img: string;
    url: string;
  };
}) {
  return (
    <CustomCursorElement
      cursor={
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-950">
          View
        </span>
      }
    >
      <ScrollView>
        <a href={card.url} target="_blank" rel="noreferrer" className="group block">
          <div className="overflow-hidden">
            <Image
              className="w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
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
        </a>
      </ScrollView>
    </CustomCursorElement>
  );
}
