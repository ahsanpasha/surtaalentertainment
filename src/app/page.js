import "./page.css";

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
      <div className="AboutDiv">
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
    </main>
  );
}
