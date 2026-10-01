import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FooterSection from "@/components/footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-[80vh] items-center px-6 pt-32 lg:px-12">
        <div className="mx-auto w-full max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            404
          </p>
          <h1 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-6 text-muted-foreground">
            The page you&apos;re looking for may have been moved or never
            existed. Try one of these instead.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm uppercase tracking-[0.2em] transition-colors hover:border-foreground"
            >
              Back home
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              View work
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
