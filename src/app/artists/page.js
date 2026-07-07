export const metadata = {
  title: "Artists | Surtaal Entertainment",
  description: "Explore the talented artists performing at Surtaal Entertainment events",
};

const artists = [
  { name: "Artist One", genre: "Classical" },
  { name: "Artist Two", genre: "Fusion" },
  { name: "Artist Three", genre: "Folk" },
  { name: "Artist Four", genre: "Contemporary" },
  { name: "Artist Five", genre: "Sufi" },
  { name: "Artist Six", genre: "Jazz" },
];

export default function ArtistsPage() {
  return (
    <main>
      <section
        style={{
          minHeight: "100vh",
          backgroundColor: "#080600",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "120px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "20%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,100,60,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            textAlign: "center",
            padding: "0 24px",
            zIndex: 1,
            width: "100%",
            maxWidth: "1100px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              letterSpacing: "0.2em",
              color: "#9A7F45",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "Georama-Medium, sans-serif",
            }}
          >
            Performing Artists
          </p>
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
              fontFamily: "Montserrat-Bold, sans-serif",
              color: "#ffffff",
              margin: "0 0 48px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Artists
          </h1>

          {/* Artist Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              width: "100%",
            }}
          >
            {artists.map(({ name, genre }) => (
              <div
                key={name}
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "36px 24px",
                  textAlign: "center",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                  cursor: "pointer",
                }}
              >
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(154,127,69,0.15)",
                    border: "1px solid rgba(154,127,69,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      color: "#9A7F45",
                      fontFamily: "Montserrat-Bold, sans-serif",
                    }}
                  >
                    {name.charAt(0)}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    fontFamily: "Georama-Medium, sans-serif",
                    color: "#fff",
                    margin: "0 0 8px",
                    fontWeight: 600,
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9A7F45",
                    fontFamily: "Georama-Regular, sans-serif",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {genre}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
