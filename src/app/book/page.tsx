import type { Metadata } from "next";
import FooterSection from "@/components/footer";
import { ScrollView } from "@/components/scroll-view";
import BookingForm from "@/components/booking-form";

const DESCRIPTION =
  "Enquire about a video shoot with mofilmedit in Birmingham, London or anywhere in the UK. Share your brief and I'll get back to you within one working day.";

export const metadata: Metadata = {
  title: "Book a shoot",
  description: DESCRIPTION,
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a shoot | mofilmedit",
    description: DESCRIPTION,
    url: "/book",
  },
};

export default function BookPage() {
  return (
    <main className="min-h-screen">
      <section className="pb-24 pt-40 md:pb-40">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <ScrollView>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Book a shoot
              </p>
            </ScrollView>
            <ScrollView delay={0.1}>
              <h1 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">
                Let&apos;s make something.
              </h1>
            </ScrollView>
            <ScrollView delay={0.15}>
              <p className="mt-6 text-muted-foreground">
                Tell me about your business and your project. I&apos;ll get back
                to you within one working day to talk it through, then plan the
                shoot, film it and deliver ready-to-post videos.
              </p>
            </ScrollView>
          </div>

          <div className="mt-16 md:mt-24">
            <BookingForm />
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
