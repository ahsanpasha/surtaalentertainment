"use client";

import { useEffect } from "react";
import "../globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import GallerySection from "../../component/GallerySection/GallerySection";
import SuccessStats from "../../component/SuccessStats/SuccessStats";

export default function GalleryPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main>
      {/* Top Hero Section matching Tickets, About Us, Artists, Our Team */}
      <div className="AboutusMain">
        <div className="Celebrate" data-aos="fade-down">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">Meet &amp; Greet</p>
        </div>
        <p className="FeelText" data-aos="fade-down" data-aos-delay="200">
          Unforgettable <span>Meet &amp; Greet</span> Moments
        </p>
        <p className="aboutuspara" data-aos="fade-down" data-aos-delay="400">
          Relive exclusive fan interactions, intimate artist sessions, and memorable backstage memories with Zain Zohaib across Toronto, Vancouver, Montreal, and Niagara Falls.
        </p>
      </div>

      {/* Full Gallery Section */}
      <GallerySection isHomePage={false} initialLimitPerCity={8} />

      {/* Story & Success Stats Section */}
      <div className="OurStorySection">
        <div data-aos="fade-down" className="storyDiv" style={{ width: "fit-content" }}>
          <div className="CircleServices"></div>
          <p className="storytext">our story</p>
        </div>
        <p data-aos="fade-down" className="storyline">
          Music Unites Here with <span>Surtaal</span>
        </p>
        <p data-aos="fade-down" className="foundedtext">
          Founded in 2019, Surtaal Entertainment came into being with the
          sole purpose of promoting the best of the best in the music world
          through live events in North America.
        </p>
        <SuccessStats />
      </div>
    </main>
  );
}
