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
        </div>
      </div>
    </main>
  );
}
