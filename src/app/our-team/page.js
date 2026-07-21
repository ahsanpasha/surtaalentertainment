'use client';
import { useState, useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "../globals.css";

const teamMembers = [
  {
    name: "Ashkenaz Vincent",
    position: "Founder & CEO",
    desc: "Visionary leader driving Surtaal USA’s mission to deliver world-class entertainment and cultural experiences.",
    img: "/ImagesOpt/OurTeam/team1.webp"
  },
  {
    name: "Anosh Vincent",
    position: "Head of Operations",
    desc: "Oversees event planning and operations, ensuring every production runs smoothly and successfully.",
    img: "/ImagesOpt/OurTeam/team2.webp"
  },
  {
    name: "Rimla Qamar",
    position: "Director of Sales & Strategy",
    desc: "Leads business growth, partnerships, and strategic initiatives to expand the Surtaal USA brand.",
    img: "/ImagesOpt/OurTeam/team3.webp"
  },
  {
    name: "Elia Ijjaaz",
    position: "Production Director",
    desc: "Manages production and creative execution to deliver exceptional live event experiences.",
    img: "/ImagesOpt/OurTeam/team4.webp"
  }
];

export default function OurTeamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 440);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <main>
      <div className="AboutusMain">
        <div className="Celebrate">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">Behind Surtaal</p>
        </div>
        <p className="FeelText">
          The <span> Team </span> Behind Every
          <br /> <span> Memorable </span>Moment
        </p>
      </div>
      {/* ourteamdiv */}
      <div className="ourteamdiv">
        <div className="ServicesDiv" style={{ width: "fit-content" }}>
          <div className="CircleServices"></div>
          <p className="ServicesText">Our Team</p>
        </div>
        <p className="WhatWeOffer">
          The <span>People </span>Behind <span>Surtaal</span> USA
        </p>
        <p className="ServiceDescTop ourteammaxwidth">
          At Surtaal USA, our team is passionate about creating unforgettable
          entertainment experiences that bring communities together through
          music, culture, and live events.
        </p>

        <div className="teamdivmain">
          {isMobile ? (
            <div className="teamdiv">
              <img src={teamMembers[currentIndex].img} className="teamimg" alt="" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="teamname">{teamMembers[currentIndex].name}</p>
                <p className="teamposition">{teamMembers[currentIndex].position}</p>
                <p className="teamdesc">{teamMembers[currentIndex].desc}</p>
              </div>
            </div>
          ) : (
            teamMembers.map((member, i) => (
              <div className="teamdiv" key={i}>
                <img src={member.img} className="teamimg" alt="" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="teamname">{member.name}</p>
                  <p className="teamposition">{member.position}</p>
                  <p className="teamdesc">{member.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {isMobile && (
          <div className="services-nav team-nav">
            <button
              className={`services-arrow ${currentIndex > 0 ? 'active' : ''}`}
              onClick={prevSlide}
            >
              <GoArrowLeft />
            </button>
            <div className="services-dots">
              {teamMembers.map((_, i) => (
                <div
                  key={i}
                  className={`services-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                ></div>
              ))}
            </div>
            <button
              className={`services-arrow ${currentIndex < teamMembers.length - 1 ? 'active' : ''}`}
              onClick={nextSlide}
            >
              <GoArrowRight />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
