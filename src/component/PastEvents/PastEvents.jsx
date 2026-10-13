"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PastEvents.css";

const PAST_EVENTS = [
  {
    id: "pe-101",
    artist: "Zain Zohaib",
    day: "01",
    month: "Oct",
    year: "2026",
    weekday: "Thu",
    city: "Toronto, ON",
    venue: "Queen Elizabeth Theatre",
    address: "190 Princes' Blvd Toronto, ON M6K 3C3",
    image: "/Images/Tickets/zain.webp",
    status: "Sold Out",
    highlight: "100% Attendance • Full House",
  },
  {
    id: "pe-102",
    artist: "Zain Zohaib",
    day: "02",
    month: "Oct",
    year: "2026",
    weekday: "Fri",
    city: "Montreal, QC",
    venue: "Oscar Peterson Concert Hall",
    address: "Concordia University, 7141 Sherbrooke St W, Montreal, QC",
    image: "/Images/Tickets/01.webp",
    status: "Sold Out",
    highlight: "100% Attendance • Full House",
  },
  {
    id: "pe-103",
    artist: "Zain Zohaib",
    day: "03",
    month: "Oct",
    year: "2026",
    weekday: "Sat",
    city: "Calgary, AB",
    venue: "Bella Concert Hall",
    address: "18 Mt Royal Cir SW, Calgary, AB T3E 7N5",
    image: "/Images/Tickets/ZainZohaib3.webp",
    status: "Sold Out",
    highlight: "100% Attendance • Full House",
  },
  {
    id: "pe-104",
    artist: "Zain Zohaib",
    day: "04",
    month: "Oct",
    year: "2026",
    weekday: "Sun",
    city: "Vancouver, BC",
    venue: "Bell Performing Arts Centre",
    address: "6250 144 St, Surrey, BC V3X 1A2",
    image: "/Images/Tickets/03.webp",
    status: "Sold Out",
    highlight: "100% Attendance • Full House",
  },
];

export default function PastEvents() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="past-events-section" id="past-events">
      {/* Badge */}
      <div className="ServicesDiv" style={{ width: "fit-content" }} data-aos="fade-down">
        <div className="CircleServices"></div>
        <p className="ServicesText">past events</p>
      </div>

      {/* Heading */}
      <h2 className="WhatWeOffer" data-aos="fade-down">
        Past <span>Successful Events</span>
      </h2>

      {/* Description */}
      <p className="ServiceDescTop" data-aos="fade-down">
        Relive the historic moments and soul-stirring energy of Surtaal&apos;s sold-out performances.
        Discover the landmark concerts that celebrated South Asian music and culture across North America.
      </p>

      {/* Featured Tour Banner */}
      <div className="past-events-tour-banner" data-aos="fade-up">
        <div className="tour-banner-left">
          {/* <div className="tour-pulse-dot"></div> */}
          <h3 className="tour-banner-title">
            <span>Zain Zohaib</span> Live in Canada 2026
          </h3>
        </div>
        <div className="tour-banner-stats">
          <span className="tour-stat-pill">4 Landmark Cities</span>
          <span className="tour-stat-pill">100% Sold Out Tour</span>
        </div>
      </div>

      {/* Events List */}
      <div className="past-events-list">
        {PAST_EVENTS.map((event, index) => (
          <div key={event.id} className="past-event-item" data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="past-event-card">
              <div className="past-event-left-wrapper">
                <div className="past-event-top-mobile-row">
                  {/* Date Column */}
                  <div className="past-event-date-col">
                    <p className="past-event-day-num">{event.day}</p>
                    <div className="past-event-month-col">
                      <p className="past-event-month">
                        {event.month} <span className="past-event-year">{event.year}</span>
                      </p>
                      <p className="past-event-weekday">{event.weekday}</p>
                    </div>
                  </div>

                  {/* Thumbnail Poster */}
                  <div className="past-event-poster">
                    <img src={event.image} alt={`${event.artist} at ${event.city}`} loading="lazy" />
                    <span className="past-event-poster-tag">Completed</span>
                  </div>
                </div>

                <div className="past-event-divider-line"></div>

                {/* Location & Details */}
                <div className="past-event-info">
                  <p className="past-event-artist-tag">{event.artist} • Qawwali Night</p>
                  <p className="past-event-city">{event.city}</p>
                  <p className="past-event-venue">
                    <strong>{event.venue}</strong> — {event.address}
                  </p>
                </div>
              </div>

              {/* Status / Sold Out Badge */}
              <div className="past-event-right-status">
                <div className="past-event-soldout-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{event.status}</span>
                </div>
                <div className="past-event-attendance-pill">
                  <span></span>
                  {event.highlight}
                </div>
              </div>
            </div>

            {index < PAST_EVENTS.length - 1 && <div className="past-event-line"></div>}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="past-events-bottom-cta" data-aos="fade-up">
        <button
          type="button"
          className="past-events-contact-btn"
          onClick={() => router.push("/contact-us")}
        >
          Book An Artist For Your Event
          <img src="/Images/Navbar/arrow.svg" alt="" />
        </button>
        <button
          type="button"
          className="past-events-secondary-btn"
          onClick={() => router.push("/tickets")}
        >
          View Event Schedule
          <img src="/Images/Navbar/arrowred.svg" alt="" />
        </button>
      </div>
    </section>
  );
}
