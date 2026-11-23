import type { BookingInput } from "@/lib/validators/booking";

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function oneLine(s: string) {
  return s.replace(/[\r\n]+/g, " ").trim();
}

function formatSubmittedAt(date: Date) {
  return date.toLocaleString("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function shell(preheader: string, label: string, body: string, footer: string) {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f2f2f2;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;font-family:${FONT};color:#111111;">
            <tr>
              <td style="background:#0a0a0a;padding:28px 32px;">
                <div style="color:#ffffff;font-size:13px;letter-spacing:4px;font-weight:600;">MOFILMEDIT</div>
                <div style="color:#a3a3a3;font-size:12px;letter-spacing:2px;margin-top:6px;">${escapeHtml(label)}</div>
              </td>
            </tr>
            ${body}
            <tr>
              <td style="background:#fafafa;border-top:1px solid #e5e5e5;padding:18px 32px;font-size:12px;color:#737373;line-height:1.5;">${footer}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function rows(items: [string, string][]) {
  return items
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
                  <tr>
                    <td style="padding:14px 0 4px 0;font-size:11px;letter-spacing:2px;color:#737373;">${escapeHtml(label.toUpperCase())}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 4px 0;font-size:15px;line-height:1.5;white-space:pre-wrap;">${escapeHtml(value)}</td>
                  </tr>`
    )
    .join("");
}

function briefRows(data: BookingInput): [string, string][] {
  return [
    ["Name", oneLine(data.name)],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Business", oneLine(data.business)],
    ["Website or Instagram", data.link],
    ["Video is for", data.goal],
    ["Target audience", data.audience],
    ["The brief", data.brief],
    ["Videos they like", data.references],
    [
      "Location",
      data.locationDetail ? `${data.location} (${oneLine(data.locationDetail)})` : data.location,
    ],
    ["Preferred dates", data.dates],
  ];
}

/** Email to MOFILMEDIT with the full brief. */
export function buildBookingOwnerEmail(data: BookingInput) {
  const name = oneLine(data.name);
  const business = oneLine(data.business);
  const subject = `New enquiry from ${name} (${business})`;
  const submittedAt = formatSubmittedAt(new Date());
  const replySubject = encodeURIComponent(`Your enquiry with mofilmedit`);

  const body = `
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <div style="font-size:22px;font-weight:600;line-height:1.3;">${escapeHtml(name)} wants to work with you</div>
                <div style="font-size:13px;color:#737373;margin-top:6px;">${escapeHtml(business)} · ${escapeHtml(submittedAt)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0 32px;">
                <div style="font-size:11px;letter-spacing:2px;color:#737373;padding:16px 0 0 0;border-top:1px solid #e5e5e5;">BRIEF</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows(briefRows(data))}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 32px 32px;">
                <a href="mailto:${escapeHtml(data.email)}?subject=${replySubject}" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;font-size:13px;letter-spacing:2px;padding:14px 26px;border-radius:4px;">REPLY TO ${escapeHtml(name.split(" ")[0].toUpperCase())}</a>
              </td>
            </tr>`;

  const html = shell(
    `${name} (${business}) sent an enquiry`,
    "NEW ENQUIRY",
    body,
    `Sent from the booking form at mofilmedit.co.uk. Replying to this email goes straight to ${escapeHtml(name)}.`
  );

  const text = [
    `New enquiry from ${name} (${business})`,
    `Received: ${submittedAt}`,
    "",
    "Brief:",
    ...briefRows(data)
      .filter(([, v]) => v)
      .map(([label, value]) => `${label}: ${value}`),
    "",
    "Reply to this email to respond.",
  ].join("\n");

  return { subject, html, text };
}

/** Confirmation email to the client. */
export function buildBookingClientEmail(data: BookingInput) {
  const firstName = oneLine(data.name).split(" ")[0];
  const subject = `Your enquiry with mofilmedit`;

  const body = `
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <div style="font-size:22px;font-weight:600;line-height:1.3;">Thanks ${escapeHtml(firstName)}, your enquiry is in.</div>
                <div style="font-size:15px;color:#404040;line-height:1.6;margin-top:12px;">
                  I&#039;ll review your brief and get back to you within one working day to talk through your project and the next steps.
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0 32px;">
                <div style="font-size:11px;letter-spacing:2px;color:#737373;padding:16px 0 0 0;border-top:1px solid #e5e5e5;">YOUR BRIEF</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows(briefRows(data))}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px 32px;font-size:15px;color:#404040;line-height:1.6;">
                Want to add anything to your brief? Just reply to this email.<br/>
                Mohammed, mofilmedit
              </td>
            </tr>`;

  const html = shell(
    "Your enquiry is in. I'll be in touch shortly.",
    "ENQUIRY RECEIVED",
    body,
    `I&#039;ll review your brief and reply within one working day. mofilmedit.co.uk`
  );

  const text = [
    `Thanks ${firstName}, your enquiry is in.`,
    "",
    "I'll review your brief and get back to you within one working day to talk through your project and the next steps.",
    "",
    "Your brief:",
    ...briefRows(data)
      .filter(([, v]) => v)
      .map(([label, value]) => `${label}: ${value}`),
    "",
    "Want to add anything to your brief? Just reply to this email.",
    "Mohammed, mofilmedit",
  ].join("\n");

  return { subject, html, text };
}
