"use client";
import "../globals.css";
import ElevatingSection from "../../component/ElevatingSection/ElevatingSection";
import SuccessStats from "../../component/SuccessStats/SuccessStats";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutUsPage() {


  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

  }, []);
  return (
    <main>
      <div className="AboutusMain">
        <div className="Celebrate" data-aos="fade-down">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">About Us</p>
        </div>
        <p className="FeelText" data-aos="fade-down" data-aos-delay="200">
          What is <span>Surtaal</span> Entertainment?
        </p>
        <p className="aboutuspara" data-aos="fade-down" data-aos-delay="400">
          Concept: Founded in 2019, Surtaal Entertainment came into being
          with the sole purpose of promoting the best of the best in the music
          world through live events in North America. <br />
          Events & Concerts : Our aim is to bring together talent and artists
          from around the globe and showcase their mastery through Music
          Concerts & Gigs, Gala Events, Masterclasses, Music Promotion,
          Entertainment events and Cultural Showcases.
          <br />
          Learn Music: We are providing a unique learning opportunity to those
          who want to learn how to sing or play any instrument. We offer unique
          customized training for each of our student and our teachers from all
          around the world conduct group and one-on-one sessions depending upon
          the requirement of the student.
        </p>
      </div>

      <div className="aboutuslower">
        <img
          data-aos="fade-right"
          src="/ImagesOpt/AboutUs/aboususimage.webp"
          className="aboutimage"
          alt=""
        />
        <div data-aos="fade-down"  >
          <div className="ServicesDiv">
            <div className="CircleServices"></div>
            <p className="ServicesText">our services</p>
          </div>
          <p className="ArtisticText">
            The <span>Artistic</span> Journey of <span> Surtaal </span>
            Entertainment
          </p>
          <p className="AboutUSDesc">
            <span style={{ fontFamily: "Montserrat-Bold" }}>
              Mr. Ashkenaz Vincent
            </span>{" "}
            has been a student of music his entire life later evolving into a
            teacher of music as well. He has been on the forefront of promoting
            Arts and Culture events in the US for the past decade. He proudly
            runs Surtaal Entertainment as an events company.
            <br />
            Having first performed at the age of five on Pakistan Television
            PTV, Vincent knew the journey would be never-ending. He has since
            been in the company of several esteemed and world-renowned artists
            and musicians, further solidifying his talent by performing
            alongside one of the top percussionists in the world – Tabla Maestro
            Ustad Abdul Sattar Taari Khan. He also performed and represented
            Pakistani Sufi Music at the 47th annual Festival Of The Nations
            alongside 23 other nations at the Empire State Convention Center in
            2018. Vincent continues to inspire emerging talent and champion them
            through showcases and various events. Surtaal Entertainment is a
            testament to his respect and dedication towards the Arts & Culture
            of South Asia.
          </p>
        </div>
      </div>

      <ElevatingSection />
      <div className="OurStorySection" >
        <div
          data-aos="fade-down"
          className="storyDiv" style={{ width: "fit-content" }}>
          <div className="CircleServices"></div>
          <p className="storytext">our story</p>
        </div>
        <p
          data-aos="fade-down"
          className="storyline">
          Music Unites Here with <span>Surtaal</span>
        </p>
        <p
          data-aos="fade-down"
          className="foundedtext">
          Founded in 2019, Surtaal Entertainment came into being with the
          sole purpose of promoting the best of the best in the music world
          through live events in North America.
        </p>
        <SuccessStats />
      </div>
    </main>
  );
}
