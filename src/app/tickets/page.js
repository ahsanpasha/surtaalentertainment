"use client";

import { useState, useEffect } from "react";

import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

import SuccessStats from "../../component/SuccessStats/SuccessStats";
import "../globals.css";

export default function TicketsPage() {
  const artistFilters = [
    "All Artists",
    "Zain Zohaib",
    "Asim Azhar",
    "Fariha Pervez",
    "Asif Ali Khan Santoo",
  ];
  const [activeFilter, setActiveFilter] = useState("All Artists");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await fetch("/api/tickets");
        const data = await res.json();
        setTickets(data);
      } catch (error) {
        console.error("Failed to load tickets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(
    (ticket) => activeFilter === "All Artists" || ticket.artistName === activeFilter
  );

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
        <div className="Celebrate">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">Tickets</p>
        </div>
        <p className="FeelText">
          What is <span>Seat</span> for an <br /><span> Unforgettable </span>Experience
        </p>
        <p className="aboutuspara">
          From sold-out concerts to unforgettable cultural celebrations, reserve your seat for Surtaal's upcoming events.
        </p>
      </div>


      <div className="discoverlivemusic">
        <div className="ServicesDiv">
          <div className="CircleServices"></div>
          <p className="ServicesText">Upcoming Events</p>
        </div>
        <p className="WhatWeOffer">
          Discover <span>Live Music Events </span>Across the
          <br /><span>USA & Canada</span>
        </p>
        <p className="ServiceDescTop">
          Discover our latest concerts and live performances happening across the USA & Canada. Select an event below to view details, seating options, and ticket availability.
        </p>

        <div className="artist-filter-bar">
          {artistFilters.map((artist) => (
            <button
              key={artist}
              type="button"
              className={`artist-filter-tab${activeFilter === artist ? " active" : ""
                }`}
              onClick={() => setActiveFilter(artist)}
            >
              {artist}
            </button>
          ))}
        </div>


        {loading ? (
          <p style={{ textAlign: 'center', color: '#fff', marginTop: '2rem' }}>Loading tickets...</p>
        ) : filteredTickets.length === 0 ? (
          <div style={{ textAlign: 'center', margin: '4rem auto', padding: '3rem 2rem', width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '20px', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(141,4,50,0.1), rgba(189,0,64,0.15))', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#BD0040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M9 16l2 2 4-4"></path>
              </svg>
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '600' }}>No Events Scheduled</h3>
            <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
              There are currently no tickets available for <strong style={{color: '#fff'}}>{activeFilter === "All Artists" ? "any artist" : activeFilter}</strong>. Please check back later.
            </p>
            {activeFilter !== "All Artists" && (
              <button 
                onClick={() => setActiveFilter("All Artists")}
                style={{ padding: '14px 28px', background: 'linear-gradient(90deg, #8D0432, #BD0040)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 20px rgba(189,0,64,0.2)' }}
                onMouseOver={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 12px 25px rgba(189,0,64,0.3)'; }}
                onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 8px 20px rgba(189,0,64,0.2)'; }}
              >
                View All Events
              </button>
            )}
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card-container-new-inner-new" style={{ marginBottom: "2rem" }}>
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
                  <button type="button" className="ticket-buy-btn">
                    Buy Tickets Now
                    <img src="/Images/Navbar/arrow.svg" alt="" />
                  </button>
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
          ))
        )}

      </div>



      <div className="offerartist">
        <img
          src="/ImagesOpt/Tickets/choose.webp"
          className="offerartistimg"
          alt="About Surtaal"
        />
        <div className="SecondAboutartist">
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
              <p className="livetext">Secure & hassle-free online booking</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Official event tickets</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Premium venues across the USA & Canada</p>
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
          {/* <button
            className="SeeHowbtn"
            style={{ margin: 0, width: "fit-content" }}
          >
            Read More
            <img src="/Images/Navbar/arrow.svg" alt="" />
          </button> */}
        </div>
      </div>










      <div className="OurStorySection">
        <div className="storyDiv" style={{ width: "fit-content" }}>
          <div className="CircleServices"></div>
          <p className="storytext">our story</p>
        </div>
        <p className="storyline">
          Music Unites Here with <span>Surtaal</span>
        </p>
        <p className="foundedtext">
          Founded in 2019, Surtaal Entertainment came into being with the
          sole purpose of promoting the best of the best in the music world
          through live events in North America.
        </p>
        <SuccessStats />
      </div>


      <div className="contact-section">
        {/* LEFT SIDE */}
        <div className="contact-left">
          <div className="ServicesDiv" style={{ width: "fit-content" }}>
            <div className="CircleServices"></div>
            <p className="ServicesText">contact us</p>
          </div>
          <p className="BringingText">
            Need <span>Assistance</span>?
          </p>
          <p className="AboutDesc">
            We'd love to hear from you! Reach out to explore collaboration opportunities with Surtaal Entertainment. Let's bring unforgettable South Asian music experiences to the world.
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
        <div className="form-border">
          <div className="contact-form">
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
                    className="inputbox"
                    placeholder="Enter Full Name"
                  />
                </div>

                <div className="formrow">
                  <div className="inputdivnew">
                    <p className="labelofinput">Email</p>
                    <input
                      type="email"
                      className="inputbox"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="inputdivnew">
                    <p className="labelofinput">Phone</p>
                    <input
                      type="number"
                      className="inputbox"
                      placeholder="Enter Phone Number"
                    />
                  </div>
                </div>
                <div className="inputdivnew">
                  <p className="labelofinput">Message</p>
                  <textarea
                    className="inputbox textareadesign"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              </div>
            </div>
            <button className="sendmessage">Send Message</button>
          </div>
        </div>
      </div>
    </main>
  );
}
