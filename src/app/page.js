import Navbar from "@/component/Navbar/Navbar";

export default function Page() {
  return (
    <main>
      {/* Hero Section */}
      <section
        id="events-in-surtaal"
        style={{
          minHeight: "100vh",
          backgroundColor: "#080600",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Navbar />

        {/* Hero Content */}
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
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontFamily: "Montserrat-Bold, sans-serif",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Surtaal Entertainment
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "#94A3B8",
              marginTop: "20px",
              maxWidth: "560px",
              fontFamily: "Georama-Regular, sans-serif",
              lineHeight: 1.7,
            }}
          >
            Experience the magic of live music, culture, and unforgettable
            moments.
          </p>
        </div>
      </section>

      {/* Tickets Section */}
      <section
        id="tickets"
        style={{ minHeight: "100vh", backgroundColor: "#0a0800", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <h2 style={{ color: "#fff", fontFamily: "Montserrat-Bold, sans-serif" }}>Tickets</h2>
      </section>

      {/* About Us Section */}
      <section
        id="about-us"
        style={{ minHeight: "100vh", backgroundColor: "#080600", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <h2 style={{ color: "#fff", fontFamily: "Montserrat-Bold, sans-serif" }}>About Us</h2>
      </section>

      {/* Artists Section */}
      <section
        id="artists"
        style={{ minHeight: "100vh", backgroundColor: "#0a0800", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <h2 style={{ color: "#fff", fontFamily: "Montserrat-Bold, sans-serif" }}>Artists</h2>
      </section>

      {/* Our Team Section */}
      <section
        id="our-team"
        style={{ minHeight: "100vh", backgroundColor: "#080600", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <h2 style={{ color: "#fff", fontFamily: "Montserrat-Bold, sans-serif" }}>Our Team</h2>
      </section>
    </main>
  );
}