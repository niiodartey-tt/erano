import nodemailer from "nodemailer";

/**
 * SMTP transporter.
 *
 * ── PRODUCTION (M365) ───────────────────────────────────
 * Once the Microsoft 365 subscription is active, replace
 * the placeholder values below with real M365 credentials
 * and remove the Ethereal fallback block entirely.
 *
 * M365 SMTP settings:
 *   host: "smtp.office365.com"
 *   port: 587
 *   secure: false  (STARTTLS)
 *   auth.user: "admin@eranoconsulting.com"
 *   auth.pass: [M365 app password or account password]
 *
 * ── DEVELOPMENT (Ethereal — fake SMTP) ──────────────────
 * Currently using Ethereal for local development.
 * Emails are caught and viewable at https://ethereal.email
 * No real emails are sent during development.
 * ────────────────────────────────────────────────────────
 */

function createTransporter() {
  // ── Development / placeholder ──────────────────────────
  if (
    !process.env.SMTP_HOST ||
    process.env.SMTP_HOST === "smtp.office365.com"
  ) {
    // Ethereal test account — captured, not delivered
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "placeholder@ethereal.email",
        pass: process.env.SMTP_PASS || "placeholder",
      },
    });
  }

  // ── Production (M365) ──────────────────────────────────
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
}

export const transporter = createTransporter();

/**
 * Send an email.
 *
 * @param to      - recipient email address
 * @param subject - email subject line
 * @param html    - HTML body (use React Email to generate this)
 * @param from    - sender (defaults to Erano enquiries address)
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = `Erano Consulting <${process.env.SMTP_USER || "noreply@eranoconsulting.com"}>`,
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  const info = await transporter.sendMail({ from, to, subject, html });

  // In development, log the Ethereal preview URL
  if (process.env.NODE_ENV !== "production") {
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log("📧 Email preview (Ethereal):", previewUrl);
    }
  }

  return info;
}

export default sendEmail;
