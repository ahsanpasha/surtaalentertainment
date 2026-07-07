export const metadata = {
  title: "About Us | Surtaal Entertainment",
  description: "Learn about Surtaal Entertainment and our mission",
};

export default function AboutUsPage() {
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
          paddingTop: "100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "40%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(60,180,140,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            textAlign: "center",
            padding: "0 24px",
            zIndex: 1,
            maxWidth: "760px",
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
            Our Story
          </p>
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
              fontFamily: "Montserrat-Bold, sans-serif",
              color: "#ffffff",
              margin: "0 0 28px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            About Us
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "#7A7060",
              fontFamily: "Georama-Regular, sans-serif",
              lineHeight: 1.85,
              marginBottom: "20px",
            }}
          >
            Surtaal Entertainment is a premier live events and entertainment
            company dedicated to bringing world-class music, culture, and
            artistic experiences to audiences across the region.
          </p>
          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "#7A7060",
              fontFamily: "Georama-Regular, sans-serif",
              lineHeight: 1.85,
            }}
          >
            Founded with a passion for the arts, we curate unforgettable
            evenings that connect artists with their audiences in the most
            intimate and spectacular ways.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginTop: "56px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Events", value: "50+" },
              { label: "Artists", value: "200+" },
              { label: "Audience", value: "10K+" },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "2.5rem",
                    fontFamily: "Montserrat-Bold, sans-serif",
                    color: "#fff",
                    margin: "0 0 8px",
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#7A7060",
                    fontFamily: "Georama-Regular, sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
