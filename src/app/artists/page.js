"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";
import SuccessStats from "../../component/SuccessStats/SuccessStats";

const artists = [
  { name: "Asim Azhar", role: "Singer", img: "/ImagesOpt/Artists/Asim.webp" },
  { name: "Atif Aslam", role: "Singer", img: "/ImagesOpt/Artists/Atif.webp" },
  { name: "Sajjad Ali", role: "Singer", img: "/ImagesOpt/Artists/Sajjad.webp" },
  { name: "Zain Zohaib", role: "Singer", img: "/ImagesOpt/Artists/ZainZohaib.webp" },
  { name: "Aima Baig", role: "Singer", img: "/ImagesOpt/Artists/Aima.webp" },
  { name: "Asif Ali Santoo", role: "Singer", img: "/ImagesOpt/Artists/Asif.webp" },
];

// Duplicate artists for seamless infinite loop (clone trick)
const infiniteArtists = [...artists, ...artists, ...artists];

export default function ArtistsPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 440);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextArtist = () => {
    setCurrentIndex((prev) => (prev + 1) % artists.length);
  };

  const prevArtist = () => {
    setCurrentIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  return (
    <main>
      <div className="AboutusMain">
        <div className="Celebrate">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">Artists</p>
        </div>
        <p className="FeelText">
          Where <span>Music</span> Meets the magic
        </p>
      </div>

      <div className="artist-section">
        {/* HEADER — no manual buttons needed for desktop (auto-scroll) */}
        <div className="artist-header">
          <div className="artistnew">
            <div className="ServicesDiv">
              <div className="CircleServices"></div>
              <p className="ServicesText">our services</p>
            </div>
            <p
              className="ArtisticText"
              style={{ maxWidth: "unset", marginBottom: "0px" }}
            >
              The <span>Artists</span> Behind the <span>Magic </span>
            </p>
          </div>
        </div>

        {/* CARDS */}
        {isMobile ? (
          <div className="artist-mobile-container">
            <div className="artist-card">
              <img
                src={artists[currentIndex].img}
                className="aristimagenew"
                alt={artists[currentIndex].name}
              />
              <div className="artist-overlay">
                <p className="artist-name">{artists[currentIndex].name}</p>
                <p className="artist-role">{artists[currentIndex].role}</p>
              </div>
            </div>
            <div className="slider-btns">
              <div
                className="sliderbtn"
                onClick={prevArtist}
                style={{ cursor: "pointer" }}
              >
                <img src="/Images/Artists/left-arrow.svg" alt="" />
              </div>
              <div
                className="sliderbtngoaway"
                onClick={nextArtist}
                style={{ cursor: "pointer" }}
              >
                <img src="/Images/Artists/right-arrow.svg" alt="" />
              </div>
            </div>
          </div>
        ) : (
          /* ── Infinite auto-scroll marquee ── */
          <div className="artist-marquee-wrapper">
            <div className="artist-marquee-track">
              {infiniteArtists.map((artist, i) => (
                <div
                  className="artist-card artist-card-hoverable"
                  key={i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={artist.img}
                    className="aristimagenew"
                    alt={artist.name}
                  />

                  {/* Default bottom gradient overlay */}
                  <div className="artist-overlay">
                    <p className="artist-name">{artist.name}</p>
                    <p className="artist-role">{artist.role}</p>
                  </div>

                  {/* Hover full overlay with Book Now button */}
                  <div className={`artist-hover-overlay${hoveredIndex === i ? " visible" : ""}`}>
                    <p className="artist-hover-name">{artist.name}</p>
                    <p className="artist-hover-role">{artist.role}</p>
                    <button
                      className="artist-book-btn"
                      onClick={() => router.push("/contact-us")}
                    >
                      Book Now
                      <span className="artist-book-arrow">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="offerartist">
        <img
          src="/ImagesOpt/Artists/mystory.webp"
          className="offerartistimg"
          alt="About Surtaal"
        />
        <div className="SecondAboutartist">
          <div className="ServicesDiv" style={{ width: "fit-content" }}>
            <div className="CircleServices"></div>
            <p className="ServicesText">what we offer</p>
          </div>
          <p className="BringingText" style={{ maxWidth: "unset" }}>
            Elevating Every <span>Occasion</span> Through <span>Music</span> And{" "}
            <span>Art</span>
          </p>

          <div className="mainpointdiv">
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Live Concert Performances</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Cultural &amp; Community Events</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Corporate Entertainment</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">
                Private Celebrations &amp; Special Occasions
              </p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Artist Development &amp; Promotion</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Collaborative Musical Projects</p>
            </div>
          </div>
          <button
            className="SeeHowbtn"
            style={{ margin: 0, width: "fit-content" }}
          >
            Read More
            <img src="/Images/Navbar/arrow.svg" alt="" />
          </button>
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
    </main>
  );
}
