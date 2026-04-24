import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, service, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Email to Erano team
    await sendEmail({
      to: "enquiries@eranoconsulting.com",
      subject: `New enquiry from ${fullName}${service ? ` — ${service}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
          <h2 style="color:#5C6167;">New enquiry — Erano Consulting website</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;color:#2c2f36;font-weight:500;">${fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#2c2f36;">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;color:#2c2f36;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Service</td><td style="padding:8px 0;color:#2c2f36;">${service || "Not specified"}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f8f9fb;border-radius:8px;">
            <p style="color:#6b7280;margin:0 0 8px;">Message</p>
            <p style="color:#2c2f36;margin:0;line-height:1.6;">${message}</p>
          </div>
        </div>
      `,
    });

    // Auto-reply to enquirer
    await sendEmail({
      to: email,
      subject: "We received your message — Erano Consulting",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#7D92B2;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:white;margin:0;font-size:20px;">Erano Consulting</h1>
          </div>
          <div style="padding:32px;background:#ffffff;border:1px solid #e5e8f0;border-top:none;border-radius:0 0 12px 12px;">
            <p style="color:#2c2f36;font-size:16px;">Hello ${fullName},</p>
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
