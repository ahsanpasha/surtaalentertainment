'use client';
import { useState, useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "../globals.css";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
  {
    name: "Ashkenaz Vincent",
    position: "Founder & CEO",
    desc: "Leads organizational vision, drives strategic growth, and builds lasting partnerships to shape the company’s future.",
    img: "/ImagesOpt/OurTeam/team1.webp"
  },
  {
    name: "Anosh Vincent",
    position: "Head of Operations",
    desc: "Oversees daily operations, streamlines workflows, and ensures seamless execution across teams with operational excellence.",
    img: "/ImagesOpt/OurTeam/team2.webp"
  },
  {
    name: "Rimla Qamar",
    position: "Director of Operations & Strategy",
    desc: "Develops strategic initiatives, optimizes operations, handles ticketing, and aligns organizational goals with sustainable long-term growth.",
    img: "/ImagesOpt/OurTeam/team3.webp"
  },
  {
    name: "Elia Ijjaaz",
    position: "Director of Marketing & Communications",
    desc: " Leads brand strategy, marketing campaigns, and communications to strengthen audience engagement and business visibility.",
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 440);
    handleResize();
    window.addEventListener("resize", handleResize);

    AOS.init({
      duration: 800,
      once: true,
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <main>
      <div className="AboutusMain">
        <div className="Celebrate" data-aos="fade-down">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">Behind Surtaal</p>
        </div>
        <p className="FeelText" data-aos="fade-down" data-aos-delay="200">
          The <span> Team </span> Behind Every
          <br /> <span> Memorable </span>Moment
        </p>
      </div>
      {/* ourteamdiv */}
      <div className="ourteamdiv">
        <div className="ServicesDiv" style={{ width: "fit-content" }} data-aos="fade-down">
          <div className="CircleServices"></div>
          <p className="ServicesText">Our Team</p>
        </div>
        <p className="WhatWeOffer" data-aos="fade-down">
          The <span>People </span>Behind <span>Surtaal</span>
        </p>
        <p className="ServiceDescTop ourteammaxwidth" data-aos="fade-down">
          At Surtaal, our team is passionate about creating unforgettable
          entertainment experiences that bring communities together through
          music, culture, and live events.
        </p>

        <div className="teamdivmain">
          {isMobile ? (
            <div className="teamdiv" data-aos="fade-down">
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
              <div className="teamdiv"
                data-aos="fade-down"
                key={i}>
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
