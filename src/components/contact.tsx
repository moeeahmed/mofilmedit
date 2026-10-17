"use client";

import { useState } from "react";
import { Mail, PhoneCall, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Script from "next/script";
import { ScrollView } from "./scroll-view";
import toast, { Toaster } from "react-hot-toast";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function FeaturesSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message has been sent");
      form.reset();
      window.fbq?.("track", "Lead");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      // Turnstile tokens are single-use, so always get a fresh one.
      (
        window as unknown as { turnstile?: { reset: () => void } }
      ).turnstile?.reset();
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  const fieldClasses =
    "rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground";

  return (
    <section id="contact" className="py-24 md:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <ScrollView>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Get in touch
              </p>
            </ScrollView>
            <ScrollView delay={0.1}>
              <h2 className="mt-4 text-4xl font-medium md:text-5xl">
                Ready to capture something?
              </h2>
            </ScrollView>
            <ScrollView delay={0.15}>
              <p className="mt-6 max-w-md text-muted-foreground">
                I&apos;d love to hear from you. Reach out for any inquiries or
                to schedule a call.
              </p>
            </ScrollView>
            <ScrollView delay={0.2}>
              <ul className="mt-10 space-y-4 border-t pt-6">
                <li>
                  <Link
                    href="mailto:contact@mofilmedit.co.uk"
                    className="inline-flex items-center gap-3 text-sm hover:text-muted-foreground"
                  >
                    <Mail className="size-4" />
                    <span>contact@mofilmedit.co.uk</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+447391041966"
                    className="inline-flex items-center gap-3 text-sm hover:text-muted-foreground"
                  >
                    <PhoneCall className="size-4" />
                    <span>+44 7391 041966</span>
                  </Link>
                </li>
              </ul>
            </ScrollView>
            <ScrollView delay={0.22}>
              <Link
                href="https://wa.me/447391041966"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-sm uppercase tracking-[0.2em] transition-colors hover:border-foreground"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6.65,21.73l.43-.79c-.2-.11-.43-.14-.64-.09l.21.88h0ZM.9,23.1l-.88-.21c-.11.48.18.97.67,1.08.14.03.28.03.42,0l-.21-.88ZM2.27,17.35l.88.21c.05-.22.02-.45-.09-.64l-.79.43ZM12,24c6.63,0,12-5.37,12-12h-1.8c0,5.63-4.57,10.2-10.2,10.2v1.8ZM6.22,22.52c1.72.94,3.69,1.48,5.78,1.48v-1.8c-1.78,0-3.46-.46-4.91-1.26l-.87,1.58h0ZM1.11,23.98l5.75-1.37-.42-1.75-5.75,1.37s.42,1.75.42,1.75ZM1.39,17.14L.02,22.89l1.75.42,1.37-5.75-1.75-.42h0ZM0,12C0,14.09.54,16.06,1.48,17.78l1.58-.87c-.8-1.46-1.26-3.13-1.26-4.91H0ZM12,0C5.37,0,0,5.37,0,12h1.8C1.8,6.37,6.37,1.8,12,1.8V0ZM24,12C24,5.37,18.63,0,12,0v1.8c5.63,0,10.2,4.57,10.2,10.2h1.8Z"
                  />
                  <path
                    fill="currentColor"
                    d="M13.05,17.1h-4.05v-5.1h4.05c1.41,0,2.55,1.14,2.55,2.55s-1.14,2.55-2.55,2.55ZM12.75,12h-3.75v-5.1h3.75c1.41,0,2.55,1.14,2.55,2.55s-1.14,2.55-2.55,2.55Z"
                  />
                </svg>
                <span>Message on WhatsApp</span>
              </Link>
            </ScrollView>
          </div>

          <ScrollView>
            <Toaster containerStyle={{ position: "relative" }} />
            <form onSubmit={handleSubmit} className="space-y-8">
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Full name
                </Label>
                <Input type="text" id="name" name="name" required className={fieldClasses} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </Label>
                <Input type="email" id="email" name="email" required className={fieldClasses} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msg" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Message
                </Label>
                <Textarea id="msg" name="message" rows={3} required className={fieldClasses} />
              </div>

              {turnstileSiteKey && (
                <>
                  <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    strategy="lazyOnload"
                  />
                  <div
                    className="cf-turnstile"
                    data-sitekey={turnstileSiteKey}
                    data-theme="dark"
                  />
                </>
              )}

              <Button
                type="submit"
                variant="ghost"
                disabled={status === "loading"}
                className="group h-auto gap-2 rounded-none border-b border-foreground/40 px-0 pb-1 text-sm uppercase tracking-[0.2em] hover:bg-transparent hover:border-foreground"
              >
                {status === "loading" ? "Sending..." : "Submit"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-xs text-muted-foreground">
                Your details are only used to reply to your enquiry. See our{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </ScrollView>
        </div>
      </div>
    </section>
  );
}
