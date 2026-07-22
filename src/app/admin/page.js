"use client";

import { useState, useEffect } from "react";
import "../globals.css";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("overview");
  const [tickets, setTickets] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  // Add Ticket form state
  const [formData, setFormData] = useState({
    artistName: "",
    dayNum: "",
    month: "",
    weekday: "",
    city: "",
    venue: "",
    imageUrl: "",
  });
  const [addStatus, setAddStatus] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchDashboardData();
    }
  }, [isLoggedIn]);

  // Lock scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

  const fetchDashboardData = async () => {
    setLoadingData(true);
    try {
      const [ticketsRes, contactsRes] = await Promise.all([
        fetch("/api/tickets"),
        fetch("/api/contacts")
      ]);
      if (ticketsRes.ok) {
        const t = await ticketsRes.json();
        setTickets(t);
      }
      if (contactsRes.ok) {
        const c = await contactsRes.json();
        setContacts(c);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.email === "admin@surtaal.com" && loginForm.password === "admin123") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    if (!formData.artistName || !formData.dayNum || !formData.month || !formData.city || !formData.venue) {
        setAddStatus("error");
        return;
    }
    setAddStatus("loading");

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAddStatus("success");
        setFormData({
          artistName: "",
          dayNum: "",
          month: "",
          weekday: "",
          city: "",
          venue: "",
          imageUrl: "",
        });
        fetchDashboardData(); // Refresh list
        setTimeout(() => setAddStatus(null), 3000);
      } else {
        setAddStatus("error");
      }
    } catch (error) {
      console.error(error);
      setAddStatus("error");
    }
  };

  const handleDeleteTicket = async (id) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    try {
      const res = await fetch(`/api/tickets?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchDashboardData();
      } else {
        alert("Failed to delete ticket.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting ticket.");
    }
  };

  const cardStyle = {
    backgroundColor: "rgba(15, 15, 15, 0.8)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    padding: "2rem",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
  };

  const gradientText = {
    background: "linear-gradient(135deg, #FF3366, #BD0040)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const metricCardStyle = {
    ...cardStyle,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative",
    overflow: "hidden",
  };

  if (!isLoggedIn) {
    return (
      <main style={{ 
        minHeight: "100vh",
        width: "100vw",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "#050505", 
        backgroundImage: "url('/ImagesOpt/EventinSurtaal/homepage_3x.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        fontFamily: "'Montserrat', sans-serif"
      }}>
        {/* Dark overlay for better readability */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(8px)" }}></div>
        
        <div style={{ ...cardStyle, maxWidth: "420px", width: "90%", position: "relative", zIndex: 1, backgroundColor: "rgba(10,10,10,0.85)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "2.5rem" }}>
             <img src="/Images/Navbar/Logo.svg" alt="Surtaal" style={{ width: "200px", marginBottom: "1.5rem" }} />
             <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: "700", fontFamily: "'Montserrat', sans-serif" }}>Admin <span style={gradientText}>Portal</span></h2>
             <p style={{ color: "#aaa", fontSize: "0.95rem", marginTop: "8px", fontWeight: "500" }}>Sign in to manage your platform.</p>
          </div>
          
          {loginError && (
             <div style={{ backgroundColor: "rgba(255,0,0,0.1)", color: "#ff4444", padding: "12px", borderRadius: "10px", marginBottom: "1.5rem", textAlign: "center", fontSize: "0.9rem", border: "1px solid rgba(255,0,0,0.2)", animation: "shake 0.4s ease-in-out" }}>
                {loginError}
             </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="admin-input-group" style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Email Address</p>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className="admin-input"
                placeholder="admin@surtaal.com"
                required
              />
            </div>
            <div className="admin-input-group" style={{ marginBottom: "2.5rem" }}>
              <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Password</p>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className="admin-input"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="admin-btn-primary">
               Sign In
            </button>
          </form>
        </div>

        <style jsx global>{`
          .admin-input {
            width: 100%;
            padding: 14px 18px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.1);
            background-color: rgba(255,255,255,0.03);
            color: #fff;
            outline: none;
            transition: all 0.3s;
            font-size: 1rem;
            font-family: 'Montserrat', sans-serif;
          }
          .admin-input:focus {
            border-color: #BD0040;
            background-color: rgba(255,255,255,0.05);
            box-shadow: 0 0 0 3px rgba(189,0,64,0.2);
          }
          .admin-btn-primary {
            width: 100%;
            padding: 16px;
            border-radius: 12px;
            background: linear-gradient(135deg, #8D0432, #BD0040);
            color: #fff;
            border: none;
            font-weight: 700;
            font-size: 1.1rem;
            font-family: 'Montserrat', sans-serif;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 10px 20px rgba(189,0,64,0.3);
          }
          .admin-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 25px rgba(189,0,64,0.4);
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
          }
        `}</style>
      </main>
    );
  }

  const tableHeaderStyle = { padding: "16px", color: "#aaa", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid rgba(255,255,255,0.1)" };
  const tableCellStyle = { padding: "16px", fontSize: "0.95rem", color: "#eee", borderBottom: "1px solid rgba(255,255,255,0.05)" };

  return (
    <main className="admin-dashboard-container">
      {/* Mobile Header (Hamburger) */}
      <div className="admin-mobile-header">
        <img src="/Images/Navbar/mobilelogo.svg" alt="Surtaal" style={{ height: "35px" }} />
        <button className="admin-hamburger" onClick={() => setIsSidebarOpen(true)}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div className={`admin-sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="admin-sidebar-header">
          <img src="/Images/Navbar/Logo.svg" alt="Surtaal" style={{ width: "150px" }} />
          <button className="admin-sidebar-close" onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Nav Label */}
        <p className="admin-sidebar-label">NAVIGATION</p>

        {/* Scrollable Nav Area */}
        <div className="admin-sidebar-nav">
          <button 
            onClick={() => { setActiveTab("overview"); setIsSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
          >
            <span className="admin-nav-icon">📊</span> Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab("tickets"); setIsSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "tickets" ? "active" : ""}`}
          >
            <span className="admin-nav-icon">🎟️</span> Manage Tickets
          </button>
          <button 
            onClick={() => { setActiveTab("contacts"); setIsSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "contacts" ? "active" : ""}`}
          >
            <span className="admin-nav-icon">✉️</span> Customer Inquiries
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-divider"></div>
          <div className="admin-sidebar-user">
            <div className="admin-sidebar-avatar">A</div>
            <div>
              <p style={{ color: "#fff", fontSize: "0.9rem", fontWeight: "700", margin: 0 }}>Admin</p>
              <p style={{ color: "#666", fontSize: "0.78rem", margin: 0 }}>admin@surtaal.com</p>
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="admin-logout-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="admin-main-content">
        {/* Background ambient glow */}
        <div className="admin-ambient-glow" />
        
        <div className="admin-content-wrapper">
            {loadingData ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: "1rem" }}>
                <div className="admin-spinner"></div>
                <p style={{ color: "#BD0040", fontSize: "1.2rem", fontWeight: "600" }}>Syncing Data...</p>
            </div>
            ) : (
            <>
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                <div className="admin-fade-in">
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", marginBottom: "0.5rem", fontWeight: "700" }}>Welcome back, <span style={gradientText}>Admin</span></h2>
                    <p style={{ color: "#888", marginBottom: "3rem", fontSize: "1.05rem", fontWeight: "500" }}>Here is what's happening with your platform today.</p>
                    
                    <div className="admin-stats-grid">
                        <div style={metricCardStyle}>
                            <div className="admin-icon-box">🎟️</div>
                            <h3 style={{ color: "#888", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Total Tickets</h3>
                            <p style={{ fontSize: "3rem", fontWeight: "800", color: "#fff" }}>{tickets.length}</p>
                        </div>
                        <div style={metricCardStyle}>
                            <div className="admin-icon-box">✉️</div>
                            <h3 style={{ color: "#888", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Contact Inquiries</h3>
                            <p style={{ fontSize: "3rem", fontWeight: "800", color: "#fff" }}>{contacts.length}</p>
                        </div>
                        <div style={metricCardStyle}>
                            <div className="admin-icon-box">👥</div>
                            <h3 style={{ color: "#888", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Site Visitors (Mock)</h3>
                            <p style={{ fontSize: "3rem", fontWeight: "800", color: "#fff" }}>12.4k</p>
                            <span style={{ color: "#00C853", fontSize: "0.85rem", marginTop: "5px", fontWeight: "600" }}>↑ 14% this week</span>
                        </div>
                        <div style={metricCardStyle}>
                            <div className="admin-icon-box">⚡</div>
                            <h3 style={{ color: "#888", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Active Sessions</h3>
                            <p style={{ fontSize: "3rem", fontWeight: "800", color: "#fff" }}>342</p>
                            <span style={{ color: "#888", fontSize: "0.85rem", marginTop: "5px" }}>Live right now</span>
                        </div>
                    </div>
                </div>
                )}

                {/* TICKETS TAB */}
                {activeTab === "tickets" && (
                <div className="admin-fade-in">
                    <div style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", fontWeight: "700", marginBottom: "0.5rem" }}>Manage Tickets</h2>
                        <p style={{ color: "#888", fontSize: "1.05rem", fontWeight: "500" }}>Add, review, and manage event tickets.</p>
                    </div>
                    
                    <div className="admin-tickets-layout">
                    {/* Add Ticket Form */}
                    <div className="admin-form-card" style={cardStyle}>
                        <h3 style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Create New Ticket</h3>
                        
                        {addStatus === "success" && (
                            <div style={{ backgroundColor: "rgba(0,200,83,0.1)", color: "#00C853", padding: "12px", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem", border: "1px solid rgba(0,200,83,0.2)" }}>
                                Ticket added successfully! It is now live.
                            </div>
                        )}
                        {addStatus === "error" && (
                            <div style={{ backgroundColor: "rgba(255,0,0,0.1)", color: "#ff4444", padding: "12px", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem", border: "1px solid rgba(255,0,0,0.2)" }}>
                                Failed to add ticket. Please fill all required fields.
                            </div>
                        )}

                        <form onSubmit={handleAddTicket} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                            <div>
                                <p style={{ color: "#aaa", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>Artist Name *</p>
                                <input type="text" name="artistName" value={formData.artistName} onChange={handleChange} className="admin-input" placeholder="e.g. Asim Azhar" required />
                            </div>

                            <div style={{ display: "flex", gap: "1rem" }}>
                                <div style={{ flex: 1 }}>
                                    <p style={{ color: "#aaa", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>Day *</p>
                                    <input type="text" name="dayNum" value={formData.dayNum} onChange={handleChange} className="admin-input" placeholder="e.g. 21" required />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ color: "#aaa", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>Month *</p>
                                    <input type="text" name="month" value={formData.month} onChange={handleChange} className="admin-input" placeholder="e.g. May" required />
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "1rem" }}>
                                <div style={{ flex: 1 }}>
                                    <p style={{ color: "#aaa", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>Weekday *</p>
                                    <input type="text" name="weekday" value={formData.weekday} onChange={handleChange} className="admin-input" placeholder="e.g. Sun" required />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ color: "#aaa", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>City *</p>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="admin-input" placeholder="e.g. Dallas, TX" required />
                                </div>
                            </div>

                            <div>
                                <p style={{ color: "#aaa", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>Venue Address *</p>
                                <textarea name="venue" value={formData.venue} onChange={handleChange} className="admin-input" placeholder="e.g. Hill Performance Hall..." required style={{ minHeight: "80px", resize: "vertical" }}></textarea>
                            </div>

                            <div>
                                <p style={{ color: "#aaa", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>Cover Image URL</p>
                                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="admin-input" placeholder="e.g. /ImagesOpt/Tickets/asim.webp" required />
                            </div>

                            <button type="submit" disabled={addStatus === "loading"} className="admin-btn-primary" style={{ marginTop: "10px", opacity: addStatus === "loading" ? 0.7 : 1 }}>
                                {addStatus === "loading" ? "Publishing..." : "+ Publish Ticket"}
                            </button>
                        </form>
                    </div>

                    {/* List of existing tickets */}
                    <div className="admin-table-card" style={{ ...cardStyle, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <div style={{ padding: "2rem 2rem 1rem" }}>
                            <h3 style={{ fontSize: "1.4rem", fontWeight: "600" }}>Live Tickets</h3>
                        </div>
                        <div className="admin-table-container">
                            {tickets.length === 0 ? <p style={{ color: "#888", padding: "0 2rem 2rem" }}>No tickets published yet.</p> : (
                            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
                                <thead>
                                <tr style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                                    <th style={tableHeaderStyle}>Artist</th>
                                    <th style={tableHeaderStyle}>Date</th>
                                    <th style={tableHeaderStyle}>Location</th>
                                    <th style={tableHeaderStyle}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tickets.map(t => (
                                    <tr key={t.id} style={{ transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.backgroundColor="rgba(255,255,255,0.03)"} onMouseOut={e => e.currentTarget.style.backgroundColor="transparent"}>
                                        <td style={{ ...tableCellStyle, fontWeight: "600", color: "#fff" }}>{t.artistName}</td>
                                        <td style={{ ...tableCellStyle, color: "#ccc" }}>{t.month} {t.dayNum}, {t.weekday}</td>
                                        <td style={{ ...tableCellStyle, color: "#ccc" }}>{t.city}</td>
                                        <td style={{ ...tableCellStyle }}>
                                            <button 
                                                onClick={() => handleDeleteTicket(t.id)}
                                                style={{ backgroundColor: "rgba(255,68,68,0.1)", color: "#ff4444", border: "1px solid rgba(255,68,68,0.3)", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600", transition: "all 0.2s" }}
                                                onMouseOver={(e) => { e.target.style.backgroundColor = "rgba(255,68,68,0.2)"; }}
                                                onMouseOut={(e) => { e.target.style.backgroundColor = "rgba(255,68,68,0.1)"; }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
                )}

                {/* CONTACTS TAB */}
                {activeTab === "contacts" && (
                <div className="admin-fade-in">
                    <div style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", fontWeight: "700", marginBottom: "0.5rem" }}>Customer Inquiries</h2>
                        <p style={{ color: "#888", fontSize: "1.05rem", fontWeight: "500" }}>Review messages submitted through the Contact Us form.</p>
                    </div>
                    <div className="admin-table-card" style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
                    <div className="admin-table-container">
                        {contacts.length === 0 ? <p style={{ color: "#888", padding: "2rem" }}>Your inbox is empty.</p> : (
                        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
                            <thead>
                            <tr style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                                <th style={tableHeaderStyle}>Received On</th>
                                <th style={tableHeaderStyle}>Client Name</th>
                                <th style={tableHeaderStyle}>Contact Details</th>
                                <th style={tableHeaderStyle}>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            {contacts.sort((a,b) => new Date(b.date) - new Date(a.date)).map(c => (
                                <tr key={c.id} style={{ transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.backgroundColor="rgba(255,255,255,0.03)"} onMouseOut={e => e.currentTarget.style.backgroundColor="transparent"}>
                                    <td style={{ ...tableCellStyle, color: "#888", whiteSpace: "nowrap" }}>
                                        {new Date(c.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        <br/><span style={{ fontSize: "0.85rem" }}>{new Date(c.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    </td>
                                    <td style={{ ...tableCellStyle, fontWeight: "600", color: "#fff" }}>{c.fullName}</td>
                                    <td style={{ ...tableCellStyle }}>
                                        <a href={`mailto:${c.email}`} style={{ color: "#BD0040", textDecoration: "none", display: "block", marginBottom: "4px", fontWeight: "600" }}>{c.email}</a>
                                        <span style={{ color: "#aaa", fontSize: "0.9rem" }}>{c.phone}</span>
                                    </td>
                                    <td style={{ ...tableCellStyle, color: "#ccc", maxWidth: "400px", lineHeight: "1.6" }}>{c.message}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        )}
                    </div>
                    </div>
                </div>
                )}
            </>
            )}
        </div>
        
        {/* Scoped CSS for Admin Layout */}
        <style jsx global>{`
          /* Typography Base */
          .admin-dashboard-container,
          .admin-dashboard-container * {
            font-family: 'Montserrat', sans-serif;
          }

          /* Container Layout */
          .admin-dashboard-container {
            display: flex;
            height: 100vh;
            width: 100vw;
            background-color: #050505;
            color: #fff;
            overflow: hidden; /* Disable scrolling on the main wrapper */
            position: relative;
          }

          /* Input and Button Styles */
          .admin-input {
            width: 100%;
            padding: 12px 16px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.1);
            background-color: rgba(255,255,255,0.03);
            color: #fff;
            outline: none;
            transition: all 0.3s;
            font-size: 0.95rem;
            font-family: 'Montserrat', sans-serif;
          }
          .admin-input:focus {
            border-color: #BD0040;
            background-color: rgba(255,255,255,0.05);
            box-shadow: 0 0 0 3px rgba(189,0,64,0.15);
          }
          .admin-btn-primary {
            width: 100%;
            padding: 14px;
            border-radius: 10px;
            background: linear-gradient(135deg, #8D0432, #BD0040);
            color: #fff;
            border: none;
            font-weight: 700;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 8px 20px rgba(189,0,64,0.25);
            font-family: 'Montserrat', sans-serif;
          }
          .admin-btn-primary:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(189,0,64,0.4);
          }

          /* Mobile Header */
          .admin-mobile-header {
            display: none;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            background-color: rgba(10,10,10,0.9);
            border-bottom: 1px solid rgba(255,255,255,0.05);
            backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 40;
            width: 100%;
          }
          .admin-hamburger {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
          }

          /* Sidebar Overlay */
          .admin-sidebar-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0,0,0,0.7);
            backdrop-filter: blur(5px);
            z-index: 45;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
          }
          .admin-sidebar-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }

          /* ========== SIDEBAR ========== */
          .admin-sidebar {
            width: 280px;
            flex-shrink: 0;
            background: linear-gradient(180deg, #0d0d0d 0%, #080808 100%);
            border-right: 1px solid rgba(255,255,255,0.06);
            display: flex;
            flex-direction: column;
            z-index: 50;
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          /* Sidebar accent line on left edge */
          .admin-sidebar::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 3px;
            background: linear-gradient(180deg, transparent, #BD0040 40%, #8D0432 80%, transparent);
            opacity: 0.5;
          }

          /* Sidebar Header */
          .admin-sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.8rem 1.5rem 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            flex-shrink: 0;
          }

          .admin-sidebar-close {
            display: none;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 7px;
            cursor: pointer;
            color: #aaa;
            transition: all 0.2s;
            line-height: 0;
          }
          .admin-sidebar-close:hover {
            background: rgba(255,68,68,0.15);
            border-color: rgba(255,68,68,0.3);
            color: #ff6b6b;
          }

          /* Sidebar Nav Label */
          .admin-sidebar-label {
            padding: 1.5rem 1.5rem 0.6rem;
            color: #444;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 2px;
            flex-shrink: 0;
          }

          /* Scrollable Nav Area */
          .admin-sidebar-nav {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0.5rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 4px;
            scrollbar-width: thin;
            scrollbar-color: rgba(189,0,64,0.3) transparent;
          }
          .admin-sidebar-nav::-webkit-scrollbar {
            width: 4px;
          }
          .admin-sidebar-nav::-webkit-scrollbar-track {
            background: transparent;
          }
          .admin-sidebar-nav::-webkit-scrollbar-thumb {
            background: rgba(189,0,64,0.3);
            border-radius: 4px;
          }

          .admin-nav-item {
            padding: 13px 16px;
            background-color: transparent;
            border: none;
            border-radius: 10px;
            color: #777;
            text-align: left;
            cursor: pointer;
            transition: all 0.25s ease;
            font-weight: 600;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            width: 100%;
            letter-spacing: 0.3px;
          }
          .admin-nav-icon {
            margin-right: 12px;
            font-size: 1.1rem;
            width: 24px;
            text-align: center;
            flex-shrink: 0;
          }
          .admin-nav-item:hover {
            color: #ddd;
            background-color: rgba(255,255,255,0.05);
            transform: translateX(3px);
          }
          .admin-nav-item.active {
            background: linear-gradient(90deg, rgba(189,0,64,0.2), rgba(189,0,64,0.05));
            color: #ff3d6b;
            border-left: 3px solid #BD0040;
            padding-left: 13px;
          }
          .admin-nav-item.active .admin-nav-icon {
            filter: drop-shadow(0 0 6px rgba(189,0,64,0.8));
          }

          /* Sidebar Footer */
          .admin-sidebar-footer {
            flex-shrink: 0;
            padding: 1rem 1rem 1.5rem;
          }
          .admin-sidebar-divider {
            height: 1px;
            background: rgba(255,255,255,0.05);
            margin-bottom: 1.2rem;
          }
          .admin-sidebar-user {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 0 0.5rem;
            margin-bottom: 1rem;
          }
          .admin-sidebar-avatar {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: linear-gradient(135deg, #8D0432, #BD0040);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1rem;
            color: #fff;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(189,0,64,0.3);
          }

          .admin-logout-btn {
            width: 100%;
            padding: 12px 16px;
            background-color: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.07);
            color: #888;
            cursor: pointer;
            border-radius: 10px;
            transition: all 0.25s;
            font-weight: 600;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .admin-logout-btn:hover {
            background-color: rgba(255,68,68,0.1);
            border-color: rgba(255,68,68,0.25);
            color: #ff6b6b;
          }

          /* Main Content Area */
          .admin-main-content {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden; /* Prevent horizontal scrolling on the main section */
            padding: 3rem;
            position: relative;
            min-width: 0; /* Important for flex children to not overflow */
          }
          .admin-content-wrapper {
            position: relative;
            z-index: 1;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
          }

          /* Ambient Glow Background */
          .admin-ambient-glow {
            position: absolute;
            top: -20%;
            right: -20%;
            width: 80%;
            height: 80%;
            background: radial-gradient(circle, rgba(189,0,64,0.08) 0%, transparent 60%);
            z-index: 0;
            pointer-events: none;
          }

          .admin-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 2rem;
          }

          .admin-icon-box {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(141,4,50,0.15), rgba(189,0,64,0.15));
            border: 1px solid rgba(189,0,64,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.2rem;
            font-size: 1.4rem;
          }

          /* Layout for Tickets Tab */
          .admin-tickets-layout {
            display: flex;
            gap: 2.5rem;
            align-items: stretch;
          }

          .admin-table-container {
            overflow-x: auto;
            flex: 1;
            width: 100%;
          }

          /* Animations */
          .admin-fade-in {
            animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .admin-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(189,0,64,0.2);
            border-top: 4px solid #BD0040;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #050505; 
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.1); 
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(189,0,64,0.8); 
          }

          /* Responsive Breakpoints */
          @media (max-width: 1024px) {
             .admin-tickets-layout {
                flex-direction: column;
             }
             .admin-form-card {
                max-width: 100% !important;
                flex: none !important;
             }
             .admin-table-card {
                max-width: 100% !important;
                flex: none !important;
             }
          }

          @media (max-width: 900px) {
            .admin-sidebar {
              position: fixed;
              top: 0;
              left: 0;
              height: 100%;
              height: 100dvh;
              width: 300px;
              max-width: 85vw;
              transform: translateX(-105%);
              box-shadow: none;
              border-right: none;
            }
            .admin-sidebar.open {
              transform: translateX(0);
              box-shadow: 8px 0 40px rgba(0,0,0,0.7), 2px 0 0 rgba(189,0,64,0.15);
            }
            .admin-mobile-header {
              display: flex;
            }
            .admin-sidebar-overlay {
              display: block;
            }
            .admin-sidebar-close {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .admin-main-content {
              padding: 5.5rem 1rem 2.5rem;
              height: 100dvh;
            }
            .admin-stats-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 480px) {
            .admin-main-content {
              padding: 5rem 0.75rem 2rem;
            }
          }
        `}</style>
      </section>
    </main>
  );
}
