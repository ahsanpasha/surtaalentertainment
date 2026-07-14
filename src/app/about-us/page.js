import "../globals.css";

export default function AboutUsPage() {
  return (
    <main>
      <div className="AboutusMain">
        <div className="Celebrate">
          <div className="CircleDiv"></div>
          <p className="Celebratetext">About Us</p>
        </div>
        <p className="FeelText">
          What is <span>Surtaal</span> USA?
        </p>
        <p className="aboutuspara">
          Concept: Founded in 2019, Surtaal Entertainment USA came into being
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
          src="/Images/AboutUs/aboususimage.webp"
          className="aboutimage"
          alt=""
        />
        <div>
          <div className="ServicesDiv">
            <div className="CircleServices"></div>
            <p className="ServicesText">our services</p>
          </div>
          <p className="ArtisticText">
            The <span>Artistic</span> Journey of <span> Surtaal </span>
            Entertainment<span> USA</span>
          </p>
          <p className="AboutUSDesc">
            <span style={{ fontFamily: "Montserrat-Bold" }}>
              Mr. Ashkenaz Vincent
            </span>{" "}
            has been a student of music his entire life later evolving into a
            teacher of music as well. He has been on the forefront of promoting
            Arts and Culture events in the US for the past decade. He proudly
            runs Surtaal Entertainment USA as an events company.
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
            through showcases and various events. Surtaal Entertainment USA is a
            testament to his respect and dedication towards the Arts & Culture
            of South Asia.
          </p>
        </div>
      </div>

      <div className="elevatingdiv">
        <div className="elevatingdivheader">
          <div className="linediv"></div>
          <div className="elevatedivmain">
            <img
              src="/Images/AboutUs/arrow.svg"
              className="arrowdivabout"
              alt=""
            />
            <p className="elevatingText">ELEVATING ENTERTAINMENT</p>
          </div>
          <div className="linediv"></div>
          <p className="elevatingText-normal-new">ELEVATING ENTERTAINMENT</p>
          <div className="linediv"></div>
        </div>
        <div className="acrossnorthdiv">
          <div
            className="ServicesDiv"
            style={{
              background: "#FFFFFF1C",
              boxShadow: "0px 4px 15px 0px #00000040",
            }}
          >
            <div className="CircleServices"></div>
            <p className="ServicesText" style={{ color: "#FFFFFF" }}>
              our services
            </p>
          </div>
          <p className="ElevatingEntertainmentText">
            Elevating <span>Entertainment</span>
          </p>
          <p className="AboutUSDesc-new">
            We specialize in Corporate and Commercial Events, Concerts, Musical
            Events and talent shows in North America, to bring together
            audiences and the entertainment culture.
            <br />
            With A-list superstars, World-Class musicians and emerging talent
            under our roster, Surtaal Entertainment USA aims to deliver a
            seamless experience for artists, fans, audiences and clients
            involved.
            <br />
            Our commitment to providing exceptional customer service means we
            offer a range of VIP packages and perks to enhance your experience
            even further. From meet-and-greets with the artists to exclusive
            access to soundchecks and more, we strive to make every event an
            unforgettable experience for our valued patrons.
          </p>
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
        <div className="SuccessContainer">
          <div className="SuccessDiv">
            <p className="SuccessNum">
              7<span>+</span>
            </p>
            <p className="SuccessLabel">Years Experience</p>
          </div>
          <div className="SuccessDiv">
            <p className="SuccessNum">
              100<span>+</span>
            </p>
            <p className="SuccessLabel">Successful Event</p>
          </div>
          <div className="SuccessDiv">
            <p className="SuccessNum">
              50<span>+</span>
            </p>
            <p className="SuccessLabel">Exclusive Artists</p>
          </div>
          <div className="SuccessDiv">
            <p className="SuccessNum">
              60<span>+</span>
            </p>
            <p className="SuccessLabel">Professional Team</p>
          </div>
        </div>
      </div>
    </main>
  );
}
