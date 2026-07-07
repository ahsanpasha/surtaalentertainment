export const metadata = {
  title: "Tickets | Surtaal Entertainment",
  description: "Book your tickets for Surtaal Entertainment events",
};

export default function TicketsPage() {
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
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(120,80,200,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
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
              fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
              fontFamily: "Montserrat-Bold, sans-serif",
              color: "#ffffff",
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Tickets
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: "#7A7060",
              maxWidth: "520px",
              margin: "0 auto",
              fontFamily: "Georama-Regular, sans-serif",
              lineHeight: 1.75,
            }}
          >
            Book your tickets for the most exciting live events and
            performances. Limited seats available.
          </p>

          {/* Placeholder ticket cards */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "56px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["General Admission", "VIP", "Premium"].map((tier) => (
              <div
                key={tier}
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  width: "220px",
                  textAlign: "center",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                    color: "#9A7F45",
                    textTransform: "uppercase",
                    fontFamily: "Georama-Medium, sans-serif",
                    marginBottom: "12px",
                  }}
                >
                  {tier}
                </p>
                <p
                  style={{
                    fontSize: "28px",
                    fontFamily: "Montserrat-Bold, sans-serif",
                    color: "#fff",
                    margin: "0 0 20px",
                  }}
                >
                  —
                </p>
                <button
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backgroundColor: "transparent",
                    color: "#CBD5E1",
                    fontFamily: "Georama-Medium, sans-serif",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
