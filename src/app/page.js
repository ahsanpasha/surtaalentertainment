import "./globals.css";
import TourEvents from "../component/TourEvents/TourEvents";
import SuccessStats from "../component/SuccessStats/SuccessStats";

export default function HomePage() {
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
        <button className="SeeHowbtn">
          See How it Works
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
          SurTaal Entertainment USA provides a platform for our audience where
          they can experience live performance from their favorite Artists
        </p>
        <div className="ServiceCards">
          <div className="ServiceCardsDiv">
            <img
              src="/Images/EventinSurtaal/Service1.webp"
              alt="Corporate Events"
            />
            <p className="Servicename">Corporate Events</p>
            <p className="ServiceDesc">
              Live musical experiences tailored to elevate galas, conferences,
              and corporate celebrations.
            </p>
          </div>
          <div className="ServiceCardsDiv">
            <img
              src="/Images/EventinSurtaal/Service2.webp"
              alt="Corporate Events"
            />
            <p className="Servicename">Corporate Events</p>
            <p className="ServiceDesc">
              Live musical experiences tailored to elevate galas, conferences,
              and corporate celebrations.
            </p>
          </div>
          <div className="ServiceCardsDiv">
            <img
              src="/Images/EventinSurtaal/Service3.webp"
              alt="Corporate Events"
            />
            <p className="Servicename">Corporate Events</p>
            <p className="ServiceDesc">
              Live musical experiences tailored to elevate galas, conferences,
              and corporate celebrations.
            </p>
          </div>
          <div className="ServiceCardsDiv">
            <img
              src="/Images/EventinSurtaal/Service4.webp"
              alt="Corporate Events"
            />
            <p className="Servicename">Corporate Events</p>
            <p className="ServiceDesc">
              Live musical experiences tailored to elevate galas, conferences,
              and corporate celebrations.
            </p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="AboutDiv" style={{backgroundColor: "#E6E6E5"}}>
        <img src="/Images/EventinSurtaal/about.webp" alt="About Surtaal" />
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
            performances that captivate audiences across the globe. With a
            diverse network of renowned musicians, dancers, and creative
            professionals, we deliver seamless, high-impact events designed to
            leave lasting impressions. Whether it’s a concert, wedding show, or
            corporate gala — Surtaal turns every moment into a celebration.
          </p>
          <button
            className="SeeHowbtn"
            style={{ margin: 0, width: "fit-content" }}
          >
            Read More
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
              <button className="booknowbtn">
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/Images/EventinSurtaal/artist01.webp"
                className="aristimage"
                alt=""
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
              <button className="booknowbtn">
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/Images/EventinSurtaal/arist02.webp"
                className="aristimage"
                alt=""
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
              <button className="booknowbtn">
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/Images/EventinSurtaal/arist03.webp"
                className="aristimage"
                alt=""
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
              <button className="booknowbtn">
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/Images/EventinSurtaal/arist04.webp"
                className="aristimage"
                alt=""
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
              <button className="booknowbtn">
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/Images/EventinSurtaal/arist05.webp"
                className="aristimage"
                alt=""
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
              <button className="booknowbtn">
                Book Now <img src="/Images/Navbar/arrow.svg" alt="" />
              </button>
            </div>
            <div className="imageWrapper">
              <img
                src="/Images/EventinSurtaal/arist06.webp"
                className="aristimage"
                alt=""
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
          Founded in 2019, Surtaal Entertainment USA came into being with the
          sole purpose of promoting the best of the best in the music world
          through live events in North America.
        </p>
        <SuccessStats />
      </div>
    </main>
  );
}
