type ContactEmailInput = { name: string; email: string; message: string };

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

export function buildContactEmail({ name, email, message }: ContactEmailInput) {
  const safeName = name.replace(/[\r\n]+/g, " ").trim();
  const subject = `New enquiry from ${safeName}`;
  const submittedAt = formatSubmittedAt(new Date());
  const replySubject = encodeURIComponent("Re: your enquiry to mofilmedit");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f2f2f2;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${escapeHtml(safeName)} sent you a message through mofilmedit.co.uk
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111111;">
            <tr>
              <td style="background:#0a0a0a;padding:28px 32px;">
                <div style="color:#ffffff;font-size:13px;letter-spacing:4px;font-weight:600;">MOFILMEDIT</div>
                <div style="color:#a3a3a3;font-size:12px;letter-spacing:2px;margin-top:6px;">NEW ENQUIRY</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <div style="font-size:22px;font-weight:600;line-height:1.3;">${escapeHtml(safeName)} got in touch</div>
                <div style="font-size:13px;color:#737373;margin-top:6px;">${escapeHtml(submittedAt)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e5e5;">
                  <tr>
                    <td style="padding:16px 0 4px 0;font-size:11px;letter-spacing:2px;color:#737373;">NAME</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 16px 0;font-size:16px;">${escapeHtml(safeName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 4px 0;font-size:11px;letter-spacing:2px;color:#737373;">EMAIL</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 8px 0;font-size:16px;"><a href="mailto:${escapeHtml(email)}" style="color:#111111;">${escapeHtml(email)}</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 0 32px;">
                <div style="font-size:11px;letter-spacing:2px;color:#737373;padding-bottom:8px;">MESSAGE</div>
                <div style="background:#f7f7f7;border-left:3px solid #0a0a0a;border-radius:4px;padding:16px 18px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 32px 32px;">
                <a href="mailto:${escapeHtml(email)}?subject=${replySubject}" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;font-size:13px;letter-spacing:2px;padding:14px 26px;border-radius:4px;">REPLY TO ${escapeHtml(safeName.split(" ")[0].toUpperCase())}</a>
              </td>
            </tr>
            <tr>
              <td style="background:#fafafa;border-top:1px solid #e5e5e5;padding:18px 32px;font-size:12px;color:#737373;line-height:1.5;">
                Sent from the contact form at mofilmedit.co.uk. Replying to this email goes straight to ${escapeHtml(safeName)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `New enquiry from ${safeName}`,
    `Received: ${submittedAt}`,
    "",
    `Name: ${safeName}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
    "",
    "Sent from the contact form at mofilmedit.co.uk. Reply to this email to respond.",
  ].join("\n");

  return { subject, html, text };
}
