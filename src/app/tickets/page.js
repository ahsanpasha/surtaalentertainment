"use client";
/* ═══════════════════════════════════════════════════════════
   ADDED: useRef (captcha ref), ReCAPTCHA (v2 widget),
          emailjs (@emailjs/browser), trackContactFormConversion
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import SuccessStats from "../../component/SuccessStats/SuccessStats";
import "../globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { trackPurchaseConversion, buildTransactionId, trackContactFormConversion } from "@/lib/googleAds";

// ─── Static tickets data (no API needed) ──────────────────────────────────────
const TICKETS = [
  {
    id: "101",
    artistName: "Zain Zohaib",
    dayNum: "01",
    month: "Oct",
    weekday: "Thu",
    city: "Toronto, ON",
    venue: "Queen Elizabeth Theatre\n190 Princes' Blvd Toronto, ON M6K 3C3",
    imageUrl: "/Images/Tickets/zain.webp",
    link: "https://admitone.com/events/zain-zohaib-toronto-171655",
  },
  {
    id: "102",
    artistName: "Zain Zohaib",
    dayNum: "02",
    month: "Oct",
    weekday: "Fri",
    city: "Montreal, QC",
    venue: "Oscar Peterson Concert Hall\n Concordia University, 7141 Sherbrooke Street West, Montreal, Quebec H4B 1R",
    imageUrl: "/Images/Tickets/zain.webp",
    link: "https://sulekha.com/ZainZohaibQC",
  },
  {
    id: "103",
    artistName: "Zain Zohaib",
    dayNum: "03",
    month: "Oct",
    weekday: "Sat",
    city: "Calgary, AB",
    venue: "Bella Concert Hall\n18 Mt Royal Cir SW, Calgary, AB T3E 7N5",
    imageUrl: "/Images/Tickets/zain.webp",
    link: "http://tickets.mru.ca/SurtaalEntertainment",
  },
  {
    id: "104",
    artistName: "Zain Zohaib",
    dayNum: "04",
    month: "Oct",
    weekday: "Sun",
    city: "Vancouver, BC",
    venue: "Bell Performing Arts Centre\n6250 144 St, Surrey, BC V3X 1A2",
    imageUrl: "/Images/Tickets/zain.webp",
    link: "https://www.bellperformingartscentre.com/events/zain-zohaib-qawwali-night-2026",
  },
];

export default function TicketsPage() {
  const artistFilters = [
    "All Artists",
    "Zain Zohaib",
    "Asim Azhar",
    "Fariha Pervez",
    "Asif Ali Khan Santoo",
  ];
  const [activeFilter, setActiveFilter] = useState("All Artists");

  const filteredTickets = TICKETS.filter(
    (ticket) => activeFilter === "All Artists" || ticket.artistName === activeFilter
  );

  /* ─── ADDED: Contact form state + captcha ref ─────────── */
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const recaptchaRef = useRef(null);
  const [captchaError, setCaptchaError] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ─── ADDED: Contact form submit handler ────────────────
     Flow: (a) reCAPTCHA v2 check
           (b) EmailJS send
           (c) /api/contact POST
     Fail-safe: success if EITHER EmailJS OR API succeeds
  ──────────────────────────────────────────────────────── */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setCaptchaError(false);

    try {
      const captchaToken = recaptchaRef.current?.getValue();
      if (!captchaToken) {
        setCaptchaError(true);
        setStatus(null);
        return;
      }

      let emailjsOk = false;
      let apiOk = false;

      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
          { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
        );
        emailjsOk = true;
      } catch (err) {
        console.error("[tickets] EmailJS send failed:", err);
      }

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
            "[tickets] Contact form API failed:",
            apiData?.error || `HTTP ${apiRes.status}`
          );
        }
      } catch (err) {
        console.error("[tickets] Contact form API error:", err);
      }

      if (emailjsOk || apiOk) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        recaptchaRef.current?.reset();
        trackContactFormConversion();
      } else {
        setStatus("error");
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      console.error("[tickets] Contact form error:", error);
      setStatus("error");
      recaptchaRef.current?.reset();
    }
  };

  const handleBuyTicketsClick = (ticket, e) => {
    if (ticket.link) {
      e.preventDefault();
      trackPurchaseConversion({
        value: 1.0,
        currency: "USD",
        transactionId: buildTransactionId(`ticket_${ticket.id}`),
        ticket_id: ticket.id,
        artist: ticket.artistName,
        city: ticket.city,
      });
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.open(ticket.link, "_blank", "noopener,noreferrer");
        }
      }, 150);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 0,
      easing: "ease-out-cubic",
    });
    AOS.refresh();

    if (typeof window !== "undefined" && window.location.hash === "#artist-filter-bar") {
      const target = document.getElementById("artist-filter-bar");
      if (target) {
        setTimeout(() => {
          const rect = target.getBoundingClientRect();
          const scrollToY = window.scrollY + rect.top - 24;
          if (window.lenis && typeof window.lenis.scrollTo === "function") {
            window.lenis.scrollTo(scrollToY, { duration: 1.2 });
          } else {
            window.scrollTo({ top: scrollToY, behavior: "smooth" });
          }
        }, 350);
      }
    }
  }, []);

  return (
    <main>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="ticket-media-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 H 1 V 0.373 A 0.09,0.126 0 0,0 1,0.627 V 1 H 0 Z" />
          </clipPath>
        </defs>
      </svg>


      <div className="AboutusMain">
        <div className="Celebrate" data-aos="fade-down">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">Tickets</p>
        </div>
        <p className="FeelText" data-aos="fade-down" data-aos-delay="200">
          What is <span>Seat</span> for an <br /><span> Unforgettable </span>Experience
        </p>
        <p className="aboutuspara" data-aos="fade-down" data-aos-delay="400">
          From sold-out concerts to unforgettable cultural celebrations, reserve your seat for Surtaal&apos;s upcoming events.
        </p>
      </div>


      <div className="discoverlivemusic">
        <div className="ServicesDiv" data-aos="fade-down">
          <div className="CircleServices"></div>
          <p className="ServicesText">Upcoming Events</p>
        </div>
        <p className="WhatWeOffer" data-aos="fade-down">
          Discover <span>Live Music Events </span>
        </p>
        <p className="ServiceDescTop" data-aos="fade-down">
          Discover our latest concerts and live performances happening across the USA &amp; Canada. Select an event below to view details, seating options, and ticket availability.
        </p>

        <div className="artist-filter-bar" id="artist-filter-bar">
          {artistFilters.map((artist) => (
            <button
              key={artist}
              type="button"
              className={`artist-filter-tab${activeFilter === artist ? " active" : ""}`}
              onClick={() => setActiveFilter(artist)}
            >
              {artist}
            </button>
          ))}
        </div>


        {filteredTickets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1rem', width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '20px', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(141,4,50,0.1), rgba(189,0,64,0.15))', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#BD0040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M9 16l2 2 4-4"></path>
              </svg>
            </div>
            <h3 style={{ color: '#000', fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '600' }}>No Events Scheduled</h3>
            <p style={{ color: '#000', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              There are currently no tickets available for <strong style={{ color: '#BD0040' }}>{activeFilter === "All Artists" ? "any artist" : activeFilter}</strong>. Please check back later.
            </p>
          </div>
        ) : (
          <>
            {/* Special heading for Zain Zohaib */}
            {filteredTickets.some((t) => t.artistName === "Zain Zohaib") && (
              <h2 className="zain-canada-heading" style={{ color: "#272727" }} data-aos="fade-down">
                <span className="zain-red">Zain Zohaib </span>Live in
                <br />
                <span className="zain-red">Canada </span>2026
              </h2>
            )}
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id} className="ticket-card-container-new-inner-new" style={{ marginBottom: "2rem" }}>
                <div className="ticket-card-container-new">
                  <div className="ticket-card-date">
                    <p className="ticket-day-num">{ticket.dayNum}</p>
                    <div className="ticket-month-day">
                      <p className="ticket-month">{ticket.month}</p>
                      <p className="ticket-weekday">{ticket.weekday}</p>
                    </div>
                  </div>
                  <div className="ticket-card-divider"></div>

                  <div className="ticket-card-info">
                    <p className="ticket-artist-name">{ticket.artistName}</p>
                    <p className="ticket-city">{ticket.city}</p>
                    <p className="ticket-venue">
                      {ticket.venue.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                    {ticket.link && (
                      <button
                        type="button"
                        className="ticket-buy-btn"
                        onClick={(e) => handleBuyTicketsClick(ticket, e)}
                      >
                        Buy Tickets Now
                        <img src="/Images/Navbar/arrow.svg" alt="" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="ticket-card-media-inner">
                  <img
                    src={ticket.imageUrl}
                    alt={ticket.artistName}
                    className="ticket-card-image"
                  />
                </div>
              </div>
            ))}
          </>
        )}

      </div>




      <div className="offerartist">
        <img
          src="/Images/Tickets/choose.webp"
          className="offerartistimg"
          alt="About Surtaal"
          loading="lazy"
          decoding="async"
        />
        <div className="SecondAboutartist" data-aos="fade-down" >
          <div className="ServicesDiv" style={{ width: "fit-content" }}>
            <div className="CircleServices"></div>
            <p className="ServicesText">Why Surtaal</p>
          </div>
          <p className="BringingText" style={{ maxWidth: "unset" }}>
            Why Choose <span>Surtaal</span>?
          </p>

          <div className="mainpointdiv">
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Secure &amp; hassle-free online booking</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Official event tickets</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Premium venues across the USA &amp; Canada</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">
                Instant booking confirmation
              </p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Dedicated customer support</p>
            </div>
          </div>
        </div>
      </div>


      <div className="OurStorySection" >
        <div
          data-aos="fade-down"
          className="storyDiv" style={{ width: "fit-content" }}>
          <div className="CircleServices"></div>
          <p className="storytext">our story</p>
        </div>
        <p
          data-aos="fade-down"
          className="storyline">
          Music Unites Here with <span>Surtaal</span>
        </p>
        <p
          data-aos="fade-down"
          className="foundedtext">
          Founded in 2019, Surtaal Entertainment came into being with the
          sole purpose of promoting the best of the best in the music world
          through live events in North America.
        </p>
        <SuccessStats />
      </div>


      <div className="contact-section">
        {/* LEFT SIDE */}
        <div className="contact-left" data-aos="fade-right" >
          <div className="ServicesDiv" style={{ width: "fit-content" }}>
            <div className="CircleServices"></div>
            <p className="ServicesText">contact us</p>
          </div>
          <p className="BringingText">
            Need <span>Assistance</span>?
          </p>
          <p className="AboutDesc">
            We&apos;d love to hear from you! Reach out to explore collaboration opportunities with Surtaal Entertainment. Let&apos;s bring unforgettable South Asian music experiences to the world.
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
        <div className="form-border" data-aos="fade-left" >
          <form className="contact-form" onSubmit={handleFormSubmit}>
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
                    onChange={handleFormChange}
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
                      onChange={handleFormChange}
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
                      onChange={handleFormChange}
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
                    onChange={handleFormChange}
                    className="inputbox textareadesign"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════
                ADDED: Google reCAPTCHA v2 widget
                ══════════════════════════════════════════════ */}
            <div
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
