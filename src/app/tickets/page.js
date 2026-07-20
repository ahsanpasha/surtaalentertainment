"use client";

import { useState } from "react";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
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

  return (
    <main>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="ticket-media-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 H 1 V 0.373 A 0.09,0.126 0 0,0 1,0.627 V 1 H 0 Z" />
          </clipPath>
          <clipPath id="ticket-media-clip-inner" clipPathUnits="objectBoundingBox">
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
          What is <span>Seat</span> for an <br /><span>Unforgettable</span>Experience
        </p>
        <p className="aboutuspara">
          From sold-out concerts to unforgettable cultural celebrations, reserve your seat for Surtaal USA's upcoming events.
        </p>
      </div>


      <div className="discoverlivemusic">
      <div className="ServicesDiv">
          <div className="CircleServices"></div>
          <p className="ServicesText">Upcoming Events</p>
        </div>
        <p className="WhatWeOffer">
        Discover <span>Live Music Events</span>Across the <span>USA</span>
        </p>
        <p className="ServiceDescTop">
        Discover our latest concerts and live performances happening across the USA. Select an event below to view details, seating options, and ticket availability.
        </p>

        <div className="artist-filter-bar">
          {artistFilters.map((artist) => (
            <button
              key={artist}
              type="button"
              className={`artist-filter-tab${
                activeFilter === artist ? " active" : ""
              }`}
              onClick={() => setActiveFilter(artist)}
            >
              {artist}
            </button>
          ))}
        </div>
<div className="ticket-card-media">
        <div className="ticket-event-card">
          <div className="ticket-card-date">
            <p className="ticket-day-num">21</p>
            <div className="ticket-month-day">
              <p className="ticket-month">May</p>
              <p className="ticket-weekday">Sun</p>
            </div>
          </div>

          <div className="ticket-card-divider"></div>

          <div className="ticket-card-info">
            <p className="ticket-artist-name">Asim Azhar</p>
            <p className="ticket-city">Dallas, TX</p>
            <p className="ticket-venue">
              Hill Performance Hall, Eisemann Centre
              <br />
              2351 Performance Dr, Richardson, TX 75082
            </p>
            <button type="button" className="ticket-buy-btn">
              Buy Tickets Now
              <img src="/Images/Navbar/arrow.svg" alt="" />
            </button>
          </div>

         
        </div>
        <div >
            <div className="ticket-card-media-inner">
              <img
                src="/Images/EventinSurtaal/arist06.webp"
                alt="Asim Azhar"
                className="ticket-card-image"
              />
            </div>
          </div>
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
          Founded in 2019, Surtaal Entertainment USA came into being with the
          sole purpose of promoting the best of the best in the music world
          through live events in North America.
        </p>
        <div className="SuccessContainer">
          <div className="SuccessDiv">
            <p className="SuccessNum">
              7<span>+</span>
            </p>
            <p className="SuccessLabel">Years Experience</p>
          </div>
          <div className="SuccessDiv">
            <p className="SuccessNum">
              100<span>+</span>
            </p>
            <p className="SuccessLabel">Successful Event</p>
          </div>
          <div className="SuccessDiv">
            <p className="SuccessNum">
              50<span>+</span>
            </p>
            <p className="SuccessLabel">Exclusive Artists</p>
          </div>
          <div className="SuccessDiv">
            <p className="SuccessNum">
              60<span>+</span>
            </p>
            <p className="SuccessLabel">Professional Team</p>
          </div>
        </div>
      </div>


      <div className="contact-section">
        {/* LEFT SIDE */}
        <div className="contact-left">
          <div className="ServicesDiv" style={{ width: "fit-content" }}>
            <div className="CircleServices"></div>
            <p className="ServicesText">contact us</p>
          </div>
          <p className="BringingText">
            Get In <span>Touch</span>
          </p>
          <p className="AboutDesc">
            We'd love to hear from you! Reach out to explore collaboration
            opportunities with Surtaal Entertainment. Let's bring unforgettable
            South Asian music experiences to the world.
          </p>
          <div className="maindivstructure">
            <div className="contact-item-my">
              <img
                src="/Images/ContactUs/phone.svg"
                className="phoneicon"
                alt=""
              />
              <div className="contact-div-new">
                <p className="contact-itemlabel">Phone</p>
                <p className="contact-itemvalue">+1-321-422-2223</p>
              </div>
            </div>

            <div className="contact-item-my">
              <img
                src="/Images/ContactUs/email.svg"
                className="phoneicon"
                alt=""
              />
              <div className="contact-div-new">
                <p className="contact-itemlabel">Email</p>
                <p className="contact-itemvalue">info@surtaalusa.com</p>
              </div>
            </div>
          </div>
          <hr className="linenew" />

          <div className="socials">
            <p className="followtext">Follow Us On:</p>
            <div className="icons">
              <div className="socialicondiv">
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

                <RiTwitterXFill className="fillcolor" />
              </div>

              <div className="socialicondiv">
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

                <FaInstagram className="fillcolor" />
              </div>

              <div className="socialicondiv">
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

                <FaFacebook className="fillcolor" />
              </div>

              <div className="socialicondiv">
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

                <FaMeta className="fillcolor" />
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
