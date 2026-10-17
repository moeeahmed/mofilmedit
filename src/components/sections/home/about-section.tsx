import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollView } from "@/components/scroll-view";
import { ABOUT_PHOTO, ABOUT_SHORT } from "@/content/about";

export default function AboutUsSection() {
  return (
    <section className="py-24 md:py-40" id="about">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <ScrollView>
            <div className="aspect-square w-full max-w-md overflow-hidden">
              <Image
                src={ABOUT_PHOTO}
                alt="mofilmedit on location"
                width={1080}
                height={1080}
                loading="lazy"
                sizes="(min-width: 768px) 40vw, 100vw"
                className="size-full object-cover"
              />
            </div>
          </ScrollView>

          <div>
            <ScrollView>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Who I am
              </p>
            </ScrollView>
            <ScrollView delay={0.1}>
              <h2 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">
                Behind the camera.
              </h2>
            </ScrollView>
            <ScrollView delay={0.15}>
              <p className="mt-6 text-muted-foreground">{ABOUT_SHORT}</p>
            </ScrollView>
            <ScrollView delay={0.2}>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm uppercase tracking-[0.2em] transition-colors hover:border-foreground"
              >
                Read my story
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollView>
          </div>
        </div>
      </div>
    </section>
  );
}
