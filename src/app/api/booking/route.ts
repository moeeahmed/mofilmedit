import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingSchema } from "@/lib/validators/booking";
import {
  buildBookingClientEmail,
  buildBookingOwnerEmail,
} from "@/lib/email/booking-email";

// Best-effort in-memory limiter: resets when a serverless instance recycles.
const rl = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 10 * 60_000;
const MAX_REQS = 3;

function rateLimit(ip: string | null | undefined) {
  const key = ip || "unknown";
  const now = Date.now();
  const item = rl.get(key);
  if (!item || now - item.ts > WINDOW_MS) {
    rl.set(key, { count: 1, ts: now });
    return true;
  }
  if (item.count >= MAX_REQS) return false;
  item.count++;
  return true;
}

async function verifyTurnstile(token: string | null, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: skip until keys are added
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch (err) {
    console.error("Turnstile verification failed", err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin");
    if (origin) {
      let originHost: string | null = null;
      try {
        originHost = new URL(origin).host;
      } catch {}
      if (originHost !== req.headers.get("host")) {
        return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
      }
    }

    if (!(req.headers.get("content-type") || "").includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Unsupported content type" },
        { status: 415 }
      );
    }

    const ip =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const json = await req.json();
    const turnstileToken =
      typeof json?.["cf-turnstile-response"] === "string"
        ? json["cf-turnstile-response"]
        : null;

    const parsed = bookingSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message ?? "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot check: if filled, silently accept
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json(
        { ok: false, error: "Spam check failed. Please try again." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.EMAIL_CONTACT_TO;
    const from = process.env.EMAIL_CONTACT_FROM;
    if (!apiKey || !to || !from) {
      console.error("Booking form: email environment variables are missing");
      return NextResponse.json(
        { ok: false, error: "Your request cannot be sent at this moment." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const owner = buildBookingOwnerEmail(data);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: owner.subject,
      replyTo: data.email,
      html: owner.html,
      text: owner.text,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { ok: false, error: "Your request cannot be sent at this moment." },
        { status: 502 }
      );
    }

    // The client confirmation is a nice-to-have: the request has already
    // reached MOFILMEDIT, so a failure here is logged but not shown as an error.
    const client = buildBookingClientEmail(data);
    const { error: clientError } = await resend.emails.send({
      from,
      to: data.email,
      subject: client.subject,
      replyTo: to,
      html: client.html,
      text: client.text,
    });
    if (clientError) console.error("Booking confirmation email failed", clientError);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
