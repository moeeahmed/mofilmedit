"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MetaPixel } from "@/components/meta-pixel";

const STORAGE_KEY = "cookie-consent";
const REOPEN_EVENT = "cookie-consent:open";

type Consent = "accepted" | "declined" | null;

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    setConsent(existing);
    setBannerOpen(existing === null);

    const reopen = () => setBannerOpen(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Private browsing or storage disabled: the choice just won't persist
      // across visits, which is an acceptable fallback here.
    }
    setConsent(value);
    setBannerOpen(false);
  }

  return (
    <>
      {consent === "accepted" && <MetaPixel />}

      {bannerOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-12">
            <p className="max-w-xl text-sm text-muted-foreground">
              I use cookies to measure how well my ads perform. They&apos;re
              only set if you accept. See the{" "}
              <Link
                href="/privacy"
                className="text-foreground underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => choose("declined")}
                className="h-auto rounded-none px-0 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:bg-transparent hover:text-foreground"
              >
                Decline
              </Button>
              <Button
                onClick={() => choose("accepted")}
                className="h-auto rounded-none px-5 py-2.5 text-xs uppercase tracking-[0.2em]"
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}
