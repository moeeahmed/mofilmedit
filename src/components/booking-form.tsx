"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Check } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BOOKING_CALENDAR_URL,
  BOOKING_GOALS,
  BOOKING_LOCATIONS,
} from "@/content/booking";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Turnstile = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      theme?: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
    }
  ) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  business: string;
  link: string;
  goal: string;
  audience: string;
  brief: string;
  references: string;
  location: string;
  locationDetail: string;
  dates: string;
  website: string; // honeypot
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  business: "",
  link: "",
  goal: "",
  audience: "",
  brief: "",
  references: "",
  location: "",
  locationDetail: "",
  dates: "",
  website: "",
};

const labelClasses = "text-xs uppercase tracking-[0.2em] text-muted-foreground";
const fieldClasses =
  "rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground";
const linkButtonClasses =
  "group h-auto gap-2 rounded-none border-b border-foreground/40 px-0 pb-1 text-sm uppercase tracking-[0.2em] hover:bg-transparent hover:border-foreground";

function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={labelClasses}>
        {label}
        {optional && <span className="normal-case tracking-normal"> (optional)</span>}
      </Label>
      {children}
    </div>
  );
}

function Chips({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2 pt-1">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-input text-foreground/70 hover:border-foreground/60 hover:text-foreground"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileReady) return;
    const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
    if (!ts || !turnstileRef.current || widgetId.current) return;
    widgetId.current = ts.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      theme: "dark",
      callback: (token) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
    });
    return () => {
      if (widgetId.current) ts.remove(widgetId.current);
      widgetId.current = null;
      setTurnstileToken("");
    };
  }, [turnstileReady]);

  function validate(): string | null {
    if (form.name.trim().length < 2) return "Add your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Add a valid email";
    if (form.phone.trim().length < 7) return "Add your phone number";
    if (form.business.trim().length < 2) return "Add your business name";
    if (!form.goal) return "Choose what the video is for";
    if (form.brief.trim().length < 10) return "Tell me a bit more about the project";
    if (!form.location) return "Choose a location";
    if (form.dates.trim().length < 2) return "Add your preferred dates";
    return null;
  }

  async function submit() {
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      toast.error("Please complete the spam check");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, "cf-turnstile-response": turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send your enquiry");
      }
      setStatus("done");
      window.fbq?.("track", "Lead");
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setStatus("idle");
      const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
      if (widgetId.current) ts?.reset(widgetId.current);
      setTurnstileToken("");
    }
  }

  if (status === "done") {
    return (
      <div ref={topRef} className="max-w-2xl scroll-mt-32 border-t pt-12">
        <span className="inline-flex size-10 items-center justify-center rounded-full border">
          <Check className="size-5" />
        </span>
        <h2 className="mt-6 text-3xl font-medium md:text-4xl">
          Thanks {form.name.trim().split(" ")[0]}, your enquiry is in.
        </h2>
        <p className="mt-6 text-muted-foreground">
          I&apos;ve sent a copy of your brief to{" "}
          <span className="text-foreground">{form.email}</span>. I&apos;ll
          review it and get back to you within one working day to talk through
          your project and the next steps.
        </p>
        {BOOKING_CALENDAR_URL && (
          <div className="mt-10 border-t pt-8">
            <Link
              href={BOOKING_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm uppercase tracking-[0.2em] hover:border-foreground"
            >
              Pick a call time
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-32">
      <Toaster position="bottom-center" />
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onReady={() => setTurnstileReady(true)}
        />
      )}

      <div className="max-w-2xl space-y-10 border-t pt-12">
        <div className="grid gap-10 md:grid-cols-2">
          <Field id="name" label="Full name">
            <Input id="name" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} className={fieldClasses} />
          </Field>
          <Field id="email" label="Email">
            <Input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={fieldClasses} />
          </Field>
          <Field id="phone" label="Phone">
            <Input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={fieldClasses} />
          </Field>
          <Field id="business" label="Business name">
            <Input id="business" autoComplete="organization" value={form.business} onChange={(e) => set("business", e.target.value)} className={fieldClasses} />
          </Field>
        </div>

        <Field id="link" label="Website or Instagram" optional>
          <Input id="link" value={form.link} onChange={(e) => set("link", e.target.value)} placeholder="https://" className={fieldClasses} />
        </Field>

        <div className="space-y-2">
          <p className={labelClasses}>What is the video for?</p>
          <Chips name="What is the video for?" options={BOOKING_GOALS} value={form.goal} onChange={(v) => set("goal", v)} />
        </div>

        <Field id="brief" label="Tell me about the project">
          <Textarea
            id="brief"
            rows={4}
            value={form.brief}
            onChange={(e) => set("brief", e.target.value)}
            placeholder="What do you sell, what should viewers feel or do after watching, and anything that must be in the video."
            className={fieldClasses}
          />
        </Field>

        <Field id="audience" label="Who are your customers?" optional>
          <Input id="audience" value={form.audience} onChange={(e) => set("audience", e.target.value)} placeholder="e.g. homeowners in the West Midlands, aged 30 to 55" className={fieldClasses} />
        </Field>

        <Field id="references" label="Videos you like" optional>
          <Textarea id="references" rows={2} value={form.references} onChange={(e) => set("references", e.target.value)} placeholder="Paste 2 or 3 links to videos whose style you like" className={fieldClasses} />
        </Field>

        <div className="space-y-2">
          <p className={labelClasses}>Where is the shoot?</p>
          <Chips name="Where is the shoot?" options={BOOKING_LOCATIONS} value={form.location} onChange={(v) => set("location", v)} />
          {form.location && (
            <Input
              aria-label="Address or area"
              value={form.locationDetail}
              onChange={(e) => set("locationDetail", e.target.value)}
              placeholder="Address or area (optional)"
              className={cn(fieldClasses, "mt-4")}
            />
          )}
        </div>

        <Field id="dates" label="Preferred dates">
          <Input id="dates" value={form.dates} onChange={(e) => set("dates", e.target.value)} placeholder="e.g. any weekday in the week of 12 January" className={fieldClasses} />
        </Field>

        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {turnstileSiteKey && <div ref={turnstileRef} />}

        <p className="text-xs text-muted-foreground">
          Sending this enquiry doesn&apos;t commit you to anything. I&apos;ll
          reply to talk through your project. Your details are only used to
          handle your enquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex justify-end border-t pt-8">
          <Button type="button" variant="ghost" onClick={submit} disabled={status === "loading"} className={linkButtonClasses}>
            {status === "loading" ? "Sending..." : "Send enquiry"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
