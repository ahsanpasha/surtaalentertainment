"use client"
import { useRouter } from "next/navigation";
const EVENTS = [
  {
    day: "21",
    month: "May",
    weekday: "Sun",
    city: "Boston, MA",
    venue: "Berklee Performing Arts Centre",
    address: "136 Massachusetts Avenue, Boston, MA 02115",
  },
  {
    day: "22",
    month: "May",
    weekday: "Mon",
    city: "Long Island, NY",
    venue: "Adam’s Playhouse Theatre",
    address: "118 Hofstra University, Hempstead, NY 11549",
  },
  {
    day: "23",
    month: "May",
    weekday: "Tue",
    city: "Atlanta, GA",
    venue: "Center Stage Theater",
    address: "1374 West Peachtree Street NW, Atlanta, GA 30309",
  },
  {
    day: "24",
    month: "May",
    weekday: "Wed",
    city: "Dallas, TX",
    venue: "Hill Performance Hall, Eisemann Centre",
    address: "2351 Performance Dr, Richardson, TX 75082",
  },
];

export default function TourEvents() {
  const router = useRouter();
  return (
    <div className="Oureventdiv">
      <div className="ServicesDiv" style={{ width: "fit-content" }}>
        <div className="CircleServices"></div>
        <p className="ServicesText">our events</p>
      </div>
      <p className="WhatWeOffer">
        <span>Zain Zohaib</span> USA Tour <span>2026</span>
      </p>
      <div className="MainEventDiv">
        {EVENTS.map((event, index) => (
          <div key={index}>
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
                    <br />
                    {event.address}
                  </p>
                </div>
                <button type="button" className="BuyTicketsbtn">
                  Buy Tickets Now
                  <img src="/Images/Navbar/arrowred.svg" alt="" className="arrow-red" />
                  <img src="/Images/Navbar/arrow.svg" alt="" className="arrow-white" />
                </button>
              </div>
            </div>
            {index < EVENTS.length - 0 && <div className="linetour"></div>}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="SeeHowbtn"
        style={{ margin: 0 }}
          onClick={() => router.push("/tickets")}
      >
        View All Events
        <img src="/Images/Navbar/arrow.svg" alt="" />
      </button>
    </div>
  );
}
