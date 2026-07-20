import "../globals.css";

export default function OurTeamPage() {
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
          <div className="teamdiv">
            <img src="/ImagesOpt/OurTeam/team1.webp" className="teamimg" alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p className="teamname">Ashkenaz Vincent</p>
              <p className="teamposition">Founder & CEO</p>
              <p className="teamdesc">
                Visionary leader driving Surtaal USA’s mission to deliver
                world-class entertainment and cultural experiences.
              </p>
            </div>
          </div>
          <div className="teamdiv">
            <img src="/ImagesOpt/OurTeam/team2.webp" className="teamimg" alt="" />
            <div>
              <p className="teamname">Anosh Vincent</p>
              <p className="teamposition">Head of Operations</p>
              <p className="teamdesc">
                Oversees event planning and operations, ensuring every
                production runs smoothly and successfully.
              </p>
            </div>
          </div>
          <div className="teamdiv">
            <img src="/ImagesOpt/OurTeam/team3.webp" className="teamimg" alt="" />
            <div>
              <p className="teamname">Rimla Qamar</p>
              <p className="teamposition">Director of Sales & Strategy</p>
              <p className="teamdesc">
                Leads business growth, partnerships, and strategic initiatives
                to expand the Surtaal USA brand.
              </p>
            </div>
          </div>
          <div className="teamdiv">
            <img src="/ImagesOpt/OurTeam/team4.webp" className="teamimg" alt="" />
            <div>
              <p className="teamname">Elia Ijjaaz</p>
              <p className="teamposition">Production Director</p>
              <p className="teamdesc">
                Manages production and creative execution to deliver exceptional
                live event experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
