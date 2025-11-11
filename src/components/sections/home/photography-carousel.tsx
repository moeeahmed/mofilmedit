"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";

const FEATURED_PHOTOGRAPHY = PORTFOLIO_CONTENT.slice(0, 7);

export default function PhotographyCarouselSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollerRef.current;

    if (!container) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleWheel = (event: WheelEvent) => {
      if (!container) return;
      const { deltaY, deltaX } = event;

      if (Math.abs(deltaY) <= Math.abs(deltaX)) return;

      const nextScrollLeft = container.scrollLeft + deltaY;

      container.scrollTo({
        left: nextScrollLeft,
        behavior: "smooth",
      });

      event.preventDefault();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section
      className="py-16 md:py-32 bg-gray-50 dark:bg-transparent"
      id="photographs"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Photography
            </p>
            <h2 className="text-4xl font-semibold italic md:text-5xl">
              One continuous scroll through the lens
            </h2>
          </div>
          <p className="max-w-sm text-base text-white/70 md:text-right">
            Glide through a single strip of stills captured from recent shoots.
            Scroll once and let the carousel carry you across each frame.
          </p>
        </div>
        <div className="relative mt-16">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent md:w-40" />
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
          >
            {FEATURED_PHOTOGRAPHY.map((item, index) => (
              <article
                key={item.name}
                className={`group relative w-[82vw] shrink-0 snap-start overflow-hidden rounded-[2rem] 
                    border border-white/10 bg-white/5 transition-colors duration-500 
                    md:w-[45vw] lg:w-[32vw]`}

                // {`group relative w-[68vw] shrink-0 snap-start overflow-hidden rounded-[1.75rem]
                // border border-white/10 bg-white/5 transition-colors duration-500
                // sm:w-[60vw] md:w-[36vw] lg:w-[26vw]`}
              >
                <div className="relative aspect-[4/5] ">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                </div>
                {/* <div className="absolute inset-x-0 bottom-0 z-10 space-y-2 p-6">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-white/80">{item.description}</p>
                </div> */}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
