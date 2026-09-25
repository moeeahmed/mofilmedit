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
