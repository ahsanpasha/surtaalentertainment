"use client";

import { useState } from "react";

const TABS = {
  entertainment: {
    label: "ELEVATING ENTERTAINMENT",
    title: (
      <>
        Elevating <span>Entertainment</span>
      </>
    ),
    body: (
      <>
        We specialize in Corporate and Commercial Events, Concerts, Musical Events
        and talent shows in North America, to bring together audiences and the
        entertainment culture.
        <br />
        <br />
        With A-list superstars, World-Class musicians and emerging talent under our
        roster, Surtaal Entertainment USA aims to deliver a seamless experience
        for artists, fans, audiences and clients involved.
        <br />
        <br />
        Our commitment to providing exceptional customer service means we offer a
        range of VIP packages and perks to enhance your experience even further.
        From meet-and-greets with the artists to exclusive access to soundchecks
        and more, we strive to make every event an unforgettable experience for
        our valued patrons.
      </>
    ),
  },
  academy: {
    label: "DISCOVER SURTAAL MUSIC ACADEMY",
    title: (
      <>
        Discover <span>Surtaal Music Academy</span>
      </>
    ),
    body: (
      <>
        We are providing a unique learning opportunity to those who want to learn
        how to sing or play any instrument. Surtaal Music Academy offers
        customized training for each student, with teachers from around the world
        conducting group and one-on-one sessions depending upon the requirement
        of the student.
        <br />
        <br />
        Whether you are beginning your musical journey or refining your craft,
        our academy connects passionate learners with world-class instructors
        across vocals, instruments, and performance.
        <br />
        <br />
        Through structured programs, live masterclasses, and personalized
        mentorship, Surtaal Music Academy helps students build confidence,
        technique, and stage presence — nurturing the next generation of
        performers under the Surtaal banner.
      </>
    ),
  },
};

export default function ElevatingSection() {
  const [activeTab, setActiveTab] = useState("entertainment");
  const content = TABS[activeTab];

  return (
    <div className="elevatingdiv">
      <div className="elevatingdivheader">
        <div className="linediv"></div>
        <div className="elevating-tabs-row">
          <button
            type="button"
            className={`elevating-tab${activeTab === "entertainment" ? " active" : ""}`}
            onClick={() => setActiveTab("entertainment")}
          >
            <span className="elevating-tab-inner">
              <img
                src="/Images/AboutUs/arrow.svg"
                className="arrowdivabout"
                alt=""
              />
              <span>{TABS.entertainment.label}</span>
            </span>
          </button>
          <div className="linediv elevating-tab-line"></div>
          <button
            type="button"
            className={`elevating-tab elevating-tab-secondary${activeTab === "academy" ? " active" : ""}`}
            onClick={() => setActiveTab("academy")}
          >
            {TABS.academy.label}
          </button>
        </div>
        <div className="linediv"></div>
      </div>

      <div className="acrossnorthdiv">
        <div
          className="ServicesDiv"
          style={{
            background: "#FFFFFF1C",
            boxShadow: "0px 4px 15px 0px #00000040",
          }}
        >
          <div className="CircleServices"></div>
          <p className="ServicesText" style={{ color: "#FFFFFF" }}>
            our services
          </p>
        </div>

        <div className="elevating-content-panel" key={activeTab}>
          <p className="ElevatingEntertainmentText">{content.title}</p>
          <p className="AboutUSDesc-new">{content.body}</p>
        </div>
      </div>
    </div>
  );
}
