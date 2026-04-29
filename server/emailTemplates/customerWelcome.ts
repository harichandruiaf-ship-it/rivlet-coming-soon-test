/**
 * HTML + plain-text welcome for early-access signups (Resend).
 * Table layout + inline styles for client compatibility.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const CUSTOMER_WELCOME_SUBJECT = "Welcome to Rivlet — You're on the list";

export function buildCustomerWelcomeEmail(displayName: string): {
  subject: string;
  text: string;
  html: string;
} {
  const name = displayName.trim() || "there";
  const safe = escapeHtml(name);

  const text = `Hi ${name},

You're on the Rivlet early-access list. We'll write at first light with first drops and founder notes from Madurai.

What happens next
• You'll be among the first to hear when we open the list for drops and stories from the workshop.

If you didn't sign up, you can ignore this message.

— Rivlet
Madurai · Early access
`;

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(CUSTOMER_WELCOME_SUBJECT)}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#EDE8DF;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    You're on the Rivlet early-access list — first drops &amp; notes from Madurai.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#EDE8DF;">
    <tr>
      <td align="center" style="padding:48px 20px 56px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin:0 auto;">
          <tr>
            <td style="padding:0 0 28px 0;text-align:center;">
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#7A5C3A;font-weight:500;">
                Rivlet
              </p>
              <div style="margin:16px auto 0 auto;width:40px;height:1px;background:linear-gradient(90deg,transparent,#C4963A,transparent);font-size:0;line-height:0;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#FDFAF4;border-radius:20px;overflow:hidden;border:1px solid #E4DCCD;box-shadow:0 24px 60px -24px rgba(14,11,7,0.12),0 0 0 1px rgba(255,255,255,0.6) inset;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:48px 44px 40px 44px;border-bottom:1px solid #EDE6D8;">
                    <p style="margin:0 0 20px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-style:italic;color:#7A5C3A;line-height:1.5;">
                      Early access
                    </p>
                    <h1 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:32px;font-weight:500;letter-spacing:-0.03em;line-height:1.12;color:#0E0B07;">
                      You're on the list
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:44px 44px 8px 44px;">
                    <p style="margin:0 0 28px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:20px;line-height:1.45;color:#0E0B07;font-weight:400;">
                      Hi ${safe},
                    </p>
                    <p style="margin:0 0 36px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;line-height:1.75;color:rgba(14,11,7,0.78);">
                      You're on the <strong style="color:#0E0B07;font-weight:600;">Rivlet</strong> early-access list. We'll write at first light with first drops and founder notes from Madurai.
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 40px 0;">
                      <tr>
                        <td width="4" style="width:4px;background-color:#C4963A;border-radius:2px;font-size:0;line-height:0;">&nbsp;</td>
                        <td style="padding:4px 0 4px 24px;">
                          <p style="margin:0 0 12px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#7A5C3A;font-weight:500;">
                            What happens next
                          </p>
                          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;color:rgba(14,11,7,0.82);">
                            You'll be among the first to hear when we open the list for drops and stories from the workshop.
                          </p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:rgba(14,11,7,0.55);">
                      If you didn't sign up, you can ignore this message.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 44px 48px 44px;background-color:#F6F1E8;background-image:linear-gradient(180deg,#F9F5EE 0%,#F2EDE3 100%);">
                    <p style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.4;color:#0E0B07;font-style:italic;">
                      — Rivlet
                    </p>
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7A5C3A;">
                      Madurai · Early access
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 8px 0 8px;text-align:center;">
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;color:rgba(14,11,7,0.38);">
                Premium Indian activewear &amp; athleisure · Zero compromise
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject: CUSTOMER_WELCOME_SUBJECT, text, html };
}
