import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import he from "he";
import { render } from "@react-email/render";
import { sendEmail } from "@/lib/email";
import { contactRatelimit, getClientIp } from "@/lib/ratelimit";
import { ContactFormEmail, subject as contactSubject } from "@/emails/ContactFormEmail";

const contactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email:    z.string().email().max(200),
  phone:    z.string().max(30).optional(),
  company:  z.string().max(100).optional(),
  industry: z.string().max(100).optional(),
  service:  z.string().max(100).optional(),
  message:  z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json();

    const ip = getClientIp(req);
    const { success } = await contactRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { fullName, email, phone, company, industry, service, message } = result.data;

    // Encode all user-supplied values for the auto-reply HTML
    const sFullName = he.encode(fullName);

    // Email to Erano team
    const emailHtml = await render(ContactFormEmail({ fullName, email, phone, company, industry, service, message }));
    await sendEmail({
      to:      process.env.ADMIN_EMAIL ?? "admin@eranoconsulting.com",
      subject: contactSubject(fullName),
      replyTo: email,
      html:    emailHtml,
    });

    // Auto-reply to enquirer
    await sendEmail({
      to:      email,
      subject: "We received your message — Erano Consulting",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#7D92B2;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:white;margin:0;font-size:20px;">Erano Consulting</h1>
          </div>
          <div style="padding:32px;background:#ffffff;border:1px solid #e5e8f0;border-top:none;border-radius:0 0 12px 12px;">
            <p style="color:#2c2f36;font-size:16px;">Hello ${sFullName},</p>
            <p style="color:#6b7280;line-height:1.7;">
              Thank you for reaching out to Erano Consulting. We have received your message
              and a member of our team will be in touch within one business day.
            </p>
            <p style="color:#6b7280;line-height:1.7;">
              In the meantime, feel free to explore our
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/services" style="color:#7D92B2;">services</a>
              or use our free
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/tools" style="color:#7D92B2;">tax calculators</a>.
            </p>
            <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e8f0;color:#9ca3af;font-size:12px;">
              <p>Erano Consulting · GI-449-1284, Accra, Ghana</p>
              <p>enquiries@eranoconsulting.com · +233 55 923 1996</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent." });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}
