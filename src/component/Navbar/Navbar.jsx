"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

const navLinks = [
  { label: "Events in Surtaal", href: "/" },
  { label: "Tickets", href: "/tickets" },
  { label: "About Us", href: "/about-us" },
  { label: "Artists", href: "/artists" },
  { label: "Our Team", href: "/our-team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemRefs = useRef({});

  const activePage =
    navLinks.find((l) => l.href === pathname)?.label ?? "Events in Surtaal";

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

  // Sliding highlight recalculation
  useEffect(() => {
    function recalcHighlight() {
      const el = itemRefs.current[activePage];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement?.getBoundingClientRect();
      const leftWithinParent = parentRect
        ? rect.left - parentRect.left
        : el.offsetLeft;
      setHighlightStyle({
        width: `${Math.round(rect.width)}px`,
        transform: `translateX(${Math.round(leftWithinParent)}px) translateY(-50%)`,
        top: "50%",
        // full height of the pill container
        height: "100%",
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
      }}
    >
      {/* ── Desktop Navbar ── */}
      {!isMobile && (
        <div
          className="navbar-desktop"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            width: "100%",
            /* 1920px spec: padding-top 40.66px, left/right 90px */
            padding: "40.66px 90px 25px",
            backgroundColor: scrolled ? "rgba(8,6,0,0.88)" : "transparent",
            backdropFilter: scrolled ? "blur(18px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid transparent",
            transition: "background-color 0.4s ease, border-color 0.4s ease",
            boxSizing: "border-box",
          }}
        >
          {/* LEFT: Logo — 250px wide */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center" }}>
              <img
                src="/Images/Navbar/Logo.svg"
                alt="Surtaal Entertainment"
                style={{ width: "250px", height: "auto", objectFit: "contain" }}
              />
            </Link>
          </div>

          {/* CENTER: Nav Pill */}
          <div
            style={{
              /* spec: height 61.23px, bg #FFFFFF14, radius 50px, no padding */
              height: "61.234771728515625px",
              backgroundColor: "#FFFFFF14",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              gap: "0px",
              padding: "0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Sliding White Highlight */}
            <div
              style={{
                position: "absolute",
                left: "0px",
                backgroundColor: "#FFFFFF",
                borderRadius: "50px",
                transition:
                  "transform 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)",
                zIndex: 0,
                ...highlightStyle,
              }}
            />

            {/* Nav Items */}
            {navLinks.map(({ label, href }) => {
              const isActive = activePage === label;
              return (
                <Link
                  key={label}
                  href={href}
                  ref={(el) => (itemRefs.current[label] = el)}
                  className="buttonnavbar"
                  style={{
                    /* full pill height, no extra padding, let flex center vertically */
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50px",
                    cursor: "pointer",
                    zIndex: 1,
                    position: "relative",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    padding: "0 28px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: isActive
                        ? "Sora-SemiBold, sans-serif"
                        : "Sora-Regular, sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "22px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      textAlign: "center",
                      color: isActive ? "#BD0040" : "#FFFFFF",
                    }}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Contact Us Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="contact-btn"
              onClick={() => router.push("/contact-us")}
            >
              Contact Us
              <img src="/Images/Navbar/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile Top Bar ── */}
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
            borderBottom: scrolled
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid transparent",
            transition: "background-color 0.4s ease",
          }}
        >
          <Link href="/" style={{ display: "inline-flex", alignItems: "center" }}>
            <img
              src="/Images/Navbar/Logo.svg"
              alt="Surtaal Entertainment"
              style={{ width: "160px", height: "auto", objectFit: "contain" }}
            />
          </Link>
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
            alt="Surtaal Entertainment"
            style={{ width: "140px", height: "auto", objectFit: "contain" }}
          />
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              color: "#fff",
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        {/* Drawer Nav Items */}
        <List sx={{ px: 1, pt: 1 }}>
          {navLinks.map(({ label, href }) => {
            const isActive = activePage === label;
            return (
              <ListItem key={label} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    borderRadius: "10px",
                    bgcolor: isActive ? "#ffffff" : "transparent",
                    py: 1.4,
                    px: 2,
                   
          
                  }}
                >
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: "15px",
                      fontWeight: isActive ? 600 : 400,
                      fontFamily: isActive
                        ? "Sora-SemiBold, sans-serif"
                        : "Sora-Regular, sans-serif",
                      color: isActive ? "#BD0040" : "#ffffff",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Drawer Contact Us */}
        <div style={{ padding: "16px" }}>
          <button
            className="contact-btn"
            style={{ width: "100%" }}
            onClick={() => {
              setDrawerOpen(false);
              router.push("/contact-us");
            }}
          >
            Contact Us
          </button>
        </div>
      </Drawer>
    </AppBar>
  );
}
