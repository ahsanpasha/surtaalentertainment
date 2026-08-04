"use client";
import { useEffect, useState } from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import "../globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from '@emailjs/browser';
import { trackContactFormConversion } from "@/lib/googleAds";

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

function ContactFormContent() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [recaptchaReady, setRecaptchaReady] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      let recaptchaToken = "";
      try {
        if (executeRecaptcha && recaptchaReady) {
          recaptchaToken = await Promise.race([
            executeRecaptcha("contact_form"),
            new Promise((_, rej) => setTimeout(() => rej(new Error("reCAPTCHA timeout")), 3000)),
          ]);
        }
      } catch (recaptchaErr) {
        console.warn("reCAPTCHA skipped (invalid/blocked/timeout):", recaptchaErr?.message || recaptchaErr);
        setRecaptchaReady(false);
        recaptchaToken = "";
      }

      let sentOk = false;
      let needsEmailjsFallback = true;

      try {
        const apiRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, recaptchaToken }),
        });
        const apiData = await apiRes.json().catch(() => ({}));
        if (apiRes.ok && (apiData.success === true || apiData.message)) {
          // API route returns success, but check if it actually sent mail via SMTP
          // (via: "smtp" means nodemailer delivered; via: "pending-emailjs-fallback" means SMTP not configured
          // and we should try client-side EmailJS now)
          if (apiData.via === "smtp") {
            sentOk = true;
            needsEmailjsFallback = false;
          } else {
            console.info("API route success but SMTP not configured — trying EmailJS now.");
          }
        } else {
          console.warn("API route send failed, falling back to EmailJS:", apiData?.error || `HTTP ${apiRes.status}`);
        }
      } catch (apiErr) {
        console.warn("API route send error, falling back to EmailJS:", apiErr?.message || apiErr);
      }

      if (needsEmailjsFallback) {
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey &&
            serviceId !== "YOUR_SERVICE_ID" &&
            templateId !== "YOUR_TEMPLATE_ID" &&
            publicKey !== "YOUR_PUBLIC_KEY") {
          const templateParams = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          };
          const res = await emailjs.send(serviceId, templateId, templateParams, { publicKey });
          if (res.status === 200) {
            sentOk = true;
            console.info("EmailJS direct send succeeded.");
          }
        } else {
          if (!sentOk) {
            throw new Error("EmailJS keys not configured in .env.local (NEXT_PUBLIC_EMAILJS_SERVICE_ID / _TEMPLATE_ID / _PUBLIC_KEY)");
          }
        }
      }

      if (sentOk) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        trackContactFormConversion();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form send error:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey && publicKey !== "YOUR_PUBLIC_KEY") {
      try {
        emailjs.init({ publicKey });
      } catch (e) {
        console.warn("EmailJS init warning:", e?.message || e);
      }
    }
  }, []);

  return (
    <main>
      <div className="AboutusMain">
        <div className="Celebrate" data-aos="fade-down">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">Contact Us Now</p>
        </div>
        <p className="FeelText" data-aos="fade-down" data-aos-delay="200">
          Connect with <span> Surtaal </span><br /> Entertainment
        </p>
      </div>
      <div className="contact-section">
        {/* LEFT SIDE */}
        <div className="contact-left" data-aos="fade-right">
          <div className="ServicesDiv" style={{ width: "fit-content" }}>
            <div className="CircleServices"></div>
            <p className="ServicesText">contact us</p>
          </div>
          <p className="BringingText">
            Get In <span>Touch</span>
          </p>
          <p className="AboutDesc">
            We&apos;d love to hear from you! Reach out to explore collaboration
            opportunities with Surtaal Entertainment. Let&apos;s bring unforgettable
            South Asian music experiences to the world.
          </p>
          <div className="maindivstructure">
            <a href="tel:+13214222223" className="contact-item-my" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src="/Images/ContactUs/phone.svg"
                className="phoneicon"
                alt=""
              />
              <div className="contact-div-new">
                <p className="contact-itemlabel">Phone</p>
                <p className="contact-itemvalue">+1-321-422-2223</p>
              </div>
            </a>

            <a href="mailto:info@surtaalusa.com" className="contact-item-my" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src="/Images/ContactUs/email.svg"
                className="phoneicon"
                alt=""
              />
              <div className="contact-div-new">
                <p className="contact-itemlabel">Email</p>
                <p className="contact-itemvalue">info@surtaalusa.com</p>
              </div>
            </a>
          </div>
          <hr className="linenew" />

          <div className="socials">
            <p className="followtext">Follow Us On:</p>
            <div className="icons">

              {/* Gradient (sirf ek dafa define karo) */}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="iconGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8D0432" />
                    <stop offset="100%" stopColor="#BD0040" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="socialicondiv">
                <a href="https://www.tiktok.com/@surtaalentusa" target="_blank" rel="noopener noreferrer">
                  <FaTiktok className="fillcolor" />
                </a>
              </div>

              <div className="socialicondiv">
                <a href="https://www.instagram.com/surtaalentertainment/?hl=en" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="fillcolor" />
                </a>
              </div>

              <div className="socialicondiv">
                <a href="https://www.facebook.com/SurTaalUSA/" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="fillcolor" />
                </a>
              </div>

              <div className="socialicondiv">
                <a href="https://www.youtube.com/@SurtaalEntertainmentUSA" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="fillcolor" />
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="form-border" data-aos="fade-left">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div>
              <h3 className="leaveamessage">Leave a Message</h3>
              <p className="form-sub">
                For assistance with inquiries or bookings, contact us directly.
              </p>

              <div className="newinputdivmine">
                <div className="inputdivnew">
                  <p className="labelofinput">Full Name</p>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="inputbox"
                    placeholder="Enter Full Name"
                    required
                  />
                </div>

                <div className="formrow">
                  <div className="inputdivnew">
                    <p className="labelofinput">Email</p>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="inputbox"
                      placeholder="Enter Email"
                      style={{ textTransform: 'none' }}
                      required
                    />
                  </div>
                  <div className="inputdivnew">
                    <p className="labelofinput">Phone</p>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="inputbox"
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>
                </div>
                <div className="inputdivnew">
                  <p className="labelofinput">Message</p>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="inputbox textareadesign"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            {status === "success" && <p style={{ color: "#00C853", marginBottom: "1rem", fontWeight: "600", textAlign: "center" }}>Message sent successfully!</p>}
            {status === "error" && <p style={{ color: "#ff4444", marginBottom: "1rem", fontWeight: "600", textAlign: "center" }}>Failed to send message. Please try again or email info@surtaalusa.com directly.</p>}
            <button type="submit" className="sendmessage" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function ContactUsPage() {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const hasRecaptcha = Boolean(
    reCaptchaKey &&
      reCaptchaKey !== "dummy_key" &&
      reCaptchaKey !== "YOUR_RECAPTCHA_SITE_KEY"
  );

  if (typeof window !== "undefined") {
    console.info("[ContactUs] Env check:", {
      hasRecaptcha,
      reCaptchaKeyPreview: reCaptchaKey
        ? reCaptchaKey.slice(0, 8) + "…" + reCaptchaKey.slice(-4)
        : "(empty)",
      emailjsService: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? "set" : "MISSING",
      emailjsTemplate: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? "set" : "MISSING",
      emailjsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? "set" : "MISSING",
    });
  }

  if (!hasRecaptcha) {
    return <ContactFormContent />;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey}
      container={{ parameters: { hl: "en" } }}
      scriptProps={{
        async: true,
        defer: true,
        onError: () => {
          console.warn(
            "[ContactUs] reCAPTCHA script failed to load — form will proceed without token."
          );
        },
      }}
    >
      <ContactFormContent />
    </GoogleReCaptchaProvider>
  );
}
