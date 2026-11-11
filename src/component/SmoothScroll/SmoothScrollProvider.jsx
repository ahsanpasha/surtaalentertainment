"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const HERO_SELECTORS = ".MainHome, .AboutusMain";

function initScrollReveal(observer) {
  const candidates = document.querySelectorAll(
    "main > div, main > section, .galleryContainer, .FooterWrapper"
  );

  candidates.forEach((el, index) => {
    if (el.matches(HERO_SELECTORS) || el.closest(HERO_SELECTORS)) return;
    if (el.classList.contains("is-visible")) return;

    if (!el.classList.contains("scroll-reveal")) {
      el.classList.add("scroll-reveal");
      const stagger = Math.min(index % 4, 3) * 0.05;
      el.style.setProperty("--reveal-delay", `${stagger}s`);
    }

    observer.observe(el);
  });
}

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      document.documentElement.classList.add("reduce-motion");
      return;
    }

    const isTouch = window.innerWidth <= 768 || "ontouchstart" in window;

    let lenis = null;
    let rafId = 0;

    // Run Lenis smooth scrolling only on desktop mouse devices to keep mobile 120Hz native & ultra-responsive
    if (!isTouch) {
      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 0,
      });

      window.lenis = lenis;
      document.documentElement.classList.add("lenis-enabled");

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
    );

    initScrollReveal(revealObserver);
    requestAnimationFrame(() => {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          el.classList.add("is-visible");
          revealObserver.unobserve(el);
        }
      });
    });

    const lateInit = setTimeout(() => initScrollReveal(revealObserver), 400);

    return () => {
      clearTimeout(lateInit);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        document.documentElement.classList.remove("lenis-enabled");
        if (window.lenis === lenis) delete window.lenis;
      }
      revealObserver.disconnect();
    };
  }, []);

  return children;
}
