import "../globals.css";

export default function ArtistsPage() {
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

      <div></div>

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
