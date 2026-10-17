import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FooterSection from "@/components/footer";
import { ScrollView } from "@/components/scroll-view";
import { ABOUT_PHOTO, ABOUT_PARAGRAPHS } from "@/content/about";
import { BASE_CITY } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "From engineer to Birmingham videographer: how an ACL injury, a drone trip to Iceland, and grassroots football led to filming full time.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | mofilmedit",
    description:
      "From engineer to Birmingham videographer: how an ACL injury, a drone trip to Iceland, and grassroots football led to filming full time.",
    url: "/about",
    images: [{ url: ABOUT_PHOTO, width: 1080, height: 1080 }],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <article className="px-6 pb-24 pt-40 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <ScrollView>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              About
            </p>
          </ScrollView>
          <ScrollView delay={0.1}>
            <h1 className="mt-4 max-w-2xl text-4xl font-medium leading-tight md:text-5xl">
              From engineer to {BASE_CITY} videographer.
            </h1>
          </ScrollView>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <ScrollView delay={0.15}>
              <div className="aspect-square w-full overflow-hidden md:sticky md:top-32">
                <Image
                  src={ABOUT_PHOTO}
                  alt="mofilmedit on location"
                  width={1080}
                  height={1080}
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="size-full object-cover"
                />
              </div>
            </ScrollView>

            <div>
              {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                <ScrollView key={index} delay={0.1 + index * 0.03}>
                  <p
                    className={cn(
                      "text-muted-foreground leading-relaxed",
                      index > 0 && "mt-12"
                    )}
                  >
                    {paragraph}
                  </p>
                </ScrollView>
              ))}

              <ScrollView delay={0.1 + ABOUT_PARAGRAPHS.length * 0.03}>
                <div className="mt-10 border-t pt-8">
                  <Link
                    href="/#contact"
                    className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm uppercase tracking-[0.2em] transition-colors hover:border-foreground"
                  >
                    Start a project
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollView>
            </div>
          </div>
        </div>
      </article>
      <FooterSection />
    </main>
  );
}
