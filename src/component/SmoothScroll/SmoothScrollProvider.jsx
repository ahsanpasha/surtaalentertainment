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
      const stagger = Math.min(index % 4, 3) * 0.09;
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
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
    });

    document.documentElement.classList.add("lenis-enabled");

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    initScrollReveal(revealObserver);

    let debounceTimer;
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => initScrollReveal(revealObserver), 120);
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const lateInit = setTimeout(() => initScrollReveal(revealObserver), 600);

    return () => {
      clearTimeout(debounceTimer);
      clearTimeout(lateInit);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      revealObserver.disconnect();
      mutationObserver.disconnect();
      document.documentElement.classList.remove("lenis-enabled");
    };
  }, []);

  return children;
}
