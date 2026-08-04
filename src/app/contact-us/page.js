"use client";
/* ═══════════════════════════════════════════════════════════
   ADDED: import useRef (for captcha widget ref),
          ReCAPTCHA (v2 checkbox widget),
          emailjs (@emailjs/browser for client-side email send)
   ═══════════════════════════════════════════════════════════ */
import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import "../globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { trackContactFormConversion } from "@/lib/googleAds";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  /* ─── ADDED: Captcha ref + captcha error state ───────────── */
  const recaptchaRef = useRef(null);
  const [captchaError, setCaptchaError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ═══════════════════════════════════════════════════════════
     UPDATED: handleSubmit — new flow:
       (a) Validate reCAPTCHA v2 (client-side token check)
       (b) Send via EmailJS (client-side)
       (c) POST to existing /api/contact (with captcha token for server verify)
       Reset captcha + form on success, show errors if any fails
     ═══════════════════════════════════════════════════════════ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setCaptchaError(false);

    try {
      /* ── (a) reCAPTCHA v2 check ──────────────────────── */
      const captchaToken = recaptchaRef.current?.getValue();
      if (!captchaToken) {
        setCaptchaError(true);
        setStatus(null);
        return;
      }

      let emailjsOk = false;
      let apiOk = false;

      /* ── (b) EmailJS send (client-side) ─────────────────── */
      try {
        const templateParams = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        };
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          templateParams,
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          }
        );
        emailjsOk = true;
      } catch (err) {
        console.error("EmailJS send failed:", err);
      }

      /* ── (c) Existing /api/contact call (with captcha token) ── */
      try {
        const apiRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, captchaToken }),
        });
        const apiData = await apiRes.json().catch(() => ({}));
        if (apiRes.ok && (apiData.success === true || apiData.message)) {
          apiOk = true;
        } else {
          console.warn(
            "Contact form API failed:",
            apiData?.error || `HTTP ${apiRes.status}`
          );
        }
      } catch (err) {
        console.error("Contact form API error:", err);
      }

      /* ── Outcome ──────────────────────────────────────── */
      if (emailjsOk || apiOk) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        recaptchaRef.current?.reset();
        if (emailjsOk && apiOk) {
          trackContactFormConversion();
        } else if (!emailjsOk) {
          console.warn("EmailJS failed, but API succeeded — still tracking conversion");
          trackContactFormConversion();
        }
      } else {
        setStatus("error");
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      console.error("Contact form send error:", error);
      setStatus("error");
      recaptchaRef.current?.reset();
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main>
      <div className="AboutusMain">
        <div className="Celebrate" data-aos="fade-down">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">Contact Us Now</p>
        </div>
        <p className="FeelText" data-aos="fade-down" data-aos-delay="200">
          Connect with <span> Surtaal </span>
          <br /> Entertainment
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
            <a
              href="tel:+13214222223"
              className="contact-item-my"
              style={{ textDecoration: "none", color: "inherit" }}
            >
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

            <a
              href="mailto:info@surtaalusa.com"
              className="contact-item-my"
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
              <svg width="0" height="0">
                <defs>
                  <linearGradient
                    id="iconGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8D0432" />
                    <stop offset="100%" stopColor="#BD0040" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="socialicondiv">
                <a
                  href="https://www.tiktok.com/@surtaalentusa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok className="fillcolor" />
                </a>
              </div>

              <div className="socialicondiv">
                <a
                  href="https://www.instagram.com/surtaalentertainment/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="fillcolor" />
                </a>
              </div>

              <div className="socialicondiv">
                <a
                  href="https://www.facebook.com/SurTaalUSA/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="fillcolor" />
                </a>
              </div>

              <div className="socialicondiv">
                <a
                  href="https://www.youtube.com/@SurtaalEntertainmentUSA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                      style={{ textTransform: "none" }}
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

            {/* ══════════════════════════════════════════════
                ADDED: Google reCAPTCHA v2 widget (above submit button)
                ══════════════════════════════════════════════ */}
            <div
              className="recaptcha-wrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1.5rem 0 0.5rem",
              }}
            >
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={() => setCaptchaError(false)}
              />
            </div>
            {captchaError && (
              <p
                style={{
                  color: "#ff4444",
                  marginBottom: "1rem",
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                Please verify that you are not a robot.
              </p>
            )}
            {/* ══════════════════════════════════════════════ */}

            {status === "success" && (
              <p
                style={{
                  color: "#00C853",
                  marginBottom: "1rem",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p
                style={{
                  color: "#ff4444",
                  marginBottom: "1rem",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Failed to send message. Please try again or email
                info@surtaalusa.com directly.
              </p>
            )}
            <button
              type="submit"
              className="sendmessage"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
