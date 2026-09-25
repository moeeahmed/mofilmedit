import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validators/contact";
import { ZodError } from "zod";
import { buildContactEmail } from "@/lib/email/contact-email";

// Best-effort in-memory limiter: resets when a serverless instance recycles.
// Use a shared store (e.g. Upstash Redis) for stronger guarantees.
const rl = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQS = 5;

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

function firstZodMessage(err: ZodError): string {
  return err.issues[0]?.message ?? "Validation failed";
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
        return NextResponse.json(
          { ok: false, error: "Forbidden" },
          { status: 403 }
        );
      }
    }

    const ip =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    let data: unknown;
    let turnstileToken: string | null = null;

    // support both JSON fetch() and <form> POST (urlencoded/multipart)
    if (contentType.includes("application/json")) {
      const json = await req.json();
      data = json;
      turnstileToken =
        typeof json?.["cf-turnstile-response"] === "string"
          ? json["cf-turnstile-response"]
          : null;
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await req.formData();
      data = {
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
        website: form.get("website") ?? undefined, // honeypot
      };
      const t = form.get("cf-turnstile-response");
      turnstileToken = typeof t === "string" ? t : null;
    } else {
      return NextResponse.json(
        { ok: false, error: "Unsupported content type" },
        { status: 415 }
      );
    }

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: firstZodMessage(parsed.error),
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, website } = parsed.data;

    // Honeypot check: if filled, silently accept
    if (website) {
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
      console.error("Contact form: email environment variables are missing");
      return NextResponse.json(
        { ok: false, error: "Email cannot be sent at this moment." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { subject, html, text } = buildContactEmail({ name, email, message });

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email, // so you can reply directly
      html,
      text,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { ok: false, error: "Email cannot be sent at this moment." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
