"use client";

import { useState } from "react";
import { Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ScrollView } from "./scroll-view";
import toast, { Toaster } from "react-hot-toast";

export default function FeaturesSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

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
    } catch (err: any) {
      toast.error("Something went wrong.");
    } finally {
      setTimeout(() => setStatus("idle"), 5000); // auto reset after 5s
    }
  }

  return (
    <section
      id="contact"
      className="py-16 md:py-32 bg-gray-50 dark:bg-transparent"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          {/* LEFT INFO */}
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <ScrollView>
                <h2 className="text-4xl font-semibold lg:text-5xl">
                  Get in touch
                </h2>
              </ScrollView>
              <ScrollView>
                <p className="mt-6">
                  I&apos;d love to hear from you! Feel free to reach out to me
                  for any inquiries or to schedule a call.
                </p>
              </ScrollView>
            </div>
            <ScrollView delay={0.2}>
              <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
                <li>
                  <Link
                    href="mailto:contact@mofilmedit.co.uk"
                    className="hover:text-accent-foreground"
                  >
                    <Mail className="size-5 mr-2 inline" />
                    <span>contact@mofilmedit.co.uk</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+447931041966"
                    className="hover:text-accent-foreground"
                  >
                    <PhoneCall className="size-5 mr-2 inline" />
                    <span>+44 7931 041966</span>
                  </Link>
                </li>
              </ul>
            </ScrollView>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-3">
            <ScrollView>
              <Toaster
                containerStyle={{
                  position: "relative",
                }}
              />
              <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16 w-full">
                <div>
                  <h3 className="text-lg font-semibold">
                    Let&apos;s get you to the right place
                  </h3>
                  <p className="mt-4 text-sm">
                    Reach out to our sales team! We’re eager to learn more about
                    how you plan to use our application.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="**:[&>label]:block mt-12 space-y-6 *:space-y-3"
                >
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input type="text" id="name" name="name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" required />
                  </div>

                  <div>
                    <Label htmlFor="msg">Message</Label>
                    <Textarea id="msg" name="message" rows={3} required />
                  </div>

                  <Button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Submit"}
                  </Button>
                </form>
              </Card>
            </ScrollView>
          </div>
        </div>
      </div>
    </section>
  );
}
