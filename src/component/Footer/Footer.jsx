"use client";
import React from "react";
import "./Footer.css";
import { FaTiktok } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div>
      <div className="galleryContainer">
        <div className="galleryRow">
          <div className="imageBox">
            <img src="/ImagesOpt/Footer/Footer1.webp" className="imgDefault" alt="" loading="lazy" decoding="async" />
            <img src="/ImagesOpt/Footer/FooterHover1.webp" className="imgHover" alt="" loading="lazy" decoding="async" />
          </div>

          <div className="imageBox">
            <img src="/ImagesOpt/Footer/Footer2.webp" className="imgDefault" alt="" loading="lazy" decoding="async" />
            <img src="/ImagesOpt/Footer/FooterHover2.webp" className="imgHover" alt="" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="galleryRow">
          <div className="imageBox">
            <img src="/ImagesOpt/Footer/Footer3.webp" className="imgDefault" alt="" loading="lazy" decoding="async" />
            <img src="/ImagesOpt/Footer/FooterHover3.webp" className="imgHover" alt="" loading="lazy" decoding="async" />
          </div>

          <div className="imageBox">
            <img src="/ImagesOpt/Footer/Footer4.webp" className="imgDefault" alt="" loading="lazy" decoding="async" />
            <img src="/ImagesOpt/Footer/FooterHover4.webp" className="imgHover" alt="" loading="lazy" decoding="async" />
          </div>

          <div className="imageBox">
            <img src="/ImagesOpt/Footer/Footer5.webp" className="imgDefault" alt="" loading="lazy" decoding="async" />
            <img src="/ImagesOpt/Footer/FooterHover5.webp" className="imgHover" alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <div className="FooterWrapper">
        <div className="FooterInfoContainer">
          {/* Desktop Layout */}
          <div className="FooterTop FooterTopDesktop">
            <img src="/Images/Navbar/Logo.svg" alt="Surtaal Entertainment" />

            <div className="FooterNavLinks">
              <a href="/" className="FooterLink active">
                Events in Surtaal
              </a>
              <a href="/about-us" className="FooterLink">
                About Us
              </a>
              <a href="/artists" className="FooterLink">
                Artists
              </a>
              <a href="/our-team" className="FooterLink">
                Our Team
              </a>
            </div>
            <div className="FooterSocials">
              <span>Follow Us On:</span>
              <div className="SocialIcon">
                <a href="https://www.tiktok.com/@surtaalentusa" target="_blank" rel="noopener noreferrer">
                  <FaTiktok color="currentColor" />
                </a>
              </div>

              <div className="SocialIcon">
                <a href="https://www.instagram.com/surtaalentertainment/?hl=en" target="_blank" rel="noopener noreferrer">
                  <FaInstagram color="currentColor" />
                </a>
              </div>

              <div className="SocialIcon">
                <a href="https://www.facebook.com/SurTaalUSA/" target="_blank" rel="noopener noreferrer">
                  <FaFacebook color="currentColor" />
                </a>
              </div>

              <div className="SocialIcon">
                <a href="https://www.youtube.com/@SurtaalEntertainmentUSA" target="_blank" rel="noopener noreferrer">
                  <FaYoutube color="currentColor" />
                </a>
              </div>
            </div>
          </div>

          <div className="FooterMiddle FooterMiddleDesktop">
            <a href="tel:+13214222223" className="ContactItem ContactItem-link">
              <img src="/Images/Footer/PhoneIcon.svg" alt="" />
              <div className="ContactText">
                <span className="ContactLabel">Phone</span>
                <span className="ContactValue">+1-321-422-2223</span>
              </div>
            </a>
            <div className="ContactDivider"></div>
            <a
              href="mailto:info@surtaalusa.com"
              className="ContactItem ContactItem-link"
            >
              <img src="/Images/Footer/email.svg" alt="" />

              <div className="ContactText">
                <span className="ContactLabel">Email</span>
                <span className="ContactValue">info@surtaalusa.com</span>
              </div>
            </a>
          </div>

          {/* Mobile Layout */}
          <div className="FooterLogoMobile">
            <img src="/Images/Footer/mobilelogo.svg" alt="Surtaal Entertainment" />
          </div>
          <img src="/Images/Footer/linefooter.svg" alt="" className="LineFooter" />
          <div className="FollowUsSection">
            <span className="FollowUsText">Follow us on:</span>
            <div className="SocialIcons">
              <div className="SocialIcon">
                <a href="https://www.tiktok.com/@surtaalentusa" target="_blank" rel="noopener noreferrer">
                  <FaTiktok color="currentColor" />
                </a>
              </div>

              <div className="SocialIcon">
                <a href="https://www.instagram.com/surtaalentertainment/?hl=en" target="_blank" rel="noopener noreferrer">
                  <FaInstagram color="currentColor" />
                </a>
              </div>

              <div className="SocialIcon">
                <a href="https://www.facebook.com/SurTaalUSA/" target="_blank" rel="noopener noreferrer">
                  <FaFacebook color="currentColor" />
                </a>
              </div>

              <div className="SocialIcon">
                <a href="https://www.youtube.com/@SurtaalEntertainmentUSA" target="_blank" rel="noopener noreferrer">
                  <FaYoutube color="currentColor" />
                </a>
              </div>
            </div>
          </div>
          <img src="/Images/Footer/linefooter.svg" alt="" className="LineFooter" />
          <div className="QuickLinksSection">
            <span className="QuickLinksTitle">Quick links</span>
            <div className="FooterNavLinks">
              <a href="/" className="FooterLink active">
                Events in Surtaal
              </a>
              <a href="/about-us" className="FooterLink">
                About Us
              </a>
              <a href="/artists" className="FooterLink">
                Artists
              </a>
              <a href="/our-team" className="FooterLink">
                Our Team
              </a>
            </div>
          </div>
          <img src="/Images/Footer/linefooter.svg" alt="" className="LineFooter" />
          <div className="ContactSection">
            <span className="ContactTitle">Contact Us Now</span>
            <a href="tel:+13214222223" className="ContactItem ContactItem-link" style={{ textDecoration: 'none' }}>
              <img src="/Images/Footer/phonemobile.svg" alt="" className="ContactMobileIcon" />
              <div className="ContactItemText">
                <span className="PhoneLabel">Phone</span>
                <span className="PhoneNumber">+1-321-422-2223</span>
              </div>
            </a>
            <a href="mailto:info@surtaalusa.com" className="ContactItem ContactItem-link" style={{ textDecoration: 'none' }}>
              <img src="/Images/Footer/emailmobile.svg" alt="" className="ContactMobileIcon" />
              <div className="ContactItemText">
                <span className="EmailLabel">Email</span>
                <span className="EmailValue">info@surtaalusa.com</span>
              </div>
            </a>
          </div>
        </div>

        <div className="FooterBottom">
          <div className="FooterBottomRow">
            <div className="FooterBottomLeft">
              <span className="underline">Surtaal</span> © 2023. All Rights
              Reserved.
            </div>
            <div className="FooterBottomRight">
              <span>Terms Of Services</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
