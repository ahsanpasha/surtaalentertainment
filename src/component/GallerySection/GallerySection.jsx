"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import "./GallerySection.css";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "@/data/galleryData";

export default function GallerySection({ isHomePage = false, initialLimitPerCity = 8 }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCities, setExpandedCities] = useState({});
  const [lightboxState, setLightboxState] = useState({ isOpen: false, cityId: null, index: 0 });

  // Map items by city
  const itemsByCity = useMemo(() => {
    const map = {};
    for (const cat of GALLERY_CATEGORIES) {
      map[cat.id] = GALLERY_ITEMS.filter((item) => item.categoryId === cat.id);
    }
    return map;
  }, []);

  // Filtered categories to display
  const displayedCategories = useMemo(() => {
    if (activeCategory === "all") {
      return GALLERY_CATEGORIES;
    }
    return GALLERY_CATEGORIES.filter((cat) => cat.id === activeCategory);
  }, [activeCategory]);

  // Handle category tab click
  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    // If selecting a single city, auto-expand it
    if (categoryId !== "all") {
      setExpandedCities((prev) => ({ ...prev, [categoryId]: true }));
    }
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };

  // Toggle expand for a specific city in "all" mode
  const toggleCityExpand = (cityId) => {
    setExpandedCities((prev) => ({
      ...prev,
      [cityId]: !prev[cityId],
    }));
    setTimeout(() => {
      AOS.refresh();
    }, 120);
  };

  // Lightbox active list
  const currentCityItems = useMemo(() => {
    if (!lightboxState.isOpen || !lightboxState.cityId) return [];
    return itemsByCity[lightboxState.cityId] || [];
  }, [lightboxState, itemsByCity]);

  const currentLightboxItem = currentCityItems[lightboxState.index] || null;

  const openLightbox = (cityId, index) => {
    setLightboxState({ isOpen: true, cityId, index });
  };

  const closeLightbox = useCallback(() => {
    setLightboxState({ isOpen: false, cityId: null, index: 0 });
  }, []);

  const showNextImage = useCallback(() => {
    if (!currentCityItems.length) return;
    setLightboxState((prev) => ({
      ...prev,
      index: (prev.index + 1) % currentCityItems.length,
    }));
  }, [currentCityItems.length]);

  const showPrevImage = useCallback(() => {
    if (!currentCityItems.length) return;
    setLightboxState((prev) => ({
      ...prev,
      index: (prev.index - 1 + currentCityItems.length) % currentCityItems.length,
    }));
  }, [currentCityItems.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxState.isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
    };

    if (lightboxState.isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxState.isOpen, closeLightbox, showNextImage, showPrevImage]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="gallery-section-wrapper" id="tour-gallery">
      {/* Top Badge */}
      <div className="ServicesDiv" style={{ width: "fit-content" }} data-aos="fade-down">
        <div className="CircleServices"></div>
        <p className="ServicesText">Meet &amp; Greet Moments</p>
      </div>

      {/* Main Heading */}
      <h2 className="WhatWeOffer" data-aos="fade-down">
        Tour <span>Meet &amp; Greet Moments</span>
      </h2>

      {/* Description */}
      <p className="ServiceDescTop" data-aos="fade-down">
        Exclusive fan interactions, memorable artist sessions, and intimate backstage moments with
        Zain Zohaib during Surtaal&apos;s sold-out tour across North America.
      </p>

      {/* Featured Tour Banner */}
      <div className="gallery-tour-banner" data-aos="fade-up">
        <div className="gallery-banner-left">
          <div className="gallery-pulse-dot"></div>
          <h3 className="gallery-banner-title">
            <span>Zain Zohaib</span> Meet &amp; Greet Canada 2026 Tour
          </h3>
        </div>
        <div className="gallery-banner-stats">
          <span className="gallery-stat-pill">99 Moments</span>
          <span className="gallery-stat-pill">4 Landmark Cities</span>
          <span className="gallery-stat-pill">100% Sold Out Tour</span>
        </div>
      </div>

      {/* Quick City Filter Bar */}
      <div className="gallery-filter-bar" data-aos="fade-up">
        <button
          type="button"
          className={`gallery-filter-tab${activeCategory === "all" ? " active" : ""}`}
          onClick={() => handleCategorySelect("all")}
        >
          All Cities
          <span className="gallery-tab-badge">{GALLERY_ITEMS.length}</span>
        </button>

        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`gallery-filter-tab${activeCategory === cat.id ? " active" : ""}`}
            onClick={() => handleCategorySelect(cat.id)}
          >
            {cat.name}
            <span className="gallery-tab-badge">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* City Sections Container */}
      <div className="gallery-cities-container">
        {displayedCategories.map((city) => {
          const cityPhotos = itemsByCity[city.id] || [];
          const isExpanded = isHomePage
            ? false
            : activeCategory === city.id || Boolean(expandedCities[city.id]);
          const displayLimit = isHomePage
            ? Math.min(4, cityPhotos.length)
            : isExpanded
            ? cityPhotos.length
            : initialLimitPerCity;
          const photosToShow = cityPhotos.slice(0, displayLimit);

          return (
            <div key={city.id} id={city.id} className="gallery-city-section" data-aos="fade-up">
              {/* City Section Heading - e.g. Toronto Meet and Greet Moments */}
              <div className="gallery-city-header">
                <div className="gallery-city-header-left">
                  <div className="gallery-city-badge">
                    <span className="gallery-city-badge-dot"></span>
                    <span>{city.city}</span>
                  </div>
                  <h3 className="gallery-city-heading">
                    {city.name} <span>Meet &amp; Greet Moments</span>
                  </h3>
                  <p className="gallery-city-venue">
                    <strong>{city.venue}</strong> • Meet &amp; Greet Session • Full Attendance
                  </p>
                </div>

                <div className="gallery-city-header-right">
                  <span className="gallery-city-count-pill">{city.count} Photographs</span>
                </div>
              </div>

              {/* Grid of Optimized Thumbnails */}
              <div className="gallery-grid">
                {photosToShow.map((item, index) => (
                  <div
                    key={item.id}
                    className="gallery-card"
                    data-aos="fade-up"
                    data-aos-delay={(index % 4) * 50}
                    onClick={() => openLightbox(city.id, index)}
                  >
                    <div className="gallery-img-wrapper">
                      <img
                        src={item.thumb}
                        alt={`${city.name} Meet and Greet Moment ${index + 1}`}
                        className="gallery-img"
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={300}
                      />
                    </div>

                    {/* Overlay on hover */}
                    <div className="gallery-card-overlay">
                      <div className="gallery-card-top-action">
                        <div className="gallery-zoom-icon-btn" aria-label="View photo">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                          </svg>
                        </div>
                      </div>

                      <div className="gallery-card-caption">
                        <div className="gallery-card-city-badge">
                          <span className="gallery-card-city-badge-dot"></span>
                          {city.name} Meet &amp; Greet
                        </div>
                        <p className="gallery-card-venue">{city.venue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expand / Collapse Button for City in "All Cities" mode */}
              {!isHomePage && activeCategory === "all" && cityPhotos.length > initialLimitPerCity && (
                <div className="gallery-city-footer">
                  <button
                    type="button"
                    className={`gallery-city-expand-btn${isExpanded ? " is-expanded" : ""}`}
                    onClick={() => toggleCityExpand(city.id)}
                  >
                    {isExpanded
                      ? `Show Less ${city.name} Moments`
                      : `View All ${city.count} ${city.name} Meet & Greet Moments`}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Homepage Call To Action to visit Full Gallery */}
      {isHomePage ? (
        <div className="gallery-homepage-cta-wrapper" data-aos="fade-up">
          <button
            type="button"
            className="gallery-load-more-btn"
            onClick={() => router.push("/gallery")}
          >
            Explore Full Meet &amp; Greet Gallery (99 Photos)
            <img src="/Images/Navbar/arrow.svg" alt="" />
          </button>
        </div>
      ) : (
        <div className="gallery-bottom-cta" data-aos="fade-up">
          <button
            type="button"
            className="gallery-contact-btn"
            onClick={() => router.push("/contact-us")}
          >
            Book An Artist For Your Event
            <img src="/Images/Navbar/arrow.svg" alt="" />
          </button>
          <button
            type="button"
            className="gallery-secondary-btn"
            onClick={() => router.push("/tickets")}
          >
            View Event Schedule
            <img src="/Images/Navbar/arrowred.svg" alt="" />
          </button>
        </div>
      )}

      {/* Lightbox Modal (fetches high-res 1400px WebP ONLY on-demand) */}
      {lightboxState.isOpen && currentLightboxItem && (
        <div
          className="gallery-lightbox-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="gallery-lightbox-container">
            {/* Header with counter and close button */}
            <div className="gallery-lightbox-header">
              <div className="gallery-lightbox-counter">
                {currentLightboxItem.categoryName} Meet &amp; Greet • Photo <span>{lightboxState.index + 1}</span> of {currentCityItems.length}
              </div>
              <div className="gallery-lightbox-actions">
                <button
                  type="button"
                  className="gallery-lightbox-btn"
                  onClick={closeLightbox}
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Prev Button */}
            <button
              type="button"
              className="gallery-lightbox-nav-btn gallery-lightbox-prev"
              onClick={showPrevImage}
              aria-label="Previous photograph"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Image Stage */}
            <div className="gallery-lightbox-image-stage">
              <img
                src={currentLightboxItem.src}
                alt={`${currentLightboxItem.categoryName} Meet and Greet Highlight`}
                className="gallery-lightbox-image"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              className="gallery-lightbox-nav-btn gallery-lightbox-next"
              onClick={showNextImage}
              aria-label="Next photograph"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Footer with caption & download */}
            <div className="gallery-lightbox-footer">
              <div className="gallery-lightbox-footer-info">
                <p className="gallery-lightbox-city">
                  <span>{currentLightboxItem.categoryName}</span> • Meet &amp; Greet Session
                </p>
                <p className="gallery-lightbox-venue">
                  {currentLightboxItem.venue} — Zain Zohaib Meet &amp; Greet Canada 2026
                </p>
              </div>
              <a
                href={currentLightboxItem.src}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-lightbox-download-link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Photo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
