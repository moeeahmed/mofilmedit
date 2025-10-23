import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validators/contact";

// --- Optional: tiny in-memory rate limiter (per-IP) ---
// NOTE: For serverless/edge it can reset across instances; use Upstash Redis for real prod needs.
const rl = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 minute
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

const resend = new Resend("re_QkjGzu73_GesYqRLh39hKuNau2fsY6ydc");

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      null;

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    let data: any;

    // support both JSON fetch() and <form> POST (urlencoded/multipart)
    if (contentType.includes("application/json")) {
      data = await req.json();
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await req.formData();
      data = {
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
        website: form.get("website"), // honeypot
      };
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
          error: "Validation failed",
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

    // Compose email
    const to = process.env.CONTACT_TO!;
    const from = process.env.CONTACT_FROM!;
    // if (!process.env.RESEND_API_KEY || !to || !from) {
    //   return NextResponse.json(
    //     { ok: false, error: "Server not configured (email envs missing)" },
    //     { status: 500 }
    //   );
    // }

    const subject = `New contact form submission from ${name}`;
    const html = `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Noto Sans', 'Helvetica Neue', Arial;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>IP:</strong> ${escapeHtml(ip ?? "unknown")}</p>
          <hr />
          <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
        </div>
      `;

    const { error } = await resend.emails.send({
      from: "enquiries@mofilmedit.co.uk",
      to: "contact@mofilmedit.co.uk",
      subject,
      replyTo: email, // so you can reply directly
      html,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
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

// super small HTML escaper
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
