"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const EVENTS = [
  {
    day: "01",
    month: "Oct",
    weekday: "Thu",
    city: "Toronto, ON",
    venue: "Queen Elizabeth Theatre",
    address: "190 Princes' Blvd Toronto, ON M6K 3C3",
    link: "https://admitone.com/events/zain-zohaib-toronto-171655",
  },
  {
    day: "02",
    month: "Oct",
    weekday: "Fri",
    city: "TBD",
    venue: "",
    address: "",
    link: "",
  },
  {
    day: "03",
    month: "Oct",
    weekday: "Sat",
    city: "Calgary, AB",
    venue: "Bella Concert Hall",
    address: "18 Mt Royal Cir SW, Calgary, AB T3E 7N5",
    link: "",
  },
  {
    day: "04",
    month: "Oct",
    weekday: "Sun",
    city: "Vancouver, BC",
    venue: "Bell Performing Arts Centre",
    address: "6250 144 St, Surrey, BC V3X 1A2",
    link: "https://www.bellperformingartscentre.com/events/zain-zohaib-qawwali-night-2026",
  },
];

export default function TourEvents() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="Oureventdiv">
      <div className="ServicesDiv" style={{ width: "fit-content" }} data-aos="fade-down">
        <div className="CircleServices"></div>
        <p className="ServicesText">our events</p>
      </div>
      <p className="WhatWeOffer" data-aos="fade-down">
        <span>Zain Zohaib</span> Canada Tour <span>2026</span>
      </p>
      <div className="MainEventDiv">
        {EVENTS.map((event, index) => (
          <div key={index} data-aos="fade-right">
            <div className="eventdetail">
              <div className="eventDateCol">
                <p className="event21">{event.day}</p>
                <div className="eventMonthDayCol">
                  <p className="eventMonth">{event.month}</p>
                  <p className="eventDay">{event.weekday}</p>
                </div>
              </div>
              <img src="/Images/EventinSurtaal/linesmall.svg" className="linetourrrrrr" alt="" />
              <div className="spacebtwdiv">
                <div className="eventLocationCol">
                  <p className="eventCity">{event.city}</p>
                  <p className="eventAddress">
                    {event.venue}
                    {event.venue && event.address && <br />}
                    {event.address}
                  </p>
                </div>
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <button type="button" className="BuyTicketsbtn">
                      Buy Tickets Now
                      <img src="/Images/Navbar/arrowred.svg" alt="" className="arrow-red" />
                      <img src="/Images/Navbar/arrow.svg" alt="" className="arrow-white" />
                    </button>
                  </a>
                )}
              </div>
            </div>
            {index < EVENTS.length - 1 && <div className="linetour"></div>}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="SeeHowbtn"
        data-aos="fade-down"
        style={{ margin: 0 }}
        onClick={() => router.push("/tickets")}
      >
        View All Events
        <img src="/Images/Navbar/arrow.svg" alt="" />
      </button>
    </div>
  );
}
