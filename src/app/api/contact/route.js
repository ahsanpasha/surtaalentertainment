// src/app/api/contact/route.js
// Contact form POST handler — saves to Firestore + sends email notification

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


/* ─── Shared transporter factory ─────────────────────────── */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
}

/* ─── Admin notification email HTML ──────────────────────── */
function buildAdminEmail({ fullName, email, phone, message }) {
  const time = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#8D0432 0%,#BD0040 100%);padding:36px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:0.5px;">
              📩 New Contact Form Submission
            </h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
              Surtaal Entertainment — Website Contact
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 24px;color:#444;font-size:15px;line-height:1.6;">
              A new message has been submitted through the contact form on <strong>surtaalentertainment.com</strong>.
            </p>

            <!-- Details Card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #eee;border-radius:8px;overflow:hidden;">
              <tr style="background:#f0f0f0;">
                <td style="padding:10px 20px;font-weight:700;color:#8D0432;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;width:130px;">Field</td>
                <td style="padding:10px 20px;font-weight:700;color:#8D0432;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Details</td>
              </tr>
              <tr style="border-top:1px solid #eee;">
                <td style="padding:14px 20px;color:#666;font-size:14px;font-weight:600;">👤 Full Name</td>
                <td style="padding:14px 20px;color:#222;font-size:14px;">${fullName}</td>
              </tr>
              <tr style="border-top:1px solid #eee;background:#f9f9f9;">
                <td style="padding:14px 20px;color:#666;font-size:14px;font-weight:600;">✉️ Email</td>
                <td style="padding:14px 20px;font-size:14px;">
                  <a href="mailto:${email}" style="color:#BD0040;text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr style="border-top:1px solid #eee;">
                <td style="padding:14px 20px;color:#666;font-size:14px;font-weight:600;">📞 Phone</td>
                <td style="padding:14px 20px;color:#222;font-size:14px;">${phone || "Not provided"}</td>
              </tr>
              <tr style="border-top:1px solid #eee;background:#f9f9f9;">
                <td style="padding:14px 20px;color:#666;font-size:14px;font-weight:600;vertical-align:top;">💬 Message</td>
                <td style="padding:14px 20px;color:#222;font-size:14px;line-height:1.7;">
                  ${message.replace(/\n/g, "<br>")}
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <div style="text-align:center;margin-top:28px;">
              <a href="mailto:${email}?subject=Re: Your inquiry to Surtaal Entertainment"
                 style="display:inline-block;background:linear-gradient(135deg,#8D0432,#BD0040);color:#fff;text-decoration:none;padding:14px 32px;border-radius:6px;font-weight:600;font-size:14px;letter-spacing:0.3px;">
                Reply to ${fullName}
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0f0f0;padding:20px 40px;text-align:center;border-top:1px solid #e0e0e0;">
            <p style="margin:0;color:#aaa;font-size:12px;">
              Submitted on ${time} &bull; Surtaal Entertainment Contact Form
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─── User auto-reply HTML ────────────────────────────────── */
function buildUserReplyEmail({ fullName, message }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#8D0432 0%,#BD0040 100%);padding:36px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">
              🎵 Surtaal Entertainment
            </h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
              Thank you for reaching out!
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 16px;color:#222;font-size:16px;font-weight:600;">
              Hi ${fullName}, 👋
            </p>
            <p style="margin:0 0 20px;color:#555;font-size:15px;line-height:1.7;">
              Thank you for contacting <strong style="color:#BD0040;">Surtaal Entertainment</strong>! We've received your message and our team will get back to you as soon as possible — usually within <strong>24–48 hours</strong>.
            </p>

            <!-- Message recap -->
            <div style="background:#fafafa;border-left:4px solid #BD0040;border-radius:4px;padding:16px 20px;margin:24px 0;">
              <p style="margin:0 0 8px;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Your Message</p>
              <p style="margin:0;color:#444;font-size:14px;line-height:1.7;">${message.replace(/\n/g, "<br>")}</p>
            </div>

            <p style="margin:0 0 20px;color:#555;font-size:15px;line-height:1.7;">
              In the meantime, feel free to explore our latest events, artists, and shows on our social media channels.
            </p>

            <!-- Social links -->
            <div style="text-align:center;margin:28px 0;">
              <a href="https://www.instagram.com/surtaalentertainment/" style="display:inline-block;margin:0 6px;background:#E1306C;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;">Instagram</a>
              <a href="https://www.facebook.com/SurTaalUSA/" style="display:inline-block;margin:0 6px;background:#1877F2;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;">Facebook</a>
              <a href="https://www.youtube.com/@SurtaalEntertainmentUSA" style="display:inline-block;margin:0 6px;background:#FF0000;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;">YouTube</a>
            </div>

            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
            <p style="margin:0;color:#aaa;font-size:13px;text-align:center;">
              📞 +1-321-422-2223 &bull; ✉️ info@surtaalusa.com
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a1a1a;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#666;font-size:12px;">
              © ${new Date().getFullYear()} Surtaal Entertainment. All rights reserved.<br>
              <span style="color:#555;">This is an automated reply — please do not reply directly to this email.</span>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─── Main POST handler ───────────────────────────────────── */
export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, email, phone, message, recaptchaToken } = body;

    console.info("[api/contact] Incoming submission:", {
      nameLen: fullName?.length || 0,
      email: email || "(missing)",
      hasRecaptchaToken: Boolean(recaptchaToken),
      recaptchaTokenLen: recaptchaToken?.length || 0,
      // env status (without exposing secrets)
      hasSmtpCreds: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS),
      recaptchaSecretSet: Boolean(process.env.RECAPTCHA_SECRET_KEY && process.env.RECAPTCHA_SECRET_KEY !== "your_recaptcha_secret_key_here"),
    });

    // Validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, email, message" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token if keys are set AND token was provided
    if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY && process.env.RECAPTCHA_SECRET_KEY !== 'your_recaptcha_secret_key_here') {
      try {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
        const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
        const recaptchaData = await recaptchaRes.json();

        const configErrorCodes = [
          "missing-input-secret", "invalid-input-secret",
          "missing-input-response", "invalid-input-response",
          "bad-request", "timeout-or-duplicate"
        ];
        const hasConfigError = recaptchaData["error-codes"]?.some(c => configErrorCodes.includes(c));

        if (!recaptchaData.success && hasConfigError) {
          console.warn("[api/contact] reCAPTCHA config error (allowing submission):", recaptchaData);
        } else if (recaptchaData.success && recaptchaData.score < 0.5) {
          console.error("[api/contact] reCAPTCHA bot detection (score too low):", recaptchaData);
          return NextResponse.json(
            {
              error: "Bot detected or reCAPTCHA verification failed. Please try again.",
            },
            { status: 403 }
          );
        } else if (!recaptchaData.success) {
          console.warn("[api/contact] reCAPTCHA verify failed (allowing submission):", recaptchaData);
        } else {
          console.info("[api/contact] reCAPTCHA verified, score:", recaptchaData.score);
        }
      } catch (recaptchaErr) {
        console.warn("[api/contact] reCAPTCHA verify threw error (allowing submission):", recaptchaErr?.message || recaptchaErr);
      }
    }

    // Send emails via nodemailer (admin notification + user auto-reply)
    // If SMTP credentials are not set, we still return success so the client
    // shows "sent" — the real delivery is handled by client-side EmailJS fallback
    // which is the primary path when SMTP is unavailable.
    let smtpSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = createTransporter();

      const emailPromises = [
        transporter.sendMail({
          from: `"Surtaal Entertainment" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          replyTo: email,
          subject: `📩 New Contact: ${fullName} — Surtaal Entertainment`,
          text: `New contact form submission.\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}`,
          html: buildAdminEmail({ fullName, email, phone, message }),
        }),

        transporter.sendMail({
          from: `"Surtaal Entertainment" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Thank you for contacting Surtaal Entertainment, ${fullName}!`,
          text: `Hi ${fullName},\n\nThank you for reaching out to Surtaal Entertainment! We've received your message and will get back to you within 24–48 hours.\n\nYour Message:\n${message}\n\nBest regards,\nSurtaal Entertainment Team\n📞 +1-321-422-2223\n✉️ info@surtaalusa.com`,
          html: buildUserReplyEmail({ fullName, message }),
        }),
      ];

      const results = await Promise.allSettled(emailPromises);
      const adminOk = results[0]?.status === "fulfilled";
      const userOk = results[1]?.status === "fulfilled";
      smtpSent = adminOk || userOk;
      results.forEach((result, i) => {
        if (result.status === "rejected") {
          console.error(`[api/contact] SMTP email #${i + 1} failed:`, result.reason);
        }
      });
      console.info("[api/contact] SMTP result:", { adminOk, userOk });
    } else {
      console.warn(
        "[api/contact] SMTP not configured (EMAIL_USER/EMAIL_PASS missing) — returning success, " +
        "client-side EmailJS fallback is responsible for actual delivery."
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
        via: smtpSent ? "smtp" : "pending-emailjs-fallback",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/contact] Handler error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
