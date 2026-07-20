"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemRefs = useRef({});

  const activePage =
    navLinks.find((l) => l.href === pathname)?.label || null;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1050);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function recalcHighlight() {
      const el = itemRefs.current[activePage];
      if (!el) {
        setHighlightStyle({ opacity: 0 });
        return;
      }
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement?.getBoundingClientRect();
      const leftWithinParent = parentRect
        ? rect.left - parentRect.left
        : el.offsetLeft;
      setHighlightStyle({
        opacity: 1,
        width: `${Math.round(rect.width)}px`,
        transform: `translateX(${Math.round(leftWithinParent)}px) translateY(-50%)`,
        top: "50%",
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

  const closeMenu = () => setMenuOpen(false);

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
      {!isMobile && (
        <div
          className="navbar-desktop"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            width: "100%",
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <img
                src="/Images/Navbar/Logo.svg"
                alt="Surtaal Entertainment"
                className="navbar-logo"
              />
            </Link>
          </div>

          <div
            className="navbar-pill"
            style={{
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

            {navLinks.map(({ label, href }) => {
              const isActive = activePage === label;
              return (
                <Link
                  key={label}
                  href={href}
                  ref={(el) => (itemRefs.current[label] = el)}
                  className="buttonnavbar"
                  style={{
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
                    className="navbar-link-text"
                    style={{
                      fontFamily: isActive
                        ? "Sora-SemiBold, sans-serif"
                        : "Sora-Regular, sans-serif",
                      fontWeight: isActive ? 600 : 400,
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

      {isMobile && (
        <div
          className="navbar-mobile-bar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: scrolled ? "rgba(8,6,0,0.9)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid transparent",
            transition: "background-color 0.4s ease",
          }}
        >
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center" }}
            onClick={closeMenu}
          >
            <img
              src="/Images/Navbar/Logo.svg"
              alt="Surtaal Entertainment"
              className="navbar-mobile-logo"
            />
          </Link>

          <button
            type="button"
            className={`navbar-menu-toggle${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      )}

      <div
        className={`navbar-fullscreen-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="navbar-fullscreen-backdrop" onClick={closeMenu} />

        <div className="navbar-fullscreen-panel">
          <div className="navbar-fullscreen-header">
            <img
              src="/Images/Navbar/Logo.svg"
              alt="Surtaal Entertainment"
              className="navbar-fullscreen-logo"
            />
            <button
              type="button"
              className="navbar-fullscreen-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="navbar-fullscreen-nav">
            {navLinks.map(({ label, href }, index) => {
              const isActive = activePage === label;
              return (
                <Link
                  key={label}
                  href={href}
                  className={`navbar-fullscreen-link${isActive ? " active" : ""}`}
                  style={{ animationDelay: `${0.08 + index * 0.07}s` }}
                  onClick={closeMenu}
                >
                  <span className="navbar-fullscreen-link-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="navbar-fullscreen-link-text">{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="navbar-fullscreen-footer">
            <button
              type="button"
              className="contact-btn navbar-fullscreen-contact"
              onClick={() => {
                closeMenu();
                router.push("/contact-us");
              }}
            >
              Contact Us
              <img src="/Images/Navbar/arrow.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </AppBar>
  );
}
