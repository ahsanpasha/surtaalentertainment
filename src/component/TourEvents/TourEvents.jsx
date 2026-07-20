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
    day: "21",
    month: "May",
    weekday: "Sun",
    city: "Boston, MA",
    venue: "Berklee Performing Arts Centre",
    address: "136 Massachusetts Avenue, Boston, MA 02115",
  },
  {
    day: "21",
    month: "May",
    weekday: "Sun",
    city: "Boston, MA",
    venue: "Berklee Performing Arts Centre",
    address: "136 Massachusetts Avenue, Boston, MA 02115",
  },
  {
    day: "21",
    month: "May",
    weekday: "Sun",
    city: "Boston, MA",
    venue: "Berklee Performing Arts Centre",
    address: "136 Massachusetts Avenue, Boston, MA 02115",
  },
];

export default function TourEvents() {
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
              <div className="littleline"></div>
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
                  <img src="/Images/Navbar/arrowred.svg" alt="" />
                </button>
              </div>
            </div>
            {index < EVENTS.length - 1 && <div className="linetour"></div>}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="SeeHowbtn"
        style={{ margin: 0, width: "fit-content" }}
      >
        View All Events
        <img src="/Images/Navbar/arrow.svg" alt="" />
      </button>
    </div>
  );
}
