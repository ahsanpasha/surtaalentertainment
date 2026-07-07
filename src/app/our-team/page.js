export const metadata = {
  title: "Our Team | Surtaal Entertainment",
  description: "Meet the passionate team behind Surtaal Entertainment",
};

const team = [
  { name: "Team Member", role: "Founder & CEO" },
  { name: "Team Member", role: "Creative Director" },
  { name: "Team Member", role: "Events Manager" },
  { name: "Team Member", role: "Artist Relations" },
  { name: "Team Member", role: "Marketing Lead" },
  { name: "Team Member", role: "Production Head" },
];

export default function OurTeamPage() {
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
            bottom: "20%",
            left: "20%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(60,100,200,0.08) 0%, transparent 70%)",
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
            The People Behind the Magic
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
            Our Team
          </h1>

          {/* Team Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              width: "100%",
            }}
          >
            {team.map(({ name, role }, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "36px 24px",
                  textAlign: "center",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(154,127,69,0.12)",
                    border: "1px solid rgba(154,127,69,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <span style={{ fontSize: "28px" }}>👤</span>
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
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
