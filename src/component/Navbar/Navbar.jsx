"use client";
import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";

const pages = ["Events in Surtaal", "Tickets", "About Us", "Artists", "Our Team"];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePage, setActivePage] = useState("Events in Surtaal");
  const [highlightStyle, setHighlightStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemRefs = useRef({});
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (page) => {
    const sectionId = page.replace(/\s+/g, "-").toLowerCase();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageClick = (page) => {
    setActivePage(page);
    setDrawerOpen(false);
    handleScrollToSection(page);
  };

  // Sliding highlight for the pill
  useEffect(() => {
    function recalcHighlight() {
      const el = itemRefs.current[activePage];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement?.getBoundingClientRect();
      const leftWithinParent = parentRect ? rect.left - parentRect.left : el.offsetLeft;
      setHighlightStyle({
        width: `${Math.round(rect.width)}px`,
        transform: `translateX(${Math.round(leftWithinParent)}px) translateY(-50%)`,
        top: "50%",
        height: "80%",
      });
    }

    recalcHighlight();
    if (document.fonts?.ready) {
      document.fonts.ready.then(recalcHighlight).catch(() => {});
    }
    window.addEventListener("resize", recalcHighlight);
    window.addEventListener("orientationchange", recalcHighlight);
    return () => {
      window.removeEventListener("resize", recalcHighlight);
      window.removeEventListener("orientationchange", recalcHighlight);
    };
  }, [activePage, isMobile]);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
        px: 0,
      }}
    >
      {/* ── Desktop Navbar ── */}
      {!isMobile && (
        <div
          ref={navRef}
          className="navbar-desktop"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            width: "100%",
            padding: "16px 40px",
            backgroundColor: scrolled ? "rgba(8,6,0,0.85)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
            transition: "background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
          }}
        >
          {/* ── LEFT: Logo ── */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/Images/Navbar/Logo.svg"
              alt="Surtaal Entertainment Logo"
              style={{
                height: "40px",
                width: "auto",
                cursor: "pointer",
                objectFit: "contain",
              }}
              onClick={() => handlePageClick("Events in Surtaal")}
            />
          </div>

          {/* ── CENTER: Nav Pill ── */}
          <div
            style={{
              backgroundColor: "#0F0F0F",
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              padding: "5px 6px",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Sliding Highlight */}
            <div
              style={{
                position: "absolute",
                left: "6px",
                backgroundColor: "#FFFFFF",
                borderRadius: "100px",
                transition:
                  "transform 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)",
                zIndex: 0,
                ...highlightStyle,
              }}
            />

            {/* Nav Items */}
            {pages.map((page) => (
              <div
                key={page}
                ref={(el) => (itemRefs.current[page] = el)}
                onClick={() => handlePageClick(page)}
                className="buttonnavbar"
                style={{
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "100px",
                  cursor: "pointer",
                  zIndex: 1,
                  position: "relative",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: activePage === page ? "600" : "400",
                    letterSpacing: "0.01em",
                    color: activePage === page ? "#0F0F0F" : "#CBD5E1",
                    transition: "color 0.3s ease",
                    fontFamily: "Georama-Medium, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {page}
                </span>
              </div>
            ))}
          </div>

          {/* ── RIGHT: Contact Us Button ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <button
              className="contact-btn"
              onClick={() => handleScrollToSection("contact-us")}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile Navbar ── */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "14px 20px",
            backgroundColor: scrolled ? "rgba(8,6,0,0.9)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
            transition: "background-color 0.4s ease",
          }}
        >
          {/* Mobile Logo */}
          <img
            src="/Images/Navbar/Logo.svg"
            alt="Surtaal Entertainment Logo"
            style={{ height: "34px", width: "auto", objectFit: "contain", cursor: "pointer" }}
            onClick={() => handlePageClick("Events in Surtaal")}
          />

          {/* Hamburger */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#fff",
              padding: "8px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </div>
      )}

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#0a0900",
            width: "280px",
            paddingTop: "16px",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
          },
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <img
            src="/Images/Navbar/Logo.svg"
            alt="Surtaal Entertainment Logo"
            style={{ height: "30px", width: "auto", objectFit: "contain" }}
          />
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.08)" } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        {/* Drawer Nav Items */}
        <List sx={{ px: 1, pt: 1 }}>
          {pages.map((page) => (
            <ListItem key={page} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handlePageClick(page)}
                sx={{
                  borderRadius: "10px",
                  bgcolor: page === activePage ? "#ffffff" : "transparent",
                  color: page === activePage ? "#0F0F0F" : "#CBD5E1",
                  py: 1.4,
                  px: 2,
                  "&:hover": {
                    bgcolor: page === activePage ? "#f0f0f0" : "rgba(255,255,255,0.06)",
                  },
                  transition: "background-color 0.2s ease, color 0.2s ease",
                }}
              >
                <ListItemText
                  primary={page}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: page === activePage ? 600 : 400,
                    fontFamily: "Georama-Medium, sans-serif",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Drawer Contact Us */}
        <div style={{ padding: "16px", marginTop: "auto" }}>
          <button
            className="contact-btn"
            style={{ width: "100%" }}
            onClick={() => {
              setDrawerOpen(false);
              handleScrollToSection("contact-us");
            }}
          >
            Contact Us
          </button>
        </div>
      </Drawer>
    </AppBar>
  );
}
