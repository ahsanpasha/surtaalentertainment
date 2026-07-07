export const metadata = {
  title: "Events in Surtaal | Surtaal Entertainment",
  description: "Discover upcoming events by Surtaal Entertainment",
};

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          backgroundColor: "#080600",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "100px",
        }}
      >
        {/* Subtle gradient orb */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(180,140,60,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
            zIndex: 1,
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
            Surtaal Entertainment
          </p>
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
              fontFamily: "Montserrat-Bold, sans-serif",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            Events in Surtaal
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: "#7A7060",
              marginTop: "24px",
              maxWidth: "520px",
              fontFamily: "Georama-Regular, sans-serif",
              lineHeight: 1.75,
            }}
          >
            Experience the magic of live music, culture, and unforgettable
            moments crafted for you.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "40px" }}>
            <a
              href="/tickets"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "13px 32px",
                backgroundColor: "#ffffff",
                color: "#080600",
                borderRadius: "100px",
                fontFamily: "Georama-Medium, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
            >
              Get Tickets
            </a>
            <a
              href="/about-us"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "13px 32px",
                backgroundColor: "transparent",
                color: "#CBD5E1",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "100px",
                fontFamily: "Georama-Medium, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}