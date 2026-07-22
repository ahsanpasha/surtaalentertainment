'use client';
import "./globals.css";
import TourEvents from "../component/TourEvents/TourEvents";
import SuccessStats from "../component/SuccessStats/SuccessStats";
import { useState, useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
const services = [
  {
    img: "/ImagesOpt/EventinSurtaal/Service1.webp",
    title: "Corporate Events",
    desc: "Live musical experiences tailored to elevate galas, conferences, and corporate celebrations."
  },
  {
    img: "/ImagesOpt/EventinSurtaal/Service2.webp",
    title: "Live Concerts",
    desc: "High-energy performances by iconic and emerging South Asian artists across global stages."
  },
  {
    img: "/ImagesOpt/EventinSurtaal/Service3.webp",
    title: "Private Events",
    desc: "Exclusive musical moments customized for intimate gatherings, birthdays, or personal milestones."
  },
  {
    img: "/ImagesOpt/EventinSurtaal/Service4.webp",
    title: "Wedding Shows",
    desc: "Unforgettable wedding entertainment blending tradition & glamour with soulful performances."
  }
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 440);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <main>
      <div className="MainHome">
        <div className="Celebrate">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">Celebrate Culture & Music</p>
        </div>
        <p className="FeelText">
          Feel the Rhythm with <span>Surtaal</span>.
        </p>
        <p className="Leteverytext">
          Let every beat inspire your soul as Surtaal brings music, energy, and
          passion together in perfect harmony.
        </p>
        <button
          className="SeeHowbtn"
          onClick={() => router.push("/tickets")}
        >
          Buy Tickets
          <img src="/Images/Navbar/arrow.svg" alt="" />
        </button>
      </div>

      {/* what we offer */}
      <div className="ourServices">
        <div className="ServicesDiv">
          <div className="CircleServices"></div>
          <p className="ServicesText">our services</p>
        </div>
        <p className="WhatWeOffer">
          what we <span>offer</span>
        </p>
        <p className="ServiceDescTop">
          SurTaal Entertainment provides a platform for our audience where
          they can experience live performance from their favorite Artists
        </p>
        <div className="ServiceCards">
          {isMobile ? (
            <div className="ServiceCardsDiv">
              <img
                src={services[currentIndex].img}
                alt={services[currentIndex].title}
              />
              <p className="Servicename">{services[currentIndex].title}</p>
              <p className="ServiceDesc">{services[currentIndex].desc}</p>
            </div>
          ) : (
            services.map((service, i) => (
              <div className="ServiceCardsDiv" key={i}>
                <img
                  src={service.img}
                  alt={service.title}
                />
                <p className="Servicename">{service.title}</p>
                <p className="ServiceDesc">{service.desc}</p>
              </div>
            ))
          )}
        </div>
        {isMobile && (
          <div className="services-nav">
            <button
              className={`services-arrow ${currentIndex > 0 ? 'active' : ''}`}
              onClick={prevSlide}
            >
              <GoArrowLeft />
            </button>
            <div className="services-dots">
              {services.map((_, i) => (
                <div
                  key={i}
                  className={`services-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                ></div>
              ))}
            </div>
            <button
              className={`services-arrow ${currentIndex < services.length - 1 ? 'active' : ''}`}
              onClick={nextSlide}
            >
              <GoArrowRight />
            </button>
          </div>
        )}
      </div>

      {/* About */}
      <div className="AboutDiv" style={{ backgroundColor: "#E6E6E5" }}>
        <img src="/ImagesOpt/EventinSurtaal/about.webp" alt="About Surtaal" />
        <div className="SecondAbout">
          <div className="ServicesDiv" style={{ width: "fit-content" }}>
            <div className="CircleServices"></div>
            <p className="ServicesText">About Surtaal Entertainment</p>
          </div>
          <p className="BringingText">
            We are bringing <span>Culture</span> & <span>Music</span> to Life
          </p>
          <p className="AboutDesc">
            Surtaal Entertainment brings the vibrant energy of South Asian music
            and culture to life. From intimate gatherings to large-scale
            productions, we create unforgettable experiences that fuse tradition
            with contemporary artistry. Our passion lies in curating soulful
            performances that captivate audiences across the globe.<br /> With a
            diverse network of renowned musicians, dancers, and creative
            professionals, we deliver seamless, high-impact events designed to
            leave lasting impressions. Whether it’s a concert, wedding show, or
            corporate gala — Surtaal turns every moment into a celebration.
          </p>
          <button
            className="SeeHowbtn"
            onClick={() => router.push("/contact-us")}
            style={{ margin: 0, width: "fit-content" }}
          >
            Contact Us
            <img src="/Images/Navbar/arrow.svg" alt="" />
          </button>
        </div>
      </div>

      {/* entertainment club */}
      <div>
        <div className="EntertainmentDiv">
          <div className="SurtaalMainRow">
            <div className="SurtaalMainCol">
              <div className="storyDiv" style={{ width: "fit-content" }}>
                <div className="CircleServices"></div>
                <p className="storytext">Surtaal</p>
              </div>
              <p className="storyline" style={{ marginBottom: "0px" }}>
                Entertainment <span>Club</span>
              </p>
            </div>
            <p className="Surtaalpara">
              Surtaal Entertainment Club features a diverse lineup of celebrated
              and emerging South Asian talent. From soulful qawwals to
              contemporary fusion acts, this is where every artist under the
              Surtaal banner comes together. Explore the voices, styles, and
              performers that define the Surtaal experience.
            </p>
          </div>
        </div>

        <div className="DividerEntertainment"></div>
        {/* artist01 */}
        <div className="entertainmentartistbox">
          <div className="straightlinediv">
            <div className="circleentertainment"></div>
          </div>

          <div className="Divmainrow">
            <div className="divrow">
              <p className="starrrname">Zain Zohaib</p>
              <button className="booknowbtn" onClick={() => router.push("/contact-us")}>
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/ImagesOpt/EventinSurtaal/artist01.webp"
                className="aristimage"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div className="DividerEntertainment"></div>

        {/* artist02 */}
        <div className="entertainmentartistbox">
          <div className="straightlinediv">
            <div className="circleentertainment"></div>
          </div>

          <div className="Divmainrow">
            <div className="divrow">
              <p className="starrrname">Asif Ali Khan Santoo</p>
              <button className="booknowbtn" onClick={() => router.push("/contact-us")}>
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/ImagesOpt/EventinSurtaal/arist02.webp"
                className="aristimage"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div className="DividerEntertainment"></div>

        {/* artist03 */}
        <div className="entertainmentartistbox">
          <div className="straightlinediv">
            <div className="circleentertainment"></div>
          </div>

          <div className="Divmainrow">
            <div className="divrow">
              <p className="starrrname">Shafqat Amanat Ali</p>
              <button className="booknowbtn" onClick={() => router.push("/contact-us")}>
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/ImagesOpt/EventinSurtaal/arist03.webp"
                className="aristimage"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div className="DividerEntertainment"></div>

        {/* artist04 */}
        <div className="entertainmentartistbox">
          <div className="straightlinediv">
            <div className="circleentertainment"></div>
          </div>

          <div className="Divmainrow">
            <div className="divrow">
              <p className="starrrname">Aima Baig</p>
              <button className="booknowbtn" onClick={() => router.push("/contact-us")}>
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/ImagesOpt/EventinSurtaal/arist04.webp"
                className="aristimage"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div className="DividerEntertainment"></div>

        {/* artist05 */}
        <div className="entertainmentartistbox">
          <div className="straightlinediv">
            <div className="circleentertainment"></div>
          </div>

          <div className="Divmainrow">
            <div className="divrow">
              <p className="starrrname">Fariha Pervez</p>
              <button className="booknowbtn" onClick={() => router.push("/contact-us")}>
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/ImagesOpt/EventinSurtaal/arist05.webp"
                className="aristimage"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div className="DividerEntertainment"></div>

        {/* artist06 */}
        <div className="entertainmentartistbox">
          <div className="straightlinediv">
            <div className="circleentertainment"></div>
          </div>

          <div className="Divmainrow">
            <div className="divrow">
              <p className="starrrname">Asim Azhar</p>
              <button className="booknowbtn" onClick={() => router.push("/contact-us")}>
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/ImagesOpt/EventinSurtaal/arist06.webp"
                className="aristimage"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div className="DividerEntertainment"></div>
      </div>

      <TourEvents />

      {/* story */}
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
