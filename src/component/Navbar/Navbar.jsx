"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const [closing, setClosing] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState({ opacity: 0 });
  const [scrolled, setScrolled] = useState(false);
  const itemRefs = useRef({});
  const closeTimer = useRef(null);

  const activePage =
    navLinks.find((l) => l.href === pathname)?.label || null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      if (!el || window.innerWidth <= 1050) {
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
    return () => window.removeEventListener("resize", recalcHighlight);
  }, [activePage, pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    if (!menuOpen || closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 480);
  };

  const toggleMenu = () => {
    if (menuOpen) closeMenu();
    else openMenu();
  };

  const menuVisible = menuOpen || closing;

  return (
    <header className={`navbar-root${scrolled ? " is-scrolled" : ""}`}>
      {/* Desktop — always in DOM, CSS hides on mobile */}
      <div className="navbar-desktop">
        <div className="navbar-desktop-inner">
          <div className="navbar-brand">
            <Link href="/" className="navbar-brand-link">
              <img
                src="/Images/Navbar/Logo.svg"
                alt="Surtaal Entertainment"
                className="navbar-logo"
                width={250}
                height={60}
                fetchPriority="high"
                decoding="async"
              />
            </Link>
          </div>

          <div className="navbar-pill">
            <div className="navbar-pill-highlight" style={highlightStyle} />
            {navLinks.map(({ label, href }) => {
              const isActive = activePage === label;
              return (
                <Link
                  key={label}
                  href={href}
                  ref={(el) => {
                    itemRefs.current[label] = el;
                  }}
                  className={`buttonnavbar${isActive ? " is-active" : ""}`}
                >
                  <span className="navbar-link-text">{label}</span>
                </Link>
              );
            })}
          </div>

          <div className="navbar-desktop-cta">
            <button
              type="button"
              className="contact-btn"
              onClick={() => router.push("/contact-us")}
            >
              Contact Us
              <img src="/Images/Navbar/arrow.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile bar — always in DOM, CSS hides on desktop */}
      <div className="navbar-mobile-bar">
        <button
          type="button"
          className={`navbar-menu-toggle${menuOpen && !closing ? " open" : ""}${closing ? " closing" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen && !closing}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="navbar-vertical-line" aria-hidden="true" />
        <Link href="/" className="navbar-brand-link" onClick={closeMenu}>
          <img
            src="/Images/Navbar/mobilelogo.svg"
            alt="Surtaal Entertainment"
            className="navbar-mobile-logo"
            width={160}
            height={40}
            fetchPriority="high"
            decoding="async"
          />
        </Link>
        <button
          type="button"
          className="call-now-btn"
          onClick={() => router.push("/contact-us")}
        >
          <img src="/Images/Navbar/callnow.svg" alt="" />
          Call Now
        </button>
      </div>

      {/* Classic fullscreen menu */}
      <div
        className={`navbar-fullscreen-menu${menuVisible ? " open" : ""}${closing ? " is-closing" : ""}`}
        aria-hidden={!menuVisible}
      >
        <div className="navbar-fullscreen-backdrop" onClick={closeMenu} />

        <div className="navbar-fullscreen-panel">
          <div className="navbar-fullscreen-grain" aria-hidden="true" />

          <div className="navbar-fullscreen-header">
            <img
              src="/Images/Navbar/mobilelogo.svg"
              alt="Surtaal Entertainment"
              className="navbar-fullscreen-logo"
              width={150}
              height={40}
              decoding="async"
            />
          </div>

          <nav className="navbar-fullscreen-nav">
            {navLinks.map(({ label, href }, index) => {
              const isActive = activePage === label;
              return (
                <Link
                  key={label}
                  href={href}
                  className={`navbar-fullscreen-link${isActive ? " active" : ""}`}
                  style={{ "--i": index }}
                  onClick={closeMenu}
                >
                  <span className="navbar-fullscreen-link-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="navbar-fullscreen-link-text">{label}</span>
                  <span className="navbar-fullscreen-link-arrow" aria-hidden="true">
                    →
                  </span>
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
                setTimeout(() => router.push("/contact-us"), 200);
              }}
            >
              Contact Us
              <img src="/Images/Navbar/arrow.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
