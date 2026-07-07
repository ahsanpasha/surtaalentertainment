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
    </main>
  );
}
