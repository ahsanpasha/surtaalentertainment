"use client";
import React, { useState, useEffect, useRef } from "react";
import "../globals.css";
import SuccessStats from "../../component/SuccessStats/SuccessStats";

const artists = [
  { name: "Asim Azhar", role: "Singer", img: "/ImagesOpt/Artists/a1.webp" },
  { name: "Atif Aslam", role: "Singer", img: "/ImagesOpt/Artists/a1.webp" },
  { name: "Sajjad Ali", role: "Singer", img: "/ImagesOpt/Artists/a1.webp" },
  { name: "Zain Zohaib", role: "Singer", img: "/ImagesOpt/Artists/a1.webp" },
  { name: "Zain Zohaib", role: "Singer", img: "/ImagesOpt/Artists/a1.webp" },
];

export default function ArtistsPage() {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 440);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 458 + 22; // width of card (458) + gap (22)
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
        {/* HEADER */}
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
              The <span>Artists</span> Behind the <span> Magic </span>
            </p>
          </div>
          {!isMobile && (
            <div className="slider-btns">
              <div
                className="sliderbtn"
                onClick={() => scroll("left")}
                style={{ cursor: "pointer" }}
              >
                <img src="/Images/Artists/left-arrow.svg" alt="" />
              </div>
              <div
                className="sliderbtngoaway"
                onClick={() => scroll("right")}
                style={{ cursor: "pointer" }}
              >
                <img src="/Images/Artists/right-arrow.svg" alt="" />
              </div>
            </div>
          )}
        </div>

        {/* CARDS */}
        {isMobile ? (
          <div className="artist-mobile-container">
            <div className="artist-card">
              <img
                src={artists[currentIndex].img}
                className="aristimagenew"
                alt=""
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
          <div className="artist-row" ref={sliderRef}>
            {artists.map((artist, i) => (
              <div className="artist-card" key={i}>
                <img
                  src={artist.img}
                  className="aristimagenew"
                  alt=""
                />
                <div className="artist-overlay">
                  <p className="artist-name">{artist.name}</p>
                  <p className="artist-role">{artist.role}</p>
                </div>
              </div>
            ))}
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
              <p className="livetext">Cultural & Community Events</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Corporate Entertainment</p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">
                Private Celebrations & Special Occasions
              </p>
            </div>
            <div className="points">
              <img src="/Images/Artists/tick.svg" className="tick" alt="" />
              <p className="livetext">Artist Development & Promotion</p>
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
          Founded in 2019, Surtaal Entertainment USA came into being with the
          sole purpose of promoting the best of the best in the music world
          through live events in North America.
        </p>
        <SuccessStats />
      </div>
    </main>
  );
}
