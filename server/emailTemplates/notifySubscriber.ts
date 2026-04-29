/**
 * Internal notification when someone joins the early-access list (Resend → NOTIFY_TO).
 * Plain, scannable layout for ops / founder inbox.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type NotifySubscriberParams = {
  email: string;
  nowIst: string;
  nowIso: string;
};

export function buildNotifySubscriberEmail(params: NotifySubscriberParams): { text: string; html: string } {
  const email = escapeHtml(params.email);
  const ist = escapeHtml(params.nowIst);
  const iso = escapeHtml(params.nowIso);

  const text = `New Rivlet early-access subscriber

Email: ${params.email}
Signed up (IST): ${params.nowIst}
ISO: ${params.nowIso}
`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New subscriber</title>
</head>
<body style="margin:0;padding:0;background-color:#F0EDE6;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F0EDE6;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:520px;margin:0 auto;background-color:#FFFFFF;border-radius:12px;border:1px solid #E8E2D6;">
          <tr>
            <td style="padding:28px 32px 20px 32px;border-bottom:1px solid #EDE8DF;">
              <p style="margin:0;font-family:'Consolas','Monaco','Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#7A5C3A;">
                Rivlet · Internal
              </p>
              <h1 style="margin:12px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:600;letter-spacing:-0.02em;color:#0E0B07;line-height:1.3;">
                New early-access subscriber
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 32px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:16px 0 8px 0;font-family:'Consolas','Monaco','Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7A5C3A;width:120px;vertical-align:top;">
                    Email
                  </td>
                  <td style="padding:16px 0 8px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#0E0B07;word-break:break-all;">
                    ${email}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="height:1px;background:#EDE8DF;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:16px 0 8px 0;font-family:'Consolas','Monaco','Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7A5C3A;vertical-align:top;">
                    IST
                  </td>
                  <td style="padding:16px 0 8px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:rgba(14,11,7,0.85);">
                    ${ist}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="height:1px;background:#EDE8DF;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:16px 0 0 0;font-family:'Consolas','Monaco','Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7A5C3A;vertical-align:top;">
                    ISO
                  </td>
                  <td style="padding:16px 0 0 0;font-family:'Consolas','Monaco','Courier New',monospace;font-size:13px;line-height:1.5;color:rgba(14,11,7,0.75);">
                    ${iso}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;color:rgba(14,11,7,0.4);text-align:center;">
          Automated from Rivlet subscribe API
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { text, html };
}
